"use client";

interface Props {
	title: string;
	description: string;
	children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: Props) {
	return (
		<div className="flex items-end justify-between border-b pb-5">
			<div className="space-y-1">
				<h1
					suppressHydrationWarning
					className="text-2xl md:text-3xl font-bold">
					{title}
				</h1>

				<p
					suppressHydrationWarning
					className="text-sm text-muted-foreground">
					{description}
				</p>
			</div>

			<div>{children}</div>
		</div>
	);
}
