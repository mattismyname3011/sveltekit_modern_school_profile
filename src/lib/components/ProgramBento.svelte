<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { ProgramPreview } from '$lib/types/program';

	interface Props {
		programs: ProgramPreview[];
	}

	let { programs }: Props = $props();
	const visiblePrograms = $derived(programs.slice(0, 4));
	const featured = $derived(visiblePrograms[0]);
	const secondaryPrograms = $derived(visiblePrograms.slice(1));
</script>

<section id="program" class="overflow-hidden py-20 md:py-28 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<!-- Header row -->
		<div use:reveal class="grid lg:grid-cols-[1fr_auto] gap-6 md:gap-8 items-end mb-12 md:mb-16">
			<div class="max-w-2xl">
				<div class="text-xs font-bold uppercase tracking-widest text-accent">Program Unggulan</div>
				<h2 class="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl text-primary dark:text-white leading-[1.1]">
					Tumbuh seimbang dalam ilmu, seni, dan karakter
				</h2>
				<p class="mt-4 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
					Pilar pembinaan terpadu yang dirancang untuk membentuk pelajar yang berdaya pikir kritis,
					berbudi pekerti luhur, dan siap menghadapi tantangan masa depan.
				</p>
			</div>
			<a
				href="/programs"
				class="link-underline inline-flex min-h-11 w-fit items-center gap-2 text-primary dark:text-white font-semibold text-sm md:text-base"
			>
				Lihat seluruh program
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
					<path d="M5 12h14M13 5l7 7-7 7" />
				</svg>
			</a>
		</div>

		{#if featured}
			<div class="space-y-6 md:space-y-8">
				<!-- Flagship Program (Editorial Split Banner) -->
				<a
					use:reveal
					href={`/programs/${featured.id}`}
					aria-label={`Buka program unggulan ${featured.title}`}
					class="group block overflow-hidden rounded-3xl border border-slate-200/80 bg-white text-primary
					       shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300
					       focus-visible:ring-4 focus-visible:ring-primary/20
					       dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-slate-700"
				>
					<div class="grid lg:grid-cols-12 items-stretch">
						<div class="relative overflow-hidden lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[18rem] sm:min-h-[22rem]">
							<img
								src={featured.image}
								alt={featured.title}
								loading="lazy"
								class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden"></div>
						</div>

						<div class="lg:col-span-5 p-7 sm:p-9 md:p-12 flex flex-col justify-between">
							<div>
								<div class="flex items-center gap-3">
									<span class="text-xs font-bold uppercase tracking-wider text-accent">
										{featured.tag}
									</span>
									<span class="text-xs text-slate-400 font-medium">
										Program Prioritas
									</span>
								</div>

								<h3 class="mt-3 font-display font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl text-primary dark:text-white leading-tight">
									{featured.title}
								</h3>

								<p class="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
									{featured.excerpt}
								</p>
							</div>

							<div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
								<span class="text-sm font-bold text-primary dark:text-accent group-hover:underline">
									Pelajari selengkapnya
								</span>
								<svg
									class="w-5 h-5 text-primary dark:text-accent transition-transform duration-300 group-hover:translate-x-1"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
								>
									<path d="M5 12h14M13 5l7 7-7 7" />
								</svg>
							</div>
						</div>
					</div>
				</a>

				<!-- Secondary Programs (Balanced 3-column row) -->
				{#if secondaryPrograms.length > 0}
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
						{#each secondaryPrograms as p, i}
							<a
								use:reveal={{ delay: (i + 1) * 70 }}
								href={`/programs/${p.id}`}
								aria-label={`Buka program ${p.title}`}
								class="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white
								       shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300
								       focus-visible:ring-4 focus-visible:ring-primary/20
								       dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
							>
								<div class="relative overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-800">
									<img
										src={p.image}
										alt={p.title}
										loading="lazy"
										class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
									/>
								</div>

								<div class="p-6 md:p-7 flex-1 flex flex-col justify-between">
									<div>
										<div class="text-xs font-bold uppercase tracking-wider text-accent">
											{p.tag}
										</div>
										<h3 class="mt-2 font-display font-bold text-xl md:text-2xl text-primary dark:text-white leading-snug">
											{p.title}
										</h3>
										<p class="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
											{p.excerpt}
										</p>
									</div>

									<div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-primary dark:text-accent">
										<span>Rincian program</span>
										<svg
											class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.5"
											stroke-linecap="round"
										>
											<path d="M5 12h14M13 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
