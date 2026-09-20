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
					mx-auto flex w-full max-w-[1600px]
					flex-col gap-4
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
				mx-auto flex w-full max-w-[1600px]
				flex-col gap-4 sm:gap-5
			`}>
			<FinancePageHeader
				title="دسته‌بندی‌های مالی"
				description="ساختار درآمد و هزینه را مدیریت کنید تا گزارش‌ها دقیق و قابل تحلیل بمانند"
			/>

			<CategoryStats categories={categories} />

			<CategoriesCardTable
				onSuccess={(value) => {
					setCategories(value ?? []);
				}}
			/>
		</PageLayout>
	);
}
