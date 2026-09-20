"use client";

import { CalendarRange } from "lucide-react";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { cn } from "@/features/shared/utils";

import { YearlySummary } from "../../types";

interface Props {
	summary: YearlySummary;
}

function formatMoney(value: number) {
	return `${Math.abs(value).toLocaleString("fa-IR")} تومان`;
}

export function YearlySummaryTable({ summary }: Props) {
	return (
		<Card
			className={`
				overflow-hidden border-border/70
				shadow-sm
			`}>
			<CardHeader className="flex flex-row items-center justify-between border-b border-border/60">
				<div>
					<CardTitle className="text-base">جزئیات ماه‌ها</CardTitle>

					<p className="mt-1 text-xs text-muted-foreground">
						خلاصه عملکرد هر ماه در سال {summary.year}
					</p>
				</div>

				<Badge variant="outline" className="font-normal">
					۱۲ ماه
				</Badge>
			</CardHeader>

			<CardContent className="p-0">
				<div className="md:hidden">
					<div className="divide-y divide-border/70">
						{summary.monthly_report.map((item) => (
							<div key={item.month} className="p-4">
								<div className="flex items-center justify-between gap-3">
									<div className="flex items-center gap-2">
										<CalendarRange className="size-4 text-muted-foreground" />

										<p className="text-sm font-semibold">
											{item.month_name}
										</p>
									</div>

									<Badge
										variant="outline"
										className="font-normal">
										{item.count.toLocaleString("fa-IR")}{" "}
										تراکنش
									</Badge>
								</div>

								<div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-muted/35 p-3 text-center">
									<MiniValue
										label="درآمد"
										value={formatMoney(item.income)}
										className="text-emerald-600 dark:text-emerald-400"
									/>

									<MiniValue
										label="هزینه"
										value={formatMoney(item.expense)}
										className="text-rose-600 dark:text-rose-400"
									/>

									<MiniValue
										label="مانده"
										value={`${item.balance.toLocaleString(
											"fa-IR",
										)} تومان`}
										className={cn(
											item.balance > 0
												? "text-emerald-600 dark:text-emerald-400"
												: item.balance < 0
													? "text-rose-600 dark:text-rose-400"
													: "text-foreground",
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="hidden overflow-x-auto md:block">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ماه</TableHead>
								<TableHead className="text-center">
									تراکنش
								</TableHead>
								<TableHead className="text-center">
									درآمد
								</TableHead>
								<TableHead className="text-center">
									هزینه
								</TableHead>
								<TableHead className="text-center">
									مانده
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{summary.monthly_report.map((item) => (
								<TableRow
									key={item.month}
									className="hover:bg-muted/25">
									<TableCell className="font-medium">
										{item.month_name}
									</TableCell>

									<TableCell className="text-center">
										{item.count.toLocaleString("fa-IR")}
									</TableCell>

									<TableCell className="text-center text-emerald-600 dark:text-emerald-400">
										{formatMoney(item.income)}
									</TableCell>

									<TableCell className="text-center text-rose-600 dark:text-rose-400">
										{formatMoney(item.expense)}
									</TableCell>

									<TableCell
										className={cn(
											"text-center font-semibold",
											item.balance > 0
												? "text-emerald-600 dark:text-emerald-400"
												: item.balance < 0
													? "text-rose-600 dark:text-rose-400"
													: "text-foreground",
										)}>
										{item.balance.toLocaleString("fa-IR")}{" "}
										تومان
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}

function MiniValue({
	label,
	value,
	className,
}: {
	label: string;
	value: string;
	className?: string;
}) {
	return (
		<div className="min-w-0">
			<p className="text-[10px] text-muted-foreground">{label}</p>

			<p className={cn("mt-1 truncate text-xs font-semibold", className)}>
				{value}
			</p>
		</div>
	);
}
