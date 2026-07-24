import type { Model } from "mongoose";

export class BaseRepository<T> {
	constructor(protected readonly model: Model<T>) {}

	create(data: Partial<T>) {
		return this.model.create(data);
	}

	find(filter: Record<string, unknown> = {}) {
		return this.model.find(filter);
	}

	findOne(filter: Record<string, unknown>) {
		return this.model.findOne(filter);
	}

	findById(id: string) {
		return this.model.findById(id);
	}

	exists(filter: Record<string, unknown>) {
		return this.model.exists(filter);
	}

	count(filter: Record<string, unknown> = {}) {
		return this.model.countDocuments(filter);
	}

	updateById(id: string, data: Partial<T>) {
		return this.model.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	deleteById(id: string) {
		return this.model.findByIdAndDelete(id);
	}
}
