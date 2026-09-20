import { Skeleton } from "@/components/ui";

export function DashLoading() {
	return (
		<div className="grid gap-4 sm:gap-5">
			<Skeleton
				className={`
					h-40 w-full rounded-2xl
				`}
			/>

			<div
				className={`
					grid grid-cols-1 gap-3
					sm:grid-cols-2 xl:grid-cols-4
				`}>
				{Array.from({
					length: 4,
				}).map((_, index) => (
					<Skeleton
						key={index}
						className={`
								h-28 rounded-2xl
							`}
					/>
				))}
			</div>

			<div
				className={`
					grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.65fr)]
				`}>
				<Skeleton
					className={`
						h-52 rounded-2xl
					`}
				/>

				<Skeleton
					className={`
						h-52 rounded-2xl
					`}
				/>
			</div>

			<Skeleton
				className={`
					h-105 rounded-2xl
				`}
			/>
		</div>
	);
}
