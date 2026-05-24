/**
 * Seed script — run with: npm run db:seed
 *
 * Note: this file is run via `tsx` outside SvelteKit, so it loads
 * environment variables itself instead of using $env/static/private.
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { events, news, programs } from './schema';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set. Copy .env.example to .env and fill it in.');
}

const client = postgres(DATABASE_URL, { prepare: false });
const db = drizzle(client, { schema });

const programSeed: (typeof programs.$inferInsert)[] = [
	{
		tag: 'Akademik',
		title: 'Sains & Laboratorium',
		excerpt:
			'Pembelajaran berbasis eksperimen dengan laboratorium IPA modern untuk menumbuhkan rasa ingin tahu siswa.',
		image:
			'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1400&auto=format&fit=crop',
		post: null
	},
	{
		tag: 'Teknologi',
		title: 'Coding & Robotik',
		excerpt:
			'Kurikulum digital yang membekali siswa dengan keterampilan coding, robotika, dan literasi data.',
		image:
			'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
		post: null
	},
	{
		tag: 'Seni',
		title: 'Musik & Pertunjukan',
		excerpt: 'Wadah ekspresi melalui ansambel musik, paduan suara, dan pentas seni tahunan.',
		image:
			'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
		post: null
	},
	{
		tag: 'Olahraga',
		title: 'Pembinaan Atlet',
		excerpt:
			'Pelatihan terstruktur di basket, futsal, bulutangkis, dan kompetisi rutin antar sekolah.',
		image:
			'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
		post: null
	},
	{
		tag: 'Karakter',
		title: 'Pramuka & Kepemimpinan',
		excerpt:
			'Pendidikan karakter terintegrasi: kemandirian, kerja sama, dan kepemimpinan siswa.',
		image:
			'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
		post: null
	},
	{
		tag: 'Bahasa',
		title: 'Klub Bahasa Inggris',
		excerpt:
			'Praktik percakapan, debat, dan public speaking untuk membangun kepercayaan diri global.',
		image:
			'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
		post: null
	}
];

const newsSeed: (typeof news.$inferInsert)[] = [
	{
		category: 'Prestasi',
		date: '12 Mei 2026',
		title: 'Tim Robotik Raih Juara 2 Tingkat Provinsi',
		excerpt:
			'Lima siswa SMP 1 Anggana berhasil membawa pulang trofi setelah final ketat di Samarinda. Mereka mengalahkan 24 sekolah lainnya.',
		image:
			'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
	},
	{
		category: 'Akademik',
		date: '8 Mei 2026',
		title: 'Kurikulum STEAM Diluncurkan Tahun Ini',
		excerpt:
			'Kurikulum baru memadukan Science, Technology, Engineering, Arts, dan Mathematics dengan proyek lintas mata pelajaran.',
		image:
			'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop'
	},
	{
		category: 'Kegiatan',
		date: '4 Mei 2026',
		title: 'Bakti Sosial Siswa di Desa Sungai Mariam',
		excerpt:
			'Pengabdian masyarakat sebagai bagian dari pendidikan karakter, melibatkan 120 siswa kelas IX dalam tiga hari kegiatan.',
		image:
			'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
	},
	{
		category: 'Olahraga',
		date: '28 Apr 2026',
		title: 'Tim Basket Sekolah Lolos ke Final Daerah',
		excerpt:
			'Setelah semifinal yang dramatis melawan SMP 5 Tenggarong, tim putra sekolah memastikan tiket ke final tingkat kabupaten.',
		image:
			'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop'
	},
	{
		category: 'Sekolah',
		date: '20 Apr 2026',
		title: 'Renovasi Lab Komputer Selesai Dilakukan',
		excerpt:
			'Fasilitas baru dengan 36 unit komputer dan jaringan fiber optik siap digunakan untuk pembelajaran semester depan.',
		image:
			'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop'
	}
];

const eventsSeed: (typeof events.$inferInsert)[] = [
	{
		date: '12 Jun 2026',
		dateDay: '12',
		dateMonth: 'Jun',
		title: 'Seminar Inovasi Pelajar Nasional',
		excerpt:
			'Menghadirkan tiga pembicara utama dari startup tech Indonesia. Terbuka untuk siswa dan orang tua di Aula Utama.',
		image:
			'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1400&auto=format&fit=crop',
		time: '08:00 WITA',
		location: 'Aula Utama'
	},
	{
		date: '8 Jul 2026',
		dateDay: '08',
		dateMonth: 'Jul',
		title: 'Pekan Olahraga Antar Kelas',
		excerpt:
			'Lima cabang olahraga dan lebih dari 200 peserta. Acara puncak akan ditutup dengan pertandingan eksibisi alumni.',
		image:
			'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1400&auto=format&fit=crop',
		time: '07:30 WITA',
		location: 'Lapangan Sekolah'
	},
	{
		date: '2 Agu 2026',
		dateDay: '02',
		dateMonth: 'Agu',
		title: 'Coding & Robotic Workshop',
		excerpt:
			'Workshop intensif tiga hari mengenalkan Arduino dan Python kepada siswa kelas VIII di Lab Komputer baru.',
		image:
			'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
		time: '09:00 WITA',
		location: 'Lab Komputer'
	},
	{
		date: '17 Agu 2026',
		dateDay: '17',
		dateMonth: 'Agu',
		title: 'Upacara HUT RI ke-81',
		excerpt:
			'Upacara bendera dan rangkaian lomba kemerdekaan sepanjang hari di halaman sekolah. Dimulai pukul 07:00 WITA.',
		image:
			'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1400&auto=format&fit=crop',
		time: '07:00 WITA',
		location: 'Halaman Sekolah'
	},
	{
		date: '25 Sep 2026',
		dateDay: '25',
		dateMonth: 'Sep',
		title: 'Pentas Seni Tahunan',
		excerpt:
			'Penampilan dari klub musik, tari tradisional, paduan suara, dan teater siswa di Aula Utama. Tiket gratis untuk wali murid.',
		image:
			'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop',
		time: '19:00 WITA',
		location: 'Aula Utama'
	}
];

async function main() {
	console.log('🌱 Seeding database...');

	// Clear existing rows so the seed is idempotent during development
	await db.delete(events);
	await db.delete(news);
	await db.delete(programs);

	await db.insert(programs).values(programSeed);
	await db.insert(news).values(newsSeed);
	await db.insert(events).values(eventsSeed);

	console.log(
		`✅ Done. Inserted ${programSeed.length} programs, ${newsSeed.length} news, ${eventsSeed.length} events.`
	);

	await client.end();
}

main().catch(async (err) => {
	console.error('❌ Seed failed:', err);
	await client.end();
	process.exit(1);
});
