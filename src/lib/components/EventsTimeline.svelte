<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { formatEventTime } from '$lib/utils/date';

	interface EventItem {
		category: string;
		date: string;
		dateD: string;
		dateM: string;
		title: string;
		excerpt: string;
		image: string;
		time?: string;
		loc?: string;
	}

	interface Props {
		events: EventItem[];
	}

	let { events }: Props = $props();

	let activeIndex = $state(0);
	const safeIndex = $derived(Math.min(activeIndex, Math.max(0, events.length - 1)));
	const featured = $derived(events[safeIndex] ?? events[0]);
</script>

<section id="acara" class="relative py-20 md:py-28 px-4 md:px-8 bg-primary text-white overflow-hidden scroll-mt-24">
	<!-- Modern architectural grid with cozy warm gradient ambient lighting -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-0">
		<!-- Precision grid pattern -->
		<div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_50%,transparent_100%)] opacity-75"></div>
		
		<!-- Cozy warm gradient highlights (amber-rose sunset tones for cozy prestige) -->
		<div class="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent blur-[100px]"></div>
		<div class="absolute -bottom-36 left-10 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-transparent blur-[100px]"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto">
		<!-- Header -->
		<div use:reveal class="grid lg:grid-cols-[1fr_auto] gap-6 md:gap-8 items-end mb-12 md:mb-16">
			<div class="max-w-2xl">
				<div class="text-xs font-bold uppercase tracking-widest text-accent">Agenda Sekolah</div>
				<h2 class="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-[1.1]">
					Acara mendatang yang patut dinanti
				</h2>
				<p class="mt-4 text-white/80 text-base md:text-lg leading-relaxed">
					Pilih satu agenda untuk melihat detail pelaksanaan, atau jelajahi rangkaian kegiatan akademik dan kesiswaan.
				</p>
			</div>
			<div class="hidden lg:flex items-center gap-2 text-white/70 text-sm font-semibold">
				<span class="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></span>
				<span>{events.length} Agenda Terjadwal</span>
			</div>
		</div>

		{#if events.length === 0}
			<!-- Empty State -->
			<div
				use:reveal
				class="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/15
				       p-10 md:p-16 text-center max-w-2xl mx-auto shadow-2xl"
			>
				<div class="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center mx-auto text-accent">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect x="3" y="4" width="18" height="18" rx="3" />
						<line x1="16" y1="2" x2="16" y2="6" />
						<line x1="8" y1="2" x2="8" y2="6" />
						<line x1="3" y1="10" x2="21" y2="10" />
					</svg>
				</div>
				<h3 class="mt-5 font-display font-bold text-2xl text-white">
					Belum Ada Agenda Mendatang
				</h3>
				<p class="mt-3 text-white/75 text-sm md:text-base leading-relaxed">
					Saat ini belum ada agenda baru yang dijadwalkan dalam waktu dekat. Silakan periksa kembali secara berkala atau hubungi pihak sekolah.
				</p>
				<div class="mt-6">
					<a
						href="#kontak"
						class="inline-flex min-h-[44px] items-center gap-2 px-6 py-2.5 rounded-2xl bg-accent text-white font-semibold text-sm
						       hover:bg-accent-600 transition-colors shadow-lg shadow-accent/20
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
					>
						Hubungi Sekolah
					</a>
				</div>
			</div>
		{:else if featured}
			<!-- Featured Event Showcase + Timeline Schedule -->
			<div class="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
				<!-- Featured Event Card (Clean rounded-3xl, ample breathing room so date is NEVER clipped) -->
				<div use:reveal={{ from: 'left' }} class="relative">
					<div
						class="relative overflow-hidden rounded-3xl sm:rounded-[2.25rem] border border-white/20
						       aspect-[4/3] sm:aspect-[16/11] bg-slate-900 shadow-2xl shadow-black/40 flex flex-col justify-between"
					>
						{#each events as e, i}
							<img
								src={e.image}
								alt={e.title}
								loading={i === safeIndex ? 'eager' : 'lazy'}
								class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
								style="opacity: {i === safeIndex ? 1 : 0};"
							/>
						{/each}

						<!-- Editorial Vignette overlay -->
						<div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20"></div>

						<!-- Top Header: Date Plaque & Category (Safe inside padding, zero clipping!) -->
						<div class="relative z-10 p-6 sm:p-8 flex items-start justify-between gap-4">
							<!-- Architectural Date Ticket Plaque -->
							<div
								class="flex items-center gap-3.5 bg-white text-primary
								       rounded-2xl px-4 py-2.5 shadow-xl shadow-black/30"
							>
								<span class="font-display font-extrabold text-2xl sm:text-3xl leading-none">
									{featured.dateD}
								</span>
								<div class="h-6 w-px bg-slate-200" aria-hidden="true"></div>
								<div class="flex flex-col">
									<span class="text-[11px] uppercase font-bold tracking-wider text-slate-600">
										{featured.dateM}
									</span>
									<span class="text-[10px] text-slate-400 font-medium">2026</span>
								</div>
							</div>

							<!-- Clean Category Label (No capsule chip pill) -->
							<div class="text-right">
								<span class="text-xs font-bold uppercase tracking-wider text-accent drop-shadow">
									{featured.category}
								</span>
							</div>
						</div>

						<!-- Bottom Info: Title, Excerpt, Venue & Time -->
						<div class="relative z-10 p-6 sm:p-8 text-white">
							<h3 class="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight text-white drop-shadow-sm">
								{featured.title}
							</h3>
							<p class="mt-3 text-white/85 text-sm sm:text-base max-w-xl leading-relaxed line-clamp-2">
								{featured.excerpt}
							</p>

							<div class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-white/85 pt-4 border-t border-white/15">
								{#if featured.time}
									<span class="inline-flex items-center gap-2">
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
											<circle cx="12" cy="12" r="10" />
											<path d="M12 6v6l4 2" />
										</svg>
										{formatEventTime(featured.time)}
									</span>
								{/if}
								{#if featured.loc}
									<span class="inline-flex items-center gap-2">
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
										{featured.loc}
									</span>
								{/if}
							</div>
						</div>
					</div>
				</div>

				<!-- Right Timeline Schedule (Clean interactive agenda list with cozy card highlights) -->
				<ol class="space-y-3">
					{#each events as e, i}
						<li use:reveal={{ from: 'right', delay: i * 70 }}>
							<button
								type="button"
								onclick={() => (activeIndex = i)}
								class="group w-full text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl
								       border transition-all duration-300
								       flex items-start gap-4 sm:gap-5
								       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
								       {i === safeIndex
										? 'bg-white/15 border-white/30 shadow-lg shadow-black/20'
										: 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}"
								aria-pressed={i === safeIndex}
							>
								<!-- Clean Calendar Plaque -->
								<div
									class="shrink-0 w-14 text-center rounded-2xl py-2.5 px-2 transition-all duration-300
									       {i === safeIndex
											? 'bg-accent text-white shadow-md shadow-accent/30'
											: 'bg-white/10 text-white group-hover:bg-white/20'}"
								>
									<div class="font-display font-extrabold text-xl leading-none">{e.dateD}</div>
									<div class="text-[10px] uppercase font-bold mt-1 tracking-wider opacity-90">
										{e.dateM}
									</div>
								</div>

								<!-- Content Summary -->
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
										<span class="{i === safeIndex ? 'text-accent' : 'text-white/70'}">{e.category}</span>
										{#if e.time}
											<span class="text-white/40">•</span>
											<span>{formatEventTime(e.time)}</span>
										{/if}
									</div>

									<h4
										class="mt-1.5 font-display font-bold text-base sm:text-lg leading-snug
										       transition-colors duration-200
										       {i === safeIndex ? 'text-white' : 'text-white/90 group-hover:text-white'}"
									>
										{e.title}
									</h4>

									{#if e.loc}
										<p class="mt-1.5 inline-flex items-center gap-1.5 text-xs text-white/70">
											<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
												<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
												<circle cx="12" cy="10" r="3" />
											</svg>
											{e.loc}
										</p>
									{/if}
								</div>

								<!-- Directional active indicator -->
								<div class="shrink-0 self-center">
									<svg
										class="w-5 h-5 transition-transform duration-300
										       {i === safeIndex ? 'text-accent translate-x-1' : 'text-white/25 group-hover:text-white/60'}"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
									>
										<path d="M9 18l6-6-6-6" />
									</svg>
								</div>
							</button>
						</li>
					{/each}
				</ol>
			</div>
		{/if}
	</div>
</section>
