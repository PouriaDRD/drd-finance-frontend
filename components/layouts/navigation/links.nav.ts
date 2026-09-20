import { Route } from "next";

import { LayoutDashboard, LucideIcon, WalletCards } from "lucide-react";

import { UserRole } from "@/features/user/types";

export type NavigationLink = {
	name: string;
	href: Route;
	Icon?: LucideIcon;
	allowedRoles?: UserRole[];
	activePrefix?: string;
};

export const SIDEBAR_LINKS: NavigationLink[] = [
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["superuser", "admin", "user"],
	},
	{
		name: "امور مالی",
		href: "/panel/finance/reports/monthly",
		Icon: WalletCards,
		activePrefix: "/panel/finance",
		allowedRoles: ["superuser", "admin", "user"],
	},
];

export const MOBILE_LINKS: NavigationLink[] = [
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["superuser", "admin", "user"],
	},
	{
		name: "امور مالی",
		href: "/panel/finance/reports/monthly",
		Icon: WalletCards,
		activePrefix: "/panel/finance",
		allowedRoles: ["superuser", "admin", "user"],
	},
];

export type LadingLink = {
	label: string;
	href: string;
};

export const LANDING_LINKS: LadingLink[] = [
	{
		label: "ویژگی‌ها",
		href: "#features",
	},
	{
		label: "محصولات",
		href: "#products",
	},
	{
		label: "دانلود",
		href: "#downloads",
	},
	{
		label: "پشتیبانی",
		href: "#info",
	},
];
