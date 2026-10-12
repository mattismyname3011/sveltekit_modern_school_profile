<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ScrollProgress />

<!-- Full-page cozy ambient warm gradient lighting -->
<div aria-hidden="true" class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
	<div class="absolute -top-40 right-1/4 w-[750px] h-[750px] rounded-full bg-gradient-to-br from-amber-500/10 via-rose-500/8 to-transparent blur-[140px] dark:from-amber-500/15 dark:via-rose-500/10"></div>
	<div class="absolute top-1/3 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-sky-500/10 via-indigo-500/8 to-transparent blur-[140px] dark:from-sky-500/15 dark:via-indigo-500/10"></div>
	<div class="absolute -bottom-40 right-10 w-[750px] h-[750px] rounded-full bg-gradient-to-tl from-rose-500/10 via-amber-500/8 to-transparent blur-[140px] dark:from-rose-500/15 dark:via-amber-500/10"></div>
</div>

<div class="relative z-10">
	{@render children()}
</div>
