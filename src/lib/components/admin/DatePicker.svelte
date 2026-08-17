<script lang="ts">
	import { onMount } from 'svelte';
	import { formatEventDateParts, parseEventDate } from '$lib/utils/date';

	interface Props {
		name: string;
		value?: string;
		required?: boolean;
		placeholder?: string;
	}

	let {
		name,
		value = $bindable(''),
		required = false,
		placeholder = 'Pilih tanggal...'
	}: Props = $props();

	const DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
	const MONTHS_FULL = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	];

	let isOpen = $state(false);
	let pickerEl: HTMLDivElement | null = $state(null);

	// Internal selected date state
	const initialParsed = parseEventDate(value) ?? (value ? new Date(value) : null);
	let selectedDate = $state<Date | null>(
		initialParsed && !isNaN(initialParsed.getTime()) ? initialParsed : null
	);
	let viewYear = $state(
		initialParsed && !isNaN(initialParsed.getTime())
			? initialParsed.getFullYear()
			: new Date().getFullYear()
	);
	let viewMonth = $state(
		initialParsed && !isNaN(initialParsed.getTime())
			? initialParsed.getMonth()
			: new Date().getMonth()
	);

	let lastPropValue = $state(value);

	// Only sync if value changed externally from outside
	$effect(() => {
		if (value !== lastPropValue) {
			lastPropValue = value;
			const parsed = parseEventDate(value) ?? (value ? new Date(value) : null);
			if (parsed && !isNaN(parsed.getTime())) {
				selectedDate = parsed;
				viewYear = parsed.getFullYear();
				viewMonth = parsed.getMonth();
			} else if (!value) {
				selectedDate = null;
			}
		}
	});

	// Formatted outputs
	const isoValue = $derived(
		selectedDate
			? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
			: ''
	);

	const displayFormatted = $derived(
		selectedDate ? formatEventDateParts(selectedDate).date : ''
	);

	// Calendar grid generation
	type CalendarDay = {
		day: number;
		date: Date;
		isCurrentMonth: boolean;
		isToday: boolean;
		isSelected: boolean;
	};

	const calendarGrid = $derived.by(() => {
		const days: CalendarDay[] = [];
		const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
		const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);

		const today = new Date();
		const isSameDay = (d1: Date, d2: Date | null) =>
			Boolean(
				d2 &&
					d1.getFullYear() === d2.getFullYear() &&
					d1.getMonth() === d2.getMonth() &&
					d1.getDate() === d2.getDate()
			);

		// Days from previous month to fill the first row
		const startDayOfWeek = firstDayOfMonth.getDay();
		const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();
		for (let i = startDayOfWeek - 1; i >= 0; i--) {
			const d = new Date(viewYear, viewMonth - 1, prevMonthLastDate - i);
			days.push({
				day: d.getDate(),
				date: d,
				isCurrentMonth: false,
				isToday: isSameDay(d, today),
				isSelected: isSameDay(d, selectedDate)
			});
		}

		// Days of current month
		for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
			const d = new Date(viewYear, viewMonth, i);
			days.push({
				day: i,
				date: d,
				isCurrentMonth: true,
				isToday: isSameDay(d, today),
				isSelected: isSameDay(d, selectedDate)
			});
		}

		// Days from next month to complete the grid (up to 42 cells / 6 rows)
		const remaining = 42 - days.length;
		for (let i = 1; i <= remaining; i++) {
			const d = new Date(viewYear, viewMonth + 1, i);
			days.push({
				day: i,
				date: d,
				isCurrentMonth: false,
				isToday: isSameDay(d, today),
				isSelected: isSameDay(d, selectedDate)
			});
		}

		return days;
	});

	function prevMonth() {
		if (viewMonth === 0) {
			viewMonth = 11;
			viewYear -= 1;
		} else {
			viewMonth -= 1;
		}
	}

	function nextMonth() {
		if (viewMonth === 11) {
			viewMonth = 0;
			viewYear += 1;
		} else {
			viewMonth += 1;
		}
	}

	function selectDay(cell: CalendarDay) {
		selectedDate = new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate());
		viewYear = selectedDate.getFullYear();
		viewMonth = selectedDate.getMonth();
		const iso = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
		lastPropValue = iso;
		value = iso;
		isOpen = false;
	}

	function selectToday() {
		const now = new Date();
		selectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		viewYear = now.getFullYear();
		viewMonth = now.getMonth();
		const iso = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
		lastPropValue = iso;
		value = iso;
		isOpen = false;
	}

	function clearDate() {
		selectedDate = null;
		lastPropValue = '';
		value = '';
		isOpen = false;
	}

	onMount(() => {
		function handleClickOutside(e: MouseEvent) {
			if (pickerEl && !pickerEl.contains(e.target as Node)) {
				isOpen = false;
			}
		}
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape' && isOpen) {
				isOpen = false;
			}
		}

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="adm-datepicker-root" bind:this={pickerEl}>
	<!-- Hidden input for standard Form submission -->
	<input type="hidden" {name} value={isoValue} {required} />

	<!-- Interactive Trigger button -->
	<div
		tabindex="0"
		role="button"
		class="adm-datepicker-trigger"
		class:has-value={Boolean(selectedDate)}
		class:is-open={isOpen}
		onclick={() => (isOpen = !isOpen)}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				isOpen = !isOpen;
			}
		}}
		aria-haspopup="dialog"
		aria-expanded={isOpen}
	>
		<span class="adm-datepicker-icon">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
		</span>

		<span class="adm-datepicker-text">
			{displayFormatted || placeholder}
		</span>

		{#if selectedDate}
			<span
				role="button"
				tabindex="0"
				class="adm-datepicker-clear"
				title="Hapus tanggal"
				aria-label="Hapus tanggal"
				onclick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					clearDate();
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.stopPropagation();
						e.preventDefault();
						clearDate();
					}
				}}
			>
				✕
			</span>
		{:else}
			<span class="adm-datepicker-chevron">▾</span>
		{/if}
	</div>

	<!-- Brand Styled Popover Calendar -->
	{#if isOpen}
		<div
			class="adm-datepicker-popover"
			role="dialog"
			tabindex="-1"
			aria-label="Kalender pemilih tanggal"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<!-- Header: Month/Year navigation -->
			<div class="adm-datepicker-header">
				<button
					type="button"
					class="adm-nav-btn"
					onclick={prevMonth}
					aria-label="Bulan sebelumnya"
				>
					‹
				</button>

				<div class="adm-month-year">
					<span class="adm-month-name">{MONTHS_FULL[viewMonth]}</span>
					<span class="adm-year-name">{viewYear}</span>
				</div>

				<button
					type="button"
					class="adm-nav-btn"
					onclick={nextMonth}
					aria-label="Bulan berikutnya"
				>
					›
				</button>
			</div>

			<!-- Weekday names -->
			<div class="adm-weekdays">
				{#each DAYS_SHORT as dayName}
					<div class="adm-weekday">{dayName}</div>
				{/each}
			</div>

			<!-- Days grid -->
			<div class="adm-days-grid">
				{#each calendarGrid as cell}
					<button
						type="button"
						class="adm-day-cell"
						class:other-month={!cell.isCurrentMonth}
						class:today={cell.isToday}
						class:selected={cell.isSelected}
						onclick={() => selectDay(cell)}
					>
						{cell.day}
					</button>
				{/each}
			</div>

			<!-- Footer Quick Action bar -->
			<div class="adm-datepicker-footer">
				<button type="button" class="adm-quick-btn" onclick={selectToday}>
					Hari Ini
				</button>
				{#if selectedDate}
					<button type="button" class="adm-quick-btn adm-quick-clear" onclick={clearDate}>
						Kosongkan
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.adm-datepicker-root {
		position: relative;
		width: 100%;
	}

	.adm-datepicker-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 0.75rem;
		border-radius: 0.5rem;
		background: rgba(2, 6, 23, 0.7);
		border: 1px solid rgba(148, 163, 184, 0.2);
		color: #94a3b8;
		font-family: inherit;
		font-size: 0.875rem;
		cursor: pointer;
		text-align: left;
		transition: all 150ms ease;
		box-sizing: border-box;
	}

	.adm-datepicker-trigger.has-value {
		color: #f1f5f9;
		font-weight: 500;
	}

	.adm-datepicker-trigger:hover {
		border-color: rgba(56, 189, 248, 0.4);
		background: rgba(2, 6, 23, 0.85);
	}

	.adm-datepicker-trigger.is-open {
		border-color: rgba(56, 189, 248, 0.6);
		box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.15);
	}

	.adm-datepicker-icon {
		display: inline-flex;
		color: #38bdf8;
		flex-shrink: 0;
	}

	.adm-datepicker-text {
		flex: 1;
		min-width: 0;
	}

	.adm-datepicker-chevron {
		font-size: 0.75rem;
		color: #64748b;
	}

	.adm-datepicker-clear {
		background: none;
		border: none;
		color: #94a3b8;
		font-size: 0.8125rem;
		cursor: pointer;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		transition: color 120ms ease;
	}

	.adm-datepicker-clear:hover {
		color: #fda4af;
		background: rgba(251, 113, 133, 0.1);
	}

	/* Popover Calendar Container */
	.adm-datepicker-popover {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		z-index: 50;
		width: 18.5rem;
		padding: 1rem;
		border-radius: 1rem;
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(16px);
		border: 1px solid rgba(148, 163, 184, 0.18);
		box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(56, 189, 248, 0.15);
		animation: popoverFadeIn 160ms cubic-bezier(0.16, 1, 0.3, 1);
		box-sizing: border-box;
	}

	@keyframes popoverFadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.adm-datepicker-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.adm-month-year {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-weight: 700;
		font-size: 0.875rem;
		color: #f8fafc;
	}

	.adm-year-name {
		color: #38bdf8;
	}

	.adm-nav-btn {
		width: 1.875rem;
		height: 1.875rem;
		border-radius: 0.375rem;
		background: rgba(148, 163, 184, 0.08);
		border: 1px solid rgba(148, 163, 184, 0.15);
		color: #cbd5e1;
		font-size: 1.125rem;
		line-height: 1;
		display: grid;
		place-items: center;
		cursor: pointer;
		transition: all 120ms ease;
	}

	.adm-nav-btn:hover {
		background: rgba(56, 189, 248, 0.2);
		color: #fff;
		border-color: rgba(56, 189, 248, 0.4);
	}

	.adm-weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.125rem;
		text-align: center;
		margin-bottom: 0.375rem;
	}

	.adm-weekday {
		font-size: 0.6875rem;
		font-weight: 700;
		color: #64748b;
		text-transform: uppercase;
		padding: 0.25rem 0;
	}

	.adm-days-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
	}

	.adm-day-cell {
		aspect-ratio: 1;
		border: none;
		background: transparent;
		color: #e2e8f0;
		font-size: 0.8125rem;
		font-weight: 500;
		border-radius: 0.5rem;
		display: grid;
		place-items: center;
		cursor: pointer;
		transition: all 120ms ease;
	}

	.adm-day-cell:hover {
		background: rgba(56, 189, 248, 0.15);
		color: #38bdf8;
	}

	.adm-day-cell.other-month {
		color: #475569;
		opacity: 0.45;
	}

	.adm-day-cell.today {
		border: 1px solid rgba(56, 189, 248, 0.5);
		color: #38bdf8;
		font-weight: 700;
	}

	.adm-day-cell.selected {
		background: linear-gradient(135deg, #0284c7, #6366f1);
		color: #ffffff;
		font-weight: 700;
		box-shadow: 0 4px 12px -2px rgba(56, 189, 248, 0.5);
	}

	.adm-datepicker-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.75rem;
		padding-top: 0.625rem;
		border-top: 1px solid rgba(148, 163, 184, 0.12);
	}

	.adm-quick-btn {
		background: none;
		border: none;
		color: #38bdf8;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		transition: all 120ms ease;
	}

	.adm-quick-btn:hover {
		background: rgba(56, 189, 248, 0.12);
	}

	.adm-quick-clear {
		color: #94a3b8;
	}

	.adm-quick-clear:hover {
		color: #fda4af;
		background: rgba(251, 113, 133, 0.1);
	}
</style>
