"use client";

import { useMemo } from "react";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui";
import type {
	CategorySummary,
	PersianMonthSummary,
} from "@/features/finance/types";

interface Props {
	summary?: PersianMonthSummary | null;
}

interface CategoryChartData extends CategorySummary {
	percentage: number;
	color: string;
}

const CHART_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
	"var(--info)",
	"var(--income)",
	"var(--expense)",
];

export function CategorySummaryStatsChart({ summary }: Props) {
	const categorySummary = useMemo<CategoryChartData[]>(() => {
		if (!summary) return [];

		const map = new Map<string, CategorySummary>();

		for (const transaction of summary.transactions) {
			const key = transaction.category.id;

			if (!map.has(key)) {
				map.set(key, {
					category: transaction.category,
					income: 0,
					expense: 0,
					total: 0,
					count: 0,
				});
			}

			const item = map.get(key)!;
			const amount = Math.abs(Number(transaction.amount));

			item.count += 1;

			if (transaction.type === "income") {
				item.income += amount;
			} else {
				item.expense += amount;
			}

			item.total += amount;
		}

		const items = [...map.values()];

		const total = items.reduce(
			(sum, item) => sum + Math.abs(item.total),
			0,
		);

		return items
			.sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
			.map((item, index) => ({
				...item,
				percentage:
					total > 0 ? (Math.abs(item.total) / total) * 100 : 0,
				color: CHART_COLORS[index % CHART_COLORS.length],
			}));
	}, [summary]);

	const total = categorySummary.reduce(
		(sum, item) => sum + Math.abs(item.total),
		0,
	);

	const totalTransactions = categorySummary.reduce(
		(sum, item) => sum + item.count,
		0,
	);

	if (!categorySummary.length) {
		return (
			<Card className="overflow-hidden">
				<CardHeader className="border-b">
					<CardTitle className="text-base">
						دسته‌بندی تراکنش‌ها
					</CardTitle>
				</CardHeader>

				<CardContent className="text-muted-foreground flex h-72 items-center justify-center text-sm">
					داده‌ای برای نمایش وجود ندارد
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="overflow-hidden">
			<CardHeader className="border-b">
				<div>
					<CardTitle className="text-base">
						دسته‌بندی تراکنش‌ها
					</CardTitle>

					<p className="text-muted-foreground mt-1 text-xs">
						توزیع مالی بر اساس دسته‌بندی
					</p>
				</div>
			</CardHeader>

			<CardContent className="p-0">
				<div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.8fr)_1fr]">
					{/* =================================================
					    Donut Chart
					    ================================================= */}

					<div className="flex min-h-80 items-center justify-center border-b p-5 lg:border-e lg:border-b-0">
						<div className="relative h-64 w-64">
							<ChartContainer
								config={Object.fromEntries(
									categorySummary.map((item) => [
										item.category.id,
										{
											label: item.category.name,
											color: item.color,
										},
									]),
								)}
								className="h-full w-full">
								<PieChart>
									<ChartTooltip
										content={
											<ChartTooltipContent
												nameKey="category"
												formatter={(
													value,
													_name,
													item,
												) => (
													<div className="flex min-w-40 items-center justify-between gap-5">
														<span>
															{
																item.payload
																	.category
																	.name
															}
														</span>

														<span className="font-semibold tabular-nums">
															{Number(
																value,
															).toLocaleString(
																"fa-IR",
															)}{" "}
															تومان
														</span>
													</div>
												)}
											/>
										}
									/>

									<Pie
										data={categorySummary}
										dataKey="total"
										nameKey="category"
										innerRadius={76}
										outerRadius={104}
										paddingAngle={3}
										strokeWidth={0}>
										{categorySummary.map((item) => (
											<Cell
												key={item.category.id}
												fill={item.color}
											/>
										))}
									</Pie>
								</PieChart>
							</ChartContainer>

							{/* Center */}
							<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
								<span className="text-muted-foreground text-xs">
									مجموع
								</span>

								<span className="mt-1 text-lg font-bold tabular-nums">
									{formatCompactMoney(total)}
								</span>

								<span className="text-muted-foreground mt-0.5 text-[11px]">
									{totalTransactions.toLocaleString("fa-IR")}{" "}
									تراکنش
								</span>
							</div>
						</div>
					</div>

					{/* =================================================
					    Categories
					    ================================================= */}

					<div className="divide-y">
						{categorySummary.map((item) => {
							const isIncome = item.income > item.expense;

							const amount = Math.max(item.income, item.expense);

							return (
								<div
									key={item.category.id}
									className="group px-4 py-3.5 transition-colors hover:bg-muted/40">
									<div className="flex items-center gap-3">
										{/* Color */}
										<div
											className="size-2.5 shrink-0 rounded-full"
											style={{
												backgroundColor: item.color,
											}}
										/>

										{/* Name */}
										<div className="min-w-0 flex-1">
											<div className="flex items-center justify-between gap-3">
												<p className="truncate text-sm font-medium">
													{item.category.name}
												</p>

												<p className="shrink-0 text-sm font-semibold tabular-nums">
													{formatCompactMoney(amount)}
												</p>
											</div>

											<div className="mt-1.5 flex items-center justify-between gap-3">
												<div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
													{isIncome ? (
														<ArrowDownLeft className="text-income size-3" />
													) : (
														<ArrowUpRight className="text-expense size-3" />
													)}

													<span>
														{item.count.toLocaleString(
															"fa-IR",
														)}{" "}
														تراکنش
													</span>
												</div>

												<span className="text-muted-foreground text-[11px] tabular-nums">
													{item.percentage.toLocaleString(
														"fa-IR",
														{
															maximumFractionDigits: 1,
														},
													)}
													٪
												</span>
											</div>

											{/* Progress */}
											<div className="bg-muted mt-2 h-1.5 overflow-hidden rounded-full">
												<div
													className="h-full rounded-full transition-all"
													style={{
														width: `${item.percentage}%`,
														backgroundColor:
															item.color,
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
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
		<Card className="overflow-hidden">
			{/* Header */}
			<CardHeader className="border-b">
				<div className="space-y-2">
					<div className="bg-muted h-4 w-32 animate-pulse rounded-md" />

					<div className="bg-muted h-3 w-48 animate-pulse rounded-md" />
				</div>
			</CardHeader>

			<CardContent className="p-0">
				<div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.8fr)_1fr]">
					{/* =================================================
					    Donut Skeleton
					    ================================================= */}

					<div className="flex min-h-80 items-center justify-center border-b p-5 lg:border-e lg:border-b-0">
						<div className="relative flex size-64 items-center justify-center">
							{/* Donut */}
							<div className="border-muted bg-muted/20 size-52 animate-pulse rounded-full border-24" />

							{/* Center */}
							<div className="bg-card absolute inset-0 m-auto flex size-28 flex-col items-center justify-center rounded-full">
								<div className="bg-muted h-3 w-12 animate-pulse rounded" />

								<div className="bg-muted mt-2 h-5 w-20 animate-pulse rounded" />

								<div className="bg-muted mt-2 h-2.5 w-16 animate-pulse rounded" />
							</div>
						</div>
					</div>

					{/* =================================================
					    Categories Skeleton
					    ================================================= */}

					<div className="divide-y">
						{Array.from({ length: 5 }).map((_, index) => (
							<div key={index} className="px-4 py-3.5">
								<div className="flex items-center gap-3">
									{/* Color */}
									<div className="bg-muted size-2.5 shrink-0 animate-pulse rounded-full" />

									<div className="min-w-0 flex-1">
										{/* Name + amount */}
										<div className="flex items-center justify-between gap-3">
											<div className="bg-muted h-3.5 w-24 animate-pulse rounded" />

											<div className="bg-muted h-3.5 w-20 animate-pulse rounded" />
										</div>

										{/* Count + percentage */}
										<div className="mt-2 flex items-center justify-between">
											<div className="bg-muted h-2.5 w-20 animate-pulse rounded" />

											<div className="bg-muted h-2.5 w-10 animate-pulse rounded" />
										</div>

										{/* Progress */}
										<div className="bg-muted mt-2 h-1.5 w-full animate-pulse rounded-full" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
