import { User } from "@/features/database/models";
import { BaseRepository } from "@/features/database/repositories";

import type { IUser, UserStatus } from "../types";

class UserRepository extends BaseRepository<IUser> {
	constructor() {
		super(User);
	}

	async findByEmail(email: string) {
		return this.model.findOne({
			email: email.trim().toLowerCase(),
		});
	}

	async findByEmailForAuth(email: string) {
		return this.model
			.findOne({
				email: email.trim().toLowerCase(),
			})
			.select("+password");
	}

	async findByEmailForLogin(email: string, includePassword = false) {
		const query = this.model.findOne({
			email: email.trim().toLowerCase(),
		});

		if (includePassword) {
			query.select("+password");
		}

		return query;
	}

	async existsByEmail(email: string): Promise<boolean> {
		const user = await this.model.exists({
			email: email.trim().toLowerCase(),
		});

		return Boolean(user);
	}

	async updateStatus(id: string, status: UserStatus) {
		return this.model.findByIdAndUpdate(
			id,
			{
				status,
			},
			{
				new: true,
				runValidators: true,
			},
		);
	}

	async updatePassword(id: string, password: string) {
		return this.model.findByIdAndUpdate(
			id,
			{
				password,
			},
			{
				new: true,
				runValidators: true,
			},
		);
	}

	async updateLastLoginAt(id: string) {
		return this.model.findByIdAndUpdate(
			id,
			{
				lastLoginAt: new Date(),
			},
			{
				new: true,
				runValidators: true,
			},
		);
	}
}

export const userRepository = new UserRepository();
