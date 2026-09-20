"use client";

import {
	BadgeCheck,
	CalendarDays,
	Mail,
	ShieldCheck,
	UserRound,
} from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { LogoutDialog } from "@/features/auth/components/dialogs";
import { toIranDateTime } from "@/features/shared/utils";
import type { User } from "@/features/user/types";

interface Props {
	user: User;
}

export function DetailsCard({ user }: Props) {
	const joinedAt = toIranDateTime(user.created_at);

	const initials = (user.name?.trim() || user.email)
		.slice(0, 2)
		.toUpperCase();

	return (
		<Card
			className={`
				overflow-hidden gap-0
				border-border/70 shadow-sm
			`}>
			<CardHeader
				className={`
					flex flex-row items-center
					justify-between gap-3
					border-b border-border/60
					px-4 py-4
				`}>
				<div
					className={`
						flex items-center gap-3
					`}>
					<div
						className={`
							flex size-9 items-center
							justify-center rounded-xl
							border bg-muted/40
							text-muted-foreground
						`}>
						<UserRound className="size-4" />
					</div>

					<div>
						<CardTitle className="text-base">حساب کاربری</CardTitle>

						<p
							className={`
								mt-0.5 text-xs
								text-muted-foreground
							`}>
							اطلاعات هویتی و دسترسی حساب
						</p>
					</div>
				</div>
			</CardHeader>

			<CardContent className="p-4 sm:p-5">
				<div
					className={`
						flex flex-col gap-5
						lg:flex-row
						lg:items-center
						lg:justify-between
					`}>
					<div
						className={`
							flex min-w-0
							items-center gap-4
						`}>
						<Avatar size="lg">
							<AvatarImage
								src="/images/avatar-fallback.png"
								className="bg-muted p-2"
							/>

							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>

						<div className="min-w-0">
							<div
								className={`
									flex flex-wrap
									items-center gap-2
								`}>
								<p
									className={`
										truncate text-base
										font-bold
									`}>
									{user.name || "کاربر DRD Finance"}
								</p>

								{user.email_verified && (
									<BadgeCheck className="size-4 text-primary" />
								)}
							</div>

							<p
								className={`
									mt-1 truncate text-xs
									text-muted-foreground
								`}>
								{user.email}
							</p>

							<div
								className={`
									mt-2 flex flex-wrap
									items-center gap-2
								`}>
								<Badge
									variant="outline"
									className="font-normal">
									{getRoleLabel(user.role)}
								</Badge>

								<Badge
									variant="outline"
									className="font-normal">
									{getStatusLabel(user.status)}
								</Badge>
							</div>
						</div>
					</div>

					<div
						className={`
							grid min-w-0 gap-2
							sm:grid-cols-3
							lg:w-[58%]
						`}>
						<AccountInfo
							icon={Mail}
							label="ایمیل"
							value={
								user.email_verified ? "تأیید شده" : "تأیید نشده"
							}
						/>

						<AccountInfo
							icon={ShieldCheck}
							label="سطح دسترسی"
							value={getRoleLabel(user.role)}
						/>

						<AccountInfo
							icon={CalendarDays}
							label="عضویت"
							value={joinedAt.dateWithMonthName}
						/>
					</div>
				</div>
			</CardContent>

			<CardFooter
				className={`
					border-t bg-muted/20
					px-4 py-3 md:hidden
				`}>
				<LogoutDialog collapsed={false} />
			</CardFooter>
		</Card>
	);
}

function AccountInfo({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof Mail;
	label: string;
	value: string;
}) {
	return (
		<div
			className={`
				rounded-xl border
				border-border/70
				bg-muted/20 p-3
			`}>
			<div
				className={`
					flex items-center gap-2
					text-muted-foreground
				`}>
				<Icon className="size-3.5" />

				<span className="text-[10px]">{label}</span>
			</div>

			<p
				className={`
					mt-2 truncate text-xs
					font-semibold
				`}>
				{value}
			</p>
		</div>
	);
}

function getRoleLabel(role: User["role"]) {
	const labels = {
		superuser: "مدیر کل",
		admin: "مدیر",
		user: "کاربر",
	};

	return labels[role];
}

function getStatusLabel(status: User["status"]) {
	const labels = {
		active: "فعال",
		inactive: "غیرفعال",
		banned: "مسدود",
	};

	return labels[status];
}
