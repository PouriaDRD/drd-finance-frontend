"use client";

import { PanelRightOpen } from "lucide-react";

import { SidebarHeader, SidebarTrigger } from "@/components/ui";

interface Props {
	collapsed: boolean;
	email?: string;
}

export default function PanelSidebarHeader({ collapsed, email }: Props) {
	return (
		<SidebarHeader
			className={`border-b 
            ${!collapsed ? "px-4" : "px-0"}`}>
			<div
				className={`flex items-center w-full 
                ${!collapsed ? "justify-between" : "justify-center"}`}>
				<div className="min-w-0">
					{!collapsed && (
						<>
							<h2 className="truncate font-bold">پنل کاربری</h2>

							<p className="truncate text-xs text-muted-foreground">
								{email}
							</p>
						</>
					)}
				</div>

				<SidebarTrigger>
					<PanelRightOpen />
				</SidebarTrigger>
			</div>
		</SidebarHeader>
	);
}
