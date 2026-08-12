"use client";

import { useEffect, useEffectEvent } from "react";

import {
	Archive,
	ArrowDownLeft,
	ArrowUpRight,
	CircleCheck,
	CircleDollarSign,
	FileText,
	MoreHorizontal,
	Tag,
	Tags,
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

import { useGetMyCategories } from "../../mutations";
import { Category } from "../../types";
import { CategoryDialog } from "../dialogs";

/* =========================================================
   TYPES
========================================================= */

interface Props {
	onSuccess?: (categories?: Category[]) => void;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function CategoriesCardTable({ onSuccess }: Props) {
	return (
		<Card className="overflow-hidden gap-0">
			<CardHeader className="flex flex-row items-center justify-between border-b bg-card/80 backdrop-blur-xl">
				<div className="flex items-center gap-3">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40 text-muted-foreground">
						<Tags className="size-4" strokeWidth={1.8} />
					</div>

					<div className="space-y-0.5">
						<CardTitle
							className="text-base"
							suppressHydrationWarning>
							لیست دسته‌بندی‌ها
						</CardTitle>

						<p className="text-xs text-muted-foreground">
							دسته‌بندی‌های درآمد و هزینه شما
						</p>
					</div>
				</div>

				<CategoryDialog />
			</CardHeader>

			<CategoriesTable onSuccess={onSuccess} />
		</Card>
	);
}

/* =========================================================
   TABLE
========================================================= */

export function CategoriesTable({ onSuccess }: Props) {
	const { data, isLoading, isError } = useGetMyCategories();

	const onSuccessCallback = useEffectEvent((data?: Category[]) => {
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

	const categories = data.data ?? [];

	if (categories.length === 0) {
		return <TableState type="empty" />;
	}

	return (
		<div className="overflow-hidden">
			<div className="flex max-h-96 overflow-auto">
				<Table>
					<TableHeader className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl">
						<TableRow>
							{/* INDEX */}
							<TableHead className="w-12 px-3 text-center text-[11px] font-medium text-muted-foreground">
								#
							</TableHead>

							{/* NAME */}
							<TableHead className="min-w-52 px-3 text-right text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel icon={Tag} label="نام" />
							</TableHead>

							{/* TYPE */}
							<TableHead className="px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={CircleDollarSign}
									label="نوع"
								/>
							</TableHead>

							{/* DESCRIPTION */}
							<TableHead className="min-w-52 px-3 text-right text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={FileText}
									label="توضیحات"
								/>
							</TableHead>

							{/* STATUS */}
							<TableHead className="px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={CircleCheck}
									label="وضعیت"
								/>
							</TableHead>

							{/* ACTIONS */}
							<TableHead className="w-24 px-3 text-center text-[11px] font-medium text-muted-foreground">
								<TableHeaderLabel
									icon={MoreHorizontal}
									label="عملیات"
								/>
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{categories.map((category, index) => (
							<CategoryRow
								key={category.id}
								category={category}
								index={index}
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
	icon: typeof Tag;
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

function CategoryRow({
	category,
	index,
}: {
	category: Category;
	index: number;
}) {
	const isIncome = category.type === "income";
	const isArchived = category.is_archived;

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

			{/* NAME */}
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
							<ArrowDownLeft
								className="size-3.5"
								strokeWidth={2}
							/>
						) : (
							<ArrowUpRight
								className="size-3.5"
								strokeWidth={2}
							/>
						)}
					</div>

					<p className="truncate text-sm font-medium">
						{category.name}
					</p>
				</div>
			</TableCell>

			{/* TYPE */}
			<TableCell className="px-3 text-center" suppressHydrationWarning>
				<CategoryTypeBadge type={category.type} />
			</TableCell>

			{/* DESCRIPTION */}
			<TableCell className="max-w-72 px-3" suppressHydrationWarning>
				<p
					className={cn(
						"truncate text-xs",
						category.description
							? "text-muted-foreground"
							: "text-muted-foreground/40",
					)}>
					{category.description || "بدون توضیحات"}
				</p>
			</TableCell>

			{/* STATUS */}
			<TableCell className="px-3 text-center" suppressHydrationWarning>
				<CategoryStatusBadge isArchived={isArchived} />
			</TableCell>

			{/* ACTIONS */}
			<TableCell className="px-3 text-center" suppressHydrationWarning>
				<div className="flex items-center justify-center gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
					<CategoryDialog category={category} />
				</div>
			</TableCell>
		</TableRow>
	);
}

/* =========================================================
   TYPE BADGE
========================================================= */

function CategoryTypeBadge({ type }: { type: Category["type"] }) {
	const isIncome = type === "income";

	return (
		<Badge
			variant="outline"
			className={cn(
				"gap-1.5 border px-2 py-0.5 text-[11px] font-medium",
				isIncome
					? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
					: "border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-400",
			)}>
			<span
				className={cn(
					"size-1.5 rounded-full",
					isIncome ? "bg-emerald-500" : "bg-rose-500",
				)}
			/>

			{isIncome ? "درآمد" : "هزینه"}
		</Badge>
	);
}

/* =========================================================
   STATUS BADGE
========================================================= */

function CategoryStatusBadge({ isArchived }: { isArchived: boolean }) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"gap-1.5 border px-2 py-0.5 text-[11px] font-medium",
				isArchived
					? "border-border bg-muted/40 text-muted-foreground"
					: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
			)}>
			{isArchived ? (
				<>
					<Archive className="size-3" strokeWidth={1.8} />
					آرشیو شده
				</>
			) : (
				<>
					<span className="size-1.5 rounded-full bg-emerald-500" />
					فعال
				</>
			)}
		</Badge>
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
			title: "دسته‌بندی وجود ندارد",
			description: "هنوز هیچ دسته‌بندی برای حساب شما ثبت نشده است.",
		},

		error: {
			title: "خطا در دریافت اطلاعات",
			description: "دریافت دسته‌بندی‌ها با مشکل مواجه شد.",
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
