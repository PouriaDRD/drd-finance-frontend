"use client";

import { ReactNode } from "react";

import { Card, CardHeader } from "@/components/ui";
import { cn } from "@/features/shared/utils";

interface Props {
	/** The label/description for the stat */
	label: string;
	/** The main value to display */
	value: string | number;
	/** Visual variant of the stat */
	variant?: "default" | "positive" | "negative" | "primary";
	/** Whether to use small text size */
	small?: boolean;
	/** Additional content to render below the value */
	children?: ReactNode;
	/** Optional className for custom styling */
	className?: string;
}

export function StatBaseCard(props: Props) {
	const {
		label,
		value,
		variant = "default",
		children,
		className,
		small,
	} = props;

	// Determine color based on variant
	const getValueColor = () => {
		switch (variant) {
			case "primary":
				return "text-primary";

			case "positive":
				return "text-green-700 dark:text-green-600";

			case "negative":
				return "text-red-700 dark:text-red-600";

			default:
				return "text-foreground";
		}
	};

	const valueColor = getValueColor();
	const valueSize = small ? "text-sm" : "text-xl";

	// Format value if it's a number
	const formattedValue =
		typeof value === "number" ? value.toLocaleString() : value;

	return (
		<Card className={cn("px-4 py-5", className)}>
			<CardHeader className="space-y-1">
				<p
					suppressHydrationWarning
					className="text-xs font-medium text-muted-foreground tracking-wider">
					{label}
				</p>

				<p
					suppressHydrationWarning
					className={cn(
						"font-semibold leading-tight",
						valueColor,
						valueSize,
					)}>
					{formattedValue}
				</p>

				{children && (
					<div className="text-sm text-muted-foreground">
						{children}
					</div>
				)}
			</CardHeader>
		</Card>
	);
}
