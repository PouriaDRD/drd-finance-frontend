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
import { TransactionMonth } from "@/features/finance/types";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function MonthField<T extends FieldValues>({
	control,
	name,
	label = "ماه",
}: Props<T>) {
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
							<SelectValue placeholder="انتخاب ماه">
								{
									TransactionMonth.find(
										(month) => month.value === field.value,
									)?.label
								}
							</SelectValue>{" "}
						</SelectTrigger>

						<SelectContent>
							{TransactionMonth.map((month) => (
								<SelectItem
									key={month.value}
									value={String(month.value)}>
									{month.label}
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
