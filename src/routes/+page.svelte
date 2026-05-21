<script lang="ts">
	import FloatingNavbar from '$lib/components/FloatingNavbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Button from '$lib/components/Button.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ProgramBento from '$lib/components/ProgramBento.svelte';
	import EventsTimeline from '$lib/components/EventsTimeline.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { parallax } from '$lib/actions/parallax';

	const programs = [
		{
			tag: 'Akademik',
			title: 'Sains & Laboratorium',
			excerpt:
				'Pembelajaran berbasis eksperimen dengan laboratorium IPA modern untuk menumbuhkan rasa ingin tahu siswa.',
			image:
				'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1400&auto=format&fit=crop'
		},
		{
			tag: 'Teknologi',
			title: 'Coding & Robotik',
			excerpt:
				'Kurikulum digital yang membekali siswa dengan keterampilan coding, robotika, dan literasi data.',
			image:
				'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop'
		},
		{
			tag: 'Seni',
			title: 'Musik & Pertunjukan',
			excerpt:
				'Wadah ekspresi melalui ansambel musik, paduan suara, dan pentas seni tahunan.',
			image:
				'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop'
		},
		{
			tag: 'Olahraga',
			title: 'Pembinaan Atlet',
			excerpt:
				'Pelatihan terstruktur di basket, futsal, bulutangkis, dan kompetisi rutin antar sekolah.',
			image:
				'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop'
		},
		{
			tag: 'Karakter',
			title: 'Pramuka & Kepemimpinan',
			excerpt:
				'Pendidikan karakter terintegrasi: kemandirian, kerja sama, dan kepemimpinan siswa.',
			image:
				'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop'
		},
		{
			tag: 'Bahasa',
			title: 'Klub Bahasa Inggris',
			excerpt:
				'Praktik percakapan, debat, dan public speaking untuk membangun kepercayaan diri global.',
			image:
				'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop'
		}
	];

	const news = [
		{
			category: 'Prestasi',
			date: '12 Mei 2026',
			title: 'Tim Robotik Raih Juara 2 Tingkat Provinsi',
			excerpt:
				'Lima siswa SMP 1 Anggana berhasil membawa pulang trofi setelah final ketat di Samarinda. Mereka mengalahkan 24 sekolah lainnya.',
			image:
				'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
		},
		{
			category: 'Akademik',
			date: '8 Mei 2026',
			title: 'Kurikulum STEAM Diluncurkan Tahun Ini',
			excerpt:
				'Kurikulum baru memadukan Science, Technology, Engineering, Arts, dan Mathematics dengan proyek lintas mata pelajaran.',
			image:
				'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop'
		},
		{
			category: 'Kegiatan',
			date: '4 Mei 2026',
			title: 'Bakti Sosial Siswa di Desa Sungai Mariam',
			excerpt:
				'Pengabdian masyarakat sebagai bagian dari pendidikan karakter, melibatkan 120 siswa kelas IX dalam tiga hari kegiatan.',
			image:
				'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
		},
		{
			category: 'Olahraga',
			date: '28 Apr 2026',
			title: 'Tim Basket Sekolah Lolos ke Final Daerah',
			excerpt:
				'Setelah semifinal yang dramatis melawan SMP 5 Tenggarong, tim putra sekolah memastikan tiket ke final tingkat kabupaten.',
			image:
				'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop'
		},
		{
			category: 'Sekolah',
			date: '20 Apr 2026',
			title: 'Renovasi Lab Komputer Selesai Dilakukan',
			excerpt:
				'Fasilitas baru dengan 36 unit komputer dan jaringan fiber optik siap digunakan untuk pembelajaran semester depan.',
			image:
				'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop'
		}
	];

	const events = [
		{
			category: 'Seminar',
			date: '12 Jun 2026',
			dateD: '12',
			dateM: 'Jun',
			title: 'Seminar Inovasi Pelajar Nasional',
			excerpt:
				'Menghadirkan tiga pembicara utama dari startup tech Indonesia. Terbuka untuk siswa dan orang tua di Aula Utama.',
			image:
				'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1400&auto=format&fit=crop',
			time: '08:00 WITA',
			loc: 'Aula Utama'
		},
		{
			category: 'Lomba',
			date: '8 Jul 2026',
			dateD: '08',
			dateM: 'Jul',
			title: 'Pekan Olahraga Antar Kelas',
			excerpt:
				'Lima cabang olahraga dan lebih dari 200 peserta. Acara puncak akan ditutup dengan pertandingan eksibisi alumni.',
			image:
				'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1400&auto=format&fit=crop',
			time: '07:30 WITA',
			loc: 'Lapangan Sekolah'
		},
		{
			category: 'Workshop',
			date: '2 Agu 2026',
			dateD: '02',
			dateM: 'Agu',
			title: 'Coding & Robotic Workshop',
			excerpt:
				'Workshop intensif tiga hari mengenalkan Arduino dan Python kepada siswa kelas VIII di Lab Komputer baru.',
			image:
				'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
			time: '09:00 WITA',
			loc: 'Lab Komputer'
		},
		{
			category: 'Upacara',
			date: '17 Agu 2026',
			dateD: '17',
			dateM: 'Agu',
			title: 'Upacara HUT RI ke-81',
			excerpt:
				'Upacara bendera dan rangkaian lomba kemerdekaan sepanjang hari di halaman sekolah. Dimulai pukul 07:00 WITA.',
			image:
				'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1400&auto=format&fit=crop',
			time: '07:00 WITA',
			loc: 'Halaman Sekolah'
		},
		{
			category: 'Pentas',
			date: '25 Sep 2026',
			dateD: '25',
			dateM: 'Sep',
			title: 'Pentas Seni Tahunan',
			excerpt:
				'Penampilan dari klub musik, tari tradisional, paduan suara, dan teater siswa di Aula Utama. Tiket gratis untuk wali murid.',
			image:
				'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop',
			time: '19:00 WITA',
			loc: 'Aula Utama'
		}
	];
