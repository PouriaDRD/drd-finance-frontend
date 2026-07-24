"use client";

import { Button, FieldGroup, Spinner } from "@/components/ui";

import { useGetCategories, useTransactionForm } from "../../hooks";
import { PublicTransaction } from "../../types";
import {
	AmountField,
	CategoryField,
	DateField,
	DescriptionField,
	MonthField,
	TypeField,
} from "../fields/transaction";

interface Props {
	transaction?: PublicTransaction;
	onSuccess?: () => void;
}

export function TransactionForm({ transaction, onSuccess }: Props) {
	const { form, submit, isPending } = useTransactionForm({
		transaction,
		onSuccess() {
			onSuccess?.();
		},
	});

	const { categories } = useGetCategories({ showAll: false });

	return (
		<form id="transaction-form" onSubmit={submit}>
			<FieldGroup>
				{/* Amount */}
				<AmountField
					control={form.control}
					name="amount"
					label="مبلغ"
				/>

				{/* Type */}
				<TypeField control={form.control} name="type" label="نوع" />

				{/* Category */}
				<CategoryField
					control={form.control}
					name="categoryId"
					label="دسته‌بندی"
					categories={categories}
				/>

				{/* Date */}
				<DateField
					control={form.control}
					name="transactionDate"
					label="تاریخ"
				/>

				{/* Month */}
				<MonthField control={form.control} name="month" label="ماه" />

				{/* Description */}
				<DescriptionField
					control={form.control}
					name="description"
					label="توضیحات"
				/>
			</FieldGroup>

			<Button
				type="submit"
				form="transaction-form"
				className="w-full mt-6"
				disabled={isPending}>
				{isPending ? (
					<Spinner />
				) : (
					`${transaction ? "ویرایش تراکنش" : "ایجاد تراکنش"}`
				)}
			</Button>
		</form>
	);
}
