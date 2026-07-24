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
import { PublicCategory } from "@/features/finance/types";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	categories: PublicCategory[];
	label?: string;
};

export function CategoryField<T extends FieldValues>({
	control,
	name,
	categories,
	label = "دسته‌بندی",
}: Props<T>) {
	const id = `field-${String(name)}`;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={id}>{label}</FieldLabel>

					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger
							id={id}
							aria-invalid={fieldState.invalid}>
							<SelectValue placeholder="انتخاب دسته‌بندی">
								{
									categories.find(
										(category) =>
											category.id === field.value,
									)?.name
								}
							</SelectValue>
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								{categories.map((category) => (
									<SelectItem
										key={category.id}
										value={category.id}>
										<div className="flex items-center gap-2">
											<span>{category.name}</span>

											<span className="text-xs text-muted-foreground">
												(
												{category.type === "income"
													? "درآمد"
													: "هزینه"}
												)
											</span>
										</div>
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
