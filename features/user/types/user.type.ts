export type UserRole = "superuser" | "admin" | "user";

export type UserStatus = "active" | "inactive" | "banned";

export type User = {
	id: string;
	name: string;
	email: string;
	email_verified: boolean;
	role: UserRole;
	status: UserStatus;
	last_login: Date;
	created_at: Date;
};
