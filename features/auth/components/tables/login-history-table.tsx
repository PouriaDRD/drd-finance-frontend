"use client";

import {
	CalendarDays,
	Globe2,
	Laptop,
	LogIn,
	MapPin,
	MonitorSmartphone,
	ShieldCheck,
} from "lucide-react";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { cn, toIranDateTime } from "@/features/shared/utils";

import { useMyLoginHistory } from "../../mutations";
import type { LoginHistory } from "../../types";

export function LoginHistoryCardTable() {
	const { data, isLoading, isError } = useMyLoginHistory();

	const histories = data?.success ? (data.data ?? []) : [];

	return (
		<Card
			className={`
				overflow-hidden gap-0
				border-border/70 shadow-sm
			`}>
			<CardHeader
				className={`
					flex flex-row items-center
					justify-between gap-3
					border-b border-border/60
					px-4 py-4
				`}>
				<div
					className={`
						flex min-w-0
						items-center gap-3
					`}>
					<div
						className={`
							flex size-9 shrink-0
							items-center justify-center
							rounded-xl border
							bg-muted/40
							text-muted-foreground
						`}>
						<LogIn className="size-4" />
					</div>

					<div className="min-w-0">
						<CardTitle className="text-base">
							تاریخچه ورود
						</CardTitle>

						<p
							className={`
								mt-0.5 truncate
								text-xs
								text-muted-foreground
							`}>
							آخرین فعالیت‌های ورود به حساب
						</p>
					</div>
				</div>

				{!isLoading && !isError && data?.success && (
					<Badge variant="outline" className="font-normal">
						{histories.length.toLocaleString("fa-IR")} ورود
					</Badge>
				)}
			</CardHeader>

			{isLoading ? (
				<TableState type="loading" />
			) : isError || !data?.success ? (
				<TableState type="error" />
			) : histories.length === 0 ? (
				<TableState type="empty" />
			) : (
				<LoginHistoryContent histories={histories} />
			)}
		</Card>
	);
}

