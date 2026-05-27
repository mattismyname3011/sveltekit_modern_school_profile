<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import FloatingNavbar from '$lib/components/FloatingNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const program = $derived(data.program);
	const paragraphs = $derived(
		(program.post ?? program.excerpt)
			.split(/\n{2,}/)
			.map((paragraph) => paragraph.trim())
			.filter(Boolean)
	);

	const detailPageClass =
		"relative min-h-screen text-[oklch(22%_0.045_244)] [overflow-x:clip] [background:radial-gradient(circle_at_9%_13%,oklch(84%_0.055_54_/_0.34),transparent_30rem),radial-gradient(circle_at_90%_4%,oklch(72%_0.13_18_/_0.12),transparent_25rem),linear-gradient(135deg,oklch(97%_0.009_238),oklch(92%_0.02_244))] [padding:clamp(7rem,12vw,10rem)_clamp(1rem,4vw,4rem)_clamp(4rem,7vw,7rem)] max-[860px]:pt-[6.25rem]";
	const ambientBaseClass =
		'pointer-events-none absolute z-0 rounded-full [filter:blur(54px)]';
	const ambientOneClass =
		'top-[-9rem] left-[-8rem] h-[28rem] w-[28rem] bg-[oklch(23%_0.071_246_/_0.08)]';
	const ambientTwoClass =
		'right-[-10rem] bottom-[16rem] h-[24rem] w-[24rem] bg-[oklch(49%_0.18_18_/_0.08)]';
	const wordBandClass =
		'absolute left-[-1rem] z-0 select-none whitespace-nowrap uppercase text-[oklch(18%_0.04_244_/_0.04)] top-[clamp(5.5rem,11vw,8rem)] text-[clamp(5.2rem,14vw,12rem)] font-[850] leading-[0.85]';
	const heroClass =
		'relative z-[1] mx-auto grid max-w-[1280px] items-center gap-[clamp(1.5rem,5vw,4.5rem)] [grid-template-columns:minmax(0,0.92fr)_minmax(20rem,0.78fr)] max-[860px]:grid-cols-1';
	const imagePanelClass =
		'relative min-h-[clamp(26rem,62vw,44rem)] overflow-hidden [border-radius:9rem_1.75rem_9rem_1.75rem] bg-[oklch(18%_0.04_244)] [box-shadow:0_30px_90px_oklch(38%_0.08_244_/_0.24)] max-[860px]:min-h-[20rem] max-[860px]:rounded-[2rem]';
	const imageClass = 'absolute inset-0 h-full w-full object-cover';
	const imageShadeClass =
		'absolute inset-0 [background:linear-gradient(180deg,transparent_38%,oklch(16%_0.04_244_/_0.82)_100%),linear-gradient(90deg,oklch(16%_0.04_244_/_0.28),transparent_70%)]';
	const imageCaptionClass =
		'absolute bottom-[clamp(1.25rem,4vw,2.25rem)] left-[clamp(1.25rem,4vw,2.25rem)] right-[clamp(1.25rem,4vw,2.25rem)] flex flex-wrap items-center justify-between gap-4 text-[oklch(97%_0.008_238)]';
	const imageCaptionTagClass =
		'rounded-full border border-[oklch(92%_0.014_238_/_0.42)] bg-[oklch(97%_0.008_238_/_0.15)] px-[0.72rem] py-[0.42rem] text-[0.74rem] font-extrabold uppercase tracking-[0.08em]';
	const imageCaptionTitleClass = 'text-[clamp(1.25rem,3vw,2.25rem)] leading-none';
	const storyClass = 'py-[clamp(0.25rem,2vw,1rem)] pb-[clamp(0.5rem,2vw,2rem)]';
	const backLinkClass =
		'mb-[clamp(1.5rem,4vw,2.5rem)] inline-flex items-center gap-[0.55rem] font-extrabold text-[oklch(35%_0.08_246)] no-underline [transition:color_0.25s_cubic-bezier(0.22,1,0.36,1),transform_0.25s_cubic-bezier(0.22,1,0.36,1)] hover:-translate-x-[3px] hover:text-[oklch(49%_0.18_18)] hover:outline-none focus-visible:-translate-x-[3px] focus-visible:text-[oklch(49%_0.18_18)] focus-visible:outline-none';
	const programMetaClass =
		'mb-[1.1rem] flex flex-wrap gap-2 text-[0.74rem] font-[850] uppercase tracking-[0.08em] text-[oklch(35%_0.076_246)]';
	const programMetaPillClass =
		'rounded-full border border-[oklch(78%_0.048_238)] bg-[oklch(98%_0.007_238_/_0.7)] px-[0.66rem] py-[0.42rem]';
	const titleClass =
		'm-0 max-w-[11ch] text-[clamp(3rem,7vw,7.2rem)] font-[850] leading-[0.92] tracking-[0] text-[oklch(23%_0.071_246)]';
	const excerptClass =
		'mb-0 max-w-[42rem] text-[clamp(1.08rem,1.5vw,1.32rem)] font-[650] leading-[1.65] text-[oklch(36%_0.052_246)] [margin-top:clamp(1.25rem,3vw,2rem)]';
	const bodyCopyClass =
		'max-w-[68ch] text-base leading-[1.82] text-[oklch(33%_0.035_246)] [margin-top:clamp(1.75rem,4vw,3rem)] [&_p]:m-0 [&_p+p]:mt-[1.1rem] [&_p:first-child::first-letter]:float-left [&_p:first-child::first-letter]:mr-2 [&_p:first-child::first-letter]:mt-[0.08rem] [&_p:first-child::first-letter]:text-[3.65rem] [&_p:first-child::first-letter]:font-[850] [&_p:first-child::first-letter]:leading-[0.86] [&_p:first-child::first-letter]:text-[oklch(23%_0.071_246)]';
	const closingPanelClass =
		'relative z-[1] mx-auto mt-[clamp(3rem,7vw,6rem)] grid max-w-[1280px] items-end gap-[clamp(1.5rem,4vw,3rem)] overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,oklch(23%_0.071_246),oklch(18%_0.055_246))] p-[clamp(1.5rem,4vw,3rem)] text-[oklch(97%_0.008_238)] [box-shadow:0_26px_80px_oklch(38%_0.08_244_/_0.22)] [grid-template-columns:minmax(0,1fr)_auto] after:absolute after:right-[-7rem] after:top-[-7rem] after:h-[20rem] after:w-[20rem] after:rounded-full after:bg-[oklch(49%_0.18_18_/_0.18)] after:content-[""] after:[filter:blur(24px)] max-[860px]:grid-cols-1 max-[860px]:rounded-[2rem]';
	const closingEyebrowClass =
		'relative z-[1] mb-[0.85rem] mt-0 uppercase text-[0.78rem] font-extrabold tracking-[0.14em] text-[oklch(74%_0.18_54)]';
	const closingTitleClass =
		'relative z-[1] m-0 max-w-[18ch] text-[clamp(2rem,4vw,4.25rem)] font-[850] leading-none';
	const contactLinkClass =
		'relative z-[1] inline-flex min-h-12 items-center justify-center rounded-full bg-[oklch(97%_0.008_238)] px-5 py-[0.85rem] font-extrabold text-[oklch(23%_0.071_246)] no-underline [transition:transform_0.25s_cubic-bezier(0.22,1,0.36,1),background_0.25s_cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[oklch(74%_0.18_54)] hover:outline-none focus-visible:-translate-y-0.5 focus-visible:bg-[oklch(74%_0.18_54)] focus-visible:outline-none';
