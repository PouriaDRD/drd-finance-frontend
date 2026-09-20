"use client";

import {
	CalendarRange,
	FileSpreadsheet,
	FileText,
	LoaderCircle,
	RotateCcw,
	Search,
} from "lucide-react";

import { Button } from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";

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

	const goToCurrentMonth = () => {
		const now = toIranDateTime(new Date());

		form.setValue("year", now.year);
		form.setValue("month", now.month);

		void submit();
	};

	return (
		<form
			onSubmit={submit}
			className={`
				rounded-2xl border border-border/70
				bg-card p-4 shadow-sm
			`}>
			<div
				className={`
					flex flex-col gap-5
					xl:flex-row xl:items-end
					xl:justify-between
				`}>
				<div className="min-w-0 flex-1">
					<div className="mb-4 flex items-center gap-3">
						<div
							className={`
								flex size-9 items-center
								justify-center rounded-xl
								bg-muted text-muted-foreground
							`}>
							<CalendarRange className="size-4" />
						</div>

						<div>
							<p className="text-sm font-semibold">دوره گزارش</p>

							<p className="mt-0.5 text-[11px] text-muted-foreground">
								گزارش را بر اساس ماه شمسی فیلتر کنید
							</p>
						</div>
					</div>

					<div
						className={`
							grid gap-3
							sm:grid-cols-[140px_160px_auto_auto]
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

						<Button type="submit" className="sm:min-w-30">
							<Search className="size-4" />
							نمایش
						</Button>

						<Button
							type="button"
							variant="ghost"
							onClick={goToCurrentMonth}
							className="sm:min-w-28">
							<RotateCcw className="size-4" />
							ماه جاری
						</Button>
					</div>
				</div>

				<div
					className={`
						border-t border-border/70 pt-4
						xl:w-80 xl:border-s xl:border-t-0
						xl:ps-5 xl:pt-0
					`}>
					<div className="mb-3">
						<p className="text-sm font-semibold">خروجی ماه جاری</p>

						<p className="mt-0.5 text-[11px] text-muted-foreground">
							شامل تاریخ شمسی و میلادی
						</p>
					</div>

					<div className="grid grid-cols-2 gap-2">
						<Button
							type="button"
							variant="outline"
							disabled={isExporting}
							onClick={() => {
								void exportCurrentMonth("xlsx");
							}}>
							{exportingFormat === "xlsx" ? (
								<LoaderCircle className="size-4 animate-spin" />
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
								<LoaderCircle className="size-4 animate-spin" />
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
