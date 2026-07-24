import { z } from "zod";

import { CategoryType } from "../types";

export const categorySchema = z.object({
	name: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد"),

	type: z.enum(CategoryType).default("income"),

	description: z.string().min(2, "توضیحات باید حداقل ۲ کاراکتر باشد"),

	is_archived: z.boolean().default(false),
});
