"use client";

import { PersianMonthSummary } from "@/features/finance/types";

import { StatBaseCard } from "../stat-base-card";

import { CategorySummaryStats } from "./category-summary-stats";

interface Props {
	summary?: PersianMonthSummary | null;
}

export function SummaryStats({ summary }: Props) {
	const allTransactions = summary?.count ?? 0;

	// Income
	const income = Math.abs(summary?.income ?? 0);
	const incomeDisplay = `${income.toLocaleString("fa-IR")} تومان`;
	const incomeTransactionsCount =
		summary?.transactions.filter(
			(transaction) => transaction.type === "income",
		).length ?? 0;

	// Expense
	const expense = Math.abs(summary?.expense ?? 0);
	const expenseDisplay = `${expense.toLocaleString("fa-IR")} تومان`;
	const expenseTransactionsCount =
		summary?.transactions.filter(
			(transaction) => transaction.type === "expense",
		).length ?? 0;

	// Balance
	const balance = summary?.balance ?? 0;
	const balanceDisplay = balance.toLocaleString("fa-IR");

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<StatBaseCard
				label="موجودی"
				value={balanceDisplay}
				variant={
					balance === 0
						? "default"
						: balance > 0
							? "positive"
							: "negative"
				}>
				کل تراکنش‌ها: {allTransactions.toString()}
			</StatBaseCard>

			<StatBaseCard
				label="درآمد کل"
				value={incomeDisplay}
				variant="positive">
				{incomeTransactionsCount} تراکنش
			</StatBaseCard>

			<StatBaseCard
				label="هزینه کل"
				value={expenseDisplay}
				variant="negative">
				{expenseTransactionsCount} تراکنش
			</StatBaseCard>

			<CategorySummaryStats summary={summary} />
		</div>
	);
}
