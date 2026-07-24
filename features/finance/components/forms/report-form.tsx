"use client";

import { SearchIcon } from "lucide-react";

import { Button, FieldGroup } from "@/components/ui";

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
			id="report-form"
			onSubmit={submit}
			className="flex flex-col gap-4">
			<FieldGroup className="grid grid-cols-2">
				{/* Year */}
				<YearField control={form.control} name="year" label="سال" />

				{/* Month */}
				<MonthField control={form.control} name="month" label="ماه" />
			</FieldGroup>

			<Button type="submit" form="report-form" variant={"outline"}>
				<SearchIcon />
				جستجو
			</Button>
		</form>
	);
}
