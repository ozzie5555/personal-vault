# 🛡️ Personal Vault - Local Password Manager

Sebuah aplikasi pengelola kata sandi (*password manager*) berbasis web yang beroperasi 100% secara lokal (*offline*). Dibuat dengan antarmuka yang modern, elegan, dan sistem keamanan *hashing* untuk melindungi data kredensial Anda dari kebocoran internet.

## 🤔 Kenapa Project Ini Dibuat?

Project ini awalnya terinspirasi dari karya senior saya, **[mas ardhptr21](https://github.com/ardhptr21/password-manager)**, yang membuat *password manager* berbasis Django untuk menyelesaikan masalah pengelolaan *password* pribadi. 

Karena saya juga memiliki masalah yang sama (punya banyak akun dengan *password* yang berbeda-beda dan butuh tempat penyimpanan yang aman dari kebocoran internet), saya memutuskan untuk membangun versi saya sendiri. Alih-alih menggunakan Django, saya merakit ulang aplikasi ini dari nol menggunakan ekosistem *Fullstack JavaScript* modern untuk menambah pengetahuan dan menguji kemampuan *development* saya.

##  Fitur Utama
* 🔒 **100% Offline & Local**: Data disimpan murni di perangkat Anda menggunakan file SQLite. Tidak ada data yang dikirim ke *cloud* atau internet.
* 🔑 **Master Authentication**: Dilindungi oleh *Master Username* & *Password*. Sandi utama Anda dienkripsi menggunakan algoritma `bcrypt`.
* 💻 **Premium Dark UI**: Antarmuka *dark mode* kelas profesional layaknya aplikasi SaaS.
* ⚡ **Full CRUD**: Tambah, edit, hapus, dan kelola kredensial Anda dengan mudah.
* 📋 **Quick Actions**: Dilengkapi fitur *show/hide password* dan tombol *copy-to-clipboard* sekali klik.

##  Tech Stack
* **Framework**: [Next.js](https://nextjs.org/)
* **Database**: [SQLite](https://sqlite.org/) (via `better-sqlite3`)
* **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Security**: `bcryptjs`

---

##  Cara Instalasi / Menjalankan Project Ini

Untuk menjalankan *project* ini di komputer Anda (sebagai *local development*), ikuti langkah-langkah berikut:

### 1. Persiapan Awal (Install Node.js & Git)
Pastikan komputer Anda sudah terinstal **Node.js (Minimal versi 20.x)** dan **Git**.
Anda bisa mengeceknya dengan menjalankan *command* ini di terminal:
```bash
node -v
git --version

```

### 2. Clone / Download Project Ini

Buka terminal dan lakukan *clone repository* ini, lalu masuk ke dalam folder *project*-nya:

```bash
git clone [https://github.com/ozzie5555/ozzie-pass.git](https://github.com/ozzie5555/ozzie-pass.git)
cd ozzie-pass

```

### 3. Install Dependencies

Gunakan `npm` (otomatis terinstal bersama Node.js) untuk mengunduh semua *library* yang dibutuhkan:

```bash
npm install

```

### 4. Inisialisasi Database (Migrate)

Karena aplikasi ini menggunakan SQLite murni, Anda tidak perlu mengatur server *database* seperti MySQL. Cukup jalankan perintah ini untuk "mencetak" struktur *database* ke dalam file lokal:

```bash
npx drizzle-kit push

```

*(Perintah ini akan otomatis membuat file baru bernama `sqlite.db` di dalam folder project Anda. Di file inilah semua password Anda nanti akan disimpan dengan aman).*

### 5. Jalankan Aplikasi

Setelah *database* siap, nyalakan *local development server* dengan perintah:

```bash
npm run dev

```

Secara otomatis server akan berjalan. Buka *browser* Anda dan kunjungi:
👉 **`http://localhost:3000`** (atau port yang tertera di terminal jika port 3000 sedang terpakai).

### 6. Mulai Menggunakan Vault

* Saat pertama kali diakses, aplikasi akan meminta Anda melakukan **Vault Initialization**.
* Buatlah *Master Username* dan *Master Password* Anda.
* **PENTING**: Jangan sampai lupa *Master Password* ini, karena Anda akan membutuhkannya setiap kali ingin masuk ke *dashboard* aplikasi!

---

## 👨‍💻 Credits

* **Developed by**: [Itsmeozzie](https://github.com/ozzie5555?tab=overview&from=2026-02-01&to=2026-02-27)
* **Inspired by**: [ardhptr21](https://github.com/ardhptr21) (Thanks for the idea, Mas!)

*⚠️ Disclaimer: Aplikasi ini dirancang khusus untuk penggunaan lokal. File `sqlite.db` Anda berisi data sensitif. Pastikan file tersebut tidak ter-upload ke publik atau dibagikan kepada siapapun.*
EOF