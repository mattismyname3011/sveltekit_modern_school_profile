<script lang="ts">
	import { reveal } from "$lib/actions/reveal";
	import type { ProgramPreview } from "$lib/types/program";

	interface Props {
		program: ProgramPreview;
		index?: number;
		variant?: "featured" | "standard";
	}

	let { program, index = 0, variant = "standard" }: Props = $props();
	const isFeatured = $derived(variant === "featured");
	const cardClass = $derived(
		isFeatured
			? "group relative grid min-h-[clamp(28rem,48vw,42rem)] overflow-hidden rounded-[1.75rem] bg-[oklch(23%_0.071_246)] text-[oklch(97%_0.008_238)] no-underline shadow-2xl shadow-[oklch(23%_0.071_246_/_0.24)] [transition:transform_0.42s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.42s_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[6px] hover:shadow-[oklch(23%_0.071_246_/_0.34)] focus-visible:-translate-y-[6px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(72%_0.16_56_/_0.34)] max-[860px]:min-h-[24rem]"
			: "group relative grid h-full min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-[oklch(84%_0.021_238)] bg-[oklch(97%_0.008_238)] text-[oklch(22%_0.045_244)] no-underline shadow-[0_18px_54px_oklch(38%_0.08_244_/_0.11)] [transition:transform_0.36s_cubic-bezier(0.22,1,0.36,1),border-color_0.36s_cubic-bezier(0.22,1,0.36,1),box-shadow_0.36s_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[5px] hover:border-[oklch(67%_0.15_23_/_0.45)] hover:shadow-[0_26px_72px_oklch(38%_0.08_244_/_0.16)] focus-visible:-translate-y-[5px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[oklch(67%_0.15_23_/_0.18)]",
	);
	const figureClass = $derived(
		isFeatured
			? "absolute inset-0"
			: "absolute inset-x-3 top-3 h-[46%] overflow-hidden rounded-[1.1rem] bg-[oklch(91%_0.018_238)]",
	);
	const copyClass = $derived(
		isFeatured
			? "relative z-[1] flex min-h-full flex-col justify-end p-[clamp(1.35rem,3.4vw,2.6rem)]"
			: "relative z-[1] flex min-h-full flex-col justify-between gap-5 p-[clamp(1.1rem,2.4vw,1.55rem)] pt-[54%]",
	);
	const tagClass = $derived(
		isFeatured
			? "inline-flex w-fit items-center rounded-full border border-[oklch(96%_0.01_238_/_0.38)] bg-[oklch(97%_0.008_238_/_0.14)] px-3 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.08em]"
			: "inline-flex w-fit items-center rounded-full bg-[oklch(94%_0.018_238)] px-3 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-[oklch(32%_0.07_246)]",
	);
	const headingClass = $derived(
		isFeatured
			? "mb-0 mt-4 max-w-[11ch] text-[clamp(2.3rem,5vw,4.8rem)] font-[850] leading-[0.96] tracking-[0]"
			: "mb-0 mt-4 max-w-[14ch] text-[clamp(1.55rem,2.3vw,2.2rem)] font-[850] leading-[1.02] tracking-[0] text-[oklch(23%_0.071_246)]",
	);
	const excerptClass = $derived(
		isFeatured
			? "mb-0 mt-4 max-w-[34rem] text-[oklch(91%_0.01_238)] leading-[1.72]"
			: "mb-0 mt-3 max-w-[36ch] text-sm leading-[1.68] text-[oklch(43%_0.04_246)] line-clamp-3",
	);
	const ctaClass = $derived(
		isFeatured
			? "mt-6 inline-flex items-center gap-3 text-sm font-extrabold text-[oklch(78%_0.17_56)]"
			: "inline-flex items-center gap-2 text-sm font-extrabold text-[oklch(33%_0.08_246)]",
	);
</script>

<a
	use:reveal={{ delay: index * 70 }}
	class={cardClass}
	href={`/programs/${program.id}`}
	aria-label={`Buka program ${program.title}`}
>
	<figure class={figureClass}>
		<img
			class="h-full w-full object-cover [transition:transform_0.75s_cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-focus-visible:scale-[1.07]"
			src={program.image}
			alt={program.title}
			loading={isFeatured ? "eager" : "lazy"}
		/>
	</figure>

	{#if isFeatured}
		<div
			aria-hidden="true"
			class="absolute inset-0 [background:linear-gradient(180deg,transparent_22%,oklch(16%_0.04_244_/_0.86)_100%),linear-gradient(90deg,oklch(16%_0.04_244_/_0.56),transparent_72%)]"
		></div>
	{:else}
		<div
			aria-hidden="true"
			class="absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(180deg,oklch(97%_0.008_238_/_0),oklch(97%_0.008_238)_18%)]"
		></div>
	{/if}

	<div class={copyClass}>
		<div class="flex flex-wrap items-center gap-2">
			<div>
				<span class={tagClass}>{program.tag}</span>
				{#if isFeatured}
					<span
						class="inline-flex rounded-full bg-[oklch(75%_0.17_56)] px-3 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-[oklch(22%_0.045_244)]"
					>
						Unggulan
					</span>
				{/if}
			</div>
			<h2 class={headingClass}>
				{program.title}
			</h2>

			<p class={excerptClass}>
				{program.excerpt}
			</p>
		</div>

		<span class={ctaClass}>
			Lihat detail
			<span
				aria-hidden="true"
				class="grid size-8 place-items-center rounded-full bg-[currentColor] text-[oklch(97%_0.008_238)] [transition:transform_0.28s_cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
			>
				<span class="text-current [filter:invert(1)]">→</span>
			</span>
		</span>
	</div>
</a>
