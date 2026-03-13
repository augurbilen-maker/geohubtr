# 🗺️ GeoHub TR — Kurulum Kılavuzu
*Türkiye Jeodezi & Haritacılık Hizmetleri Platformu*

## Gereksinimler

- **Node.js** 18+ (https://nodejs.org)
- **Docker** veya **PostgreSQL** 15+ (https://www.docker.com)
- **Git** (opsiyonel)

---

## Adım 1: Bağımlılıkları Yükle

```bash
cd b2b-marketplace
npm install
```

---

## Adım 2: PostgreSQL Başlat

### Docker ile (Önerilen):
```bash
docker-compose up -d
```

### Manuel kurulum varsa:
PostgreSQL'i başlatın ve şu bilgilerle bir veritabanı oluşturun:
- Kullanıcı: `postgres`
- Şifre: `postgres`
- Veritabanı: `b2b_marketplace`

---

## Adım 3: Ortam Değişkenlerini Ayarla

`.env.local` dosyası zaten oluşturulmuş durumda. Gerekirse düzenleyin:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/geohubtr"
AUTH_SECRET="en-az-32-karakter-guvenli-bir-secret-girin"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="GeoHub TR"
NEXT_PUBLIC_PRIMARY_COLOR="#1a6b3c"
NEXT_PUBLIC_SITE_DESCRIPTION="Türkiye'nin Jeodezi & Haritacılık Hizmetleri Platformu"
```

> **Önemli:** `AUTH_SECRET` değerini üretim ortamında mutlaka güçlü, rastgele bir değerle değiştirin.
> Üretmek için: `openssl rand -base64 32`

---

## Adım 4: Veritabanını Oluştur

```bash
# Prisma istemcisini oluştur
npm run prisma:generate

# Tabloları oluştur
npm run prisma:push

# Örnek verileri yükle (kategoriler, şirketler, listinglar)
npm run prisma:seed
```

---

## Adım 5: Uygulamayı Başlat

```bash
npm run dev
```

Tarayıcınızda açın: **http://localhost:3000**

---

## 🔑 Varsayılan Giriş Bilgileri

| Alan | Değer |
|------|-------|
| Email | `admin@geohubtr.com` |
| Şifre | `Admin123!` |
| Rol | Admin |

### Örnek Firma Sahibi
| Alan | Değer |
|------|-------|
| Email | `info@geodezik.com.tr` |
| Şifre | `Test123!` |
| Firma | Geodezik Mühendislik (Premium) |

---

## 📁 Proje Yapısı

```
b2b-marketplace/
├── prisma/
│   ├── schema.prisma          # Veritabanı şeması (12 model)
│   └── seed.ts                # Örnek veri
├── src/
│   ├── app/
│   │   ├── page.tsx           # Ana sayfa
│   │   ├── (auth)/
│   │   │   ├── login/         # Giriş sayfası
│   │   │   └── register/      # Kayıt sayfası
│   │   ├── admin/             # Admin panel (STEP 4)
│   │   │   ├── page.tsx       # Admin genel bakış
│   │   │   ├── companies/     # Şirket yönetimi
│   │   │   ├── categories/    # Kategori yönetimi
│   │   │   ├── users/         # Kullanıcı yönetimi
│   │   │   └── claims/        # Claim talep yönetimi
│   │   ├── directory/         # Dizin & Arama (STEP 5)
│   │   ├── companies/[slug]/  # Şirket detay sayfası
│   │   │   └── claim/         # Claim profil sayfası (STEP 6)
│   │   ├── listings/[id]/     # Listing detay sayfası
│   │   ├── dashboard/         # Company Owner dashboard (STEP 6)
│   │   │   ├── page.tsx       # Genel bakış
│   │   │   ├── listings/      # Listing yönetimi
│   │   │   │   └── new/       # Çok adımlı listing oluşturma
│   │   │   └── analytics/     # İstatistikler
│   │   └── api/               # API route'lar
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   └── ui/                # shadcn/ui bileşenleri
│   └── lib/
│       ├── auth.ts            # NextAuth.js v5 yapılandırması
│       ├── prisma.ts          # Prisma singleton
│       └── utils.ts           # Yardımcı fonksiyonlar
├── .env.local                 # Ortam değişkenleri
├── docker-compose.yml         # PostgreSQL container
└── SETUP.md                   # Bu dosya
```

---

## 🏗️ Mimari Özeti

### Veritabanı Şeması
- **users** — Rol tabanlı kimlik doğrulama (ADMIN, COMPANY_OWNER, INDIVIDUAL)
- **companies** — Temel dizin varlığı; `is_claimed`, `subscription_tier`, `promoted_until`
- **categories** — `custom_fields_schema` JSONB ile dinamik alan tanımları
- **listings** — `dynamic_attributes` JSONB ile sektöre-özgü veriler
- **claim_requests** — Şirket profil talepleri ve domain eşleştirme
- **projects, jobs, knowledge_base** — Ek modüller

### Önemli İş Akışları

#### Claim Profile (Profil Sahiplenme)
1. Admin şirket CSV yükler → `owner_id` NULL, `is_claimed` = FALSE
2. Kullanıcı "Claim" butonuna tıklar
3. Sistem email domain vs şirket website domain karşılaştırır
4. Eşleşirse → **otomatik onay** | Eşleşmezse → **admin incelemesi**

#### Arama Sıralaması
Sonuçlar şu sırayla sıralanır:
1. `subscription_tier` (PREMIUM önce)
2. `promoted_until` (aktif promosyonlar önce)
3. Organik sonuçlar

---

## 🔧 Özelleştirme

### Farklı Bir Sektör İçin Kullanım
`.env.local` içinde değiştirin:
```env
NEXT_PUBLIC_SITE_NAME="AgriTech Hub"
NEXT_PUBLIC_SITE_DESCRIPTION="Agriculture technology marketplace"
NEXT_PUBLIC_PRIMARY_COLOR="#22c55e"
```

Sonra Admin Panel'den yeni kategoriler ve JSONB şemasını tanımlayın.

### Özellik Açma/Kapama
```env
ENABLE_JOBS=true       # İş ilanları modülü
ENABLE_RENTALS=true    # Kiralık ürünler modülü
```

---

## 🚢 Production Deployment

### Vercel (Önerilen)
```bash
npm install -g vercel
vercel
```
Ortam değişkenlerini Vercel dashboard'dan ayarlayın.

### PostgreSQL Seçenekleri
- **Supabase** (ücretsiz tier mevcut)
- **Neon** (serverless PostgreSQL)
- **Railway**
- **PlanetScale** (MySQL - schema değişikliği gerekir)

---

## ❓ Sorun Giderme

**`prisma generate` hatası:**
```bash
npx prisma generate
```

**Port 5432 meşgul:**
Docker container'ını yeniden başlatın:
```bash
docker-compose restart
```

**`AUTH_SECRET` hatası:**
`.env.local`'da `AUTH_SECRET` değerinin en az 32 karakter olduğundan emin olun.
