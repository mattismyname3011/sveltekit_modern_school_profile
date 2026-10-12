<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		eyebrow?: string;
		title: string;
		subtitle?: string;
		viewAllHref?: string;
		viewAllLabel?: string;
		id?: string;
		children: Snippet;
	}

	let {
		eyebrow,
		title,
		subtitle,
		viewAllHref = '#',
		viewAllLabel = 'Baca Selengkapnya',
		id,
		children
	}: Props = $props();

	let track: HTMLDivElement | null = $state(null);
	let canPrev = $state(false);
	let canNext = $state(true);

	function updateButtons() {
		if (!track) return;
		canPrev = track.scrollLeft > 4;
		canNext = track.scrollLeft + track.clientWidth < track.scrollWidth - 4;
	}

	function scroll(dir: 1 | -1) {
		if (!track) return;
		const card = track.firstElementChild as HTMLElement | null;
		const step = card ? card.clientWidth + 24 : track.clientWidth * 0.8;
		track.scrollBy({ left: dir * step, behavior: 'smooth' });
	}

	onMount(() => {
		updateButtons();
		const ro = new ResizeObserver(updateButtons);
		if (track) ro.observe(track);
		return () => ro.disconnect();
	});
</script>

<section {id} class="py-20 md:py-28 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid lg:grid-cols-[320px_1fr] gap-6 md:gap-8 items-stretch">
			<!-- Intro card with scroll reveal & elevated dark mode -->
			<div
				use:reveal={{ from: 'left' }}
				class="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10
				       shadow-xl shadow-slate-200/50 dark:shadow-black/40 backdrop-blur-md
				       p-7 md:p-8 flex flex-col justify-between"
			>
				<div>
					{#if eyebrow}
						<div class="text-xs font-bold uppercase tracking-widest text-accent">
							{eyebrow}
						</div>
					{/if}
					<h2
						class="mt-2 font-display font-extrabold tracking-tight
						       text-3xl md:text-4xl text-primary dark:text-white leading-[1.05]"
					>
						{title}
					</h2>
					{#if subtitle}
						<p class="mt-4 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
							{subtitle}
						</p>
					{/if}
				</div>

				<div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
					<a
						href={viewAllHref}
						class="inline-flex items-center gap-2 text-accent font-semibold text-sm group w-fit"
					>
						<span class="link-underline">{viewAllLabel}</span>
						<span
							class="w-7 h-7 rounded-full bg-accent/10 grid place-items-center
							       transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:translate-x-0.5"
						>
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
								<path d="M5 12h14M13 5l7 7-7 7" />
							</svg>
						</span>
					</a>

					<!-- Carousel controls with dark mode hover elevation -->
					<div class="mt-5 flex gap-2.5">
						<button
							type="button"
							onclick={() => scroll(-1)}
							disabled={!canPrev}
							aria-label="Sebelumnya"
							class="w-11 h-11 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-800
							       grid place-items-center text-primary dark:text-white shadow-sm
							       transition-all duration-300
							       hover:bg-accent hover:border-accent hover:text-white dark:hover:bg-accent dark:hover:border-accent
							       hover:-translate-y-0.5
							       disabled:opacity-30 disabled:pointer-events-none
							       focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
								<path d="M19 12H5M12 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							type="button"
							onclick={() => scroll(1)}
							disabled={!canNext}
							aria-label="Berikutnya"
							class="w-11 h-11 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-800
							       grid place-items-center text-primary dark:text-white shadow-sm
							       transition-all duration-300
							       hover:bg-accent hover:border-accent hover:text-white dark:hover:bg-accent dark:hover:border-accent
							       hover:-translate-y-0.5
							       disabled:opacity-30 disabled:pointer-events-none
							       focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
								<path d="M5 12h14M13 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			<!-- Track with scroll reveal -->
			<div
				use:reveal={{ from: 'right', delay: 100 }}
				bind:this={track}
				onscroll={updateButtons}
				class="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide
				       snap-x snap-mandatory py-2 -my-2 px-1 -mx-1"
				aria-label="Daftar Berita"
			>
				{@render children()}
			</div>
		</div>
	</div>
</section>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
