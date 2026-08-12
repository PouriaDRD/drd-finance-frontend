"use client";

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

interface ThemeSwitcherProps {
	className?: string;
	align?: "start" | "center" | "end";
	size?: VariantProps<typeof buttonVariants>["size"];
	variant?: VariantProps<typeof buttonVariants>["variant"];
}

export function ThemeSwitcher({
	className,
	size = "icon-sm",
	align = "center",
	variant = "outline",
}: ThemeSwitcherProps) {
	const { mounted, theme, setTheme } = useThemeSwitcher();

	if (!mounted) {
		return (
			<Button
				type="button"
				variant={variant}
				size={size}
				className={className}
				aria-label="در حال بارگذاری تم"
				disabled>
				<Spinner className="size-4" />
			</Button>
		);
	}

	const currentTheme =
		THEMES.find(({ value }) => value === theme) ?? THEMES[0];

	const CurrentIcon = currentTheme.icon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						type="button"
						variant={variant}
						size={size}
						className={className}
						aria-label={`تم فعلی: ${currentTheme.label}`}>
						<CurrentIcon className="size-4" aria-hidden="true" />
					</Button>
				}
			/>

			<DropdownMenuContent dir="rtl" align={align} className="w-44">
				<div className="px-2 py-1.5 text-xs text-muted-foreground">
					تم خود را انتخاب کنید
				</div>

				<DropdownMenuSeparator />

				{THEMES.map((item) => {
					const Icon = item.icon;
					const isActive = theme === item.value;

					return (
						<DropdownMenuItem
							key={item.value}
							onClick={() => {
								if (!isActive) {
									setTheme(item.value);
								}
							}}
							className="gap-2">
							<Icon
								className="size-4 shrink-0"
								aria-hidden="true"
							/>

							<span className="flex-1">{item.label}</span>

							{isActive && (
								<Check
									className="size-4 shrink-0 text-primary"
									aria-hidden="true"
								/>
							)}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
