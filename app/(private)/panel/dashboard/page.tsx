"use client";

import { PageLayout } from "@/components/layouts";
import { ErrorState } from "@/components/pages";
import {
	DashboardHeader,
	DashboardStats,
	DashLoading,
	DetailsCard,
	QuickActions,
} from "@/components/pages/dashboard";
import { LoginHistoryCardTable } from "@/features/auth/components/tables";
import { useUser } from "@/features/user/context";

export default function PanelDashboardPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) {
		return (
			<PageLayout
				className={`
					mx-auto w-full
					max-w-[1600px]
				`}>
				<DashLoading />
			</PageLayout>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<PageLayout
				className={`
					mx-auto w-full
					max-w-[1600px]
				`}>
				<ErrorState />
			</PageLayout>
		);
	}

	return (
		<PageLayout
			className={`
				mx-auto flex w-full
				max-w-[1600px]
				flex-col gap-4
				sm:gap-5
			`}>
			<DashboardHeader user={user} />

			<DashboardStats user={user} />

			<div
				className={`
					grid gap-4
					xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.65fr)]
				`}>
				<DetailsCard user={user} />

				<QuickActions />
			</div>

			<LoginHistoryCardTable />
		</PageLayout>
	);
}
