"use client";

import {
	ArrowDownLeft,
	ArrowUpRight,
	ReceiptText,
	WalletCards,
} from "lucide-react";

import { Card } from "@/components/ui";
import { PersianMonthSummary } from "@/features/finance/types";
import { cn } from "@/features/shared/utils";

interface Props {
	summary?: PersianMonthSummary | null;
}

function formatMoney(value: number) {
	return `${Math.abs(value).toLocaleString("fa-IR")} تومان`;
}

export function SummaryStats({ summary }: Props) {
	const income = Math.abs(summary?.income ?? 0);
	const expense = Math.abs(summary?.expense ?? 0);
	const balance = summary?.balance ?? 0;
	const count = summary?.count ?? 0;

	const incomeCount =
		summary?.transactions.filter((item) => item.type === "income").length ??
		0;

	const expenseCount =
		summary?.transactions.filter((item) => item.type === "expense")
			.length ?? 0;

	return (
		<div
			className={`
				grid grid-cols-1 gap-3
				sm:grid-cols-2 xl:grid-cols-4
			`}>
			<FinanceStatCard
				label="مانده"
				value={formatMoney(balance)}
				description={
					summary
						? `${summary.month_name} ${summary.year}`
						: "دوره انتخاب‌شده"
				}
				icon={WalletCards}
				tone={
					balance > 0
						? "positive"
						: balance < 0
							? "negative"
							: "default"
				}
			/>

			<FinanceStatCard
				label="درآمد"
				value={formatMoney(income)}
				description={`${incomeCount.toLocaleString("fa-IR")} تراکنش`}
				icon={ArrowDownLeft}
				tone="positive"
			/>

			<FinanceStatCard
				label="هزینه"
				value={formatMoney(expense)}
				description={`${expenseCount.toLocaleString("fa-IR")} تراکنش`}
				icon={ArrowUpRight}
				tone="negative"
			/>

			<FinanceStatCard
				label="تراکنش‌ها"
				value={count.toLocaleString("fa-IR")}
				description="تعداد کل در این دوره"
				icon={ReceiptText}
				tone="primary"
			/>
		</div>
	);
}

type Tone = "default" | "positive" | "negative" | "primary";

function FinanceStatCard({
	label,
	value,
	description,
	icon: Icon,
	tone,
}: {
	label: string;
	value: string;
	description: string;
	icon: typeof WalletCards;
	tone: Tone;
}) {
	return (
		<Card
			className={`
				relative overflow-hidden
				border-border/70 p-4 shadow-sm
			`}>
			<div
				aria-hidden
				className={cn(
					"absolute inset-x-0 top-0 h-0.5",
					tone === "positive" && "bg-emerald-500/65",
					tone === "negative" && "bg-rose-500/65",
					tone === "primary" && "bg-primary/65",
					tone === "default" && "bg-border",
				)}
			/>

			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="text-xs font-medium text-muted-foreground">
						{label}
					</p>

					<p
						className={cn(
							`
								mt-2 truncate text-xl font-bold
								tabular-nums tracking-tight
							`,
							tone === "positive" &&
								"text-emerald-600 dark:text-emerald-400",
							tone === "negative" &&
								"text-rose-600 dark:text-rose-400",
							tone === "primary" && "text-primary",
						)}>
						{value}
					</p>

					<p className="mt-1 text-[11px] text-muted-foreground">
						{description}
					</p>
				</div>

				<div
					className={cn(
						`
							flex size-9 shrink-0 items-center
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
