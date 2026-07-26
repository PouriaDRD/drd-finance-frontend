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

	// Determine variant based on total amount
	const getVariant = (total: number): "default" | "positive" | "negative" => {
		if (total > 0) return "positive";
		if (total < 0) return "negative";
		return "default";
	};

	const getSummary = (item: CategorySummary) => {
		const itemTotal = Math.abs(item.total).toLocaleString("fa-IR");
		const value = `${itemTotal} تومان`;

		return (
			<StatBaseCard
				key={item.category.id}
				label={item.category.name}
				value={value}
				variant={getVariant(item.total)}
				small={true}>
				{item.count} تراکنش
			</StatBaseCard>
		);
	};

	return <>{categorySummary.map((item) => getSummary(item))}</>;
}
