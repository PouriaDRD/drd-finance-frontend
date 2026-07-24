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
import { TransactionType } from "@/features/finance/types";

const typeItems = [
	{
		label: "درآمد",
		value: TransactionType[0],
	},
	{
		label: "هزینه",
		value: TransactionType[1],
	},
];

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
};

export function TypeField<T extends FieldValues>({
	control,
	name,
	label = "نوع",
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
						items={typeItems}
						value={field.value}
						onValueChange={field.onChange}>
						<SelectTrigger
							id={id}
							aria-invalid={fieldState.invalid}
							className="w-full">
							<SelectValue placeholder="انتخاب نوع" />
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								{typeItems.map((item) => (
									<SelectItem
										key={item.value}
										value={item.value}>
										{item.label}
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
