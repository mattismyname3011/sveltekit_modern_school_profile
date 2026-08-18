<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Reactive form fields using Svelte 5 $state
	let status = $state('closed');
	let academicYear = $state('2026/2027');
	let badgeText = $state('PPDB 2026/2027');
	let title = $state('Mulai perjalanan akademik Anda di SMPN 1 Anggana');
	let description = $state('');
	let ctaText = $state('Hubungi Panitia');
	let ctaLink = $state('/#kontak');
	let ctaEnabled = $state(true);
	let secondaryCtaText = $state('');
	let secondaryCtaLink = $state('');
	let contactPhone = $state('');
	let contactWhatsapp = $state('');
	let contactEmail = $state('');
	let officeHours = $state('');
	let announcementNotes = $state('');
	let startDate = $state('');
	let endDate = $state('');
	let announcementDate = $state('');

	$effect(() => {
		if (data.settings) {
			status = data.settings.status;
			academicYear = data.settings.academicYear;
			badgeText = data.settings.badgeText;
			title = data.settings.title;
			description = data.settings.description;
			ctaText = data.settings.ctaText;
			ctaLink = data.settings.ctaLink;
			ctaEnabled = data.settings.ctaEnabled;
			secondaryCtaText = data.settings.secondaryCtaText ?? '';
			secondaryCtaLink = data.settings.secondaryCtaLink ?? '';
			contactPhone = data.settings.contactPhone ?? '';
			contactWhatsapp = data.settings.contactWhatsapp ?? '';
			contactEmail = data.settings.contactEmail ?? '';
			officeHours = data.settings.officeHours ?? '';
			announcementNotes = data.settings.announcementNotes ?? '';
			startDate = data.settings.startDate ?? '';
			endDate = data.settings.endDate ?? '';
			announcementDate = data.settings.announcementDate ?? '';
		}
	});

	let isSubmitting = $state(false);
	let showSuccessBanner = $state(false);

	const statusConfigs = {
		open: {
			label: 'Pendaftaran Dibuka',
			badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
			dotColor: 'bg-emerald-400',
			icon: '●',
			desc: 'Form pendaftaran aktif & menerima calon siswa baru.'
		},
		closed: {
			label: 'Pendaftaran Ditutup',
			badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
			dotColor: 'bg-rose-400',
			icon: '●',
			desc: 'Pendaftaran telah berakhir / belum dimulai.'
		},
		coming_soon: {
			label: 'Segera Dibuka',
			badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
			dotColor: 'bg-amber-400',
			icon: '●',
			desc: 'Masa sosialisasi & persiapan pembukaan gelombang.'
		},
		announcement: {
			label: 'Pengumuman Hasil',
			badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
			dotColor: 'bg-sky-400',
			icon: '●',
			desc: 'Tahap pengumuman seleksi & verifikasi daftar ulang.'
		}
	} as const;

	const currentStatusMeta = $derived(
		statusConfigs[status as keyof typeof statusConfigs] ?? statusConfigs.closed
	);

	function applyPreset(preset: 'closed' | 'open' | 'coming_soon' | 'announcement') {
		status = preset;
		if (preset === 'closed') {
			badgeText = `PPDB ${academicYear} Ditutup`;
			title = 'Mulai perjalanan akademik Anda di SMPN 1 Anggana';
			description = `Pendaftaran PPDB Tahun Ajaran ${academicYear} saat ini telah ditutup. Kunjungi sekolah kami atau hubungi tim PPDB untuk informasi lengkap pendaftaran berikutnya.`;
			ctaText = 'Hubungi Panitia';
			ctaLink = '/#kontak';
			ctaEnabled = true;
		} else if (preset === 'open') {
			badgeText = `PPDB ${academicYear} Dibuka`;
			title = 'Mulai perjalanan akademik Anda di SMPN 1 Anggana';
			description = `Pendaftaran peserta didik baru Tahun Ajaran ${academicYear} telah resmi dibuka. Daftarkan diri Anda secara online atau kunjungi sekretariat sekolah.`;
			ctaText = 'Daftar Online';
			ctaLink = 'https://ppdb.smp1anggana.sch.id';
			ctaEnabled = true;
		} else if (preset === 'coming_soon') {
			badgeText = `PPDB ${academicYear} Segera Dibuka`;
			title = 'Persiapkan Masa Depan Cemerlang di SMPN 1 Anggana';
			description = `Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran ${academicYear} akan segera dibuka. Siapkan berkas dan pantau informasi berkala di website resmi sekolah.`;
			ctaText = 'Lihat Persyaratan';
			ctaLink = '/#kontak';
			ctaEnabled = true;
		} else if (preset === 'announcement') {
			badgeText = `Pengumuman PPDB ${academicYear}`;
			title = 'Hasil Seleksi & Informasi Daftar Ulang';
			description = `Hasil seleksi calon peserta didik baru Tahun Ajaran ${academicYear} telah diumumkan. Silakan cek nomor pendaftaran dan ikuti jadwal daftar ulang.`;
			ctaText = 'Cek Hasil Seleksi';
			ctaLink = '/#kontak';
			ctaEnabled = true;
		}
	}
