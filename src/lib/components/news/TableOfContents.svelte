<script lang="ts">
	import { onMount } from 'svelte';
	import type { TocItem } from '$lib/server/markdown';

	type Props = { items: TocItem[]; rootSelector?: string };
	let { items, rootSelector = '.post-content .md-content' }: Props = $props();

	let activeId = $state<string | null>(null);

	$effect.pre(() => {
		// Set initial activeId once items are known.
		if (activeId === null && items.length > 0) activeId = items[0].id;
	});

	onMount(() => {
		const root = document.querySelector(rootSelector);
		if (!root) return;
		const headings = Array.from(root.querySelectorAll<HTMLElement>('h2, h3, h4')).filter(
			(h) => h.id
		);
		if (headings.length === 0) return;

		// Pick the heading whose top is closest above the 25% viewport line.
		const update = () => {
			const probe = window.innerHeight * 0.25;
			let current: HTMLElement | null = null;
			for (const h of headings) {
				const rect = h.getBoundingClientRect();
				if (rect.top <= probe) {
					current = h;
				} else {
					break;
				}
			}
			activeId = current?.id ?? headings[0]?.id ?? null;
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});

	function smoothJump(e: Event, id: string) {
		const target = document.getElementById(id);
		if (!target) return;
		e.preventDefault();
		const top = target.getBoundingClientRect().top + window.scrollY - 92;
		window.scrollTo({ top, behavior: 'smooth' });
		// Update URL hash without jumping again.
		history.replaceState(history.state, '', `#${id}`);
		activeId = id;
	}
</script>

{#if items.length > 0}
	<nav class="toc" aria-label="Daftar isi">
		<div class="toc-label">Daftar isi</div>
		<ol class="toc-list">
			{#each items as item (item.id)}
				<li class="lvl-{item.level}" class:active={activeId === item.id}>
					<a href={`#${item.id}`} onclick={(e) => smoothJump(e, item.id)}>
						{item.text}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style>
	.toc {
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	.toc-label {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #64748b;
		margin-bottom: 0.875rem;
	}

	.toc-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-left: 2px solid #e5e7eb;
	}

	.toc-list li {
		position: relative;
		margin: 0;
	}

	.toc-list li.lvl-3 a { padding-left: 1.75rem; }
	.toc-list li.lvl-4 a { padding-left: 2.5rem; }

	.toc-list a {
		display: block;
		padding: 0.4375rem 0.875rem;
		color: #64748b;
		text-decoration: none;
		font-weight: 500;
		transition: color 150ms ease, background-color 150ms ease;
		border-left: 2px solid transparent;
		margin-left: -2px;
	}

	.toc-list a:hover {
		color: #0b2e4f;
	}

	.toc-list li.active a {
		color: #0b2e4f;
		font-weight: 700;
		border-left-color: #e11d48;
	}
</style>
