import { z } from "zod";

import type { registerAdminSchema, registerSchema } from "../schemas";

import { PublicUser } from "./user.type";

export type RegisterUserSchema = z.infer<typeof registerSchema>;

export type RegisterAdminSchema = z.infer<typeof registerAdminSchema>;

export interface RegisterResponse {
	user: PublicUser;
	token: string;
}
