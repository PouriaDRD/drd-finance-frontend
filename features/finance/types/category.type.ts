import type { HydratedDocument, Types } from "mongoose";
import z from "zod";

import { categorySchema } from "../schemas";

export type CategorySchema = z.infer<typeof categorySchema>;

export const CategoryType = ["income", "expense"] as const;

export type CategoryType = (typeof CategoryType)[number];

export interface ICategory {
	userId: string;

	name: string;

	type: CategoryType;

	description: string;

	isArchived: boolean;

	createdAt: Date;

	updatedAt: Date;
}

export type CategoryDocument = HydratedDocument<ICategory>;

export type CategoryObject = Omit<ICategory, "userId"> & {
	_id: Types.ObjectId;
	userId: Types.ObjectId | string;
};

export type PublicCategory = {
	id: string;

	userId: string;

	name: string;

	type: CategoryType;

	description: string;

	isArchived: boolean;

	createdAt: Date;

	updatedAt: Date;
};
