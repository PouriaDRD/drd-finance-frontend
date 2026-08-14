import { PropsWithChildren } from "react";

import {
	MobileNavigation,
	PanelHeader,
	PanelSidebar,
} from "@/components/layouts";
import { SidebarProvider } from "@/components/ui";

export default function PanelLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<SidebarProvider defaultOpen>
			<PanelSidebar />
			<div className="flex flex-col w-full">
				<PanelHeader />

				<div className="flex-1 h-full">{children}</div>

				<MobileNavigation />
			</div>
		</SidebarProvider>
	);
}
