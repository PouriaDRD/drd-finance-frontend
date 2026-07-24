"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { toEnglishDigits } from "@/features/shared/utils";

import { reportSchema } from "../schemas";
import { ReportSchema } from "../types/report.type";

interface Props {
	onSuccess?: (data: ReportSchema) => void;
}

export function useReportForm({ onSuccess }: Props) {
	const now = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
		year: "numeric",
		month: "numeric",
	})
		.format(new Date())
		.split("/");

	const form = useForm<ReportSchema>({
		resolver: zodResolver(reportSchema),
		defaultValues: {
			year: Number(toEnglishDigits(now[0])),
			month: Number(toEnglishDigits(now[1])),
		},
	});

	const [report, setReport] = useState<ReportSchema>({
		year: Number(toEnglishDigits(now[0])),
		month: Number(toEnglishDigits(now[1])),
	});

	const submit = form.handleSubmit(async ({ year, month }) => {
		try {
			setReport({
				year: Number(year),
				month: Number(month),
			});
			onSuccess?.({
				year: Number(year),
				month: Number(month),
			});
		} catch {
			toast.error("دریافت گزارش با خطا مواجه شد.");
		}
	});

	const onInitialValues = useEffectEvent(() => {
		submit();
	});

	useEffect(() => {
		onInitialValues();
	}, []);

	return {
		form,
		submit,
		report,
	};
}
