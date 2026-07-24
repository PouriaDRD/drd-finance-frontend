"use client";

import {
	Badge,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";

import { PublicTransaction, TransactionMonth } from "../../types";
import { TransactionDialog } from "../dialogs";

/* =========================
   MAIN COMPONENT
========================= */

interface Props {
	transactions: PublicTransaction[];
	isLoadingTransactions: boolean;
	handleGetTransactions: () => void;
}

export function TransactionsTable({
	transactions,
	isLoadingTransactions,
	handleGetTransactions,
}: Props) {
	if (isLoadingTransactions) return <TableState type="loading" />;

	if (transactions.length === 0) return <TableState type="empty" />;

	return (
		<div className="max-h-96 overflow-auto flex">
			<Table>
				<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
					<TableRow>
						<TableHead
							className="text-center"
							suppressHydrationWarning>
							#
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							توضیحات
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							دسته‌بندی
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							مبلغ
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							نوع
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							ماه
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							تاریخ تراکنش
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							ایجاد شده
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							آخرین بروزرسانی
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							عملیات
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{transactions.map((transaction, index) => (
						<TransactionRow
							key={transaction.id}
							transaction={transaction}
							index={index}
							onSuccess={() => handleGetTransactions()}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/* =========================
   ROW COMPONENT
========================= */

function TransactionRow({
	transaction,
	index,
	onSuccess,
}: {
	transaction: PublicTransaction;
	index: number;
	onSuccess?: () => void;
}) {
	const createdAt = toIranDateTime(transaction.createdAt);
	const updatedAt = toIranDateTime(transaction.updatedAt);
	const transactionDate = toIranDateTime(transaction.transactionDate);

	const monthLabel =
		TransactionMonth.find((m) => m.value === transaction.month)?.label ||
		transaction.month;

	const formattedAmount = transaction.amount.toLocaleString("fa-IR");

	return (
		<TableRow>
			<TableCell className="text-center" suppressHydrationWarning>
				{index + 1}
			</TableCell>

			<TableCell
				className="text-center max-w-48 truncate"
				suppressHydrationWarning>
				{transaction.description || "-"}
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				{transaction.categoryId}
			</TableCell>

			<TableCell
				className={`text-center font-medium ${
					transaction.type === "expense"
						? "text-red-600"
						: "text-green-600"
				}`}
				suppressHydrationWarning>
				{transaction.type === "expense" ? "-" : "+"}
				{formattedAmount}
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<Badge
					variant={
						transaction.type === "income"
							? "success"
							: "destructive"
					}>
					{transaction.type === "income" ? "درآمد" : "هزینه"}
				</Badge>
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				{monthLabel}
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<div>{transactionDate.dateWithMonthName}</div>
				<div className="text-xs text-muted-foreground">
					{transactionDate.time}
				</div>
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<div>{createdAt.dateWithMonthName}</div>
				<div className="text-xs text-muted-foreground">
					{createdAt.time}
				</div>
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<div>{updatedAt.dateWithMonthName}</div>
				<div className="text-xs text-muted-foreground">
					{updatedAt.time}
				</div>
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<TransactionDialog
					transaction={transaction}
					onSuccess={onSuccess}
				/>
			</TableCell>
		</TableRow>
	);
}

/* =========================
   STATE COMPONENT
========================= */

function TableState({ type }: { type: "loading" | "empty" | "error" }) {
	const captionMap = {
		loading: "در حال بارگذاری...",
		empty: "هیچ تراکنشی وجود ندارد",
		error: "خطا در بارگذاری اطلاعات",
	};

	return (
		<Table>
			<TableCaption suppressHydrationWarning>
				{captionMap[type]}
			</TableCaption>

			<TableHeader>
				<TableRow>
					<TableHead className="text-center" suppressHydrationWarning>
						#
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						توضیحات
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						دسته‌بندی
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						مبلغ
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						نوع
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						ماه
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						تاریخ تراکنش
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						ایجاد شده
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						آخرین بروزرسانی
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						عملیات
					</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}
