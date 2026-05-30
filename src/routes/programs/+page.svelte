<script lang="ts">
	import FloatingNavbar from '$lib/components/FloatingNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ProgramsHero from '$lib/components/programs/ProgramsHero.svelte';
	import ProgramsList from '$lib/components/programs/ProgramsList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const allPrograms = $derived(data.programs);
</script>

<svelte:head>
	<title>Program Sekolah | SMP 1 Anggana</title>
	<meta
		name="description"
		content="Jelajahi program akademik, karakter, seni, teknologi, olahraga, dan bahasa di SMP 1 Anggana."
	/>
</svelte:head>

<FloatingNavbar />

<main
	class="programs-page min-h-screen [overflow-x:clip] bg-[linear-gradient(135deg,oklch(97%_0.009_238)_0%,oklch(92%_0.02_244)_52%,oklch(98%_0.01_18)_100%)] text-[oklch(22%_0.045_244)]"
>
	<ProgramsHero programs={allPrograms} />
	<ProgramsList programs={allPrograms} />
</main>

<Footer />
