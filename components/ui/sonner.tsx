"use client";

import { useTheme } from "next-themes";

import {
	CircleCheck,
	CircleX,
	Info,
	LoaderCircle,
	TriangleAlert,
} from "lucide-react";
import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import styles from "./sonner.module.css";

const icons = {
	success: <CircleCheck className="size-4.5" strokeWidth={2} />,

	info: <Info className="size-4.5" strokeWidth={2} />,

	warning: <TriangleAlert className="size-4.5" strokeWidth={2} />,

	error: <CircleX className="size-4.5" strokeWidth={2} />,

	loading: <LoaderCircle className="size-4.5 animate-spin" strokeWidth={2} />,
};

const toasterStyle = {
	"--width": "400px",
} as CSSProperties;

export function Toaster({
	className,
	toastOptions,
	theme,
	position = "top-center",
	...props
}: ToasterProps) {
	const { theme: activeTheme = "system" } = useTheme();

	return (
		<Sonner
			{...props}
			theme={theme ?? (activeTheme as ToasterProps["theme"])}
			position={position}
			dir="rtl"
			richColors={false}
			closeButton={false}
			expand
			visibleToasts={4}
			gap={8}
			offset={18}
			mobileOffset={12}
			icons={icons}
			style={{
				...toasterStyle,
				...props.style,
			}}
			className={[styles.toaster, className].filter(Boolean).join(" ")}
			toastOptions={{
				...toastOptions,
				unstyled: true,

				classNames: {
					toast: styles.toast,
					content: styles.content,
					title: styles.title,
					description: styles.description,
					icon: styles.icon,
					actionButton: styles.actionButton,
					cancelButton: styles.cancelButton,

					default: styles.default,
					success: styles.success,
					info: styles.info,
					warning: styles.warning,
					error: styles.error,
					loading: styles.loading,

					...toastOptions?.classNames,
				},
			}}
		/>
	);
}
