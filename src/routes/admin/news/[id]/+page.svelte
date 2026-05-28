<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import RichEditor from '$lib/components/admin/RichEditor.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const item = $derived(data.item);

	type FormState = {
		values?: Record<string, unknown>;
		message?: string;
		fieldErrors?: Record<string, string[] | undefined>;
	};
	const f = $derived((form ?? null) as FormState | null);
</script>

<svelte:head>
	<title>Edit — {item.title}</title>
</svelte:head>

<RichEditor
	initial={item as unknown as Record<string, unknown>}
	form={f}
	submitLabel="Save changes"
	cancelHref="/admin/news"
	previewSlug={item.slug}
/>
