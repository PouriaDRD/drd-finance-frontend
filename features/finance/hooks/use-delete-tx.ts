"use client";

import { useState } from "react";

import { toast } from "sonner";

import { queryClient, queryKeys } from "@/features/api/lib";

import { useDeleteTransaction } from "../mutations";
import { Transaction } from "../types";

interface Props {
	transaction: Transaction;
	onSuccess?: () => void;
}

export function useDeleteTx({ transaction, onSuccess }: Props) {
	const [isLoading, setIsLoading] = useState(false);

	const deleteMutation = useDeleteTransaction(transaction.id);

	const handleOnDelete = () => {
		setIsLoading(true);

		deleteMutation.mutate(undefined, {
			onSuccess: async (res) => {
				if (!res.success) {
					toast.error(res.message || "خطا در حذف تراکنش");

					return;
				}

				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.finance.myTransactionsInMonth(
							transaction.month,
							transaction.year,
						),
					}),

					queryClient.invalidateQueries({
						queryKey: queryKeys.finance.myTransactionsInYear(
							transaction.year,
						),
					}),
				]);

				toast.success("تراکنش حذف شد");

				onSuccess?.();
			},

			onError: () => {
				toast.error("خطا در حذف تراکنش");
			},

			onSettled: () => {
				setIsLoading(false);
			},
		});
	};

	return {
		isLoading: isLoading || deleteMutation.isPending,

		handleOnDelete,
	};
}
