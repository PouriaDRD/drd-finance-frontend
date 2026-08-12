"use client";

import { CalendarDays, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui";

import { useReportForm } from "../../hooks";
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

	return (
		<form
			onSubmit={submit}
			className="bg-card border-border/70 rounded-xl border p-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
				<div className="flex items-center gap-3 sm:me-2">
					<div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
						<CalendarDays className="size-4" />
					</div>

					<div className="whitespace-nowrap">
						<p className="text-sm font-semibold">گزارش مالی</p>

						<p className="text-muted-foreground text-xs">
							انتخاب دوره
						</p>
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-end">
					<div className="w-full sm:w-32">
						<YearField
							control={form.control}
							name="year"
							label="سال"
						/>
					</div>

					<div className="w-full sm:w-36">
						<MonthField
							control={form.control}
							name="month"
							label="ماه"
						/>
					</div>

					<Button
						type="submit"
						variant="default"
						className="w-full sm:w-auto sm:min-w-28">
						<SearchIcon className="size-4" />
						جستجو
					</Button>
				</div>
			</div>
		</form>
	);
}
