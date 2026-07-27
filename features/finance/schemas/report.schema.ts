import { z } from "zod";

import { toIranDateTime } from "@/features/shared/utils";

const currentYear = toIranDateTime(new Date()).year;

export const reportSchema = z.object({
	month: z
		.number()
		.min(1, "ماه باید بین ۱ تا ۱۲ باشد")
		.max(12, "ماه باید بین ۱ تا ۱۲ باشد"),

	year: z
		.number()
		.min(1400, `سال باید بین 1400 تا ${currentYear} باشد`)
		.max(currentYear, `سال باید بین 1400 تا ${currentYear} باشد`),
});

export type ReportSchema = z.infer<typeof reportSchema>;
