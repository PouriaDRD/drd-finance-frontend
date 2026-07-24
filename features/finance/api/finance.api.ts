/**
 * Finance API layer
 *
 * All HTTP calls for finance feature
 */

import { DateObject } from "react-multi-date-picker";

import { apiClient, endpoints } from "@/features/api/lib";

import {
	Category,
	CategorySchema,
	PersianMonthSummary,
	Transaction,
	TransactionSchema,
	YearlySummary,
} from "../types";

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
