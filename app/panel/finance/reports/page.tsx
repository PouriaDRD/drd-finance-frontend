"use client";

import { useState } from "react";

import { PageLayout } from "@/components/layouts";
import { ErrorState, PageHeader } from "@/components/pages";
import { DashLoading } from "@/components/pages/dashboard";
import { SummaryStats } from "@/components/pages/reports";
import { Card, CardHeader, CardTitle } from "@/components/ui";
import {
	CategorySummaryStatsChart,
	CategorySummaryStatsChartSkeleton,
	MonthlyFinanceChart,
	MonthlyFinanceChartSkeleton,
} from "@/features/finance/components/charts";
import { TransactionDialog } from "@/features/finance/components/dialogs";
import { ReportForm } from "@/features/finance/components/forms";
import { TransactionsTable } from "@/features/finance/components/tables";
import { ReportSchema } from "@/features/finance/schemas";
import { PersianMonthSummary } from "@/features/finance/types";
import { useUser } from "@/features/user/context";

export default function ReportsPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	const [report, setReport] = useState<ReportSchema>({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
	});

	const [persianMonthSummary, setPersianMonthSummary] =
		useState<PersianMonthSummary | null>(null);

	const handleOnPersianMonthSummarySuccess = (
		persianMonthSummary?: PersianMonthSummary,
	) => {
		setPersianMonthSummary(persianMonthSummary ?? null);
	};

	if (isLoading) {
		return (
			<PageLayout className="flex flex-col gap-4">
				<MonthlyFinanceChartSkeleton />
				<DashLoading />
				<CategorySummaryStatsChartSkeleton />
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
				title="گزارش مالی"
				description="تاریخچه تراکنش‌ها و گزارشات مالی"
			/>

			<ReportForm
				onSuccess={(data) => {
					setReport(data);
				}}
			/>

			<MonthlyFinanceChart summary={persianMonthSummary} />

			<Card className="overflow-hidden gap-0">
				<CardHeader className="border-b flex flex-row items-center justify-between">
					<CardTitle className="text-base" suppressHydrationWarning>
						لیست تراکنش‌ها
					</CardTitle>

					<TransactionDialog />
				</CardHeader>

				<TransactionsTable
					month={report.month}
					year={report.year}
					onSuccess={handleOnPersianMonthSummarySuccess}
				/>
			</Card>

			<CategorySummaryStatsChart summary={persianMonthSummary} />

			<SummaryStats summary={persianMonthSummary} />
		</PageLayout>
	);
}