</script>

<svelte:head>
	<title>{program.title} | Program Sekolah</title>
	<meta name="description" content={program.excerpt} />
</svelte:head>

<FloatingNavbar />

<main class={detailPageClass}>
	<div aria-hidden="true" class={`${ambientBaseClass} ${ambientOneClass}`}></div>
	<div aria-hidden="true" class={`${ambientBaseClass} ${ambientTwoClass}`}></div>
	<div aria-hidden="true" class={wordBandClass}>DETAIL · PROGRAM · DETAIL</div>

	<section class={heroClass}>
		<div use:reveal={{ from: 'left' }} class={imagePanelClass}>
			<img class={imageClass} src={program.image} alt={program.title} />
			<div class={imageShadeClass}></div>
			<div class={imageCaptionClass}>
				<span class={imageCaptionTagClass}>{program.tag}</span>
				<strong class={imageCaptionTitleClass}>SMP 1 Anggana</strong>
			</div>
		</div>

		<article use:reveal={{ from: 'right', delay: 120 }} class={storyClass}>
			<a class={backLinkClass} href="/programs" aria-label="Kembali ke daftar program">
				<span aria-hidden="true">←</span>
				Semua program
			</a>
			<div class={programMetaClass}>
				<span class={programMetaPillClass}>{program.tag}</span>
				<span class={programMetaPillClass}>ID {program.id}</span>
			</div>
			<h1 class={titleClass}>{program.title}</h1>
			<p class={excerptClass}>{program.excerpt}</p>

			<div class={bodyCopyClass}>
				{#each paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		</article>
	</section>

	<section use:reveal class={closingPanelClass} aria-label="Langkah berikutnya">
		<div>
			<p class={closingEyebrowClass}>Langkah Berikutnya</p>
			<h2 class={closingTitleClass}>Temukan bagaimana program ini hidup di kelas dan kegiatan sekolah.</h2>
		</div>
		<a href="/#kontak" class={contactLinkClass}>Hubungi sekolah</a>
	</section>
</main>

<Footer />
