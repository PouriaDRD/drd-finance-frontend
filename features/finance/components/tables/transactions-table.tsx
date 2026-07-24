"use client";

import { useEffect, useEffectEvent } from "react";

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

import { useGetMyTransactionsInMonth } from "../../mutations";
import { PersianMonthSummary, Transaction } from "../../types";
import { DeleteTransactionDialog, TransactionDialog } from "../dialogs";

/* =========================
   MAIN COMPONENT
========================= */

interface Props {
	month: number;
	year: number;
	onSuccess?: (persianMonthSummary?: PersianMonthSummary) => void;
}
export function TransactionsTable(props: Props) {
	const { month, year, onSuccess } = props;

	const { data, isLoading, isError } = useGetMyTransactionsInMonth(
		month,
		year,
	);

	const onSuccessCallback = useEffectEvent((data?: PersianMonthSummary) => {
		onSuccess?.(data);
	});

	useEffect(() => {
		if (data?.success) {
			onSuccessCallback(data.data);
		}
	}, [data]);

	if (isLoading) return <TableState type="loading" />;

	if (isError || !data || !data.success) return <TableState type="error" />;

	const transactions = data.data.transactions ?? [];

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
							تاریخ تراکنش
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
	transaction: Transaction;
	index: number;
	onSuccess?: () => void;
}) {
	const transactionDate = toIranDateTime(transaction.date);

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
				{transaction.category.name}
			</TableCell>

			<TableCell
				className={`text-center font-medium ${
					transaction.type === "expense"
						? "text-red-600"
						: "text-green-600"
				}`}
				suppressHydrationWarning>
				{/* {transaction.type === "expense" ? "-" : "+"} */}
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
				<div>{transactionDate.dateWithMonthName}</div>
				<div className="text-xs text-muted-foreground">
					{transactionDate.time}
				</div>
			</TableCell>

			<TableCell
				className="text-center space-x-2"
				suppressHydrationWarning>
				<TransactionDialog
					transaction={transaction}
					onSuccess={onSuccess}
				/>

				<DeleteTransactionDialog transaction={transaction} />
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
						تاریخ تراکنش
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						عملیات
					</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}
