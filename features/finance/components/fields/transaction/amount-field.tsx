"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { toEnglishDigits } from "@/features/shared/utils";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function AmountField<T extends FieldValues>({
	control,
	name,
	label = "مبلغ واریزی (به تومان)",
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>{label}</FieldLabel>

					<Input
						{...field}
						dir="ltr"
						inputMode="numeric"
						placeholder="100,000"
						className="placeholder:text-right"
						aria-invalid={fieldState.invalid}
						value={
							field.value
								? Number(field.value).toLocaleString("fa-IR")
								: ""
						}
						onChange={(e) => {
							const value = toEnglishDigits(
								e.target.value,
							).replace(/\D/g, "");

							field.onChange(value ? Number(value) : "");
						}}
					/>

					{fieldState.error && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	);
}
