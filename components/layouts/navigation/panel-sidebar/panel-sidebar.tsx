"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	useSidebar,
} from "@/components/ui";
import { useUser } from "@/features/user/context";

import PanelSidebarFooter from "./panel-sidebar-footer";
import PanelSidebarHeader from "./panel-sidebar-header";
import SidebarLinks from "./sidebar-links";

export default function PanelSidebar() {
	const { user } = useUser();
	const { state } = useSidebar();
	const collapsed = state === "collapsed";

	return (
		<Sidebar side="right" collapsible="icon" className="border-l">
			<PanelSidebarHeader email={user?.email} collapsed={collapsed} />
			<SidebarContent>
				{/* User Panel */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						منو
					</SidebarGroupLabel>

					<SidebarGroupContent className="mt-2">
						{user && <SidebarLinks user={user} />}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<PanelSidebarFooter collapsed={collapsed} />
		</Sidebar>
	);
}
