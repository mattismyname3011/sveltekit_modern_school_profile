<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} — SMP 1 Anggana</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content={post.image} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="post">
	<a href="/" class="back">← Beranda</a>
	<div class="meta">
		<span class="cat">{post.category}</span>
		<span class="date">{post.date}</span>
	</div>
	<h1 class="title">{post.title}</h1>
	<p class="lede">{post.excerpt}</p>

	<div class="hero">
		<img src={post.image} alt={post.title} />
	</div>

	{#if post.contentHtml}
		<div class="md-content">
			<!-- HTML is sanitized server-side via sanitize-html. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html post.contentHtml}
		</div>
	{:else}
		<p class="empty">Berita ini belum memiliki konten panjang.</p>
	{/if}
</article>

<style>
	.post {
		max-width: 720px;
		margin: 0 auto;
		padding: 4rem 1.25rem 6rem;
		color: #1f2937;
	}

	.back {
		display: inline-block;
		font-size: 0.8125rem;
		color: #64748b;
		text-decoration: none;
		margin-bottom: 1.5rem;
	}

	.back:hover {
		color: #0b2e4f;
	}

	.meta {
		display: flex;
		gap: 0.625rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.875rem;
	}

	.cat {
		color: #e11d48;
	}

	.date {
		color: #64748b;
	}

	.title {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: clamp(1.875rem, 4vw, 2.75rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #0b2e4f;
		line-height: 1.15;
		margin: 0 0 1rem;
	}

	.lede {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #475569;
		margin: 0 0 2.25rem;
	}

	.hero {
		border-radius: 1.25rem;
		overflow: hidden;
		margin-bottom: 2.5rem;
		aspect-ratio: 16/9;
		background: #f1f5f9;
	}

	.hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.empty {
		color: #94a3b8;
		font-style: italic;
	}
</style>
