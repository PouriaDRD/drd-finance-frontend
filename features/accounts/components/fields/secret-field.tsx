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

export function SecretField<T extends FieldValues>(props: Props<T>) {
	const { control, name, label = "سکرت" } = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-secret">{label}</FieldLabel>
					<Input
						{...field}
						dir="ltr"
						type="password"
						id="form-secret"
						aria-invalid={fieldState.invalid}
						placeholder="سکرت"
						className="placeholder:text-right"
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
