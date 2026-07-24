"use client";

import Link from "next/link";

import { PageLayout } from "@/components/layouts";
import { Button } from "@/components/ui";
import { RegisterCard } from "@/features/accounts/components/cards";
import { useUser } from "@/features/accounts/context";
import { GridShape } from "@/features/shared/components";

function RegisterPage() {
	const { user, isLoading } = useUser();

	/**
	 * Optional: prevent UI flick between states
	 */
	if (isLoading) {
		return (
			<PageLayout className="flex items-center justify-center relative">
				<GridShape />
				<p
					suppressHydrationWarning
					className="text-sm text-muted-foreground">
					در حال بارگذاری...
				</p>
			</PageLayout>
		);
	}

	/**
	 * If user is already authenticated,
	 * redirect them away from register page.
	 */
	if (user) {
		return (
			<PageLayout className="flex items-center justify-center relative">
				<GridShape />
				<AlreadyRegistered />
			</PageLayout>
		);
	}

	return (
		<PageLayout className="flex items-center justify-center relative">
			<GridShape />
			<RegisterCard />
		</PageLayout>
	);
}

export default RegisterPage;

/**
 * UI shown when user is already authenticated.
 */
function AlreadyRegistered() {
	return (
		<div className="flex flex-col items-center gap-4 text-center bg-card shadow p-6 rounded-2xl">
			<p
				suppressHydrationWarning
				className="text-sm text-muted-foreground">
				شما قبلاً وارد شده‌اید و نیازی به ثبت‌نام ندارید.
			</p>

			<Link href="/panel/dashboard">
				<Button variant={"outline"} size={"sm"}>
					بازگشت به پنل
				</Button>
			</Link>
		</div>
	);
}
