import { ApiResponse } from "@/features/api/types";
import { getSession, refreshAccessToken } from "@/features/auth/actions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL?.trim() ?? "";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestProps {
	url: string;
	method: HttpMethod;
	body?: unknown;
	params?: Record<string, string | number | boolean | undefined>;
	init?: RequestInit;
	timeout?: number;
	isMultipart?: boolean;
	retry?: boolean;
}

interface DownloadRequestProps {
	url: string;
	params?: Record<string, string | number | boolean | undefined>;
	init?: RequestInit;
	timeout?: number;
	retry?: boolean;
}

export interface DownloadedFile {
	blob: Blob;
	filename: string | null;
}

/**
 * API CLIENT
 */
class ApiClient {
	// =========================================================
	// MAIN JSON REQUEST
	// =========================================================

	private async request<T>(props: RequestProps): Promise<ApiResponse<T>> {
		const {
			url,
			method,
			body,
			params,
			init,
			timeout = 60000,
			isMultipart = false,
			retry = true,
		} = props;

		const controller = new AbortController();

		const timer = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const finalUrl = buildApiUrl(url, params);

			const headers: Record<string, string> = {
				...(init?.headers as Record<string, string>),
			};

			// Add auth token automatically
			const token = await this.getToken();

			if (token) {
				headers["Authorization"] = `Bearer ${token}`;
			}

			// Content-Type handling
			if (!isMultipart) {
				headers["Content-Type"] = "application/json";
			}

			const response = await fetch(finalUrl, {
				...init,
				method,
				headers,
				signal: controller.signal,
				body: this.buildBody(body, isMultipart),
			});

			// =====================================================
			// Too Many Requests
			// =====================================================

			if (response.status === 429) {
				return {
					success: false,
					message: "درخواست بیش از حد مجاز است",
					errors: "لطفا چند لحظه بعد دوباره تلاش کنید",
				};
			}

			// =====================================================
			// Unauthorized
			// =====================================================

			if (response.status === 401 && retry) {
				const refreshed = await this.refreshToken();

				if (refreshed) {
					return this.request<T>({
						url,
						method,
						body,
						params,
						init,
						timeout,
						isMultipart,
						retry: false,
					});
				}
			}

			return await response.json();
		} catch (err: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error[apiClient.request]:", err);
			}

			const errorName = this.getErrorName(err);

			if (errorName === "AbortError") {
				return {
					success: false,
					message: "درخواست بیش از حد طول کشید",
					errors: "درخواست بیش از حد طول کشید",
				};
			}

