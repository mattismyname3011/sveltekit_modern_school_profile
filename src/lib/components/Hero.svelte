<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Button from './Button.svelte';
	import { reveal } from '$lib/actions/reveal';
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
	class="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden"
>
	<!-- Background ambient blobs -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
		<div use:parallax={{ speed: 0.15 }} class="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/5 blur-3xl"></div>
		<div use:parallax={{ speed: -0.18 }} class="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-accent/5 blur-3xl"></div>
	</div>

	<!-- Parallax band behind everything -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 top-24 md:top-32 pointer-events-none overflow-hidden -z-0"
	>
		<div
			class="whitespace-nowrap select-none
			       font-display font-extrabold uppercase tracking-tighter
			       text-[18vw] leading-[0.85] text-slate-900/[0.04]"
			style="transform: translate3d({bgX}px, 0, 0);"
		>
			ANGGANA · ANGGANA · ANGGANA
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto">
		<div class="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6 md:gap-8">
			<!-- ============ MAIN SLIDE ============ -->
			<div class="relative">
				<!-- Slide stack with crossfade -->
				<div
					class="relative overflow-hidden mask-organic
					       aspect-[16/11] md:aspect-[16/10] bg-slate-900"
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
							<div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"></div>
							<div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
						</div>
					{/each}

					<!-- Foreground copy -->
					<div class="absolute inset-0 p-6 md:p-10 lg:p-14 flex flex-col justify-end">
						<div class="text-white">
							<div
								class="text-sm md:text-base font-bold tracking-wide
								       text-white/90"
							>
								{current.hashtag}
							</div>
							<h1
								class="mt-2 md:mt-3 font-display font-extrabold tracking-tight
								       text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem]
								       leading-[0.95] text-white"
							>
								<span class="block opacity-95">{current.titleA}</span>
								<span class="block">{current.titleB}</span>
							</h1>

							<p class="mt-5 md:mt-6 max-w-xl text-sm md:text-base text-white/85 leading-relaxed">
								{current.desc}
							</p>

							<div class="mt-7 md:mt-8 flex flex-wrap items-center gap-4">
								<Button href="/programs" variant="accent" size="lg">Jelajahi Sekarang</Button>

								<!-- Counter -->
								<div class="flex items-center gap-3 ml-2">
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
				<div class="absolute -bottom-3 left-6 md:left-10 flex gap-2">
					{#each slides as _, i}
						<button
							type="button"
							aria-label={`Pindah ke slide ${i + 1}`}
							onclick={() => jumpTo(i)}
							class="h-2 rounded-full transition-all duration-300
							       {i === index ? 'w-8 bg-accent' : 'w-2 bg-slate-300 hover:bg-slate-400'}"
						></button>
					{/each}
				</div>
			</div>

			<!-- ============ RIGHT RAIL: Preview + Controls + Discover ============ -->
			<div class="flex flex-col gap-6">
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
