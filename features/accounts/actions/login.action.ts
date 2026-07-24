"use server";

import { userService } from "@/features/accounts/services";
import { connectToDatabase } from "@/features/database/lib";
import { ApiResponse } from "@/features/shared/types";

import type { LoginUserSchema } from "../types";
import { LoginResponse } from "../types/login.type";

export async function login(
	data: LoginUserSchema,
): Promise<ApiResponse<LoginResponse>> {
	try {
		await connectToDatabase();

		const { user, token } = await userService.login(data);

		return {
			success: true,
			message: "ورود موفقیت آمیز بود!",
			data: {
				user,
				token,
			},
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error logging in user: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در ورود رخ داد!",
			error: errorMessage,
		};
	}
}
