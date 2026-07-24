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

import { PublicCategory } from "../../types";
import { CategoryDialog } from "../dialogs";

/* =========================
   MAIN COMPONENT
========================= */

interface Props {
	categories: PublicCategory[];
	isLoadingCategories: boolean;
	handleGetCategories: () => void;
}

export function CategoriesTable({
	categories,
	isLoadingCategories,
	handleGetCategories,
}: Props) {
	if (isLoadingCategories) return <TableState type="loading" />;

	if (categories.length === 0) return <TableState type="empty" />;

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
							نام
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							نوع
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							توضیحات
						</TableHead>

						<TableHead
							className="text-center"
							suppressHydrationWarning>
							وضعیت
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
					{categories.map((category, index) => (
						<CategoryRow
							key={category.id}
							category={category}
							index={index}
							onSuccess={() => handleGetCategories()}
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

function CategoryRow({
	category,
	index,
	onSuccess,
}: {
	category: PublicCategory;
	index: number;
	onSuccess?: () => void;
}) {
	const createdAt = toIranDateTime(category.createdAt);

	const updatedAt = toIranDateTime(category.updatedAt);

	return (
		<TableRow>
			<TableCell className="text-center" suppressHydrationWarning>
				{index + 1}
			</TableCell>

			<TableCell
				className="text-center font-medium"
				suppressHydrationWarning>
				{category.name}
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<Badge
					variant={
						category.type === "income" ? "success" : "destructive"
					}>
					{category.type === "income" ? "درآمد" : "هزینه"}
				</Badge>
			</TableCell>

			<TableCell
				className="text-center max-w-64 truncate"
				suppressHydrationWarning>
				{category.description || "-"}
			</TableCell>

			<TableCell className="text-center" suppressHydrationWarning>
				<Badge variant={category.isArchived ? "secondary" : "success"}>
					{category.isArchived ? "آرشیو شده" : "فعال"}
				</Badge>
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
				{/* Actions */}
				<CategoryDialog category={category} onSuccess={onSuccess} />
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

		empty: "هیچ دسته‌بندی وجود ندارد",

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
						نام
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						نوع
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						توضیحات
					</TableHead>

					<TableHead className="text-center" suppressHydrationWarning>
						وضعیت
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
