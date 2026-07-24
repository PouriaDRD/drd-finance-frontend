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

import { useMyLoginHistory } from "../../mutations";
import { LoginHistory } from "../../types";

/* =========================
   MAIN COMPONENT
========================= */

export function LoginHistoryTable() {
	const { data, isLoading, isError } = useMyLoginHistory();

	if (isLoading) return <TableState type="loading" />;

	if (isError || !data?.success) return <TableState type="error" />;

	const histories = data.data ?? [];

	if (histories.length === 0) return <TableState type="empty" />;

	return (
		<div className="max-h-96 overflow-auto flex">
			<Table>
				<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
					<TableRow>
						<TableHead className="text-center">#</TableHead>

						<TableHead className="text-center">تاریخ</TableHead>

						<TableHead className="text-center">وضعیت</TableHead>

						<TableHead className="text-center">دستگاه</TableHead>

						<TableHead className="text-center">مرورگر</TableHead>

						<TableHead className="text-center">IP</TableHead>

						<TableHead className="text-center">توضیحات</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{histories.map((history, index) => (
						<LoginHistoryRow
							key={history.id}
							history={history}
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

function LoginHistoryRow({
	history,
	index,
}: {
	history: LoginHistory;
	index: number;
}) {
	const date = toIranDateTime(history.created_at);

	return (
		<TableRow className="text-muted-foreground">
			<TableCell className="text-center">{index + 1}#</TableCell>

			<TableCell className="text-center">
				<div>{date.dateWithMonthName}</div>

				<div className="text-xs">{date.time}</div>
			</TableCell>

			<TableCell className="text-center">
				<Badge
					variant={history.is_successful ? "success" : "destructive"}>
					{history.is_successful ? "موفق" : "ناموفق"}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				{history.device ?? "-"}
			</TableCell>

			<TableCell className="text-center">
				{history.browser ?? "-"}
			</TableCell>

			<TableCell className="text-center">
				{history.ip_address ?? "-"}
			</TableCell>

			<TableCell className="text-center whitespace-normal wrap-break-word max-w-32">
				{history.failure_reason ?? "ورود موفق"}
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

		empty: "هیچ سابقه ورودی وجود ندارد",

		error: "خطا در بارگذاری اطلاعات",
	};

	return (
		<Table>
			<TableCaption>{captionMap[type]}</TableCaption>

			<TableHeader>
				<TableRow>
					<TableHead className="text-center">#</TableHead>

					<TableHead className="text-center">تاریخ</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">دستگاه</TableHead>

					<TableHead className="text-center">مرورگر</TableHead>

					<TableHead className="text-center">IP</TableHead>

					<TableHead className="text-center">توضیحات</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}
