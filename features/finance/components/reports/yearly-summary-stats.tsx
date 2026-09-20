"use client";

import {
	ArrowDownLeft,
	ArrowUpRight,
	ChartNoAxesCombined,
	ReceiptText,
} from "lucide-react";

import { Card } from "@/components/ui";
import { cn } from "@/features/shared/utils";

import { YearlySummary } from "../../types";

interface Props {
	summary: YearlySummary;
}

function formatMoney(value: number) {
	return `${Math.abs(value).toLocaleString("fa-IR")} تومان`;
}

export function YearlySummaryStats({ summary }: Props) {
	const transactionCount = summary.monthly_report.reduce(
		(total, item) => total + item.count,
		0,
	);

	const activeMonths = summary.monthly_report.filter(
		(item) => item.count > 0,
	).length;

	return (
		<div
			className={`
				grid grid-cols-1 gap-3
				sm:grid-cols-2 xl:grid-cols-4
			`}>
			<YearStat
				label="مانده سال"
				value={formatMoney(summary.total_balance)}
				meta={`سال ${summary.year}`}
				icon={ChartNoAxesCombined}
				tone={
					summary.total_balance > 0
						? "positive"
						: summary.total_balance < 0
							? "negative"
							: "default"
				}
			/>

			<YearStat
				label="درآمد سال"
				value={formatMoney(summary.total_income)}
				meta={`${activeMonths.toLocaleString("fa-IR")} ماه فعال`}
				icon={ArrowDownLeft}
				tone="positive"
			/>

			<YearStat
				label="هزینه سال"
				value={formatMoney(summary.total_expense)}
				meta="مجموع هزینه‌های ثبت‌شده"
				icon={ArrowUpRight}
				tone="negative"
			/>

			<YearStat
				label="تعداد تراکنش"
				value={transactionCount.toLocaleString("fa-IR")}
				meta="کل تراکنش‌های سال"
				icon={ReceiptText}
				tone="primary"
			/>
		</div>
	);
}

type Tone = "default" | "positive" | "negative" | "primary";

function YearStat({
	label,
	value,
	meta,
	icon: Icon,
	tone,
}: {
	label: string;
	value: string;
	meta: string;
	icon: typeof ReceiptText;
	tone: Tone;
}) {
	return (
		<Card className="border-border/70 p-4 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="text-xs font-medium text-muted-foreground">
						{label}
					</p>

					<p
						className={cn(
							"mt-2 truncate text-xl font-bold tabular-nums",
							tone === "positive" &&
								"text-emerald-600 dark:text-emerald-400",
							tone === "negative" &&
								"text-rose-600 dark:text-rose-400",
							tone === "primary" && "text-primary",
						)}>
						{value}
					</p>

					<p className="mt-1 text-[11px] text-muted-foreground">
						{meta}
					</p>
				</div>

				<div
					className={cn(
						`
							flex size-9 items-center
							justify-center rounded-xl border
						`,
						tone === "positive" &&
							"border-emerald-500/15 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400",
						tone === "negative" &&
							"border-rose-500/15 bg-rose-500/8 text-rose-600 dark:text-rose-400",
						tone === "primary" &&
							"border-primary/15 bg-primary/8 text-primary",
						tone === "default" &&
							"border-border bg-muted text-muted-foreground",
					)}>
					<Icon className="size-4" />
				</div>
			</div>
		</Card>
	);
}
