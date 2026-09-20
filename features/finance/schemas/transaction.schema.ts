import DateObject from "react-date-object";
import { z } from "zod";

import { toEnglishDigits } from "@/features/shared/utils";

export const transactionSchema = z.object({
	category_id: z.string().trim().min(1, "دسته‌بندی را انتخاب کنید"),

	description: z.string().trim().min(2, "توضیحات باید حداقل ۲ کاراکتر باشد"),

	amount: z
		.number("مبلغ را وارد کنید.")
		.min(1000, "حداقل مبلغ ۱۰۰۰ تومان است.")
		.transform((value) => Number(toEnglishDigits(String(value)))),

	date: z.custom<DateObject>((value) => value instanceof DateObject, {
		message: "تاریخ تراکنش را وارد کنید.",
	}),
});
