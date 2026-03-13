-- ============================================================
-- GeoHub TR — LİHKAB Seed Data (221 büro)
-- Otomatik üretildi: gen_lihkab_sql.py
-- phone: E.164 (+90XXXXXXXXXX) → tel: link için
-- address: düz metin → frontend Google/Apple Maps URL üretir
-- ============================================================

-- Mevcut LİHKAB firmalarını temizle (yeniden çalıştırma güvenliği)
DELETE FROM companies WHERE 'lihkab' = ANY(services) AND tier = 'FREE';

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Adana Çukurova Lihkab',
  'lihkab-adana-cukurova-kali',
  'FREE',
  'GK',
  'adana',
  'Çukurova',
  'Kuruköprü Mah. Sefa Özler Cad. Arpacı Apt. Kat :7 No:19 Seyhan Çukurova/ Adana',
  '+903223590400',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Gökhan KALI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Adana Sarıçam Lihkab',
  'lihkab-adana-saricam-celik',
  'FREE',
  'AÇ',
  'adana',
  'Sarıçam',
  'Kuruköprü Mah. Sefa Özler Cad. Arpacı Apt. Kat: 4 No: 10 Seyhan Sarıçam/ Adana',
  '+903223595566',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Alper ÇELİK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Adana Sarıçam Lihkab',
  'lihkab-adana-saricam-ates',
  'FREE',
  'HA',
  'adana',
  'Sarıçam',
  'Mehmet Akif Ersoy Mah. 202 Sok. No: 17 Bekünbay 3 Apt. Kat: 2 Sarıçam/ Adana',
  '+903223596644',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hacı Bahadır ATEŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Adana Seyhan Lihkab',
  'lihkab-adana-seyhan-balci',
  'FREE',
  'EB',
  'adana',
  'Seyhan',
  'Kuruköprü Mah. Sefa Özler Cad. Kuruköprü İşhanı No: 23/406-407 Seyhan/ Adana',
  '+903223636633',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Erhan BALCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Adana Yüreğir Lihkab',
  'lihkab-adana-yuregir-akca',
  'FREE',
  'EA',
  'adana',
  'Yüreğir',
  'Kuruköprü Mah. Sefa Özler Cad. Arpacı Apt. Kat :3 No:7 Seyhan Yüreğir/ Adana',
  '+903223634547',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ercan AKÇA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Adıyaman Merkez Lihkab',
  'lihkab-adiyaman-merkez-surucu',
  'FREE',
  'HS',
  'adiyaman',
  'Merkez',
  'Barbaros Hayrettin Mahallesi Atatürk Bulvarı No: 133/A Merkez/ Adıyaman',
  '+904162167643',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan SÜRÜCÜ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Afyonkarahisar Merkez Lihkab',
  'lihkab-afyonkarahisar-merkez-koksal',
  'FREE',
  'AK',
  'afyonkarahisar',
  'Merkez',
  'Karaman Mahallesi Meltem Cad. No: 9/A Merkez/ Afyonkarahisar',
  '+902722134272',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ahmet Benan KÖKSAL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Afyonkarahisar Merkez Lihkab',
  'lihkab-afyonkarahisar-merkez-goker',
  'FREE',
  'ÇG',
  'afyonkarahisar',
  'Merkez',
  'Karaman Mah. Mine Cad. Mine Apt. Zemin Kat No: 1/B Merkez/ Afyonkarahisar',
  '+902722132520',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Çağdaş GÖKER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Aksaray Merkez Lihkab',
  'lihkab-aksaray-merkez-yilmaz',
  'FREE',
  'YY',
  'aksaray',
  'Merkez',
  'Yeni Sanayi Mah. 2. Bulvar Şoförler Odası Kat: 3 Merkez/ Aksaray',
  '+903822154799',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yücel YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Amasya Merkez Lihkab',
  'lihkab-amasya-merkez-tokyer',
  'FREE',
  'ET',
  'amasya',
  'Merkez',
  'Akbilek Mah. Alptekin Cad. No: 28/A Merkez/ Amasya',
  '+903582180558',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Emin TOKYER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Altındağ Lihkab',
  'lihkab-ankara-altindag-erdogan',
  'FREE',
  'EE',
  'ankara',
  'Altındağ',
  'Anafartalar Mahallesi Talatpaşa Bulvarı No:65 / 5 Altındağ / Ankara',
  '+903123586757',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ersoy ERDOĞAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Çankaya Lihkab',
  'lihkab-ankara-cankaya-gokmen',
  'FREE',
  'AG',
  'ankara',
  'Çankaya',
  'Kavaklıdere Mah. Esat Cad. No: 59/5 Küçükesat Çankaya / Ankara',
  '+903124190185',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ali GÖKMEN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Çankaya Lihkab',
  'lihkab-ankara-cankaya-ozbalmumcu',
  'FREE',
  'MÖ',
  'ankara',
  'Çankaya',
  'Kavaklıdere Mah. Esat Cad. No: 50/6 Küçükesat Çankaya / Ankara',
  '+903124185001',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mahmut ÖZBALMUMCU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Etimesgut Lihkab',
  'lihkab-ankara-etimesgut-karsli',
  'FREE',
  'HK',
  'ankara',
  'Etimesgut',
  'İstasyon Mah. Şehit Hikmet Özer Cad. 2313. Sok. No: 1/5 Etimesgut / Ankara',
  '+903123606832',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hülya KARSLI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Gölbaşı Lihkab',
  'lihkab-ankara-golbasi-kilicoglu',
  'FREE',
  'AK',
  'ankara',
  'Gölbaşı',
  'Bahçelievler Mah. Cumhuriyet Cad. No:5/5 Gölbaşı / Ankara',
  '+903124170677',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ali KILIÇOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Gölbaşı Lihkab',
  'lihkab-ankara-golbasi-akdeniz',
  'FREE',
  'EA',
  'ankara',
  'Gölbaşı',
  'Bahçelievler Mah. 319. Sok. No:15/3 Gölbaşı / Ankara',
  '+903124843336',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Erdoğan AKDENİZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Kazan Lihkab',
  'lihkab-ankara-kazan-altay',
  'FREE',
  'CA',
  'ankara',
  'Kazan',
  'Atatürk Mah. 29 Mayıs Cad. Kocalar İş Hanı Kat: 3 No: 94/2 Kahraman Kazan / Ankara',
  '+903122730707',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cumhur ALTAY.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Kazan Lihkab',
  'lihkab-ankara-kazan-selvi',
  'FREE',
  'TS',
  'ankara',
  'Kazan',
  'Atatürk Mah. 29 Mayıs Cad. Kocalar İş Merkezi No: 94/7 Kahraman Kazan / Ankara',
  '+903128147989',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Tekin SELVİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Keçiören Lihkab',
  'lihkab-ankara-kecioren-inan',
  'FREE',
  'Aİ',
  'ankara',
  'Keçiören',
  'Güçlükaya Mah. Islahiye Sok. No: 7/4 Keçiören / Ankara',
  '+903123587077',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Abdullatif İNAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Keçiören Lihkab',
  'lihkab-ankara-kecioren-ceylan',
  'FREE',
  'KC',
  'ankara',
  'Keçiören',
  'Güçlükaya Mah. İslahiye Sok. No: 7/8 Keçiören / Ankara',
  '+903123586757',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kadir CEYLAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Mamak Lihkab',
  'lihkab-ankara-mamak-tonoz',
  'FREE',
  'İT',
  'ankara',
  'Mamak',
  'Hüseyin Gazi Mah. Çarşıiçi Cad. Kıbrıs Apt. No:51/14 Mamak / Ankara',
  '+903123694543',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İbrahim TONOZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Mamak Lihkab',
  'lihkab-ankara-mamak-aydin',
  'FREE',
  'SA',
  'ankara',
  'Mamak',
  'Hüseyin Gazi Mah. Çarşıiçi Cad. No:49/1 Mamak / Ankara',
  '+903123695506',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sabri AYDIN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Polatlı Lihkab',
  'lihkab-ankara-polatli-dagdelen',
  'FREE',
  'CD',
  'ankara',
  'Polatlı',
  'Fatih Mahallesi Atatürk Caddesi No:153/4 Polatlı / Ankara',
  '+903126211112',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cengiz DAĞDELEN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Sincan Lihkab',
  'lihkab-ankara-sincan-yilmaz',
  'FREE',
  'AY',
  'ankara',
  'Sincan',
  'Tandoğan Mah. Billur Sok. No: 20/A Sincan / Ankara',
  '+903122699669',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Alparslan YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Sincan Lihkab',
  'lihkab-ankara-sincan-tezel',
  'FREE',
  'CT',
  'ankara',
  'Sincan',
  'Tandoğan Mah. Şehit Serkan Öğütçü Sok. No: 4/15 Sincan / Ankara',
  '+903124191973',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cemal Alptekin TEZEL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Yenimahalle Lihkab',
  'lihkab-ankara-yenimahalle-akdeniz',
  'FREE',
  'HA',
  'ankara',
  'Yenimahalle',
  'Ragıp Tüzün Mah. Çarşı Cad. No: 1/1 Yenimahalle / Ankara',
  '+903123158550',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Halil AKDENİZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ankara Yenimahalle Lihkab',
  'lihkab-ankara-yenimahalle-simsek',
  'FREE',
  'MŞ',
  'ankara',
  'Yenimahalle',
  'Ragıp Tüzün Mah. İvedik Cad. No: 182/5 Yenimahalle / Ankara',
  '+903123437343',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa ŞİMŞEK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Alanya Lihkab',
  'lihkab-antalya-alanya-karakoc',
  'FREE',
  'AK',
  'antalya',
  'Alanya',
  'Kızlarpınarı Mah. Hacıkadiroğlu Cad. No: 14/C Alanya / Antalya',
  '+900242522002',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Aydın KARAKOÇ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Döşemealtı Lihkab',
  'lihkab-antalya-dosemealti-aslaner',
  'FREE',
  'MA',
  'antalya',
  'Döşemealtı',
  'Meltem Mah. Mavi Deniz Sitesi B Blok No: 12/4 Muratpaşa / Antalya',
  '+902422377979',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat ASLANER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Kaş Lihkab',
  'lihkab-antalya-kas-yildiz',
  'FREE',
  'CY',
  'antalya',
  'Kaş',
  'Andifli Mah. Eski Çukurbağ Sok. No: 2/1 Kaş/ Antalya',
  '+902428362827',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cafer YILDIZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Kepez Lihkab',
  'lihkab-antalya-kepez-borekci',
  'FREE',
  'RB',
  'antalya',
  'Kepez',
  'Meltem Mah. 2. Cad. Falez Sitesi Akdeniz Apt. B Blok No: 14 Kat: 1 Daire: 2 Muratpaşa / Antalya',
  '+902422371214',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ramazan BÖREKCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Kepez Lihkab',
  'lihkab-antalya-kepez-aksoy',
  'FREE',
  'SA',
  'antalya',
  'Kepez',
  'Emek Mah. Sakarya Bulvarı Sakarya İş Merkezi No: 352 Kat: 2 No: 6 Kepez / Antalya',
  '+902422384098',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Selçuk AKSOY.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Korkuteli Lihkab',
  'lihkab-antalya-korkuteli-uysal',
  'FREE',
  'KU',
  'antalya',
  'Korkuteli',
  'Kiremitli Mah. 818 Sok. Özgür İş Merkezi No: 6 Kat: 2 Daire: 11 Korkuteli / Antalya',
  '+902423348181',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kadir UYSAL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Manavgat Lihkab',
  'lihkab-antalya-manavgat-ucar',
  'FREE',
  'SU',
  'antalya',
  'Manavgat',
  'Mimar Sinan Mah. 6014 Sok. No: 14/1 Manavgat / Antalya',
  '+902427461377',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sait UÇAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Antalya Muratpaşa Lihkab',
  'lihkab-antalya-muratpasa-kurt',
  'FREE',
  'AK',
  'antalya',
  'Muratpaşa',
  'Meltem Mah. Mavi Deniz Sitesi B Blok No: 12/6 Muratpaşa / Antalya',
  '+902422375051',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Akın KURT.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Aydın Didim Lihkab',
  'lihkab-aydin-didim-savur',
  'FREE',
  'YS',
  'aydin',
  'Didim',
  'Yeni Mah. 832 Sokak No: 16/A Didim/ Aydın',
  '+902568116364',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yüksel SAVUR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Aydın Efeler Lihkab',
  'lihkab-aydin-efeler-demirel',
  'FREE',
  'KD',
  'aydin',
  'Efeler',
  'Hasanefendi Mah. 1919 Sok. No: 12 Daire: 3 Efeler/ Aydın',
  '+902562151088',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Köksal DEMİREL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Aydın Kuşadası Lihkab',
  'lihkab-aydin-kusadasi-turkezer',
  'FREE',
  'AT',
  'aydin',
  'Kuşadası',
  'Cumhuriyet Mah. Zekilı Sok. No: 4 Kat: 4 Kuşadası/ Aydın',
  '+902566143490',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ali TÜRKEZER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Aydın Nazilli Lihkab',
  'lihkab-aydin-nazilli-aslan',
  'FREE',
  'SA',
  'aydin',
  'Nazilli',
  'Cumhuriyet Mah. Beşeylül Cad. No:18/2 Nazilli/ Aydın',
  '+902563151555',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Serdar ASLAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Balıkesir Altıeylül Lihkab',
  'lihkab-balikesir-altieylul-sahin',
  'FREE',
  'İŞ',
  'balikesir',
  'Altıeylül',
  'Eskikuyumcular Mah. Akkuyu Sok. Evren Apt. No: 5/1 Karesi Altıeylül/ Balıkesir',
  '+902662439043',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İzzettin ŞAHİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Balıkesir Bandırma Lihkab',
  'lihkab-balikesir-bandirma-gultekin',
  'FREE',
  'MG',
  'balikesir',
  'Bandırma',
  '17 Eylül Mah. Sanayi Sokak Girişi No: 10/1 Kat: 1 Daire: 2 Bandırma/ Balıkesir',
  '+902667149712',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet GÜLTEKİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Balıkesir Edremit Lihkab',
  'lihkab-balikesir-edremit-ozcim',
  'FREE',
  'HÖ',
  'balikesir',
  'Edremit',
  'Gazicelal Mah. 455 Sok. Özmenler İşmerkezi No: 6 Kat: 4 Daire: 42 Edremit Edremit/ Balıkesir',
  '+902663740268',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan Hüseyin ÖZÇİM.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Balıkesir Karesi Lihkab',
  'lihkab-balikesir-karesi-yesilsu',
  'FREE',
  'SY',
  'balikesir',
  'Karesi',
  'Eski Kuyumcular Mah. Hacı Gaybi Sok. Oral Apt. No: 9/2 Karesi/ Balıkesir',
  '+902662391327',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Süreyya Haluk YEŞİLSU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bartın Merkez Lihkab',
  'lihkab-bartin-merkez-uckun',
  'FREE',
  'HU',
  'bartin',
  'Merkez',
  'Kemerköprü Mah. Arka Sok. No: 48/15 Merkez/ Bartın',
  '+903785020474',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hüseyin UÇKUN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bilecik Merkez Lihkab',
  'lihkab-bilecik-merkez-yilmaz',
  'FREE',
  'FY',
  'bilecik',
  'Merkez',
  'İstiklal Mah. Terzihane Sok. No: 2/1 Merkez/ Bilecik',
  '+902282122119',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Fatih YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bolu Merkez Lihkab',
  'lihkab-bolu-merkez-sak',
  'FREE',
  'ES',
  'bolu',
  'Merkez',
  'Kültür Mah. Şehitler Cad. Eryaman Apt.No: 35/1 Merkez/ Bolu',
  '+903742101010',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Erdal SAK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Burdur Merkez Lihkab',
  'lihkab-burdur-merkez-minnetoglu',
  'FREE',
  'MM',
  'burdur',
  'Merkez',
  'Atatürk Mah. 12079 Sok. No: 4/2 Merkez/ Burdur',
  '+902482339233',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat MİNNETOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Gemlik Lihkab',
  'lihkab-bursa-gemlik-toktas',
  'FREE',
  'HT',
  'bursa',
  'Gemlik',
  'Dr. Ziya Kaya Mah. Z. Sarı Şen Sok. Baytaş İşmerkezi No: 22 Kat: 2 Daire: 18 Gemlik / Bursa',
  '+902245142232',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan TOKTAŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa İnegöl Lihkab',
  'lihkab-bursa-inegol-tokdemir',
  'FREE',
  'İT',
  'bursa',
  'İnegöl',
  'Kemalpaşa Mah. Bahçıvan Sok. No: 4/6 İnegöl / Bursa',
  '+902247111800',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İlker TOKDEMİR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Karacabey Lihkab',
  'lihkab-bursa-karacabey-atahan',
  'FREE',
  'MA',
  'bursa',
  'Karacabey',
  'Tavşanlı Mah. 131. Sok. No: 1/1 Karacabey / Bursa',
  '+902246765550',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat ATAHAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Kestel Lihkab',
  'lihkab-bursa-kestel-gultekin',
  'FREE',
  'MG',
  'bursa',
  'Kestel',
  'Kale Mah. Kurtuluş Cad. No: 1/5 Kestel / Bursa',
  '+902243740063',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: M. Nesim GÜLTEKİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Mudanya Lihkab',
  'lihkab-bursa-mudanya-sener',
  'FREE',
  'SŞ',
  'bursa',
  'Mudanya',
  'Şükrüçavuş Mah. Parti Sok. No: 4/B Mudanya / Bursa',
  '+902245444046',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Selim ŞENER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Nilüfer Lihkab',
  'lihkab-bursa-nilufer-ay',
  'FREE',
  'UA',
  'bursa',
  'Nilüfer',
  'Barbaros Cad. Kader Sok. Yerkaya Apt. No: 1/2 Nilüfer / Bursa',
  '+902242400410',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ufuk AY.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Nilüfer Lihkab',
  'lihkab-bursa-nilufer-bayar',
  'FREE',
  'YB',
  'bursa',
  'Nilüfer',
  'İhsaniye Mah. Cevherli Sk. İlham 1 Sitesi No: 2/1 Nilüfer / Bursa',
  '+902242547666',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yusuf BAYAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Osmangazi Lihkab',
  'lihkab-bursa-osmangazi-ak',
  'FREE',
  'AA',
  'bursa',
  'Osmangazi',
  'Beyazıt Mah. Taraklı Sok. No: 19/2 Yıldırım / Bursa',
  '+902243611615',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ahmet AK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Osmangazi Lihkab',
  'lihkab-bursa-osmangazi-ozcelik',
  'FREE',
  'ÖÖ',
  'bursa',
  'Osmangazi',
  'Beyazıt Mah. Taraklı Sok. Bayrak Apt. No: 7/1 Yıldırım / Bursa',
  '+902242451578',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Özcan ÖZÇELİK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Bursa Yıldırım Lihkab',
  'lihkab-bursa-yildirim-inal',
  'FREE',
  'Hİ',
  'bursa',
  'Yıldırım',
  'Beyazıt Mah. Taraklı Sk. No: 6/2 Yıldırım / Bursa',
  '+902243605878',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hülya İNAL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Çanakkale Ayvacık Lihkab',
  'lihkab-canakkale-ayvacik-kenan',
  'FREE',
  'KK',
  'canakkale',
  'Ayvacık',
  'Ümmühan mah. Tok Cad. No: 28/1 Ayvacık Ayvacık/ Çanakkale',
  '+902867121218',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kadir KENAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Çanakkale Merkez Lihkab',
  'lihkab-canakkale-merkez-orhan',
  'FREE',
  'HO',
  'canakkale',
  'Merkez',
  'İsmetpaşa Mah. Çınarlık Cad. No: 31/1 Merkez/ Çanakkale',
  '+902862128627',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hakan ORHAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Çanakkale Merkez Lihkab',
  'lihkab-canakkale-merkez-erbas',
  'FREE',
  'ME',
  'canakkale',
  'Merkez',
  'İsmetpaşa Mah. Nene Hatun Sok. No: 14/1 Merkez/ Çanakkale',
  '+902862135530',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet ERBAŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Çankırı Merkez Lihkab',
  'lihkab-cankiri-merkez-cibik',
  'FREE',
  'MÇ',
  'cankiri',
  'Merkez',
  'Cumhuriyet Mahallesi Necip Fazıl Kısakürek Cad. İkizler Merkezi Kat: 3 No: 17 Merkez/ Çankırı',
  '+903762129292',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa ÇIBIK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Çorum Merkez Lihkab',
  'lihkab-corum-merkez-yucel',
  'FREE',
  'AY',
  'corum',
  'Merkez',
  'Yavruturna Mah. Gazi Cad. 1. Kavukcu Sok. No: 2/2 Merkez/ Çorum',
  '+903646660092',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ali YÜCEL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Denizli Çivril Lihkab',
  'lihkab-denizli-civril-ozlusoz',
  'FREE',
  'UÖ',
  'denizli',
  'Çivril',
  'Saray Mah. Cumhuriyet Cad. No: 67/1 Çivril/ Denizli',
  '+902587132088',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Uğurtan ÖZLÜSÖZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Denizli Merkezefendi Lihkab',
  'lihkab-denizli-merkezefendi-kaya',
  'FREE',
  'FK',
  'denizli',
  'Merkezefendi',
  'Saltak Cad. Şükür Apt. No: 21/3 Merkezefendi/ Denizli',
  '+902582633231',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Fermani KAYA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Denizli Merkezefendi Lihkab',
  'lihkab-denizli-merkezefendi-alkaya',
  'FREE',
  'KA',
  'denizli',
  'Merkezefendi',
  'Saraylar Mah. Enverpaşa Cad. Özel İdare İşhanı Kat: 2 Merkezefendi/ Denizli',
  '+902582647752',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kazım ALKAYA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Denizli Pamukkale Lihkab',
  'lihkab-denizli-pamukkale-akyer',
  'FREE',
  'KA',
  'denizli',
  'Pamukkale',
  'Bahçelievler Mah. 29 Ekim Bulvarı No: 199 Zemin Kat / B Merkezefendi Pamukkale/ Denizli',
  '+902584085818',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kamil AKYER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Denizli Pamukkale Lihkab',
  'lihkab-denizli-pamukkale-karabulut',
  'FREE',
  'KK',
  'denizli',
  'Pamukkale',
  'Bahçelievler Mah. 29 Ekim Bulvarı No: 19/A Merkezefendi Pamukkale/ Denizli',
  '+902582633993',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kemal KARABULUT.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Denizli Pamukkale Lihkab',
  'lihkab-denizli-pamukkale-senel',
  'FREE',
  'MŞ',
  'denizli',
  'Pamukkale',
  'Bahçelievler Mah. 29 Ekim Bulvarı No: 207 Kat: 1 Merkezefendi Pamukkale/ Denizli',
  '+905336272100',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Muhsin ŞENEL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Diyarbakır Kayapınar Lihkab',
  'lihkab-diyarbakir-kayapinar-tuncay',
  'FREE',
  'AT',
  'diyarbakir',
  'Kayapınar',
  'Kooperatifler Mah. Mehmetçik Sok. Bayramoğlu Apt. Kat: 1/3 Yenişehir Kayapınar/ Diyarbakır',
  '+904122294579',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Asım TUNCAY.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Düzce Merkez Lihkab',
  'lihkab-duzce-merkez-sencan',
  'FREE',
  'SŞ',
  'duzce',
  'Merkez',
  'Camikebir Mah. Şen Sok. No: 11/11 Merkez/ Düzce',
  '+903805250065',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sabahattin ŞENCAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Edirne Merkez Lihkab',
  'lihkab-edirne-merkez-coban',
  'FREE',
  'ÖÇ',
  'edirne',
  'Merkez',
  'Şehit Emniyet Müdürü Ertan Nezihi Cad. İstasyon Mah. Ulusoy Plaza A Blok Kat:2 D:23 Merkez/ Edirne',
  '+902842251018',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Özdemir ÇOBAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Elazığ Merkez Lihkab',
  'lihkab-elazig-merkez-aktas',
  'FREE',
  'İA',
  'elazig',
  'Merkez',
  'Çarşı Mah. Bosna Hersek Bulvarı Mühendisler İş Merkezi No: 7 Kat: 3 Daire: 5 Merkez/ Elazığ',
  '+904242387870',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İbrahim AKTAŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Elazığ Merkez Lihkab',
  'lihkab-elazig-merkez-tekmen',
  'FREE',
  'ST',
  'elazig',
  'Merkez',
  'İzzetpaşa Mah. Mehmetçik Sok. No: 3/8 Tekmen İş Merkezi Kat: 4 Merkez/ Elazığ',
  '+904242123885',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Semih TEKMEN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Erzincan Merkez Lihkab',
  'lihkab-erzincan-merkez-yilmaz',
  'FREE',
  'RY',
  'erzincan',
  'Merkez',
  'Atatürk Mah. Nerim Tombul Cad. Adalet İş Merkezi Kat: 2 No: 6 Merkez/ Erzincan',
  '+904462142220',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Refik YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Erzurum Yakutiye Lihkab',
  'lihkab-erzurum-yakutiye-ataman',
  'FREE',
  'AA',
  'erzurum',
  'Yakutiye',
  'Muratpaşa Mah. İsmetpaşa Cad. No: 1 Arif Alper İş Merkezi Kat: 7 Yakutiye Yakutiye/ Erzurum',
  '+904422358841',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ali ATAMAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Erzurum Yakutiye Lihkab',
  'lihkab-erzurum-yakutiye-onal',
  'FREE',
  'OÖ',
  'erzurum',
  'Yakutiye',
  'Muratpaşa Mah. İsmetpaşa Cad. Arif Alper İş Mrk. Kat: 5 No: 9-10 Yakutiye Yakutiye/ Erzurum',
  '+904422371680',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Orhan ÖNAL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Eskişehir Odunpazarı Lihkab',
  'lihkab-eskisehir-odunpazari-sahin',
  'FREE',
  'AŞ',
  'eskisehir',
  'Odunpazarı',
  'Arifiye Mah. Yalbı Sok. Yılmazlar İş Merkezi No: 18/1 Odunpazarı/ Eskişehir',
  '+902222220221',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Aydın ŞAHİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Eskişehir Odunpazarı Lihkab',
  'lihkab-eskisehir-odunpazari-koyun',
  'FREE',
  'CK',
  'eskisehir',
  'Odunpazarı',
  'Arifiye Mah. Kireçciler Sok. No: 10/1 Odunpazarı/ Eskişehir',
  '+902222305636',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cüneyt KOYUN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Eskişehir Tepebaşı Lihkab',
  'lihkab-eskisehir-tepebasi-alp',
  'FREE',
  'DA',
  'eskisehir',
  'Tepebaşı',
  'Arifiye Mah. İki Eylül Cad. Kozluca Apt. No: 71/3 Odunpazarı Tepebaşı/ Eskişehir',
  '+902222222135',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Deniz ALP.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Eskişehir Tepebaşı Lihkab',
  'lihkab-eskisehir-tepebasi-kusgoz',
  'FREE',
  'ÜK',
  'eskisehir',
  'Tepebaşı',
  'Arifiye Mah. Kıbrıs Şehitleri Cad. No: 73/1 Odunpazarı Tepebaşı/ Eskişehir',
  '+902222305453',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ümit KUŞGÖZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Gaziantep Şahinbey Lihkab',
  'lihkab-gaziantep-sahinbey-haksever',
  'FREE',
  'CH',
  'gaziantep',
  'Şahinbey',
  'İncilipınar Mah. 3 nolu Cad. Bayel İş Merkezi A Blok altı No: 7/B Şehitkamil Şahinbey/ Gaziantep',
  '+903422302703',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cemalettin HAKSEVER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Gaziantep Şehitkamil Lihkab',
  'lihkab-gaziantep-sehitkamil-oksuz',
  'FREE',
  'HÖ',
  'gaziantep',
  'Şehitkamil',
  'İncilipınar Mah. 3 Nolu Cad. Bayel İş Merkezi A Blok Altı No: 7/C Şehitkamil/ Gaziantep',
  '+903422302701',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hanifi ÖKSÜZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Gaziantep Şehitkamil Lihkab',
  'lihkab-gaziantep-sehitkamil-ataoglu',
  'FREE',
  'İA',
  'gaziantep',
  'Şehitkamil',
  'İncilipınar Mah. Nişantaşı Sok. F&H İş Merkezi Altı No: 11/F Şehitkamil/ Gaziantep',
  '+903422152119',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İbrahim ATAOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Gaziantep Şehitkamil Lihkab',
  'lihkab-gaziantep-sehitkamil-gumus',
  'FREE',
  'MG',
  'gaziantep',
  'Şehitkamil',
  'İncilipınar Mah.3 Nolu Cad. No:5 Yunuslar İş Mrk. Kat: 2 Daire: 9 Şehitkamil Şehitkamil/ Gaziantep',
  '+903422200811',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet GÜMÜŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Hatay Antakya Lihkab',
  'lihkab-hatay-antakya-ergul',
  'FREE',
  'BE',
  'hatay',
  'Antakya',
  'Cumhuriyet Mah. Gündüz Cad. 1.Sok. Edipoğlu Apt. Kat: 2 No: 1/8 Antakya/ Hatay',
  '+903262166620',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Bülent ERGÜL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Hatay İskenderun Lihkab',
  'lihkab-hatay-iskenderun-tartan',
  'FREE',
  'AT',
  'hatay',
  'İskenderun',
  'Savaş Mah. Ulucami Cad. No: 6 Şirin İşhanı Kat: 3 Daire: 14-19 İskenderun/ Hatay',
  '+903266132201',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Atilla TARTAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Hatay İskenderun Lihkab',
  'lihkab-hatay-iskenderun-gencoglu',
  'FREE',
  'MG',
  'hatay',
  'İskenderun',
  'Savaş Mah. Şehit Pamir Cad. 50. Sokak Bakizade İşhanı No:1 K:2 D:11 İskenderun/ Hatay',
  '+903266148687',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet GENÇOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İsparta Merkez Lihkab',
  'lihkab-isparta-merkez-kinsiz',
  'FREE',
  'BK',
  'isparta',
  'Merkez',
  'Davraz Mahallesi 3906 Sok. No: 2/1 Merkez/ Isparta',
  '+902462402500',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Banu KINSIZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İsparta Merkez Lihkab',
  'lihkab-isparta-merkez-kinsiz-1',
  'FREE',
  'İK',
  'isparta',
  'Merkez',
  'Davraz Mahallesi 3906 Sok. No: 2/2 Merkez/ Isparta',
  '+902462402501',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İbrahim KINSIZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Arnavutköy Lihkab',
  'lihkab-istanbul-arnavutkoy-sezgin',
  'FREE',
  'ÇS',
  'istanbul',
  'Arnavutköy',
  'Merkez Mah. Eski Edirne Asfaltı Cad. Simpark Evleri No:1430/26 Arnavutköy / İstanbul',
  '+902125505315',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Çağrı SEZGİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Arnavutköy Lihkab',
  'lihkab-istanbul-arnavutkoy-avsar',
  'FREE',
  'SA',
  'istanbul',
  'Arnavutköy',
  'Merkez Mah. Eski Edirne Asfaltı Cad. Simpark Evleri No: 1430/24 Arnavutköy / İstanbul',
  '+902125971298',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Selahattin AVŞAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Ataşehir Lihkab',
  'lihkab-istanbul-atasehir-bekar',
  'FREE',
  'HB',
  'istanbul',
  'Ataşehir',
  'Küçükbakkalköy Mah. Kayışdağı Cad. Sümbül Sok. No:12 Ataşehir / İstanbul',
  '+902164561106',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hakan BEKAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Avcılar Lihkab',
  'lihkab-istanbul-avcilar-butun',
  'FREE',
  'MB',
  'istanbul',
  'Avcılar',
  'Cihangir Mah. Kirazlı Cad. Özcan Apt. No: 64/7 Avcılar / İstanbul',
  '+902125914423',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mahmut BÜTÜN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Bağcılar Lihkab',
  'lihkab-istanbul-bagcilar-berekatoglu',
  'FREE',
  'İB',
  'istanbul',
  'Bağcılar',
  'Güneş Mah. Kirazlı Cad. No: 4/109 Bağcılar / İstanbul',
  '+902125503290',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İdris BEREKATOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Bağcılar Lihkab',
  'lihkab-istanbul-bagcilar-koc',
  'FREE',
  'SK',
  'istanbul',
  'Bağcılar',
  'Güneş Mah. Sakarca Sok. No: 37 Kat: 2 Daire: 4 Bağcılar / İstanbul',
  '+902125503270',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sezai KOÇ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Bahçelievler Lihkab',
  'lihkab-istanbul-bahcelievler-yagci',
  'FREE',
  'RY',
  'istanbul',
  'Bahçelievler',
  'Siyavuş Paşa Mah. Barbaros Cad. No: 38/7 Bahçelievler / İstanbul',
  '+902129836160',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Rifat YAĞCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Başakşehir Lihkab',
  'lihkab-istanbul-basaksehir-demir',
  'FREE',
  'HD',
  'istanbul',
  'Başakşehir',
  'İos Mah. Giyim Sanatkarları İş ve Tic. Merkezi 2 Ada A Blok Kat: 6 No: 6014 Başakşehir / İstanbul',
  '+902125490436',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hıdır DEMİR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Başakşehir Lihkab',
  'lihkab-istanbul-basaksehir-unlu',
  'FREE',
  'MÜ',
  'istanbul',
  'Başakşehir',
  'İos Mah. Giyim Sanatkarları İş ve Tic. Merkezi 2 Ada A Blok Kat: 6 No: 6013 Başakşehir / İstanbul',
  '+902125493491',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet ÜNLÜ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Bayrampaşa Lihkab',
  'lihkab-istanbul-bayrampasa-gedik',
  'FREE',
  'MG',
  'istanbul',
  'Bayrampaşa',
  'Yenidoğan Mah. Abdi İpekçi Cad. No: 43/3 Bayrampaşa / İstanbul',
  '+902125653409',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet GEDİK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Beyoğlu Lihkab',
  'lihkab-istanbul-beyoglu-mordogan',
  'FREE',
  'ZM',
  'istanbul',
  'Beyoğlu',
  'Dikilitaş Mah. Eren Sok. No: 6/6 Beşiktaş / İstanbul',
  '+902122273880',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Zeynel MORDOĞAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Büyükçekmece Lihkab',
  'lihkab-istanbul-buyukcekmece-kircan',
  'FREE',
  'İK',
  'istanbul',
  'Büyükçekmece',
  'Dizdariye Mah. Çınar 1 Sok. No: 12/3-4 Büyükçekmece / İstanbul',
  '+902125791061',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İhsan KIRCAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Çekmeköy Lihkab',
  'lihkab-istanbul-cekmekoy-karagoz',
  'FREE',
  'AK',
  'istanbul',
  'Çekmeköy',
  'Merkez Mah. Erenler Cad. No: 15/A Çekmeköy / İstanbul',
  '+902166411060',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ahmed Cüneyd KARAGÖZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Çekmeköy Lihkab',
  'lihkab-istanbul-cekmekoy-gulcan',
  'FREE',
  'OG',
  'istanbul',
  'Çekmeköy',
  'Merkez Mah. Piri Reis Cad. No: 56 Daire: 2 Çekmeköy / İstanbul',
  '+902166390071',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Osman GÜLCAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Esenler Lihkab',
  'lihkab-istanbul-esenler-akca',
  'FREE',
  'ŞA',
  'istanbul',
  'Esenler',
  'Fevziçakmak Mah. 1104 Sok. No: 54 Esenler / İstanbul',
  '+902126470587',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Şebnem Yürükler AKÇA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Esenyurt Lihkab',
  'lihkab-istanbul-esenyurt-hisir',
  'FREE',
  'MH',
  'istanbul',
  'Esenyurt',
  'İncirtepe Mah. Doğan Araslı Bulvarı Korkmaz Plaza No: 70 Ofis: 13 Esenyurt / İstanbul',
  '+902126204141',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet HIŞIR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Esenyurt Lihkab',
  'lihkab-istanbul-esenyurt-mercimek',
  'FREE',
  'ŞM',
  'istanbul',
  'Esenyurt',
  'İncirtepe Mah. Doğan Araslı Bulvarı Korkmaz Plaza No: 70 Daire: 15 Esenyurt / İstanbul',
  '+902125965533',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Şükrü MERCİMEK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Esenyurt Lihkab',
  'lihkab-istanbul-esenyurt-ozbay',
  'FREE',
  'YÖ',
  'istanbul',
  'Esenyurt',
  'İncirtepe Mah. Doğan Araslı Bulvarı Korkmaz Plaza No: 70 Ofis: 14 Esenyurt / İstanbul',
  '+902126998283',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yahya Kemal ÖZBAY.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Eyüp Lihkab',
  'lihkab-istanbul-eyup-demir',
  'FREE',
  'ÜD',
  'istanbul',
  'Eyüp',
  'İslambey Mah. Halitpaşa Cad. No: 36 Eyüp / İstanbul',
  '+902122997583',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ümit DEMİR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Fatih Lihkab',
  'lihkab-istanbul-fatih-yilmaz',
  'FREE',
  'AY',
  'istanbul',
  'Fatih',
  'Akşemsettin Mah. Albay Cemil Sakarya Sok. No: 1/1 Fatih / İstanbul',
  '+902125213420',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Alparslan YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Kadıköy Lihkab',
  'lihkab-istanbul-kadikoy-topcu',
  'FREE',
  'ET',
  'istanbul',
  'Kadıköy',
  'Küçükbakkalköy Mah. Kocayusuf Sok. Kardeşler Apt. No: 45/2 Ataşehir / İstanbul',
  '+902164563220',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Engin TOPCU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Kadıköy Lihkab',
  'lihkab-istanbul-kadikoy-akdemir',
  'FREE',
  'GA',
  'istanbul',
  'Kadıköy',
  'Kayışdağı Cad. Kırmızı Sümbül Sok. No: 6/C Küçükbakkalköy Ataşehir / İstanbul',
  '+902165740262',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Günay AKDEMİR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Kadıköy Lihkab',
  'lihkab-istanbul-kadikoy-gunes',
  'FREE',
  'UG',
  'istanbul',
  'Kadıköy',
  'Hasanpaşa Mah. Fahrettin Kerim Gökay Cad. No: 11/1 Kadıköy / İstanbul',
  '+902165509696',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Umut Aziz GÜNEŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Kağıthane Lihkab',
  'lihkab-istanbul-kagithane-kocaman',
  'FREE',
  'UK',
  'istanbul',
  'Kağıthane',
  'Merkez Mah. Sadabat Cad. Demircan İş Merkezi 17/21 Kağıthane / İstanbul',
  '+902122954298',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Uğur KOCAMAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Kağıthane Lihkab',
  'lihkab-istanbul-kagithane-izci',
  'FREE',
  'Vİ',
  'istanbul',
  'Kağıthane',
  'Merkez Mah. Kemerburgaz Cad. Lale Sok. No: 3/5 Kağıthane / İstanbul',
  '+902123212195',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Volkan İZCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Kartal Lihkab',
  'lihkab-istanbul-kartal-dogan',
  'FREE',
  'SD',
  'istanbul',
  'Kartal',
  'Kartaltepe Mah. Spor Cad. Yazıcı Apt. A Blok No: 7 Daire: 1 Kartal / İstanbul',
  '+902163878938',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Safa DOĞAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Küçükçekmece Lihkab',
  'lihkab-istanbul-kucukcekmece-bulut',
  'FREE',
  'BB',
  'istanbul',
  'Küçükçekmece',
  'Halkalı Merkez Mah. 2. Okul Sok. No: 9 Kat: 2 Ofis No: 16 Küçükçekmece / İstanbul',
  '+905322448717',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Bilgehan BULUT.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Küçükçekmece Lihkab',
  'lihkab-istanbul-kucukcekmece-dogan',
  'FREE',
  'MD',
  'istanbul',
  'Küçükçekmece',
  'Halkalı Merkez Mah. 2. Okul Sok. No: 9 Kat: 2 Ofis No: 18 Küçükçekmece / İstanbul',
  '+902124269027',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat DOĞAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Küçükçekmece Lihkab',
  'lihkab-istanbul-kucukcekmece-gazioglu',
  'FREE',
  'OG',
  'istanbul',
  'Küçükçekmece',
  'Halkalı Merkez Mah. 2. Okul Sok. No: 9/15 Küçükçekmece / İstanbul',
  '+902124269338',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Oktay GAZİOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Maltepe Lihkab',
  'lihkab-istanbul-maltepe-eray',
  'FREE',
  'YE',
  'istanbul',
  'Maltepe',
  'Altayçeşme Mah. Bağdat Cad. Niş Apt. A Blok No: 373 Daire: 3 Maltepe / İstanbul',
  '+902163525525',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yeter Gülen ERAY.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Pendik Lihkab',
  'lihkab-istanbul-pendik-coskun',
  'FREE',
  'MC',
  'istanbul',
  'Pendik',
  'Doğu Mah. Bilge Sok. No: 11/B Pendik / İstanbul',
  '+902163966557',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Muharrem COŞKUN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Sancaktepe Lihkab',
  'lihkab-istanbul-sancaktepe-erdem',
  'FREE',
  'HE',
  'istanbul',
  'Sancaktepe',
  'Abdurrahmangazi Mah. Alparslan Cad. Bennur Sok. No: 16/2 Sancaktepe / İstanbul',
  '+902166223024',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Halil ERDEM.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Sancaktepe Lihkab',
  'lihkab-istanbul-sancaktepe-ceri',
  'FREE',
  'VÇ',
  'istanbul',
  'Sancaktepe',
  'Abdurrahmangazi Mah. Alparslan Cad. Bennur Sok. No: 16/1 Sancaktepe / İstanbul',
  '+902166223022',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Veysel ÇERİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Silivri Lihkab',
  'lihkab-istanbul-silivri-tufekci',
  'FREE',
  'ZT',
  'istanbul',
  'Silivri',
  'Alibey Mah. İhsan Sarıbekir Sok, Cumhuriyet Cd. No:2 Apt. D:3 Silivri/ İstanbul',
  '+902127270656',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Zeki TÜFEKCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Sultanbeyli Lihkab',
  'lihkab-istanbul-sultanbeyli-acil',
  'FREE',
  'AA',
  'istanbul',
  'Sultanbeyli',
  'Abdurrahmangazi Mah. Belediye Cad. Semerkant Sok. No: 9 Kat: 2 Sultanbeyli / İstanbul',
  '+902164964671',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Abdullah AÇIL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Sultanbeyli Lihkab',
  'lihkab-istanbul-sultanbeyli-tatar',
  'FREE',
  'BT',
  'istanbul',
  'Sultanbeyli',
  'Abdurrahmangazi Mah. Semerkant Sok No: 9/1 Sultanbeyli / İstanbul',
  '+902164962123',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Bünyamin TATAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Sultangazi Lihkab',
  'lihkab-istanbul-sultangazi-akbas',
  'FREE',
  'HA',
  'istanbul',
  'Sultangazi',
  'Merkez Mah. Serhat Sok. Serhat İş Merkezi No:2 Kat:3 D:16 Gaziosmanpaşa / İstanbul',
  '+902125633684',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hüseyin AKBAŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Şile Lihkab',
  'lihkab-istanbul-sile-aytek',
  'FREE',
  'NA',
  'istanbul',
  'Şile',
  'Hacı Kasım Mah. Ihlamur Sok. No: 12/2 Şile / İstanbul',
  '+902167041162',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Nihat AYTEK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Şişli Lihkab',
  'lihkab-istanbul-sisli-eroglu',
  'FREE',
  'RE',
  'istanbul',
  'Şişli',
  'Esentepe Subay Evleri Tevfik Erdönmez Paşa Sok. 8 Blok No: 9 Daire: 7 Şişli / İstanbul',
  '+902122670544',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Reşat EROĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Tuzla Lihkab',
  'lihkab-istanbul-tuzla-sahin',
  'FREE',
  'AŞ',
  'istanbul',
  'Tuzla',
  'Evliya Çelebi Mah. Hatboyu Cad. Ziver Çıkmazı No:1/2 Tuzla / İstanbul',
  '+902164468377',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Alper Zeki ŞAHİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Ümraniye Lihkab',
  'lihkab-istanbul-umraniye-eyuboglu',
  'FREE',
  'EE',
  'istanbul',
  'Ümraniye',
  'Atatürk Mah. Alemdağ Cad. 19/9 Ümraniye / İstanbul',
  '+902164431616',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ertuğrul Bahri EYÜBOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Ümraniye Lihkab',
  'lihkab-istanbul-umraniye-candan',
  'FREE',
  'YC',
  'istanbul',
  'Ümraniye',
  'Atatürk Mah. Alemdağ Cad. Karanfil Sk. Ümraniye İş Merkezi No: 2/13-14 Ümraniye / İstanbul',
  '+902164431627',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yıldıray CANDAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Üsküdar Lihkab',
  'lihkab-istanbul-uskudar-uslu',
  'FREE',
  'AU',
  'istanbul',
  'Üsküdar',
  'Aziz Mahmut Hüdayi Mah. Halk Cad. No: 4 Kat: 4 Üsküdar / İstanbul',
  '+902163429800',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Abdullah USLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İstanbul Zeytinburnu Lihkab',
  'lihkab-istanbul-zeytinburnu-saracik',
  'FREE',
  'TS',
  'istanbul',
  'Zeytinburnu',
  'Gökalp Mah. Muammer Aksoy Cad. No: 49 Daire: 2 Zeytinburnu / İstanbul',
  '+902124412829',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Tamer SARACIK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Aliağa Lihkab',
  'lihkab-izmir-aliaga-hatipoglu',
  'FREE',
  'MH',
  'izmir',
  'Aliağa',
  'Kültür Mah. Hükümet Cad. No: 40 Kat: 1 Daire: 3 Aliağa / İzmir',
  '+902326550501',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat HATİPOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Bornova Lihkab',
  'lihkab-izmir-bornova-sezer',
  'FREE',
  'MS',
  'izmir',
  'Bornova',
  'Manavkuyu Mah. 286/1 Sok. No: 16 Kat: 1 Daire: 2 Bornova / İzmir',
  '+902323882536',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa Alper SEZER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Buca Lihkab',
  'lihkab-izmir-buca-peker',
  'FREE',
  'MP',
  'izmir',
  'Buca',
  'Menderes Mah. 120 Sok. No: 1 Kat: 2 Daire: 3 Buca / İzmir',
  '+902324381676',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet PEKER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Çeşme Lihkab',
  'lihkab-izmir-cesme-tetik',
  'FREE',
  'MT',
  'izmir',
  'Çeşme',
  '16 Eylül Mah. 3007 Sok. No: 3/5 Çeşme / İzmir',
  '+902327122752',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat TETİK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Dikili Lihkab',
  'lihkab-izmir-dikili-yilmaz',
  'FREE',
  'ÖY',
  'izmir',
  'Dikili',
  'Salimbey Mah. 12. Sok. No: 2 Daire: 1 Dikili / İzmir',
  '+902326718088',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Özgür YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Karşıyaka Lihkab',
  'lihkab-izmir-karsiyaka-sendinc',
  'FREE',
  'MŞ',
  'izmir',
  'Karşıyaka',
  'Tuna Mah. İbrahim Yılmaz Sok. Ahi Apt. No: 29 Daire: 1-2 Karşıyaka / İzmir',
  '+902323237330',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet Akif ŞENDİNÇ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Kemalpaşa Lihkab',
  'lihkab-izmir-kemalpasa-sevgili',
  'FREE',
  'VS',
  'izmir',
  'Kemalpaşa',
  'Atatürk Bul. Melek Apt. No: 14 Kat: 1 Kemalpaşa / İzmir',
  '+902328785320',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Veysel SEVGİLİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Konak Lihkab',
  'lihkab-izmir-konak-soylu',
  'FREE',
  'ÖS',
  'izmir',
  'Konak',
  'İsmet Kaptan Mah., 1363. Sok., No:2, Konak, İzmir',
  '+902324847392',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Özgür SOYLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Menderes Lihkab',
  'lihkab-izmir-menderes-batur',
  'FREE',
  'OB',
  'izmir',
  'Menderes',
  'Kasımpaşa Mah. Atatürk Cad. No: 115 Kat: 1 Daire: 2 Menderes / İzmir',
  '+902326169490',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Okan BATUR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Menemen Lihkab',
  'lihkab-izmir-menemen-kaya',
  'FREE',
  'TK',
  'izmir',
  'Menemen',
  'Mermerli Mah. Şehit Aycan Aksoy Cad. Orman Apt. No: 58 Daire: 3 Menemen / İzmir',
  '+902326172025',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Tugay KAYA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Ödemiş Lihkab',
  'lihkab-izmir-odemis-barlak',
  'FREE',
  'MB',
  'izmir',
  'Ödemiş',
  'Cumhuriyet Mah. Cumhuriyet Cad. No:9 Ödemiş / İzmir',
  '+902325445036',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Muhammet Soydan BARLAK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Seferihisar Lihkab',
  'lihkab-izmir-seferihisar-sakci',
  'FREE',
  'BS',
  'izmir',
  'Seferihisar',
  'Camikebir Mah. Atatürk Cad. Çınar Plaza No: 7 Daire: 301 Seferihisar / İzmir',
  '+902327433990',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Barış SAKCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Tire Lihkab',
  'lihkab-izmir-tire-guzel',
  'FREE',
  'HG',
  'izmir',
  'Tire',
  'Kurtuluş Mah. Keten Köprü Sok. No: 6 Kat: 1 Tire / İzmir',
  '+902325056565',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Halil GÜZEL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Torbalı Lihkab',
  'lihkab-izmir-torbali-kivrak',
  'FREE',
  'SK',
  'izmir',
  'Torbalı',
  'Ertuğrul Mah. Mithatpaşa Cad. No: 56 A Blok Kat: 3 Daire: 15 Torbalı / İzmir',
  '+902328565455',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Seçkin KIVRAK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Urla Lihkab',
  'lihkab-izmir-urla-saglikcioglu',
  'FREE',
  'AS',
  'izmir',
  'Urla',
  'Hacıisa Mh. 75. Yıl Cumhuriyet Cad. No: 37/4 Urla / İzmir',
  '+902327545459',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Alpay SAĞLIKÇIOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'İzmir Urla Lihkab',
  'lihkab-izmir-urla-aksu',
  'FREE',
  'YA',
  'izmir',
  'Urla',
  'Hacıisa Mh. 75. Yıl Cumhuriyet Cad. No: 37/2 Urla / İzmir',
  '+902327545417',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yasin AKSU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kahramanmaraş Dulkadiroğlu Lihkab',
  'lihkab-kahramanmaras-dulkadiroglu-ozyesildag',
  'FREE',
  'MÖ',
  'kahramanmaras',
  'Dulkadiroğlu',
  'İsmetpaşa Mah. 36010 Sok. No: 2/11 Dulkadiroğlu/ Kahramanmaraş',
  '+903442219044',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa Oluş ÖZYEŞİLDAĞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kahramanmaraş Elbistan Lihkab',
  'lihkab-kahramanmaras-elbistan-acer',
  'FREE',
  'BA',
  'kahramanmaras',
  'Elbistan',
  'Ceyhan Mah. Dulkadiroğlu Cad. No: 29/34 - Elbistan/ Kahramanmaraş',
  '+903444155053',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Bilal ACER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kahramanmaraş Onikişubat Lihkab',
  'lihkab-kahramanmaras-onikisubat-avci',
  'FREE',
  'MA',
  'kahramanmaras',
  'Onikişubat',
  'Haydar Bey Mah. Prof.Dr.Necmettin Erbakan Bul. Yakamoz Sitesi A Blok Kat: 3 No: 9 Onikişubat/ Kahramanmaraş',
  '+903442240030',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa AVCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Karabük Merkez Lihkab',
  'lihkab-karabuk-merkez-ozcelik',
  'FREE',
  'DÖ',
  'karabuk',
  'Merkez',
  'Hürriyet Mah. İnönü Cad. Fatih Çarşısı Kat: 2 No: 201 Merkez/ Karabük',
  '+903704152324',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Doğan ÖZÇELİK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Karaman Merkez Lihkab',
  'lihkab-karaman-merkez-alkan',
  'FREE',
  'MA',
  'karaman',
  'Merkez',
  'Tahsin Ünal Mah. 8. Sok. No: 21/1 Kat: 1 Merkez/ Karaman',
  '+903382141456',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Metin ALKAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kastamonu Merkez Lihkab',
  'lihkab-kastamonu-merkez-tiryaki',
  'FREE',
  'FT',
  'kastamonu',
  'Merkez',
  'Kuzeykent Mah. Karadut Sok. Bizim Çarşı No:18/E Merkez/ Kastamonu',
  '+903362121603',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Feza TİRYAKİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kayseri Kocasinan Lihkab',
  'lihkab-kayseri-kocasinan-ipek',
  'FREE',
  'Hİ',
  'kayseri',
  'Kocasinan',
  'Gevher Nesibe Mah. Tekin Sok. Hukuk Plaza Kat:5 No:37 Kocasinan/ Kayseri',
  '+903522313807',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan İPEK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kayseri Kocasinan Lihkab',
  'lihkab-kayseri-kocasinan-ozturk',
  'FREE',
  'SÖ',
  'kayseri',
  'Kocasinan',
  'Gevher Nesibe Mah. Tekin Sok. Elit Plaza No: 22 Kat :3/11 Kocasinan Kocasinan/ Kayseri',
  '+903522226006',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sami Hakan ÖZTÜRK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kayseri Melikgazi Lihkab',
  'lihkab-kayseri-melikgazi-ipek',
  'FREE',
  'Aİ',
  'kayseri',
  'Melikgazi',
  'Gevher Nesibe Mah. Tekin Sok. Hukuk Plaza Kat: 2 No: 11 Kocasinan Melikgazi/ Kayseri',
  '+903522225900',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ayten İPEK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kayseri Melikgazi Lihkab',
  'lihkab-kayseri-melikgazi-yucel',
  'FREE',
  'FY',
  'kayseri',
  'Melikgazi',
  'Gevher Nesibe Mah. Tekin Sok. Elit Plaza No: 22 Kat: 3/14 Kocasinan Melikgazi/ Kayseri',
  '+903522210474',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Fatma YÜCEL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kayseri Talas Lihkab',
  'lihkab-kayseri-talas-ediz',
  'FREE',
  'CE',
  'kayseri',
  'Talas',
  'Gevher Nesibe Mah. Tekin Sok. Elit Plaza No: 22/20 Kocasinan Talas/ Kayseri',
  '+903522226162',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Caner EDİZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kırıkkale Merkez LİHKAB',
  'lihkab-kirikkale-merkez-aktas',
  'FREE',
  'FA',
  'kirikkale',
  'Merkez',
  'Yeni Mahalle Tuna Cad. Babadağ Apt. NO: 13/3 Merkez/ Kırıkkale',
  '+903182127312',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Feramis AKTAŞ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kırklareli Lüleburgaz Lihkab',
  'lihkab-kirklareli-luleburgaz-ozdiger',
  'FREE',
  'HÖ',
  'kirklareli',
  'Lüleburgaz',
  'Kocasinan Mah. Çakmak Sok. No: 37 Yonca Apt.Daire: 1 Lüleburgaz/ Kırklareli',
  '+902884171722',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan Onur ÖZDİĞER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kırklareli Merkez Lihkab',
  'lihkab-kirklareli-merkez-uzun',
  'FREE',
  'SU',
  'kirklareli',
  'Merkez',
  'Karakaş Mah. 768 Emek Sok. Bağdan Apt. Zemin Kat No: 4/30 Merkez/ Kırklareli',
  '+902882121603',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Serdar UZUN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kırşehir Merkez Lihkab',
  'lihkab-kirsehir-merkez-atceken',
  'FREE',
  'BA',
  'kirsehir',
  'Merkez',
  'Menderes Mah. 92. Sok. No: 7/2 Merkez/ Kırşehir',
  '+903862134342',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Bekir Hikmet ATÇEKEN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kırşehir Merkez Lihkab',
  'lihkab-kirsehir-merkez-yavuz',
  'FREE',
  'HY',
  'kirsehir',
  'Merkez',
  'Menderes Mah. 98. Sok. Melik Gazi Apt. No: 12/1 Merkez/ Kırşehir',
  '+903862139575',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan YAVUZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kocaeli Başiskele Lihkab',
  'lihkab-kocaeli-basiskele-ayyildiz',
  'FREE',
  'CA',
  'kocaeli',
  'Başiskele',
  'Barbaros Mah. Millet Caddesi No: 29 Kat: 1/1 Başiskele/ Kocaeli',
  '+902623433030',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Celal AYYILDIZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kocaeli Gebze Lihkab',
  'lihkab-kocaeli-gebze-kaya',
  'FREE',
  'CK',
  'kocaeli',
  'Gebze',
  'Hacı Halil Mah. Ali Rıza Efendi Cad. No: 37/4 Gebze/ Kocaeli',
  '+902626467501',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cebrail KAYA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kocaeli Gebze Lihkab',
  'lihkab-kocaeli-gebze-yilmaz',
  'FREE',
  'SY',
  'kocaeli',
  'Gebze',
  'Hacı Halil Mah. Ali Rıza Efendi Cad. No: 37/7 Kat: 4 Gebze/ Kocaeli',
  '+902626467502',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sonel YILMAZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kocaeli İzmit Lihkab',
  'lihkab-kocaeli-izmit-yararli',
  'FREE',
  'YY',
  'kocaeli',
  'İzmit',
  'Ömerağa Mah. Cumhuriyet Cad. No: 136/2 İzmit İzmit/ Kocaeli',
  '+902623219453',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yüsuf YARARLI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kocaeli Körfez Lihkab',
  'lihkab-kocaeli-korfez-ozturk',
  'FREE',
  'ŞÖ',
  'kocaeli',
  'Körfez',
  'Barbaros Mah. Org. Eşref Bitlis Cad. No: 165/1 Körfez/ Kocaeli',
  '+902625274800',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Şahin Alparslan ÖZTÜRK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Konya Karatay Lihkab',
  'lihkab-konya-karatay-taspinar',
  'FREE',
  'CT',
  'konya',
  'Karatay',
  'Şükran Mah. Furgan Dede Cad. No: 85 A/4 Meram Karatay/ Konya',
  '+903323528266',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cahit TAŞPINAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Konya Meram Lihkab',
  'lihkab-konya-meram-ozkale',
  'FREE',
  'İÖ',
  'konya',
  'Meram',
  'İhsaniye Mah. Kazım Karabekir Cad. Selçuk Apt. No:74/4 Selçuklu Meram/ Konya',
  '+903323243672',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İsmail ÖZKALE.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Konya Meram Lihkab',
  'lihkab-konya-meram-maharac',
  'FREE',
  'MM',
  'konya',
  'Meram',
  'İhsaniye Mah. Kazım Karabekir Cad. Selçuk Apt. No:74/5 Selçuklu Meram/ Konya',
  '+903323222096',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa MAHARAÇ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Konya Merkez Lihkab',
  'lihkab-konya-merkez-akin',
  'FREE',
  'EA',
  'konya',
  'Merkez',
  'Hacımutahir Mah. Rasim Eren Cad. Öntaş Apt. No:10/1 Ereğli Merkez/ Konya',
  '+903327136068',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Engin AKİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Konya Selçuklu Lihkab',
  'lihkab-konya-selcuklu-kocak',
  'FREE',
  'AK',
  'konya',
  'Selçuklu',
  'Şeyhsadrettin Mah. Millet Cad. No: 8/10 Meram Selçuklu/ Konya',
  '+903323212157',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Adnan KOÇAK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Konya Selçuklu Lihkab',
  'lihkab-konya-selcuklu-gokcan',
  'FREE',
  'EG',
  'konya',
  'Selçuklu',
  'Şeyhsadrettin Mah. Millet Cad. No: 8/3 Kat: 1 Meram Selçuklu/ Konya',
  '+903323204748',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Erkan GÖKCAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kütahya Merkez Lihkab',
  'lihkab-kutahya-merkez-ozden',
  'FREE',
  'MÖ',
  'kutahya',
  'Merkez',
  'Alipaşa Mahallesi Zafer Meydanı Tarım Kredi İş Merkezi No: 5/6 Teknosa Üstü Merkez/ Kütahya',
  '+902743330077',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa ÖZDEN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kütahya Merkez Lihkab',
  'lihkab-kutahya-merkez-gurbuz',
  'FREE',
  'NG',
  'kutahya',
  'Merkez',
  'Servi Mah. Atatürk Bulvarı Faruk SOYDAN Apt. No: 11 A-Blok Kat: 1 Daire: 1 Merkez/ Kütahya',
  '+902742122526',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Nurullah GÜRBÜZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kütahya Simav Lihkab',
  'lihkab-kutahya-simav-akboga',
  'FREE',
  'OA',
  'kutahya',
  'Simav',
  '4 Eylül Mahallesi Yeni Garaj Caddesi No: 20/A Simav Simav/ Kütahya',
  '+902745136301',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Orhan AKBOĞA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Kütahya Tavşanlı Lihkab',
  'lihkab-kutahya-tavsanli-cezayerli',
  'FREE',
  'EC',
  'kutahya',
  'Tavşanlı',
  'Yeni Mahalle Emet Caddesi No: 27 Kat: 1 Daire: 8 Tavşanlı Tavşanlı/ Kütahya',
  '+902746141426',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Emir Murat CEZAYERLİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Malatya Yeşilyurt Lihkab',
  'lihkab-malatya-yesilyurt-coskun',
  'FREE',
  'MC',
  'malatya',
  'Yeşilyurt',
  'Dabakhane Mah. Tenzile Sok. Gözde İş Merkezi Kat:1 No: 1 Yeşilyurt/ Malatya',
  '+904223240828',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet Akif COŞKUN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Malatya Yeşilyurt Lihkab',
  'lihkab-malatya-yesilyurt-ozer',
  'FREE',
  'MÖ',
  'malatya',
  'Yeşilyurt',
  'İsmetiye Mah. Niyazi Mısri Cad. Karakaş Apt. No: 34 Kat: 1 Battalgazi Yeşilyurt/ Malatya',
  '+904224813333',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Murat ÖZER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Manisa Akhisar Lihkab',
  'lihkab-manisa-akhisar-yildiz',
  'FREE',
  'CY',
  'manisa',
  'Akhisar',
  'Paşa Mah. 12. Sok. No: 16/1 Akhisar/ Manisa',
  '+902364121025',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cahit YILDIZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Manisa Akhisar Lihkab',
  'lihkab-manisa-akhisar-okan',
  'FREE',
  'YO',
  'manisa',
  'Akhisar',
  'Paşa Mah. 12. Sok. No: 26/83 Akhisar/ Manisa',
  '+902362120212',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yüksel OKAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Manisa Salihli Lihkab',
  'lihkab-manisa-salihli-davasli',
  'FREE',
  'ED',
  'manisa',
  'Salihli',
  'Kocaçeşme Acısu Cad. No: 102/2 Salihli/ Manisa',
  '+902367137984',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ercan DAVASLI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Manisa Yunusemre Lihkab',
  'lihkab-manisa-yunusemre-turkeri',
  'FREE',
  'ST',
  'manisa',
  'Yunusemre',
  'Peker Mah. Belediye Cad. No: 34/4 Şehzadeler Yunusemre/ Manisa',
  '+902362390700',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Saruhan TÜRKERİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mardin Artuklu Lihkab',
  'lihkab-mardin-artuklu-ekin',
  'FREE',
  'LE',
  'mardin',
  'Artuklu',
  '13 Mart Mah. Şehit M.Remzi Yersel Cad. Yağmurcu Apt. Kat: 1 No: 2 Artuklu/ Mardin',
  '+904822133171',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Lütfi EKİN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mersin Akdeniz Lihkab',
  'lihkab-mersin-akdeniz-ucan',
  'FREE',
  'AU',
  'mersin',
  'Akdeniz',
  'Limonluk Mahallesi Hüseyin Okan Merzeci Bulvarı Neoflat Plaza C Blok No: 412-1/1 Yenişehir Akdeniz/ Mersin',
  '+903242315760',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Altay UÇAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mersin Erdemli Lihkab',
  'lihkab-mersin-erdemli-karaman',
  'FREE',
  'FK',
  'mersin',
  'Erdemli',
  'Akdeniz Mahallesi 1001 Sokak No: 15/B Erdemli/ Mersin',
  '+903245153130',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Faysal KARAMAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mersin Mezitli Lihkab',
  'lihkab-mersin-mezitli-oz',
  'FREE',
  'CÖ',
  'mersin',
  'Mezitli',
  'Bahçelievler Mah. Hüseyin Okan Merzeci Bulv. No: 488 Tolga Sitesi C Blok Kat: 2 No: 3 Yenişehir Mezitli/ Mersin',
  '+903243367730',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Caner ÖZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mersin Silifke Lihkab',
  'lihkab-mersin-silifke-terman',
  'FREE',
  'İT',
  'mersin',
  'Silifke',
  'Saray Mah. Ziya Uygur Cad. Onuk İş Merkezi No: 12/208 Silifke/ Mersin',
  '+903247120505',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İbrahim TERMAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mersin Tarsus Lihkab',
  'lihkab-mersin-tarsus-ciplak',
  'FREE',
  'FÇ',
  'mersin',
  'Tarsus',
  'Şehitmustafa Mah. Atatürk Bulvarı Beybolat İşhanı No: 7/201 Tarsus/ Mersin',
  '+903246131830',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Feyzullah ÇIPLAK.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Mersin Toroslar Lihkab',
  'lihkab-mersin-toroslar-bostanci',
  'FREE',
  'AB',
  'mersin',
  'Toroslar',
  'Limonluk Mahallesi Hüseyin Okan Merzeci Bulvarı Neoflat Sitesi C Blok No:412 Kat:3 Daire:6 Yenişehir Toroslar/ Mersin',
  '+903242371211',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Alpaslan BOSTANCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Muğla Bodrum Lihkab',
  'lihkab-mugla-bodrum-ilker',
  'FREE',
  'Mİ',
  'mugla',
  'Bodrum',
  'Ortakent Mah. Kemer Cad. No: 3-5 Daire: 1 Bodrum/ Muğla',
  '+902523131412',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mustafa İLKER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Muğla Bodrum Lihkab',
  'lihkab-mugla-bodrum-gocmez',
  'FREE',
  'SG',
  'mugla',
  'Bodrum',
  'Ortakent Mah. Kemer Cad. No: 3-4 Daire: 1 Bodrum/ Muğla',
  '+902523131412',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Semih GÖÇMEZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Muğla Fethiye LİHKAB',
  'lihkab-mugla-fethiye-guner',
  'FREE',
  'BG',
  'mugla',
  'Fethiye',
  'Cumhuriyet Mah. Hükümet Cad. Yeni Belediye Çarşısı No:17/90 Fethiye/ Muğla',
  '+902526124535',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Birol GÜNER.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Muğla Fethiye Lihkab',
  'lihkab-mugla-fethiye-ugan',
  'FREE',
  'EU',
  'mugla',
  'Fethiye',
  'Cumhuriyet Mah. Çarşı Cad. No: 1 Likya İş Merkezi Kat: 2 Daire: 207 Fethiye/ Muğla',
  '+902526121115',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Eser Şerif UGAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Muğla Menteşe Lihkab',
  'lihkab-mugla-mentese-ceylan',
  'FREE',
  'ÖC',
  'mugla',
  'Menteşe',
  'Karamehmet Mah. 64. Sok. No: 1C/7 Menteşe/ Muğla',
  '+902522124809',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ömer CEYLAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Muğla Milas Lihkab',
  'lihkab-mugla-milas-karakaya',
  'FREE',
  'SK',
  'mugla',
  'Milas',
  'Hayıtlı Mah. Barış Cad. No: 20/2 Milas/ Muğla',
  '+902525121062',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Sadık Şenol KARAKAYA.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Nevşehir Merkez Lihkab',
  'lihkab-nevsehir-merkez-ceylan',
  'FREE',
  'SC',
  'nevsehir',
  'Merkez',
  'Bahçelievler Mah. Mustafa Parmaksız Cad. No: 28/1 Merkez/ Nevşehir',
  '+903842131177',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Savaş CEYLAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Niğde Merkez Lihkab',
  'lihkab-nigde-merkez-gungor',
  'FREE',
  'MG',
  'nigde',
  'Merkez',
  'Yukarı Kayabaşı Mah. Ptt Sok. Esin Apt. Kat:1 No: 2 Merkez/ Niğde',
  '+903882131377',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Muhammed GÜNGÖR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Ordu Merkez Lihkab',
  'lihkab-ordu-merkez-birinci',
  'FREE',
  'ÖB',
  'ordu',
  'Merkez',
  'Karşıyaka Mah. 948. Sok. No: 6/1 Altınordu Merkez/ Ordu',
  '+904528884343',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ömer BİRİNCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Osmaniye Merkez Lihkab',
  'lihkab-osmaniye-merkez-yanar',
  'FREE',
  'HY',
  'osmaniye',
  'Merkez',
  'Raufbey Mahallesi Adnan Menderes Bulvarı Safaevler Sitesi B-3 Blok Kat: 1 No: 3 Merkez/ Osmaniye',
  '+903288255055',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Halis YANAR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Sakarya Adapazarı Lihkab',
  'lihkab-sakarya-adapazari-sekmen',
  'FREE',
  'AS',
  'sakarya',
  'Adapazarı',
  'Semerciler Mah. Yenibosna Cad. Yörük Sok. Koçak Apt. No: 3 Kat: 2 Adapazarı/ Sakarya',
  '+902647771313',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ahmet Akif SEKMEN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Sakarya Adapazarı Lihkab',
  'lihkab-sakarya-adapazari-yekte',
  'FREE',
  'UY',
  'sakarya',
  'Adapazarı',
  'Orta Mah. Soğan Pazarı Cad. Sarıoğlu İş Hanı Kat: 1 No: 101 Adapazarı/ Sakarya',
  '+902647772110',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Uğurcem YEKTE.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Sakarya Serdivan Lihkab',
  'lihkab-sakarya-serdivan-kabaoglu',
  'FREE',
  'İK',
  'sakarya',
  'Serdivan',
  'Arabacıalanı Mah. Şehit Mehmet Karabaşoğlu Cad. No: 4/10 Serdivan/ Sakarya',
  '+902642101033',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İskender KABAOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Samsun Atakum Lihkab',
  'lihkab-samsun-atakum-karaguzel',
  'FREE',
  'AK',
  'samsun',
  'Atakum',
  'Liman Mah. Bolu Sok. No: 7 Daire: 4 İlkadım Atakum/ Samsun',
  '+903624451755',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ayten KARAGÜZEL.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Samsun Atakum Lihkab',
  'lihkab-samsun-atakum-kilic',
  'FREE',
  'KK',
  'samsun',
  'Atakum',
  'Liman Mah. Bolu Sok. No: 1/3 İlkadım Atakum/ Samsun',
  '+903624452828',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Kemal KILIÇ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Samsun İlkadım Lihkab',
  'lihkab-samsun-ilkadim-avci',
  'FREE',
  'HA',
  'samsun',
  'İlkadım',
  'Liman Mah. Şehit J.Er Yusuf Keskin Sok. Kartal Apt. No: 3/2 İlkadım/ Samsun',
  '+903624452105',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan AVCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Sivas Merkez Lihkab',
  'lihkab-sivas-merkez-temiz',
  'FREE',
  'CT',
  'sivas',
  'Merkez',
  'Mehmet Akif Ersoy Mah. Karaağaç Cad. No: 70/1-c-d Merkez/ Sivas',
  '+903462114544',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Cem Mutlu TEMİZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Şanlıurfa Haliliye LİHKAB',
  'lihkab-sanliurfa-haliliye-cadirci',
  'FREE',
  'MÇ',
  'sanliurfa',
  'Haliliye',
  'Şairnabi Mah. 156. Sok. No: 12/1 Haliliye/ Şanlıurfa',
  '+904143124020',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet Sadık ÇADIRCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tekirdağ Çerkezköy Lihkab',
  'lihkab-tekirdag-cerkezkoy-kumdakci',
  'FREE',
  'SK',
  'tekirdag',
  'Çerkezköy',
  'Gaziosmanpaşa Mah. Uğur Mumcu Cad. Mustafa Ordu İş Merkezi Kat: 2 Daire: 5-6 Çerkezköy/ Tekirdağ',
  '+902827250403',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Serdar KUMDAKCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tekirdağ Çorlu Lihkab',
  'lihkab-tekirdag-corlu-bostanci',
  'FREE',
  'İB',
  'tekirdag',
  'Çorlu',
  'Şehsinan Mah. Kocaağa Sok. Bayol İş Mrk. Kat: 2 Daire: 68 Çorlu/ Tekirdağ',
  '+902826540544',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İlker BOSTANCI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tekirdağ Ergene Lihkab',
  'lihkab-tekirdag-ergene-emeksiz',
  'FREE',
  'UE',
  'tekirdag',
  'Ergene',
  'Sağlık Mah. Edirne Cad. No: 59 Hasev İş Merkezi Kat: 3 Daire: 12 Ergene/ Tekirdağ',
  '+902826060676',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Uğur EMEKSİZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tekirdağ Süleymanpaşa Lihkab',
  'lihkab-tekirdag-suleymanpasa-cakir',
  'FREE',
  'HÇ',
  'tekirdag',
  'Süleymanpaşa',
  'Hükümet Cad. Belediye İş Merkezi No: 202 Süleymanpaşa/ Tekirdağ',
  '+902822625447',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan ÇAKIR.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tekirdağ Süleymanpaşa Lihkab',
  'lihkab-tekirdag-suleymanpasa-arayici',
  'FREE',
  'YA',
  'tekirdag',
  'Süleymanpaşa',
  'Eskicami-Ortacami Mah. Namık Kemal Cad. Turşucular İşhanı Kat: 1 No: 5/4 Süleymanpaşa/ Tekirdağ',
  '+902822620506',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yalçın ARAYICI.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tokat Merkez Lihkab',
  'lihkab-tokat-merkez-vargeloglu',
  'FREE',
  'FV',
  'tokat',
  'Merkez',
  'Kabei Mescid Mah. Sulusokak Cad. No: 2 Kat: 2/21 Merkez/ Tokat',
  '+903562100006',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Fatih VARGELOĞLU.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Tokat Merkez Lihkab',
  'lihkab-tokat-merkez-dikisci',
  'FREE',
  'HD',
  'tokat',
  'Merkez',
  'Kabei Mescid Mah. Sulusokak Cad. No: 2/23-24-41-42 Merkez/ Tokat',
  '+903562146331',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Hasan Mete DİKİŞCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Trabzon Ortahisar Lihkab',
  'lihkab-trabzon-ortahisar-ozkan',
  'FREE',
  'EÖ',
  'trabzon',
  'Ortahisar',
  'Gülbahar Hatun Mah. Maraş Cad. No: 243 Ortahisar/ Trabzon',
  '+904622294449',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Eyüp ÖZKAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Trabzon Ortahisar Lihkab',
  'lihkab-trabzon-ortahisar-saglam',
  'FREE',
  'İS',
  'trabzon',
  'Ortahisar',
  'Gülbaharhatun Mah. Lütfullah Sok. No: 2/E Atapark Ortahisar/ Trabzon',
  '+904622234736',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: İsmail SAĞLAM.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Uşak Merkez Lihkab',
  'lihkab-usak-merkez-efe',
  'FREE',
  'ME',
  'usak',
  'Merkez',
  'Köme Mah. Ahmet Yılancıoğlu İş Hanı Kat: 2 Daire: 201 Merkez/ Uşak',
  '+902762151314',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Muzaffer EFE.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Van İpekyolu Lihkab',
  'lihkab-van-ipekyolu-uzun',
  'FREE',
  'AU',
  'van',
  'İpekyolu',
  'Vali Mithat Bey Mah. Hastane Cad. Yavuz Pasajı Kat: 1 No: 10 İpekyolu/ Van',
  '+904322141418',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ali UZUN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Van İpekyolu Lihkab',
  'lihkab-van-ipekyolu-ekici',
  'FREE',
  'YE',
  'van',
  'İpekyolu',
  'Vali Mithat Bey Mah. Hastane Cad. Yavuz Pasajı Kat: 1 No: 9 İpekyolu/ Van',
  '+904322168216',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Yıldırım EKİCİ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Yalova Merkez LİHKAB',
  'lihkab-yalova-merkez-harcvuran',
  'FREE',
  'FH',
  'yalova',
  'Merkez',
  'Adnan Menderes Mah. Rahmi Üstel Cad. No: 7/A Merkez/ Yalova',
  '+902268120080',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Ferruh HARÇVURAN.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();

INSERT INTO companies (name,slug,tier,avatar,city_slug,district,address,phone,services,tags,verified,is_active,description)
VALUES (
  'Zonguldak Merkez Lihkab',
  'lihkab-zonguldak-merkez-karagoz',
  'FREE',
  'MK',
  'zonguldak',
  'Merkez',
  'Gazipaşa Cad.Cumhuriyet İş Merkezi No:15 Kat:1 Merkez/ Zonguldak',
  '+903722680440',
  ARRAY['lihkab'],
  ARRAY['lihkab','lisanslı','kadastro'],
  TRUE,
  TRUE,
  'Kamu adına iş yapma yetkisine sahip LİHKAB bürosu. Lisans sahibi: Mehmet KARAGÖZ.'
) ON CONFLICT (slug) DO UPDATE SET
  phone   = EXCLUDED.phone,
  address = EXCLUDED.address,
  updated_at = NOW();
