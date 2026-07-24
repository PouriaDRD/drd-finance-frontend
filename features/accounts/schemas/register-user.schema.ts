import { z } from "zod";

export const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, "نام باید حداقل ۲ کاراکتر باشد")
			.max(100),

		email: z
			.email("لطفا ایمیل صحیح وارد کنید")
			.transform((value) => value.toLowerCase()),

		password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "رمز عبور و تکرار آن یکسان نیستند",

		path: ["confirmPassword"],
	});

export const registerAdminSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, "نام باید حداقل ۲ کاراکتر باشد")
			.max(100),

		email: z
			.email("لطفا ایمیل صحیح وارد کنید")
			.transform((value) => value.toLowerCase()),

		secret: z.string(),

		password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "رمز عبور و تکرار آن یکسان نیستند",

		path: ["confirmPassword"],
	});
