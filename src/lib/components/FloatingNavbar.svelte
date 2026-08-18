<script lang="ts">
	import { onMount, tick } from "svelte";
	import { page } from "$app/state";

	interface NavItem {
		label: string;
		href: string;
	}
	interface Props {
		items?: NavItem[];
		brand?: string;
		ctaLabel?: string;
		ctaHref?: string;
	}

	let {
		items = [
			{ label: "Beranda", href: "/" },
			{ label: "Tentang", href: "/#tentang" },
			{ label: "Program", href: "/programs" },
			{ label: "Berita", href: "/berita" },
			{ label: "Kontak", href: "/#kontak" },
		],
		brand = "SMPN 1 Anggana",
		ctaLabel,
		ctaHref
	}: Props = $props();

	/**
	 * Hash-only links (`#tentang`) only work as in-page anchors when we're
	 * actually on the homepage. On any other route they would resolve
	 * against the current URL — clicking "Beranda" from `/berita/abc`
	 * would land at `/berita/abc#beranda`, which is wrong.
	 *
	 * Rewrite hash hrefs to absolute `/` + hash whenever we're not on the
	 * homepage; SvelteKit will navigate home and then scroll to the anchor.
	 */
	const onHome = $derived(page.url.pathname === "/");
	function resolveHref(href: string): string {
		if (!href.startsWith("#")) return href;
		return onHome ? href : "/" + href;
	}

	const ppdb = $derived(page.data?.ppdb as { status?: string; ctaText?: string; ctaLink?: string } | undefined);
	const activeCtaLabel = $derived(
		ctaLabel ?? (ppdb?.status === 'open' ? 'Daftar' : 'Info PPDB')
	);
	const activeCtaHref = $derived(
		ctaHref ?? (ppdb?.status === 'open' && ppdb?.ctaLink && ppdb.ctaLink.startsWith('http') ? ppdb.ctaLink : resolveHref("#kontak"))
	);
	const brandHref = $derived(onHome ? "#beranda" : "/");

	let listEl: HTMLUListElement | null = $state(null);
	let itemEls: HTMLAnchorElement[] = $state([]);
	let mobileOpen = $state(false);

	// Magic Pill state
	// `instant` snaps without sliding (used the very first appearance so the pill
	// doesn't grow from the corner). After that it slides smoothly.
	let pill = $state({ x: 0, w: 0, h: 0, visible: false, instant: false });
	let reducedMotion = $state(false);

	onMount(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		reducedMotion = mq.matches;
		const onChange = (e: MediaQueryListEvent) =>
			(reducedMotion = e.matches);
		mq.addEventListener("change", onChange);

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && mobileOpen) {
				mobileOpen = false;
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			mq.removeEventListener("change", onChange);
			window.removeEventListener("keydown", handleKeyDown);
		};
	});

	async function moveTo(i: number) {
		if (!listEl || !itemEls[i]) return;
		await tick();
		const list = listEl.getBoundingClientRect();
		const it = itemEls[i].getBoundingClientRect();
		const wasHidden = !pill.visible;
		pill = {
			x: it.left - list.left,
			w: it.width,
			h: it.height,
			visible: true,
			instant: wasHidden,
		};
	}
	function leave() {
		pill = { ...pill, visible: false, instant: false };
	}

	const transition = $derived(
		reducedMotion || pill.instant
			? "opacity 0.18s linear"
			: "transform 0.42s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.42s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease-out",
	);
</script>

<nav
	class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50
	       w-[min(96vw,960px)]"
	aria-label="Navigasi utama"
>
	<div
		class="flex items-center justify-between gap-3
		       rounded-full bg-white/90 backdrop-blur-lg
		       border border-slate-200
		       pl-5 pr-2 py-2
		       shadow-xl shadow-slate-300/40"
	>
		<!-- Brand -->
		<a href={brandHref} class="flex items-center gap-2.5 shrink-0 group">
			<span
				class="w-8 h-8 rounded-xl bg-primary text-white grid place-items-center
				       font-bold text-sm transition-transform duration-300 group-hover:rotate-6"
			>
				S1
			</span>
			<span
				class="hidden sm:block font-bold text-primary tracking-tight text-sm md:text-base"
			>
				{brand}
			</span>
		</a>

		<!-- Desktop Nav list -->
		<ul
			bind:this={listEl}
			onmouseleave={leave}
			onfocusout={(e) => {
				if (!listEl?.contains(e.relatedTarget as Node)) leave();
			}}
			class="relative hidden md:flex items-center"
		>
			<!-- Magic Pill -->
			<li
				aria-hidden="true"
				class="absolute top-0 left-0 pointer-events-none rounded-full
				       bg-slate-100 will-change-transform"
				style="
					transform: translate3d({pill.x}px, 0, 0);
					width: {pill.w}px;
					height: {pill.h}px;
					opacity: {pill.visible ? 1 : 0};
					transition: {transition};
				"
			></li>

			{#each items as item, i (item.href)}
				<li>
					<a
						bind:this={itemEls[i]}
						href={resolveHref(item.href)}
						onmouseenter={() => moveTo(i)}
						onfocus={() => moveTo(i)}
						class="relative z-10 inline-flex items-center
						       px-4 py-2 rounded-full
						       text-sm font-semibold text-slate-700
						       transition-colors duration-200 hover:text-primary
						       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Actions -->
		<div class="flex items-center gap-2">
			<!-- CTA -->
			<a
				href={activeCtaHref}
				class="inline-flex items-center gap-2 shrink-0
				       bg-primary hover:bg-primary-600 text-white
				       text-xs md:text-sm font-semibold
				       px-4 md:px-5 py-2.5 rounded-full
				       transition-all duration-300
				       shadow-lg shadow-primary/20
				       hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
			>
				{activeCtaLabel}
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<path d="M5 12h14M13 5l7 7-7 7" />
				</svg>
			</a>

			<!-- Mobile menu toggle button -->
			<button
				type="button"
				class="md:hidden w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 grid place-items-center transition-colors"
				aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav"
				onclick={() => (mobileOpen = !mobileOpen)}
			>
				{#if mobileOpen}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
						<path d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile dropdown menu -->
	{#if mobileOpen}
		<div
			id="mobile-nav"
			class="md:hidden mt-2 p-3 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-400/30 animate-in fade-in slide-in-from-top-2 duration-200"
		>
			<ul class="flex flex-col gap-1">
				{#each items as item}
					<li>
						<a
							href={resolveHref(item.href)}
							onclick={() => (mobileOpen = false)}
							class="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
						>
							<span>{item.label}</span>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
								<path d="M9 18l6-6-6-6" />
							</svg>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>
