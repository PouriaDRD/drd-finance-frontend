"use client";

import { useState } from "react";

import { toast } from "sonner";

import { CurrentMonthExportFormat, financeApi } from "../api";

export function useCurrentMonthExport() {
	const [exportingFormat, setExportingFormat] =
		useState<CurrentMonthExportFormat | null>(null);

	const exportCurrentMonth = async (format: CurrentMonthExportFormat) => {
		if (exportingFormat) {
			return;
		}

		setExportingFormat(format);

		try {
			const { blob, filename } =
				await financeApi.exportCurrentMonthTransactions(format);

			const objectUrl = URL.createObjectURL(blob);

			const link = document.createElement("a");

			link.href = objectUrl;
			link.download = filename;
			link.style.display = "none";

			document.body.appendChild(link);

			link.click();

			link.remove();

			window.setTimeout(() => {
				URL.revokeObjectURL(objectUrl);
			}, 1000);

			toast.success(
				format === "xlsx"
					? "خروجی Excel ماه جاری با موفقیت دریافت شد."
					: "خروجی CSV ماه جاری با موفقیت دریافت شد.",
			);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "دریافت خروجی ماه جاری با خطا مواجه شد.";

			toast.error(message);
		} finally {
			setExportingFormat(null);
		}
	};

	return {
		exportCurrentMonth,
		exportingFormat,
		isExporting: exportingFormat !== null,
	};
}
