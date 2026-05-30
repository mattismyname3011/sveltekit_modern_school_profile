<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { ProgramPreview } from '$lib/types/program';

	interface Props {
		program: ProgramPreview;
		index?: number;
	}

	let { program, index = 0 }: Props = $props();
	const facts = $derived(
		[
			{ label: 'Jadwal', value: program.schedule },
			{ label: 'Lokasi', value: program.location },
			{ label: 'Peserta', value: program.audience }
		].filter((item) => Boolean(item.value))
	);
</script>

<a
	use:reveal={{ from: index % 3 === 1 ? 'scale' : 'up', delay: index * 70 }}
	class="program-card group relative flex flex-col h-full min-h-[28rem] overflow-hidden rounded-[2rem] bg-[oklch(99%_0.005_238)] text-[oklch(22%_0.045_244)] no-underline shadow-[0_0_0_1px_oklch(92%_0.01_238),0_12px_40px_oklch(38%_0.08_244_/_0.06)] outline-none transition-all duration-500 custom-ease hover:-translate-y-2 hover:shadow-[0_0_0_1px_oklch(67%_0.15_23_/_0.2),0_24px_60px_oklch(38%_0.08_244_/_0.12)] focus-visible:-translate-y-2 focus-visible:shadow-[0_0_0_4px_oklch(67%_0.15_23_/_0.15),0_24px_60px_oklch(38%_0.08_244_/_0.12)] motion-reduce:transition-none"
	href={`/programs/${program.id}`}
	aria-label={`Buka program ${program.title}`}
>
	<figure class="relative m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-[oklch(94%_0.01_238)]">
		<img
			class="h-full w-full object-cover transition-transform duration-700 custom-ease group-hover:scale-105 group-focus-visible:scale-105"
			src={program.image}
			alt={program.title}
			loading="lazy"
		/>
		<div class="absolute top-4 left-4">
			<span class="inline-flex items-center rounded-full bg-[oklch(100%_0_0_/_0.9)] backdrop-blur-md px-3.5 py-1.5 text-[0.7rem] font-black uppercase tracking-widest text-[oklch(32%_0.07_246)] shadow-sm">
				{program.tag}
			</span>
		</div>
	</figure>

	<div class="flex flex-1 flex-col justify-between p-[clamp(1.25rem,3vw,2rem)]">
		<div class="space-y-[clamp(0.75rem,2vw,1rem)]">
			<h3 class="text-[clamp(1.5rem,2.5vw,2rem)] font-[900] leading-[1.1] tracking-tight text-[oklch(18%_0.06_246)] [text-wrap:balance]">
				{program.title}
			</h3>

			<p class="max-w-[40ch] text-[0.92rem] leading-relaxed text-[oklch(40%_0.03_246)] line-clamp-3">
				{program.excerpt}
			</p>
		</div>

		<div class="mt-8 space-y-6">

			<div class="flex items-center justify-between border-t border-[oklch(92%_0.01_238)] pt-5">
				<span class="text-sm font-black uppercase tracking-widest text-[oklch(35%_0.08_246)]">
					Lihat detail
				</span>
				<div class="grid size-10 place-items-center rounded-full bg-[oklch(32%_0.07_246)] text-white transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
					<span class="text-xl">→</span>
				</div>
			</div>
		</div>
	</div>
</a>

<style>
	.custom-ease {
		transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
	}
</style>
