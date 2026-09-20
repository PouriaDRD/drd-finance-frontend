"use client";

import Link from "next/link";

import {
	ArrowLeft,
	CalendarRange,
	ChartNoAxesCombined,
	Tags,
	Zap,
} from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui";

const actions = [
	{
		href: "/panel/finance/reports/monthly",
		title: "گزارش ماهانه",
		description: "درآمد، هزینه و تراکنش‌های ماه",
		Icon: CalendarRange,
	},

	{
		href: "/panel/finance/reports/yearly",
		title: "گزارش سالانه",
		description: "روند مالی و مقایسه ۱۲ ماه",
		Icon: ChartNoAxesCombined,
	},

	{
		href: "/panel/finance/categories",
		title: "دسته‌بندی‌ها",
		description: "مدیریت ساختار درآمد و هزینه",
		Icon: Tags,
	},
] as const;

export function QuickActions() {
	return (
		<Card
			className={`
				overflow-hidden gap-0
				border-border/70 shadow-sm
			`}>
			<CardHeader
				className={`
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
						<Zap className="size-4" />
					</div>

					<div>
						<CardTitle className="text-base">دسترسی سریع</CardTitle>

						<p
							className={`
								mt-0.5 text-xs
								text-muted-foreground
							`}>
							میانبرهای پرکاربرد
						</p>
					</div>
				</div>
			</CardHeader>

			<div className="divide-y divide-border/60">
				{actions.map(({ href, title, description, Icon }) => (
					<Link
						key={href}
						href={href}
						className={`
								group flex items-center
								gap-3 px-4 py-3.5
								transition-colors
								hover:bg-muted/25
							`}>
						<div
							className={`
									flex size-9 shrink-0
									items-center
									justify-center
									rounded-xl border
									border-border/70
									bg-muted/30
									text-muted-foreground
									transition-colors
									group-hover:border-primary/15
									group-hover:bg-primary/6
									group-hover:text-primary
								`}>
							<Icon className="size-4" />
						</div>

						<div className="min-w-0 flex-1">
							<p
								className={`
										text-sm font-semibold
									`}>
								{title}
							</p>

							<p
								className={`
										mt-0.5 truncate
										text-[11px]
										text-muted-foreground
									`}>
								{description}
							</p>
						</div>

						<ArrowLeft
							className={`
									size-4 shrink-0
									text-muted-foreground/60
									transition
									group-hover:-translate-x-0.5
									group-hover:text-foreground
								`}
						/>
					</Link>
				))}
			</div>
		</Card>
	);
}
