"use client";

import { useEffect, useEffectEvent } from "react";

import {
	ArrowDownLeft,
	ArrowLeftRight,
	ArrowUpRight,
	CalendarDays,
	CircleDollarSign,
	FileText,
	Minus,
	MoreHorizontal,
	Plus,
	Tag,
} from "lucide-react";

import {
	Card,
	CardHeader,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { cn, toIranDateTime } from "@/features/shared/utils";

import { useGetMyTransactionsInMonth } from "../../mutations";
import { PersianMonthSummary, Transaction } from "../../types";
import { DeleteTransactionDialog, TransactionDialog } from "../dialogs";

interface Props {
	month: number;
	year: number;
	onSuccess?: (persianMonthSummary?: PersianMonthSummary) => void;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function TransactionsCardTable({ month, year, onSuccess }: Props) {
	return (
		<Card className="overflow-hidden gap-0">
			<CardHeader className="flex flex-row items-center justify-between border-b bg-card/80 backdrop-blur-xl">
				<div className="flex items-center gap-3">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40 text-muted-foreground">
						<ArrowLeftRight className="size-4" strokeWidth={1.8} />
					</div>

					<div className="space-y-0.5">
						<CardTitle
							className="text-base"
							suppressHydrationWarning>
							لیست تراکنش‌ها
						</CardTitle>

						<p className="text-xs text-muted-foreground">
							تراکنش‌های ثبت‌شده در این ماه
						</p>
					</div>
				</div>

				<TransactionDialog />
			</CardHeader>

			<TransactionsTable
				month={month}
				year={year}
				onSuccess={onSuccess}
			/>
		</Card>
	);
}

/* =========================================================
   TABLE
========================================================= */

export function TransactionsTable({ month, year, onSuccess }: Props) {
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

	if (isLoading) {
		return <TableState type="loading" />;
	}

	if (isError || !data || !data.success) {
		return <TableState type="error" />;
	}

	const transactions = data.data.transactions ?? [];

	if (transactions.length === 0) {
		return <TableState type="empty" />;
	}

	return (
		<div className="overflow-hidden">
			<div className="flex max-h-96 overflow-auto">
				<Table>
					<TableHeader className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl">
						<TableRow>
							<TableHead className="w-12 px-3 text-center text-[11px] font-medium text-muted-foreground">
								#
							</TableHead>

							<TableHead className="min-w-52 px-3 text-right text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={FileText}
									label="توضیحات"
								/>
							</TableHead>

							<TableHead className="px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={Tag}
									label="دسته‌بندی"
								/>
							</TableHead>

							<TableHead className="px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={CircleDollarSign}
									label="مبلغ"
								/>
							</TableHead>

							<TableHead className="px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={CalendarDays}
									label="تاریخ"
								/>
							</TableHead>

							<TableHead className="w-24 px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={MoreHorizontal}
									label="عملیات"
								/>
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{transactions.map((transaction, index) => (
							<TransactionRow
								key={transaction.id}
								transaction={transaction}
								index={index}
								onSuccess={onSuccess}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

/* =========================================================
   TABLE HEADER LABEL
========================================================= */

function TableHeaderLabel({
	icon: Icon,
	label,
}: {
	icon: typeof FileText;
	label: string;
}) {
	return (
		<div className="inline-flex items-center justify-center gap-1.5">
			<Icon
				className="size-3.5 text-muted-foreground/70"
				strokeWidth={1.8}
			/>

			<span>{label}</span>
		</div>
	);
}

/* =========================================================
   ROW
========================================================= */

function TransactionRow({
	transaction,
	index,
	onSuccess,
}: {
	transaction: Transaction;
	index: number;
	onSuccess?: (persianMonthSummary?: PersianMonthSummary) => void;
}) {
	const transactionDate = toIranDateTime(transaction.date);
	const isIncome = transaction.type === "income";

	const formattedAmount = transaction.amount.toLocaleString("fa-IR");

	return (
		<TableRow
			className={cn(
				"group border-b transition-colors last:border-0",
				"hover:bg-muted/20",
			)}>
			{/* INDEX */}
			<TableCell
				className="px-3 text-center text-xs tabular-nums text-muted-foreground/60"
				suppressHydrationWarning>
				{index + 1}
			</TableCell>

			{/* DESCRIPTION */}
			<TableCell className="max-w-64 px-3" suppressHydrationWarning>
				<div className="flex min-w-0 items-center gap-2.5">
					<div
						className={cn(
							"flex size-7 shrink-0 items-center justify-center rounded-md",
							isIncome
								? "bg-emerald-500/8 text-emerald-600 dark:text-emerald-400"
								: "bg-rose-500/8 text-rose-600 dark:text-rose-400",
						)}>
						{isIncome ? (
							<ArrowDownLeft className="size-3.5" />
						) : (
							<ArrowUpRight className="size-3.5" />
						)}
					</div>

					<p className="truncate text-sm font-medium">
						{transaction.description || "بدون توضیحات"}
					</p>
				</div>
			</TableCell>

			{/* CATEGORY */}
			<TableCell className="px-3 text-center" suppressHydrationWarning>
				<span className="text-xs text-muted-foreground">
					{transaction.category.name}
				</span>
			</TableCell>

			{/* AMOUNT */}
			<TableCell className="px-3 text-center" suppressHydrationWarning>
				<div className="inline-flex items-baseline gap-1.5 whitespace-nowrap text-sm tabular-nums">
					{isIncome ? (
						<Plus
							className="size-3.5 text-emerald-500"
							strokeWidth={2.5}
						/>
					) : (
						<Minus
							className="size-3.5 text-rose-500"
							strokeWidth={2.5}
						/>
					)}

					<span className="font-semibold">{formattedAmount}</span>

					<span className="text-[10px] text-muted-foreground">
						تومان
					</span>
				</div>
			</TableCell>

			{/* DATE */}
			<TableCell
				className="px-3 text-center text-xs text-muted-foreground"
				suppressHydrationWarning>
				{transactionDate.dateWithMonthName}
			</TableCell>

			{/* ACTIONS */}
			<TableCell className="px-3 text-center" suppressHydrationWarning>
				<div className="flex items-center justify-center gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
					<TransactionDialog
						transaction={transaction}
						onSuccess={onSuccess}
					/>

					<DeleteTransactionDialog transaction={transaction} />
				</div>
			</TableCell>
		</TableRow>
	);
}

/* =========================================================
   STATES
========================================================= */

function TableState({ type }: { type: "loading" | "empty" | "error" }) {
	const content = {
		loading: {
			title: "در حال بارگذاری",
			description: "لطفاً کمی صبر کنید...",
		},
		empty: {
			title: "تراکنزی وجود ندارد",
			description: "برای این ماه هنوز تراکنشی ثبت نشده است.",
		},
		error: {
			title: "خطا در دریافت اطلاعات",
			description: "دریافت تراکنش‌ها با مشکل مواجه شد.",
		},
	}[type];

	return (
		<div className="flex min-h-52 items-center justify-center">
			<div className="text-center">
				<div className="mx-auto mb-3 flex size-8 items-center justify-center rounded-lg bg-muted">
					{type === "loading" ? (
						<div className="size-3.5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
					) : (
						<span className="text-xs font-semibold text-muted-foreground">
							{type === "empty" ? "—" : "!"}
						</span>
					)}
				</div>

				<h3 className="text-sm font-medium">{content.title}</h3>

				<p className="mt-1 text-xs text-muted-foreground">
					{content.description}
				</p>
			</div>
		</div>
	);
}
