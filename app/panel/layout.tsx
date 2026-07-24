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
			<div className="flex flex-col w-full overflow-hidden">
				<PanelHeader />

				<div className="overflow-auto flex-1">{children}</div>

				<MobileNavigation />
			</div>
		</SidebarProvider>
	);
}
