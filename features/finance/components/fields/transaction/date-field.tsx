"use client";

import DateObject from "react-date-object";
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
import { toPersianDateObject } from "@/features/finance/utils";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function DateField<T extends FieldValues>({
	control,
	name,
	label = "تاریخ",
}: Props<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				let value: DateObject | undefined;

				if (field.value instanceof DateObject) {
					value = new DateObject(field.value).convert(
						persian,
						persianFa,
					);
				} else if (field.value) {
					try {
						value = toPersianDateObject(field.value);
					} catch {
						value = undefined;
					}
				}

				return (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel>{label}</FieldLabel>

						<DatePicker
							value={value}
							onChange={(date) => {
								if (Array.isArray(date)) {
									return;
								}

								field.onChange(date ?? null);
							}}
							calendar={persian}
							locale={persianFa}
							calendarPosition="bottom-right"
							format="YYYY/MM/DD"
							inputClass="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus:border-ring focus:ring-[3px] focus:ring-ring/20"
							containerClassName="w-full"
							placeholder="انتخاب تاریخ"
						/>

						<p
							className={`
								-mt-1 text-[11px]
								text-muted-foreground
							`}>
							تاریخ شمسی بدون تبدیل UTC ذخیره می‌شود.
						</p>

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
