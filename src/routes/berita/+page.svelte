<script lang="ts">
	import type { PageData } from './$types';
	import FloatingNavbar from '$lib/components/FloatingNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { goto } from '$app/navigation';
	import { page as pageStore } from '$app/state';
	import { fade } from 'svelte/transition';

	let { data }: { data: PageData } = $props();

	function urlWith(patch: Record<string, string | number | null>): string {
		const u = new URL(pageStore.url);
		for (const [k, v] of Object.entries(patch)) {
			if (v === null || v === '') u.searchParams.delete(k);
			else u.searchParams.set(k, String(v));
		}
		return u.pathname + (u.search ? u.search : '');
	}

	const showFeatured = $derived(
		data.pagination.page === 1 && !data.filters.q && !data.filters.category
	);
	const featured = $derived(showFeatured ? data.items[0] ?? null : null);
	const rest = $derived(showFeatured ? data.items.slice(1) : data.items);

	let searchValue = $state('');
	let searchTimer = $state<ReturnType<typeof setTimeout> | null>(null);

	$effect(() => {
		searchValue = data.filters.q;
	});

	function handleSearchInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchValue = target.value;

		if (searchTimer) {
			clearTimeout(searchTimer);
		}

		searchTimer = setTimeout(() => {
			goto(urlWith({ q: searchValue.trim() || null, page: null }), {
				replaceState: true,
				keepFocus: true,
			});
		}, 300);
	}

	function handleSearchSubmit(event: Event) {
		event.preventDefault();
		if (searchTimer) {
			clearTimeout(searchTimer);
		}
		goto(urlWith({ q: searchValue.trim() || null, page: null }), {
			replaceState: true,
			keepFocus: true,
		});
	}
</script>

<svelte:head>
	<title>Berita | SMPN 1 Anggana</title>
	<meta
		name="description"
		content="Kabar terbaru, prestasi, dan kegiatan SMPN 1 Anggana, diperbarui rutin oleh tim sekolah."
	/>
</svelte:head>

<FloatingNavbar />

