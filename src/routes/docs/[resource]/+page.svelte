<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const resource = $derived(data.resource);

	function pillClass(method: string) {
		const m = method.toLowerCase();
		return `docs-pill docs-pill-${m}`;
	}

	function authClass(auth: string) {
		return `docs-pill docs-pill-${auth}`;
	}

	function curlExample(method: string, path: string, auth: 'public' | 'admin') {
		const url = `http://localhost:5173${path.replace(':id', '1')}`;
		const lines: string[] = [`curl -X ${method} ${url} \\`];
		if (auth === 'admin') {
			lines.push('  -H "Authorization: Bearer $API_ADMIN_TOKEN" \\');
		}
		if (method !== 'GET' && method !== 'DELETE') {
			lines.push('  -H "Content-Type: application/json" \\');
			lines.push("  -d '{ ... }'");
		} else {
			// remove trailing backslash from last line
			lines[lines.length - 1] = lines[lines.length - 1].replace(/ \\$/, '');
		}
		return lines.join('\n');
	}
</script>

<svelte:head>
	<title>{resource.label} · API Docs</title>
</svelte:head>

<section class="docs-hero">
	<span class="docs-hero-eyebrow">Resource · {resource.slug}</span>
	<h1>{resource.label}</h1>
	<p>{resource.description}</p>
	<div class="docs-button-row">
		<a class="docs-button" href="/docs">← Kembali ke beranda docs</a>
	</div>
</section>

{#each resource.endpoints as e (e.id)}
	<article class="docs-endpoint" id={e.id}>
		<div class="docs-endpoint-head">
			<span class={pillClass(e.method)}>{e.method}</span>
			<span class="docs-path">{e.path}</span>
			<span class={authClass(e.auth)} style="margin-left:auto">
				{e.auth === 'admin' ? '🔐 admin' : 'public'}
			</span>
		</div>

		<p style="color:#cbd5e1;line-height:1.6;margin:0 0 0.5rem">{e.summary}</p>
		{#if e.description}
			<p style="color:#94a3b8;line-height:1.6;font-size:0.875rem">{e.description}</p>
		{/if}

		<p style="color:#64748b;font-size:0.75rem;margin-top:0.5rem">
			Rate limit: <strong style="color:#cbd5e1">{e.rateLimit.limit}</strong> requests /
			<strong style="color:#cbd5e1">{e.rateLimit.windowSec}s</strong>
		</p>

		{#if e.pathParams && e.pathParams.length > 0}
			<h3 style="color:#f1f5f9;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:1.25rem 0 0.5rem">
				Path parameters
			</h3>
			<table class="docs-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{#each e.pathParams as p}
						<tr>
							<td>
								<code>{p.name}</code>
								{#if p.required}<span class="docs-required">*required</span>{/if}
							</td>
							<td><code>{p.type}</code></td>
							<td>{p.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}

		{#if e.queryParams && e.queryParams.length > 0}
			<h3 style="color:#f1f5f9;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:1.25rem 0 0.5rem">
				Query parameters
			</h3>
			<table class="docs-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{#each e.queryParams as p}
						<tr>
							<td><code>{p.name}</code></td>
							<td><code>{p.type}</code></td>
							<td>{p.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}

		{#if e.requestBody && e.requestBody.length > 0}
			<h3 style="color:#f1f5f9;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:1.25rem 0 0.5rem">
				Request body
			</h3>
			<table class="docs-table">
				<thead>
					<tr>
						<th>Field</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{#each e.requestBody as p}
						<tr>
							<td>
								<code>{p.name}</code>
								{#if p.required}<span class="docs-required">*required</span>{/if}
							</td>
							<td><code>{p.type}</code></td>
							<td>{p.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}

		<h3 style="color:#f1f5f9;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:1.25rem 0 0.5rem">
			Example request
		</h3>
		<code class="docs-codeblock">{curlExample(e.method, e.path, e.auth)}</code>

		{#if e.responseExample}
			<h3 style="color:#f1f5f9;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin:1.25rem 0 0.5rem">
				Example response
			</h3>
			<code class="docs-codeblock">{JSON.stringify(e.responseExample, null, 2)}</code>
		{/if}
	</article>
{/each}
