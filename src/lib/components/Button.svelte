<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'accent' | 'ghost' | 'white';
	type Size = 'md' | 'lg';

	interface Props {
		href?: string;
		target?: string;
		rel?: string;
		variant?: Variant;
		size?: Size;
		class?: string;
		/** Button type when rendered as <button>. Defaults to 'button' so it never submits by accident. */
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		/** Hide the direction arrow. Arrows signal movement, so text-only actions set this. */
		hideArrow?: boolean;
		ariaLabel?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		href,
		target,
		rel,
		variant = 'primary',
		size = 'md',
		class: klass = '',
		type = 'button',
		disabled = false,
		hideArrow = false,
		ariaLabel,
		onclick,
		children
	}: Props = $props();

	const variants: Record<Variant, string> = {
		primary:
			'bg-primary text-white hover:bg-primary-600 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
		accent:
			'bg-accent text-white hover:bg-accent-600 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30',
		ghost:
			'bg-transparent text-slate-800 border border-slate-300 hover:border-primary hover:text-primary',
		white: 'bg-white text-primary border border-slate-200 hover:border-primary shadow-md'
	};

	const sizes: Record<Size, string> = {
		md: 'px-5 py-2.5 text-sm min-h-[44px]',
		lg: 'px-7 py-3.5 text-base min-h-[48px]'
	};

	const base = `
		group inline-flex items-center justify-center gap-2
		font-semibold rounded-2xl
		transition-all duration-300
		hover:-translate-y-0.5
		focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2
		disabled:opacity-60 disabled:pointer-events-none disabled:transform-none
	`;
</script>

{#if href}
	<a {href} {target} {rel} aria-label={ariaLabel} aria-disabled={disabled || undefined} class="{base} {variants[variant]} {sizes[size]} {klass}">
		{@render children()}
		{#if !hideArrow}
			<svg
				aria-hidden="true"
				class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
			>
				<path d="M5 12h14M13 5l7 7-7 7" />
			</svg>
		{/if}
	</a>
{:else}
	<button {type} {disabled} aria-label={ariaLabel} {onclick} class="{base} {variants[variant]} {sizes[size]} {klass}">
		{@render children()}
		{#if !hideArrow}
			<svg
				aria-hidden="true"
				class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
			>
				<path d="M5 12h14M13 5l7 7-7 7" />
			</svg>
		{/if}
	</button>
{/if}
