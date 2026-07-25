"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { queryClient, queryKeys } from "@/features/api/lib";

import { useCreateTransaction, useUpdateTransaction } from "../mutations";
import { transactionSchema } from "../schemas";
import { Transaction } from "../types";

interface Props {
	transaction?: Transaction;
	onSuccess?: () => void;
}

export function useTransactionForm({ transaction, onSuccess }: Props) {
	const transactionMutation = useCreateTransaction();
	const transactionUpdateMutation = useUpdateTransaction(
		transaction?.id || "",
	);

	const form = useForm({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			amount: transaction?.amount ? Math.abs(transaction.amount) : 0,
			type: transaction?.type ?? "income",
			category_id: transaction?.category.id ?? "",
			date: transaction?.date ?? new Date(),
			description: transaction?.description ?? "",
		},
	});

	const handleOnSuccess = async (data: Transaction) => {
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.myTransactionsInMonth(
					data.month,
					data.year,
				),
			}),

			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.myTransactionsInYear(data.year),
			}),
		]);

		const msg = transaction ? "تراکنش ویرایش شد" : "تراکنش وارد شد";

		toast.success(msg);

		form.reset();

		onSuccess?.();
	};

	const submit = form.handleSubmit(async (values) => {
		if (!transaction) {
			transactionMutation.mutate(values, {
				onSuccess: async (res) => {
					if (!res.success) {
						toast.error(res.message || "خطا در ایجاد تراکنش");
						return;
					}

					await handleOnSuccess(res.data);
				},
				onError: () => {
					toast.error("خطا در ایجاد تراکنش");
				},
			});
		} else {
			transactionUpdateMutation.mutate(values, {
				onSuccess: async (res) => {
					if (!res.success) {
						toast.error(res.message || "خطا در ویرایش تراکنش");
						return;
					}

					await handleOnSuccess(res.data);
				},
				onError: () => {
					toast.error("خطا در ویرایش تراکنش");
				},
			});
		}
	});

	return {
		form,
		submit,
		isPending: transaction
			? transactionMutation.isPending
			: transactionUpdateMutation.isPending,
	};
}
