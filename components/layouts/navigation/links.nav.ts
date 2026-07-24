import { Route } from "next";

import {
	ChartBarStacked,
	LayoutDashboard,
	LucideIcon,
	StarIcon,
	WalletIcon,
} from "lucide-react";

import { UserRole } from "@/features/accounts/types";

export type NavigationLink = {
	name: string;
	href: Route;
	Icon?: LucideIcon;
	allowedRoles?: UserRole[];
};

export const SIDEBAR_LINKS: NavigationLink[] = [
	{
		name: "داشبورد ادمین",
		href: "/panel/admin",
		Icon: StarIcon,
		allowedRoles: ["admin"],
	},
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["admin", "user"],
	},
	{
		name: "مالی",
		href: "/panel/finance",
		Icon: WalletIcon,
		allowedRoles: ["admin", "user"],
	},
	{
		name: "دسته‌بندی‌ها",
		href: "/panel/categories",
		Icon: ChartBarStacked,
		allowedRoles: ["admin", "user"],
	},
];

export const MOBILE_LINKS: NavigationLink[] = [
	{
		name: "داشبورد ادمین",
		href: "/panel/admin",
		Icon: StarIcon,
		allowedRoles: ["admin"],
	},
	{
		name: "داشبورد",
		href: "/panel/dashboard",
		Icon: LayoutDashboard,
		allowedRoles: ["admin", "user"],
	},
	{
		name: "مالی",
		href: "/panel/finance",
		Icon: WalletIcon,
		allowedRoles: ["admin", "user"],
	},
	{
		name: "دسته‌بندی‌ها",
		href: "/panel/categories",
		Icon: ChartBarStacked,
		allowedRoles: ["admin", "user"],
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
