"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [yeniUrun, setYeniUrun] = useState({ ad: "", kategori: "Tümü", fiyat: "", stok: "", aciklama: "", gorsel: "" });
  const kategoriler = ["Elektronik", "Moda ve Giyim", "Ev ve Yaşam", "Kozmetik"]; // Örnek liste

  const handleEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (yeniUrun.kategori === "Tümü") {
      alert("Hata: Geçersiz kategori seçimi!");
      return;
    }
    // Ürün kaydetme mantığı buraya gelecek (localStorage'a devam)
    console.log("Ürün kaydedildi:", yeniUrun);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Satıcı Ürün Yönetimi</h1>
      <form onSubmit={handleEkle} className="grid gap-4 bg-gray-50 p-6 rounded-xl">
        <input required placeholder="Ürün Adı" className="border p-2 rounded" onChange={(e) => setYeniUrun({...yeniUrun, ad: e.target.value})} />
        <select className="border p-2 rounded" onChange={(e) => setYeniUrun({...yeniUrun, kategori: e.target.value})}>
          {kategoriler.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <input required type="number" placeholder="Fiyat" className="border p-2 rounded" onChange={(e) => setYeniUrun({...yeniUrun, fiyat: e.target.value})} />
        <input required type="number" placeholder="Stok Adedi" className="border p-2 rounded" onChange={(e) => setYeniUrun({...yeniUrun, stok: e.target.value})} />
        <textarea placeholder="Ürün Açıklaması" className="border p-2 rounded" onChange={(e) => setYeniUrun({...yeniUrun, aciklama: e.target.value})} />
        <input type="file" className="border p-2 rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded">Ürünü Yayınla</button>
      </form>
    </div>
  );
}