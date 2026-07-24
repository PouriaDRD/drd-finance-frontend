"use server";

import { connectToDatabase } from "@/features/database/lib";
import { ApiResponse } from "@/features/shared/types";

import { userService } from "../services";
import type { PublicUser } from "../types";

import { getSession } from "./session.action";

export async function getUser(): Promise<ApiResponse<PublicUser>> {
	try {
		const session = await getSession();

		if (!session) {
			return {
				success: false,
				message: "ابتدا وارد حساب خود شوید.",
				error: {
					error: "Unauthenticated",
				},
			};
		}

		await connectToDatabase();

		const user = await userService.getById(session.userId);

		if (!user) {
			return {
				success: false,
				message: "کاربر پیدا نشد.",
				error: {
					error: "User not found",
				},
			};
		}

		return {
			success: true,
			message: "اطلاعات کاربر دریافت شد.",
			data: user,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error getting user: ", error);
		}

		return {
			success: false,
			message: "خطا در دریافت اطلاعات کاربر.",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function getAdminUsers(): Promise<ApiResponse<PublicUser[]>> {
	try {
		const session = await getSession();

		if (!session || session.role !== "admin") {
			return {
				success: false,
				message: "ابتدا وارد حساب خود شوید.",
				error: "ابتدا وارد حساب خود شوید.",
			};
		}

		await connectToDatabase();

		const users = await userService.list();

		return {
			success: true,
			message: "اطلاعات کاربران دریافت شد.",
			data: users,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error getting user: ", error);
		}

		return {
			success: false,
			message: "خطا در دریافت اطلاعات کاربران.",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
