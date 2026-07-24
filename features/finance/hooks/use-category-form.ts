"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCategory, updateCategory } from "../actions";
import { categorySchema } from "../schemas";
import { PublicCategory } from "../types";

interface Props {
	category?: PublicCategory;
	onSuccess?: () => void;
}

export function useCategoryForm({ category, onSuccess }: Props) {
	const [isPending, setIsPending] = useState(false);

	const form = useForm({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category?.name ?? "",
			type: category?.type ?? "income",
			description: category?.description ?? "",
			isArchived: category?.isArchived ?? false,
		},
	});

	const handleOnSuccess = async () => {
		const msg = category
			? "ویرایش دسته‌بندی با موفقیت انجام شد"
			: "ایجاد دسته‌بندی با موفقیت انجام شد";

		toast.success(msg);

		form.reset();

		onSuccess?.();
	};

	const submit = form.handleSubmit(async (values) => {
		setIsPending(true);
		try {
			const data = category?.id
				? await updateCategory(category.id, values)
				: await createCategory(values);

			if (data.success) {
				handleOnSuccess();
			} else {
				toast.error(data.error.toString());
			}
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "development") {
				console.error("Error updating category: ", error);
			}
			toast.error("خطا در به‌روزرسانی دسته‌بندی رخ داد!");
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
