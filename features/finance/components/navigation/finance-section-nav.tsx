"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CalendarRange, ChartNoAxesCombined, Tags } from "lucide-react";

import { cn } from "@/features/shared/utils";

const links = [
	{
		label: "ماهانه",
		shortLabel: "ماهانه",
		description: "جزئیات و تراکنش‌ها",
		href: "/panel/finance/reports/monthly",
		Icon: CalendarRange,
	},
	{
		label: "سالانه",
		shortLabel: "سالانه",
		description: "روند و مقایسه ۱۲ ماه",
		href: "/panel/finance/reports/yearly",
		Icon: ChartNoAxesCombined,
	},
	{
		label: "دسته‌بندی‌ها",
		shortLabel: "دسته‌ها",
		description: "مدیریت ساختار مالی",
		href: "/panel/finance/categories",
		Icon: Tags,
	},
] as const;

export function FinanceSectionNav() {
	const pathname = usePathname();

	return (
		<nav
			aria-label="بخش‌های امور مالی"
			className={`
				rounded-2xl border border-border/70
				bg-card/80 p-1.5 shadow-sm
				backdrop-blur-xl
			`}>
			<div className="grid grid-cols-3 gap-1">
				{links.map(({ label, shortLabel, description, href, Icon }) => {
					const isActive =
						pathname === href || pathname.startsWith(`${href}/`);

					return (
						<Link
							key={href}
							href={href as Route}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								`
										group relative flex min-w-0
										items-center justify-center gap-2
										rounded-xl px-2 py-2.5
										transition-all duration-200
										sm:justify-start sm:px-3
									`,
								isActive
									? `
											bg-foreground text-background
											shadow-sm
										`
									: `
											text-muted-foreground
											hover:bg-muted/70
											hover:text-foreground
										`,
							)}>
							<div
								className={cn(
									`
											flex size-8 shrink-0
											items-center justify-center
											rounded-lg transition-colors
										`,
									isActive
										? "bg-background/12"
										: `
												bg-muted
												group-hover:bg-background
											`,
								)}>
								<Icon className="size-4" />
							</div>

							<div className="min-w-0 text-start">
								<p className="text-xs font-semibold sm:text-sm">
									<span className="sm:hidden">
										{shortLabel}
									</span>

									<span className="hidden sm:inline">
										{label}
									</span>
								</p>

								<p
									className={cn(
										`
												mt-0.5 hidden truncate
												text-[10px] sm:block
											`,
										isActive
											? "text-background/65"
											: "text-muted-foreground",
									)}>
									{description}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
