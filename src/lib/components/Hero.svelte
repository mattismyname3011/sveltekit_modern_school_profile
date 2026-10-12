<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { parallax } from '$lib/actions/parallax';
	import { reveal } from '$lib/actions/reveal';

	interface Slide {
		category: string;
		titleA: string;
		titleB: string;
		desc: string;
		image: string;
		previewLabel: string;
		previewTitle: string;
	}

	const slides: Slide[] = [
		{
			category: 'Keunggulan Akademik',
			titleA: 'Mendidik',
			titleB: 'Pemimpin Masa Depan',
			desc: 'Membentuk pelajar yang berani berkarya, unggul secara akademik, dan siap berkompetisi di tingkat nasional.',
			image:
				'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'Sorotan Berikutnya',
			previewTitle: 'Pendidikan\nKarakter'
		},
		{
			category: 'Integritas & Empati',
			titleA: 'Membangun',
			titleB: 'Generasi Berkarakter',
			desc: 'Pendidikan karakter terintegrasi dalam setiap kegiatan, menumbuhkan integritas dan empati siswa.',
			image:
				'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'Sorotan Berikutnya',
			previewTitle: 'Inovasi\nTeknologi'
		},
		{
			category: 'Riset & Teknologi',
			titleA: 'Menginspirasi',
			titleB: 'Inovasi Tanpa Batas',
			desc: 'Lab modern, ekosistem digital, dan pembinaan riset pelajar membuka jalan bagi kreativitas sains.',
			image:
				'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'Sorotan Berikutnya',
			previewTitle: 'Prestasi\nSiswa'
		},
		{
			category: 'Kiprah Siswa',
			titleA: 'Merayakan',
			titleB: 'Prestasi Gemilang',
			desc: 'Komitmen berkelanjutan mencetak juara di bidang sains, seni budaya, dan olahraga setiap tahun.',
			image:
				'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'Sorotan Berikutnya',
			previewTitle: 'Keunggulan\nAkademik'
		}
	];

	let index = $state(0);
	let isAnimating = $state(false);
	let reducedMotion = $state(false);
	let autoPlay = $state(true);
	let timer: ReturnType<typeof setInterval> | null = null;
	let pointerStartX: number | null = null;

	const current = $derived(slides[index]);
	const next = $derived(slides[(index + 1) % slides.length]);

	function go(dir: 1 | -1) {
		if (isAnimating) return;
		isAnimating = true;
		index = (index + dir + slides.length) % slides.length;
		setTimeout(() => (isAnimating = false), 600);
		restartAuto();
	}

	function jumpTo(i: number) {
		if (isAnimating || i === index) return;
		isAnimating = true;
		index = i;
		setTimeout(() => (isAnimating = false), 600);
		restartAuto();
	}

	function startAuto() {
		if (reducedMotion || !autoPlay) return;
		stopAuto();
		timer = setInterval(() => {
			index = (index + 1) % slides.length;
		}, 7000);
	}
	function stopAuto() {
		if (timer) clearInterval(timer);
		timer = null;
	}
	function toggleAuto() {
		autoPlay = !autoPlay;
		if (autoPlay) startAuto();
		else stopAuto();
	}
	function restartAuto() {
		stopAuto();
		startAuto();
	}

	function handlePointerDown(event: PointerEvent) {
		if (event.pointerType === 'mouse') return;
		pointerStartX = event.clientX;
		stopAuto();
	}

	function handlePointerUp(event: PointerEvent) {
		if (pointerStartX === null) return;
		const distance = event.clientX - pointerStartX;
		pointerStartX = null;

		if (Math.abs(distance) >= 48) go(distance < 0 ? 1 : -1);
		else startAuto();
	}

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const onChange = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
			if (reducedMotion) stopAuto();
			else startAuto();
		};
		mq.addEventListener('change', onChange);

		startAuto();

		return () => {
			mq.removeEventListener('change', onChange);
			stopAuto();
		};
	});
</script>

<section
	id="beranda"
	class="relative overflow-hidden px-4 pb-14 pt-24 sm:pt-28 md:px-8 md:pb-20 md:pt-32 lg:pt-36"
