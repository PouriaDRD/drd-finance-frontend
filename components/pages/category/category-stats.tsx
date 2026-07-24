"use client";

import { Category } from "@/features/finance/types";

import { StatBaseCard } from "../stat-base-card";

interface Props {
	categories?: Category[];
}

export function CategoryStats({ categories }: Props) {
	const allCategories = categories?.length ?? 0;

	const archivedCategories = categories?.filter(
		(category) => category.is_archived === true,
	);

	const activeCategories = categories?.filter(
		(category) => category.is_archived === false,
	);

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<StatBaseCard
				label="کل دسته‌بندی‌ها"
				value={allCategories.toString()}
			/>

			<StatBaseCard
				label="دسته‌بندی‌های فعال"
				value={activeCategories?.length.toString() ?? "0"}
			/>

			<StatBaseCard
				label="دسته‌بندی‌های آرشیو"
				value={archivedCategories?.length.toString() ?? "0"}
			/>
		</div>
	);
}
