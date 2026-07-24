import type { DateObject } from "react-multi-date-picker";
import { z } from "zod";

import { toEnglishDigits } from "@/features/shared/utils";

import { TransactionType } from "../types";

export const transactionSchema = z.object({
	categoryId: z
		.string()
		.trim()
		.min(1, "نام دسته‌بندی باید حداقل ۱ کاراکتر باشد"),

	type: z.enum(TransactionType).default("income"),

	description: z.string().min(2, "توضیحات باید حداقل ۲ کاراکتر باشد"),

	amount: z
		.number("مبلغ را وارد کنید.")
		.min(10_000, "حداقل مبلغ ۱۰٬۰۰۰ تومان است.")
		.transform((value) => Number(toEnglishDigits(String(value)))),

	transactionDate: z.custom<DateObject>((value) => value != null, {
		message: "تاریخ تراکنش را وارد کنید.",
	}),

	month: z.number().min(1, "ماه باید حداقل ۱ باشد"),
});
