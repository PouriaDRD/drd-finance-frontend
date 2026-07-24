"use server";

import { userService } from "@/features/accounts/services";
import { connectToDatabase } from "@/features/database/lib";
import { ApiResponse } from "@/features/shared/types";

import type { PublicUser, RegisterAdminSchema } from "../types";

interface RegisterResponse {
	user: PublicUser;
	token: string;
}

export async function registerAdmin(
	data: RegisterAdminSchema,
): Promise<ApiResponse<RegisterResponse>> {
	try {
		await connectToDatabase();

		const { user, token } = await userService.registerAdmin(data);

		return {
			success: true,
			message: "ثبت نام موفقیت آمیز بود!",
			data: {
				user,
				token,
			},
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error registering user: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در ثبت نام رخ داد!",
			error: errorMessage,
		};
	}
}
