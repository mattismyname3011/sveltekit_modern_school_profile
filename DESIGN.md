# DESIGN.md: SMPN 1 Anggana

> Arah desain ini ditulis oleh agent atas pilihan pemilik (jalur 2 wizard antislop).
> Peringatan jujur: gaya buatan agent cenderung ke selera default AI, yaitu hal yang
> disaring antislop, jadi hasil berisiko monoton. Brief singkat pemilik di bawah
> dipakai sebagai jangkar agar tidak jatuh ke default.

## Brief pemilik

- Kesan: ramah dan merangkul
- Audience: seimbang (publik awam + admin internal)
- Mood: tenang dan bersih

## Design Read

Reading this as: situs profil sekolah negeri untuk orang tua awam dan admin internal,
dengan bahasa visual yang tenang dan merangkul, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

## Dials

- ENERGY 2 (balanced): menyapa dengan hangat, tidak berteriak. Satu focal point per layar.
- RHYTHM 2 (consistent with a few breaks): struktur konsisten agar orang awam tidak tersesat,
  dengan sedikit variasi antar section agar tidak monoton.
- MOTION 2 (scroll-reveal, transitions): gerak hover/focus + reveal sekali jalan saat
  scroll (sudah ada via action `reveal`), tanpa loop tanpa akhir.
  Hormati `prefers-reduced-motion`. Tanpa loop tanpa akhir.

## Identitas

- Sekolah negeri yang dekat: bahasa Indonesia sehari-hari, tanpa buzzword,
  tanpa klaim tanpa bukti, tanpa emoji dekoratif di UI.
- Motif identitas: garis lengkung organik ("mask-organic") yang sudah ada dipertahankan
  sebagai satu-satunya gestur dekoratif yang diulang. Alasan satu baris: lengkung organik
  terasa merangkul dan membedakan dari template kotak generik (R-20, R-31).

## Palet (2 core + 1 aksen + netral, R-29)

- Core: navy `#0b2e4f` (kepala, brand, teks penting). Alasan: otoritas sekolah yang tenang.
- Core kedua: putih / surface `#f7f8fb` (latar). Alasan: lapang dan bersih untuk orang awam.
- Aksen: rose `#e11d48`, dipakai hanya di momen kunci (CTA utama, status penting).
  Alasan: satu aksen agar titik aksi selalu jelas (satu aksen disengaja, Part 3).
- Netral (tidak dihitung): ink `#0f172a`, muted `#64748b`, garis `#e5e7eb`.
- Tidak ada gradien biru-ungu generik (R-01). Tidak ada glow (R-13).

## Tipografi (R-06)

- Utama: 'Sunghyun Sans' (open-source, SIL OFL 1.1, self-hosted di `static/fonts/`,
  lisensi di `static/fonts/OFL.txt`), fallback 'Plus Jakarta Sans', system-ui, sans-serif.
  Alasan satu baris: bentuk rounded-nya membawa kesan merangkul sesuai brief,
  dan fallback menjaga keterbacaan bila font gagal dimuat.
- Catatan nama: pemilik menyebut "Suhyun Sans"; font yang benar-benar ada dan
  diunduh (atas izin pemilik) adalah "Sunghyun Sans" karya Sunghyun Cho
  (github.com/anaclumos/sunghyun-sans, berbasis Pretendard). Hanya family Latin
  yang dipakai (5 weight, 400-800) agar ringan; konten situs berbahasa Indonesia.
- Display memakai keluarga yang sama, bukan font kedua. Alasan: satu suara tipografi
  lebih tenang untuk audience awam.
- Skala fluid `clamp()` agar mobile punya register sendiri (skill layoutmobile).

## Radius, bayangan, kaca (R-10, R-11, R-12)

- Radius: 3 langkah saja (kecil 10px, sedang 18px, besar 28px). Tombol bukan pil penuh.
  Alasan: radius sebagai hierarki, bukan dekorasi seragam.
- Bayangan: hanya untuk elemen terangkat (navbar melayang, kartu unggulan). Alasan:
  elevasi menandai foreground, bukan default tiap komponen.
- Kaca (glassmorphism): maksimal 1 elemen (navbar). Alasan: satu permukaan fokus.

## Komponen

- Tombol: selalu punya `type`, state `disabled`, dan panah hanya untuk aksi keluar/maju
  yang butuh isyarat arah (R-08, R-26).
- Kartu: variasi mengikuti hierarki konten, bukan copy-paste seragam (R-14).
- Navigasi: tiap item punya tujuan nyata; tidak ada link mati (R-24).
- State: tiap tampilan data punya kosong, muat, dan gagal (R-27).
- Fokus: tiap elemen interaktif punya `:focus-visible` 3:1 (R-32).
- Sentuh: target minimal 44px dengan jarak (R-03).

## Nada tulisan (skill copywriting)

- Kalimat pendek, kata kerja nyata, tanpa em dash (R-02), tanpa CTA generik (R-15),
  tanpa buzzword (R-16). Fakta hanya yang terverifikasi; sisanya placeholder jujur (R-38).
