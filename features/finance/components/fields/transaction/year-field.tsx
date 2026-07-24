"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel, Input } from "@/components/ui";

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
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="field-year">{label}</FieldLabel>

					<Input
						id="field-year"
						type="number"
						placeholder="سال"
						className="w-full"
						value={field.value ?? ""}
						onBlur={field.onBlur}
						name={field.name}
						ref={field.ref}
						onChange={(e) => {
							const value = e.target.value;
							field.onChange(
								value === ""
									? undefined
									: e.target.valueAsNumber,
							);
						}}
					/>

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
