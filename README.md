# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.3 create --template minimal --types ts --add tailwindcss="plugins:none" --install npm poke-page
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Database (Postgres + Drizzle ORM)

Project ini pakai **PostgreSQL** sebagai database dan **Drizzle ORM** untuk schema, migration, dan query. Skema-nya ada di `src/lib/db/schema.ts` dengan tiga tabel: `programs`, `news`, dan `events`.

### 1. Install PostgreSQL

Download dari [postgresql.org/download](https://www.postgresql.org/download/) lalu install. Saat instalasi, set password untuk user `postgres` — **simpan password ini**, dipakai di langkah berikutnya.

Setelah install, pastikan binary Postgres ada di PATH (`createdb`, `psql`, dll). Di Windows, biasanya:

```
C:\Program Files\PostgreSQL\16\bin
```

Tambahkan folder itu ke environment variable `Path` (User), lalu **buka terminal baru** supaya PATH ter-refresh.

Verifikasi:

```sh
psql --version
```

### 2. Buat database

```sh
createdb -U postgres school_profile
```

Akan diminta password user `postgres`.

> Lupa password? Edit `pg_hba.conf` (di `C:\Program Files\PostgreSQL\16\data\pg_hba.conf` di Windows), ganti `scram-sha-256` jadi `trust` di baris IPv4/IPv6 local, restart service Postgres (`Restart-Service postgresql-x64-16` di PowerShell as Administrator), masuk pakai `psql -U postgres`, jalankan `ALTER USER postgres WITH PASSWORD 'baru';`, lalu **balikin** `pg_hba.conf` ke `scram-sha-256` dan restart sekali lagi.

### 3. Konfigurasi `.env`

Salin `.env.example` jadi `.env`, lalu isi `DATABASE_URL`:

```env
DATABASE_URL="postgres://postgres:PASSWORDMU@localhost:5432/school_profile"
```

Kalau password mengandung karakter spesial (`@`, `:`, `/`, `#`, dll.), URL-encode dulu — contoh `p@ss` jadi `p%40ss`.

Setelah `.env` terisi, jalankan sekali:

```sh
npx svelte-kit sync
```

biar SvelteKit regenerate tipe untuk `$env/static/private` (kalau lupa, TypeScript akan komplain `Module '"$env/static/private"' has no exported member 'DATABASE_URL'`).

### 4. Push schema ke database

```sh
npm run db:push
```

Ini bikin tabel `programs`, `news`, dan `events` di database `school_profile`. Pakai ini untuk development cepat. Kalau mau migration files yang ter-version (cocok untuk production), gunakan:

```sh
npm run db:generate    # bikin SQL migration di folder ./drizzle
npm run db:migrate     # apply migration ke database
```

### 5. Seed data awal

```sh
npm run db:seed
```

Script di `src/lib/db/seed.ts` akan **menghapus isi tabel** lalu memasukkan data contoh (programs, news, events). Aman dijalankan ulang kapan pun saat development.

### 6. Inspeksi data (opsional)

```sh
npm run db:studio
```

Buka Drizzle Studio di browser untuk lihat dan edit isi tabel secara visual.

### Struktur folder

```
src/lib/db/
├── schema.ts   # definisi tabel + tipe TypeScript
├── index.ts    # client Drizzle (import { db } from '$lib/db')
└── seed.ts     # script seed data awal
```

Pakai client-nya dari `+page.server.ts` / `+layout.server.ts` / `+server.ts`:

```ts
import { db } from '$lib/db';
import { programs } from '$lib/db/schema';

export const load = async () => {
  const rows = await db.select().from(programs);
  return { programs: rows };
};
```

### Script ringkas

| Perintah              | Fungsi                                         |
| --------------------- | ---------------------------------------------- |
| `npm run db:push`     | Sync schema langsung ke DB (dev workflow)      |
| `npm run db:generate` | Generate SQL migration ke `./drizzle`          |
| `npm run db:migrate`  | Apply migration files ke DB                    |
| `npm run db:seed`     | Reset & isi tabel dengan data contoh           |
| `npm run db:studio`   | Buka Drizzle Studio (UI buat lihat/edit data)  |
