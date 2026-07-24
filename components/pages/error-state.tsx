"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

import { Button, Card, CardContent } from "../ui";

export function ErrorState() {
	return (
		<Card className="mx-auto w-full max-w-md border-dashed">
			<CardContent className="flex min-h-80 flex-col items-center justify-center px-6 py-10 text-center">
				<div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
					<TriangleAlert className="size-8 text-destructive" />
				</div>

				<h3 className="text-lg font-semibold">خطا در دریافت اطلاعات</h3>

				<p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
					متأسفانه اطلاعات قابل دریافت نیست. لطفاً چند لحظه دیگر
					دوباره تلاش کنید.
				</p>

				<Button
					variant="outline"
					className="mt-6 gap-2"
					onClick={() => window.location.reload()}>
					<RefreshCw className="size-4" />
					تلاش مجدد
				</Button>
			</CardContent>
		</Card>
	);
}
