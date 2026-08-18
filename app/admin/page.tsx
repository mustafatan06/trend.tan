"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Başvuru formu alanları tamamen boş olarak başlatıldı
  const [basvuruForm, setBasvuruForm] = useState({
    adSoyad: "",
    tcVergiNo: "",
    magazaAdi: "",
    dogumTarihi: "",
    iban: "",
    adres: "",
    telefon: "",
  });

  const [urunler, setUrunler] = useState<string[]>([]);
  const [yeniUrun, setYeniUrun] = useState("");

  const handleBasvuruSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mağaza başvuru bilgileriniz başarıyla alındı!");
  };

  const handleUrunEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniUrun.trim()) return;
    setUrunler([...urunler, yeniUrun]);
    setYeniUrun("");
    alert("Ürün başarıyla eklendi!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      {/* Üst Kısım: Navigasyon ve Satıcı Giriş Butonu */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="text-sm font-bold text-gray-700 hover:text-black">
          ← Ana Sayfaya Dön
        </Link>
        {!isLoggedIn && (
          <button
            onClick={() => {
              const kAdi = prompt("Kullanıcı Adınızı Girin:");
              const sifre = prompt("Şifrenizi Girin:");
              if (kAdi === "admin" && sifre === "123456") {
                setIsLoggedIn(true);
                alert("Giriş başarılı! Ürün yönetim paneline yönlendirildiniz.");
              } else if (kAdi !== null) {
                alert("Hatalı kullanıcı adı veya şifre!");
              }
            }}
            className="px-5 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
          >
            🔐 Satıcı Girişi (Ürün Yönetimi)
          </button>
        )}
      </div>

      {/* DURUM 1: GİRİŞ YAPILDIYSA ÜRÜN EKLEME / YÖNETİM PANELİ */}
      {isLoggedIn ? (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-orange-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-black text-black">📦 Mağaza & Ürün Yönetim Paneli</h1>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition"
            >
              Çıkış Yap
            </button>
          </div>

          <form onSubmit={handleUrunEkle} className="space-y-4 mb-8">
            <h2 className="text-lg font-bold text-gray-800">Yeni Ürün Ekle</h2>
            <div>
              <label className="text-xs font-semibold text-gray-600">Ürün Adı / Açıklaması</label>
              <input
                type="text"
                value={yeniUrun}
                onChange={(e) => setYeniUrun(e.target.value)}
                placeholder="Örn: TrendTan Özel Ürün X"
                className="w-full p-3 border rounded-xl focus:outline-none focus:border-orange-500 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold hover:bg-orange-700 transition cursor-pointer shadow-md"
            >
              Ürünü Canlıya Ekle +
            </button>
          </form>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">Mağazanızdaki Aktif Ürünler ({urunler.length})</h2>
            {urunler.length === 0 ? (
              <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-xl text-center">Henüz ürün eklemediniz.</p>
            ) : (
              <ul className="space-y-2">
                {urunler.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-gray-50 border rounded-xl text-sm font-medium">
                    <span>{item}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">Satışta</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        /* DURUM 2: GİRİŞ YAPILMADIYSA BOŞ BAŞVURU FORMU */
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
          <h1 className="text-2xl font-black mb-2 text-center text-black">Mağaza Açılış & Başvuru Formu</h1>
          <p className="text-xs text-gray-500 text-center mb-6">Tüm alanları eksiksiz doldurarak satıcılık başvurunuzu tamamlayın.</p>

          <form onSubmit={handleBasvuruSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700">İsim Soyisim</label>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={basvuruForm.adSoyad}
                  onChange={(e) => setBasvuruForm({...basvuruForm, adSoyad: e.target.value})}
                  className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">TC Kimlik / Vergi Kimlik No</label>
                <input
                  type="text"
                  placeholder="TC veya Vergi No"
                  value={basvuruForm.tcVergiNo}
                  onChange={(e) => setBasvuruForm({...basvuruForm, tcVergiNo: e.target.value})}
                  className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700">Mağaza Adı</label>
                <input
                  type="text"
                  placeholder="Mağazanızın İsmi"
                  value={basvuruForm.magazaAdi}
                  onChange={(e) => setBasvuruForm({...basvuruForm, magazaAdi: e.target.value})}
                  className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">Doğum Tarihi</label>
                <input
                  type="text"
                  placeholder="GG/AA/YYYY"
                  value={basvuruForm.dogumTarihi}
                  onChange={(e) => setBasvuruForm({...basvuruForm, dogumTarihi: e.target.value})}
                  className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700">Telefon Numarası</label>
                <input
                  type="text"
                  placeholder="05XXXXXXXXX"
                  value={basvuruForm.telefon}
                  onChange={(e) => setBasvuruForm({...basvuruForm, telefon: e.target.value})}
                  className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700">IBAN Bilgisi</label>
                <input
                  type="text"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  value={basvuruForm.iban}
                  onChange={(e) => setBasvuruForm({...basvuruForm, iban: e.target.value})}
                  className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">Açık Adres</label>
              <textarea
                rows={2}
                placeholder="Mahalle, Sokak, No, İlçe / İl"
                value={basvuruForm.adres}
                onChange={(e) => setBasvuruForm({...basvuruForm, adres: e.target.value})}
                className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3.5 rounded-xl font-bold hover:bg-gray-800 transition cursor-pointer shadow-md text-sm"
            >
              Mağaza Başvurusunu Tamamla
            </button>
          </form>
        </div>
      )}
    </div>
  );
}