"use client";

import { useTheme } from "next-themes";

import { Toaster } from "sonner";

import { ThemeType } from "@/features/preferences/types";

export function AppToaster() {
	const { theme = "system" } = useTheme();

	return <Toaster position="top-center" theme={theme as ThemeType} />;
}
