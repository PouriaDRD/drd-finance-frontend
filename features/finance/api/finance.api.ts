/**
 * Finance API layer
 */

import {
	apiClient,
	endpoints,
} from "@/features/api/lib";

import {
	Category,
	CategorySchema,
	PersianMonthSummary,
	Transaction,
	TransactionMonth,
	TransactionSchema,
	YearlySummary,
} from "../types";
import {
	toGregorianDateString,
	TransactionDateInput,
} from "../utils";

export type TransactionExportFormat =
	| "csv"
	| "xlsx";

export const financeApi = {
	getMyCategories: () => {
		return apiClient.get<Category[]>(
			endpoints.finance.myCategories,
		);
	},

	getMyActiveCategories: () => {
		return apiClient.get<Category[]>(
			endpoints.finance.myActiveCategories,
		);
	},

	createCategory: (data: CategorySchema) => {
		return apiClient.post<Category>(
			endpoints.finance.createCategory,
			data,
		);
	},

	updateCategory: (
		categoryId: string,
		data: CategorySchema,
	) => {
		return apiClient.patch<Category>(
			endpoints.finance.updateCategory(categoryId),
			data,
		);
	},

	getMyTransactionsInMonth: (
		month: number,
		year: number,
	) => {
		return apiClient.get<PersianMonthSummary>(
			endpoints.finance.myTransactionsInMonth(
				month,
				year,
			),
		);
	},

	getMyTransactionsInYear: (year: number) => {
		return apiClient.get<YearlySummary>(
			endpoints.finance.myTransactionsInYear(year),
		);
	},

	exportTransactionsInMonth: async (
		year: number,
		month: number,
		format: TransactionExportFormat,
	) => {
		const file = await apiClient.download(
			endpoints.finance.exportTransactionsInMonth(
				year,
				month,
				format,
			),
		);

		return {
			...file,
			filename:
				file.filename ??
				buildMonthExportFilename(
					year,
					month,
					format,
				),
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

	updateTransaction: (
		transactionId: string,
		data: TransactionSchema,
	) => {
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

	formatDate(date: TransactionDateInput) {
		return toGregorianDateString(date);
	},
};

export function getPersianMonthLabel(
	month: number,
): string {
	return (
		TransactionMonth.find(
			(item) => item.value === month,
		)?.label ?? String(month)
	);
}

function buildMonthExportFilename(
	year: number,
	month: number,
	format: TransactionExportFormat,
): string {
	return `${getPersianMonthLabel(month)} ${year}.${format}`;
}
