<script lang="ts">
	type Props = {
		name?: string;
		value?: string;
		required?: boolean;
		label?: string;
		hint?: string;
		error?: string;
	};

	let {
		name = 'image',
		value = '',
		required = false,
		label,
		hint,
		error
	}: Props = $props();

	let currentUrl = $state('');
	let uploading = $state(false);
	let uploadError = $state<string | null>(null);
	let isDragging = $state(false);
	let fileInput = $state<HTMLInputElement | null>(null);

	$effect(() => {
		currentUrl = value ?? '';
	});

	async function uploadFile(file: File) {
		if (!file) return;

		// Client-side quick size validation (5 MB limit)
		if (file.size > 5 * 1024 * 1024) {
			uploadError = 'Ukuran gambar maksimal 5 MB.';
			return;
		}

		uploading = true;
		uploadError = null;

		try {
			const fd = new FormData();
			fd.append('file', file);

			const res = await fetch('/api/uploads', {
				method: 'POST',
				body: fd
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				uploadError = body?.error?.message ?? body?.message ?? 'Gagal mengunggah gambar.';
				return;
			}

			const result = await res.json();
			if (result?.data?.url) {
				currentUrl = result.data.url;
			} else {
				uploadError = 'Format respons upload tidak sesuai.';
			}
		} catch (err) {
			console.error('[ImageUpload]', err);
			uploadError = 'Koneksi gagal saat mengunggah gambar.';
		} finally {
			uploading = false;
			if (fileInput) fileInput.value = '';
		}
	}

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file) {
			uploadFile(file);
		}
	}

	function handlePick() {
		fileInput?.click();
	}

	function handleClear() {
		currentUrl = '';
		uploadError = null;
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		const file = e.dataTransfer?.files?.[0];
		if (file) {
			uploadFile(file);
		}
	}
</script>

<div class="adm-img-upload">
	<!-- Hidden input bound for standard HTML / SvelteKit Form Actions -->
	<input type="hidden" {name} value={currentUrl} />

	<!-- Hidden native file input -->
	<input
		bind:this={fileInput}
		type="file"
		accept="image/jpeg,image/png,image/webp,image/gif"
		class="sr-only"
		onchange={handleFileChange}
	/>

	{#if currentUrl}
		<div class="preview-box">
			<img src={currentUrl} alt="Preview" class="preview-img" />
			<div class="preview-actions">
				<button
					type="button"
					class="action-btn"
					onclick={handlePick}
					disabled={uploading}
					title="Ganti gambar dengan yang baru"
				>
					{uploading ? '⏳ Mengunggah…' : '🔄 Ganti gambar'}
				</button>
				<button
					type="button"
					class="action-btn action-btn-danger"
					onclick={handleClear}
					disabled={uploading}
					title="Hapus gambar saat ini"
				>
					🗑️ Hapus gambar
				</button>
			</div>
		</div>
	{:else}
		<button
			type="button"
			class="dropzone-btn"
			class:dragging={isDragging}
			class:uploading
			onclick={handlePick}
			ondragover={handleDragOver}
			ondragleave={handleDragLeave}
			ondrop={handleDrop}
			disabled={uploading}
		>
			{#if uploading}
				<div class="upload-indicator">
					<div class="spinner"></div>
					<span class="upload-text">Mengunggah gambar…</span>
				</div>
			{:else}
				<div class="dropzone-content">
					<div class="upload-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
							<circle cx="9" cy="9" r="2" />
							<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
						</svg>
					</div>
					<div class="dropzone-title">+ Tambah Cover Image</div>
					<div class="dropzone-subtitle">Klik atau seret file ke sini (JPG, PNG, WebP, GIF maks 5 MB)</div>
				</div>
			{/if}
		</button>
	{/if}

	{#if uploadError}
		<div class="field-error">{uploadError}</div>
	{/if}
	{#if error}
		<div class="field-error">{error}</div>
	{/if}
</div>

<style>
	.adm-img-upload {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.preview-box {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		max-height: 380px;
		border-radius: 0.75rem;
		overflow: hidden;
		background: rgba(15, 23, 42, 0.6);
		border: 1px solid rgba(148, 163, 184, 0.2);
		box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3);
	}

	.preview-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.preview-actions {
		position: absolute;
		bottom: 0.75rem;
		right: 0.75rem;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.45rem 0.75rem;
		border-radius: 0.5rem;
		background: rgba(2, 6, 23, 0.85);
		border: 1px solid rgba(148, 163, 184, 0.3);
		color: #f1f5f9;
		font-size: 0.8125rem;
		font-weight: 600;
		cursor: pointer;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: all 150ms ease;
	}

	.action-btn:hover:not(:disabled) {
		border-color: rgba(56, 189, 248, 0.6);
		background: rgba(15, 23, 42, 0.95);
		color: #38bdf8;
		transform: translateY(-1px);
	}

	.action-btn-danger:hover:not(:disabled) {
		border-color: rgba(244, 63, 94, 0.6);
		color: #fb7185;
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.dropzone-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 16 / 9;
		max-height: 320px;
		padding: 1.5rem;
		border: 2px dashed rgba(148, 163, 184, 0.25);
		border-radius: 0.75rem;
		background: rgba(15, 23, 42, 0.3);
		color: #94a3b8;
		cursor: pointer;
		text-align: center;
		transition: all 200ms ease;
	}

	.dropzone-btn:hover:not(:disabled) {
		border-color: rgba(56, 189, 248, 0.5);
		color: #38bdf8;
		background: rgba(56, 189, 248, 0.05);
	}

	.dropzone-btn.dragging {
		border-color: #38bdf8;
		color: #38bdf8;
		background: rgba(56, 189, 248, 0.12);
		transform: scale(1.005);
	}

	.dropzone-btn:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.dropzone-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.upload-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 9999px;
		background: rgba(56, 189, 248, 0.1);
		color: #38bdf8;
		margin-bottom: 0.25rem;
	}

	.dropzone-title {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #f1f5f9;
	}

	.dropzone-subtitle {
		font-size: 0.75rem;
		color: #64748b;
	}

	.upload-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.spinner {
		width: 2rem;
		height: 2rem;
		border: 3px solid rgba(56, 189, 248, 0.2);
		border-top-color: #38bdf8;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.upload-text {
		font-size: 0.875rem;
		font-weight: 600;
		color: #38bdf8;
	}

	.field-error {
		color: #fda4af;
		font-size: 0.75rem;
		font-weight: 600;
	}
</style>
