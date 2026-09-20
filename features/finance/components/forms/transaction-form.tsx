"use client";

import { Check, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui";

import { useTransactionForm } from "../../hooks";
import { useGetMyActiveCategories } from "../../mutations";
import { Transaction } from "../../types";
import {
	AmountField,
	CategoryField,
	DateField,
	DescriptionField,
} from "../fields/transaction";

interface Props {
	transaction?: Transaction;
	onSuccess?: () => void;
}

export function TransactionForm({ transaction, onSuccess }: Props) {
	const { form, submit, isPending } = useTransactionForm({
		transaction,
		onSuccess,
	});

	const { data, isLoading: isCategoriesLoading } = useGetMyActiveCategories();

	const categories = data?.success ? data.data : [];

	return (
		<form id="transaction-form" onSubmit={submit} className="space-y-5">
			<div
				className={`
					grid gap-4 sm:grid-cols-2
				`}>
				<AmountField
					control={form.control}
					name="amount"
					label="مبلغ"
				/>

				<DateField
					control={form.control}
					name="date"
					label="تاریخ تراکنش"
				/>
			</div>

			<CategoryField
				control={form.control}
				name="category_id"
				label="دسته‌بندی"
				categories={categories}
			/>

			<DescriptionField
				control={form.control}
				name="description"
				label="توضیحات"
			/>

			<div
				className={`
					flex flex-col gap-3
					border-t pt-4 sm:flex-row
					sm:items-center sm:justify-between
				`}>
				<p
					className={`
						text-xs text-muted-foreground
					`}>
					{isCategoriesLoading
						? "در حال دریافت دسته‌بندی‌ها..."
						: "نوع درآمد یا هزینه از دسته‌بندی انتخاب‌شده تعیین می‌شود."}
				</p>

				<Button
					type="submit"
					form="transaction-form"
					disabled={isPending || isCategoriesLoading}
					className="sm:min-w-32">
					{isPending ? (
						<LoaderCircle
							className={`
								size-4 animate-spin
							`}
						/>
					) : (
						<Check className="size-4" />
					)}

					{transaction ? "ذخیره تغییرات" : "ثبت تراکنش"}
				</Button>
			</div>
		</form>
	);
}
