"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [sepetSayisi, setSepetSayisi] = useState(0);
  const [secilenKategori, setSecilenKategori] = useState("Tümü");

  useEffect(() => {
    const kayitli = localStorage.getItem("trendtan_urunler");
    if (kayitli) setUrunler(JSON.parse(kayitli));
    
    const s = localStorage.getItem("trendtan_sepet");
    if (s) setSepetSayisi(JSON.parse(s).reduce((a: number, b: any) => a + (b.adet || 1), 0));
  }, []);

  const sepeteEkle = (urun: any) => {
    if (typeof window !== "undefined") {
      import("canvas-confetti").then(c => c.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } }));
    }
    const sepet = JSON.parse(localStorage.getItem("trendtan_sepet") || "[]");
    sepet.push({...urun, adet: 1});
    localStorage.setItem("trendtan_sepet", JSON.stringify(sepet));
    setSepetSayisi(sepet.reduce((a: number, b: any) => a + (b.adet || 1), 0));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
        <span className="font-bold">SÜPER FIRSAT:</span> Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! Sınırlı Sayıda Stok. 🔥
      </div>

      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">T</div>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">TREND<span className="text-orange-500">TAN</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-sm font-semibold rounded-full transition-all">Satıcı Ol</Link>
          <Link href="/sepet" className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-full flex items-center gap-2">
            Sepetim ({sepetSayisi})
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {/* Banner */}
        <div className="w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 text-center relative overflow-hidden">
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-3">Sen de Ürünlerini Satmaya Başla!</h1>
          <p className="text-orange-50 mb-6 max-w-xl mx-auto">Mağazanızı hemen açın, binlerce müşteriye anında ulaşın.</p>
          <Link href="/admin" className="px-8 py-3 bg-black text-white font-bold rounded-2xl">Mağaza Aç →</Link>
        </div>

        {/* Kategoriler */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {["Tümü", "Elektronik", "Moda ve Giyim", "Ev ve Yaşam"].map((k) => (
            <button key={k} onClick={() => setSecilenKategori(k)} 
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border ${secilenKategori === k ? "bg-black text-white" : "bg-white border-gray-200"}`}>
              {k}
            </button>
          ))}
        </div>

        {/* Ürün Listesi */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {urunler.filter(u => secilenKategori === "Tümü" || u.anaKategori?.includes(secilenKategori)).map((u, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-3 flex flex-col hover:shadow-lg transition-all">
              <div className="w-full h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden">
                {u.gorsel ? <img src={u.gorsel} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-xs text-gray-300">Görsel Yok</div>}
              </div>
              <h3 className="font-bold text-sm text-gray-800">{u.ad}</h3>
              <p className="text-orange-500 font-bold text-lg mt-1">{u.fiyat} TL</p>
              <button onClick={() => sepeteEkle(u)} className="w-full bg-black text-white text-xs py-2.5 mt-3 rounded-xl font-bold">Sepete Ekle</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}