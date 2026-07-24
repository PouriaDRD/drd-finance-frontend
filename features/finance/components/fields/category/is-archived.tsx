"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel, Switch } from "@/components/ui";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function IsArchivedField<T extends FieldValues>({
	control,
	name,
	label = "آرشیو شود",
}: Props<T>) {
	const id = `field-${String(name)}`;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<div className="flex items-center justify-between gap-4">
						<FieldLabel htmlFor={id}>{label}</FieldLabel>

						<Switch
							id={id}
							checked={field.value ?? false}
							onCheckedChange={(checked) =>
								field.onChange(Boolean(checked))
							}
							onBlur={field.onBlur}
						/>
					</div>

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
