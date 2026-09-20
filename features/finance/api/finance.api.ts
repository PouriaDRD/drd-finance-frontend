/**
 * Finance API layer
 *
 * All HTTP calls for finance feature
 */

import { DateObject } from "react-multi-date-picker";

import { apiClient, endpoints } from "@/features/api/lib";
import { toIranDateTime } from "@/features/shared/utils";

import {
	Category,
	CategorySchema,
	PersianMonthSummary,
	Transaction,
	TransactionSchema,
	YearlySummary,
} from "../types";

export type CurrentMonthExportFormat = "csv" | "xlsx";

export const financeApi = {
	getMyCategories: () => {
		return apiClient.get<Category[]>(endpoints.finance.myCategories);
	},

	getMyActiveCategories: () => {
		return apiClient.get<Category[]>(endpoints.finance.myActiveCategories);
	},

	createCategory: (data: CategorySchema) => {
		return apiClient.post<Category>(endpoints.finance.createCategory, data);
	},

	updateCategory: (categoryId: string, data: CategorySchema) => {
		return apiClient.patch<Category>(
			endpoints.finance.updateCategory(categoryId),
			data,
		);
	},

	getMyTransactionsInMonth: (month: number, year: number) => {
		return apiClient.get<PersianMonthSummary>(
			endpoints.finance.myTransactionsInMonth(month, year),
		);
	},

	getMyTransactionsInYear: (year: number) => {
		return apiClient.get<YearlySummary>(
			endpoints.finance.myTransactionsInYear(year),
		);
	},

	exportCurrentMonthTransactions: async (
		format: CurrentMonthExportFormat,
	) => {
		const file = await apiClient.download(
			endpoints.finance.exportCurrentMonthTransactions(format),
		);

		return {
			...file,
			filename: file.filename ?? buildFinanceExportFilename(format),
		};
	},

	createTransaction: (data: TransactionSchema) => {
		const payload = {
			...data,
			date: financeApi.formatDate(data.date),
		};

		return apiClient.post<Transaction>(
			endpoints.finance.createTransaction,
			payload,
		);
	},

	updateTransaction: (transactionId: string, data: TransactionSchema) => {
		const payload = {
			...data,
			date: financeApi.formatDate(data.date),
		};

		return apiClient.patch<Transaction>(
			endpoints.finance.updateTransaction(transactionId),
			payload,
		);
	},

	deleteTransaction: (transactionId: string) => {
		return apiClient.delete<Transaction>(
			endpoints.finance.deleteTransaction(transactionId),
		);
	},

	formatDate(date: DateObject | Date | string) {
		if (date instanceof DateObject) {
			return date.toDate().toISOString().split("T")[0];
		}

		if (date instanceof Date) {
			return date.toISOString().split("T")[0];
		}

		if (typeof date === "string") {
			return date;
		}

		return new Date().toISOString().split("T")[0];
	},
};

function buildFinanceExportFilename(format: CurrentMonthExportFormat): string {
	const now = new Date();

	const persian = toIranDateTime(now);

	const jalaliDate = [
		persian.year,
		String(persian.month).padStart(2, "0"),
		String(persian.day).padStart(2, "0"),
	].join("-");

	const formatter = new Intl.DateTimeFormat("en-US-u-ca-gregory", {
		timeZone: "Asia/Tehran",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});

	const parts = formatter.formatToParts(now);

	const getPart = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? "00";

	const gregorianDate = [
		getPart("year"),
		getPart("month"),
		getPart("day"),
	].join("-");

	const time = [getPart("hour"), getPart("minute"), getPart("second")].join(
		"-",
	);

	return (
		"transactions_current_month_" +
		`jalali-${jalaliDate}_` +
		`gregorian-${gregorianDate}_` +
		`${time}.${format}`
	);
}
