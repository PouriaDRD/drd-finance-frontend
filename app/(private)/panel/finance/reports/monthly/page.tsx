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

	const [persianMonthSummary, setPersianMonthSummary] =
		useState<PersianMonthSummary | null>(null);

	if (isLoading) {
		return (
			<PageLayout
				className={`
					flex flex-col gap-4
				`}>
				<MonthlyFinanceChartSkeleton />

				<DashLoading />

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
				flex flex-col gap-4
			`}>
			<FinancePageHeader
				title="گزارش ماهانه"
				description={"بررسی درآمد، هزینه، مانده و تراکنش‌های هر ماه"}
			/>

			<ReportForm
				onSuccess={(data) => {
					setReport(data);
				}}
			/>

			<SummaryStats summary={persianMonthSummary} />

			<MonthlyFinanceChart summary={persianMonthSummary} />

			<CategorySummaryStatsChart summary={persianMonthSummary} />

			<TransactionsCardTable
				month={report.month}
				year={report.year}
				onSuccess={(summary) => {
					setPersianMonthSummary(summary ?? null);
				}}
			/>
		</PageLayout>
	);
}
