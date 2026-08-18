"use client";

import { useState } from "react";
import Link from "next/link";

const KATEGORILER = ["Elektronik", "Moda ve Giyim", "Ev ve Yaşam", "Kozmetik", "Spor", "Anne ve Bebek", "Kitap", "Diğer"];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [urunler, setUrunler] = useState<any[]>([]);
  const [yeniUrun, setYeniUrun] = useState({
    ad: "", kategori: "Elektronik", fiyat: "", indirimliFiyat: "", renk: "", beden: "", aciklama: "", görsel: ""
  });

  const handleUrunEkle = (e: React.FormEvent) => {
    e.preventDefault();
    setUrunler([...urunler, { ...yeniUrun, id: Date.now() }]);
    setYeniUrun({ ad: "", kategori: "Elektronik", fiyat: "", indirimliFiyat: "", renk: "", beden: "", aciklama: "", görsel: "" });
    alert("Ürün başarıyla mağazaya eklendi!");
  };

  const sil = (id: number) => setUrunler(urunler.filter(u => u.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl mt-20">
          <h1 className="text-2xl font-bold mb-6 text-center">Satıcı Girişi</h1>
          <button onClick={() => setIsLoggedIn(true)} className="w-full bg-black text-white p-4 rounded-xl font-bold">Giriş Yap (Demo)</button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-black">📦 Ürün Yönetim Paneli</h1>
            <button onClick={() => setIsLoggedIn(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">Çıkış</button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ürün Ekleme Formu */}
            <form onSubmit={handleUrunEkle} className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
              <input type="text" placeholder="Ürün Adı" className="w-full p-3 border rounded-xl" onChange={e => setYeniUrun({...yeniUrun, ad: e.target.value})} required />
              <select className="w-full p-3 border rounded-xl" onChange={e => setYeniUrun({...yeniUrun, kategori: e.target.value})}>
                {KATEGORILER.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Fiyat" className="p-3 border rounded-xl" onChange={e => setYeniUrun({...yeniUrun, fiyat: e.target.value})} />
                <input type="number" placeholder="İndirimli Fiyat" className="p-3 border rounded-xl" onChange={e => setYeniUrun({...yeniUrun, indirimliFiyat: e.target.value})} />
              </div>
              <input type="text" placeholder="Renk / Beden" className="w-full p-3 border rounded-xl" onChange={e => setYeniUrun({...yeniUrun, renk: e.target.value})} />
              <textarea placeholder="Açıklama" className="w-full p-3 border rounded-xl" onChange={e => setYeniUrun({...yeniUrun, aciklama: e.target.value})} />
              <button type="submit" className="w-full bg-orange-600 text-white p-4 rounded-xl font-bold">Ürünü Yayınla</button>
            </form>

            {/* Ürün Listesi */}
            <div className="space-y-4">
              {urunler.map(u => (
                <div key={u.id} className="bg-white p-4 rounded-2xl shadow border flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{u.ad}</h3>
                    <p className="text-xs text-gray-500">{u.kategori} • {u.fiyat} TL</p>
                  </div>
                  <button onClick={() => sil(u.id)} className="text-red-500 font-bold">Sil</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}