# GeoHub TR — Supabase + Vercel Deploy Rehberi

## 1. Supabase Projesi Oluştur

1. [supabase.com](https://supabase.com) → **New project**
2. Proje adı: `geohubtr` (veya istediğiniz)
3. Database password: güçlü bir şifre belirleyin ve **kaydedin**
4. Region: **West EU (Frankfurt)** önerilir
5. **Create new project** → ~2 dk bekleyin

## 2. API Keys'i Al

Proje açıldıktan sonra:
- **Project Settings** (sol menü) → **API**
- Kopyala ve `.env.local` dosyasına yapıştır:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SIZIN_PROJE_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...  (anon/public key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ...       (service_role key — GİZLİ!)
```

## 3. Veritabanı Şemasını Yükle

### Yöntem A — Supabase SQL Editor (kolay)

1. Supabase dashboard → **SQL Editor**
2. Aşağıdaki dosyaları **sırayla** çalıştır:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
   - `supabase/migrations/003_lihkab_seed.sql`

Her dosyayı açıp içeriğini kopyala → SQL Editor'e yapıştır → **Run** (Ctrl+Enter).

### Yöntem B — Supabase CLI (ileri)

```bash
# Supabase CLI kur (ilk kez)
npm install -g supabase

# Projeye bağlan
supabase login
supabase link --project-ref SIZIN_PROJE_ID

# Tüm migration'ları tek komutla çalıştır
supabase db push
```

## 4. npm Bağımlılıklarını Kur

```bash
cd b2b-marketplace
npm install
```

Bu komut `@supabase/supabase-js` dahil tüm paketleri kurar.

## 5. Yerel Test

```bash
npm run dev
```

→ http://localhost:3000 açıp siteyi test edin.

## 6. Vercel'e Deploy

### 6a. GitHub'a Push

```bash
git add .
git commit -m "feat: LİHKAB 225 büro seed + Supabase integration"
git push origin main
```

### 6b. Vercel Projesi Oluştur

1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub repo'nuzı seçin
3. Framework: **Next.js** (otomatik algılanır)
4. Root Directory: `b2b-marketplace` (eğer repo kök değilse)

### 6c. Environment Variables

Vercel → Project Settings → **Environment Variables** ekleyin:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` |
| `NEXT_PUBLIC_SITE_NAME` | `GeoHub TR` |
| `NEXTAUTH_URL` | `https://sizin-domain.vercel.app` |
| `AUTH_SECRET` | (32+ karakter rastgele string) |

> AUTH_SECRET üretmek için: `openssl rand -base64 32`

### 6d. Deploy

**Deploy** butonuna basın. ~2 dk sonra canlı URL gelir.

---

## Telefon & Harita Linkleri (Frontend)

Seed SQL'de phonlar E.164 formatında (`+902827250403`) saklanıyor.
Frontend'de şu şekilde kullanın:

```tsx
// tel: linki — mobilde direk arama açar
<a href={`tel:${company.phone}`}>{company.phone}</a>

// Google Maps
const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(company.address)}`

// Apple Maps (iOS)
const appleMapsUrl = `maps://maps.apple.com/?q=${encodeURIComponent(company.address)}`

// Platforma göre seç
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
const mapsLink = isIOS ? appleMapsUrl : mapsUrl
```

---

## Veri Özeti

- **225 LİHKAB bürosu** yüklendi (Adana → Zonguldak)
- **225/225 telefon** E.164 formatında (+90XXXXXXXXXX)
- **225/225 adres** Google Maps / Apple Maps uyumlu düz metin
- **Slug**: `lihkab-{il}-{ilce}-{soyad}` formatında, benzersiz
- **Tier**: FREE | **Verified**: TRUE | **Services**: ['lihkab']