</script>

<svelte:head>
	<title>SMP 1 Anggana — Pendidikan Bermakna untuk Generasi Cemerlang</title>
	<meta
		name="description"
		content="Website resmi SMP 1 Anggana. Sekolah menengah dengan komitmen pada keunggulan akademik, karakter, dan inovasi."
	/>
</svelte:head>

<FloatingNavbar />

<main class="overflow-x-clip">
	<Hero />

	<!-- ========================================================
	     ABOUT — split with stats overlay
	======================================================== -->
	<section id="tentang" class="py-20 md:py-28 px-4 md:px-8">
		<div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
			<div use:reveal={{ from: 'left' }} class="relative order-2 lg:order-1">
				<div class="parallax-clip mask-organic relative aspect-[4/5] bg-slate-100">
					<img
						use:parallax={{ speed: 0.18 }}
						src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
						alt="Lingkungan belajar SMP 1 Anggana"
						loading="lazy"
						class="parallax-img"
					/>
				</div>

				<!-- Floating stat card overlay -->
				<div
					use:parallax={{ speed: -0.06 }}
					class="absolute -bottom-8 left-4 md:left-auto md:right-[-20px]
					       bg-white rounded-3xl shadow-2xl shadow-slate-300/50
					       border border-slate-100 p-6 max-w-[260px]"
				>
					<div class="flex items-center gap-3">
						<div class="w-12 h-12 rounded-2xl bg-primary/5 grid place-items-center text-primary">
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 14l9-5-9-5-9 5 9 5z" />
								<path d="M12 14l6.16-3.422A12 12 0 0 1 12 21a12 12 0 0 1-6.16-10.422L12 14z" />
							</svg>
						</div>
						<div>
							<div class="font-display font-extrabold text-3xl text-primary leading-none">40+</div>
							<div class="text-xs text-slate-500 font-medium mt-1">Tahun mendidik</div>
						</div>
					</div>
				</div>

				<div
					aria-hidden="true"
					use:parallax={{ speed: 0.08 }}
					class="absolute -top-6 -left-6 w-32 h-32 rounded-full
					       border-[8px] border-accent/15 -z-10"
				></div>
			</div>

			<div use:reveal={{ from: 'right', delay: 120 }} class="order-1 lg:order-2">
				<div class="text-xs font-bold uppercase tracking-widest text-accent">Tentang Kami</div>
				<h2 class="mt-3 font-display font-extrabold tracking-tight text-4xl md:text-5xl text-primary leading-tight">
					Membangun pelajar utuh sejak 1985
				</h2>
				<p class="mt-6 text-slate-600 text-base md:text-lg leading-relaxed">
					Kami percaya bahwa pendidikan terbaik memadukan keilmuan, karakter, dan keterampilan
					hidup. Dengan tenaga pendidik berpengalaman dan fasilitas yang terus diperbarui, kami
					menyiapkan siswa menghadapi tantangan global.
				</p>

				<div class="mt-8 grid sm:grid-cols-2 gap-4">
					{#each [
						{ icon: '🏆', title: 'Akreditasi A', desc: 'Predikat Unggul oleh BAN-S/M' },
						{ icon: '👨‍🏫', title: 'Rasio 1:18', desc: 'Pendampingan optimal per siswa' },
						{ icon: '🎯', title: '32+ Klub', desc: 'Ekstrakurikuler aktif setiap pekan' },
						{ icon: '🌏', title: 'Sister School', desc: 'Program pertukaran internasional' }
					] as item, i}
						<div
							use:reveal={{ from: 'up', delay: 200 + i * 80 }}
							class="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm
							       transition-all duration-300
							       hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
						>
							<div class="text-2xl">{item.icon}</div>
							<div class="mt-2 font-bold text-primary text-sm">{item.title}</div>
							<div class="text-xs text-slate-500 mt-1">{item.desc}</div>
						</div>
					{/each}
				</div>

				<div class="mt-10">
					<Button href="#program" variant="primary">Lihat Program Kami</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- ========================================================
	     PROGRAM — Bento grid
	======================================================== -->
	<div class="bg-surface-2">
		<ProgramBento {programs} />
	</div>

	<!-- ========================================================
	     BERITA — Carousel (Telkom-style)
	======================================================== -->
	<Carousel
		id="berita"
		eyebrow="Update Terbaru"
		title="Berita"
		subtitle="Simak lebih lengkap terkait aktivitas dan pencapaian SMP 1 Anggana."
		viewAllHref="/berita"
		viewAllLabel="Baca Selengkapnya"
	>
		{#each news as n}
			<NewsCard {...n} />
		{/each}
	</Carousel>

	<!-- ========================================================
	     ACARA — Featured + timeline list
	======================================================== -->
	<EventsTimeline {events} />

	<!-- ========================================================
	     CONTACT / CTA
	======================================================== -->
	<section id="kontak" class="py-20 md:py-28 px-4 md:px-8">
		<div class="max-w-7xl mx-auto">
			<div
				use:reveal={{ from: 'scale' }}
				class="relative bg-gradient-to-br from-primary to-primary-700 text-white
				       rounded-[2.5rem] overflow-hidden
				       px-8 md:px-16 py-16 md:py-24
				       shadow-2xl shadow-primary/30"
			>
				<div
					aria-hidden="true"
					use:parallax={{ speed: 0.2 }}
					class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
				></div>
				<div
					aria-hidden="true"
					use:parallax={{ speed: -0.15 }}
					class="absolute -bottom-40 -left-20 w-[28rem] h-[28rem] rounded-full bg-white/5 blur-3xl"
				></div>

				<div class="relative grid lg:grid-cols-2 gap-12 items-center">
					<div use:reveal={{ from: 'left', delay: 100 }}>
						<div class="text-xs font-bold uppercase tracking-widest text-accent">PPDB 2026/2027</div>
						<h2 class="mt-3 font-display font-extrabold tracking-tight text-4xl md:text-6xl leading-[1.05]">
							Mulai perjalanan akademik Anda di SMP 1 Anggana
						</h2>
						<p class="mt-6 text-white/80 text-lg leading-relaxed max-w-xl">
							Pendaftaran tahap pertama dibuka hingga 30 Juni 2026. Kunjungi sekolah kami atau
							hubungi tim PPDB untuk informasi lengkap.
						</p>

						<div class="mt-10 flex flex-wrap gap-4">
							<Button variant="accent" size="lg">Daftar Online</Button>
							<a
								href="tel:+625415550123"
								class="inline-flex items-center gap-3 px-7 py-3.5
								       text-white border border-white/25 rounded-full
								       font-semibold text-base
								       hover:bg-white hover:text-primary
								       transition-all duration-300"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
								</svg>
								(0541) 555-0123
							</a>
						</div>
					</div>

					<div use:reveal={{ from: 'right', delay: 200 }} class="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8">
						<h3 class="font-display font-bold text-2xl">Hubungi Kami</h3>
						<ul class="mt-6 space-y-5">
							{#each [
								{ icon: '📍', label: 'Alamat', value: 'Jl. Anggana Raya, Kutai Kartanegara, Kalimantan Timur' },
								{ icon: '✉', label: 'Email', value: 'info@smp1anggana.sch.id' },
								{ icon: '🕒', label: 'Jam Kantor', value: 'Senin – Jumat, 07:00 – 15:00 WITA' }
							] as c}
								<li class="flex gap-4">
									<div class="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center shrink-0 text-lg">
										{c.icon}
									</div>
									<div>
										<div class="text-xs uppercase tracking-wider text-white/65 font-semibold">{c.label}</div>
										<div class="mt-1 font-medium">{c.value}</div>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ========================================================
	     FOOTER
	======================================================== -->
	<Footer />
</main>
