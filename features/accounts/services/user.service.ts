import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories";
import type {
	LoginUserSchema,
	PublicUser,
	RegisterAdminSchema,
	RegisterUserSchema,
	UserDocument,
	UserObject,
	UserStatus,
} from "../types";

export class UserService {
	async register(data: RegisterUserSchema): Promise<{
		user: PublicUser;
		token: string;
	}> {
		if (!data.email || !data.password || !data.name) {
			throw new Error("تمام فیلد ها باید پر شوند");
		}

		const exists = await userRepository.existsByEmail(data.email);

		if (exists) {
			throw new Error("ایمیل قبلا ثبت شده است");
		}

		const user = await userRepository.create({
			name: data.name.trim(),

			email: data.email.toLowerCase().trim(),

			password: await this.hashPassword(data.password),

			role: "user",

			status: "active",

			emailVerified: false,
		});

		await userRepository.updateLastLoginAt(user.id);

		const publicUser = this.sanitizeUser(user);

		return {
			user: publicUser,
			token: this.createToken(publicUser),
		};
	}

	async login(data: LoginUserSchema): Promise<{
		user: PublicUser;
		token: string;
	}> {
		if (!data.email || !data.password) {
			throw new Error("تمام فیلد ها باید پر شوند");
		}

		const user = await userRepository.findByEmailForAuth(
			data.email.toLowerCase().trim(),
		);

		if (!user || user.status !== "active") {
			throw new Error("نام کاربری یا رمز عبور نادرست است");
		}

		const valid = await this.comparePassword(data.password, user.password);

		if (!valid) {
			throw new Error("نام کاربری یا رمز عبور نادرست است");
		}

		await userRepository.updateLastLoginAt(user.id);

		const publicUser = this.sanitizeUser(user);

		return {
			user: publicUser,
			token: this.createToken(publicUser),
		};
	}

	async getById(id: string): Promise<PublicUser | null> {
		const user = await userRepository.findById(id);

		return user ? this.sanitizeUser(user) : null;
	}

	async getByEmail(email: string): Promise<PublicUser | null> {
		const user = await userRepository.findByEmail(email);

		return user ? this.sanitizeUser(user) : null;
	}

	async updateStatus(
		id: string,
		status: UserStatus,
	): Promise<PublicUser | null> {
		const user = await userRepository.updateStatus(id, status);

		return user ? this.sanitizeUser(user) : null;
	}

	async list(): Promise<PublicUser[]> {
		const users = await userRepository.find();

		return users.map((user) => this.sanitizeUser(user));
	}

	async registerAdmin(data: RegisterAdminSchema): Promise<{
		user: PublicUser;
		token: string;
	}> {
		if (!data.email || !data.password || !data.name || !data.secret) {
			throw new Error("تمام فیلد ها باید پر شوند");
		}

		if (data.secret !== process.env.ADMIN_SECRET) {
			throw new Error("سکرت وارد شده اشتباه است");
		}

		const exists = await userRepository.existsByEmail(data.email);

		if (exists) {
			throw new Error("ایمیل قبلا ثبت شده است");
		}

		const user = await userRepository.create({
			name: data.name.trim(),

			email: data.email.toLowerCase().trim(),

			password: await this.hashPassword(data.password),

			role: "admin",

			status: "active",

			emailVerified: true,
		});

		await userRepository.updateLastLoginAt(user.id);

		const publicUser = this.sanitizeUser(user);

		return {
			user: publicUser,
			token: this.createToken(publicUser),
		};
	}

	private sanitizeUser(user: UserDocument | UserObject): PublicUser {
		const data = "toObject" in user ? user.toObject() : user;

		return {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			id: String(data.id),

			name: data.name,

			email: data.email,

			role: data.role,

			status: data.status,

			emailVerified: data.emailVerified,

			lastLoginAt: data.lastLoginAt,

			createdAt: data.createdAt,

			updatedAt: data.updatedAt,
		};
	}

	private hashPassword(password: string) {
		return bcrypt.hash(password, 12);
	}

	private comparePassword(password: string, hash: string) {
		return bcrypt.compare(password, hash);
	}

	private createToken(user: PublicUser) {
		return jwt.sign(
			{
				userId: user.id,
				role: user.role,
				email: user.email,
			},
			process.env.JWT_SECRET!,
			{
				expiresIn: "7d",
			},
		);
	}
}

export const userService = new UserService();
