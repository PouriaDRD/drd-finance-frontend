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
	}));

	return (
		<Card
			className={`
				overflow-hidden
				border-border/70
			`}>
			<CardHeader
				className={`
					border-b border-border/60
				`}>
				<CardTitle
					className={`
						text-base
					`}>
					روند مالی سال {summary.year}
				</CardTitle>

				<p
					className={`
						text-xs
						text-muted-foreground
					`}>
					مقایسه درآمد، هزینه و مانده در ۱۲ ماه
				</p>
			</CardHeader>

			<CardContent
				className={`
					pt-5
				`}>
				<ChartContainer
					config={chartConfig}
					className={`
						h-80 w-full
					`}>
					<ComposedChart
						data={data}
						margin={{
							top: 10,
							right: 8,
							left: 8,
							bottom: 0,
						}}>
						<CartesianGrid vertical={false} />

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
						/>

						<Bar
							dataKey="expense"
							fill="var(--color-expense)"
							radius={[5, 5, 0, 0]}
						/>

						<Line
							type="monotone"
							dataKey="balance"
							stroke="var(--color-balance)"
							strokeWidth={2}
							dot={false}
						/>
					</ComposedChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
