import { Model, model, models, Schema } from "mongoose";

import { IUser } from "@/features/accounts/types";

import { mongooseTransform } from "./mongoose-transform";

const UserSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: [true, "Email is required."],
			unique: true,
			trim: true,
			lowercase: true,
			index: true,
			match: [
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				"Please enter a valid email address.",
			],
		},

		name: {
			type: String,
			required: [true, "Name is required."],
			trim: true,
			minlength: [2, "Name must be at least 2 characters."],
			maxlength: [100, "Name cannot exceed 100 characters."],
		},

		password: {
			type: String,
			required: [true, "Password is required."],
			select: false,
		},

		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},

		status: {
			type: String,
			enum: ["active", "inactive", "blocked"],
			default: "active",
		},

		emailVerified: {
			type: Boolean,
			default: false,
		},

		lastLoginAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
		versionKey: false,

		toJSON: {
			transform: mongooseTransform,
		},

		toObject: {
			transform: mongooseTransform,
		},
	},
);

export const User: Model<IUser> =
	(models.User as Model<IUser>) || model<IUser>("User", UserSchema);
