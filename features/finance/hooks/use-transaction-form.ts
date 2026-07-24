"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createTransaction, updateTransaction } from "../actions";
import { transactionSchema } from "../schemas";
import { PublicTransaction } from "../types";

interface Props {
	transaction?: PublicTransaction;
	onSuccess?: () => void;
}

export function useTransactionForm({ transaction, onSuccess }: Props) {
	const [isPending, setIsPending] = useState(false);

	const form = useForm({
		resolver: zodResolver(transactionSchema),
		defaultValues: {
			amount: transaction?.amount ?? 0,
			type: transaction?.type ?? "income",
			categoryId: transaction?.categoryId ?? "",
			transactionDate: transaction?.transactionDate ?? new Date(),
			month: transaction?.month ?? 1,
			description: transaction?.description ?? "",
		},
	});

	const handleOnSuccess = async () => {
		const msg = transaction ? "تراکنش ویرایش شد" : "تراکنش وارد شد";

		toast.success(msg);

		form.reset();

		onSuccess?.();
	};

	const submit = form.handleSubmit(async (values) => {
		setIsPending(true);
		try {
			const data = transaction?.id
				? await updateTransaction(transaction.id, values)
				: await createTransaction(values);

			if (data.success) {
				handleOnSuccess();
			} else {
				toast.error(data.error.toString());
			}
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error updating transaction: ", error);
			}
			toast.error("خطا در به‌روزرسانی وارد شده رخ داد!");
		} finally {
			setIsPending(false);
		}
	});

	return {
		form,
		submit,
		isPending: isPending,
	};
}
