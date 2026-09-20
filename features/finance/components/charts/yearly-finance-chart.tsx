"use client";

import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
} from "recharts";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui";

import { YearlySummary } from "../../types";

interface Props {
	summary: YearlySummary;
}

const chartConfig = {
	income: {
		label: "درآمد",
		color: "var(--chart-2)",
	},
	expense: {
		label: "هزینه",
		color: "var(--chart-1)",
	},
	balance: {
		label: "مانده",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig;

function formatAxisValue(value: number) {
	return new Intl.NumberFormat("fa-IR", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(value);
}

export function YearlyFinanceChart({ summary }: Props) {
	const data = summary.monthly_report.map((item) => ({
		month: item.month_name,
		income: Math.abs(item.income),
		expense: Math.abs(item.expense),
		balance: item.balance,
		count: item.count,
	}));

	const busiestMonth = [...summary.monthly_report]
		.sort((a, b) => b.count - a.count)
		.at(0);

	return (
		<Card
			className={`
				overflow-hidden border-border/70
				shadow-sm
			`}>
			<CardHeader
				className={`
					flex flex-col gap-3 border-b
					border-border/60
					sm:flex-row sm:items-center
					sm:justify-between
				`}>
				<div>
					<CardTitle className="text-base">
						روند سال {summary.year}
					</CardTitle>

					<p className="mt-1 text-xs text-muted-foreground">
						مقایسه درآمد، هزینه و مانده در ۱۲ ماه
					</p>
				</div>

				{busiestMonth && busiestMonth.count > 0 && (
					<Badge variant="outline" className="font-normal">
						بیشترین فعالیت: {busiestMonth.month_name}
					</Badge>
				)}
			</CardHeader>

			<CardContent className="pt-5">
				<ChartContainer config={chartConfig} className="h-85 w-full">
					<ComposedChart
						data={data}
						margin={{
							top: 10,
							right: 8,
							left: 8,
							bottom: 0,
						}}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />

						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={10}
						/>

						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={formatAxisValue}
							width={56}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>

						<Bar
							dataKey="income"
							fill="var(--color-income)"
							radius={[5, 5, 0, 0]}
							maxBarSize={34}
						/>

						<Bar
							dataKey="expense"
							fill="var(--color-expense)"
							radius={[5, 5, 0, 0]}
							maxBarSize={34}
						/>

						<Line
							type="monotone"
							dataKey="balance"
							stroke="var(--color-balance)"
							strokeWidth={2.25}
							dot={false}
							activeDot={{ r: 4 }}
						/>
					</ComposedChart>
				</ChartContainer>

				<div className="mt-4 flex flex-wrap items-center gap-4 border-t pt-4 text-[11px] text-muted-foreground">
					<LegendDot className="bg-(--color-income)" label="درآمد" />

					<LegendDot className="bg-(--color-expense)" label="هزینه" />

					<LegendDot className="bg-(--color-balance)" label="مانده" />
				</div>
			</CardContent>
		</Card>
	);
}

function LegendDot({ className, label }: { className: string; label: string }) {
	return (
		<span className="inline-flex items-center gap-1.5">
			<span className={`size-2 rounded-full ${className}`} />
			{label}
		</span>
	);
}