</script>

<svelte:head>
	<title>PPDB Settings · Admin SMPN 1 Anggana</title>
</svelte:head>

<div class="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
	<!-- Page Header -->
	<div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
		<div>
			<div class="flex items-center gap-3">
				<h1 class="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
					Pengaturan PPDB & Pendaftaran
				</h1>
				<span
					class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border {currentStatusMeta.badgeColor}"
				>
					<span class="w-2 h-2 rounded-full {currentStatusMeta.dotColor} animate-pulse"></span>
					{currentStatusMeta.label}
				</span>
			</div>
			<p class="mt-1 text-sm text-slate-400">
				Kontrol status penerimaan siswa baru, pesan pengumuman beranda, dan tombol aksi langsung secara real-time.
			</p>
		</div>

		<div class="text-xs text-slate-500">
			Terakhir diperbarui: {new Date(data.settings.updatedAt).toLocaleString('id-ID', {
				dateStyle: 'medium',
				timeStyle: 'short'
			})}
		</div>
	</div>

	{#if form?.ok || showSuccessBanner}
		<div
			class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center justify-between animate-in fade-in"
		>
			<div class="flex items-center gap-3">
				<span class="text-lg">✓</span>
				<span>Pengaturan PPDB berhasil disimpan dan langsung aktif di halaman depan!</span>
			</div>
			<a href="/" target="_blank" class="underline font-semibold hover:text-white">
				Lihat Halaman Depan ↗
			</a>
		</div>
	{/if}

	{#if form?.message}
		<div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
			{form.message}
		</div>
	{/if}

	<!-- Quick Preset Selector -->
	<div class="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
		<div class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
			<span>◧ Smart Presets (Pilih Alur Cepat)</span>
		</div>
		<p class="text-xs text-slate-500">
			Klik salah satu template di bawah untuk otomatis mengisi judul, deskripsi, dan tombol standar:
		</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
			<button
				type="button"
				onclick={() => applyPreset('closed')}
				class="p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1.5 {status ===
				'closed'
					? 'bg-rose-500/15 border-rose-500/50 text-white ring-1 ring-rose-500/30'
					: 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'}"
			>
				<div class="flex items-center gap-2">
					<span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
					<span class="text-sm font-bold text-white">Ditutup</span>
				</div>
				<span class="text-[11px] text-slate-400">Status saat ini (default)</span>
			</button>

			<button
				type="button"
				onclick={() => applyPreset('open')}
				class="p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1.5 {status ===
				'open'
					? 'bg-emerald-500/15 border-emerald-500/50 text-white ring-1 ring-emerald-500/30'
					: 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'}"
			>
				<div class="flex items-center gap-2">
					<span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
					<span class="text-sm font-bold text-white">Dibuka</span>
				</div>
				<span class="text-[11px] text-slate-400">Form pendaftaran online aktif</span>
			</button>

			<button
				type="button"
				onclick={() => applyPreset('coming_soon')}
				class="p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1.5 {status ===
				'coming_soon'
					? 'bg-amber-500/15 border-amber-500/50 text-white ring-1 ring-amber-500/30'
					: 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'}"
			>
				<div class="flex items-center gap-2">
					<span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
					<span class="text-sm font-bold text-white">Segera Dibuka</span>
				</div>
				<span class="text-[11px] text-slate-400">Tahap sosialisasi berkas</span>
			</button>

			<button
				type="button"
				onclick={() => applyPreset('announcement')}
				class="p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1.5 {status ===
				'announcement'
					? 'bg-sky-500/15 border-sky-500/50 text-white ring-1 ring-sky-500/30'
					: 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'}"
			>
				<div class="flex items-center gap-2">
					<span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
					<span class="text-sm font-bold text-white">Pengumuman</span>
				</div>
				<span class="text-[11px] text-slate-400">Daftar ulang & kelulusan</span>
			</button>
		</div>
	</div>

	<!-- Main Grid: Form & Live Preview -->
	<div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
		<!-- Configuration Form -->
		<form
			method="POST"
			action="?/save"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
					showSuccessBanner = true;
					setTimeout(() => (showSuccessBanner = false), 6000);
				};
			}}
			class="space-y-6 bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-slate-800"
		>
			<div class="space-y-4">
				<h2 class="text-lg font-bold text-white flex items-center gap-2">
					<span>1. Status & Identitas PPDB</span>
				</h2>

				<!-- Status Radio Group -->
				<div class="space-y-2">
					<label for="status" class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
						Status Utama
					</label>
					<select
						id="status"
						name="status"
						bind:value={status}
						class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
					>
						<option value="closed">🔴 Ditutup (Closed)</option>
						<option value="open">🟢 Dibuka (Open)</option>
						<option value="coming_soon">🟡 Segera Dibuka (Coming Soon)</option>
						<option value="announcement">🔵 Pengumuman Hasil (Announcement)</option>
					</select>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1.5">
						<label for="academicYear" class="block text-xs font-semibold text-slate-400">
							Tahun Ajaran
						</label>
						<input
							type="text"
							id="academicYear"
							name="academicYear"
							bind:value={academicYear}
							placeholder="2026/2027"
							required
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="badgeText" class="block text-xs font-semibold text-slate-400">
							Label Badge
						</label>
						<input
							type="text"
							id="badgeText"
							name="badgeText"
							bind:value={badgeText}
							placeholder="PPDB 2026/2027"
							required
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>

				<div class="space-y-1.5">
					<label for="title" class="block text-xs font-semibold text-slate-400">
						Judul Headline Banner
					</label>
					<input
						type="text"
						id="title"
						name="title"
						bind:value={title}
						required
						class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
					/>
				</div>

				<div class="space-y-1.5">
					<label for="description" class="block text-xs font-semibold text-slate-400">
						Deskripsi / Pesan Pengumuman
					</label>
					<textarea
						id="description"
						name="description"
						bind:value={description}
						rows="3"
						required
						class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
					></textarea>
				</div>
			</div>

			<!-- Section 2: CTA Actions -->
			<div class="space-y-4 pt-4 border-t border-slate-800">
				<h2 class="text-lg font-bold text-white flex items-center gap-2">
					<span>2. Tombol Aksi (Call To Action)</span>
				</h2>

				<div class="flex items-center gap-3">
					<input
						type="checkbox"
						id="ctaEnabled"
						name="ctaEnabled"
						bind:checked={ctaEnabled}
						class="w-5 h-5 rounded accent-primary-500 cursor-pointer"
					/>
					<label for="ctaEnabled" class="text-sm text-slate-300 font-medium cursor-pointer">
						Tampilkan Tombol Aksi Utama
					</label>
				</div>

				{#if ctaEnabled}
					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1.5">
							<label for="ctaText" class="block text-xs font-semibold text-slate-400">
								Label Tombol Utama
							</label>
							<input
								type="text"
								id="ctaText"
								name="ctaText"
								bind:value={ctaText}
								required
								class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>

						<div class="space-y-1.5">
							<label for="ctaLink" class="block text-xs font-semibold text-slate-400">
								Tautan Tombol Utama (URL / Anchor)
							</label>
							<input
								type="text"
								id="ctaLink"
								name="ctaLink"
								bind:value={ctaLink}
								placeholder="/#kontak atau https://..."
								required
								class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
						</div>
					</div>
				{/if}

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1.5">
						<label for="secondaryCtaText" class="block text-xs font-semibold text-slate-400">
							Teks Tombol Kedua (Opsional)
						</label>
						<input
							type="text"
							id="secondaryCtaText"
							name="secondaryCtaText"
							bind:value={secondaryCtaText}
							placeholder="(0541) 555-0123"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="secondaryCtaLink" class="block text-xs font-semibold text-slate-400">
							Tautan Tombol Kedua (tel: / wa: / https:)
						</label>
						<input
							type="text"
							id="secondaryCtaLink"
							name="secondaryCtaLink"
							bind:value={secondaryCtaLink}
							placeholder="tel:+625415550123"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>
			</div>

			<!-- Section 3: Contact & Desk Info -->
			<div class="space-y-4 pt-4 border-t border-slate-800">
				<h2 class="text-lg font-bold text-white flex items-center gap-2">
					<span>3. Kontak & Helpdesk PPDB</span>
				</h2>

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1.5">
						<label for="contactPhone" class="block text-xs font-semibold text-slate-400">
							Telepon Kantor
						</label>
						<input
							type="text"
							id="contactPhone"
							name="contactPhone"
							bind:value={contactPhone}
							placeholder="(0541) 555-0123"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="contactWhatsapp" class="block text-xs font-semibold text-slate-400">
							WhatsApp Hotline
						</label>
						<input
							type="text"
							id="contactWhatsapp"
							name="contactWhatsapp"
							bind:value={contactWhatsapp}
							placeholder="+6281234567890"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1.5">
						<label for="contactEmail" class="block text-xs font-semibold text-slate-400">
							Email PPDB
						</label>
						<input
							type="email"
							id="contactEmail"
							name="contactEmail"
							bind:value={contactEmail}
							placeholder="info@smp1anggana.sch.id"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="officeHours" class="block text-xs font-semibold text-slate-400">
							Jam Layanan
						</label>
						<input
							type="text"
							id="officeHours"
							name="officeHours"
							bind:value={officeHours}
							placeholder="Senin – Jumat, 07:00 – 15:00 WITA"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>
			</div>

			<!-- Section 4: Timeline & Notes (Optional) -->
			<div class="space-y-4 pt-4 border-t border-slate-800">
				<h2 class="text-lg font-bold text-white flex items-center gap-2">
					<span>4. Timeline / Catatan Tambahan (Opsional)</span>
				</h2>

				<div class="grid sm:grid-cols-3 gap-4">
					<div class="space-y-1.5">
						<label for="startDate" class="block text-xs font-semibold text-slate-400">
							Tanggal Mulai
						</label>
						<input
							type="text"
							id="startDate"
							name="startDate"
							bind:value={startDate}
							placeholder="1 Mei 2026"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="endDate" class="block text-xs font-semibold text-slate-400">
							Tanggal Selesai
						</label>
						<input
							type="text"
							id="endDate"
							name="endDate"
							bind:value={endDate}
							placeholder="30 Juni 2026"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="announcementDate" class="block text-xs font-semibold text-slate-400">
							Tanggal Pengumuman
						</label>
						<input
							type="text"
							id="announcementDate"
							name="announcementDate"
							bind:value={announcementDate}
							placeholder="5 Juli 2026"
							class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
					</div>
				</div>

				<div class="space-y-1.5">
					<label for="announcementNotes" class="block text-xs font-semibold text-slate-400">
						Catatan Khusus / Petunjuk
					</label>
					<textarea
						id="announcementNotes"
						name="announcementNotes"
						bind:value={announcementNotes}
						rows="2"
						placeholder="Contoh: Berkas fisik wajib diserahkan ke sekretariat pada jam kerja."
						class="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
					></textarea>
				</div>
			</div>

			<!-- Submit Button -->
			<div class="pt-6 border-t border-slate-800 flex items-center justify-end gap-4">
				<button
					type="submit"
					disabled={isSubmitting}
					class="px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-primary-600/30 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
				>
					{#if isSubmitting}
						<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
						<span>Menyimpan...</span>
					{:else}
						<span>💾 Simpan Perubahan</span>
					{/if}
				</button>
			</div>
		</form>

		<!-- Live Preview Rail -->
		<div class="sticky top-8 space-y-6">
			<div class="flex items-center justify-between">
				<h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
					<span>👁️ Live Preview (Tampilan Beranda)</span>
				</h2>
				<span class="text-[11px] text-slate-500">Otomatis Ter-update</span>
			</div>

			<!-- Simulated Homepage Banner -->
			<div
				class="relative bg-gradient-to-br from-[#0b2e4f] to-[#081e33] text-white
				       rounded-3xl overflow-hidden p-6 md:p-8
				       shadow-2xl border border-white/10"
			>
				<div class="space-y-4">
					<div class="flex items-center gap-2.5">
						<span class="text-xs font-bold uppercase tracking-widest text-[#f08519]">
							{badgeText || 'PPDB 2026/2027'}
						</span>
						<span
							class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border {currentStatusMeta.badgeColor}"
						>
							<span class="w-1.5 h-1.5 rounded-full {currentStatusMeta.dotColor}"></span>
							{currentStatusMeta.label}
						</span>
					</div>

					<h3 class="font-display font-extrabold text-xl md:text-2xl leading-tight text-white">
						{title || 'Mulai perjalanan akademik Anda di SMPN 1 Anggana'}
					</h3>

					<p class="text-white/80 text-xs md:text-sm leading-relaxed">
						{description || 'Pendaftaran PPDB saat ini telah ditutup.'}
					</p>

					<!-- Buttons -->
					<div class="flex flex-wrap items-center gap-3 pt-2">
						{#if ctaEnabled && ctaText}
							<div
								class="px-5 py-2.5 rounded-full bg-[#f08519] text-white text-xs font-bold shadow-md shadow-[#f08519]/20 inline-flex items-center gap-1.5"
							>
								<span>{ctaText}</span>
								{#if status === 'open'}
									<span>↗</span>
								{:else}
									<span>→</span>
								{/if}
							</div>
						{/if}

						{#if secondaryCtaText}
							<div
								class="px-4 py-2.5 rounded-full border border-white/25 text-white text-xs font-semibold inline-flex items-center gap-1.5"
							>
								<span>📞</span>
								<span>{secondaryCtaText}</span>
							</div>
						{/if}
					</div>

					<!-- Contact Preview Snippet -->
					<div class="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] text-white/70">
						<div>
							<div class="text-white/40 uppercase text-[9px] font-bold">Layanan</div>
							<div class="font-medium text-white/90 truncate">{officeHours || '07:00 – 15:00 WITA'}</div>
						</div>
						<div>
							<div class="text-white/40 uppercase text-[9px] font-bold">Email</div>
							<div class="font-medium text-white/90 truncate">{contactEmail || 'info@smp1anggana.sch.id'}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Simulated Navbar CTA Pill Preview -->
			<div class="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
				<div class="text-xs font-bold text-slate-400">Tampilan Tombol di Navbar:</div>
				<div class="flex items-center justify-between p-3 rounded-full bg-white/90 text-slate-800 text-xs font-medium">
					<span class="font-bold text-primary-900">SMPN 1 Anggana</span>
					<div class="flex items-center gap-2">
						<span
							class="px-3 py-1.5 rounded-full text-white text-[11px] font-bold transition-all {status ===
							'open'
								? 'bg-[#0b2e4f]'
								: 'bg-[#f08519]'}"
						>
							{status === 'open' ? 'Daftar' : ctaText || 'Info PPDB'} →
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
