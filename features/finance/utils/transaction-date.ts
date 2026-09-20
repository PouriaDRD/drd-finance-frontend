import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";

export type TransactionDateInput = DateObject | Date | string;

function pad(value: number) {
	return String(value).padStart(2, "0");
}

function formatLocalGregorianDate(date: Date) {
	return [
		date.getFullYear(),
		pad(date.getMonth() + 1),
		pad(date.getDate()),
	].join("-");
}

function normalizeDateString(value: string) {
	return value.trim();
}

/**
 * Convert a transaction date to a Persian DateObject without UTC conversion.
 *
 * Transaction dates are date-only values. Treating them as instants and
 * converting them through UTC can shift the calendar day.
 */
export function toPersianDateObject(
	value: TransactionDateInput,
): DateObject {
	if (value instanceof DateObject) {
		return new DateObject(value).convert(
			persian,
			persianFa,
		);
	}

	if (value instanceof Date) {
		return new DateObject({
			date: formatLocalGregorianDate(value),
			format: "YYYY-MM-DD",
			calendar: gregorian,
		}).convert(persian, persianFa);
	}

	const normalized = normalizeDateString(value);

	if (/^\d{4}-\d{2}-\d{2}/.test(normalized)) {
		return new DateObject({
			date: normalized.slice(0, 10),
			format: "YYYY-MM-DD",
			calendar: gregorian,
		}).convert(persian, persianFa);
	}

	if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(normalized)) {
		return new DateObject({
			date: normalized,
			format: "YYYY/MM/DD",
			calendar: persian,
			locale: persianFa,
		});
	}

	throw new Error("Invalid transaction date");
}

/**
 * Convert a transaction date to the Gregorian YYYY-MM-DD format expected by
 * the Django DateField. This deliberately does not use Date.toISOString().
 */
export function toGregorianDateString(
	value: TransactionDateInput,
): string {
	if (value instanceof DateObject) {
		return new DateObject(value)
			.convert(gregorian)
			.format("YYYY-MM-DD");
	}

	if (value instanceof Date) {
		return formatLocalGregorianDate(value);
	}

	const normalized = normalizeDateString(value);

	if (/^\d{4}-\d{2}-\d{2}/.test(normalized)) {
		return normalized.slice(0, 10);
	}

	if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(normalized)) {
		return new DateObject({
			date: normalized,
			format: "YYYY/MM/DD",
			calendar: persian,
			locale: persianFa,
		})
			.convert(gregorian)
			.format("YYYY-MM-DD");
	}

	throw new Error("Invalid transaction date");
}
