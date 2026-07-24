"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { isLinkActive } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";

import { MOBILE_LINKS, NavigationLink } from "./links.nav";

export function MobileNavigation() {
	const { user, isLoading } = useUser();

	if (isLoading || !user) {
		return <MobileNavigationSkeleton />;
	}

	const allowedItems = MOBILE_LINKS.filter((item) => {
		if (!item.allowedRoles) return true;

		return item.allowedRoles.includes(user.role);
	});

	return (
		<nav className="sticky md:hidden bottom-0 z-50 w-full border-t bg-sidebar backdrop-blur-xl">
			<div
				className="grid items-center px-4 py-2"
				style={{
					gridTemplateColumns: `repeat(${allowedItems.length}, minmax(0, 1fr))`,
				}}>
				{allowedItems.map((navigation) => (
					<MenuItem
						key={navigation.href}
						href={navigation.href}
						Icon={navigation.Icon}
						name={navigation.name}
					/>
				))}
			</div>
		</nav>
	);
}

function MenuItem({ href, Icon, name }: NavigationLink) {
	const pathname = usePathname();

	const isActive = isLinkActive(pathname, href);

	return (
		<Link
			href={href}
			className="relative flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2">
			{isActive && (
				<motion.div
					layoutId="activeTab"
					className="absolute inset-0 rounded-2xl bg-primary/10 dark:bg-accent"
					transition={{
						type: "spring",
						stiffness: 450,
						damping: 35,
					}}
				/>
			)}

			<div
				className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-300 ${
					isActive
						? "text-primary dark:text-foreground"
						: "text-muted-foreground"
				}`}>
				{Icon && <Icon className="size-4 shrink-0" />}
				<span className="text-xs font-bold">{name}</span>
			</div>
		</Link>
	);
}

function MobileNavigationSkeleton() {
	return (
		<nav className="sticky md:hidden bottom-0 z-50 w-full border-t border-border/95 bg-sidebar/95 backdrop-blur-xl">
			<div
				className="grid items-center px-4 py-2"
				style={{
					gridTemplateColumns: `repeat(${MOBILE_LINKS.length}, minmax(0, 1fr))`,
				}}>
				{Array.from({ length: MOBILE_LINKS.length }).map((_, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center gap-2 py-2">
						<div className="relative overflow-hidden rounded-xl">
							<div className="size-9 rounded-xl bg-muted" />
							<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-background/60 to-transparent" />
						</div>

						<div className="relative h-2.5 w-10 overflow-hidden rounded-full bg-muted">
							<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-background/60 to-transparent" />
						</div>
					</div>
				))}
			</div>
		</nav>
	);
}
