import z from "zod";

import { categorySchema } from "../schemas";

export type CategorySchema = z.infer<typeof categorySchema>;

export const CategoryType = ["income", "expense"] as const;

export type CategoryType = (typeof CategoryType)[number];

export type Category = {
	id: string;
	name: string;
	description: string;
	type: CategoryType;
	is_archived: boolean;
	updated_at: Date;
	created_at: Date;
};

export type CategorySummary = {
	category: Category;
	income: number;
	expense: number;
	total: number;
	count: number;
};
