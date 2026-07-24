"use client";

import { Info } from "lucide-react";

import { SidebarFooter } from "@/components/ui";
import { LogoutDialog } from "@/features/auth/components/dialogs";
import { AppVersion } from "@/features/shared/components";

interface Props {
	collapsed: boolean;
}

export default function PanelSidebarFooter({ collapsed }: Props) {
	return (
		<SidebarFooter className="border-t">
			<div className="flex flex-col items-center justify-center gap-2">
				<LogoutDialog collapsed={collapsed} />

				{collapsed ? (
					<div className="flex items-center justify-center">
						<Info className="size-4 text-muted-foreground" />
					</div>
				) : (
					<div className="border-t pt-2 w-full">
						<AppVersion />
					</div>
				)}
			</div>
		</SidebarFooter>
	);
}
