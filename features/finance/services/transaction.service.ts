import { transactionRepository } from "../repositories";
import type {
	ITransaction,
	PublicTransaction,
	TransactionDocument,
	TransactionType,
} from "../types";

export class TransactionService {
	async create(
		data: Omit<ITransaction, "createdAt" | "updatedAt">,
	): Promise<PublicTransaction> {
		const transaction = await transactionRepository.create(data);

		return this.toPublic(transaction);
	}

	async getById(id: string): Promise<PublicTransaction | null> {
		const transaction = await transactionRepository.findById(id);

		return transaction ? this.toPublic(transaction) : null;
	}

	async list(userId: string): Promise<PublicTransaction[]> {
		const transactions = await transactionRepository.findByUserId(userId);

		return transactions.map((transaction) => this.toPublic(transaction));
	}

	async getByCategory(
		userId: string,
		categoryId: string,
	): Promise<PublicTransaction[]> {
		const transactions = await transactionRepository.findByCategory(
			userId,
			categoryId,
		);

		return transactions.map((transaction) => this.toPublic(transaction));
	}

	async getByType(
		userId: string,
		type: TransactionType,
	): Promise<PublicTransaction[]> {
		const transactions = await transactionRepository.findByType(
			userId,
			type,
		);

		return transactions.map((transaction) => this.toPublic(transaction));
	}

	async getByMonth(
		userId: string,
		month: number,
	): Promise<PublicTransaction[]> {
		const transactions = await transactionRepository.findByMonth(
			userId,
			month,
		);

		return transactions.map((transaction) => this.toPublic(transaction));
	}

	async update(
		id: string,
		data: Partial<ITransaction>,
	): Promise<PublicTransaction | null> {
		const transaction = await transactionRepository.updateById(id, data);

		return transaction ? this.toPublic(transaction) : null;
	}

	async delete(id: string) {
		return transactionRepository.deleteById(id);
	}

	async getIncomeTotal(userId: string, month?: number) {
		return transactionRepository.getIncomeTotal(userId, month);
	}

	async getExpenseTotal(userId: string, month?: number) {
		return transactionRepository.getExpenseTotal(userId, month);
	}

	async getBalance(userId: string, month?: number) {
		return transactionRepository.getBalance(userId, month);
	}

	private toPublic(transaction: TransactionDocument): PublicTransaction {
		const obj = transaction.toObject();

		return {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			id: String(obj.id),

			userId: String(obj.userId),

			categoryId: String(obj.categoryId),

			type: obj.type,

			description: obj.description,

			amount: obj.amount,

			transactionDate: obj.transactionDate,

			month: obj.month,

			createdAt: obj.createdAt,

			updatedAt: obj.updatedAt,
		};
	}
}

export const transactionService = new TransactionService();
