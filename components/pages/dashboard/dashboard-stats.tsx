"use client";

import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CalendarDays, Clock3, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui";
import { toIranDateTime } from "@/features/shared/utils";
import type { User } from "@/features/user/types";

interface Props {
	user: User;
}

export function DashboardStats({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login ?? new Date());

	const createdAt = toIranDateTime(user.created_at);

	return (
		<div
			className={`
				grid grid-cols-1 gap-3
				sm:grid-cols-2 xl:grid-cols-4
			`}>
			<DashboardStat
				icon={ShieldCheck}
				label="وضعیت حساب"
				value={getStatusLabel(user.status)}
				description="وضعیت دسترسی فعلی"
				tone={
					user.status === "active"
						? "positive"
						: user.status === "banned"
							? "negative"
							: "default"
				}
			/>

			<DashboardStat
				icon={BadgeCheck}
				label="سطح دسترسی"
				value={getRoleLabel(user.role)}
				description={
					user.email_verified
						? "ایمیل حساب تأیید شده"
						: "ایمیل هنوز تأیید نشده"
				}
				tone="primary"
			/>

			<DashboardStat
				icon={CalendarDays}
				label="عضویت"
				value={createdAt.dateWithMonthName}
				description={createdAt.time}
			/>

			<DashboardStat
				icon={Clock3}
				label="آخرین ورود"
				value={lastLogin.dateWithMonthName}
				description={lastLogin.time}
			/>
		</div>
	);
}

type Tone = "default" | "primary" | "positive" | "negative";

function DashboardStat({
	icon: Icon,
	label,
	value,
	description,
	tone = "default",
}: {
	icon: LucideIcon;
	label: string;
	value: string;
	description: string;
	tone?: Tone;
}) {
	const toneClasses = {
		default: {
			line: "bg-border",
			icon: "border-border bg-muted/50 text-muted-foreground",
		},

		primary: {
			line: "bg-primary/70",
			icon: "border-primary/15 bg-primary/8 text-primary",
		},

		positive: {
			line: "bg-emerald-500/70",
			icon: "border-emerald-500/15 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400",
		},

		negative: {
			line: "bg-rose-500/70",
			icon: "border-rose-500/15 bg-rose-500/8 text-rose-600 dark:text-rose-400",
		},
	}[tone];

	return (
		<Card
			className={`
				relative overflow-hidden
				border-border/70 p-4
				shadow-sm
			`}>
			<div
				aria-hidden
				className={`
					absolute inset-x-0
					top-0 h-0.5
					${toneClasses.line}
				`}
			/>

			<div
				className={`
					flex items-start
					justify-between gap-3
				`}>
				<div className="min-w-0">
					<p
						className={`
							text-xs font-medium
							text-muted-foreground
						`}>
						{label}
					</p>

					<p
						className={`
							mt-2 truncate text-base
							font-bold
						`}>
						{value}
					</p>

					<p
						className={`
							mt-1 text-[11px]
							text-muted-foreground
						`}>
						{description}
					</p>
				</div>

				<div
					className={`
						flex size-9 shrink-0
						items-center justify-center
						rounded-xl border
						${toneClasses.icon}
					`}>
					<Icon className="size-4" />
				</div>
			</div>
		</Card>
	);
}

function getStatusLabel(status: User["status"]) {
	const labels = {
		active: "فعال",
		inactive: "غیرفعال",
		banned: "مسدود",
	};

	return labels[status];
}

function getRoleLabel(role: User["role"]) {
	const labels = {
		superuser: "مدیر کل",
		admin: "مدیر",
		user: "کاربر",
	};

	return labels[role];
}
