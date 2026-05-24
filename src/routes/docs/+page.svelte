<script lang="ts">
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData } = $props();
	const resources = $derived(data.registry.resources);
	const totalEndpoints = $derived(
		resources.reduce((acc, r) => acc + r.endpoints.length, 0)
	);
</script>

<section class="docs-hero">
	<span class="docs-hero-eyebrow">REST API · v1</span>
	<h1>API Documentation</h1>
	<p>
		Dokumentasi lengkap REST API untuk situs SMP 1 Anggana. Endpoint mencakup data programs,
		news, dan events, dengan validasi Zod, rate limiting per-IP, serta auth bearer token untuk
		operasi tulis.
	</p>
	<div class="docs-button-row">
		<a class="docs-button" href="/api/docs" target="_blank" rel="noopener">
			↗ Machine-readable spec
		</a>
		<a class="docs-button" href="#authentication">🔐 Authentication</a>
	</div>
</section>

<section class="docs-card">
	<h2>Base URL</h2>
	<p>Semua endpoint relatif terhadap base URL berikut:</p>
	<code class="docs-codeblock">https://&lt;host&gt;/api</code>
	<p>Untuk pengembangan lokal biasanya <code>http://localhost:5173/api</code>.</p>
</section>

<section class="docs-card" id="authentication">
	<h2>Authentication</h2>
	<p>
		Endpoint baca (<code>GET</code>) bersifat publik. Endpoint tulis (<code>POST</code>,
		<code>PATCH</code>, <code>DELETE</code>) memerlukan bearer token admin yang dikirim lewat
		header
		<code>Authorization</code>:
	</p>
	<code class="docs-codeblock">Authorization: Bearer &lt;API_ADMIN_TOKEN&gt;</code>
	<div class="docs-callout">
		<span>🔐</span>
		<div>
			Token dibandingkan secara <strong>constant-time</strong> di server untuk mencegah
			timing-attack. Set value-nya di <code>.env</code> sebagai <code>API_ADMIN_TOKEN</code>{' '}
			dengan minimal 16 karakter.
		</div>
	</div>
</section>

<section class="docs-card" id="response-envelope">
	<h2>Response envelope</h2>
	<p>Semua respons API dibungkus dengan envelope JSON yang konsisten:</p>
	<code class="docs-codeblock">{`// success
{ "ok": true, "data": ... }

// failure
{ "ok": false, "error": { "code": "BAD_REQUEST", "message": "...", "details": {} } }`}</code>
</section>

<section class="docs-card" id="rate-limiting">
	<h2>Rate limiting</h2>
	<p>
		Setiap endpoint punya budget rate-limit per-IP. Batas dan sisa quota dikembalikan via header:
	</p>
	<code class="docs-codeblock">{`X-RateLimit-Limit: 120
X-RateLimit-Remaining: 118
X-RateLimit-Reset: 42`}</code>
	<p>
		Bila melebihi, server membalas <code>429 TOO_MANY_REQUESTS</code> dengan header
		<code>Retry-After</code> dalam detik.
	</p>
</section>

<section class="docs-card">
	<h2>Resources</h2>
	<p>
		API memiliki <strong style="color:#f1f5f9">{resources.length}</strong> resource dengan total{' '}
		<strong style="color:#f1f5f9">{totalEndpoints}</strong> endpoint:
	</p>
	<div style="display:grid;gap:0.75rem;margin-top:1rem">
		{#each resources as r (r.slug)}
			<a
				href={`/docs/${r.slug}`}
				class="docs-button"
				style="justify-content:space-between;width:100%"
			>
				<span style="display:flex;flex-direction:column;align-items:flex-start;gap:0.125rem">
					<span style="font-weight:700;color:#f8fafc">{r.label}</span>
					<span style="font-size:0.75rem;color:#94a3b8">{r.description}</span>
				</span>
				<span style="font-size:0.75rem;color:#38bdf8;font-weight:700">
					{r.endpoints.length} endpoints →
				</span>
			</a>
		{/each}
	</div>
</section>
