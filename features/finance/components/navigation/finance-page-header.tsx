"use client";

import { WalletCards } from "lucide-react";
import type { ReactNode } from "react";

import { FinanceSectionNav } from "./finance-section-nav";

interface Props {
	title: string;
	description: string;
	children?: ReactNode;
}

export function FinancePageHeader({ title, description, children }: Props) {
	return (
		<div className="space-y-3">
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
						bg-linear-to-r from-transparent
						via-primary/45 to-transparent
					`}
				/>

				<div
					className={`
						flex flex-col gap-4
						sm:flex-row sm:items-center
						sm:justify-between
					`}>
					<div className="flex min-w-0 items-center gap-3">
						<div
							className={`
								flex size-11 shrink-0
								items-center justify-center
								rounded-xl border
								border-border/70 bg-muted/50
								text-foreground
							`}>
							<WalletCards className="size-5" />
						</div>

						<div className="min-w-0">
							<p
								className={`
									mb-1 text-[11px] font-medium
									text-muted-foreground
								`}>
								DRD Finance
							</p>

							<h1
								className={`
									text-xl font-bold tracking-tight
									sm:text-2xl
								`}>
								{title}
							</h1>

							<p
								className={`
									mt-1 max-w-2xl text-sm
									leading-6 text-muted-foreground
								`}>
								{description}
							</p>
						</div>
					</div>

					{children && <div className="shrink-0">{children}</div>}
				</div>
			</section>

			<FinanceSectionNav />
		</div>
	);
}
