export function DashLoading() {
	return (
		<div className="flex flex-col gap-4 mx-auto animate-pulse w-full bg-card p-6 rounded-xl">
			<div className="h-10 bg-muted rounded-lg w-48" />
			<div className="grid grid-cols-3 gap-3">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="h-16 bg-muted rounded-lg" />
				))}
			</div>
			<div className="grid grid-cols-[1fr_1.6fr] gap-4">
				<div className="h-64 bg-muted rounded-xl" />
				<div className="h-64 bg-muted rounded-xl" />
			</div>
		</div>
	);
}
