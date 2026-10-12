<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { reveal } from '$lib/actions/reveal';
	import type { PpdbSetting } from '$lib/db/schema';

	interface Props {
		ppdb?: Partial<PpdbSetting> | null;
	}

	let { ppdb }: Props = $props();

	const statusLabels = {
		open: 'Pendaftaran Dibuka',
		closed: 'Pendaftaran Ditutup',
		coming_soon: 'Segera Dibuka',
		announcement: 'Pengumuman Hasil'
	} as const;

	const statusColor = $derived(
		ppdb?.status === 'open'
			? 'text-emerald-300'
			: ppdb?.status === 'coming_soon'
				? 'text-amber-300'
				: ppdb?.status === 'announcement'
					? 'text-sky-300'
					: 'text-rose-300'
	);

	const activeLabel = $derived(
		statusLabels[ppdb?.status as keyof typeof statusLabels] ?? statusLabels.closed
	);
</script>

<section id="kontak" class="py-20 md:py-28 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<div
			use:reveal={{ from: 'scale' }}
			class="relative bg-primary text-white
			       rounded-[2.5rem] overflow-hidden
			       px-8 md:px-16 py-16 md:py-20
			       shadow-2xl shadow-primary/30 border border-white/10"
		>
			<!-- Modern architectural grid texture + cozy warm ambient gradient lighting -->
			<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-0">
				<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_40%,transparent_100%)] opacity-70"></div>
				<div class="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent blur-[90px]"></div>
				<div class="absolute -bottom-36 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-transparent blur-[90px]"></div>
			</div>

			<div class="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
				<div use:reveal={{ from: 'left', delay: 80 }}>
					<!-- Clean editorial status header (NO pill chips) -->
					<div class="flex flex-wrap items-center gap-3">
						<span class="text-xs font-bold uppercase tracking-widest text-accent">
							{ppdb?.badgeText || 'PPDB 2026/2027'}
						</span>
						<span class="text-white/30" aria-hidden="true">•</span>
						<span class="text-xs font-bold uppercase tracking-wider {statusColor}">
							Status: {activeLabel}
						</span>
					</div>

					<h2 class="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight">
						{ppdb?.title || 'Mulai perjalanan akademik di SMPN 1 Anggana'}
					</h2>
					<p class="mt-5 text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
						{ppdb?.description ||
							'Pendaftaran peserta didik baru dibuka untuk lulusan SD/sederajat. Kunjungi sekretariat sekolah atau hubungi panitia PPDB untuk informasi lengkap.'}
					</p>

					{#if ppdb?.announcementNotes}
						<div class="mt-5 p-4 rounded-2xl bg-white/10 border border-white/15 text-sm text-white/90 leading-relaxed max-w-xl">
							<span class="font-bold text-accent">Catatan:</span> {ppdb.announcementNotes}
						</div>
					{/if}

					<div class="mt-8 flex flex-wrap gap-4">
						{#if ppdb?.ctaEnabled && ppdb?.ctaText}
							<Button
								href={ppdb.ctaLink}
								variant="accent"
								size="lg"
								target={ppdb.ctaLink?.startsWith('http') ? '_blank' : undefined}
							>
								{ppdb.ctaText}
								{#if ppdb.status === 'open'}
									<span aria-hidden="true" class="ml-1">↗</span>
								{/if}
							</Button>
						{/if}

						{#if ppdb?.secondaryCtaText && ppdb?.secondaryCtaLink}
							<a
								href={ppdb.secondaryCtaLink}
								class="inline-flex min-h-11 items-center gap-2.5 px-6 py-3
								       text-white border border-white/30 rounded-2xl
								       font-semibold text-sm sm:text-base
								       hover:bg-white hover:text-primary
								       transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
								</svg>
								{ppdb.secondaryCtaText}
							</a>
						{/if}
					</div>
				</div>

				<!-- Information & Secretariat Card (Clean SVG icons, zero emojis) -->
				<div use:reveal={{ from: 'right', delay: 150 }} class="bg-white/10 border border-white/15 rounded-3xl p-7 sm:p-8 backdrop-blur-sm">
					<h3 class="font-display font-bold text-xl sm:text-2xl">Sekretariat & Kontak</h3>
					<ul class="mt-6 space-y-6">
						<li class="flex gap-4">
							<div class="w-10 h-10 rounded-xl bg-white/15 grid place-items-center shrink-0 text-white" aria-hidden="true">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
							</div>
							<div>
								<div class="text-xs uppercase tracking-wider text-white/60 font-semibold">Alamat Sekolah</div>
								<div class="mt-1 text-sm font-medium leading-relaxed">
									JL. KUTAI NO. 137, Kec. Anggana, Kab. Kutai Kartanegara, Prov. Kalimantan Timur
								</div>
							</div>
						</li>

						<li class="flex gap-4">
							<div class="w-10 h-10 rounded-xl bg-white/15 grid place-items-center shrink-0 text-white" aria-hidden="true">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<rect x="2" y="4" width="20" height="16" rx="2" />
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
								</svg>
							</div>
							<div>
								<div class="text-xs uppercase tracking-wider text-white/60 font-semibold">Surat Elektronik</div>
								<div class="mt-1 text-sm font-medium">
									{ppdb?.contactEmail || 'info@smp1anggana.sch.id'}
								</div>
							</div>
						</li>

						<li class="flex gap-4">
							<div class="w-10 h-10 rounded-xl bg-white/15 grid place-items-center shrink-0 text-white" aria-hidden="true">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="10" />
									<polyline points="12 6 12 12 16 14" />
								</svg>
							</div>
							<div>
								<div class="text-xs uppercase tracking-wider text-white/60 font-semibold">Jam Pelayanan</div>
								<div class="mt-1 text-sm font-medium">
									{ppdb?.officeHours || 'Senin sampai Jumat, 07:00 - 15:00 WITA'}
								</div>
							</div>
						</li>

						{#if ppdb?.contactWhatsapp}
							<li class="flex gap-4">
								<div class="w-10 h-10 rounded-xl bg-white/15 grid place-items-center shrink-0 text-white" aria-hidden="true">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
									</svg>
								</div>
								<div>
									<div class="text-xs uppercase tracking-wider text-white/60 font-semibold">WhatsApp Panitia</div>
									<div class="mt-1 text-sm font-medium">{ppdb.contactWhatsapp}</div>
								</div>
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
