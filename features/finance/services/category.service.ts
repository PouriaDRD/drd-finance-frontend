import { categoryRepository } from "../repositories";
import type {
	CategoryDocument,
	CategoryType,
	ICategory,
	PublicCategory,
} from "../types";

export class CategoryService {
	async create(
		data: Omit<ICategory, "createdAt" | "updatedAt">,
	): Promise<PublicCategory> {
		const exists = await categoryRepository.existsByName(
			data.userId,
			data.name,
		);

		if (exists) {
			throw new Error("این دسته‌بندی قبلاً ایجاد شده است.");
		}

		const category = await categoryRepository.create(data);

		return this.toPublic(category);
	}

	async getById(id: string): Promise<PublicCategory | null> {
		const category = await categoryRepository.findById(id);

		return category ? this.toPublic(category) : null;
	}

	async getByUserId(userId: string): Promise<PublicCategory[]> {
		const categories = await categoryRepository.findByUserId(userId);

		return categories.map((category) => this.toPublic(category));
	}

	async getByType(
		userId: string,
		type: CategoryType,
	): Promise<PublicCategory[]> {
		const categories = await categoryRepository.findByType(userId, type);

		return categories.map((category) => this.toPublic(category));
	}

	async list(userId: string): Promise<PublicCategory[]> {
		const categories = await categoryRepository.findByUserId(userId);

		return categories.map((category) => this.toPublic(category));
	}

	async listNotArchived(userId: string): Promise<PublicCategory[]> {
		const categories =
			await categoryRepository.findNotArchivedByUserId(userId);

		return categories.map((category) => this.toPublic(category));
	}

	async update(
		id: string,
		data: Partial<ICategory>,
	): Promise<PublicCategory | null> {
		const category = await categoryRepository.updateById(id, data);

		return category ? this.toPublic(category) : null;
	}

	async archive(id: string): Promise<PublicCategory | null> {
		const category = await categoryRepository.archive(id);

		return category ? this.toPublic(category) : null;
	}

	async restore(id: string): Promise<PublicCategory | null> {
		const category = await categoryRepository.restore(id);

		return category ? this.toPublic(category) : null;
	}

	async delete(id: string) {
		return categoryRepository.deleteById(id);
	}

	private toPublic(category: CategoryDocument): PublicCategory {
		const obj = category.toObject();

		return {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			id: String(obj.id),

			userId: String(obj.userId),

			name: obj.name,

			type: obj.type,

			description: obj.description,

			isArchived: obj.isArchived,

			createdAt: obj.createdAt,

			updatedAt: obj.updatedAt,
		};
	}
}

export const categoryService = new CategoryService();