>
	<div class="relative z-10 max-w-7xl mx-auto">
		<div class="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
			<!-- ============ MAIN SLIDE ============ -->
			<div
				class="relative min-w-0"
				role="region"
				aria-roledescription="carousel"
				aria-label="Sorotan SMPN 1 Anggana"
				onmouseenter={stopAuto}
				onmouseleave={startAuto}
				onfocusin={stopAuto}
				onfocusout={startAuto}
				use:reveal={{ from: 'up' }}
			>
				<!-- Slide stack with crossfade -->
				<div
					class="relative overflow-hidden mask-organic
					       h-[min(76svh,42rem)] min-h-[32rem] bg-slate-900
					       sm:min-h-[35rem] md:h-[min(72svh,46rem)] md:min-h-[38rem]
					       lg:h-auto lg:min-h-0 lg:aspect-[16/11] xl:aspect-[16/10]"
					role="group"
					aria-label={`Slide ${index + 1} dari ${slides.length}`}
					onpointerdown={handlePointerDown}
					onpointerup={handlePointerUp}
					onpointercancel={() => {
						pointerStartX = null;
						startAuto();
					}}
				>
					{#each slides as slide, i}
						<div
							class="absolute inset-0 transition-opacity duration-700 ease-out"
							style="opacity: {i === index ? 1 : 0}; pointer-events: {i === index ? 'auto' : 'none'};"
							aria-hidden={i !== index}
						>
							<img
								src={slide.image}
								alt={slide.titleB}
								loading={i === index ? 'eager' : 'lazy'}
								fetchpriority={i === index ? 'high' : 'low'}
								class="w-full h-full object-cover transition-transform duration-[7000ms] ease-out"
								style="transform: scale({i === index ? 1.05 : 1});"
							/>
							<!-- Editorial vignette gradient for legibility -->
							<div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10 md:from-slate-950/80"></div>
							<div class="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent"></div>
						</div>
					{/each}

					<!-- Foreground copy -->
					<div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">
						<div class="max-w-3xl text-white">
							<div class="text-xs font-bold uppercase tracking-wider text-white/90">
								{current.category}
							</div>
							<h1
								class="mt-2 max-w-[12ch] font-display font-extrabold tracking-[-0.04em]
								       text-[clamp(2.4rem,10vw,4.5rem)] leading-[0.95] text-white
								       md:mt-3 md:max-w-[13ch] md:text-[clamp(3.8rem,6.5vw,5.2rem)]"
							>
								<span class="block opacity-95">{current.titleA}</span>
								<span class="block">{current.titleB}</span>
							</h1>

							<p class="hero-description mt-4 max-w-[38rem] text-sm leading-relaxed text-white/85 line-clamp-3 sm:text-base md:mt-6">
								{current.desc}
							</p>

							<div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-8">
								<Button href="#program" variant="accent" size="lg" class="max-sm:w-full">
									Lihat Program Kami
								</Button>

								<!-- Slide indicator counter -->
								<div class="flex min-h-11 items-center gap-3 sm:ml-2">
									<span class="font-display font-bold text-white text-lg">
										{String(index + 1).padStart(2, '0')}
									</span>
									<span class="w-12 h-[2px] bg-white/30 relative overflow-hidden">
										<span
											class="absolute inset-y-0 left-0 bg-accent"
											style="width: {((index + 1) / slides.length) * 100}%; transition: width 0.6s ease-out;"
										></span>
									</span>
									<span class="text-white/60 text-sm">{slides.length}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Slider interactive controls -->
				<div class="mt-4 flex min-h-12 items-center gap-3 sm:mt-5">
					<button
						type="button"
						onclick={() => go(-1)}
						aria-label="Slide sebelumnya"
						class="grid size-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-primary
						       shadow-sm transition-[transform,background-color,color,border-color] duration-300
						       hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
						       dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-accent dark:hover:bg-accent"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
					</button>

					<div class="flex flex-1 items-center justify-center gap-1 sm:gap-2" aria-label="Pilih slide">
						{#each slides as _, i}
							<button
								type="button"
								aria-label={`Pindah ke slide ${i + 1}`}
								aria-current={i === index ? 'true' : undefined}
								onclick={() => jumpTo(i)}
								class="group grid min-h-11 min-w-11 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
							>
								<span
									aria-hidden="true"
									class="h-2 rounded-full transition-all duration-300
									       {i === index ? 'w-8 bg-accent' : 'w-2 bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600'}"
								></span>
							</button>
						{/each}
					</div>

					<button
						type="button"
						onclick={() => go(1)}
						aria-label="Slide berikutnya"
						class="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-white
						       shadow-lg shadow-primary/20 transition-[transform,background-color,box-shadow] duration-300
						       hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary/30
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
						       dark:bg-accent dark:shadow-accent/20 dark:hover:bg-accent-600"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</button>

					<button
						type="button"
						onclick={toggleAuto}
						aria-pressed={!autoPlay}
						aria-label={autoPlay ? 'Jeda putar otomatis' : 'Putar otomatis'}
						title={autoPlay ? 'Jeda putar otomatis' : 'Putar otomatis'}
						class="grid size-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-primary
						       shadow-sm transition-[transform,background-color,color,border-color] duration-300
						       hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
						       dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-accent dark:hover:bg-accent"
					>
						{#if autoPlay}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<rect x="6" y="4" width="4" height="16" rx="1" />
								<rect x="14" y="4" width="4" height="16" rx="1" />
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M7 4.5v15l13-7.5z" />
							</svg>
						{/if}
					</button>
				</div>
			</div>

			<!-- ============ RIGHT RAIL: Preview + Editorial Institutional Note ============ -->
			<div class="hidden flex-col gap-6 lg:flex" use:reveal={{ from: 'right', delay: 120 }}>
				<!-- Preview thumbnail of next slide -->
				<button
					type="button"
					onclick={() => go(1)}
					aria-label="Slide berikutnya"
					class="group relative block overflow-hidden mask-organic-alt
					       aspect-[4/5] lg:aspect-auto lg:h-[300px] xl:h-[330px]
					       bg-slate-200 dark:bg-slate-800 cursor-pointer
					       focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 dark:focus-visible:ring-accent/30"
				>
					{#each slides as slide, i}
						<img
							src={slide.image}
							alt=""
							aria-hidden="true"
							loading={i === (index + 1) % slides.length ? 'eager' : 'lazy'}
							class="absolute inset-0 w-full h-full object-cover
							       transition-[opacity,transform] duration-700 ease-out
							       group-hover:scale-105"
							style="opacity: {i === (index + 1) % slides.length ? 1 : 0};"
						/>
					{/each}
					<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

					<div class="absolute inset-0 p-6 flex flex-col justify-end text-white">
						<div class="text-xs font-semibold uppercase tracking-wider text-white/80">{next.previewLabel}</div>
						<div
							class="mt-1 font-display font-extrabold leading-[1.0]
							       text-2xl md:text-3xl whitespace-pre-line"
						>
							{next.previewTitle}
						</div>
					</div>

					<!-- Directional hover cue -->
					<div
						class="absolute top-4 right-4 w-9 h-9 rounded-full
						       bg-white/90 text-primary grid place-items-center
						       opacity-0 -translate-y-2
						       transition-all duration-300
						       group-hover:opacity-100 group-hover:translate-y-0"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</div>
				</button>

				<!-- Editorial Institutional Card -->
				<div class="bg-white dark:bg-slate-900/85 rounded-3xl border border-slate-200/80 dark:border-white/10 p-6 shadow-sm dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-sm flex flex-col justify-between flex-1">
					<div>
						<div class="flex items-center justify-between">
							<span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Profil Lembaga</span>
							<span class="text-xs font-semibold text-accent">NPSN: 30400508</span>
						</div>
						<p class="mt-3 font-display font-bold text-lg leading-snug text-primary dark:text-white">
							Membentuk pribadi cerdas, berkarakter luhur, dan berbudaya lingkungan.
						</p>
					</div>
					<div class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
						<span>Anggana, Kutai Kartanegara</span>
						<span class="font-bold text-primary dark:text-white">Akreditasi A</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@media (prefers-reduced-motion: reduce) {
		:global(.duration-700),
		:global(.duration-\[7000ms\]) {
			transition-duration: 0.01ms;
		}
	}
</style>
