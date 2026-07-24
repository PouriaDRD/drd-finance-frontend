"use client";

import { useEffect, useState } from "react";

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

import { getAdminUsers } from "../actions/user.action";
import { PublicUser } from "../types";

/* =========================
   MAIN COMPONENT
========================= */

export function UsersTable() {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState<PublicUser[]>([]);

	useEffect(() => {
		getAdminUsers()
			.then((response) => {
				if (response.success) {
					setUsers(response.data);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) return <TableState type="loading" />;

	if (users.length === 0) return <TableState type="empty" />;

	return (
		<div className="max-h-96 overflow-auto flex">
			<Table>
				<TableHeader className="sticky top-0 bg-card/85 backdrop-blur-2xl">
					<TableRow>
						<TableHead className="text-center">#</TableHead>

						<TableHead className="text-center">نام</TableHead>

						<TableHead className="text-center">ایمیل</TableHead>

						<TableHead className="text-center">وضعیت</TableHead>

						<TableHead className="text-center">نقش</TableHead>

						<TableHead className="text-center">
							وضعیت ایمیل
						</TableHead>

						<TableHead className="text-center">عضویت</TableHead>

						<TableHead className="text-center">
							آخرین ورود
						</TableHead>

						<TableHead className="text-center">
							آخرین بروزرسانی
						</TableHead>

						<TableHead className="text-center">عملیات</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{users.map((user, index) => (
						<UserRow key={user.id} user={user} index={index} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}

/* =========================
   ROW COMPONENT
========================= */

function UserRow({ user, index }: { user: PublicUser; index: number }) {
	const createdAt = toIranDateTime(user.createdAt);
	const updatedAt = toIranDateTime(user.updatedAt);

	const lastLogin = user.lastLoginAt
		? toIranDateTime(user.lastLoginAt)
		: null;

	return (
		<TableRow>
			<TableCell className="text-center">{index + 1}</TableCell>

			<TableCell className="text-center font-medium">
				{user.name}
			</TableCell>

			<TableCell className="text-center max-w-64 truncate" dir="ltr">
				{user.email}
			</TableCell>

			<TableCell className="text-center">
				<Badge
					variant={
						user.status === "active"
							? "success"
							: user.status === "inactive"
								? "secondary"
								: "destructive"
					}>
					{user.status === "active"
						? "فعال"
						: user.status === "inactive"
							? "غیرفعال"
							: "مسدود"}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={user.role === "admin" ? "info" : "outline"}>
					{user.role === "admin" ? "مدیر" : "کاربر"}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				<Badge variant={user.emailVerified ? "success" : "secondary"}>
					{user.emailVerified ? "تأیید شده" : "تأیید نشده"}
				</Badge>
			</TableCell>

			<TableCell className="text-center">
				<div>{createdAt.dateWithMonthName}</div>

				<div className="text-xs text-muted-foreground">
					{createdAt.time}
				</div>
			</TableCell>

			<TableCell className="text-center">
				{lastLogin ? (
					<>
						<div>{lastLogin.dateWithMonthName}</div>

						<div className="text-xs text-muted-foreground">
							{lastLogin.time}
						</div>
					</>
				) : (
					"-"
				)}
			</TableCell>

			<TableCell className="text-center">
				<div>{updatedAt.dateWithMonthName}</div>

				<div className="text-xs text-muted-foreground">
					{updatedAt.time}
				</div>
			</TableCell>

			<TableCell className="text-center">{/* Actions */}-</TableCell>
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

					<TableHead className="text-center">نام</TableHead>

					<TableHead className="text-center">ایمیل</TableHead>

					<TableHead className="text-center">وضعیت</TableHead>

					<TableHead className="text-center">نقش</TableHead>

					<TableHead className="text-center">وضعیت ایمیل</TableHead>

					<TableHead className="text-center">عضویت</TableHead>

					<TableHead className="text-center">آخرین ورود</TableHead>

					<TableHead className="text-center">
						آخرین بروزرسانی
					</TableHead>

					<TableHead className="text-center">عملیات</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	);
}
