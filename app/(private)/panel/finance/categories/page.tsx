"use client";

import { useState } from "react";

import { PageLayout } from "@/components/layouts";
import { ErrorState } from "@/components/pages";
import { CategoryStats } from "@/components/pages/category";
import { DashLoading } from "@/components/pages/dashboard";
import { FinancePageHeader } from "@/features/finance/components/navigation";
import { CategoriesCardTable } from "@/features/finance/components/tables";
import { Category } from "@/features/finance/types";
import { useUser } from "@/features/user/context";

export default function CategoriesPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	const [categories, setCategories] = useState<Category[]>([]);

	if (isLoading) {
		return (
			<PageLayout
				className={`
					flex flex-col gap-4
				`}>
				<DashLoading />

				<DashLoading />
			</PageLayout>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<PageLayout>
				<ErrorState />
			</PageLayout>
		);
	}

	return (
		<PageLayout
			className={`
				flex flex-col gap-4
			`}>
			<FinancePageHeader
				title="دسته‌بندی‌های مالی"
				description={"مدیریت دسته‌بندی‌های درآمد و هزینه"}
			/>

			<CategoryStats categories={categories} />

			<CategoriesCardTable
				onSuccess={(data) => {
					setCategories(data ?? []);
				}}
			/>
		</PageLayout>
	);
}