			return {
				success: false,
				message: "خطای ناخواسته رخ داده است",
				errors: "خطای ناخواسته رخ داده است",
			};
		} finally {
			clearTimeout(timer);
		}
	}

	// =========================================================
	// FILE DOWNLOAD REQUEST
	// =========================================================

	private async downloadRequest(
		props: DownloadRequestProps,
	): Promise<DownloadedFile> {
		const { url, params, init, timeout = 60000, retry = true } = props;

		const controller = new AbortController();

		const timer = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const finalUrl = buildApiUrl(url, params);

			const headers: Record<string, string> = {
				...(init?.headers as Record<string, string>),
			};

			const token = await this.getToken();

			if (token) {
				headers["Authorization"] = `Bearer ${token}`;
			}

			const response = await fetch(finalUrl, {
				...init,
				method: "GET",
				headers,
				signal: controller.signal,
			});

			// =====================================================
			// Too Many Requests
			// =====================================================

			if (response.status === 429) {
				throw new Error(
					"درخواست بیش از حد مجاز است. لطفا چند لحظه بعد دوباره تلاش کنید.",
				);
			}

			// =====================================================
			// Unauthorized + automatic token refresh
			// =====================================================

			if (response.status === 401 && retry) {
				const refreshed = await this.refreshToken();

				if (refreshed) {
					return this.downloadRequest({
						url,
						params,
						init,
						timeout,
						retry: false,
					});
				}
			}

			// =====================================================
			// API Error
			// =====================================================

			if (!response.ok) {
				const message = await this.getDownloadErrorMessage(response);

				throw new Error(message);
			}

			// =====================================================
			// Binary response
			// =====================================================

			const blob = await response.blob();

			const filename = this.extractFilename(
				response.headers.get("Content-Disposition"),
			);

			return {
				blob,
				filename,
			};
		} catch (err: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error[apiClient.download]:", err);
			}

			const errorName = this.getErrorName(err);

			if (errorName === "AbortError") {
				throw new Error("دریافت فایل بیش از حد طول کشید.");
			}

			if (err instanceof Error) {
				throw err;
			}

			throw new Error("خطای ناخواسته در دریافت فایل رخ داد.");
		} finally {
			clearTimeout(timer);
		}
	}

	// =========================================================
	// HTTP METHODS
	// =========================================================

	get<T>(url: string, params?: RequestProps["params"], init?: RequestInit) {
		return this.request<T>({
			url,
			method: "GET",
			params,
			init,
		});
	}

	post<T>(
		url: string,
		body?: unknown,
		init?: RequestInit,
		isMultipart = false,
	) {
		return this.request<T>({
			url,
			method: "POST",
			body,
			init,
			isMultipart,
		});
	}

	put<T>(url: string, body?: unknown, init?: RequestInit) {
		return this.request<T>({
			url,
			method: "PUT",
			body,
			init,
		});
	}

	patch<T>(url: string, body?: unknown, init?: RequestInit) {
		return this.request<T>({
			url,
			method: "PATCH",
			body,
			init,
		});
	}

	delete<T>(url: string, init?: RequestInit) {
		return this.request<T>({
			url,
			method: "DELETE",
			init,
		});
	}

	/**
	 * Download an authenticated binary file.
	 */
	download(
		url: string,
		params?: DownloadRequestProps["params"],
		init?: RequestInit,
	) {
		return this.downloadRequest({
			url,
			params,
			init,
		});
	}

	// =========================================================
	// TOKEN
	// =========================================================

	/**
	 * Get current access token.
	 */
	private async getToken(): Promise<string | null> {
		const token = await getSession();

		return token || null;
	}

	/**
	 * Refresh access token automatically.
	 */
	private async refreshToken(): Promise<boolean> {
		try {
			const newAccess = await refreshAccessToken();

			if (newAccess) {
				return true;
			}

			return false;
		} catch {
			return false;
		}
	}

	// =========================================================
	// BODY BUILDER
	// =========================================================

	private buildBody(body: unknown, isMultipart?: boolean) {
		if (!body) {
			return undefined;
		}

		if (isMultipart && body instanceof FormData) {
			return body;
		}

		return JSON.stringify(body);
	}

	// =========================================================
	// DOWNLOAD HELPERS
	// =========================================================

	private async getDownloadErrorMessage(response: Response): Promise<string> {
		try {
			const payload = (await response.json()) as {
				message?: unknown;
			};

			if (typeof payload.message === "string" && payload.message.trim()) {
				return payload.message;
			}
		} catch {
			// Response is not JSON.
		}

		return `دریافت فایل با خطا مواجه شد. (${response.status})`;
	}

	private extractFilename(contentDisposition: string | null): string | null {
		if (!contentDisposition) {
			return null;
		}

		const utf8FilenameMatch = contentDisposition.match(
			/filename\*=UTF-8''([^;]+)/i,
		);

		if (utf8FilenameMatch?.[1]) {
			try {
				return decodeURIComponent(
					utf8FilenameMatch[1].trim().replace(/^["']|["']$/g, ""),
				);
			} catch {
				return utf8FilenameMatch[1].trim().replace(/^["']|["']$/g, "");
			}
		}

		const filenameMatch = contentDisposition.match(
			/filename="?([^";]+)"?/i,
		);

		return filenameMatch?.[1]?.trim() ?? null;
	}

	private getErrorName(err: unknown): string | undefined {
		if (err instanceof Error) {
			return err.name;
		}

		if (typeof err === "object" && err !== null && "name" in err) {
			return String((err as { name?: unknown }).name);
		}

		return undefined;
	}
}

export const apiClient = new ApiClient();

/**
 * Build final URL safely.
 */
export function buildApiUrl(
	path: string,
	params?: Record<string, string | number | boolean | undefined>,
): string {
	const base = BASE_URL.replace(/\/+$/, "");

	const cleanPath = path.replace(/^\/+/, "").replace(/\/+$/, "");

	const isAbsolute = /^https?:\/\//i.test(path);

	const url = isAbsolute
		? new URL(path)
		: new URL(`${cleanPath}/`, `${base}/`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.append(key, String(value));
			}
		});
	}

	return url.toString();
}
