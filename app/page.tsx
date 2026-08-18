"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [adetler, setAdetler] = useState<{ [key: number]: number }>({});
  const [sepetSayisi, setSepetSayisi] = useState(0);
  const [secilenKategori, setSecilenKategori] = useState("Tümü");

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

  const sepeteEkle = (urun: any, index: number) => {
    if (typeof window !== "undefined") {
      import("canvas-confetti").then(c => c.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } }));
    }
    const sepet = JSON.parse(localStorage.getItem("trendtan_sepet") || "[]");
    sepet.push({...urun, adet: adetler[index] || 1});
    localStorage.setItem("trendtan_sepet", JSON.stringify(sepet));
    setSepetSayisi(sepet.reduce((a: number, b: any) => a + (b.adet || 1), 0));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 text-white text-xs py-2 px-4 text-center font-medium">
        SÜPER FIRSAT: Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı!
      </div>

      <header className="w-full border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-2xl font-black">TREND<span className="text-orange-400">TAN</span></span>
        <Link href="/sepet" className="relative bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold">
          🛒 Sepete Git ({sepetSayisi})
        </Link>
      </header>

      <div className="w-full border-b border-gray-100 py-3 px-4 flex gap-2 overflow-x-auto">
        {["Tümü", "Elektronik", "Moda ve Giyim", "Ev ve Yaşam"].map((k) => (
          <button key={k} onClick={() => setSecilenKategori(k)} className={`px-4 py-2 rounded-full text-sm font-semibold ${secilenKategori === k ? "bg-black text-white" : "bg-gray-50"}`}>
            {k}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
        {urunler.filter(u => secilenKategori === "Tümü" || u.anaKategori === secilenKategori).map((u, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-3 flex flex-col">
            <div className="w-full h-36 bg-gray-50 rounded-lg mb-2 overflow-hidden">
               {u.gorsel ? <img src={u.gorsel} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-xs text-gray-300">Görsel Yok</div>}
            </div>
            <h3 className="font-bold text-sm">{u.ad}</h3>
            <p className="text-orange-400 font-bold">{u.fiyat} TL</p>
            <button onClick={() => sepeteEkle(u, i)} className="w-full bg-black text-white text-xs py-2 mt-2 rounded-lg">Sepete Ekle</button>
          </div>
        ))}
      </main>
    </div>
  );
}