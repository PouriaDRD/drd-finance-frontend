import { useMemo } from "react";

import type {
	CategorySummary,
	PersianMonthSummary,
} from "@/features/finance/types";

import { StatBaseCard } from "../stat-base-card";

interface Props {
	summary?: PersianMonthSummary | null;
}

export function CategorySummaryStats({ summary }: Props) {
	const categorySummary = useMemo(() => {
		if (!summary) return [];

		const map = new Map<string, CategorySummary>();

		for (const transaction of summary.transactions) {
			const key = transaction.category.id;

			if (!map.has(key)) {
				map.set(key, {
					category: transaction.category,
					income: 0,
					expense: 0,
					total: 0,
					count: 0,
				});
			}

			const item = map.get(key)!;

			item.count++;

			if (transaction.type === "income") {
				item.income += transaction.amount;
			} else {
				item.expense += transaction.amount;
			}

			item.total += transaction.amount;
		}

		return [...map.values()].sort((a, b) => b.total - a.total);
	}, [summary]);

	return (
		<>
			{categorySummary.map((item) => (
				<StatBaseCard
					key={item.category.id}
					label={item.category.name}
					value={item.total.toLocaleString("fa-IR")}>
					تومان
				</StatBaseCard>
			))}
		</>
	);
}

{
	/* <div
	key={item.category.id}
	className="flex items-center justify-between rounded-lg border p-4">
	<div>
		<p className="font-medium">{item.category.name}</p>
		<p className="text-muted-foreground text-sm">
			{item.count.toLocaleString("fa-IR")} تراکنش
		</p>
	</div>

	<div className="text-left">
		<p>{item.total.toLocaleString("fa-IR")} تومان</p>
	</div>
</div>; */
}
