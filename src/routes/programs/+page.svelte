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
	<title>Program Sekolah | SMPN 1 Anggana</title>
	<meta
		name="description"
		content="Jelajahi program akademik, karakter, seni, teknologi, olahraga, dan bahasa di SMPN 1 Anggana."
	/>
</svelte:head>

<FloatingNavbar />

<main
	class="min-h-screen [overflow-x:clip] bg-surface text-ink dark:bg-slate-950 dark:text-slate-100"
>
	<ProgramsHero programs={allPrograms} />
	<ProgramsList programs={allPrograms} />
</main>

<Footer />
