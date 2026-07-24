"use client";

import { Button, FieldGroup, Spinner } from "@/components/ui";

import { useTransactionForm } from "../../hooks";
import { useGetMyActiveCategories } from "../../mutations";
import { Transaction } from "../../types";
import {
	AmountField,
	CategoryField,
	DateField,
	DescriptionField,
	TypeField,
} from "../fields/transaction";

interface Props {
	transaction?: Transaction;
	onSuccess?: () => void;
}

export function TransactionForm({ transaction, onSuccess }: Props) {
	const { form, submit, isPending } = useTransactionForm({
		transaction,
		onSuccess() {
			onSuccess?.();
		},
	});

	const { data } = useGetMyActiveCategories();

	const categories = data?.success ? data.data : [];

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
					name="category_id"
					label="دسته‌بندی"
					categories={categories}
				/>

				{/* Date */}
				<DateField control={form.control} name="date" label="تاریخ" />

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
