import { Route } from "next";

import {
	ChartBarStacked,
	LayoutDashboard,
	LucideIcon,
	Wallet,
	// StarIcon,
	// WalletIcon,
} from "lucide-react";

import { UserRole } from "@/features/user/types";

export type NavigationLink = {
	name: string;
	href: Route;
	Icon?: LucideIcon;
	allowedRoles?: UserRole[];
};

export const SIDEBAR_LINKS: NavigationLink[] = [
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["superuser", "admin", "user"],
	},
	{
		name: "گزاش مالی",
		href: "/panel/finance/reports",
		Icon: Wallet,
		allowedRoles: ["superuser", "admin", "user"],
	},
	{
		name: "دسته‌بندی‌ها",
		href: "/panel/finance/categories",
		Icon: ChartBarStacked,
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
		name: "گزاش مالی",
		href: "/panel/finance/reports",
		Icon: Wallet,
		allowedRoles: ["superuser", "admin", "user"],
	},
	{
		name: "دسته‌بندی‌ها",
		href: "/panel/finance/categories",
		Icon: ChartBarStacked,
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
