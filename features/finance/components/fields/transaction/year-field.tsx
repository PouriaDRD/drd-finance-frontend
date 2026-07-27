"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import {
	Field,
	FieldError,
	FieldLabel,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function YearField<T extends FieldValues>({
	control,
	name,
	label = "سال",
}: Props<T>) {
	const currentYear = toIranDateTime(new Date()).year;

	const years = Array.from(
		{ length: currentYear - 1400 + 1 },
		(_, index) => currentYear - index,
	);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>{label}</FieldLabel>

					<Select
						value={field.value ? String(field.value) : undefined}
						onValueChange={(value) =>
							field.onChange(Number(value))
						}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="انتخاب سال" />
						</SelectTrigger>

						<SelectContent>
							{years.map((year) => (
								<SelectItem key={year} value={String(year)}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{fieldState.error && (
						<FieldError
							errors={[fieldState.error]}
							className="text-xs"
						/>
					)}
				</Field>
			)}
		/>
	);
}
