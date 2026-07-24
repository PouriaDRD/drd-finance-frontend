"use client";

import { Button, FieldGroup, Spinner } from "@/components/ui";

import { useCategoryForm } from "../../hooks";
import { PublicCategory } from "../../types";
import {
	DescriptionField,
	IsArchivedField,
	NameField,
	TypeField,
} from "../fields/category";

interface Props {
	category?: PublicCategory;
	onSuccess?: () => void;
}

export function CategoryForm({ category, onSuccess }: Props) {
	const { form, submit, isPending } = useCategoryForm({
		category,
		onSuccess() {
			onSuccess?.();
		},
	});

	return (
		<form id="category-form" onSubmit={submit}>
			<FieldGroup>
				{/* Name */}
				<NameField control={form.control} name="name" label="نام" />

				{/* Type */}
				<TypeField control={form.control} name="type" label="نوع" />

				{/* Description */}
				<DescriptionField
					control={form.control}
					name="description"
					label="توضیحات"
				/>

				{/* Is Archived */}
				<IsArchivedField
					control={form.control}
					name="isArchived"
					label="آرشیو شود"
				/>
			</FieldGroup>

			<Button
				type="submit"
				form="category-form"
				className="w-full mt-6"
				disabled={isPending}>
				{isPending ? (
					<Spinner />
				) : (
					`${category ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}`
				)}
			</Button>
		</form>
	);
}
