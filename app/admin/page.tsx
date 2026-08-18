"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUnifiedPage() {
  const [mod, setMod] = useState<"giris" | "basvuru" | "panel">("giris");
  const [kadi, setKadi] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [basvuruTamamlandi, setBasvuruTamamlandi] = useState(false);
  const [urunler, setUrunler] = useState<any[]>([]);
  const [yeniUrun, setYeniUrun] = useState({ ad: "", anaKategori: "", altKategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });
  const [duzenleIndex, setDuzenleIndex] = useState<number | null>(null);

  useEffect(() => {
    if (localStorage.getItem("trendtan_giris") === "true") setMod("panel");
    const kayitli = localStorage.getItem("trendtan_urunler");
    if (kayitli) setUrunler(JSON.parse(kayitli));
  }, []);

  const handleGiris = (e: React.FormEvent) => {
    e.preventDefault();
    if (kadi === "admin" && sifre === "123456") {
      localStorage.setItem("trendtan_giris", "true");
      setMod("panel");
    } else {
      setHata("Hatalı kullanıcı adı veya şifre!");
    }
  };

  const handleGorselYukle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setYeniUrun({ ...yeniUrun, gorsel: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    let yeniListe = duzenleIndex !== null ? urunler.map((u, i) => i === duzenleIndex ? yeniUrun : u) : [...urunler, yeniUrun];
    setUrunler(yeniListe);
    localStorage.setItem("trendtan_urunler", JSON.stringify(yeniListe));
    setYeniUrun({ ad: "", anaKategori: "", altKategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });
    setDuzenleIndex(null);
  };

  if (mod === "giris") return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100">
        <h1 className="text-xl font-bold mb-6 text-center">Satıcı Giriş Paneli</h1>
        <form onSubmit={handleGiris} className="space-y-4">
          <input type="text" placeholder="Kullanıcı Adı" value={kadi} onChange={(e) => setKadi(e.target.value)} className="w-full border p-2 rounded-xl text-sm" />
          <input type="password" placeholder="Şifre" value={sifre} onChange={(e) => setSifre(e.target.value)} className="w-full border p-2 rounded-xl text-sm" />
          <button className="w-full bg-orange-500 text-white py-2 rounded-xl font-bold">Giriş Yap</button>
        </form>
        <p className="mt-4 text-xs text-center">Mağazanız yok mu? <button onClick={() => setMod("basvuru")} className="text-orange-500 font-bold">Hemen Başvur</button></p>
      </div>
    </div>
  );

  if (mod === "basvuru") return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-lg border border-gray-100">
        {basvuruTamamlandi ? (
          <div className="text-center">
            <h1 className="text-xl font-bold">Tebrikler!</h1>
            <p className="text-sm mt-2">Başvurunuz alındı.</p>
            <button onClick={() => setMod("giris")} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl">Giriş Paneline Dön</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setBasvuruTamamlandi(true); }} className="space-y-3">
            <input type="text" placeholder="Ad Soyad" required className="w-full border p-2 rounded-xl text-sm" />
            <input type="date" required className="w-full border p-2 rounded-xl text-sm" />
            <input type="text" placeholder="TC / Vergi No" required className="w-full border p-2 rounded-xl text-sm" />
            <input type="text" placeholder="Firma Adı" required className="w-full border p-2 rounded-xl text-sm" />
            <input type="tel" placeholder="Telefon" required className="w-full border p-2 rounded-xl text-sm" />
            <input type="text" placeholder="IBAN" required className="w-full border p-2 rounded-xl text-sm" />
            <textarea placeholder="Adres" required className="w-full border p-2 rounded-xl text-sm" />
            <button className="w-full bg-orange-500 text-white py-2 rounded-xl font-bold">Başvuruyu Tamamla</button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Ürün Yönetim Paneli</h1>
          <button onClick={() => { localStorage.removeItem("trendtan_giris"); setMod("giris"); }} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold">Çıkış Yap</button>
        </div>
        <form onSubmit={handleKaydet} className="space-y-4 border-b pb-6">
          <input type="text" placeholder="Ürün Adı" value={yeniUrun.ad} onChange={(e) => setYeniUrun({...yeniUrun, ad: e.target.value})} className="w-full border p-2 rounded-xl text-sm" />
          <div className="flex gap-2">
            <input type="number" placeholder="Fiyat" value={yeniUrun.fiyat} onChange={(e) => setYeniUrun({...yeniUrun, fiyat: e.target.value})} className="w-full border p-2 rounded-xl text-sm" />
            <input type="number" placeholder="Stok" value={yeniUrun.stok} onChange={(e) => setYeniUrun({...yeniUrun, stok: e.target.value})} className="w-full border p-2 rounded-xl text-sm" />
          </div>
          <label className="block bg-black text-white px-4 py-2 rounded-xl w-max cursor-pointer text-sm">
            Görsel Seç
            <input type="file" accept="image/*" onChange={handleGorselYukle} className="hidden" />
          </label>
          <button className="w-full bg-orange-500 text-white py-2 rounded-xl font-bold">{duzenleIndex !== null ? "Güncelle" : "Ekle"}</button>
        </form>
        <div className="mt-6 space-y-3">
          {urunler.map((u, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <span className="text-sm font-bold">{u.ad} - {u.fiyat} TL</span>
              <button onClick={() => { setYeniUrun(u); setDuzenleIndex(i); }} className="text-xs bg-gray-100 px-3 py-1 rounded-lg">Düzenle</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}