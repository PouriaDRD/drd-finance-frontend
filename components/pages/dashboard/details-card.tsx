"use client";

import { CalendarDays, VerifiedIcon } from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui";
import { LogoutDialog } from "@/features/auth/components/dialogs";
import { toIranDateTime } from "@/features/shared/utils";
import { User } from "@/features/user/types";

interface Props {
	user: User;
}

export function DetailsCard({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login ?? new Date());
	const joinedAt = toIranDateTime(user.created_at ?? new Date());

	const initials = user.email.slice(0, 2).toUpperCase();

	return (
		<Card className="overflow-hidden pb-0 md:pb-6">
			{/* Header */}

			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex items-center gap-3">
					<Avatar size="lg">
						<AvatarImage
							src="/images/avatar-fallback.png"
							className="bg-muted p-2"
						/>

						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>

					<div className="space-y-1">
						<div className="flex items-center gap-1">
							<p className="text-sm font-semibold">{user.name}</p>

							{user.email_verified && (
								<VerifiedIcon className="size-4 text-primary" />
							)}
						</div>

						<p className="text-xs text-muted-foreground">
							{user.email}
						</p>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div className="rounded-xl border bg-muted/30 p-4 space-y-2">
						<div className=" flex items-center gap-2 text-muted-foreground">
							<CalendarDays className="size-4" />

							<span className="text-xs">عضویت</span>
						</div>

						<p className="text-xs font-medium">
							{joinedAt.dateWithMonthName}
						</p>
					</div>

					<div className="rounded-xl border bg-muted/30 p-4 space-y-2">
						<div className=" flex items-center gap-2 text-muted-foreground">
							<CalendarDays className="size-4" />

							<span className="text-xs">آخرین ورود</span>
						</div>

						<p className="text-xs font-medium">
							{lastLogin.datetimeWithMonthName}
						</p>
					</div>
				</div>
			</CardContent>

			<CardFooter className="bg-muted flex justify-center md:hidden">
				<LogoutDialog collapsed={false} />
			</CardFooter>
		</Card>
	);
}
