import z from "zod";

import { transactionSchema } from "../schemas";

import { Category } from "./category.type";

export type TransactionSchema = z.infer<typeof transactionSchema>;

export const TransactionType = ["income", "expense"] as const;

export type TransactionType = (typeof TransactionType)[number];

export type Transaction = {
	id: string;
	category: Category;
	type: TransactionType;
	description: string;
	amount: number;
	date: Date;
	month: number;
	year: number;
	persian_date: string;
	persian_month_name: string;
	createdAt: Date;
	updatedAt: Date;
};

export const TransactionMonth = [
	{
		value: 1,
		label: "فروردین",
	},
	{
		value: 2,
		label: "اردیبهشت",
	},
	{
		value: 3,
		label: "خرداد",
	},
	{
		value: 4,
		label: "تیر",
	},
	{
		value: 5,
		label: "مرداد",
	},
	{
		value: 6,
		label: "شهریور",
	},
	{
		value: 7,
		label: "مهر",
	},
	{
		value: 8,
		label: "آبان",
	},
	{
		value: 9,
		label: "آذر",
	},
	{
		value: 10,
		label: "دی",
	},
	{
		value: 11,
		label: "بهمن",
	},
	{
		value: 12,
		label: "اسفند",
	},
] as const;

export type TransactionMonthValue = (typeof TransactionMonth)[number]["value"];

export type PersianMonthSummary = {
	year: number;
	month: number;
	month_name: string;
	income: number;
	expense: number;
	balance: number;
	count: number;
	transactions: Transaction[];
};

export type YearlySummaryItem = {
	month: number;
	month_name: string;
	income: number;
	expense: number;
	balance: number;
	count: number;
};

export type YearlySummary = {
	year: number;
	monthly_report: YearlySummaryItem[];
	total_income: number;
	total_expense: number;
	total_balance: number;
};
