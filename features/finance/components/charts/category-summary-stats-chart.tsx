"use client";

import { useMemo } from "react";

import {
	ArrowDownLeft,
	ArrowUpRight,
	Layers3,
	ReceiptText,
	Sparkles,
	WalletCards,
} from "lucide-react";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@/components/ui";
import type {
	PersianMonthSummary,
	TransactionType,
} from "@/features/finance/types";
import { cn } from "@/features/shared/utils";

interface Props {
	summary?: PersianMonthSummary | null;
}

interface CategoryDistributionItem {
	id: string;
	name: string;
	type: TransactionType;
	amount: number;
	count: number;
	percentage: number;
}

export function CategorySummaryStatsChart({ summary }: Props) {
	const categorySummary = useMemo<CategoryDistributionItem[]>(() => {
		if (!summary) {
			return [];
		}

		const grouped = new Map<
			string,
			Omit<CategoryDistributionItem, "percentage">
		>();

		for (const transaction of summary.transactions) {
			if (!transaction.category) {
				continue;
			}

			const key = transaction.category.id;
			const amount = Math.abs(Number(transaction.amount));

			const current = grouped.get(key);

			if (current) {
				current.amount += amount;
				current.count += 1;

				continue;
			}

			grouped.set(key, {
				id: transaction.category.id,
				name: transaction.category.name,
				type: transaction.type,
				amount,
				count: 1,
			});
		}

		const items = [...grouped.values()].sort((a, b) => b.amount - a.amount);

		const totalAmount = items.reduce(
			(total, item) => total + item.amount,
			0,
		);

		return items.map((item) => ({
			...item,
			percentage: totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0,
		}));
	}, [summary]);

	const totalAmount = categorySummary.reduce(
		(total, item) => total + item.amount,
		0,
	);

	const totalTransactions = categorySummary.reduce(
		(total, item) => total + item.count,
		0,
	);

	const topCategory = categorySummary[0];

	if (!categorySummary.length) {
		return <CategorySummaryEmptyState />;
	}

	return (
		<Card
			className={`
				h-full overflow-hidden
				border-border/70 shadow-sm
			`}>
			<CardHeader
				className={`
					flex flex-row items-center
					justify-between gap-3
					border-b border-border/60
					px-4 py-4
				`}>
				<div className="flex min-w-0 items-center gap-3">
					<div
						className={`
							flex size-9 shrink-0
							items-center justify-center
							rounded-xl border
							border-border/70 bg-muted/40
							text-muted-foreground
						`}>
						<Layers3 className="size-4" />
					</div>

					<div className="min-w-0">
						<CardTitle className="text-base">
							سهم دسته‌بندی‌ها
						</CardTitle>

						<p
							className={`
								mt-0.5 truncate text-xs
								text-muted-foreground
							`}>
							{summary?.month_name
								? `ترکیب گردش مالی ${summary.month_name}`
								: "ترکیب گردش مالی دوره"}
						</p>
					</div>
				</div>

				<Badge variant="outline" className="shrink-0 font-normal">
					{categorySummary.length.toLocaleString("fa-IR")} دسته
				</Badge>
			</CardHeader>

			<CardContent className="p-0">
				<TopCategorySummary
					item={topCategory}
					totalAmount={totalAmount}
					totalTransactions={totalTransactions}
				/>

				<div
					className={`
						border-t border-border/60
						px-4 py-3
					`}>
					<div
						className={`
							mb-3 flex items-center
							justify-between gap-3
						`}>
						<div>
							<p className="text-xs font-semibold">
								جزئیات دسته‌بندی‌ها
							</p>

							<p
								className={`
									mt-0.5 text-[10px]
									text-muted-foreground
								`}>
								مرتب‌شده بر اساس مبلغ
							</p>
						</div>

						<p
							className={`
								text-[10px] tabular-nums
								text-muted-foreground
							`}>
							مجموع {formatCompactMoney(totalAmount)}
						</p>
					</div>

					<div
						className={`
							max-h-86.25 space-y-2
							overflow-y-auto pe-1
						`}>
						{categorySummary.map((item, index) => (
							<CategoryDistributionRow
								key={item.id}
								item={item}
								index={index}
							/>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function TopCategorySummary({
	item,
	totalAmount,
	totalTransactions,
}: {
	item: CategoryDistributionItem;
	totalAmount: number;
	totalTransactions: number;
}) {
	const isIncome = item.type === "income";

	return (
		<div className="p-4">
			<div
				className={cn(
					`
						relative overflow-hidden rounded-2xl
						border p-4
					`,
					isIncome
						? `
							border-emerald-500/15
							bg-emerald-500/4.5
						`
						: `
							border-rose-500/15
							bg-rose-500/4.5
						`,
				)}>
				<div
					aria-hidden
					className={cn(
						`
							absolute inset-x-0 top-0
							h-0.5
						`,
						isIncome ? "bg-emerald-500/70" : "bg-rose-500/70",
					)}
				/>

				<div
					className={`
						flex items-start
						justify-between gap-4
					`}>
					<div className="min-w-0">
						<div className="flex items-center gap-1.5">
							<Sparkles
								className={cn(
									"size-3.5",
									isIncome
										? `
											text-emerald-600
											dark:text-emerald-400
										`
										: `
											text-rose-600
											dark:text-rose-400
										`,
								)}
							/>

							<p
								className={`
									text-[11px] font-medium
									text-muted-foreground
								`}>
								بیشترین سهم این دوره
							</p>
						</div>

						<p
							className={`
								mt-2 truncate text-base
								font-bold
							`}>
							{item.name}
						</p>

						<p
							className={cn(
								`
									mt-1 text-lg font-bold
									tabular-nums
								`,
								isIncome
									? `
										text-emerald-600
										dark:text-emerald-400
									`
									: `
										text-rose-600
										dark:text-rose-400
									`,
							)}>
							{formatMoney(item.amount)}
						</p>
					</div>

					<div
						className={cn(
							`
								flex size-12 shrink-0
								flex-col items-center
								justify-center rounded-2xl
								border
							`,
							isIncome
								? `
									border-emerald-500/15
									bg-emerald-500/8
									text-emerald-600
									dark:text-emerald-400
								`
								: `
									border-rose-500/15
									bg-rose-500/8
									text-rose-600
									dark:text-rose-400
								`,
						)}>
						<span className="text-sm font-bold tabular-nums">
							{item.percentage.toLocaleString("fa-IR", {
								maximumFractionDigits: 0,
							})}
						</span>

						<span className="text-[9px]">درصد</span>
					</div>
				</div>

				<div
					className={`
						mt-4 grid grid-cols-2
						gap-2 border-t
						border-border/60 pt-3
					`}>
					<div className="flex items-center gap-2">
						<div
							className={`
								flex size-7 items-center
								justify-center rounded-lg
								bg-background/75
								text-muted-foreground
							`}>
							<WalletCards className="size-3.5" />
						</div>

						<div className="min-w-0">
							<p className="text-[9px] text-muted-foreground">
								گردش کل
							</p>

							<p className="truncate text-xs font-semibold tabular-nums">
								{formatCompactMoney(totalAmount)}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<div
							className={`
								flex size-7 items-center
								justify-center rounded-lg
								bg-background/75
								text-muted-foreground
							`}>
							<ReceiptText className="size-3.5" />
						</div>

						<div className="min-w-0">
							<p className="text-[9px] text-muted-foreground">
								تراکنش‌ها
							</p>

							<p className="truncate text-xs font-semibold tabular-nums">
								{totalTransactions.toLocaleString("fa-IR")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function CategoryDistributionRow({
	item,
	index,
}: {
	item: CategoryDistributionItem;
	index: number;
}) {
	const isIncome = item.type === "income";

	return (
		<div
			className={`
				group rounded-xl border
				border-transparent px-3 py-2.5
				transition-colors
				hover:border-border/70
				hover:bg-muted/25
			`}>
			<div className="flex items-center gap-2.5">
				<div
					className={`
						flex size-7 shrink-0
						items-center justify-center
						rounded-lg bg-muted
						text-[10px] font-bold
						text-muted-foreground
					`}>
					{(index + 1).toLocaleString("fa-IR")}
				</div>

				<div className="min-w-0 flex-1">
					<div
						className={`
							flex items-center
							justify-between gap-3
						`}>
						<div className="flex min-w-0 items-center gap-2">
							<div
								className={cn(
									`
										flex size-6 shrink-0
										items-center justify-center
										rounded-md
									`,
									isIncome
										? `
											bg-emerald-500/8
											text-emerald-600
											dark:text-emerald-400
										`
										: `
											bg-rose-500/8
											text-rose-600
											dark:text-rose-400
										`,
								)}>
								{isIncome ? (
									<ArrowDownLeft className="size-3.5" />
								) : (
									<ArrowUpRight className="size-3.5" />
								)}
							</div>

							<p className="truncate text-xs font-semibold">
								{item.name}
							</p>
						</div>

						<p className="shrink-0 text-xs font-bold tabular-nums">
							{formatCompactMoney(item.amount)}
						</p>
					</div>

					<div
						className={`
							mt-1.5 flex items-center
							justify-between gap-3
						`}>
						<p
							className={`
								text-[10px]
								text-muted-foreground
							`}>
							{item.count.toLocaleString("fa-IR")} تراکنش
						</p>

						<p
							className={`
								text-[10px] tabular-nums
								text-muted-foreground
							`}>
							{item.percentage.toLocaleString("fa-IR", {
								maximumFractionDigits: 1,
							})}
							٪
						</p>
					</div>

					<div
						className={`
							mt-2 h-1 overflow-hidden
							rounded-full bg-muted
						`}>
						<div
							className={cn(
								`
									h-full rounded-full
									transition-[width]
									duration-500
								`,
								isIncome ? "bg-emerald-500" : "bg-rose-500",
							)}
							style={{
								width: `${Math.max(item.percentage, 2)}%`,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function CategorySummaryEmptyState() {
	return (
		<Card
			className={`
				h-full overflow-hidden
				border-border/70 shadow-sm
			`}>
			<CardHeader className="border-b border-border/60">
				<div className="flex items-center gap-3">
					<div className="flex size-9 items-center justify-center rounded-xl border bg-muted/40 text-muted-foreground">
						<Layers3 className="size-4" />
					</div>

					<div>
						<CardTitle className="text-base">
							سهم دسته‌بندی‌ها
						</CardTitle>

						<p className="mt-0.5 text-xs text-muted-foreground">
							ترکیب گردش مالی دوره
						</p>
					</div>
				</div>
			</CardHeader>

			<CardContent className="flex min-h-90 items-center justify-center p-6">
				<div className="max-w-xs text-center">
					<div className="mx-auto flex size-11 items-center justify-center rounded-2xl border bg-muted/40 text-muted-foreground">
						<Layers3 className="size-5" />
					</div>

					<p className="mt-3 text-sm font-semibold">
						هنوز داده‌ای برای دسته‌بندی‌ها نیست
					</p>

					<p className="mt-1 text-xs leading-5 text-muted-foreground">
						بعد از ثبت تراکنش، سهم هر دسته در این بخش نمایش داده
						می‌شود.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

function formatMoney(value: number) {
	return `${Math.abs(value).toLocaleString("fa-IR")} تومان`;
}

function formatCompactMoney(value: number) {
	const abs = Math.abs(value);

	if (abs >= 1_000_000_000) {
		return `${(value / 1_000_000_000).toLocaleString("fa-IR", {
			maximumFractionDigits: 1,
		})} میلیارد`;
	}

	if (abs >= 1_000_000) {
		return `${(value / 1_000_000).toLocaleString("fa-IR", {
			maximumFractionDigits: 1,
		})} میلیون`;
	}

	if (abs >= 1_000) {
		return `${(value / 1_000).toLocaleString("fa-IR", {
			maximumFractionDigits: 1,
		})} هزار`;
	}

	return value.toLocaleString("fa-IR");
}

export function CategorySummaryStatsChartSkeleton() {
	return (
		<Card
			className={`
				h-full overflow-hidden
				border-border/70 shadow-sm
			`}>
			<CardHeader className="border-b border-border/60">
				<div className="flex items-center gap-3">
					<Skeleton className="size-9 rounded-xl" />

					<div className="space-y-2">
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-3 w-36" />
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-4 p-4">
				<Skeleton className="h-40 w-full rounded-2xl" />

				<div className="space-y-3">
					{Array.from({
						length: 5,
					}).map((_, index) => (
						<div key={index} className="flex items-center gap-3">
							<Skeleton className="size-7 rounded-lg" />

							<div className="flex-1 space-y-2">
								<div className="flex justify-between gap-3">
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-3 w-16" />
								</div>

								<Skeleton className="h-1 w-full rounded-full" />
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
