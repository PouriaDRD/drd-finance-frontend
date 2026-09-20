"use client";

import {
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

function formatMoney(value: number): string {
	return `${Math.abs(value).toLocaleString("fa-IR")} تومان`;
}

export function YearlySummaryTable({ summary }: Props) {
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
				<CardTitle className="text-base">
					جزئیات ماه‌های {summary.year}
				</CardTitle>

				<p
					className={`
						text-xs
						text-muted-foreground
					`}>
					خلاصه درآمد، هزینه و مانده هر ماه
				</p>
			</CardHeader>

			<CardContent className="p-0">
				<div className="overflow-x-auto">
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
								<TableRow key={item.month}>
									<TableCell
										className={`
												font-medium
											`}>
										{item.month_name}
									</TableCell>

									<TableCell className="text-center">
										{item.count.toLocaleString("fa-IR")}
									</TableCell>

									<TableCell
										className={`
												text-center
												text-green-700
												dark:text-green-600
											`}>
										{formatMoney(item.income)}
									</TableCell>

									<TableCell
										className={`
												text-center
												text-red-700
												dark:text-red-600
											`}>
										{formatMoney(item.expense)}
									</TableCell>

									<TableCell
										className={cn(
											`
													text-center
													font-semibold
												`,
											item.balance > 0
												? `
														text-green-700
														dark:text-green-600
													`
												: item.balance < 0
													? `
															text-red-700
															dark:text-red-600
														`
													: `
															text-muted-foreground
														`,
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