<main class="overflow-x-clip">
	<!-- Hero / page header -->
	<section class="relative px-4 md:px-8 pt-32 md:pt-40 pb-12 md:pb-16">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 -z-10"
		>
			<div class="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-primary/5 blur-3xl"></div>
			<div class="absolute top-20 -right-32 w-[360px] h-[360px] rounded-full bg-accent/5 blur-3xl"></div>
		</div>

		<div class="max-w-7xl mx-auto" use:reveal={{ from: 'up' }}>
			<nav aria-label="Breadcrumb" class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
				<a href="/" class="hover:text-primary">Beranda</a>
				<span class="mx-2 text-slate-300">›</span>
				<span class="text-primary">Berita</span>
			</nav>
			<div class="flex items-end justify-between gap-6 flex-wrap">
				<div>
					<div class="text-xs font-bold uppercase tracking-widest text-accent">
						Update Terbaru
					</div>
					<h1
						class="mt-3 font-display font-extrabold tracking-tight
						       text-4xl md:text-6xl text-primary leading-[1.05]"
					>
						Berita Sekolah
					</h1>
					<p class="mt-5 text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
						Prestasi, kegiatan, dan pengumuman penting dari SMPN 1 Anggana.
						{data.totalCount} berita telah dipublikasikan.
					</p>
				</div>

				<!-- Search -->
				<form method="get" action="/berita" class="search-form" onsubmit={handleSearchSubmit}>
					{#if data.filters.category}
						<input type="hidden" name="kategori" value={data.filters.category} />
					{/if}
					<input
						type="text"
						name="q"
						aria-label="Cari berita"
						bind:value={searchValue}
						placeholder="Cari berita…"
						class="search-input"
						autocomplete="off"
						oninput={handleSearchInput}
					/>
					{#if searchValue}
						<a
							href={urlWith({ q: null, page: null })}
							class="search-clear"
							title="Hapus pencarian"
							aria-label="Hapus pencarian"
						>
							<span aria-hidden="true">✕</span>
						</a>
					{/if}
					<button type="submit" class="search-btn" aria-label="Cari">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="11" cy="11" r="7" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</button>
				</form>
			</div>
		</div>
	</section>

	<!-- Category chips -->
	{#if data.categories.length > 0}
		<section class="px-4 md:px-8 pb-6">
			<div class="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
				<a
					href={urlWith({ kategori: null, page: null, q: null })}
					class="chip"
					class:active={!data.filters.category}
				>
					Semua
				</a>
				{#each data.categories as c (c)}
					<a
						href={urlWith({ kategori: c, page: null, q: null })}
						class="chip"
						class:active={data.filters.category === c}
					>
						{c}
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#key `${data.filters.q}|${data.filters.category}|${data.pagination.page}`}
		<!-- Empty state -->
		{#if data.items.length === 0}
			<section class="px-4 md:px-8 pb-20" transition:fade={{ duration: 200 }}>
				<div class="max-w-3xl mx-auto text-center py-16 px-6 rounded-3xl bg-surface-2 border border-slate-200">
					<div class="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/5 grid place-items-center text-primary" aria-hidden="true">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9" />
							<path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z" />
						</svg>
					</div>
					<h2 class="font-display font-bold text-xl text-primary">Belum ada berita yang cocok</h2>
					<p class="mt-2 text-slate-600">
						{#if data.filters.q || data.filters.category}
							Coba hapus filter atau ubah kata kunci pencarian.
						{:else}
							Tim sekolah akan segera memperbarui halaman ini.
						{/if}
					</p>
					{#if data.filters.q || data.filters.category}
						<a href="/berita" class="mt-6 inline-block adm-btn-link">← Reset filter</a>
					{/if}
				</div>
			</section>
		{:else}
			<!-- Featured (first item, large) -->
			{#if featured && data.pagination.page === 1 && !data.filters.q && !data.filters.category}
				<section class="px-4 md:px-8 pb-12" transition:fade={{ duration: 200 }}>
					<div class="max-w-7xl mx-auto">
						<a
							href={`/berita/${featured.slug}`}
							class="featured group rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4"
							use:reveal={{ from: 'up' }}
						>
							<div class="featured-img">
								<img src={featured.image} alt={featured.title} loading="eager" fetchpriority="high" />
								<span class="featured-cat">{featured.category}</span>
							</div>
							<div class="featured-meta">
								<div class="text-xs font-semibold uppercase tracking-widest text-accent">
									Sorotan · {featured.date}
								</div>
								<h2
									class="mt-3 font-display font-extrabold text-3xl md:text-4xl text-primary
									       leading-[1.15] transition-colors duration-300 group-hover:text-accent"
								>
									{featured.title}
								</h2>
								<p class="mt-4 text-slate-600 text-base md:text-lg leading-relaxed line-clamp-3">
									{featured.excerpt}
								</p>
								<span class="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
									Baca selengkapnya
									<span aria-hidden="true">→</span>
								</span>
							</div>
						</a>
					</div>
				</section>
			{/if}

			<!-- Grid -->
			<section class="px-4 md:px-8 pb-20" transition:fade={{ duration: 200 }}>
				<div class="max-w-7xl mx-auto">
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
						{#each rest as item, i (item.slug)}
							<div use:reveal={{ from: 'up', delay: 80 + i * 60 }} class="card-wrap">
								<NewsCard {...item} href={`/berita/${item.slug}`} />
							</div>
						{/each}
					</div>

					<!-- Pagination -->
					{#if data.pagination.pages > 1}
						<div class="pager">
							<a
								class="page-link"
								href={urlWith({ page: Math.max(1, data.pagination.page - 1) })}
								aria-disabled={data.pagination.page === 1}
								style:pointer-events={data.pagination.page === 1 ? 'none' : 'auto'}
								style:opacity={data.pagination.page === 1 ? 0.4 : 1}
							>
								← Sebelumnya
							</a>
							<span class="page-info">
								Halaman <strong class="text-primary">{data.pagination.page}</strong> dari {data.pagination.pages}
							</span>
							<a
								class="page-link"
								href={urlWith({ page: Math.min(data.pagination.pages, data.pagination.page + 1) })}
								aria-disabled={data.pagination.page === data.pagination.pages}
								style:pointer-events={data.pagination.page === data.pagination.pages ? 'none' : 'auto'}
								style:opacity={data.pagination.page === data.pagination.pages ? 0.4 : 1}
							>
								Selanjutnya →
							</a>
						</div>
					{/if}
				</div>
			</section>
		{/if}
	{/key}
</main>

<Footer />

<style>
	.search-form {
		display: flex;
		gap: 0.375rem;
		align-items: center;
		position: relative;
	}

	.search-input {
		min-width: 14rem;
		min-height: 2.75rem;
		padding: 0.625rem 0.875rem;
		border-radius: 9999px;
		border: 1px solid #e5e7eb;
		background: #ffffff;
		color: #0f172a;
		font-size: 0.875rem;
		outline: none;
		transition: border-color 150ms ease, box-shadow 150ms ease;
	}

	.search-input:focus {
		border-color: #0b2e4f;
		box-shadow: 0 0 0 3px rgba(11, 46, 79, 0.08);
	}

	.search-clear {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.75rem;
		min-height: 2.75rem;
		border-radius: 9999px;
		border: 1px solid #e5e7eb;
		background: #ffffff;
		color: #475569;
		text-decoration: none;
		font-size: 0.875rem;
		line-height: 1;
		transition: all 150ms ease;
	}

	.search-clear:hover {
		background: #0b2e4f;
		border-color: #0b2e4f;
		color: #fff;
	}

	.search-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.75rem;
		min-height: 2.75rem;
		border-radius: 9999px;
		background: #0b2e4f;
		color: #fff;
		border: 0;
		cursor: pointer;
		transition: background-color 150ms ease, transform 150ms ease;
	}

	.search-btn:hover {
		background: #103d68;
		transform: translateY(-1px);
	}

	.chip {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		padding: 0.4375rem 1rem;
		border-radius: 9999px;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		color: #475569;
		font-size: 0.8125rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.chip:hover {
		border-color: #0b2e4f;
		color: #0b2e4f;
	}

	.chip:focus-visible {
		outline: 2px solid #0b2e4f;
		outline-offset: 2px;
		border-color: #0b2e4f;
		color: #0b2e4f;
	}

	.chip.active {
		background: #0b2e4f;
		border-color: #0b2e4f;
		color: #ffffff;
	}

	/* Featured card — landing page style: organic curve, parallax-style, big */
	.featured {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 2.5rem;
		align-items: center;
		text-decoration: none;
		color: inherit;
	}

	@media (max-width: 900px) {
		.featured {
			grid-template-columns: 1fr;
			gap: 1.75rem;
		}
	}

	.featured-img {
		position: relative;
		overflow: hidden;
		border-top-left-radius: 8rem;
		border-bottom-right-radius: 8rem;
		border-top-right-radius: 1.25rem;
		border-bottom-left-radius: 1.25rem;
		aspect-ratio: 4/3;
		background: #f1f5f9;
		box-shadow: 0 24px 48px -16px rgba(11, 46, 79, 0.25);
	}

	@media (max-width: 768px) {
		.featured-img {
			border-radius: 1.75rem;
		}
	}

	.featured-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.featured.group:hover .featured-img img {
		transform: scale(1.05);
	}

	.featured-cat {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		display: inline-block;
		padding: 0.4375rem 0.875rem;
		border-radius: 9999px;
		background: #e11d48;
		color: #fff;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.card-wrap {
		display: flex;
	}

	.card-wrap :global(a) {
		width: 100% !important;
	}

	.pager {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		margin-top: 3rem;
		flex-wrap: wrap;
	}

	.page-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.625rem 1.25rem;
		border-radius: 9999px;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		color: #0b2e4f;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 150ms ease;
	}

	.page-link:hover {
		border-color: #0b2e4f;
		background: #0b2e4f;
		color: #ffffff;
	}

	.page-info {
		font-size: 0.875rem;
		color: #64748b;
	}

	.adm-btn-link {
		font-size: 0.875rem;
		font-weight: 600;
		color: #0b2e4f;
		text-decoration: none;
	}

	.adm-btn-link:hover {
		text-decoration: underline;
	}
</style>
