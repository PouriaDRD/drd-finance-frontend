"use client";

import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import DatePicker from "react-multi-date-picker";

import { Field, FieldError, FieldLabel } from "@/components/ui";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function DateField<T extends FieldValues>({
	control,
	name,
	label,
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const value = field.value
					? new DateObject({
							date: field.value,
							calendar: gregorian,
						}).convert(persian, persianFa)
					: undefined;

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel>{label}</FieldLabel>

						<DatePicker
							value={value}
							onChange={(date) => {
								field.onChange(
									date
										? date.convert(gregorian).toDate()
										: null,
								);
							}}
							calendar={persian}
							locale={persianFa}
							calendarPosition="bottom-right"
							format="YYYY/MM/DD"
							inputClass="w-full rounded-sm border px-3 py-2 text-sm outline-none"
						/>

						{fieldState.error && (
							<FieldError
								errors={[fieldState.error]}
								className="text-xs"
							/>
						)}
					</Field>
				);
			}}
		/>
	);
}
