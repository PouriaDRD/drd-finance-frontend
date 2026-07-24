"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui";
import { isLinkActive } from "@/features/shared/utils";
import { User } from "@/features/user/types";

import { NavigationLink, SIDEBAR_LINKS } from "../links.nav";

interface Props {
	user: User;
}

export default function SidebarLinks({ user }: Props) {
	const allowedItems = SIDEBAR_LINKS.filter((item) => {
		// No allowedRoles = accessible to all
		if (!item.allowedRoles) return true;

		return item.allowedRoles.includes(user.role);
	});

	return (
		<SidebarMenu className="space-y-2">
			{allowedItems.map((navigation) => (
				<SidebarLink
					key={navigation.href}
					href={navigation.href}
					Icon={navigation.Icon}
					name={navigation.name}
				/>
			))}
		</SidebarMenu>
	);
}

function SidebarLink({ href, Icon, name }: NavigationLink) {
	const pathname = usePathname();

	const isActive = isLinkActive(pathname, href);

	return (
		<SidebarMenuItem>
			<Link href={href} className="flex items-center gap-2">
				<SidebarMenuButton isActive={isActive} variant={"default"}>
					{Icon && <Icon className="size-4 shrink-0" />}
					<span>{name}</span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
}
