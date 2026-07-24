"use client";

import { Fragment } from "react";

import { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Spinner,
} from "@/components/ui";
import { buttonVariants } from "@/components/ui/button";

import { THEMES } from "../constants";
import { useThemeSwitcher } from "../hooks";

interface BaseSwitcherProps {
	className?: string;
	align?: "start" | "center" | "end";
	size?: VariantProps<typeof buttonVariants>["size"];
	variant?: VariantProps<typeof buttonVariants>["variant"];
}

export function ThemeSwitcher(props: BaseSwitcherProps) {
	const {
		className,
		size = "icon-sm",
		align = "center",
		variant = "outline",
	} = props;

	const { mounted, theme, setTheme } = useThemeSwitcher();

	if (!mounted)
		return (
			<Button variant={variant} size={size} className={className}>
				<Spinner className="size-4" />
			</Button>
		);

	const currentTheme =
		THEMES.find((item) => item.value === theme) ?? THEMES[0];

	const CurrentIcon = currentTheme.icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant={variant}
						size={size}
						className={className}
					/>
				}>
				<CurrentIcon className="size-4" />
			</DropdownMenuTrigger>

			<DropdownMenuContent dir="rtl" align={align} className="w-40">
				<Fragment>
					<span className="text-muted-foreground text-xs px-2 w-full">
						تم خود را انتخاب کنید
					</span>

					<DropdownMenuSeparator />

					{THEMES.map((item) => {
						const Icon = item.icon;

						return (
							<DropdownMenuItem
								key={item.value}
								onClick={() => setTheme(item.value)}
								className={`flex items-center justify-between`}>
								<div className="flex items-center gap-2">
									<Icon className="size-4" />
									<span>{item.label}</span>
								</div>

								{theme === item.value && (
									<Check className="size-4" />
								)}
							</DropdownMenuItem>
						);
					})}
				</Fragment>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
