import { z } from "zod";

export const reportSchema = z.object({
	month: z
		.number()
		.min(1, "ماه باید بین ۱ تا ۱۲ باشد")
		.max(12, "ماه باید بین ۱ تا ۱۲ باشد"),

	year: z
		.number()
		.min(1405, "سال باید بین ۱۴۰۵ تا ۱۵۰۰ باشد")
		.max(1500, "سال باید بین ۱۴۰۵ تا ۱۵۰۰ باشد"),
});

export type ReportSchema = z.infer<typeof reportSchema>;
