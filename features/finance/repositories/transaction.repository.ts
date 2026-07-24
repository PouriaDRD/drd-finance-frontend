import { Transaction } from "@/features/database/models";
import { BaseRepository } from "@/features/database/repositories";

import type { ITransaction, TransactionType } from "../types";

class TransactionRepository extends BaseRepository<ITransaction> {
	constructor() {
		super(Transaction);
	}

	findByUserId(userId: string) {
		return this.model
			.find({ userId })
			.populate("categoryId", "name")
			.sort({ transactionDate: -1 });
	}

	findByCategory(userId: string, categoryId: string) {
		return this.model
			.find({
				userId,
				categoryId,
			})
			.populate("categoryId")
			.sort({ transactionDate: -1 });
	}

	findByType(userId: string, type: TransactionType) {
		return this.model
			.find({
				userId,
				type,
			})
			.populate("categoryId")
			.sort({ transactionDate: -1 });
	}

	findByMonth(userId: string, month: number) {
		return this.model
			.find({
				userId,
				month,
			})
			.populate("categoryId")
			.sort({ transactionDate: -1 });
	}

	findByCategoryAndMonth(userId: string, categoryId: string, month: number) {
		return this.model
			.find({
				userId,
				categoryId,
				month,
			})
			.populate("categoryId")
			.sort({ transactionDate: -1 });
	}

	findByTypeAndMonth(userId: string, type: TransactionType, month: number) {
		return this.model
			.find({
				userId,
				type,
				month,
			})
			.populate("categoryId")
			.sort({ transactionDate: -1 });
	}

	findLatest(userId: string, limit = 10) {
		return this.model
			.find({ userId })
			.populate("categoryId")
			.sort({ transactionDate: -1 })
			.limit(limit);
	}

	getIncomeTotal(userId: string, month?: number) {
		return this.model.aggregate([
			{
				$match: {
					userId,
					type: "income",
					...(month && { month }),
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: "$amount",
					},
				},
			},
		]);
	}

	getExpenseTotal(userId: string, month?: number) {
		return this.model.aggregate([
			{
				$match: {
					userId,
					type: "expense",
					...(month && { month }),
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: "$amount",
					},
				},
			},
		]);
	}

	getBalance(userId: string, month?: number) {
		return this.model.aggregate([
			{
				$match: {
					userId,
					...(month && { month }),
				},
			},
			{
				$group: {
					_id: "$type",
					total: {
						$sum: "$amount",
					},
				},
			},
		]);
	}

	deleteByCategory(categoryId: string) {
		return this.model.deleteMany({
			categoryId,
		});
	}
}

export const transactionRepository = new TransactionRepository();
