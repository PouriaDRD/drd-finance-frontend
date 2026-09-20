"use client";

import {
	CalendarRange,
	Download,
	FileSpreadsheet,
	FileText,
	LoaderCircle,
	Search,
} from "lucide-react";

import { Button } from "@/components/ui";

import { useCurrentMonthExport, useReportForm } from "../../hooks";
import { ReportSchema } from "../../types/report.type";
import { MonthField, YearField } from "../fields/transaction";

interface Props {
	onSuccess?: (data: ReportSchema) => void;
}

export function ReportForm({ onSuccess }: Props) {
	const { form, submit } = useReportForm({
		onSuccess(data) {
			onSuccess?.(data);
		},
	});

	const { exportCurrentMonth, exportingFormat, isExporting } =
		useCurrentMonthExport();

	return (
		<form
			onSubmit={submit}
			className={`
				overflow-hidden rounded-2xl
				border border-border/70 bg-card
			`}>
			<div
				className={`
					flex flex-col gap-4 p-4
					lg:flex-row lg:items-end
					lg:justify-between
				`}>
				<div
					className={`
						flex min-w-0 flex-1
						flex-col gap-4
					`}>
					<div
						className={`
							flex items-center gap-3
						`}>
						<div
							className={`
								flex size-10 shrink-0
								items-center justify-center
								rounded-xl bg-primary/10
								text-primary
							`}>
							<CalendarRange className="size-4" />
						</div>

						<div>
							<p
								className={`
									text-sm font-semibold
								`}>
								دوره گزارش
							</p>

							<p
								className={`
									text-xs
									text-muted-foreground
								`}>
								سال و ماه شمسی موردنظر را انتخاب کنید
							</p>
						</div>
					</div>

					<div
						className={`
							grid gap-3
							sm:grid-cols-[140px_160px_auto]
							sm:items-end
						`}>
						<YearField
							control={form.control}
							name="year"
							label="سال"
						/>

						<MonthField
							control={form.control}
							name="month"
							label="ماه"
						/>

						<Button
							type="submit"
							className={`
								w-full sm:w-auto
								sm:min-w-28
							`}>
							<Search className="size-4" />
							نمایش گزارش
						</Button>
					</div>
				</div>

				<div
					className={`
						border-border/70 pt-4
						lg:w-75 lg:border-s
						lg:ps-4 lg:pt-0
					`}>
					<div
						className={`
							mb-3 flex items-center
							gap-3
						`}>
						<div
							className={`
								flex size-9 shrink-0
								items-center justify-center
								rounded-lg bg-muted
							`}>
							<Download className="size-4" />
						</div>

						<div>
							<p
								className={`
									text-sm font-semibold
								`}>
								خروجی ماه جاری
							</p>

							<p
								className={`
									text-[11px]
									text-muted-foreground
								`}>
								CSV یا Excel با تاریخ شمسی و میلادی
							</p>
						</div>
					</div>

					<div
						className={`
							grid grid-cols-2 gap-2
						`}>
						<Button
							type="button"
							variant="outline"
							disabled={isExporting}
							onClick={() => {
								void exportCurrentMonth("xlsx");
							}}>
							{exportingFormat === "xlsx" ? (
								<LoaderCircle
									className={`
										size-4 animate-spin
									`}
								/>
							) : (
								<FileSpreadsheet className="size-4" />
							)}
							Excel
						</Button>

						<Button
							type="button"
							variant="outline"
							disabled={isExporting}
							onClick={() => {
								void exportCurrentMonth("csv");
							}}>
							{exportingFormat === "csv" ? (
								<LoaderCircle
									className={`
										size-4 animate-spin
									`}
								/>
							) : (
								<FileText className="size-4" />
							)}
							CSV
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}
