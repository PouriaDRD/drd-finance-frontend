"use client";

import { Archive, CircleCheck, Tags } from "lucide-react";

import { Card } from "@/components/ui";
import { Category } from "@/features/finance/types";

interface Props {
	categories?: Category[];
}

export function CategoryStats({ categories }: Props) {
	const all = categories?.length ?? 0;

	const archived =
		categories?.filter((category) => category.is_archived).length ?? 0;

	const active = all - archived;

	return (
		<div
			className={`
				grid grid-cols-1 gap-3 sm:grid-cols-3
			`}>
			<CategoryStat
				label="کل دسته‌بندی‌ها"
				value={all}
				description="ساختار مالی حساب"
				icon={Tags}
			/>

			<CategoryStat
				label="فعال"
				value={active}
				description="قابل انتخاب در تراکنش"
				icon={CircleCheck}
			/>

			<CategoryStat
				label="آرشیو"
				value={archived}
				description="غیرفعال و نگهداری‌شده"
				icon={Archive}
			/>
		</div>
	);
}

function CategoryStat({
	label,
	value,
	description,
	icon: Icon,
}: {
	label: string;
	value: number;
	description: string;
	icon: typeof Tags;
}) {
	return (
		<Card className="flex items-center justify-between border-border/70 p-4 shadow-sm">
			<div>
				<p className="text-xs font-medium text-muted-foreground">
					{label}
				</p>

				<p className="mt-1.5 text-2xl font-bold tabular-nums">
					{value.toLocaleString("fa-IR")}
				</p>

				<p className="mt-1 text-[11px] text-muted-foreground">
					{description}
				</p>
			</div>

			<div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40 text-muted-foreground">
				<Icon className="size-4" />
			</div>
		</Card>
	);
}
