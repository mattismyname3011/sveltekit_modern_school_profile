<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<!-- Navbar -->
 <div class="bg-base-100 justify-between fixed top-0 left-0 right-0">
	<div class="navbar max-w-3xl mx-auto justify-between">
		<!-- left side of navbar -->
		 <div class="">
			<a href="/" class="btn btn-ghost text-xl text-red-500">PokePage</a>
			<a href="/user" class="btn btn-ghost">My Page</a>
		 </div>
		 <!-- right side of navbar -->
	</div>
 </div>

{@render children()}
