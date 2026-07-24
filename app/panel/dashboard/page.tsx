"use client";

import { PageLayout } from "@/components/layouts";
import { ErrorState, PageHeader } from "@/components/pages";
import {
	DashboardStats,
	DashLoading,
	DetailsCard,
} from "@/components/pages/dashboard";
import { useUser } from "@/features/accounts/context";

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

			<DashboardStats user={user} />

			<div className="grid grid-cols-1 gap-4">
				<DetailsCard user={user} />
			</div>
		</PageLayout>
	);
}
