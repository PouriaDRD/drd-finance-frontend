import type { DateObject } from "react-multi-date-picker";
import { z } from "zod";

import { toEnglishDigits } from "@/features/shared/utils";

// import { TransactionType } from "../types";

export const transactionSchema = z.object({
	category_id: z.string().trim().min(1, "دسته بندی را انتخاب کنید"),

	// type: z.enum(TransactionType).default("income"),

	description: z.string().min(2, "توضیحات باید حداقل ۲ کاراکتر باشد"),

	amount: z
		.number("مبلغ را وارد کنید.")
		.min(1000, "حداقل مبلغ ۱۰۰۰ تومان است.")
		.transform((value) => Number(toEnglishDigits(String(value)))),

	date: z.custom<DateObject>((value) => value != null, {
		message: "تاریخ تراکنش را وارد کنید.",
	}),
});
