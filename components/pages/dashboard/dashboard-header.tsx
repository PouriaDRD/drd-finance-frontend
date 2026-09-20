"use client";

import Link from "next/link";

import {
	ArrowLeft,
	BadgeCheck,
	LayoutDashboard,
	WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui";
import type { User } from "@/features/user/types";

interface Props {
	user: User;
}

export function DashboardHeader({ user }: Props) {
	const displayName = user.name?.trim() || user.email.split("@")[0];

	const firstName = displayName.split(" ")[0];

	return (
		<section
			className={`
				relative overflow-hidden rounded-2xl
				border border-border/70 bg-card
				px-4 py-5 shadow-sm
				sm:px-6 sm:py-6
			`}>
			<div
				aria-hidden
				className={`
					pointer-events-none absolute
					inset-x-0 top-0 h-px
					bg-linear-to-r
					from-transparent via-primary/45
					to-transparent
				`}
			/>

			<div
				className={`
					flex flex-col gap-5
					lg:flex-row lg:items-center
					lg:justify-between
				`}>
				<div
					className={`
						flex min-w-0
						items-start gap-3
					`}>
					<div
						className={`
							flex size-11 shrink-0
							items-center justify-center
							rounded-xl border
							border-border/70 bg-muted/40
							text-primary
						`}>
						<LayoutDashboard className="size-5" />
					</div>

					<div className="min-w-0">
						<p
							className={`
								text-[11px] font-medium
								text-muted-foreground
							`}>
							داشبورد شخصی
						</p>

						<h1
							className={`
								mt-1 text-xl font-bold
								tracking-tight sm:text-2xl
							`}>
							خوش اومدی، {firstName}
						</h1>

						<p
							className={`
								mt-1 max-w-2xl
								text-sm leading-6
								text-muted-foreground
							`}>
							وضعیت حساب، دسترسی‌های سریع و آخرین فعالیت‌های ورودت
							رو از همین صفحه دنبال کن.
						</p>

						<div
							className={`
								mt-3 flex flex-wrap
								items-center gap-2
							`}>
							<Badge
								variant="outline"
								className={`
									gap-1.5 font-normal
								`}>
								<span
									className={`
										size-1.5 rounded-full
										bg-emerald-500
									`}
								/>
								حساب فعال
							</Badge>

							{user.email_verified && (
								<Badge
									variant="outline"
									className={`
										gap-1.5 font-normal
									`}>
									<BadgeCheck className="size-3.5 text-primary" />
									ایمیل تأییدشده
								</Badge>
							)}
						</div>
					</div>
				</div>

				<Link
					href="/panel/finance/reports/monthly"
					className={`
						inline-flex h-10 shrink-0
						items-center justify-center
						gap-2 rounded-xl
						bg-primary px-4
						text-sm font-semibold
						text-primary-foreground
						shadow-sm transition
						hover:opacity-92
					`}>
					<WalletCards className="size-4" />
					رفتن به امور مالی
					<ArrowLeft className="size-4" />
				</Link>
			</div>
		</section>
	);
}
