import type { HydratedDocument, Types } from "mongoose";

export const UserRole = ["user", "admin"] as const;

export type UserRole = (typeof UserRole)[number];

export const UserStatus = ["active", "inactive", "blocked"] as const;

export type UserStatus = (typeof UserStatus)[number];

export interface IUser {
	name: string;

	email: string;

	password: string;

	role: UserRole;

	status: UserStatus;

	emailVerified: boolean;

	lastLoginAt?: Date;

	createdAt: Date;

	updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

export type UserObject = Omit<IUser, "_id"> & {
	_id: Types.ObjectId;
};

export type PublicUser = {
	id: string;

	name: string;

	email: string;

	role: UserRole;

	status: UserStatus;

	emailVerified: boolean;

	lastLoginAt?: Date;

	createdAt: Date;

	updatedAt: Date;
};
