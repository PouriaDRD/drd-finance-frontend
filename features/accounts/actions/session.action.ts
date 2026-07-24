"use server";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import { UserRole } from "../types";

const TOKEN_NAME = "token";
const EXPIRATION_DAYS = 7;

// ============================
// Helpers
// ============================

export interface SessionPayload {
	userId: string;
	email: string;
	role: UserRole;
	iat: number;
	exp: number;
}

export async function verifyToken(
	token: string,
): Promise<SessionPayload | null> {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!) as SessionPayload;
	} catch {
		return null;
	}
}

function calculateMaxAgeFromUtc(expireTimeUtc: Date): number {
	const now = Math.floor(Date.now() / 1000);
	const exp = Math.floor(new Date(expireTimeUtc).getTime() / 1000);

	// subtract 5s safety buffer
	return Math.max(exp - now - 5, 0);
}

// ============================
// Session Management
// ============================
interface CreateSessionProps {
	token: string;
}
/**
 * Create session from API response
 */
export async function createSession(props: CreateSessionProps) {
	const { token } = props;
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + EXPIRATION_DAYS);

	try {
		const cookieStore = await cookies();

		const maxAge = calculateMaxAgeFromUtc(expirationDate);

		cookieStore.set({
			name: TOKEN_NAME,
			value: token,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge,
		});
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("[createSession]", error);
		}
	}
}

/**
 * Get valid access token (auto refresh if needed)
 */
export async function getSession() {
	const cookieStore = await cookies();

	const token = cookieStore.get(TOKEN_NAME)?.value ?? null;

	if (!token) {
		return null;
	}

	return verifyToken(token);
}

/**
 * Clear session cookies
 */
export async function clearSession(): Promise<void> {
	const cookieStore = await cookies();

	cookieStore.delete(TOKEN_NAME);
}
