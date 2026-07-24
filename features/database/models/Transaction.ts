import { model, models, Schema } from "mongoose";

import { TransactionType } from "@/features/finance/types";

import { mongooseTransform } from "./mongoose-transform";

const TransactionSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		categoryId: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
			index: true,
		},

		type: {
			type: String,
			enum: TransactionType,
			required: true,
		},

		description: {
			type: String,
			default: "",
		},

		amount: {
			type: Number,
			required: true,
			min: 0,
		},

		transactionDate: {
			type: Date,
			required: true,
			default: Date.now,
			index: true,
		},

		month: {
			type: Number,
			required: true,
			min: 1,
			max: 12,
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

TransactionSchema.index({
	userId: 1,
	transactionDate: -1,
});

TransactionSchema.index({
	userId: 1,
	categoryId: 1,
});

export const Transaction =
	models.Transaction ?? model("Transaction", TransactionSchema);
