<script lang="ts">
	interface Props {
		name: string;
		value?: string;
		required?: boolean;
		placeholder?: string;
	}

	let {
		name,
		value = '',
		required = false,
		placeholder
	}: Props = $props();

	function parseInitial(v: string | undefined): { h: string; m: string } {
		if (!v) return { h: '', m: '' };
		const match = /^(\d{1,2})[:.](\d{2})/.exec(v.trim());
		if (!match) return { h: '', m: '' };
		const hNum = parseInt(match[1], 10);
		const mNum = parseInt(match[2], 10);
		if (isNaN(hNum) || isNaN(mNum) || hNum < 0 || hNum > 23 || mNum < 0 || mNum > 59) {
			return { h: '', m: '' };
		}
		return {
			h: String(hNum).padStart(2, '0'),
			m: String(mNum).padStart(2, '0')
		};
	}

	let hour = $state('');
	let minute = $state('');
	let hourInput = $state<HTMLInputElement | null>(null);
	let minuteInput = $state<HTMLInputElement | null>(null);
	let lastPropValue = $state<string | undefined>(undefined);

	// Only re-seed from the prop when it actually changed, so a parent
	// re-render never wipes an in-progress keystroke.
	$effect(() => {
		if (value === lastPropValue) return;
		lastPropValue = value;
		const parsed = parseInitial(value);
		hour = parsed.h;
		minute = parsed.m;
	});

	const formattedOutput = $derived.by(() => {
		if (hour === '' && minute === '') return '';
		const h = hour === '' ? '00' : hour.padStart(2, '0');
		const m = minute === '' ? '00' : minute.padStart(2, '0');
		return `${h}:${m} WITA`;
	});

	function handleHourInput(e: Event) {
		const target = e.target as HTMLInputElement;
		let val = target.value.replace(/\D/g, '');

		if (val.length > 2) val = val.slice(0, 2);

		if (val.length > 0) {
			const n = parseInt(val, 10);
			if (n > 23) {
				val = '23';
			}
		}

		hour = val;

		// If 2 digits entered, or first digit is >= 3 (e.g. 3-9), auto-advance to minute
		if (val.length === 2 || (val.length === 1 && parseInt(val, 10) >= 3)) {
			if (val.length === 1) hour = val.padStart(2, '0');
			minuteInput?.focus();
			minuteInput?.select();
		}
	}

	function handleMinuteInput(e: Event) {
		const target = e.target as HTMLInputElement;
		let val = target.value.replace(/\D/g, '');

		if (val.length > 2) val = val.slice(0, 2);

		if (val.length > 0) {
			const n = parseInt(val, 10);
			if (n > 59) {
				val = '59';
			}
		}

		minute = val;

		// If 2 digits entered or first digit is >= 6, format
		if (val.length === 1 && parseInt(val, 10) >= 6) {
			minute = val.padStart(2, '0');
		}
	}

	function handleHourBlur() {
		if (hour !== '') {
			const n = Math.min(23, Math.max(0, parseInt(hour, 10) || 0));
			hour = String(n).padStart(2, '0');
		}
	}

	function handleMinuteBlur() {
		if (minute !== '') {
			const n = Math.min(59, Math.max(0, parseInt(minute, 10) || 0));
			minute = String(n).padStart(2, '0');
		}
	}

	function handleHourKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			const current = parseInt(hour, 10) || 0;
			hour = String((current + 1) % 24).padStart(2, '0');
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			const current = parseInt(hour, 10) || 0;
			hour = String((current - 1 + 24) % 24).padStart(2, '0');
		} else if (e.key === 'ArrowRight' && hourInput?.selectionStart === hour.length) {
			minuteInput?.focus();
		}
	}

	function handleMinuteKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			const current = parseInt(minute, 10) || 0;
			minute = String((current + 1) % 60).padStart(2, '0');
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			const current = parseInt(minute, 10) || 0;
			minute = String((current - 1 + 60) % 60).padStart(2, '0');
		} else if (e.key === 'ArrowLeft' && minuteInput?.selectionStart === 0) {
			hourInput?.focus();
		} else if (e.key === 'Backspace' && minute === '') {
			hourInput?.focus();
		}
	}

	function handlePaste(e: ClipboardEvent) {
		const text = e.clipboardData?.getData('text') ?? '';
		const match = /^(\d{1,2})[:.](\d{2})/.exec(text.trim());
		if (match) {
			e.preventDefault();
			const h = Math.min(23, parseInt(match[1], 10));
			const m = Math.min(59, parseInt(match[2], 10));
			hour = String(h).padStart(2, '0');
			minute = String(m).padStart(2, '0');
		}
	}
</script>

<div class="time-24h-container">
	<div class="time-24h-box" onpaste={handlePaste}>

		<div class="time-digits">
			<input
				bind:this={hourInput}
				type="text"
				inputmode="numeric"
				pattern="[0-9]*"
				placeholder="08"
				value={hour}
				oninput={handleHourInput}
				onblur={handleHourBlur}
				onkeydown={handleHourKeyDown}
				class="digit-input"
				aria-label="Jam (Format 24 Jam: 00-23)"
				maxlength="2"
			/>
			<span class="colon">:</span>
			<input
				bind:this={minuteInput}
				type="text"
				inputmode="numeric"
				pattern="[0-9]*"
				placeholder="00"
				value={minute}
				oninput={handleMinuteInput}
				onblur={handleMinuteBlur}
				onkeydown={handleMinuteKeyDown}
				class="digit-input"
				aria-label="Menit (00-59)"
				maxlength="2"
			/>
		</div>

	</div>

	<!-- Hidden input for standard Form Actions -->
	<input type="hidden" {name} value={formattedOutput} {required} />
</div>

<style>
	.time-24h-container {
		width: 100%;
	}

	.time-24h-box {
		display: flex;
		align-items: center;
		padding: 0.625rem 0.75rem;
		border-radius: 0.5rem;
		background: rgba(2, 6, 23, 0.7);
		border: 1px solid rgba(148, 163, 184, 0.2);
		transition: all 150ms ease;
		box-sizing: border-box;
	}

	.time-24h-box:focus-within {
		border-color: rgba(56, 189, 248, 0.6);
		box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
	}

	.time-digits {
		display: flex;
		align-items: center;
		gap: 0.15rem;
	}

	.digit-input {
		width: 1.75rem;
		padding: 0;
		background: transparent !important;
		border: none !important;
		color: #f1f5f9;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		text-align: center;
		outline: none !important;
		box-shadow: none !important;
		line-height: inherit;
	}

	.digit-input::placeholder {
		color: #475569;
		font-weight: 400;
	}

	.colon {
		color: #94a3b8;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 600;
		user-select: none;
		line-height: inherit;
	}
</style>
