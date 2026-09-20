"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CalendarRange, ChartColumnBig, Tags } from "lucide-react";

import { cn } from "@/features/shared/utils";

const links = [
	{
		label: "ماهانه",
		description: "گزارش و تراکنش‌ها",
		href: "/panel/finance/reports/monthly",
		Icon: CalendarRange,
	},
	{
		label: "سالانه",
		description: "نمای ۱۲ ماهه",
		href: "/panel/finance/reports/yearly",
		Icon: ChartColumnBig,
	},
	{
		label: "دسته‌بندی‌ها",
		description: "مدیریت درآمد و هزینه",
		href: "/panel/finance/categories",
		Icon: Tags,
	},
] as const;

export function FinanceSectionNav() {
	const pathname = usePathname();

	return (
		<div
			className={`
				overflow-x-auto rounded-2xl
				border border-border/70 bg-muted/30 p-1
			`}>
			<div
				className={`
					grid min-w-130 grid-cols-3 gap-1
					sm:min-w-0
				`}>
				{links.map(({ label, description, href, Icon }) => {
					const isActive =
						pathname === href || pathname.startsWith(`${href}/`);

					return (
						<Link
							key={href}
							href={href as "/"}
							className={cn(
								`
										flex items-center gap-3
										rounded-xl px-3 py-2.5
										transition-all duration-200
									`,
								isActive
									? `
											bg-background
											text-foreground
											shadow-sm
										`
									: `
											text-muted-foreground
											hover:bg-background/60
											hover:text-foreground
										`,
							)}>
							<div
								className={cn(
									`
											flex size-9 shrink-0
											items-center justify-center
											rounded-lg
										`,
									isActive
										? `
												bg-primary/10
												text-primary
											`
										: `
												bg-muted
												text-muted-foreground
											`,
								)}>
								<Icon className="size-4" />
							</div>

							<div className="min-w-0">
								<p
									className={`
											text-sm font-semibold
										`}>
									{label}
								</p>

								<p
									className={`
											truncate text-[11px]
											text-muted-foreground
										`}>
									{description}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
