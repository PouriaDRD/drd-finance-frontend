"use client";

import { PersianMonthSummary } from "@/features/finance/types";

import { StatBaseCard } from "../stat-base-card";

import { CategorySummaryStats } from "./category-summary-stats";

interface Props {
	summary?: PersianMonthSummary | null;
}

export function SummaryStats({ summary }: Props) {
	const allTransactions = summary?.count ?? 0;

	const income = summary?.income ?? 0;
	const incomeDisplay = income.toLocaleString("fa-IR");

	const expense = summary?.expense ?? 0;
	const expenseDisplay = expense.toLocaleString("fa-IR");

	const balance = summary?.balance ?? 0;
	const balanceDisplay = balance.toLocaleString("fa-IR");

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<StatBaseCard label="موجودی" value={balanceDisplay}>
				تومان
			</StatBaseCard>

			<StatBaseCard label="درآمد کل" value={incomeDisplay}>
				تومان
			</StatBaseCard>

			<StatBaseCard label="هزینه کل" value={expenseDisplay}>
				تومان
			</StatBaseCard>

			<StatBaseCard
				label="کل تراکنش‌ها"
				value={allTransactions.toString()}>
				تراکنش‌
			</StatBaseCard>

			<CategorySummaryStats summary={summary} />
		</div>
	);
}
