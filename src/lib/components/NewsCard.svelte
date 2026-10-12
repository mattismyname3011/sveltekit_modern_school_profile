<script lang="ts">
	interface Props {
		category: string;
		date: string;
		title: string;
		excerpt: string;
		image: string;
		href: string;
	}

	let { category, date, title, excerpt, image, href }: Props = $props();
</script>

<a
	{href}
	class="group snap-start shrink-0
	       w-[280px] sm:w-[320px] md:w-[340px]
	       block rounded-3xl p-3 -m-3
	       transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-900/50
	       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
>
	<!-- Clean image frame without floating pill chips -->
	<div class="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[16/10] shadow-sm">
		<img
			src={image}
			alt={title}
			loading="lazy"
			class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
		/>
	</div>

	<!-- Editorial Typography & Metadata -->
	<div class="pt-4">
		<div class="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
			<span class="text-accent font-bold uppercase tracking-wider">{category}</span>
			<span class="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
			<span>{date}</span>
		</div>

		<h3
			class="mt-2 font-display font-bold text-lg md:text-xl text-primary dark:text-white
			       leading-snug transition-colors duration-200 group-hover:text-accent"
		>
			{title}
		</h3>
		<p class="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
			{excerpt}
		</p>
	</div>
</a>
