"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { queryClient, queryKeys } from "@/features/api/lib";

import { useCreateCategory, useUpdateCategory } from "../mutations";
import { categorySchema } from "../schemas";
import { Category } from "../types";

interface Props {
	category?: Category;
	onSuccess?: () => void;
}

export function useCategoryForm({ category, onSuccess }: Props) {
	const categoryMutation = useCreateCategory();
	const categoryUpdateMutation = useUpdateCategory(category?.id || "");

	const form = useForm({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category?.name ?? "",
			type: category?.type ?? "income",
			description: category?.description ?? "",
			is_archived: category?.is_archived ?? false,
		},
	});

	const handleOnSuccess = async () => {
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.myCategories,
			}),

			queryClient.invalidateQueries({
				queryKey: queryKeys.finance.myActiveCategories,
			}),
		]);

		const msg = category
			? "ویرایش دسته‌بندی با موفقیت انجام شد"
			: "ایجاد دسته‌بندی با موفقیت انجام شد";

		toast.success(msg);

		form.reset();

		onSuccess?.();
	};

	const submit = form.handleSubmit(async (values) => {
		if (!category) {
			categoryMutation.mutate(values, {
				onSuccess: async (res) => {
					if (!res.success) {
						toast.error(res.message || "خطا در ایجاد دسته‌بندی");
						return;
					}

					await handleOnSuccess();
				},
				onError: () => {
					toast.error("خطا در ایجاد دسته‌بندی");
				},
			});
		} else {
			categoryUpdateMutation.mutate(values, {
				onSuccess: async (res) => {
					if (!res.success) {
						toast.error(res.message || "خطا در ویرایش دسته‌بندی");
						return;
					}

					await handleOnSuccess();
				},
				onError: () => {
					toast.error("خطا در ویرایش دسته‌بندی");
				},
			});
		}
	});

	return {
		form,
		submit,
		isPending: category
			? categoryMutation.isPending
			: categoryUpdateMutation.isPending,
	};
}
