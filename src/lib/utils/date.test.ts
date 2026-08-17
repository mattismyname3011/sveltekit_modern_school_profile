import { describe, expect, it } from 'vitest';
import {
	formatEventDateParts,
	formatEventTime,
	isUpcomingEvent,
	parseEventDate,
	parseEventTimeParts,
	sortEventsChronological
} from './date';

describe('parseEventDate', () => {
	it('parses Indonesian date string', () => {
		const d = parseEventDate('17 Agu 2026');
		expect(d).not.toBeNull();
		expect(d?.getFullYear()).toBe(2026);
		expect(d?.getMonth()).toBe(7); // August = index 7
		expect(d?.getDate()).toBe(17);
	});

	it('parses full Indonesian month name', () => {
		const d = parseEventDate('25 September 2026');
		expect(d).not.toBeNull();
		expect(d?.getFullYear()).toBe(2026);
		expect(d?.getMonth()).toBe(8);
		expect(d?.getDate()).toBe(25);
	});

	it('parses ISO date YYYY-MM-DD', () => {
		const d = parseEventDate('2026-12-31');
		expect(d).not.toBeNull();
		expect(d?.getFullYear()).toBe(2026);
		expect(d?.getMonth()).toBe(11);
		expect(d?.getDate()).toBe(31);
	});

	it('parses DD/MM/YYYY and DD-MM-YYYY', () => {
		const d = parseEventDate('05/10/2026');
		expect(d).not.toBeNull();
		expect(d?.getFullYear()).toBe(2026);
		expect(d?.getMonth()).toBe(9);
		expect(d?.getDate()).toBe(5);
	});

	it('returns null for invalid inputs', () => {
		expect(parseEventDate(null)).toBeNull();
		expect(parseEventDate('')).toBeNull();
		expect(parseEventDate('invalid-date-string')).toBeNull();
	});
});

describe('formatEventDateParts', () => {
	it('derives date parts from ISO string', () => {
		const parts = formatEventDateParts('2026-08-17');
		expect(parts.dateDay).toBe('17');
		expect(parts.dateMonth).toBe('Agu');
		expect(parts.date).toBe('17 Agu 2026');
		expect(parts.isoDate).toBe('2026-08-17');
	});

	it('derives date parts from Indonesian text string', () => {
		const parts = formatEventDateParts('25 Sep 2026');
		expect(parts.dateDay).toBe('25');
		expect(parts.dateMonth).toBe('Sep');
		expect(parts.date).toBe('25 Sep 2026');
		expect(parts.isoDate).toBe('2026-09-25');
	});
});

describe('isUpcomingEvent', () => {
	const refDate = new Date(2026, 7, 17, 10, 30); // 17 Aug 2026 10:30

	it('identifies today as upcoming', () => {
		expect(isUpcomingEvent('17 Agu 2026', refDate)).toBe(true);
		expect(isUpcomingEvent('2026-08-17', refDate)).toBe(true);
	});

	it('identifies future dates as upcoming', () => {
		expect(isUpcomingEvent('18 Agu 2026', refDate)).toBe(true);
		expect(isUpcomingEvent('25 Sep 2026', refDate)).toBe(true);
		expect(isUpcomingEvent('2027-01-01', refDate)).toBe(true);
	});

	it('identifies past dates as not upcoming', () => {
		expect(isUpcomingEvent('16 Agu 2026', refDate)).toBe(false);
		expect(isUpcomingEvent('12 Jun 2026', refDate)).toBe(false);
		expect(isUpcomingEvent('8 Jul 2026', refDate)).toBe(false);
		expect(isUpcomingEvent('2 Agu 2026', refDate)).toBe(false);
	});
});

describe('sortEventsChronological', () => {
	it('sorts events in ascending order by date', () => {
		const list = [
			{ title: 'C', date: '25 Sep 2026' },
			{ title: 'A', date: '17 Agu 2026' },
			{ title: 'B', date: '01 Sep 2026' }
		];
		const sorted = sortEventsChronological(list);
		expect(sorted.map((e) => e.title)).toEqual(['A', 'B', 'C']);
	});
});

describe('formatEventTime & parseEventTimeParts', () => {
	it('formats simple time strings to HH:mm WITA', () => {
		expect(formatEventTime('08:00')).toBe('08:00 WITA');
		expect(formatEventTime('8:30')).toBe('08:30 WITA');
		expect(formatEventTime('07.30')).toBe('07:30 WITA');
		expect(formatEventTime('08:00:00')).toBe('08:00 WITA');
		expect(formatEventTime('08:00 WITA')).toBe('08:00 WITA');
		expect(formatEventTime('08:00 wita')).toBe('08:00 WITA');
		expect(formatEventTime('15:30 WITA')).toBe('15:30 WITA');
	});

	it('formats time range strings with WITA suffix', () => {
		expect(formatEventTime('08:00 - 11:00')).toBe('08:00 - 11:00 WITA');
		expect(formatEventTime('08:00 - 11:00 WITA')).toBe('08:00 - 11:00 WITA');
	});

	it('handles empty and null time inputs gracefully', () => {
		expect(formatEventTime('')).toBe('');
		expect(formatEventTime(null)).toBe('');
		expect(formatEventTime(undefined)).toBe('');
	});

	it('parses hour and minute parts correctly', () => {
		expect(parseEventTimeParts('08:00 WITA')).toEqual({ hour: 8, minute: 0 });
		expect(parseEventTimeParts('15:45')).toEqual({ hour: 15, minute: 45 });
		expect(parseEventTimeParts('7.30')).toEqual({ hour: 7, minute: 30 });
		expect(parseEventTimeParts('')).toBeNull();
		expect(parseEventTimeParts('invalid')).toBeNull();
	});
});

