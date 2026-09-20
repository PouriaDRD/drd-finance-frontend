"use client";

import { CalendarDays, RotateCcw } from "lucide-react";

import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";

interface Props {
	year: number;
	onYearChange: (year: number) => void;
	disabled?: boolean;
}

export function YearlyReportToolbar({
	year,
	onYearChange,
	disabled = false,
}: Props) {
	const currentYear = toIranDateTime(new Date()).year;

	const years = Array.from(
		{
			length: currentYear - 1400 + 1,
		},
		(_, index) => currentYear - index,
	);

	return (
		<div
			className={`
				flex flex-col gap-4 rounded-2xl
				border border-border/70 bg-card
				p-4 shadow-sm
				sm:flex-row sm:items-end
				sm:justify-between
			`}>
			<div className="flex items-center gap-3">
				<div
					className={`
						flex size-10 items-center
						justify-center rounded-xl
						bg-muted text-muted-foreground
					`}>
					<CalendarDays className="size-4" />
				</div>

				<div>
					<p className="text-sm font-semibold">سال گزارش</p>

					<p className="mt-0.5 text-[11px] text-muted-foreground">
						عملکرد مالی ۱۲ ماه شمسی
					</p>
				</div>
			</div>

			<div className="flex items-end gap-2">
				<div className="w-36">
					<p className="mb-2 text-xs font-medium">سال</p>

					<Select
						value={String(year)}
						disabled={disabled}
						onValueChange={(value) => {
							onYearChange(Number(value));
						}}>
						<SelectTrigger className="w-full">
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							{years.map((item) => (
								<SelectItem key={item} value={String(item)}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Button
					type="button"
					variant="outline"
					disabled={disabled || year === currentYear}
					onClick={() => {
						onYearChange(currentYear);
					}}>
					<RotateCcw className="size-4" />
					سال جاری
				</Button>
			</div>
		</div>
	);
}
