/**
 * Date parsing, formatting, and filtering helpers for events.
 */

const MONTH_MAP: Record<string, number> = {
	// Indonesian months (full and short)
	januari: 0,
	jan: 0,
	februari: 1,
	feb: 1,
	maret: 2,
	mar: 2,
	april: 3,
	apr: 3,
	mei: 4,
	juni: 5,
	jun: 5,
	juli: 6,
	jul: 6,
	agustus: 7,
	agust: 7,
	agu: 7,
	ags: 7,
	september: 8,
	sept: 8,
	sep: 8,
	oktober: 9,
	okt: 9,
	november: 10,
	nopember: 10,
	nov: 10,
	nop: 10,
	desember: 11,
	des: 11,

	// English months (full and short)
	january: 0,
	february: 1,
	march: 2,
	may: 4,
	june: 5,
	july: 6,
	august: 7,
	aug: 7,
	october: 9,
	oct: 9,
	december: 11,
	dec: 11
};

const ID_MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/**
 * Parses various date formats into a JavaScript Date object.
 * Supports:
 * - ISO string: "2026-08-17" or "2026-08-17T00:00:00.000Z"
 * - Indonesian/English formatted: "17 Agu 2026", "17 Agustus 2026", "12 Jun 2026"
 * - Date string without year: "12 Jun" (defaults to current year)
 * - Slash/dash formatted: "17/08/2026", "17-08-2026"
 */
export function parseEventDate(raw: string | Date | null | undefined): Date | null {
	if (!raw) return null;
	if (raw instanceof Date) {
		return isNaN(raw.getTime()) ? null : raw;
	}

	const str = raw.trim();
	if (!str) return null;

	// 1. Check YYYY-MM-DD or ISO format
	const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(str);
	if (isoMatch) {
		const year = parseInt(isoMatch[1], 10);
		const month = parseInt(isoMatch[2], 10) - 1;
		const day = parseInt(isoMatch[3], 10);
		const d = new Date(year, month, day);
		return isNaN(d.getTime()) ? null : d;
	}

	// 2. Check DD/MM/YYYY or DD-MM-YYYY
	const dmyNumMatch = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(str);
	if (dmyNumMatch) {
		const day = parseInt(dmyNumMatch[1], 10);
		const month = parseInt(dmyNumMatch[2], 10) - 1;
		const year = parseInt(dmyNumMatch[3], 10);
		const d = new Date(year, month, day);
		return isNaN(d.getTime()) ? null : d;
	}

	// 3. Check text-based format e.g. "17 Agu 2026", "17 Agustus 2026", "8 Jul 2026", "12 Jun"
	const textMatch = /^(\d{1,2})\s+([a-zA-Z]+)(?:\s+(\d{4}))?$/.exec(str);
	if (textMatch) {
		const day = parseInt(textMatch[1], 10);
		const monthName = textMatch[2].toLowerCase();
		const month = MONTH_MAP[monthName];
		const year = textMatch[3] ? parseInt(textMatch[3], 10) : new Date().getFullYear();

		if (month !== undefined) {
			const d = new Date(year, month, day);
			return isNaN(d.getTime()) ? null : d;
		}
	}

	// 4. Fallback to standard Date.parse
	const fallback = new Date(str);
	return isNaN(fallback.getTime()) ? null : fallback;
}

/**
 * Derives structured date parts (date, dateDay, dateMonth, isoDate) from any date input.
 */
export function formatEventDateParts(input: string | Date): {
	date: string;
	dateDay: string;
	dateMonth: string;
	isoDate: string;
} {
	const parsed = parseEventDate(input) ?? new Date();
	const day = parsed.getDate();
	const month = parsed.getMonth();
	const year = parsed.getFullYear();

	const dateDay = String(day).padStart(2, '0');
	const dateMonth = ID_MONTH_SHORT[month] ?? 'Jan';
	const date = `${day} ${dateMonth} ${year}`;
	const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${dateDay}`;

	return {
		date,
		dateDay,
		dateMonth,
		isoDate
	};
}

/**
 * Checks whether an event date is on or after the start of referenceDate (today 00:00:00.000).
 */
export function isUpcomingEvent(dateInput: string | Date | null | undefined, referenceDate = new Date()): boolean {
	const parsed = parseEventDate(dateInput);
	if (!parsed) return false;

	const startOfRef = new Date(
		referenceDate.getFullYear(),
		referenceDate.getMonth(),
		referenceDate.getDate(),
		0,
		0,
		0,
		0
	);

	const eventDay = new Date(
		parsed.getFullYear(),
		parsed.getMonth(),
		parsed.getDate(),
		0,
		0,
		0,
		0
	);

	return eventDay.getTime() >= startOfRef.getTime();
}

/**
 * Sorts an array of events chronologically ascending by date.
 */
export function sortEventsChronological<T extends { date: string }>(items: T[]): T[] {
	return [...items].sort((a, b) => {
		const da = parseEventDate(a.date)?.getTime() ?? 0;
		const db = parseEventDate(b.date)?.getTime() ?? 0;
		return da - db;
	});
}

/**
 * Formats or normalizes an event time string ensuring the 'WITA' suffix is present.
 * Examples:
 * - "08:00" -> "08:00 WITA"
 * - "08:00 WITA" -> "08:00 WITA"
 * - "07.30" -> "07:30 WITA"
 * - "8:30" -> "08:30 WITA"
 * - "08:00:00" -> "08:00 WITA"
 * - "08:00 - 11:00" -> "08:00 - 11:00 WITA"
 */
export function formatEventTime(timeInput: string | null | undefined): string {
	if (!timeInput) return '';
	const trimmed = timeInput.trim();
	if (!trimmed) return '';

	// Match single standard time e.g. 08:00, 8:00, 07.30, 08:00:00 with optional existing WITA
	const singleMatch = /^(\d{1,2})[:.](\d{2})(?::\d{2})?(?:\s*(?:WITA|wita|Wita))?$/.exec(trimmed);
	if (singleMatch) {
		const hour = String(parseInt(singleMatch[1], 10)).padStart(2, '0');
		const minute = singleMatch[2];
		return `${hour}:${minute} WITA`;
	}

	// Match time range e.g. 08:00 - 11:00 with optional existing WITA
	const rangeMatch = /^(\d{1,2})[:.](\d{2})\s*[-–—]\s*(\d{1,2})[:.](\d{2})(?:\s*(?:WITA|wita|Wita))?$/.exec(trimmed);
	if (rangeMatch) {
		const h1 = String(parseInt(rangeMatch[1], 10)).padStart(2, '0');
		const m1 = rangeMatch[2];
		const h2 = String(parseInt(rangeMatch[3], 10)).padStart(2, '0');
		const m2 = rangeMatch[4];
		return `${h1}:${m1} - ${h2}:${m2} WITA`;
	}

	// If it already ends with WITA (case-insensitive)
	if (/WITA$/i.test(trimmed)) {
		return trimmed.replace(/\s*WITA$/i, ' WITA');
	}

	return `${trimmed} WITA`;
}

/**
 * Extracts hour and minute numbers from a time string.
 * Returns { hour: number, minute: number } or null if unparseable.
 */
export function parseEventTimeParts(timeInput: string | null | undefined): { hour: number; minute: number } | null {
	if (!timeInput) return null;
	const match = /^(\d{1,2})[:.](\d{2})/.exec(timeInput.trim());
	if (!match) return null;
	const hour = parseInt(match[1], 10);
	const minute = parseInt(match[2], 10);
	if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
		return null;
	}
	return { hour, minute };
}

