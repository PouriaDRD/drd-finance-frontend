"use client";

import { useEffect, useState } from "react";

import { getAdminUsers } from "@/features/accounts/actions/user.action";
import { PublicUser } from "@/features/accounts/types";

import { StatBaseCard } from "../stat-base-card";

export function AdminDashboardStats() {
	const [users, setUsers] = useState<PublicUser[]>([]);

	useEffect(() => {
		getAdminUsers().then((response) => {
			if (response.success) {
				setUsers(response.data);
			}
		});
	}, []);

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
			<StatBaseCard
				label="تعداد کل کاربران"
				value={users.length.toString()}
				small
			/>
		</div>
	);
}
