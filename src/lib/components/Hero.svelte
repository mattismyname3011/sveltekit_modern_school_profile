<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Button from './Button.svelte';
	import { parallax } from '$lib/actions/parallax';

	interface Slide {
		hashtag: string;
		titleA: string;
		titleB: string;
		desc: string;
		image: string;
		previewLabel: string;
		previewTitle: string;
	}

	const slides: Slide[] = [
		{
			hashtag: '#BeraniBerprestasi',
			titleA: 'Mendidik',
			titleB: 'Pemimpin Masa Depan',
			desc: 'Membentuk pelajar yang berani berkarya, unggul secara akademik, dan siap berkompetisi di tingkat nasional.',
			image:
				'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'BerikutnyaUntukmu',
			previewTitle: 'Karakter\nUnggul'
		},
		{
			hashtag: '#KarakterUnggul',
			titleA: 'Membangun',
			titleB: 'Generasi Berkarakter',
			desc: 'Pendidikan karakter terintegrasi dalam setiap kegiatan, menumbuhkan integritas dan empati siswa.',
			image:
				'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'BerikutnyaUntukmu',
			previewTitle: 'Inovasi\nTanpa Batas'
		},
		{
			hashtag: '#InovasiPelajar',
			titleA: 'Menginspirasi',
			titleB: 'Inovasi Tanpa Batas',
			desc: 'Lab modern, ekosistem coding, dan klub robotik membuka jalan bagi imajinasi pelajar SMP 1 Anggana.',
			image:
				'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'BerikutnyaUntukmu',
			previewTitle: 'Prestasi\nGemilang'
		},
		{
			hashtag: '#PrestasiGemilang',
			titleA: 'Merayakan',
			titleB: 'Prestasi Gemilang',
			desc: 'Ratusan medali, juara olimpiade, dan pencapaian seni-olahraga yang membanggakan setiap tahun.',
			image:
				'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
			previewLabel: 'BerikutnyaUntukmu',
			previewTitle: 'Berani\nBerprestasi'
		}
	];

	const discover = [
		{ label: 'Tentang SMP 1 Anggana', href: '#tentang' },
		{ label: 'Sejarah & Visi Misi', href: '#tentang' },
		{ label: 'Program Unggulan', href: '/programs' },
		{ label: 'Prestasi & Akreditasi', href: '#tentang' },
		{ label: 'Berita & Agenda', href: '#berita' }
	];

	let index = $state(0);
	let isAnimating = $state(false);
	let reducedMotion = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

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
		if (reducedMotion) return;
		timer = setInterval(() => {
			index = (index + 1) % slides.length;
		}, 7000);
	}
	function stopAuto() {
		if (timer) clearInterval(timer);
		timer = null;
	}
	function restartAuto() {
		stopAuto();
		startAuto();
	}

	// Parallax
	let scrollY = $state(0);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const onChange = (e: MediaQueryListEvent) => {
			reducedMotion = e.matches;
			if (reducedMotion) stopAuto();
			else startAuto();
		};
		mq.addEventListener('change', onChange);

		const onScroll = () => (scrollY = window.scrollY);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		startAuto();

		return () => {
			mq.removeEventListener('change', onChange);
			window.removeEventListener('scroll', onScroll);
			stopAuto();
		};
	});

	onDestroy(() => stopAuto());

	const bgX = $derived(reducedMotion ? 0 : scrollY * 0.4);
</script>

<section
	id="beranda"
	class="relative overflow-hidden px-4 pb-12 pt-24 sm:pt-28 md:px-8 md:pb-20 md:pt-32 lg:pt-36"
