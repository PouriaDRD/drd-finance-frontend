import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.email("لطفا ایمیل صحیح وارد کنید")
		.transform((value) => value.toLowerCase()),

	password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});
