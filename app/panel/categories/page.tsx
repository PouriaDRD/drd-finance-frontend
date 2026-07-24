"use client";

import { PageLayout } from "@/components/layouts";
import { ErrorState, PageHeader } from "@/components/pages";
import { DashboardStats, DashLoading } from "@/components/pages/dashboard";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { useUser } from "@/features/accounts/context";
import { CategoryDialog } from "@/features/finance/components/dialogs";
import { CategoriesTable } from "@/features/finance/components/tables";
import { useGetCategories } from "@/features/finance/hooks";

export default function CategoriesPage() {
	const { user, isAuthenticated, isLoading } = useUser();
	const { categories, isLoadingCategories, handleGetCategories } =
		useGetCategories({ showAll: true });

	if (isLoading || isLoadingCategories) {
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

			<DashboardStats user={user} />

			<Card className="overflow-hidden gap-0">
				<CardHeader className="border-b flex flex-row items-center justify-between">
					<CardTitle className="text-base" suppressHydrationWarning>
						لیست دسته بندی‌ها
					</CardTitle>

					<CategoryDialog onSuccess={handleGetCategories} />
				</CardHeader>

				<CategoriesTable
					categories={categories}
					isLoadingCategories={isLoadingCategories}
					handleGetCategories={handleGetCategories}
				/>
			</Card>
		</PageLayout>
	);
}
