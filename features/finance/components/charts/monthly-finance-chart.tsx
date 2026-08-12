"use client";

import {
	ArrowDownLeft,
	ArrowUpRight,
	ChartNoAxesCombined,
	ReceiptText,
	TrendingUp,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui";
import { PersianMonthSummary } from "@/features/finance/types";

interface Props {
	summary?: PersianMonthSummary | null;
}

export function MonthlyFinanceChart({ summary }: Props) {
	const transactions = summary?.transactions ?? [];

	/*
	 * ---------------------------------------------------------
	 * Daily aggregation
	 * ---------------------------------------------------------
	 */

	const data = transactions.reduce<ChartData[]>((acc, transaction) => {
		const parts = transaction.persian_date.split("/");
		const day = Number(parts.at(-1));

		if (!Number.isFinite(day)) {
			return acc;
		}

		let item = acc.find((entry) => entry.day === day);

		if (!item) {
			item = {
				day,
				income: 0,
				expense: 0,
				net: 0,
				transactions: 0,
			};

			acc.push(item);
		}

		const amount = Math.abs(Number(transaction.amount));

		if (!Number.isFinite(amount)) {
			return acc;
		}

		item.transactions += 1;

		if (transaction.type === "income") {
			item.income += amount;
		}

		if (transaction.type === "expense") {
			item.expense += amount;
		}

		item.net = item.income - item.expense;

		return acc;
	}, []);

	data.sort((a, b) => a.day - b.day);

	/*
	 * ---------------------------------------------------------
	 * Summary
	 * ---------------------------------------------------------
	 */

	const income =
		summary?.income ?? data.reduce((total, item) => total + item.income, 0);

	const expense =
		summary?.expense ??
		data.reduce((total, item) => total + item.expense, 0);

	const net = income - expense;

	const transactionCount = summary?.count ?? transactions.length;

	/*
	 * ---------------------------------------------------------
	 * Best / Worst days
	 * ---------------------------------------------------------
	 */

	const bestIncomeDay = data.reduce<ChartData | null>((best, current) => {
		if (current.income <= 0) {
			return best;
		}

		if (!best || current.income > best.income) {
			return current;
		}

		return best;
	}, null);

	const highestExpenseDay = data.reduce<ChartData | null>(
		(highest, current) => {
			if (current.expense <= 0) {
				return highest;
			}

			if (!highest || current.expense > highest.expense) {
				return current;
			}

			return highest;
		},
		null,
	);

	const hasData = data.length > 0;

	return (
		<Card className="overflow-hidden">
			<CardHeader className="border-b">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
								<ChartNoAxesCombined className="size-4" />
							</div>

							<CardTitle className="text-base">
								روند مالی
							</CardTitle>
						</div>

						<p className="text-muted-foreground text-xs">
							نمای کلی عملکرد مالی {summary?.month_name ?? "ماه"}
						</p>
					</div>

					{summary?.month_name && (
						<div className="bg-muted text-muted-foreground shrink-0 rounded-md px-2.5 py-1 text-xs font-medium">
							{summary.month_name}
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="p-0">
				{!hasData ? (
					<div className="text-muted-foreground flex h-80 items-center justify-center text-sm">
						تراکنشی برای نمایش گزارش وجود ندارد
					</div>
				) : (
					<>
						{/* =================================================
						    KPI
						    ================================================= */}

						<div className="grid grid-cols-2 divide-x divide-y divide-border/70 rtl:divide-x-reverse sm:grid-cols-4 sm:divide-y-0">
							<div className="p-4">
								<StatItem
									icon={
										<ArrowDownLeft className="size-4 text-income" />
									}
									label="درآمد"
									value={formatCompactMoney(income)}
									description={`${income.toLocaleString("fa-IR")} تومان`}
									valueClassName="text-income"
								/>
							</div>

							<div className="p-4">
								<StatItem
									icon={
										<ArrowUpRight className="size-4 text-expense" />
									}
									label="هزینه"
									value={formatCompactMoney(expense)}
									description={`${expense.toLocaleString("fa-IR")} تومان`}
									valueClassName="text-expense"
								/>
							</div>

							<div className="p-4">
								<StatItem
									icon={
										<TrendingUp
											className={`size-4 ${
												net >= 0
													? "text-income"
													: "text-expense"
											}`}
										/>
									}
									label="خالص"
									value={`${net >= 0 ? "+" : "-"}${formatCompactMoney(net)}`}
									description="درآمد منهای هزینه"
									valueClassName={
										net >= 0
											? "text-income"
											: "text-expense"
									}
								/>
							</div>

							<div className="p-4">
								<StatItem
									icon={
										<ReceiptText className="text-info size-4" />
									}
									label="تراکنش‌ها"
									value={transactionCount.toLocaleString(
										"fa-IR",
									)}
									description="کل تراکنش‌های ماه"
									valueClassName="text-foreground"
								/>
							</div>
						</div>

						{/* =================================================
						    Chart
						    ================================================= */}

						<div className="border-t px-4 pt-6 pb-2 sm:px-6">
							<ChartContainer
								config={{
									income: {
										label: "درآمد",
										color: "var(--income)",
									},
									expense: {
										label: "هزینه",
										color: "var(--expense)",
									},
								}}
								className="h-75 w-full">
								<AreaChart
									data={data}
									margin={{
										top: 10,
										right: 8,
										left: 8,
										bottom: 0,
									}}>
									<defs>
										<linearGradient
											id="incomeGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1">
											<stop
												offset="0%"
												stopColor="var(--color-income)"
												stopOpacity={0.18}
											/>

											<stop
												offset="100%"
												stopColor="var(--color-income)"
												stopOpacity={0}
											/>
										</linearGradient>

										<linearGradient
											id="expenseGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1">
											<stop
												offset="0%"
												stopColor="var(--color-expense)"
												stopOpacity={0.14}
											/>

											<stop
												offset="100%"
												stopColor="var(--color-expense)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>

									<CartesianGrid
										vertical={false}
										strokeDasharray="3 3"
										className="stroke-border/50"
									/>

									<XAxis
										dataKey="day"
										tickLine={false}
										axisLine={false}
										tickMargin={10}
										tickFormatter={(value) =>
											Number(value).toLocaleString(
												"fa-IR",
											)
										}
									/>

									<YAxis
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										width={65}
										tickFormatter={(value) =>
											formatCompactMoney(Number(value))
										}
									/>

									<ChartTooltip
										cursor={{
											stroke: "var(--border)",
										}}
										content={
											<ChartTooltipContent
												formatter={(value, name) => (
													<div className="flex min-w-40 items-center justify-between gap-5">
														<span>
															{name === "income"
																? "درآمد"
																: "هزینه"}
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
												labelFormatter={(label) =>
													`روز ${Number(
														label,
													).toLocaleString("fa-IR")}`
												}
											/>
										}
									/>

									<Area
										type="monotone"
										dataKey="income"
										stroke="var(--color-income)"
										strokeWidth={2}
										fill="url(#incomeGradient)"
										dot={false}
										activeDot={{
											r: 4,
											strokeWidth: 2,
										}}
									/>

									<Area
										type="monotone"
										dataKey="expense"
										stroke="var(--color-expense)"
										strokeWidth={2}
										fill="url(#expenseGradient)"
										dot={false}
										activeDot={{
											r: 4,
											strokeWidth: 2,
										}}
									/>
								</AreaChart>
							</ChartContainer>
						</div>

						{/* =================================================
						    Insights
						    ================================================= */}

						<div className="grid grid-cols-1 border-t sm:grid-cols-2">
							<div className="p-4 sm:border-e">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-muted-foreground text-xs">
											بهترین روز درآمد
										</p>

										{bestIncomeDay ? (
											<>
												<p className="mt-1 text-sm font-semibold">
													{formatDay(
														bestIncomeDay.day,
													)}
												</p>

												<p className="text-income mt-1 text-xs font-medium tabular-nums">
													+
													{formatMoney(
														bestIncomeDay.income,
													)}
												</p>
											</>
										) : (
											<p className="text-muted-foreground mt-1 text-sm">
												—
											</p>
										)}
									</div>

									<div className="bg-income-soft text-income flex size-9 items-center justify-center rounded-lg">
										<ArrowDownLeft className="size-4" />
									</div>
								</div>
							</div>

							<div className="p-4">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="text-muted-foreground text-xs">
											بیشترین هزینه
										</p>

										{highestExpenseDay ? (
											<>
												<p className="mt-1 text-sm font-semibold">
													{formatDay(
														highestExpenseDay.day,
													)}
												</p>

												<p className="text-expense mt-1 text-xs font-medium tabular-nums">
													-
													{formatMoney(
														highestExpenseDay.expense,
													)}
												</p>
											</>
										) : (
											<p className="text-muted-foreground mt-1 text-sm">
												—
											</p>
										)}
									</div>

									<div className="bg-expense-soft text-expense flex size-9 items-center justify-center rounded-lg">
										<ArrowUpRight className="size-4" />
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}

interface ChartData {
	day: number;
	income: number;
	expense: number;
	net: number;
	transactions: number;
}

interface StatItemProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	description?: string;
	valueClassName?: string;
}

function StatItem({
	icon,
	label,
	value,
	description,
	valueClassName,
}: StatItemProps) {
	return (
		<div className="flex min-w-0 items-center gap-3">
			<div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
				{icon}
			</div>

			<div className="min-w-0">
				<p className="text-muted-foreground truncate text-xs">
					{label}
				</p>

				<p
					className={`mt-0.5 truncate text-sm font-semibold tabular-nums ${valueClassName ?? ""}`}>
					{value}
				</p>

				{description && (
					<p className="text-muted-foreground mt-0.5 truncate text-[11px]">
						{description}
					</p>
				)}
			</div>
		</div>
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

function formatDay(day: number) {
	return `روز ${day.toLocaleString("fa-IR")}`;
}

export function MonthlyFinanceChartSkeleton() {
	return (
		<Card className="overflow-hidden">
			{/* Header */}
			<CardHeader className="border-b">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<div className="bg-muted size-8 animate-pulse rounded-lg" />

							<div className="bg-muted h-4 w-24 animate-pulse rounded-md" />
						</div>

						<div className="bg-muted h-3 w-52 animate-pulse rounded-md" />
					</div>

					<div className="bg-muted h-6 w-20 animate-pulse rounded-md" />
				</div>
			</CardHeader>

			<CardContent className="p-0">
				{/* KPI */}
				<div className="grid grid-cols-2 divide-x divide-y divide-border/70 rtl:divide-x-reverse sm:grid-cols-4 sm:divide-y-0">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="p-4">
							<div className="flex items-center gap-3">
								<div className="bg-muted size-9 shrink-0 animate-pulse rounded-lg" />

								<div className="min-w-0 flex-1 space-y-2">
									<div className="bg-muted h-3 w-16 animate-pulse rounded" />

									<div className="bg-muted h-4 w-24 animate-pulse rounded" />

									<div className="bg-muted h-2.5 w-28 animate-pulse rounded" />
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Chart */}
				<div className="border-t px-4 pt-6 pb-2 sm:px-6">
					<div className="relative h-75 w-full overflow-hidden">
						{/* Horizontal grid */}
						<div className="absolute inset-x-0 top-6 space-y-12">
							<div className="bg-muted/60 h-px w-full" />
							<div className="bg-muted/60 h-px w-full" />
							<div className="bg-muted/60 h-px w-full" />
							<div className="bg-muted/60 h-px w-full" />
							<div className="bg-muted/60 h-px w-full" />
						</div>

						{/* Fake chart area */}
						<div className="absolute inset-x-4 bottom-8 top-8">
							<div className="bg-muted/40 absolute inset-0 animate-pulse rounded-lg" />
						</div>

						{/* Y axis */}
						<div className="absolute bottom-8 left-0 top-8 flex w-12 flex-col justify-between">
							<div className="bg-muted h-2 w-8 animate-pulse rounded" />
							<div className="bg-muted h-2 w-10 animate-pulse rounded" />
							<div className="bg-muted h-2 w-7 animate-pulse rounded" />
							<div className="bg-muted h-2 w-9 animate-pulse rounded" />
							<div className="bg-muted h-2 w-6 animate-pulse rounded" />
						</div>

						{/* X axis */}
						<div className="absolute inset-x-8 bottom-0 flex justify-between">
							{Array.from({ length: 7 }).map((_, index) => (
								<div
									key={index}
									className="bg-muted h-2 w-5 animate-pulse rounded"
								/>
							))}
						</div>
					</div>
				</div>

				{/* Insights */}
				<div className="grid grid-cols-1 border-t sm:grid-cols-2">
					{Array.from({ length: 2 }).map((_, index) => (
						<div
							key={index}
							className={`p-4 ${
								index === 0 ? "sm:border-e" : ""
							}`}>
							<div className="flex items-start justify-between gap-4">
								<div className="space-y-2">
									<div className="bg-muted h-3 w-24 animate-pulse rounded" />

									<div className="bg-muted h-4 w-20 animate-pulse rounded" />

									<div className="bg-muted h-3 w-32 animate-pulse rounded" />
								</div>

								<div className="bg-muted size-9 shrink-0 animate-pulse rounded-lg" />
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
