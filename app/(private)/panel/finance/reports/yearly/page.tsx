"use client";

import { useState } from "react";

import { CircleAlert, RefreshCcw } from "lucide-react";

import { PageLayout } from "@/components/layouts";
import { ErrorState } from "@/components/pages";
import { Button, Card, Skeleton } from "@/components/ui";
import { YearlyFinanceChart } from "@/features/finance/components/charts";
import { FinancePageHeader } from "@/features/finance/components/navigation";
import {
	YearlyReportToolbar,
	YearlySummaryStats,
} from "@/features/finance/components/reports";
import { YearlySummaryTable } from "@/features/finance/components/tables";
import { useGetMyTransactionsInYear } from "@/features/finance/mutations";
import { toIranDateTime } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";

export default function YearlyReportsPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) {
		return (
			<PageLayout className="mx-auto w-full max-w-[1600px]">
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
				mx-auto flex w-full max-w-[1600px]
				flex-col gap-4 sm:gap-5
			`}>
			<FinancePageHeader
				title="گزارش سالانه"
				description="روند ۱۲ ماهه، مجموع درآمد و هزینه و جزئیات عملکرد مالی سال"
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
				<YearlyError
					onRetry={() => {
						void refetch();
					}}
				/>
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

function YearlyError({ onRetry }: { onRetry: () => void }) {
	return (
		<Card className="flex flex-col items-center gap-3 border-border/70 px-5 py-12 text-center shadow-sm">
			<div className="flex size-11 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
				<CircleAlert className="size-5" />
			</div>

			<div>
				<p className="font-semibold">دریافت گزارش سالانه ناموفق بود</p>

				<p className="mt-1 text-sm text-muted-foreground">
					اتصال یا پاسخ API را بررسی کنید و دوباره تلاش کنید.
				</p>
			</div>

			<Button type="button" variant="outline" onClick={onRetry}>
				<RefreshCcw className="size-4" />
				تلاش مجدد
			</Button>
		</Card>
	);
}

function YearlyReportSkeleton({ compact = false }: { compact?: boolean }) {
	return (
		<div className="grid gap-4">
			{!compact && <Skeleton className="h-28 w-full rounded-2xl" />}

			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{Array.from({
					length: 4,
				}).map((_, index) => (
					<Skeleton key={index} className="h-28 rounded-2xl" />
				))}
			</div>

			<Skeleton className="h-97.5 w-full rounded-2xl" />
			<Skeleton className="h-107.5 w-full rounded-2xl" />
		</div>
	);
}