function LoginHistoryContent({ histories }: { histories: LoginHistory[] }) {
	const successCount = histories.filter((item) => item.is_successful).length;

	const failedCount = histories.length - successCount;

	const latest = toIranDateTime(histories[0].created_at);

	return (
		<>
			<div
				className={`
					grid grid-cols-1
					border-b border-border/60
					bg-muted/15
					sm:grid-cols-3
				`}>
				<SummaryItem
					icon={CalendarDays}
					label="آخرین فعالیت"
					value={`${latest.dateWithMonthName} - ${latest.time}`}
				/>

				<SummaryItem
					icon={ShieldCheck}
					label="ورود موفق"
					value={`${successCount.toLocaleString("fa-IR")} مورد`}
				/>

				<SummaryItem
					icon={LogIn}
					label="ورود ناموفق"
					value={`${failedCount.toLocaleString("fa-IR")} مورد`}
				/>
			</div>

			<div className="md:hidden">
				<div
					className={`
						divide-y
						divide-border/60
					`}>
					{histories.map((history) => (
						<LoginHistoryMobileCard
							key={history.id}
							history={history}
						/>
					))}
				</div>
			</div>

			<div
				className={`
					hidden overflow-x-auto
					md:block
				`}>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="min-w-36 text-right">
								تاریخ
							</TableHead>

							<TableHead className="text-center">وضعیت</TableHead>

							<TableHead className="min-w-40 text-center">
								دستگاه
							</TableHead>

							<TableHead className="min-w-36 text-center">
								مرورگر
							</TableHead>

							<TableHead className="min-w-36 text-center">
								موقعیت
							</TableHead>

							<TableHead className="min-w-28 text-center">
								IP
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{histories.map((history) => (
							<LoginHistoryRow
								key={history.id}
								history={history}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

function SummaryItem({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof CalendarDays;
	label: string;
	value: string;
}) {
	return (
		<div
			className={`
				flex items-center gap-3
				border-b border-border/60
				px-4 py-3
				last:border-b-0
				sm:border-b-0
				sm:border-l
				sm:last:border-l-0
			`}>
			<div
				className={`
					flex size-8 shrink-0
					items-center justify-center
					rounded-lg border
					bg-background
					text-muted-foreground
				`}>
				<Icon className="size-3.5" />
			</div>

			<div className="min-w-0">
				<p
					className={`
						text-[10px]
						text-muted-foreground
					`}>
					{label}
				</p>

				<p
					className={`
						mt-0.5 truncate
						text-xs font-semibold
					`}>
					{value}
				</p>
			</div>
		</div>
	);
}

function LoginHistoryRow({ history }: { history: LoginHistory }) {
	const date = toIranDateTime(history.created_at);

	return (
		<TableRow className="hover:bg-muted/20">
			<TableCell>
				<div>
					<p className="text-xs font-medium">
						{date.dateWithMonthName}
					</p>

					<p
						className={`
							mt-0.5 text-[10px]
							tabular-nums
							text-muted-foreground
						`}>
						{date.time}
					</p>
				</div>
			</TableCell>

			<TableCell className="text-center">
				<LoginStatusBadge history={history} />
			</TableCell>

			<TableCell className="text-center">
				<div
					className={`
						inline-flex max-w-44
						items-center gap-2
					`}>
					<MonitorSmartphone
						className={`
							size-3.5 shrink-0
							text-muted-foreground/70
						`}
					/>

					<div className="min-w-0 text-right">
						<p className="truncate text-xs">
							{history.device ?? "نامشخص"}
						</p>

						{history.operating_system && (
							<p
								className={`
									truncate text-[10px]
									text-muted-foreground
								`}>
								{history.operating_system}
							</p>
						)}
					</div>
				</div>
			</TableCell>

			<TableCell className="text-center">
				<div
					className={`
						inline-flex items-center
						gap-2 text-xs
						text-muted-foreground
					`}>
					<Globe2 className="size-3.5" />

					<span className="max-w-32 truncate">
						{history.browser ?? "نامشخص"}
					</span>
				</div>
			</TableCell>

			<TableCell className="text-center">
				<LocationLabel history={history} />
			</TableCell>

			<TableCell className="text-center">
				<code
					className={`
						rounded-lg bg-muted/45
						px-2 py-1 text-[10px]
						tabular-nums
						text-muted-foreground
					`}>
					{history.ip_address ?? "-"}
				</code>
			</TableCell>
		</TableRow>
	);
}

function LoginHistoryMobileCard({ history }: { history: LoginHistory }) {
	const date = toIranDateTime(history.created_at);

	return (
		<article className="space-y-3 p-4">
			<div
				className={`
					flex items-start
					justify-between gap-3
				`}>
				<div>
					<p className="text-sm font-semibold">
						{date.dateWithMonthName}
					</p>

					<p
						className={`
							mt-0.5 text-[10px]
							tabular-nums
							text-muted-foreground
						`}>
						{date.time}
					</p>
				</div>

				<LoginStatusBadge history={history} />
			</div>

			<div
				className={`
					grid grid-cols-2 gap-2
					rounded-xl bg-muted/25
					p-3
				`}>
				<MobileMeta
					icon={MonitorSmartphone}
					label="دستگاه"
					value={history.device ?? "نامشخص"}
				/>

				<MobileMeta
					icon={Globe2}
					label="مرورگر"
					value={history.browser ?? "نامشخص"}
				/>

				<MobileMeta
					icon={MapPin}
					label="موقعیت"
					value={getLocation(history)}
				/>

				<MobileMeta
					icon={Laptop}
					label="IP"
					value={history.ip_address ?? "-"}
				/>
			</div>

			{!history.is_successful && history.failure_reason && (
				<p
					className={`
							rounded-lg
							bg-rose-500/6
							px-3 py-2
							text-[11px]
							text-rose-600
							dark:text-rose-400
						`}>
					{history.failure_reason}
				</p>
			)}
		</article>
	);
}

function MobileMeta({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof MonitorSmartphone;
	label: string;
	value: string;
}) {
	return (
		<div className="min-w-0">
			<div
				className={`
					flex items-center gap-1.5
					text-muted-foreground
				`}>
				<Icon className="size-3" />

				<span className="text-[9px]">{label}</span>
			</div>

			<p
				className={`
					mt-1 truncate text-[11px]
					font-medium
				`}>
				{value}
			</p>
		</div>
	);
}

function LoginStatusBadge({ history }: { history: LoginHistory }) {
	const successful = history.is_successful;

	return (
		<div className="inline-flex flex-col items-center">
			<Badge
				variant="outline"
				className={cn(
					`
						gap-1.5 px-2
						font-normal
					`,
					successful
						? `
							border-emerald-500/20
							bg-emerald-500/5
							text-emerald-600
							dark:text-emerald-400
						`
						: `
							border-rose-500/20
							bg-rose-500/5
							text-rose-600
							dark:text-rose-400
						`,
				)}>
				<span
					className={cn(
						"size-1.5 rounded-full",
						successful ? "bg-emerald-500" : "bg-rose-500",
					)}
				/>

				{successful ? "موفق" : "ناموفق"}
			</Badge>

			{!successful && history.failure_reason && (
				<span
					className={`
							mt-1 max-w-36 truncate
							text-[9px]
							text-rose-600
							dark:text-rose-400
						`}>
					{history.failure_reason}
				</span>
			)}
		</div>
	);
}

function LocationLabel({ history }: { history: LoginHistory }) {
	const location = getLocation(history);

	return (
		<div
			className={`
				inline-flex items-center
				gap-1.5 text-xs
				text-muted-foreground
			`}>
			<MapPin className="size-3.5" />

			<span className="max-w-32 truncate">{location}</span>
		</div>
	);
}

function getLocation(history: LoginHistory) {
	const parts = [history.city, history.country].filter(Boolean);

	return parts.length ? parts.join("، ") : "نامشخص";
}

function TableState({ type }: { type: "loading" | "empty" | "error" }) {
	const content = {
		loading: {
			title: "در حال دریافت تاریخچه",
			description: "اطلاعات ورود در حال بارگذاری است.",
		},

		empty: {
			title: "هنوز سابقه‌ای وجود ندارد",
			description: "ورودهای بعدی در این بخش نمایش داده می‌شوند.",
		},

		error: {
			title: "دریافت تاریخچه ناموفق بود",
			description: "لطفاً اتصال را بررسی و دوباره تلاش کنید.",
		},
	}[type];

	return (
		<CardContent
			className={`
				flex min-h-56
				items-center justify-center
				p-6
			`}>
			<div className="max-w-xs text-center">
				<div
					className={`
						mx-auto flex size-10
						items-center justify-center
						rounded-xl border
						bg-muted/35
						text-muted-foreground
					`}>
					{type === "loading" ? (
						<div
							className={`
								size-4 animate-spin
								rounded-full border-2
								border-muted-foreground/20
								border-t-foreground
							`}
						/>
					) : (
						<LogIn className="size-4" />
					)}
				</div>

				<p
					className={`
						mt-3 text-sm font-semibold
					`}>
					{content.title}
				</p>

				<p
					className={`
						mt-1 text-xs leading-5
						text-muted-foreground
					`}>
					{content.description}
				</p>
			</div>
		</CardContent>
	);
}
