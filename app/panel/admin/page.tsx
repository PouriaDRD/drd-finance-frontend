"use client";

import { PageLayout } from "@/components/layouts";
import { ErrorState, PageHeader } from "@/components/pages";
import {
	AdminDashboardStats,
	DashLoading,
} from "@/components/pages/admin-dashboard";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { useUser } from "@/features/accounts/context";
import { UsersTable } from "@/features/accounts/tables";

export default function PanelDashboardPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<DashLoading />
				<DashLoading />
			</PageLayout>
		);
	}

	if (!isAuthenticated || !user || user.role !== "admin") {
		return (
			<PageLayout className="flex flex-col gap-4">
				<ErrorState />
			</PageLayout>
		);
	}

	return (
		<PageLayout className="flex flex-col gap-4">
			<PageHeader
				title="داشبورد ادمین"
				description="خلاصه اطلاعات و وضعیت حساب کاربران"
			/>

			<AdminDashboardStats />

			<Card className="overflow-hidden gap-0">
				<CardHeader className="border-b">
					<CardTitle className="text-base">لیست کاربران</CardTitle>
				</CardHeader>

				<UsersTable />
			</Card>
		</PageLayout>
	);
}
