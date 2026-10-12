<script lang="ts">
	import FloatingNavbar from '$lib/components/FloatingNavbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ProgramBento from '$lib/components/ProgramBento.svelte';
	import EventsTimeline from '$lib/components/EventsTimeline.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const programs = $derived(data.programs);
	const news = $derived(data.news);
	const events = $derived(data.events);
	const ppdb = $derived(data.ppdb);
</script>

<svelte:head>
	<title>SMPN 1 Anggana: Pendidikan Bermakna untuk Generasi Cemerlang</title>
	<meta
		name="description"
		content="Website resmi SMPN 1 Anggana. Sekolah menengah dengan komitmen pada keunggulan akademik, karakter, dan inovasi."
	/>
</svelte:head>

<FloatingNavbar />

<main class="overflow-x-clip">
	<Hero />
	<AboutSection />
	<ProgramBento {programs} />

	<Carousel
		id="berita"
		eyebrow="Update Terbaru"
		title="Berita"
		subtitle="Simak lebih lengkap terkait aktivitas dan pencapaian SMPN 1 Anggana."
		viewAllHref="/berita"
		viewAllLabel="Baca Selengkapnya"
	>
		{#each news as n}
			<NewsCard {...n} href={`/berita/${n.slug}`} />
		{/each}
	</Carousel>

	<EventsTimeline {events} />
	<ContactSection {ppdb} />
</main>

<Footer />
