<script lang="ts">
	import type { AdminField } from '$lib/server/admin/resources';
	import { enhance } from '$app/forms';
	import DatePicker from './DatePicker.svelte';
	import ImageUpload from './ImageUpload.svelte';
	import TimePicker from './TimePicker.svelte';

	type Props = {
		fields: AdminField[];
		values?: Record<string, unknown> | null;
		fieldErrors?: Record<string, string[] | undefined> | null;
		message?: string | null;
		submitLabel?: string;
		cancelHref: string;
	};

	let {
		fields,
		values = null,
		fieldErrors = null,
		message = null,
		submitLabel = 'Save',
		cancelHref
	}: Props = $props();

	let submitting = $state(false);

	function value(name: string): string {
		const v = values?.[name];
		if (v === null || v === undefined) return '';
		return String(v);
	}
</script>

{#if message}
	<div class="adm-flash adm-flash-error">{message}</div>
{/if}

<form
	method="POST"
	class="adm-form"
	use:enhance={() => {
		submitting = true;
		return ({ update }) =>
			update().then(() => {
				submitting = false;
			});
	}}
>
	{#each fields as f (f.name)}
		{@const fid = `field-${f.name}`}
		{@const hintId = `field-${f.name}-hint`}
		{@const errorId = `field-${f.name}-error`}
		{@const describedBy = [f.hint ? hintId : null, fieldErrors?.[f.name]?.[0] ? errorId : null].filter(Boolean).join(' ') || undefined}
		<div class="adm-field">
			<label class="field-label" for={fid}>
				{f.label}
				{#if f.required}<span style="color:#fb7185" aria-hidden="true">*</span>{/if}
			</label>

			{#if f.kind === 'textarea'}
				<textarea id={fid} name={f.name} rows="3" required={f.required ?? false} aria-describedby={describedBy} aria-invalid={fieldErrors?.[f.name] ? 'true' : undefined}>{value(f.name)}</textarea>
			{:else if f.kind === 'longtext'}
				<textarea id={fid} name={f.name} rows="8" aria-describedby={describedBy} aria-invalid={fieldErrors?.[f.name] ? 'true' : undefined}>{value(f.name)}</textarea>
			{:else if f.kind === 'image' || f.name === 'image'}
				<ImageUpload
					name={f.name}
					value={value(f.name)}
					required={f.required ?? false}
					hint={f.hint}
				/>
			{:else if f.kind === 'url'}
				<input
					id={fid}
					type="url"
					name={f.name}
					inputmode="url"
					value={value(f.name)}
					required={f.required ?? false}
					aria-describedby={describedBy}
					aria-invalid={fieldErrors?.[f.name] ? 'true' : undefined}
				/>
			{:else if f.kind === 'date'}
				<DatePicker
					name={f.name}
					value={value(f.name)}
					required={f.required ?? false}
					placeholder={`Pilih ${f.label.toLowerCase()}...`}
				/>
			{:else if f.kind === 'time' || f.name === 'time'}
				<TimePicker
					name={f.name}
					value={value(f.name)}
					required={f.required ?? false}
					placeholder={`Pilih ${f.label.toLowerCase()}...`}
				/>
			{:else}
				<input id={fid} type="text" name={f.name} value={value(f.name)} required={f.required ?? false} aria-describedby={describedBy} aria-invalid={fieldErrors?.[f.name] ? 'true' : undefined} />
			{/if}

			{#if f.hint}
				<span class="field-hint" id={hintId}>{f.hint}</span>
			{/if}
			{#if fieldErrors?.[f.name]?.[0]}
				<span class="field-error" id={errorId} role="alert">{fieldErrors[f.name]![0]}</span>
			{/if}
		</div>
	{/each}

	<div class="form-actions">
		<button type="submit" class="adm-btn adm-btn-primary" disabled={submitting}>
			{submitting ? 'Saving…' : submitLabel}
		</button>
		<a href={cancelHref} class="adm-btn">Cancel</a>
	</div>
</form>
