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
		if (!item.allowedRoles) {
			return true;
		}

		return item.allowedRoles.includes(user.role);
	});

	return (
		<SidebarMenu className="space-y-2">
			{allowedItems.map((navigation) => (
				<SidebarLink key={navigation.href} {...navigation} />
			))}
		</SidebarMenu>
	);
}

function SidebarLink({ href, Icon, name, activePrefix }: NavigationLink) {
	const pathname = usePathname();

	const isActive = activePrefix
		? pathname.startsWith(activePrefix)
		: isLinkActive(pathname, href);

	return (
		<SidebarMenuItem>
			<Link
				href={href}
				className={`
					flex items-center gap-2
				`}>
				<SidebarMenuButton isActive={isActive} variant="default">
					{Icon && (
						<Icon
							className={`
								size-4 shrink-0
							`}
						/>
					)}

					<span>{name}</span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
}
