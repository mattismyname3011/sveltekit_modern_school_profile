<script lang="ts">
	type Program = {
		image: string;
		title: string;
		tag: string;
		excerpt: string;
	};

	let { data }: { data: { programs: Program[] } } = $props();
</script>

<svelte:head>
	<title>Program Sekolah</title>
</svelte:head>

<div class="page">
	<div class="container">
		<div class="header">
			<p class="eyebrow">Program Unggulan</p>
			<h1>Eksplorasi Program Sekolah</h1>
			<p class="subtitle">
				Program akademik dan non-akademik untuk mendukung perkembangan siswa.
			</p>
		</div>

		<div class="grid">
			{#each data.programs as program}
				<div class="card">
					<img src={program.image} alt={program.title} />

					<div class="content">
						<span class="tag">{program.tag}</span>
						<h2>{program.title}</h2>
						<p>{program.excerpt}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Inter, sans-serif;
		background: #f5f7fb;
	}

	.page {
		padding: 4rem 1.5rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.eyebrow {
		color: #2563eb;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	h1 {
		font-size: 3rem;
		margin: 0.5rem 0;
	}

	.subtitle {
		color: #64748b;
		max-width: 700px;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.card {
		background: white;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-6px);
	}

	.card img {
		width: 100%;
		height: 220px;
		object-fit: cover;
	}

	.content {
		padding: 1.5rem;
	}

	.tag {
		display: inline-block;
		background: #dbeafe;
		color: #1d4ed8;
		padding: 0.35rem 0.75rem;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	h2 {
		margin: 0 0 1rem;
		font-size: 1.35rem;
	}

	.content p {
		color: #64748b;
		line-height: 1.7;
	}
</style>