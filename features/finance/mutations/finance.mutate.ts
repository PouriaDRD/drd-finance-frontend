"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { financeApi } from "../api";
import { CategorySchema, TransactionSchema } from "../types";

export function useGetMyCategories() {
	return useQuery({
		queryKey: queryKeys.finance.myCategories,
		queryFn: financeApi.getMyCategories,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
}

export function useGetMyActiveCategories() {
	return useQuery({
		queryKey: queryKeys.finance.myActiveCategories,
		queryFn: financeApi.getMyActiveCategories,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
}

export function useCreateCategory() {
	return useMutation({
		mutationFn: (data: CategorySchema) => financeApi.createCategory(data),
	});
}

export function useUpdateCategory(categoryId: string) {
	return useMutation({
		mutationFn: (data: CategorySchema) =>
			financeApi.updateCategory(categoryId, data),
	});
}

export function useGetMyTransactionsInMonth(month: number, year: number) {
	return useQuery({
		queryKey: queryKeys.finance.myTransactionsInMonth(month, year),
		queryFn: () => financeApi.getMyTransactionsInMonth(month, year),
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
}

export function useGetMyTransactionsInYear(year: number) {
	return useQuery({
		queryKey: queryKeys.finance.myTransactionsInYear(year),
		queryFn: () => financeApi.getMyTransactionsInYear(year),
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
}

export function useCreateTransaction() {
	return useMutation({
		mutationFn: (data: TransactionSchema) =>
			financeApi.createTransaction(data),
	});
}

export function useUpdateTransaction(transactionId: string) {
	return useMutation({
		mutationFn: (data: TransactionSchema) =>
			financeApi.updateTransaction(transactionId, data),
	});
}

export function useDeleteTransaction(transactionId: string) {
	return useMutation({
		mutationFn: () => financeApi.deleteTransaction(transactionId),
	});
}
