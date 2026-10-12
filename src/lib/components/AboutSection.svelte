<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { parallax } from '$lib/actions/parallax';

	const pillars = [
		{
			title: 'Akreditasi A (Unggul)',
			desc: 'Pengakuan mutu formal oleh BAN-S/M dengan pemenuhan standar nasional tertinggi.'
		},
		{
			title: 'Rasio Belajar 1:18',
			desc: 'Pendampingan guru yang intensif untuk memantau kemajuan belajar setiap siswa.'
		},
		{
			title: '32 Ekstrakurikuler',
			desc: 'Wadah eksplorasi minat di bidang riset sains, seni budaya, dan olahraga prestasi.'
		},
		{
			title: 'Jejaring Edukasi',
			desc: 'Kolaborasi aktif bersama komunitas pendidikan untuk memperkaya wawasan siswa.'
		}
	];
</script>

<section id="tentang" class="py-20 md:py-28 px-4 md:px-8">
	<div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
		<!-- Photo Frame -->
		<div use:reveal={{ from: 'left' }} class="relative order-2 lg:order-1">
			<div class="parallax-clip mask-organic relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-black/30">
				<img
					use:parallax={{ speed: 0.18 }}
					src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
					alt="Lingkungan belajar kondusif di SMPN 1 Anggana"
					loading="lazy"
					class="parallax-img"
				/>
			</div>
			<div class="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-2">
				<span>Kampus & Sarana Pembelajaran Terpadu</span>
				<span>Didirikan 1985</span>
			</div>
		</div>

		<!-- Editorial Narrative & Pillars -->
		<div use:reveal={{ from: 'right', delay: 100 }} class="order-1 lg:order-2">
			<div class="text-xs font-bold uppercase tracking-widest text-accent">Tentang Kami</div>
			<h2 class="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl text-primary dark:text-white leading-[1.1]">
				Membangun pelajar utuh sejak 1985
			</h2>
			<p class="mt-6 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
				Kami percaya pendidikan terbaik memadukan kedalaman ilmu, keteguhan karakter, dan kesiapan hidup.
				Dengan tenaga pendidik berdedikasi serta fasilitas yang terus diperbarui, kami mendampingi putra-putri
				Anggana menyongsong masa depan yang gemilang.
			</p>

			<!-- Clean Editorial Pillars (No emojis, no card slop) -->
			<div class="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7 border-t border-slate-200 dark:border-slate-800 pt-8">
				{#each pillars as item, i}
					<div
						use:reveal={{ from: 'up', delay: 180 + i * 60 }}
						class="flex flex-col"
					>
						<div class="text-xs font-bold text-accent tracking-wider">0{i + 1}</div>
						<h3 class="mt-1 font-display font-bold text-primary dark:text-white text-base md:text-lg">
							{item.title}
						</h3>
						<p class="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
							{item.desc}
						</p>
					</div>
				{/each}
			</div>

			<div class="mt-10 pt-4">
				<Button href="#program" variant="primary">Lihat Program Kami</Button>
			</div>
		</div>
	</div>
</section>
