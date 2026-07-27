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
		<form onSubmit={submit} className="rounded-lg border bg-card p-4">
			<FieldGroup className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
				<YearField control={form.control} name="year" label="سال" />

				<MonthField control={form.control} name="month" label="ماه" />

				<Button
					type="submit"
					className="mt-auto w-full md:w-auto"
					variant={"secondary"}>
					<SearchIcon className="size-4" />
					جستجو
				</Button>
			</FieldGroup>
		</form>
	);
}
