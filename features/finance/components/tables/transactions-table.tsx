"use client";

import { useEffect, useEffectEvent } from "react";

import {
	ArrowDownLeft,
	ArrowLeftRight,
	ArrowUpRight,
	CalendarDays,
	MoreHorizontal,
	ReceiptText,
	Tag,
} from "lucide-react";

import {
	Badge,
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
import { cn } from "@/features/shared/utils";

import { useGetMyTransactionsInMonth } from "../../mutations";
import { PersianMonthSummary, Transaction } from "../../types";
import { DeleteTransactionDialog, TransactionDialog } from "../dialogs";

interface Props {
	month: number;
	year: number;
	onSuccess?: (persianMonthSummary?: PersianMonthSummary) => void;
}

export function TransactionsCardTable({ month, year, onSuccess }: Props) {
	return (
		<Card
			className={`
				overflow-hidden gap-0
				border-border/70 shadow-sm
			`}>
			<CardHeader
				className={`
					flex flex-row items-center
					justify-between gap-3 border-b
					bg-card/90 px-4 py-4
					backdrop-blur-xl
				`}>
				<div className="flex min-w-0 items-center gap-3">
					<div
						className={`
							flex size-9 shrink-0
							items-center justify-center
							rounded-xl border
							bg-muted/40 text-muted-foreground
						`}>
						<ArrowLeftRight className="size-4" />
					</div>

					<div className="min-w-0">
						<CardTitle className="text-base">تراکنش‌ها</CardTitle>

						<p className="mt-0.5 truncate text-xs text-muted-foreground">
							مدیریت تراکنش‌های دوره انتخاب‌شده
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

export function TransactionsTable({ month, year, onSuccess }: Props) {
	const { data, isLoading, isError } = useGetMyTransactionsInMonth(
		month,
		year,
	);

	const onSuccessCallback = useEffectEvent((value?: PersianMonthSummary) => {
		onSuccess?.(value);
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
		<>
			<div
				className={`
					flex items-center justify-between
					border-b bg-muted/20 px-4 py-2.5
				`}>
				<p className="text-xs text-muted-foreground">
					{data.data.month_name} {data.data.year}
				</p>

				<Badge variant="outline" className="font-normal">
					{transactions.length.toLocaleString("fa-IR")} تراکنش
				</Badge>
			</div>

			<div className="md:hidden">
				<div className="divide-y divide-border/70">
					{transactions.map((transaction) => (
						<TransactionMobileCard
							key={transaction.id}
							transaction={transaction}
						/>
					))}
				</div>
			</div>

			<div className="hidden md:block">
				<div className="max-h-130 overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl">
							<TableRow>
								<TableHead className="min-w-60 text-right">
									تراکنش
								</TableHead>

								<TableHead className="text-center">
									دسته‌بندی
								</TableHead>

								<TableHead className="text-center">
									مبلغ
								</TableHead>

								<TableHead className="text-center">
									تاریخ
								</TableHead>

								<TableHead className="w-28 text-center">
									عملیات
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{transactions.map((transaction) => (
								<TransactionRow
									key={transaction.id}
									transaction={transaction}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
	const isIncome = transaction.type === "income";
	const amount = Math.abs(Number(transaction.amount));

	return (
		<TableRow className="group hover:bg-muted/25">
			<TableCell>
				<div className="flex min-w-0 items-center gap-3">
					<TransactionTypeIcon isIncome={isIncome} />

					<div className="min-w-0">
						<p className="max-w-72 truncate text-sm font-medium">
							{transaction.description || "بدون توضیحات"}
						</p>

						<p className="mt-0.5 text-[11px] text-muted-foreground">
							{isIncome ? "درآمد" : "هزینه"}
						</p>
					</div>
				</div>
			</TableCell>

			<TableCell className="text-center">
				<div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
					<Tag className="size-3.5" />
					{transaction.category?.name ?? "بدون دسته‌بندی"}
				</div>
			</TableCell>

			<TableCell className="text-center">
				<span
					className={cn(
						`
							whitespace-nowrap text-sm
							font-semibold tabular-nums
						`,
						isIncome
							? "text-emerald-600 dark:text-emerald-400"
							: "text-rose-600 dark:text-rose-400",
					)}>
					{isIncome ? "+" : "-"}
					{amount.toLocaleString("fa-IR")}{" "}
					<span className="text-[10px] font-normal text-muted-foreground">
						تومان
					</span>
				</span>
			</TableCell>

			<TableCell className="text-center">
				<div className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground">
					<CalendarDays className="size-3.5" />
					{transaction.persian_date}
				</div>
			</TableCell>

			<TableCell className="text-center">
				<TransactionActions transaction={transaction} />
			</TableCell>
		</TableRow>
	);
}

function TransactionMobileCard({ transaction }: { transaction: Transaction }) {
	const isIncome = transaction.type === "income";
	const amount = Math.abs(Number(transaction.amount));

	return (
		<article className="space-y-3 p-4 transition-colors hover:bg-muted/20">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<TransactionTypeIcon isIncome={isIncome} />

					<div className="min-w-0">
						<p className="truncate text-sm font-semibold">
							{transaction.description || "بدون توضیحات"}
						</p>

						<div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
							<span>
								{transaction.category?.name ?? "بدون دسته‌بندی"}
							</span>

							<span aria-hidden>•</span>

							<span>{transaction.persian_date}</span>
						</div>
					</div>
				</div>

				<TransactionActions transaction={transaction} />
			</div>

			<div className="flex items-end justify-between gap-3 rounded-xl bg-muted/35 px-3 py-2.5">
				<div>
					<p className="text-[10px] text-muted-foreground">مبلغ</p>

					<p
						className={cn(
							"mt-0.5 text-base font-bold tabular-nums",
							isIncome
								? "text-emerald-600 dark:text-emerald-400"
								: "text-rose-600 dark:text-rose-400",
						)}>
						{isIncome ? "+" : "-"}
						{amount.toLocaleString("fa-IR")}{" "}
						<span className="text-[10px] font-normal text-muted-foreground">
							تومان
						</span>
					</p>
				</div>

				<Badge
					variant="outline"
					className={cn(
						"font-normal",
						isIncome
							? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
							: "border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-400",
					)}>
					{isIncome ? "درآمد" : "هزینه"}
				</Badge>
			</div>
		</article>
	);
}

function TransactionTypeIcon({ isIncome }: { isIncome: boolean }) {
	return (
		<div
			className={cn(
				`
					flex size-9 shrink-0 items-center
					justify-center rounded-xl border
				`,
				isIncome
					? "border-emerald-500/15 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400"
					: "border-rose-500/15 bg-rose-500/8 text-rose-600 dark:text-rose-400",
			)}>
			{isIncome ? (
				<ArrowDownLeft className="size-4" />
			) : (
				<ArrowUpRight className="size-4" />
			)}
		</div>
	);
}

function TransactionActions({ transaction }: { transaction: Transaction }) {
	return (
		<div className="flex items-center justify-center gap-0.5">
			<TransactionDialog transaction={transaction} />
			<DeleteTransactionDialog transaction={transaction} />
		</div>
	);
}

function TableState({ type }: { type: "loading" | "empty" | "error" }) {
	const content = {
		loading: {
			icon: ReceiptText,
			title: "در حال دریافت تراکنش‌ها",
			description: "اطلاعات مالی در حال بارگذاری است.",
		},
		empty: {
			icon: ReceiptText,
			title: "هنوز تراکنشی ثبت نشده",
			description: "اولین تراکنش این دوره را ثبت کنید.",
		},
		error: {
			icon: MoreHorizontal,
			title: "دریافت تراکنش‌ها ناموفق بود",
			description: "لطفاً چند لحظه بعد دوباره تلاش کنید.",
		},
	}[type];

	const Icon = content.icon;

	return (
		<div className="flex min-h-64 items-center justify-center p-6">
			<div className="max-w-sm text-center">
				<div className="mx-auto flex size-11 items-center justify-center rounded-2xl border bg-muted/40 text-muted-foreground">
					{type === "loading" ? (
						<div className="size-4 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground" />
					) : (
						<Icon className="size-5" />
					)}
				</div>

				<h3 className="mt-3 text-sm font-semibold">{content.title}</h3>

				<p className="mt-1 text-xs leading-5 text-muted-foreground">
					{content.description}
				</p>
			</div>
		</div>
	);
}
