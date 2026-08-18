"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);

  // Sayfa yüklendiğinde localStorage'dan ürünleri çek
  useEffect(() => {
    const kayitliUrunler = localStorage.getItem("trendtan_urunler");
    if (kayitliUrunler) {
      setUrunler(JSON.parse(kayitliUrunler));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <span className="text-xl font-black tracking-wider text-black">TREND<span className="text-orange-500">TAN</span></span>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <h2 className="text-lg font-bold mb-6">Mağazadaki Ürünler</h2>
        
        {urunler.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
            Henüz listelenmiş bir ürün bulunmuyor.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {urunler.map((urun, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-xs text-gray-400">Görsel Yok</div>
                <h3 className="font-bold text-sm">{urun.ad}</h3>
                <p className="text-orange-600 font-bold text-sm mt-1">{urun.fiyat} TL</p>
                <p className="text-xs text-gray-500 mt-1">{urun.aciklama}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}