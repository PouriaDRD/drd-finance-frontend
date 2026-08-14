import Link from "next/link";

import { AppIcon } from "@/components/icons";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { GridShape } from "@/features/shared/components";

export default function LandingPage() {
	return (
		<main
			className={`relative flex min-h-dvh flex-col items-center 
			justify-center px-6 pb-16 pt-12 text-center`}
			dir="rtl">
			<GridShape />

			<Card className="w-full max-w-xs">
				<CardHeader className="flex flex-col items-center justify-center gap-2">
					<AppIcon />
					<CardTitle suppressHydrationWarning>
						Finance Manager
					</CardTitle>

					<CardDescription suppressHydrationWarning>
						به اپ مدیریت مالی خوش آمدید!
					</CardDescription>
				</CardHeader>

				{/* Actions */}
				<CardContent>
					<Link href="/auth/login">
						<Button variant={"outline"}>ورود به سامانه</Button>
					</Link>
				</CardContent>
			</Card>
		</main>
	);
}
