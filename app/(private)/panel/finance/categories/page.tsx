"use client";

import { useState } from "react";

import { PageLayout } from "@/components/layouts";
import { ErrorState, PageHeader } from "@/components/pages";
import { CategoryStats } from "@/components/pages/category";
import { DashLoading } from "@/components/pages/dashboard";
import { CategoriesCardTable } from "@/features/finance/components/tables";
import { Category } from "@/features/finance/types";
import { useUser } from "@/features/user/context";

export default function CategoriesPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	const [categories, setCategories] = useState<Category[]>([]);

	const handleOnCategoriesSuccess = (categories?: Category[]) => {
		setCategories(categories ?? []);
	};

	if (isLoading) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<DashLoading />
				<DashLoading />
			</PageLayout>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<ErrorState />
			</PageLayout>
		);
	}

	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="دسته‌بندی‌ها"
				description="ایجاد و ویرایش دسته‌بندی‌ها"
			/>

			<CategoryStats categories={categories} />

			<CategoriesCardTable onSuccess={handleOnCategoriesSuccess} />
		</PageLayout>
	);
}
