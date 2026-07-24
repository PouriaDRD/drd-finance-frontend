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
	SelectGroup,
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
	const id = `field-${String(name)}`;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={id}>{label}</FieldLabel>

					<Select
						value={String(field.value ?? "")}
						onValueChange={(value) =>
							field.onChange(Number(value))
						}>
						<SelectTrigger
							id={id}
							aria-invalid={fieldState.invalid}
							className="w-full">
							<SelectValue placeholder="انتخاب ماه">
								{
									TransactionMonth.find(
										(month) => month.value === field.value,
									)?.label
								}
							</SelectValue>{" "}
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								{TransactionMonth.map((month) => (
									<SelectItem
										key={month.value}
										value={month.value}>
										{month.label}
									</SelectItem>
								))}
							</SelectGroup>
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
