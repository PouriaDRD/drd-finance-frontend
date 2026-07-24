"use client";

import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel, Textarea } from "@/components/ui";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function DescriptionField<T extends FieldValues>(props: Props<T>) {
	const { control, name, label = "توضیحات" } = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor="form-description">{label}</FieldLabel>
					<Textarea
						{...field}
						id="form-description"
						autoComplete="description"
						aria-invalid={fieldState.invalid}
						placeholder="توضیحات"
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
