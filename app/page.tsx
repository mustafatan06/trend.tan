"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // Seçilen aktif kategoriyi tutmak için state
  const [aktifKategori, setAktifKategori] = useState("Tümü");

  // Örnek ürün listesi (Yönetim panelinden ürün eklendikçe burası veritabanından/API'den beslenecek)
  const urunler = [
    { id: 1, baslik: "Kablosuz Kulaklık", fiyat: "1.250 TL", kategori: "Elektronik", gorsel: "🎧" },
    { id: 2, baslik: "Oversize Siyah Sweatshirt", fiyat: "650 TL", kategori: "Moda ve Giyim", gorsel: "👕" },
    { id: 3, baslik: "Akıllı Saat Pro", fiyat: "2.400 TL", kategori: "Elektronik", gorsel: "⌚" },
    { id: 4, baslik: "Çelik Termos 1L", fiyat: "450 TL", kategori: "Ev ve Yaşam", gorsel: "🥤" },
  ];

  // Kategoriye göre ürünleri filtreleme
  const filtrelenmisUrunler = aktifKategori === "Tümü" 
    ? urunler 
    : urunler.filter(u => u.kategori === aktifKategori);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Üst Fırsat Bandı */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
        <span className="font-bold">SÜPER FIRSAT:</span> Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! Sınırlı Sayıda Stok. 🔥
      </div>

      {/* Header / Üst Menü */}
      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            T
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
            TREND<span className="text-orange-500">TAN</span>
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <Link
            href="/satici-ol"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-sm font-semibold rounded-full transition-all shadow-sm"
          >
            Satıcı Ol
          </Link>
          <Link
            href="/magaza-ac"
            className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-full transition-all shadow-md flex items-center gap-2"
          >
            Mağaza Aç
          </Link>
        </div>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Banner Kartı */}
        <div className="w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden mb-8">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <span className="bg-black/80 text-orange-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide shadow-sm">
            TAN MEDYA TASARIM KURULUŞUDUR
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Sen de Ürünlerini Satmaya Başla!
          </h1>

          <p className="text-sm sm:text-base text-orange-50 max-w-xl mb-6 font-normal leading-relaxed">
            Mağazanızı hemen açın, binlerce müşteriye anında ulaşın. Kolay ürün yönetimi ve güvenli ödeme altyapısıyla kazancınızı katlayın.
          </p>

          <Link
            href="/magaza-ac"
            className="px-8 py-3.5 bg-black hover:bg-gray-900 text-white text-sm sm:text-base font-bold rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            Mağaza Aç →
          </Link>
        </div>

        {/* Kategoriler */}
        <div className="w-full mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              "Tümü",
              "Elektronik",
              "Moda ve Giyim",
              "Ev ve Yaşam",
              "Kozmetik ve Kişisel Bakım",
              "Spor and Outdoor",
              "Anne ve Bebek",
              "Kitap ve Hobi",
              "Yapı Market ve Oto",
              "Diğer",
            ].map((kategori, index) => (
              <button
                key={index}
                onClick={() => setAktifKategori(kategori)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                  aktifKategori === kategori
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>
        </div>

        {/* Ürünlerin Listelendiği Alan (Panelden Eklenenler Buraya Gelecek) */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {aktifKategori} Ürünleri <span className="text-sm text-gray-500 font-normal">({filtrelenmisUrunler.length} ürün)</span>
            </h2>
          </div>

          {filtrelenmisUrunler.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtrelenmisUrunler.map((urun) => (
                <div 
                  key={urun.id} 
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between"
                >
                  <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-4xl mb-4">
                    {urun.gorsel}
                  </div>
                  <div>
                    <span className="text-xs text-orange-600 font-semibold uppercase tracking-wider">{urun.kategori}</span>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{urun.baslik}</h3>
                    <p className="text-black font-extrabold text-lg">{urun.fiyat}</p>
                  </div>
                  <button className="mt-4 w-full py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-all">
                    İncele / Sepete At
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-16 bg-white rounded-2xl border border-dashed border-gray-300 text-center flex flex-col items-center justify-center">
              <p className="text-gray-500 text-base font-medium">Bu kategoride henüz ürün bulunmuyor.</p>
              <p className="text-gray-400 text-sm mt-1">Yönetim panelinden yeni ürün eklediğinizde burada görünecektir.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}