<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/state';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	const resources = $derived(data.registry.resources);
	const currentPath = $derived(page.url.pathname);

	function isActive(href: string) {
		return currentPath === href || currentPath === href + '/';
	}

	function methodClass(m: string) {
		switch (m) {
			case 'GET':
				return 'text-emerald-400';
			case 'POST':
				return 'text-sky-400';
			case 'PATCH':
				return 'text-amber-400';
			case 'PUT':
				return 'text-amber-400';
			case 'DELETE':
				return 'text-rose-400';
			default:
				return 'text-slate-300';
		}
	}
</script>

<svelte:head>
	<title>API Docs — SMP 1 Anggana</title>
	<meta name="description" content="Dokumentasi REST API SMP 1 Anggana — programs, news, events." />
</svelte:head>

<div class="docs-shell">
	<!-- Sidebar -->
	<aside class="docs-sidebar">
		<a href="/docs" class="docs-brand">
			<span class="docs-brand-mark">SMP</span>
			<span class="docs-brand-text">1A <span class="docs-brand-accent">Docs</span></span>
		</a>

		<nav class="docs-nav">
			<div class="docs-nav-group">
				<div class="docs-nav-label">Getting Started</div>
				<a href="/docs" class="docs-nav-link" class:active={isActive('/docs')}>Introduction</a>
				<a
					href="/docs#authentication"
					class="docs-nav-link"
					class:active={currentPath === '/docs' && page.url.hash === '#authentication'}
				>
					Authentication
				</a>
				<a href="/api/docs" class="docs-nav-link" target="_blank" rel="noopener">
					Machine-readable spec ↗
				</a>
			</div>

			{#each resources as r (r.slug)}
				<div class="docs-nav-group">
					<div class="docs-nav-label">{r.label}</div>
					{#each r.endpoints as e (e.id)}
						<a
							href={`/docs/${r.slug}#${e.id}`}
							class="docs-nav-endpoint"
							class:active={currentPath === `/docs/${r.slug}` && page.url.hash === `#${e.id}`}
						>
							<span class={`docs-method ${methodClass(e.method)}`}>{e.method}</span>
							<span class="docs-endpoint-label">{e.summary}</span>
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>

	<!-- Main content -->
	<main class="docs-main">
		{@render children()}
	</main>
</div>

<style>
	/* ---------- Theme ---------- */
	:global(html) {
		background: #05070d;
	}

	.docs-shell {
		display: grid;
		grid-template-columns: 280px 1fr;
		min-height: 100vh;
		color: #e5e7eb;
		background:
			radial-gradient(1200px 600px at 80% -10%, rgba(56, 189, 248, 0.08), transparent 60%),
			radial-gradient(900px 600px at 0% 100%, rgba(139, 92, 246, 0.07), transparent 60%),
			#05070d;
		font-family:
			'Inter',
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	@media (max-width: 900px) {
		.docs-shell {
			grid-template-columns: 1fr;
		}
	}

	/* ---------- Sidebar ---------- */
	.docs-sidebar {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
		padding: 1.75rem 1.25rem;
		border-right: 1px solid rgba(148, 163, 184, 0.12);
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.2));
		backdrop-filter: blur(8px);
	}

	@media (max-width: 900px) {
		.docs-sidebar {
			position: relative;
			height: auto;
			border-right: none;
			border-bottom: 1px solid rgba(148, 163, 184, 0.12);
		}
	}

	.docs-brand {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		text-decoration: none;
		color: #f8fafc;
		margin-bottom: 1.5rem;
	}

	.docs-brand-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: linear-gradient(135deg, #38bdf8, #6366f1);
		color: #fff;
		font-weight: 800;
		font-size: 0.7rem;
		letter-spacing: 0.02em;
	}

	.docs-brand-text {
		font-weight: 800;
		font-size: 1.125rem;
		letter-spacing: 0.01em;
	}

	.docs-brand-accent {
		color: #38bdf8;
	}

	.docs-nav {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.docs-nav-group {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.docs-nav-label {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #64748b;
		padding: 0 0.625rem;
		margin-bottom: 0.375rem;
	}

	.docs-nav-link,
	.docs-nav-endpoint {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.625rem;
		border-radius: 0.5rem;
		text-decoration: none;
		color: #cbd5e1;
		font-size: 0.875rem;
		font-weight: 500;
		transition: background 150ms ease, color 150ms ease;
	}

	.docs-nav-link:hover,
	.docs-nav-endpoint:hover {
		background: rgba(56, 189, 248, 0.06);
		color: #f1f5f9;
	}

	.docs-nav-link.active,
	.docs-nav-endpoint.active {
		background: rgba(56, 189, 248, 0.1);
		color: #f1f5f9;
		box-shadow: inset 2px 0 0 #38bdf8;
	}

	.docs-method {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.6875rem;
		font-weight: 800;
		min-width: 3rem;
	}

	.docs-endpoint-label {
		font-weight: 500;
	}

	/* ---------- Main ---------- */
	.docs-main {
		padding: 3rem clamp(1.25rem, 3vw, 3rem);
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
	}

	/* ---------- Shared content styles (used by child pages via :global) ---------- */
	:global(.docs-hero) {
		position: relative;
		padding: 2.25rem 2rem;
		border-radius: 1.25rem;
		background:
			radial-gradient(800px 240px at 100% 0%, rgba(99, 102, 241, 0.18), transparent 60%),
			linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.35));
		border: 1px solid rgba(148, 163, 184, 0.15);
		overflow: hidden;
		margin-bottom: 2rem;
	}

	:global(.docs-hero-eyebrow) {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #38bdf8;
	}

	:global(.docs-hero h1) {
		margin: 0.625rem 0 0.75rem;
		font-size: clamp(1.875rem, 4vw, 2.5rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #f8fafc;
	}

	:global(.docs-hero p) {
		max-width: 60ch;
		color: #cbd5e1;
		line-height: 1.65;
	}

	:global(.docs-card) {
		padding: 1.75rem;
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.35));
		border: 1px solid rgba(148, 163, 184, 0.12);
		margin-bottom: 1.5rem;
	}

	:global(.docs-card h2) {
		margin: 0 0 0.5rem;
		color: #f8fafc;
		font-size: 1.25rem;
		font-weight: 700;
	}

	:global(.docs-card h3) {
		color: #f1f5f9;
		font-size: 0.95rem;
		font-weight: 700;
		margin: 1.25rem 0 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	:global(.docs-card p) {
		color: #94a3b8;
		line-height: 1.65;
		margin: 0.25rem 0;
	}

	:global(.docs-button-row) {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		margin-top: 1.25rem;
	}

	:global(.docs-button) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		border-radius: 0.625rem;
		background: rgba(15, 23, 42, 0.6);
		border: 1px solid rgba(148, 163, 184, 0.18);
		color: #f1f5f9;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 600;
		transition: all 150ms ease;
	}

	:global(.docs-button:hover) {
		background: rgba(56, 189, 248, 0.08);
		border-color: rgba(56, 189, 248, 0.4);
		transform: translateY(-1px);
	}

	:global(.docs-endpoint) {
		padding: 1.5rem;
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.3));
		border: 1px solid rgba(148, 163, 184, 0.12);
		margin-bottom: 1.25rem;
		scroll-margin-top: 1.25rem;
	}

	:global(.docs-endpoint-head) {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		flex-wrap: wrap;
		margin-bottom: 0.75rem;
	}

	:global(.docs-pill) {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.625rem;
		border-radius: 0.375rem;
		background: rgba(15, 23, 42, 0.7);
		border: 1px solid rgba(148, 163, 184, 0.18);
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		font-weight: 700;
	}

	:global(.docs-pill-get) {
		color: #34d399;
		border-color: rgba(52, 211, 153, 0.3);
	}

	:global(.docs-pill-post) {
		color: #38bdf8;
		border-color: rgba(56, 189, 248, 0.3);
	}

	:global(.docs-pill-patch),
	:global(.docs-pill-put) {
		color: #fbbf24;
		border-color: rgba(251, 191, 36, 0.3);
	}

	:global(.docs-pill-delete) {
		color: #fb7185;
		border-color: rgba(251, 113, 133, 0.3);
	}

	:global(.docs-pill-public) {
		color: #94a3b8;
	}

	:global(.docs-pill-admin) {
		color: #c084fc;
		border-color: rgba(192, 132, 252, 0.3);
	}

	:global(.docs-path) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.95rem;
		color: #f1f5f9;
		font-weight: 600;
	}

	:global(.docs-table) {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
		margin-top: 0.5rem;
	}

	:global(.docs-table th) {
		text-align: left;
		font-weight: 700;
		color: #94a3b8;
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid rgba(148, 163, 184, 0.15);
	}

	:global(.docs-table td) {
		padding: 0.625rem 0.75rem;
		border-bottom: 1px solid rgba(148, 163, 184, 0.08);
		color: #cbd5e1;
		vertical-align: top;
	}

	:global(.docs-table td code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #e2e8f0;
		background: rgba(148, 163, 184, 0.08);
		padding: 0.0625rem 0.375rem;
		border-radius: 0.25rem;
	}

	:global(.docs-required) {
		color: #fb7185;
		font-size: 0.7rem;
		margin-left: 0.25rem;
	}

	:global(.docs-codeblock) {
		display: block;
		background: rgba(2, 6, 23, 0.85);
		border: 1px solid rgba(148, 163, 184, 0.15);
		border-radius: 0.75rem;
		padding: 1rem 1.125rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #cbd5e1;
		line-height: 1.65;
		overflow-x: auto;
		margin: 0.5rem 0;
	}

	:global(.docs-callout) {
		display: flex;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		border-radius: 0.625rem;
		background: rgba(56, 189, 248, 0.06);
		border: 1px solid rgba(56, 189, 248, 0.2);
		color: #e0f2fe;
		font-size: 0.875rem;
		line-height: 1.6;
		margin: 1rem 0;
	}

	:global(.docs-callout strong) {
		color: #38bdf8;
	}
</style>