>
	<!-- Parallax band behind everything -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-24 -z-0 overflow-hidden md:top-32"
	>
		<div
			class="select-none whitespace-nowrap
			       font-display font-extrabold uppercase tracking-tighter
			       text-[28vw] leading-[0.85] text-slate-900/[0.035] md:text-[18vw]"
			style="transform: translate3d({bgX}px, 0, 0);"
		>
			ANGGANA · ANGGANA · ANGGANA
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto">
		<div class="grid gap-5 md:gap-7 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
			<!-- ============ MAIN SLIDE ============ -->
			<div class="relative">
				<!-- Slide stack with crossfade -->
				<div
					class="relative overflow-hidden mask-organic
					       h-[calc(100svh-7rem)] min-h-[500px] max-h-[620px] bg-slate-900
					       sm:min-h-[540px] md:min-h-[560px]
					       lg:aspect-[16/11] lg:min-h-0 xl:aspect-[16/10]"
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
								class="w-full h-full object-cover transition-transform duration-[7000ms] ease-out"
								style="transform: scale({i === index ? 1.06 : 1});"
							/>
							<!-- Gradient overlay for legibility -->
							<div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/28 to-slate-950/5 md:from-slate-950/72"></div>
							<div class="absolute inset-0 bg-gradient-to-r from-slate-950/42 via-transparent to-transparent"></div>
						</div>
					{/each}

					<!-- Foreground copy -->
					<div class="absolute inset-0 flex flex-col justify-end p-5 pb-14 sm:p-7 sm:pb-16 md:p-10 lg:p-14">
						<div class="text-white">
							<div
								class="text-xs font-bold tracking-wide sm:text-sm md:text-base
								       text-white/90"
							>
								{current.hashtag}
							</div>
							<h1
								class="mt-2 max-w-[11ch] font-display font-extrabold tracking-tight
								       text-[clamp(2.35rem,12vw,4.75rem)] leading-[0.94] text-white
								       md:mt-3 md:max-w-[12ch] md:text-[clamp(4.4rem,8vw,5.5rem)]"
							>
								<span class="block opacity-95">{current.titleA}</span>
								<span class="block">{current.titleB}</span>
							</h1>

							<p class="mt-4 max-w-[34rem] text-base leading-relaxed text-white/86 md:mt-6">
								{current.desc}
							</p>

							<div class="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center md:mt-8">
								<Button href="/programs" variant="accent" size="lg" class="w-full sm:w-auto">Jelajahi Sekarang</Button>

								<!-- Counter -->
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

				<!-- Slide dots (mobile-friendly direct nav) -->
				<div class="absolute bottom-5 left-5 hidden gap-1 sm:left-7 sm:gap-2 md:left-10 md:flex">
					{#each slides as _, i}
						<button
							type="button"
							aria-label={`Pindah ke slide ${i + 1}`}
							onclick={() => jumpTo(i)}
							class="grid min-h-11 min-w-11 place-items-center rounded-full transition-all duration-300
							       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
						>
							<span
								aria-hidden="true"
								class="h-2 rounded-full transition-all duration-300
								       {i === index ? 'w-8 bg-accent' : 'w-2 bg-white/55'}"
							></span>
						</button>
					{/each}
				</div>

				<!-- Compact slide controls live inside the frame on touch layouts. -->
				<div class="absolute right-5 top-5 flex gap-2 sm:right-7 sm:top-7 lg:hidden">
					<button
						type="button"
						onclick={() => go(-1)}
						aria-label="Slide sebelumnya"
						class="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/18 bg-slate-950/35 text-white
						       shadow-lg shadow-slate-950/20 transition-colors duration-300
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
					</button>

					<button
						type="button"
						onclick={() => go(1)}
						aria-label="Slide berikutnya"
						class="grid min-h-11 min-w-11 place-items-center rounded-full bg-white text-primary
						       shadow-lg shadow-slate-950/20 transition-colors duration-300
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</button>
				</div>

				<!-- Shortcuts adapt into a horizontal touch strip below the hero. -->
				<div class="mt-4 grid gap-4 lg:hidden">
					<nav aria-label="Jelajahi sekolah" class="overflow-x-auto scrollbar-hide">
						<ul class="flex w-max gap-2 pr-4">
							{#each discover as d}
								<li>
									<a
										href={d.href}
										class="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700
										       shadow-sm shadow-slate-200/50 transition-colors duration-200
										       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
									>
										{d.label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>
			</div>

			<!-- ============ RIGHT RAIL: Preview + Controls + Discover ============ -->
			<div class="hidden flex-col gap-6 lg:flex">
				<!-- Preview of next slide -->
				<button
					type="button"
					onclick={() => go(1)}
					aria-label="Slide berikutnya"
					class="group relative block overflow-hidden mask-organic-alt
					       aspect-[4/5] lg:aspect-auto lg:h-[300px] xl:h-[340px]
					       bg-slate-200 cursor-pointer
					       focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
				>
					{#each slides as slide, i}
						<img
							src={slide.image}
							alt=""
							aria-hidden="true"
							class="absolute inset-0 w-full h-full object-cover
							       transition-[opacity,transform] duration-700 ease-out
							       group-hover:scale-105"
							style="opacity: {i === (index + 1) % slides.length ? 1 : 0};"
						/>
					{/each}
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"></div>

					<div class="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-white">
						<div class="text-xs font-semibold opacity-85">#{next.previewLabel}</div>
						<div
							class="mt-1 font-display font-extrabold leading-[0.95]
							       text-2xl md:text-3xl whitespace-pre-line"
						>
							{next.previewTitle}
						</div>
					</div>

					<!-- Hover hint -->
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

				<!-- Prev / Next controls -->
				<div class="flex items-center justify-between gap-3">
					<button
						type="button"
						onclick={() => go(-1)}
						aria-label="Slide sebelumnya"
						class="w-12 h-12 rounded-full bg-white border border-slate-200
						       grid place-items-center text-primary
						       shadow-md shadow-slate-200/60
						       hover:bg-primary hover:text-white hover:border-primary
						       hover:-translate-y-0.5
						       transition-all duration-300
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
					</button>

					<div class="flex-1 text-center">
						<div class="font-display font-bold text-primary text-lg">
							{String(index + 1).padStart(2, '0')}
							<span class="text-slate-400 font-medium text-sm">/ {String(slides.length).padStart(2, '0')}</span>
						</div>
					</div>

					<button
						type="button"
						onclick={() => go(1)}
						aria-label="Slide berikutnya"
						class="w-12 h-12 rounded-full bg-primary text-white
						       grid place-items-center
						       shadow-lg shadow-primary/25
						       hover:bg-primary-600 hover:-translate-y-0.5
						       hover:shadow-xl hover:shadow-primary/35
						       transition-all duration-300
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
							<path d="M5 12h14M13 5l7 7-7 7" />
						</svg>
					</button>
				</div>

				<!-- Discover list -->
				<div class="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6">
					<div class="font-display font-bold text-primary">Jelajahi Sekolah</div>
					<ul class="mt-4 divide-y divide-slate-100">
						{#each discover as d}
							<li>
								<a
									href={d.href}
									class="group flex items-center justify-between py-3
									       text-sm text-slate-700 font-medium
									       hover:text-primary transition-colors duration-200"
								>
									<span>{d.label}</span>
									<svg
										class="w-4 h-4 text-slate-300 group-hover:text-primary
										       group-hover:translate-x-0.5 transition-all duration-200"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
									>
										<path d="M9 18l6-6-6-6" />
									</svg>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
