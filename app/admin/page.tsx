"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [urunler, setUrunler] = useState<any[]>([]);
  const [yeniUrun, setYeniUrun] = useState({
    ad: "",
    anaKategori: "",
    altKategori: "",
    fiyat: "",
    stok: "",
    aciklama: "",
    gorsel: "",
  });
  const [duzenleIndex, setDuzenleIndex] = useState<number | null>(null);

  // localStorage'dan ürünleri çek
  useEffect(() => {
    const kayitli = localStorage.getItem("trendtan_urunler");
    if (kayitli) {
      setUrunler(JSON.parse(kayitli));
    }
  }, []);

  // Ürün Ekle / Güncelle
  const handleKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniUrun.ad || !yeniUrun.anaKategori || !yeniUrun.altKategori || !yeniUrun.fiyat || !yeniUrun.stok) {
      alert("Lütfen zorunlu alanları doldurun!");
      return;
    }

    let guncelListe = [...urunler];
    if (duzenleIndex !== null) {
      guncelListe[duzenleIndex] = yeniUrun;
      setDuzenleIndex(null);
    } else {
      guncelListe.push(yeniUrun);
    }

    setUrunler(guncelListe);
    localStorage.setItem("trendtan_urunler", JSON.stringify(guncelListe));
    setYeniUrun({ ad: "", anaKategori: "", altKategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });
  };

  // Ürün Sil
  const handleSil = (index: number) => {
    const guncelListe = urunler.filter((_, i) => i !== index);
    setUrunler(guncelListe);
    localStorage.setItem("trendtan_urunler", JSON.stringify(guncelListe));
  };

  // Düzenle
  const handleDuzenle = (index: number) => {
    setYeniUrun(urunler[index]);
    setDuzenleIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Üst Başlık ve Çıkış */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Ürün Yönetim ve Ekleme Paneli</h1>
          <Link href="/" className="bg-red-50 text-red-500 hover:bg-red-100 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all">
            Çıkış Yap
          </Link>
        </div>

        {/* Yeni Ürün Ekle Kartı */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4">Yeni Ürün Ekle</h2>
          
          <form onSubmit={handleKaydet} className="space-y-4">
            {/* Ürün Adı */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Adı *</label>
              <input
                type="text"
                placeholder="Ürün adı"
                value={yeniUrun.ad}
                onChange={(e) => setYeniUrun({ ...yeniUrun, ad: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Kategoriler */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ana Kategori Seçimi *</label>
                <select
                  value={yeniUrun.anaKategori}
                  onChange={(e) => setYeniUrun({ ...yeniUrun, anaKategori: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-orange-500"
                >
                  <option value="">Ana Kategori Seçiniz</option>
                  <option value="Elektronik Ve Teknolojik Ürünler">Elektronik Ve Teknolojik Ürünler</option>
                  <option value="Moda Ve Giyim">Moda Ve Giyim</option>
                  <option value="Ev Ve Yaşam">Ev Ve Yaşam</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Alt Kategori Seçimi *</label>
                <select
                  value={yeniUrun.altKategori}
                  onChange={(e) => setYeniUrun({ ...yeniUrun, altKategori: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-orange-500"
                >
                  <option value="">Önce Ana Kategori Seçin</option>
                  <option value="Küçük Ev Aletleri">Küçük Ev Aletleri</option>
                  <option value="Telefon & Aksesuar">Telefon & Aksesuar</option>
                  <option value="Giyim">Giyim</option>
                </select>
              </div>
            </div>

            {/* Fiyat ve Stok */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Fiyatı (TL) *</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={yeniUrun.fiyat}
                  onChange={(e) => setYeniUrun({ ...yeniUrun, fiyat: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Stok Miktarı (Stok Takibi) *</label>
                <input
                  type="number"
                  placeholder="Adet"
                  value={yeniUrun.stok}
                  onChange={(e) => setYeniUrun({ ...yeniUrun, stok: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Görsel Yükleme */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Görseli (Dosya Seç / Sürükle Bırak)</label>
              <div className="flex items-center gap-3">
                <label className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all">
                  Dosya Seç
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setYeniUrun({ ...yeniUrun, gorsel: e.target.files[0].name });
                      }
                    }}
                  />
                </label>
                <span className="text-xs text-gray-400">
                  {yeniUrun.gorsel ? yeniUrun.gorsel : "Dosya seçilmedi"}
                </span>
              </div>
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ürün Açıklaması</label>
              <textarea
                placeholder="Ürün detayları..."
                rows={3}
                value={yeniUrun.aciklama}
                onChange={(e) => setYeniUrun({ ...yeniUrun, aciklama: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            {/* Kaydet / Yayına Al Butonu */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm cursor-pointer"
            >
              {duzenleIndex !== null ? "Ürünü Güncelle" : "Ürünü Ekle / Yayına Al"}
            </button>
          </form>
        </div>

        {/* Mağazadaki Ürünler Listesi */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            Mağazanızdaki Ürünler ({urunler.length})
          </h2>

          {urunler.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">Henüz eklenmiş bir ürün bulunmuyor.</p>
          ) : (
            <div className="space-y-3">
              {urunler.map((item, index) => (
                <div key={index} className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm bg-gray-50/50">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{item.ad}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.anaKategori} {item.altKategori ? `> ${item.altKategori}` : ""} | Fiyat: {item.fiyat} TL | Stok: {item.stok}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuzenle(index)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleSil(index)}
                      className="bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}