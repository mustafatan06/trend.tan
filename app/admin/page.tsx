"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false); // Build hatasını önleyen kritik kod

  // Sayfa yüklendiğinde çalışır, sunucu çökmesini engeller
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

      {/* Kategoriler - Senin istediğin gibi yan yana */}
      <div className="w-full bg-white border-b border-gray-100 py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 whitespace-nowrap">
          {[
            "Tümü",
            "Elektronik",
            "Moda ve Giyim",
            "Ev ve Yaşam",
            "Kozmetik ve Kişisel Bakım",
            "Spor ve Outdoor",
            "Anne ve Bebek",
            "Kitap ve Hobi",
            "Yapı Market ve Oto",
            "Süpermarket",
            "Oto & Bahçe",
            "Diğer"
          ].map((kategori, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                index === 0
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

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

        {/* Ürünlerin Listelendiği Alan - TASARIM BOZULMADAN EKLENDİ */}
        <div className="w-full max-w-7xl flex-1">
          {!isClient ? null : urunler.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mb-3 shadow-inner">
                📦
              </div>
              <p className="text-gray-600 font-semibold text-base sm:text-lg">
                Mağazalar ve ürünler yakında burada listelenecektir.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Ürün eklemek veya mağazanızı yönetmek için panel girişini kullanabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {urunler.map((urun, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all flex flex-col group">
                  <div className="w-full h-40 sm:h-48 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-xs overflow-hidden border border-gray-100">
                    {urun.gorsel ? (
                      <span className="truncate px-2">{urun.gorsel}</span>
                    ) : (
                      "Görsel Yok"
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 group-hover:text-orange-500 transition-colors">{urun.ad}</h3>
                  <p className="text-xs text-gray-500 mt-1">{urun.kategori}</p>
                  <p className="text-orange-500 font-extrabold text-lg mt-auto pt-3">{urun.fiyat} TL</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}