"use server";

import { getSession } from "@/features/accounts/actions";
import { connectToDatabase } from "@/features/database/lib";
import { ApiResponse } from "@/features/shared/types";

import { categoryService } from "../services";
import type { CategorySchema, PublicCategory } from "../types";

export async function createCategory(
	data: CategorySchema,
): Promise<ApiResponse<PublicCategory>> {
	try {
		const session = await getSession();

		if (!session) {
			return {
				success: false,
				message: "ابتدا وارد حساب خود شوید.",
				error: "ابتدا وارد حساب خود شوید.",
			};
		}

		await connectToDatabase();

		const category = await categoryService.create({
			...data,
			userId: session.userId,
		});

		return {
			success: true,
			message: "دسته‌بندی با موفقیت ایجاد شد!",
			data: category,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error creating category: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در ایجاد دسته‌بندی رخ داد!",
			error: errorMessage,
		};
	}
}

export async function updateCategory(
	id: string,
	data: CategorySchema,
): Promise<ApiResponse<PublicCategory | null>> {
	try {
		const session = await getSession();

		if (!session) {
			return {
				success: false,
				message: "ابتدا وارد حساب خود شوید.",
				error: "ابتدا وارد حساب خود شوید.",
			};
		}

		await connectToDatabase();

		const category = await categoryService.update(id, {
			...data,
			userId: session.userId,
		});

		return {
			success: true,
			message: "دسته‌بندی با موفقیت به‌روز شد!",
			data: category,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error updating category: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در به‌روزرسانی دسته‌بندی رخ داد!",
			error: errorMessage,
		};
	}
}

interface options {
	showAll?: boolean;
}

export async function getCategories({
	showAll = true,
}: options): Promise<ApiResponse<PublicCategory[]>> {
	try {
		const session = await getSession();

		if (!session) {
			return {
				success: false,
				message: "ابتدا وارد حساب خود شوید.",
				error: "ابتدا وارد حساب خود شوید.",
			};
		}

		await connectToDatabase();

		const categories = showAll
			? await categoryService.list(session.userId)
			: await categoryService.listNotArchived(session.userId);

		return {
			success: true,
			message: "دسته‌بندی‌ها بارگذاری شدند!",
			data: categories,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error getting categories: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در دریافت دسته‌بندی‌ها رخ داد!",
			error: errorMessage,
		};
	}
}
