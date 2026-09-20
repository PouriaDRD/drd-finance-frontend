"use client";

import { StatBaseCard } from "@/components/pages/stat-base-card";

import { YearlySummary } from "../../types";

interface Props {
	summary: YearlySummary;
}

function formatMoney(value: number): string {
	return `${Math.abs(value).toLocaleString("fa-IR")} تومان`;
}

export function YearlySummaryStats({ summary }: Props) {
	const transactionCount = summary.monthly_report.reduce(
		(total, item) => total + item.count,
		0,
	);

	const balance = summary.total_balance;

	return (
		<div
			className={`
				grid grid-cols-1 gap-3
				sm:grid-cols-2
				xl:grid-cols-4
			`}>
			<StatBaseCard
				label="مانده سال"
				value={formatMoney(balance)}
				variant={
					balance === 0
						? "default"
						: balance > 0
							? "positive"
							: "negative"
				}>
				سال {summary.year}
			</StatBaseCard>

			<StatBaseCard
				label="درآمد سال"
				value={formatMoney(summary.total_income)}
				variant="positive">
				مجموع ۱۲ ماه
			</StatBaseCard>

			<StatBaseCard
				label="هزینه سال"
				value={formatMoney(summary.total_expense)}
				variant="negative">
				مجموع ۱۲ ماه
			</StatBaseCard>

			<StatBaseCard
				label="تعداد تراکنش"
				value={transactionCount}
				variant="primary">
				کل تراکنش‌های سال
			</StatBaseCard>
		</div>
	);
}
