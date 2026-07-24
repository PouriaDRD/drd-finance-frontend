import { toIranDateTime } from "@/features/shared/utils";
import { User } from "@/features/user/types";

import { StatBaseCard } from "../stat-base-card";

interface Props {
	user: User;
}

export function DashboardStats({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login ?? new Date());
	const createdAt = toIranDateTime(user.created_at);

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			<StatBaseCard
				label="آخرین ورود"
				value={lastLogin.dateWithMonthName}
				small>
				{lastLogin.time}
			</StatBaseCard>

			<StatBaseCard
				label="تاریخ عضویت"
				value={createdAt.dateWithMonthName}
				small>
				{createdAt.time}
			</StatBaseCard>
		</div>
	);
}
