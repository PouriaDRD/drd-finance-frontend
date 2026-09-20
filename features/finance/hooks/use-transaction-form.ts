"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { queryClient, queryKeys } from "@/features/api/lib";

import {
	useCreateTransaction,
	useUpdateTransaction,
} from "../mutations";
import { transactionSchema } from "../schemas";
import { Transaction } from "../types";
import { toPersianDateObject } from "../utils";

interface Props {
	transaction?: Transaction;
	onSuccess?: () => void;
}

export function useTransactionForm({
	transaction,
	onSuccess,
}: Props) {
	const transactionMutation = useCreateTransaction();
	const transactionUpdateMutation = useUpdateTransaction(
		transaction?.id ?? "",
	);

	const form = useForm({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			amount: transaction?.amount
				? Math.abs(transaction.amount)
				: 0,
			category_id: transaction?.category?.id ?? "",
			date: transaction?.date
				? toPersianDateObject(transaction.date)
				: toPersianDateObject(new Date()),
			description: transaction?.description ?? "",
		},
	});

	const handleOnSuccess = async (data: Transaction) => {
		const invalidations = [
			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.myTransactionsInMonth(
					data.month,
					data.year,
				),
			}),
			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.myTransactionsInYear(data.year),
			}),
		];

		if (
			transaction &&
			(
				transaction.month !== data.month ||
				transaction.year !== data.year
			)
		) {
			invalidations.push(
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
			);
		}

		await Promise.all(invalidations);

		toast.success(
			transaction
				? "تراکنش با موفقیت ویرایش شد"
				: "تراکنش با موفقیت ثبت شد",
		);

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

			return;
		}

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
	});

	return {
		form,
		submit,
		isPending: transaction
			? transactionUpdateMutation.isPending
			: transactionMutation.isPending,
	};
}
