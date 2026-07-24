import { z } from "zod";

import type { loginSchema } from "../schemas";

import { PublicUser } from "./user.type";

export interface LoginResponse {
	user: PublicUser;
	token: string;
}

export type LoginUserSchema = z.infer<typeof loginSchema>;
