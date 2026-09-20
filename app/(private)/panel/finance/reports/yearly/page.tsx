"use client";

import { useState } from "react";

import { CircleAlert, RefreshCcw } from "lucide-react";

import { PageLayout } from "@/components/layouts";
import { ErrorState } from "@/components/pages";
import { Button, Card, Skeleton } from "@/components/ui";
import { YearlyFinanceChart } from "@/features/finance/components/charts";
import { FinancePageHeader } from "@/features/finance/components/navigation";
import { YearlyReportToolbar } from "@/features/finance/components/reports/yearly-report-toolbar";
import { YearlySummaryStats } from "@/features/finance/components/reports/yearly-summary-stats";
import { YearlySummaryTable } from "@/features/finance/components/tables";
import { useGetMyTransactionsInYear } from "@/features/finance/mutations";
import { toIranDateTime } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";

export default function YearlyReportsPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) {
		return (
			<PageLayout>
				<YearlyReportSkeleton />
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
				title="گزارش سالانه"
				description={
					"نمای کامل درآمد، هزینه و عملکرد مالی در ۱۲ ماه سال"
				}
			/>

			<YearlyReportContent />
		</PageLayout>
	);
}

function YearlyReportContent() {
	const currentYear = toIranDateTime(new Date()).year;

	const [year, setYear] = useState(currentYear);

	const { data, isLoading, isFetching, isError, refetch } =
		useGetMyTransactionsInYear(year);

	const summary = data?.success ? data.data : null;

	return (
		<>
			<YearlyReportToolbar
				year={year}
				onYearChange={setYear}
				disabled={isFetching}
			/>

			{isLoading ? (
				<YearlyReportSkeleton compact />
			) : isError || !summary ? (
				<Card
					className={`
						flex flex-col
						items-center gap-3
						border-border/70
						px-5 py-10
						text-center
					`}>
					<div
						className={`
							flex size-11
							items-center
							justify-center
							rounded-xl
							bg-destructive/10
							text-destructive
						`}>
						<CircleAlert className="size-5" />
					</div>

					<div>
						<p className="font-semibold">
							دریافت گزارش سالانه ناموفق بود
						</p>

						<p
							className={`
								mt-1 text-sm
								text-muted-foreground
							`}>
							لطفاً دوباره تلاش کنید.
						</p>
					</div>

					<Button
						type="button"
						variant="outline"
						onClick={() => {
							void refetch();
						}}>
						<RefreshCcw className="size-4" />
						تلاش مجدد
					</Button>
				</Card>
			) : (
				<>
					<YearlySummaryStats summary={summary} />

					<YearlyFinanceChart summary={summary} />

					<YearlySummaryTable summary={summary} />
				</>
			)}
		</>
	);
}

function YearlyReportSkeleton({ compact = false }: { compact?: boolean }) {
	return (
		<div
			className={`
				grid gap-4
			`}>
			{!compact && <Skeleton className="h-28 w-full rounded-2xl" />}

			<div
				className={`
					grid gap-3
					sm:grid-cols-2
					xl:grid-cols-4
				`}>
				{Array.from({
					length: 4,
				}).map((_, index) => (
					<Skeleton
						key={index}
						className={`
								h-28 rounded-2xl
							`}
					/>
				))}
			</div>

			<Skeleton
				className={`
					h-92.5 w-full
					rounded-2xl
				`}
			/>

			<Skeleton
				className={`
					h-105 w-full
					rounded-2xl
				`}
			/>
		</div>
	);
}
