import { model, models, Schema } from "mongoose";

import { CategoryType } from "@/features/finance/types";

import { mongooseTransform } from "./mongoose-transform";

const CategorySchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		type: {
			type: String,
			enum: CategoryType,
			required: true,
		},

		description: {
			type: String,
			default: "",
		},

		isArchived: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,

		toJSON: {
			transform: mongooseTransform,
		},

		toObject: {
			transform: mongooseTransform,
		},
	},
);

CategorySchema.index({
	userId: 1,
	type: 1,
	name: 1,
});

export const Category = models.Category ?? model("Category", CategorySchema);
