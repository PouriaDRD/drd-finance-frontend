import type { HydratedDocument, Types } from "mongoose";
import z from "zod";

import { transactionSchema } from "../schemas";

export type TransactionSchema = z.infer<typeof transactionSchema>;

export const TransactionType = ["income", "expense"] as const;

export type TransactionType = (typeof TransactionType)[number];

export interface ITransaction {
	userId: string;

	categoryId: string;

	type: TransactionType;

	description: string;

	amount: number;

	transactionDate: Date;

	month: number;

	createdAt: Date;

	updatedAt: Date;
}

export type TransactionDocument = HydratedDocument<ITransaction>;

export type TransactionObject = Omit<ITransaction, "userId" | "categoryId"> & {
	_id: Types.ObjectId;

	userId: Types.ObjectId | string;

	categoryId: Types.ObjectId | string;
};

export type PublicTransaction = {
	id: string;

	userId: string;

	categoryId:
		| string
		| {
				id: string;
				name: string;
		  };

	type: TransactionType;

	description: string;

	amount: number;

	transactionDate: Date;

	month: number;

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
