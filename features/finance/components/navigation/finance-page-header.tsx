"use client";

import { ReactNode } from "react";

import { PageHeader } from "@/components/pages";

import { FinanceSectionNav } from "./finance-section-nav";

interface Props {
	title: string;
	description: string;
	children?: ReactNode;
}

export function FinancePageHeader({ title, description, children }: Props) {
	return (
		<div className="space-y-4">
			<PageHeader title={title} description={description}>
				{children}
			</PageHeader>

			<FinanceSectionNav />
		</div>
	);
}
