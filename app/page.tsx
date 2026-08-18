"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [adetler, setAdetler] = useState<{ [key: number]: number }>({});
  const [sepetSayisi, setSepetSayisi] = useState(0);
  const [secilenKategori, setSecilenKategori] = useState("Tümü");

  useEffect(() => {
    const k = localStorage.getItem("trendtan_urunler");
    if (k) {
      const p = JSON.parse(k);
      setUrunler(p);
      const obj: any = {}; p.forEach((_: any, i: number) => obj[i] = 1);
      setAdetler(obj);
    }
    const s = localStorage.getItem("trendtan_sepet");
    if (s) setSepetSayisi(JSON.parse(s).reduce((a: number, b: any) => a + b.adet, 0));
  }, []);

  const sepeteEkle = (urun: any, index: number) => {
    if (typeof window !== "undefined") {
        import("canvas-confetti").then(c => c.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } }));
    }
    const s = JSON.parse(localStorage.getItem("trendtan_sepet") || "[]");
    s.push({...urun, adet: adetler[index] || 1});
    localStorage.setItem("trendtan_sepet", JSON.stringify(s));
    setSepetSayisi(s.reduce((a: number, b: any) => a + b.adet, 0));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header, Banner ve Kategori alanları aynı */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        {urunler.filter(u => secilenKategori === "Tümü" || u.anaKategori === secilenKategori).map((u, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-3 shadow-sm bg-white">
            <div className="w-full h-36 bg-gray-50 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
              {u.gorsel ? <img src={u.gorsel} className="w-full h-full object-cover" /> : "Görsel Yok"}
            </div>
            <h3 className="font-bold text-sm truncate">{u.ad}</h3>
            <p className="text-orange-400 font-bold text-base">{u.fiyat} TL</p>
            <button onClick={() => sepeteEkle(u, i)} className="w-full bg-black text-white text-xs py-2 mt-2 rounded-lg">Sepete Ekle</button>
          </div>
        ))}
      </div>
    </div>
  );
}