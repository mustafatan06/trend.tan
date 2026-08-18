"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [adetler, setAdetler] = useState<{ [key: number]: number }>({});
  const [sepetSayisi, setSepetSayisi] = useState(0);
  const [secilenKategori, setSecilenKategori] = useState("Tümü");

  const kategoriler = [
    "Tümü",
    "Elektronik",
    "Moda ve Giyim",
    "Ev ve Yaşam",
    "Kozmetik",
    "Spor and Outdoor",
    "Anne ve Bebek",
    "Kitap ve Hobi",
    "Yapı Market",
    "Süpermarket",
    "Oto & Bahçe",
    "Diğer"
  ];

  useEffect(() => {
    setIsClient(true);
    const kayitliUrunler = localStorage.getItem("trendtan_urunler");
    if (kayitliUrunler) {
      try {
        const parsed = JSON.parse(kayitliUrunler);
        setUrunler(parsed);
        const ilkAdetler: { [key: number]: number } = {};
        parsed.forEach((_: any, index: number) => {
          ilkAdetler[index] = 1;
        });
        setAdetler(ilkAdetler);
      } catch (e) {
        console.error("Ürünler yüklenirken hata oluştu", e);
      }
    }

    const kayitliSepet = localStorage.getItem("trendtan_sepet");
    if (kayitliSepet) {
      const sepet = JSON.parse(kayitliSepet);
      const toplamAdet = sepet.reduce((acc: number, item: any) => acc + item.adet, 0);
      setSepetSayisi(toplamAdet);
    }
  }, []);

  const adetDegistir = (index: number, delta: number) => {
    setAdetler((prev) => {
      const mevcut = prev[index] || 1;
      const yeni = mevcut + delta;
      return { ...prev, [index]: yeni < 1 ? 1 : yeni };
    });
  };

  const sepeteEkle = (urun: any, index: number) => {
    const adet = adetler[index] || 1;

    // Build hatasını önlemek için güvenli konfeti tetikleme
    if (typeof window !== "undefined") {
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f97316", "#f59e0b", "#000000", "#ffffff"]
        });
      });
    }

    const kayitliSepet = localStorage.getItem("trendtan_sepet");
    let sepet = kayitliSepet ? JSON.parse(kayitliSepet) : [];
    
    const mevcutIndex = sepet.findIndex((item: any) => item.ad === urun.ad);
    if (mevcutIndex > -1) {
      sepet[mevcutIndex].adet += adet;
    } else {
      sepet.push({ ...urun, adet });
    }

    localStorage.setItem("trendtan_sepet", JSON.stringify(sepet));
    
    const toplamAdet = sepet.reduce((acc: number, item: any) => acc + item.adet, 0);
    setSepetSayisi(toplamAdet);
  };

  // Kategoriye göre filtreleme (Ana kategori veya kelime eşleşmesi)
  const filtrelenmisUrunler = urunler.filter((urun) => {
    if (secilenKategori === "Tümü") return true;
    return urun.anaKategori?.toLowerCase().includes(secilenKategori.toLowerCase());
  });

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

        {/* Sağ Üst Köşe Sepete Git Alanı */}
        <div className="flex items-center gap-3">
          <Link
            href="/sepet"
            className="relative bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            🛒 Sepete Git
            {sepetSayisi > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {sepetSayisi}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Tıklanabilir Kategoriler */}
      <div className="w-full bg-white border-b border-gray-100 py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 whitespace-nowrap">
          {kategoriler.map((kategori, index) => (
            <button
              key={index}
              onClick={() => setSecilenKategori(kategori)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                secilenKategori === kategori
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Banner */}
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
          {!isClient ? null : filtrelenmisUrunler.length === 0 ? (
            <div className="w-full text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50">
              <p className="text-gray-400">Bu kategoride henüz ürün bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtrelenmisUrunler.map((urun, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col bg-white">
                  {/* Görsel Alanı */}
                  <div className="w-full h-36 bg-gray-50 rounded-lg mb-2 flex items-center justify-center text-gray-300 text-[10px] overflow-hidden border border-gray-100 relative">
                    {urun.gorsel ? (
                      <img src={urun.gorsel} alt={urun.ad} className="w-full h-full object-cover" />
                    ) : (
                      <span>Görsel Yok</span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm truncate text-gray-800">{urun.ad}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{urun.anaKategori}</p>
                  <p className="text-orange-400 font-extrabold text-base mt-1">{urun.fiyat} TL</p>

                  {/* Adet ve Sepete Ekle Bölümü */}
                  <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
                      <span className="text-[11px] text-gray-500 font-medium pl-1">Adet:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adetDegistir(index, -1)}
                          className="w-6 h-6 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-gray-800 w-4 text-center">
                          {adetler[index] || 1}
                        </span>
                        <button
                          onClick={() => adetDegistir(index, 1)}
                          className="w-6 h-6 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => sepeteEkle(urun, index)}
                      className="w-full bg-black hover:bg-gray-800 text-white text-xs font-bold py-2 rounded-lg transition-all shadow-sm cursor-pointer"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}