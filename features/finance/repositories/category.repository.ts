import { Category } from "@/features/database/models";
import { BaseRepository } from "@/features/database/repositories";

import type { CategoryType, ICategory } from "../types";

class CategoryRepository extends BaseRepository<ICategory> {
	constructor() {
		super(Category);
	}

	findByUserId(userId: string) {
		return this.model
			.find({
				userId,
			})
			.sort({ name: 1 });
	}

	findNotArchivedByUserId(userId: string) {
		return this.model
			.find({
				userId,
				isArchived: false,
			})
			.sort({ name: 1 });
	}

	findArchivedByUserId(userId: string) {
		return this.model
			.find({
				userId,
				isArchived: true,
			})
			.sort({ name: 1 });
	}

	findByType(userId: string, type: CategoryType) {
		return this.model
			.find({
				userId,
				type,
				isArchived: false,
			})
			.sort({ name: 1 });
	}

	findByName(userId: string, name: string) {
		return this.model.findOne({
			userId,
			name: name.trim(),
		});
	}

	existsByName(userId: string, name: string) {
		return this.model.exists({
			userId,
			name: name.trim(),
		});
	}

	archive(id: string) {
		return this.model.findByIdAndUpdate(
			id,
			{
				$set: {
					isArchived: true,
				},
			},
			{ new: true },
		);
	}

	restore(id: string) {
		return this.model.findByIdAndUpdate(
			id,
			{
				$set: {
					isArchived: false,
				},
			},
			{ new: true },
		);
	}
}

export const categoryRepository = new CategoryRepository();
