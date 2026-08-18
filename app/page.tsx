"use client";

import { useState } from "react";
import Link from "next/link";

// Ana Kategoriler ve Alt Kategorileri Tanımlayalım
const kategorilerData: { [key: string]: string[] } = {
  "Tümü": [],
  "Giyim, Ayakkabı ve Aksesuar": ["Kadın Giyim", "Erkek Giyim", "Kadın Ayakkabı", "Erkek Ayakkabı", "Çanta Ve Aksesuar"],
  "Elektronik Ve Teknolojik Ürünler": ["Telefon Ve Tablet", "Bilgisayar", "Beyaz Eşya ve Tv", "Küçük Ev Aletleri"],
  "Kozmetik Ve Kişisel Bakım": ["Cilt Bakımı", "Makyaj", "Parfüm Ve Deodorant", "Saç Bakımı"],
  "Ev, Yaşam Ve Dekorasyon": ["Mobilya", "Ev Tekstili", "Mutfak Gereçleri", "Aydınlatma Ve Dekorasyon"],
  "Anne, Bebek ve Oyuncak": ["Bebek Giyim", "Bebek Bakımı", "Oyuncaklar"],
  "Spor, Outdoor ve Hobi": ["Spor Ekipmanları", "Outdoor", "Kitap-Müzik ve Hobi"],
  "Ofis Mobilyaları": ["Ofis Takımları", "Makam Takımları", "Ofis Koltukları", "Çalışma Masaları"],
};

export default function Home() {
  const [seciliAnaKategori, setSeciliAnaKategori] = useState("Tümü");
  const [seciliAltKategori, setSeciliAltKategori] = useState("");

  const altKategoriler = kategorilerData[seciliAnaKategori] || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Üst Fırsat Bandı */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
        <span className="font-bold">SÜPER FIRSAT:</span> Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! Sınırlı Sayıda Stok. 🔥
      </div>

      {/* Header / Üst Menü */}
      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
            TREND<span className="text-orange-500">TAN</span>
          </span>
        </div>
      </header>

      {/* 1. SEVİYE ANA KATEGORİLER (Sağa sola kaydırılabilir) */}
      <div className="w-full bg-white border-b border-gray-100 py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 whitespace-nowrap">
          {Object.keys(kategorilerData).map((kategori, index) => (
            <button
              key={index}
              onClick={() => {
                setSeciliAnaKategori(kategori);
                setSeciliAltKategori(""); // Ana kategori değişince alt seçimi sıfırla
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                seciliAnaKategori === kategori
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SEVİYE ALT KATEGORİLER (Ana kategori seçilince üst kısımda açılır) */}
      {altKategoriler.length > 0 && (
        <div className="w-full bg-orange-50/60 border-b border-orange-100 py-2.5 px-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-2 whitespace-nowrap">
            <span className="text-xs font-bold text-orange-600 mr-2 uppercase tracking-wide">Alt Kategoriler:</span>
            {altKategoriler.map((alt, idx) => (
              <button
                key={idx}
                onClick={() => setSeciliAltKategori(alt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  seciliAltKategori === alt
                    ? "bg-orange-600 text-white shadow"
                    : "bg-white text-orange-900 border border-orange-200 hover:bg-orange-100"
                }`}
              >
                {alt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ana İçerik Alanı */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-8 py-6 flex flex-col items-center">
        {/* İnce ve Genişletilmiş Turuncu Banner */}
        <div className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 rounded-2xl py-6 px-6 sm:px-12 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden mb-8">
          <div className="flex flex-col text-center sm:text-left">
            <span className="bg-black/40 text-orange-200 text-xs font-bold px-3 py-1 rounded-full mb-2 w-fit mx-auto sm:mx-0 tracking-wide">
              TAN MEDYA TASARIM KURULUŞUDUR
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Sen de Ürünlerini Satmaya Başla!
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl">
              Mağazanızı hemen açın, binlerce müşteriye anında ulaşın ve kazancınızı katlayın.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-6 py-3 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Mağaza Aç →
          </Link>
        </div>

        {/* Ürünler Eklendiğinde Gözükecek Temiz Alan */}
        <div className="w-full max-w-7xl flex-1 text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mb-3 shadow-inner">
            📦
          </div>
          <p className="text-gray-600 font-semibold text-base sm:text-lg">
            {seciliAltKategori 
              ? `"${seciliAltKategori}" kategorisinde henüz ürün bulunmuyor.` 
              : seciliAnaKategori !== "Tümü" 
              ? `"${seciliAnaKategori}" kategorisinde henüz ürün bulunmuyor.` 
              : "Mağazalar ve ürünler yakında burada listelenecektir."}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Ürün eklemek veya mağazanızı yönetmek için panel girişini kullanabilirsiniz.
          </p>
        </div>
      </main>
    </div>
  );
}