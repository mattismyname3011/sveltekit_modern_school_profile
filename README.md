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

## API

REST endpoint dipasang di bawah `/api/*` dan dijalankan oleh SvelteKit server. Semua respons memakai envelope JSON yang konsisten:

```json
// success
{ "ok": true, "data": ... }

// failure
{ "ok": false, "error": { "code": "BAD_REQUEST", "message": "...", "details": {} } }
```

### Keamanan

| Lapis              | Implementasi                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Auth (write)       | Bearer token via header `Authorization: Bearer <API_ADMIN_TOKEN>`. Compare constant-time.          |
| Validasi           | Zod schema per resource — semua input divalidasi dan di-trim, URL wajib `http(s)`.                 |
| Body limit         | 32 KB per request. Ketolak `413` kalau lebih.                                                      |
| Content-Type       | Wajib `application/json` untuk write. Ketolak `415` kalau bukan.                                   |
| Rate limit         | Per-IP per-endpoint. Default: read 120/menit, write 20/menit. Header `X-RateLimit-*`.              |
| Method whitelist   | Hooks server menolak metode HTTP di luar daftar resmi sebelum mencapai handler.                    |
| Headers            | `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cache-Control: no-store`. |
| Error handling     | Error internal di-log server-side, client hanya menerima pesan generik (no leak).                  |

Set `API_ADMIN_TOKEN` di `.env` (minimal 16 karakter). Generate token kuat di PowerShell:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Endpoint: `programs`

| Method | Path                  | Auth  | Deskripsi                              |
| ------ | --------------------- | ----- | -------------------------------------- |
| GET    | `/api/programs`       | publik | List program, support pagination + filter |
| GET    | `/api/programs/:id`   | publik | Ambil satu program by id               |
| POST   | `/api/programs`       | admin | Buat program baru                      |
| PATCH  | `/api/programs/:id`   | admin | Update sebagian field program          |
| DELETE | `/api/programs/:id`   | admin | Hapus program                          |

#### Query params untuk list

| Param    | Tipe   | Default | Catatan                                       |
| -------- | ------ | ------- | --------------------------------------------- |
| `limit`  | int    | 20      | 1–100                                         |
| `offset` | int    | 0       | Untuk pagination                              |
| `tag`    | string | -       | Filter exact-match tag                        |
| `q`      | string | -       | Pencarian case-insensitive di title + excerpt |

#### Body untuk create / update

```ts
{
  title:   string,        // 1-160 char
  tag:     string,        // 1-60 char
  excerpt: string,        // 1-500 char
  image:   string,        // URL http(s), max 2048 char
  post?:   string | null  // optional, max 20000 char
}
```

`PATCH` menerima subset field yang sama (minimal salah satu harus dikirim).

#### Contoh pakai

```sh
# List
curl http://localhost:5173/api/programs

# List dengan filter
curl "http://localhost:5173/api/programs?tag=Akademik&limit=5"

# Detail
curl http://localhost:5173/api/programs/1

# Create (butuh token admin)
curl -X POST http://localhost:5173/api/programs `
  -H "Authorization: Bearer $env:API_ADMIN_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"title":"Klub Robotik","tag":"Teknologi","excerpt":"...","image":"https://example.com/x.jpg"}'

# Update
curl -X PATCH http://localhost:5173/api/programs/1 `
  -H "Authorization: Bearer $env:API_ADMIN_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{"excerpt":"Deskripsi baru"}'

# Delete
curl -X DELETE http://localhost:5173/api/programs/1 `
  -H "Authorization: Bearer $env:API_ADMIN_TOKEN"
```

### Struktur folder API

```
src/
├── hooks.server.ts                  # method allowlist + global security headers
├── lib/server/
│   ├── api/
│   │   ├── auth.ts                  # bearer token check (constant-time)
│   │   ├── parse.ts                 # JSON body reader + ID parser + body limit
│   │   ├── rate-limit.ts            # in-memory per-IP rate limiter
│   │   ├── response.ts              # ok() / fail() / ApiError helpers
│   │   └── schemas/
│   │       └── programs.ts          # Zod schemas
│   └── repositories/
│       └── programs.ts              # Drizzle queries (clean separation)
└── routes/api/programs/
    ├── +server.ts                   # GET (list), POST
    └── [id]/+server.ts              # GET, PATCH, DELETE
```

### Cara menambah resource baru (`news` / `events`)

Pola sama persis:

1. Tambah file `src/lib/server/api/schemas/<name>.ts` (Zod schema).
2. Tambah file `src/lib/server/repositories/<name>.ts` (query Drizzle).
3. Tambah route `src/routes/api/<name>/+server.ts` dan `src/routes/api/<name>/[id]/+server.ts`.

Helper `requireAdmin`, `rateLimit`, `readJson`, `parseId`, dan `ApiError` bisa dipakai langsung tanpa duplikasi.
