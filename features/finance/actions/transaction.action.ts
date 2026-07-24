"use server";

import { getSession } from "@/features/accounts/actions";
import { connectToDatabase } from "@/features/database/lib";
import { ApiResponse } from "@/features/shared/types";

import { transactionService } from "../services";
import type { PublicTransaction, TransactionSchema } from "../types";

export async function createTransaction(
	data: TransactionSchema,
): Promise<ApiResponse<PublicTransaction>> {
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

		let transactionDate = undefined;
		if (
			data.transactionDate &&
			typeof data.transactionDate === "object" &&
			"toDate" in data.transactionDate
		) {
			transactionDate = data.transactionDate.toDate();
		}

		const transaction = await transactionService.create({
			...data,
			userId: session.userId,
			transactionDate: transactionDate!,
		});

		return {
			success: true,
			message: "تراکنش با موفقیت ایجاد شد!",
			data: transaction,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error creating transaction: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در ایجاد تراکنش رخ داد!",
			error: errorMessage,
		};
	}
}

export async function updateTransaction(
	id: string,
	data: TransactionSchema,
): Promise<ApiResponse<PublicTransaction | null>> {
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

		let transactionDate = undefined;
		if (
			data.transactionDate &&
			typeof data.transactionDate === "object" &&
			"toDate" in data.transactionDate
		) {
			transactionDate = data.transactionDate.toDate();
		}

		const transaction = await transactionService.update(id, {
			...data,
			userId: session.userId,
			transactionDate: transactionDate,
		});

		return {
			success: true,
			message: "تراکنش با موفقیت به‌روز شد!",
			data: transaction,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error updating transaction: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در به‌روزرسانی تراکنش رخ داد!",
			error: errorMessage,
		};
	}
}

export async function getTransactions(): Promise<
	ApiResponse<PublicTransaction[]>
> {
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

		const transactions = await transactionService.list(session.userId);

		return {
			success: true,
			message: "تراکنش‌ها بارگذاری شدند!",
			data: transactions,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error getting transactions: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در دریافت تراکنش‌ها رخ داد!",
			error: errorMessage,
		};
	}
}

export async function deleteTransaction(
	id: string,
): Promise<ApiResponse<PublicTransaction | null>> {
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

		const transaction = await transactionService.delete(id);

		return {
			success: true,
			message: "تراکنش با موفقیت حذف شد!",
			data: transaction,
		};
	} catch (error: unknown) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error deleting transaction: ", error);
		}

		const errorMessage =
			error instanceof Error ? error.message : String(error);

		return {
			success: false,
			message: "خطا در حذف تراکنش رخ داد!",
			error: errorMessage,
		};
	}
}
