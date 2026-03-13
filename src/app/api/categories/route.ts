import { NextResponse } from "next/server"

// ServiceCategory enum değerleri — Prisma şemasıyla senkron
const CATEGORIES = [
  { id: "ROLOVE",                 name: "Rölöve",                          type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "ESKI_ESER",              name: "Eski Eser Rölövesi & Restorasyon", type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "HALIHAZIR_HARITA",       name: "Halihazır Harita",                 type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "APLIKASYON",             name: "Aplikasyon, İfraz, Tevhit",        type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "LIHKAB",                 name: "LİHKAB",                           type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "INSAAT_KONTROL",         name: "İnşaat Kontrol & Metraj",          type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "MADEN_OCAK",             name: "Maden & Ocak Ölçümü",              type: "Klasik Jeodezi & Kadastro", customFieldsSchema: [] },
  { id: "LAZER_TARAMA",           name: "Lazer Tarama & 3D Nokta Bulutu",   type: "3D Teknoloji",              customFieldsSchema: [] },
  { id: "BIM_MODELLEME",          name: "BIM Modelleme",                     type: "3D Teknoloji",              customFieldsSchema: [] },
  { id: "FOTOGRAMETRI",           name: "Fotogrametri",                      type: "3D Teknoloji",              customFieldsSchema: [] },
  { id: "DRONE_HARITALAMA",       name: "Drone / İHA Haritalama",            type: "3D Teknoloji",              customFieldsSchema: [] },
  { id: "CBS_GIS",                name: "CBS / GIS Hizmetleri",              type: "CBS / GIS",                 customFieldsSchema: [] },
  { id: "GAYRIMENKUL_DEGERLEME",  name: "Gayrimenkul Değerleme",             type: "Ticari & Değerleme",        customFieldsSchema: [] },
  { id: "CIHAZ_SATIS",            name: "Cihaz Satış & Kiralama",            type: "Ekipman",                   customFieldsSchema: [] },
  { id: "EGITIM_KURUMU",          name: "Eğitim Kurumu",                     type: "Eğitim",                    customFieldsSchema: [] },
]

export async function GET() {
  return NextResponse.json(CATEGORIES)
}
