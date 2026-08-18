"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [sepetSayisi, setSepetSayisi] = useState(0);
  const [secilenKategori, setSecilenKategori] = useState("Tümü");
  const [adetler, setAdetler] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const kayitli = localStorage.getItem("trendtan_urunler");
    if (kayitli) {
      const p = JSON.parse(kayitli);
      setUrunler(p);
      const obj: any = {}; p.forEach((_: any, i: number) => obj[i] = 1);
      setAdetler(obj);
    }
    const s = localStorage.getItem("trendtan_sepet");
    if (s) setSepetSayisi(JSON.parse(s).reduce((a: number, b: any) => a + (b.adet || 1), 0));
  }, []);

  const sepeteEkle = (urun: any, i: number) => {
    if (typeof window !== "undefined") {
      import("canvas-confetti").then(c => c.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } }));
    }
    const sepet = JSON.parse(localStorage.getItem("trendtan_sepet") || "[]");
    sepet.push({...urun, adet: adetler[i] || 1});
    localStorage.setItem("trendtan_sepet", JSON.stringify(sepet));
    setSepetSayisi(sepet.reduce((a: number, b: any) => a + (b.adet || 1), 0));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* İnce Uzatılmış Turuncu Bant */}
      <div className="w-full bg-[#fb923c] text-white text-[10px] py-1 px-8 tracking-widest uppercase font-semibold text-center">
        SÜPER FIRSAT: Seçili Ürünlerde Kaçırılmayacak İndirimler!
      </div>

      {/* Header */}
      <header className="w-full border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-2xl font-black tracking-wider text-black">TREND<span className="text-[#fb923c]">TAN</span></span>
        <Link href="/sepet" className="bg-gray-50 border border-gray-200 px-5 py-2 rounded-xl text-sm font-bold">🛒 Sepetim ({sepetSayisi})</Link>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <div className="w-full bg-[#fdba74] rounded-3xl p-10 text-white mb-10 text-center">
          <h1 className="text-3xl font-extrabold mb-2">Sen de Ürünlerini Satmaya Başla!</h1>
          <Link href="/admin" className="inline-block mt-4 px-8 py-3 bg-black text-white font-bold rounded-2xl">Mağaza Aç →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {urunler.map((u, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-3 flex flex-col">
              <div className="w-full h-36 bg-gray-50 rounded-xl mb-2 overflow-hidden">
                {u.gorsel ? <img src={u.gorsel} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-xs text-gray-300">Görsel Yok</div>}
              </div>
              <h3 className="font-bold text-sm">{u.ad}</h3>
              <p className="text-[#fb923c] font-bold text-lg">{u.fiyat} TL</p>
              
              {/* Adet Sayacı */}
              <div className="flex items-center gap-2 mt-2 bg-gray-50 p-1 rounded-lg">
                <button onClick={() => setAdetler({...adetler, [i]: Math.max(1, (adetler[i]||1)-1)})} className="px-2 font-bold">-</button>
                <span className="text-sm font-bold">{adetler[i]||1}</span>
                <button onClick={() => setAdetler({...adetler, [i]: (adetler[i]||1)+1})} className="px-2 font-bold">+</button>
              </div>

              <button onClick={() => sepeteEkle(u, i)} className="w-full bg-black text-white text-xs py-2 mt-2 rounded-xl font-bold">Sepete Ekle</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}