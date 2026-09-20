"use client";

import { useState } from "react";

import { PageLayout } from "@/components/layouts";
import { ErrorState } from "@/components/pages";
import { DashLoading } from "@/components/pages/dashboard";
import { SummaryStats } from "@/components/pages/reports";
import {
	CategorySummaryStatsChart,
	CategorySummaryStatsChartSkeleton,
	MonthlyFinanceChart,
	MonthlyFinanceChartSkeleton,
} from "@/features/finance/components/charts";
import { ReportForm } from "@/features/finance/components/forms";
import { FinancePageHeader } from "@/features/finance/components/navigation";
import { TransactionsCardTable } from "@/features/finance/components/tables";
import { ReportSchema } from "@/features/finance/schemas";
import { PersianMonthSummary } from "@/features/finance/types";
import { toIranDateTime } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";

function getCurrentReport(): ReportSchema {
	const current = toIranDateTime(new Date());

	return {
		year: current.year,
		month: current.month,
	};
}

export default function MonthlyReportsPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	const [report, setReport] = useState<ReportSchema>(getCurrentReport);

	const [summary, setSummary] = useState<PersianMonthSummary | null>(null);

	if (isLoading) {
		return (
			<PageLayout
				className={`
					mx-auto flex w-full max-w-[1600px]
					flex-col gap-4
				`}>
				<DashLoading />
				<MonthlyFinanceChartSkeleton />
				<CategorySummaryStatsChartSkeleton />
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
				title="گزارش ماهانه"
				description="تصویر دقیق درآمد، هزینه، مانده و تراکنش‌های هر ماه شمسی"
			/>

			<ReportForm onSuccess={setReport} />

			<SummaryStats summary={summary} />

			<div
				className={`
					grid gap-4
					xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.8fr)]
				`}>
				<MonthlyFinanceChart summary={summary} />
				<CategorySummaryStatsChart summary={summary} />
			</div>

			<TransactionsCardTable
				month={report.month}
				year={report.year}
				onSuccess={(value) => {
					setSummary(value ?? null);
				}}
			/>
		</PageLayout>
	);
}
