<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const tiles = $derived([
		{
			label: 'Programs',
			count: data.stats.programs,
			href: '/admin/programs',
			color: 'cyan'
		},
		{ label: 'News', count: data.stats.news, href: '/admin/news', color: 'violet' },
		{ label: 'Events', count: data.stats.events, href: '/admin/events', color: 'amber' }
	]);
</script>

<div class="adm-page-head">
	<div>
		<h1 class="adm-title">Overview</h1>
		<p class="adm-sub">Ringkasan konten yang dipublikasikan ke website.</p>
	</div>
	<a class="adm-btn" href="/docs" target="_blank" rel="noopener">↗ API Docs</a>
</div>

<div class="grid">
	{#each tiles as t (t.label)}
		<a href={t.href} class={`tile ${t.color}`}>
			<div class="label">{t.label}</div>
			<div class="count">{t.count}</div>
			<div class="cta">Kelola →</div>
		</a>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	.tile {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		padding: 1.5rem;
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.35));
		border: 1px solid rgba(148, 163, 184, 0.12);
		text-decoration: none;
		color: inherit;
		transition: all 150ms ease;
		position: relative;
		overflow: hidden;
	}

	.tile:hover {
		transform: translateY(-2px);
		border-color: rgba(56, 189, 248, 0.4);
	}

	.tile::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(400px 200px at 100% 0%, var(--glow), transparent 60%);
		opacity: 0.5;
		pointer-events: none;
	}

	.tile.cyan {
		--glow: rgba(56, 189, 248, 0.18);
	}
	.tile.violet {
		--glow: rgba(139, 92, 246, 0.18);
	}
	.tile.amber {
		--glow: rgba(251, 191, 36, 0.18);
	}

	.label {
		color: #94a3b8;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.count {
		color: #f8fafc;
		font-size: 2.5rem;
		font-weight: 800;
		line-height: 1;
		font-feature-settings: 'tnum';
	}

	.cta {
		color: #38bdf8;
		font-size: 0.8125rem;
		font-weight: 600;
		margin-top: 0.5rem;
	}
</style>
