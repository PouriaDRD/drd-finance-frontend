"use client";

import { Card, CardHeader } from "@/components/ui";

interface StatCardProps {
	label: string;
	value: string;
	children?: React.ReactNode;
	accent?: boolean;
	small?: boolean;
}

export function StatBaseCard(props: StatCardProps) {
	const { label, value, children, accent, small } = props;

	return (
		<Card className="px-2 py-4">
			<CardHeader>
				<p
					suppressHydrationWarning
					className="text-xs text-muted-foreground mb-1.5">
					{label}
				</p>
				<p
					suppressHydrationWarning
					className={[
						"font-medium",
						accent ? "text-primary text-2xl" : "text-foreground",
						small ? "text-sm" : "text-2xl",
					].join(" ")}>
					{value}
				</p>
				{children}
			</CardHeader>
		</Card>
	);
}
