<script lang="ts">
	import type { PageData } from './$types';
	import EndpointBlock from '$lib/components/docs/EndpointBlock.svelte';
	import AuthPanel from '$lib/components/docs/AuthPanel.svelte';

	let { data }: { data: PageData } = $props();
	const resource = $derived(data.resource);
</script>

<svelte:head>
	<title>{resource.label} · API Docs</title>
</svelte:head>

<section class="docs-hero">
	<span class="docs-hero-eyebrow">Resource · {resource.slug}</span>
	<h1>{resource.label}</h1>
	<p>{resource.description}</p>
	<div class="docs-button-row">
		<a class="docs-button" href="/docs">← Beranda docs</a>
		<a class="docs-button" href="/api/docs" target="_blank" rel="noopener">↗ Spec JSON</a>
	</div>
</section>

<AuthPanel />

{#each resource.endpoints as e (e.id)}
	<EndpointBlock endpoint={e} />
{/each}
