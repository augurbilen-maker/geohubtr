// GeoHub TR — Seed Verisi
// Türkiye Jeodezi & Haritacılık Hizmetleri Platformu

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 GeoHub TR seed başlıyor...")

  // ─── Admin Kullanıcı ─────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin123!", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@geohubtr.com" },
    update: {},
    create: {
      email: "admin@geohubtr.com",
      name: "GeoHub Admin",
      hashedPassword: adminPassword,
      role: "ADMIN",
    },
  })
  console.log("✅ Admin kullanıcı oluşturuldu:", admin.email)

  // ─── Örnek Firma Sahipleri ────────────────────────────────────────────────────
  const ownerPassword = await bcrypt.hash("Test123!", 12)
  const owner1 = await prisma.user.upsert({
    where: { email: "info@geodezik.com.tr" },
    update: {},
    create: {
      email: "info@geodezik.com.tr",
      name: "Ahmet Yılmaz",
      hashedPassword: ownerPassword,
      role: "COMPANY_OWNER",
      city: "İstanbul",
    },
  })

  const owner2 = await prisma.user.upsert({
    where: { email: "info@ankaratopografya.com.tr" },
    update: {},
    create: {
      email: "info@ankaratopografya.com.tr",
      name: "Mehmet Demir",
      hashedPassword: ownerPassword,
      role: "COMPANY_OWNER",
      city: "Ankara",
    },
  })

  const owner3 = await prisma.user.upsert({
    where: { email: "info@izmirlazer.com.tr" },
    update: {},
    create: {
      email: "info@izmirlazer.com.tr",
      name: "Fatma Kaya",
      hashedPassword: ownerPassword,
      role: "COMPANY_OWNER",
      city: "İzmir",
    },
  })

  const owner4 = await prisma.user.upsert({
    where: { email: "info@droneharitalama.com.tr" },
    update: {},
    create: {
      email: "info@droneharitalama.com.tr",
      name: "Can Özdemir",
      hashedPassword: ownerPassword,
      role: "COMPANY_OWNER",
      city: "İstanbul",
    },
  })

  const owner5 = await prisma.user.upsert({
    where: { email: "info@bursakadastro.com.tr" },
    update: {},
    create: {
      email: "info@bursakadastro.com.tr",
      name: "Zeynep Arslan",
      hashedPassword: ownerPassword,
      role: "COMPANY_OWNER",
      city: "Bursa",
    },
  })

  console.log("✅ Firma sahipleri oluşturuldu")

  // ─── Firmalar ────────────────────────────────────────────────────────────────
  const company1 = await prisma.company.upsert({
    where: { slug: "geodezik-muhendislik" },
    update: {},
    create: {
      ownerId: owner1.id,
      name: "Geodezik Mühendislik Ltd. Şti.",
      slug: "geodezik-muhendislik",
      website: "https://geodezik.com.tr",
      description:
        "İstanbul merkezli, 15 yıllık deneyimimizle rölöve, halihazır harita ve lazer tarama hizmetleri sunuyoruz. Leica ve Trimble ekipmanlarıyla çalışıyor, kentsel dönüşüm ve restorasyon projelerinde uzmanlaşıyoruz.",
      officePhone: "+90 212 555 10 20",
      infoEmail: "info@geodezik.com.tr",
      whatsappNumber: "+90 532 555 10 20",
      address: "Maslak Mah. Büyükdere Cad. No:123",
      city: "İstanbul",
      district: "Sarıyer",
      isClaimed: true,
      isVerified: true,
      subscriptionTier: "PREMIUM",
      promotedUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      serviceCategories: JSON.stringify(["ROLOVE", "HALIHAZIR_HARITA", "LAZER_TARAMA", "ESKI_ESER"]),
    },
  })

  const company2 = await prisma.company.upsert({
    where: { slug: "ankara-topografya" },
    update: {},
    create: {
      ownerId: owner2.id,
      name: "Ankara Topografya & Harita A.Ş.",
      slug: "ankara-topografya",
      website: "https://ankaratopografya.com.tr",
      description:
        "Ankara ve İç Anadolu bölgesinde aplikasyon, ifraz ve kadastro hizmetleri. Kamu projelerinde 20+ yıl tecrübe.",
      officePhone: "+90 312 444 55 66",
      infoEmail: "info@ankaratopografya.com.tr",
      address: "Kızılay Mah. Atatürk Bulvarı No:45",
      city: "Ankara",
      district: "Çankaya",
      isClaimed: true,
      isVerified: true,
      subscriptionTier: "ONAYLI",
      serviceCategories: JSON.stringify(["APLIKASYON", "HALIHAZIR_HARITA", "ROLOVE"]),
    },
  })

  const company3 = await prisma.company.upsert({
    where: { slug: "izmir-lazer-tarama" },
    update: {},
    create: {
      ownerId: owner3.id,
      name: "İzmir Lazer Tarama Teknolojileri",
      slug: "izmir-lazer-tarama",
      website: "https://izmirlazer.com.tr",
      description:
        "Ege bölgesinin önde gelen lazer tarama ve BIM modelleme firması. Faro Focus ve Matterport sistemleriyle endüstriyel tesisler, tarihi yapılar ve altyapı projeleri için nokta bulutu üretiyoruz.",
      officePhone: "+90 232 666 77 88",
      infoEmail: "info@izmirlazer.com.tr",
      whatsappNumber: "+90 541 666 77 88",
      address: "Konak Mah. Anafartalar Cad. No:67",
      city: "İzmir",
      district: "Konak",
      isClaimed: true,
      isVerified: true,
      subscriptionTier: "PREMIUM",
      serviceCategories: JSON.stringify(["LAZER_TARAMA", "BIM_MODELLEME"]),
    },
  })

  const company4 = await prisma.company.upsert({
    where: { slug: "skymap-drone" },
    update: {},
    create: {
      ownerId: owner4.id,
      name: "SkyMap Drone Haritalama",
      slug: "skymap-drone",
      website: "https://droneharitalama.com.tr",
      description:
        "DJI Phantom 4 RTK ve Matrice 300 ile yüksek hassasiyetli drone haritalama, ortofoto ve DSM üretimi. Türkiye genelinde saha çalışması yapıyoruz.",
      officePhone: "+90 216 333 44 55",
      infoEmail: "info@droneharitalama.com.tr",
      whatsappNumber: "+90 538 333 44 55",
      address: "Pendik Mah. Kurtköy Cad. No:12",
      city: "İstanbul",
      district: "Pendik",
      isClaimed: true,
      isVerified: false,
      subscriptionTier: "PREMIUM",
      serviceCategories: JSON.stringify(["DRONE_HARITALAMA", "HALIHAZIR_HARITA"]),
    },
  })

  await prisma.company.upsert({
    where: { slug: "bursa-kadastro" },
    update: {},
    create: {
      ownerId: owner5.id,
      name: "Bursa Kadastro & Mühendislik",
      slug: "bursa-kadastro",
      website: "https://bursakadastro.com.tr",
      description: "Bursa ve çevre illerde parselasyon, ifraz, tevhit ve kadastro hizmetleri.",
      officePhone: "+90 224 777 88 99",
      infoEmail: "info@bursakadastro.com.tr",
      address: "Osmangazi Mah. İnkılap Cad. No:34",
      city: "Bursa",
      district: "Osmangazi",
      isClaimed: true,
      isVerified: true,
      subscriptionTier: "FREE",
      serviceCategories: JSON.stringify(["APLIKASYON", "ROLOVE"]),
    },
  })

  // Sahipsiz firmalar (claim için)
  await prisma.company.upsert({
    where: { slug: "trabzon-harita" },
    update: {},
    create: {
      name: "Trabzon Harita Bürosu",
      slug: "trabzon-harita",
      description: "Karadeniz bölgesinde harita ve kadastro hizmetleri.",
      officePhone: "+90 462 888 00 11",
      infoEmail: "info@trabzonharita.com.tr",
      city: "Trabzon",
      isClaimed: false,
      isVerified: false,
      subscriptionTier: "FREE",
      serviceCategories: JSON.stringify(["HALIHAZIR_HARITA", "APLIKASYON"]),
    },
  })

  await prisma.company.upsert({
    where: { slug: "konya-insaat-olcum" },
    update: {},
    create: {
      name: "Konya İnşaat Ölçüm Hizmetleri",
      slug: "konya-insaat-olcum",
      description: "İç Anadolu'da aplikasyon ve kontrol ölçümü.",
      officePhone: "+90 332 999 11 22",
      infoEmail: "info@konyaolcum.com.tr",
      city: "Konya",
      isClaimed: false,
      isVerified: false,
      subscriptionTier: "FREE",
      serviceCategories: JSON.stringify(["APLIKASYON", "ROLOVE"]),
    },
  })

  console.log("✅ Firmalar oluşturuldu")

  // ─── Hizmet İlanları ─────────────────────────────────────────────────────────
  await prisma.listing.createMany({
    skipDuplicates: true,
    data: [
      {
        companyId: company1.id,
        serviceCategory: "ROLOVE",
        listingType: "SERVICE",
        title: "Mimari Rölöve — Tarihi Yapılar ve Konutlar",
        description:
          "Leica totalstation ve lazer distometre ile mimari rölöve hizmeti. AutoCAD ve Revit formatında çıktı. Tarihi yapılar, konutlar, ticari binalar. İstanbul ve çevre il.",
        currency: "TRY",
        dynamicAttributes: JSON.stringify({
          bölge: ["İstanbul", "Tekirdağ", "Kocaeli"],
          çıktıFormatı: ["AutoCAD .dwg", "Revit .rvt", "PDF"],
          minimumAlan: "50 m²",
          teslimatSüresi: "3-10 iş günü",
        }),
        images: JSON.stringify([]),
        isPromoted: true,
        status: "ACTIVE",
      },
      {
        companyId: company1.id,
        serviceCategory: "LAZER_TARAMA",
        listingType: "SERVICE",
        title: "3D Lazer Tarama & Nokta Bulutu Üretimi",
        description:
          "Leica RTC360 ile yüksek hassasiyetli 3D lazer tarama. Endüstriyel tesisler, altyapı, tarihi yapılar. Nokta bulutu işleme ve BIM entegrasyonu.",
        currency: "TRY",
        dynamicAttributes: JSON.stringify({
          cihaz: "Leica RTC360",
          hassasiyet: "±1.9mm @ 10m",
          maksimumMesafe: "130m",
          çıktıFormat: ["E57", "LAS", "RCP"],
          yazılım: ["Leica Cyclone", "Autodesk ReCap"],
        }),
        images: JSON.stringify([]),
        isPromoted: true,
        status: "ACTIVE",
      },
      {
        companyId: company2.id,
        serviceCategory: "APLIKASYON",
        listingType: "SERVICE",
        title: "Aplikasyon & İfraz Hizmetleri — Ankara",
        description:
          "TKGM onaylı aplikasyon, ifraz, tevhit ve yola terk hizmetleri. Ankara ve İç Anadolu bölgesi. Kamu ihale tecrübesi.",
        currency: "TRY",
        dynamicAttributes: JSON.stringify({
          hizmetTipi: ["Aplikasyon", "İfraz", "Tevhit", "Yola Terk"],
          bölge: ["Ankara", "Eskişehir", "Konya", "Kırıkkale"],
        }),
        images: JSON.stringify([]),
        status: "ACTIVE",
      },
      {
        companyId: company3.id,
        serviceCategory: "BIM_MODELLEME",
        listingType: "SERVICE",
        title: "BIM Modelleme & Revit Çizim Hizmetleri",
        description:
          "Lazer tarama verisinden veya 2D çizimlerden BIM modelleme. LOD 200/300/400 Revit modelleri. MEP, yapısal ve mimari modelleme.",
        currency: "TRY",
        dynamicAttributes: JSON.stringify({
          yazılım: ["Revit", "Navisworks", "AutoCAD MEP"],
          LOD: ["LOD 200", "LOD 300", "LOD 400"],
          teslim: "IFC + RVT",
          uzaktan: true,
        }),
        images: JSON.stringify([]),
        status: "ACTIVE",
      },
      {
        companyId: company4.id,
        serviceCategory: "DRONE_HARITALAMA",
        listingType: "SERVICE",
        title: "Drone Haritalama — Ortofoto & DSM Üretimi",
        description:
          "DJI Phantom 4 RTK ile cm hassasiyetinde drone haritalama. Ortofoto, DSM, DEM üretimi. Tarım, inşaat, madencilik, altyapı projeleri.",
        currency: "TRY",
        dynamicAttributes: JSON.stringify({
          cihaz: "DJI Phantom 4 RTK",
          GSD: "2-5 cm/px (400m yükseklik)",
          çıktı: ["Ortofoto", "DSM", "DEM", "3D Nokta Bulutu"],
          yazılım: "Agisoft Metashape",
        }),
        images: JSON.stringify([]),
        isPromoted: true,
        status: "ACTIVE",
      },
    ],
  })

  console.log("✅ Hizmet ilanları oluşturuldu")

  // ─── Örnek Hizmet Talepleri (ServiceRequest) ──────────────────────────────────
  const regularUser = await prisma.user.upsert({
    where: { email: "kullanici@example.com" },
    update: {},
    create: {
      email: "kullanici@example.com",
      name: "Ali Veli",
      hashedPassword: ownerPassword,
      role: "INDIVIDUAL",
      city: "İstanbul",
    },
  })

  await prisma.serviceRequest.createMany({
    skipDuplicates: true,
    data: [
      {
        requesterId: regularUser.id,
        serviceCategory: "ROLOVE",
        title: "Kadıköy'de 3 katlı bina rölövesi",
        description:
          "Kadıköy ilçesinde yaklaşık 350 m² kapalı alana sahip 3 katlı binamın mimari rölövesinin çizdirilmesi gerekiyor. AutoCAD formatında teslim edilmesini istiyorum.",
        city: "İstanbul",
        district: "Kadıköy",
        details: JSON.stringify({
          katSayısı: 3,
          yaklaşıkAlan: "350 m²",
          çıktıFormatı: "AutoCAD .dwg",
          aciliyet: "2 hafta içinde",
        }),
        status: "OPEN",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
      {
        requesterId: regularUser.id,
        serviceCategory: "DRONE_HARITALAMA",
        title: "Tarım arazisi için drone ortofoto",
        description:
          "Manisa'da 120 dönüm tarım arazisi için cm hassasiyetinde ortofoto ve DSM istiyorum. Meyve bahçesi sulama projesi için kullanılacak.",
        city: "Manisa",
        district: "Akhisar",
        details: JSON.stringify({
          alan: "120 dönüm",
          amaç: "Sulama projesi",
          GSD: "En fazla 5cm",
          çıktı: ["Ortofoto (GeoTIFF)", "DSM"],
        }),
        status: "OPEN",
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      },
      {
        requesterId: regularUser.id,
        serviceCategory: "LAZER_TARAMA",
        title: "Tarihi konak restorasyon için lazer tarama",
        description:
          "Bursa'da 19. yüzyıl yapısı konağımız için restorasyon öncesi lazer tarama yapılması gerekiyor. E57 formatında teslim.",
        city: "Bursa",
        district: "Osmangazi",
        details: JSON.stringify({
          yapıTipi: "Tarihi konak (19. yy)",
          yaklaşıkAlan: "620 m²",
          çıktıFormat: "E57 + PDF sunum",
          amaç: "Restorasyon projesi",
        }),
        status: "OPEN",
      },
      {
        requesterId: regularUser.id,
        serviceCategory: "APLIKASYON",
        title: "Ankara Etimesgut'ta aplikasyon",
        description:
          "Etimesgut'ta 3 parselin aplikasyonu gerekiyor. Belediye inşaat ruhsatı için şart.",
        city: "Ankara",
        district: "Etimesgut",
        details: JSON.stringify({
          parselSayısı: 3,
          amaç: "İnşaat ruhsatı",
          aciliyet: "10 gün",
        }),
        status: "OPEN",
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
    ],
  })

  console.log("✅ Hizmet talepleri oluşturuldu")

  // ─── Bilgi Merkezi Yazıları ───────────────────────────────────────────────────
  await prisma.knowledgeBase.createMany({
    skipDuplicates: true,
    data: [
      {
        authorId: admin.id,
        type: "BLOG",
        title: "Türkiye'de Drone ile Haritalama: İzin Süreci ve Yönetmelikler",
        slug: "turkiyede-drone-haritalama-izin-sureci",
        content:
          "DHMİ uçuş izni başvurusu, SGK İHA operatör sertifikası ve belediye izin süreçleri hakkında kapsamlı rehber. A1/A2/A3 kategorisi İHA sınıflamaları ve ticari operatörlük için gerekli belgeler.",
        excerpt:
          "DHMİ izinleri, uçuş yasak bölgeler ve ticari İHA operatörlüğü hakkında kapsamlı rehber.",
        tags: JSON.stringify(["drone", "iha", "haritalama", "izin", "yönetmelik"]),
        isSponsored: false,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      {
        authorId: admin.id,
        type: "COMPARISON",
        title: "Leica RTC360 vs Faro Focus Premium: Hangisi Daha İyi?",
        slug: "leica-rtc360-faro-focus-karsilastirma",
        content:
          "Fiyat, hassasiyet, menzil ve yazılım ekosistemi açısından iki premium lazer tarayıcının ayrıntılı karşılaştırması. Sahadan kullanıcı yorumları ve TCO (Toplam Sahip Olma Maliyeti) analizi.",
        excerpt:
          "İki premium lazer tarayıcının teknik özellikleri, fiyat-performans analizi ve sahadan kullanıcı yorumları.",
        tags: JSON.stringify(["lazer tarama", "leica", "faro", "cihaz karşılaştırma"]),
        isSponsored: false,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      {
        authorId: admin.id,
        sponsorId: company3.id,
        type: "BLOG",
        title: "BIM ve Lazer Tarama Entegrasyonu: Pratik Rehber",
        slug: "bim-lazer-tarama-entegrasyonu-rehber",
        content:
          "Nokta bulutu verilerini Revit'e aktarma ve LOD 300 model üretimi için adım adım kılavuz. Bu içerik İzmir Lazer Tarama Teknolojileri sponsorluğuyla hazırlanmıştır.",
        excerpt:
          "Nokta bulutu + BIM iş akışı: Leica Cyclone'dan Revit'e pratik adımlar.",
        tags: JSON.stringify(["bim", "revit", "lazer tarama", "nokta bulutu"]),
        isSponsored: true,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    ],
  })

  console.log("✅ Bilgi Merkezi yazıları oluşturuldu")
  console.log("")
  console.log("🎉 GeoHub TR seed tamamlandı!")
  console.log("")
  console.log("─────────────────────────────────────────")
  console.log("🔑 Admin Giriş:")
  console.log("   E-posta : admin@geohubtr.com")
  console.log("   Şifre   : Admin123!")
  console.log("")
  console.log("🏢 Firma sahibi:")
  console.log("   E-posta : info@geodezik.com.tr")
  console.log("   Şifre   : Test123!")
  console.log("─────────────────────────────────────────")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
