"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const kayitliUrunler = localStorage.getItem("trendtan_urunler");
    if (kayitliUrunler) {
      setUrunler(JSON.parse(kayitliUrunler));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Üst Fırsat Bandı */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
        <span className="font-bold">SÜPER FIRSAT:</span> Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! 🔥
      </div>

      {/* Header */}
      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
            TREND<span className="text-orange-400">TAN</span>
          </span>
        </div>
      </header>

      {/* Kategoriler */}
      <div className="w-full bg-white border-b border-gray-100 py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 whitespace-nowrap">
          {["Tümü", "Elektronik", "Moda ve Giyim", "Ev ve Yaşam", "Kozmetik", "Spor ve Outdoor", "Anne ve Bebek", "Kitap ve Hobi", "Yapı Market", "Süpermarket", "Oto & Bahçe", "Diğer"].map((kategori, index) => (
            <button key={index} className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${index === 0 ? "bg-black text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
              {kategori}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Daha Açık Tonlu, İnce, Kenarlara Uzanan Banner */}
        <div className="w-full bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 py-4 px-6 sm:px-10 text-white shadow-md flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight">Sen de Ürünlerini Satmaya Başla!</h1>
            <p className="text-xs sm:text-sm text-white/90">Mağazanızı hemen açın, binlerce müşteriye ulaşın.</p>
          </div>
          <Link href="/admin" className="px-5 py-2 bg-white text-orange-500 font-bold text-sm rounded-lg shadow hover:bg-gray-50 transition-all whitespace-nowrap">
            Mağaza Aç →
          </Link>
        </div>

        {/* Ürün Alanı */}
        <div className="w-full max-w-7xl">
          {!isClient ? null : urunler.length === 0 ? (
            <div className="w-full text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50">
              <p className="text-gray-400">Henüz ürün eklenmedi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {urunler.map((urun, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                  <div className="w-full h-32 bg-gray-50 rounded-lg mb-2 flex items-center justify-center text-gray-300 text-[10px]">Görsel</div>
                  <h3 className="font-bold text-sm">{urun.ad}</h3>
                  <p className="text-orange-400 font-bold text-base mt-2">{urun.fiyat} TL</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}