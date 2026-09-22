"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
	financeApi,
	getPersianMonthLabel,
	TransactionExportFormat,
} from "../api";

export function useMonthExport() {
	const [exportingFormat, setExportingFormat] =
		useState<TransactionExportFormat | null>(null);

	const exportMonth = async (
		format: TransactionExportFormat,
		year: number,
		month: number,
	) => {
		if (exportingFormat) {
			return;
		}

		setExportingFormat(format);

		const periodLabel = `${getPersianMonthLabel(month)} ${year}`;

		try {
			const { blob } =
				await financeApi.exportTransactionsInMonth(
					year,
					month,
					format,
				);

			const objectUrl = URL.createObjectURL(blob);
			const link = document.createElement("a");

			link.href = objectUrl;
			link.download = `${periodLabel}.${format}`;
			link.style.display = "none";

			document.body.appendChild(link);
			link.click();
			link.remove();

			window.setTimeout(() => {
				URL.revokeObjectURL(objectUrl);
			}, 1000);

			toast.success(
				`خروجی ${periodLabel} با موفقیت دریافت شد.`,
			);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: `دریافت خروجی ${periodLabel} با خطا مواجه شد.`;

			toast.error(message);
		} finally {
			setExportingFormat(null);
		}
	};

	return {
		exportMonth,
		exportingFormat,
		isExporting: exportingFormat !== null,
	};
}
