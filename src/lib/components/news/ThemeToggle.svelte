<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from './theme-store.svelte';

	onMount(() => theme.hydrate());

	function label() {
		switch (theme.pref) {
			case 'light':
				return 'Mode terang';
			case 'dark':
				return 'Mode gelap';
			default:
				return 'Otomatis';
		}
	}
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={() => theme.cycle()}
	aria-label={`Tema: ${label()}. Klik untuk mengganti.`}
	title={`Tema: ${label()}`}
>
	{#if theme.pref === 'dark'}
		<!-- moon -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{:else if theme.pref === 'light'}
		<!-- sun -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	{:else}
		<!-- auto: half sun / half moon -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="9" />
			<path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		width: 3rem;
		height: 3rem;
		border-radius: 9999px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--toggle-bg, #ffffff);
		color: var(--toggle-fg, #0b2e4f);
		border: 1px solid var(--toggle-border, #e5e7eb);
		cursor: pointer;
		box-shadow: 0 12px 30px -10px rgba(11, 46, 79, 0.25);
		transition: transform 150ms ease, background-color 150ms ease, color 150ms ease;
		z-index: 70;
	}

	.theme-toggle:hover {
		transform: translateY(-2px);
	}

	:global([data-theme='dark']) .theme-toggle {
		--toggle-bg: #0f172a;
		--toggle-fg: #f8fafc;
		--toggle-border: #1e293b;
		box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6);
	}
</style>
