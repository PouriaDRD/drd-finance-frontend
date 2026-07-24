"use client";

import { PageLayout } from "@/components/layouts";
import { ErrorState, PageHeader } from "@/components/pages";
import { DashLoading, DetailsCard } from "@/components/pages/dashboard";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import { LoginHistoryTable } from "@/features/auth/components/tables";
import { useUser } from "@/features/user/context";

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
				title="داشبورد"
				description="خلاصه اطلاعات و وضعیت حساب شما"
			/>

			<div className="grid grid-cols-1 gap-4">
				<DetailsCard user={user} />
			</div>

			<Card className="overflow-hidden gap-0">
				<CardHeader className="border-b">
					<CardTitle className="text-base">تاریخچه ورود</CardTitle>
				</CardHeader>
				<LoginHistoryTable />
			</Card>
		</PageLayout>
	);
}
