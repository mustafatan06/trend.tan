"use client";

import { useState } from "react";
import Link from "next/link";

// Satıcı Paneli ve Ana Sayfa ile Tam Uyumlu Kategoriler
const kategorilerData: { [key: string]: string[] } = {
  "Giyim, Ayakkabı ve Aksesuar": ["Kadın Giyim", "Erkek Giyim", "Kadın Ayakkabı", "Erkek Ayakkabı", "Çanta Ve Aksesuar"],
  "Elektronik Ve Teknolojik Ürünler": ["Telefon Ve Tablet", "Bilgisayar", "Beyaz Eşya ve Tv", "Küçük Ev Aletleri"],
  "Kozmetik Ve Kişisel Bakım": ["Cilt Bakımı", "Makyaj", "Parfüm Ve Deodorant", "Saç Bakımı"],
  "Ev, Yaşam Ve Dekorasyon": ["Mobilya", "Ev Tekstili", "Mutfak Gereçleri", "Aydınlatma Ve Dekorasyon"],
  "Anne, Bebek ve Oyuncak": ["Bebek Giyim", "Bebek Bakımı", "Oyuncaklar"],
  "Spor, Outdoor ve Hobi": ["Spor Ekipmanları", "Outdoor", "Kitap-Müzik ve Hobi"],
  "Ofis Mobilyaları": ["Ofis Takımları", "Makam Takımları", "Ofis Koltukları", "Çalışma Masaları"],
};

export default function AdminPage() {
  const [view, setView] = useState<"login" | "register" | "success" | "dashboard">("login");

  // Başvuru Formu State'leri
  const [formData, setFormData] = useState({
    adi: "",
    soyadi: "",
    telefon: "",
    tcVergiNo: "",
    firmaAdi: "",
    adres: "",
    iban: "",
  });
  const [formError, setFormError] = useState("");

  // Ürün Ekleme State'leri
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
  const [urunError, setUrunError] = useState("");
  const [duzenleId, setDuzenleId] = useState<number | null>(null);

  // Başvuru Gönderme
  const handleBasvuruSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.adi ||
      !formData.soyadi ||
      !formData.telefon ||
      !formData.tcVergiNo ||
      !formData.firmaAdi ||
      !formData.adres ||
      !formData.iban
    ) {
      setFormError("Lütfen tüm alanları eksiksiz doldurun. Boş bırakılamaz!");
      return;
    }

    console.log("Başvuru mustafatan690@gmail.com adresine gönderildi:", formData);
    setFormError("");
    setView("success");
  };

  // Ürün Ekleme / Güncelleme
  const handleUrunKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniUrun.ad || !yeniUrun.fiyat || !yeniUrun.stok) {
      setUrunError("Lütfen zorunlu ürün alanlarını doldurun!");
      return;
    }
    if (!yeniUrun.anaKategori || yeniUrun.anaKategori === "Seciniz") {
      setUrunError("Geçersiz ana kategori seçimi! Lütfen kategori seçin.");
      return;
    }
    if (!yeniUrun.altKategori || yeniUrun.altKategori === "Seciniz") {
      setUrunError("Lütfen ürüne ait alt kategoriyi eksiksiz seçin!");
      return;
    }

    setUrunError("");

    if (duzenleId !== null) {
      setUrunler(
        urunler.map((item, idx) => (idx === duzenleId ? yeniUrun : item))
      );
      setDuzenleId(null);
    } else {
      setUrunler([...urunler, yeniUrun]);
    }

    setYeniUrun({ ad: "", anaKategori: "", altKategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });
  };

  const ürünSil = (index: number) => {
    setUrunler(urunler.filter((_, idx) => idx !== index));
  };

  const ürünDüzenle = (index: number) => {
    setYeniUrun(urunler[index]);
    setDuzenleId(index);
  };

  // Seçilen ana kategoriye göre alt kategorileri getir
  const mevcutAltKategoriler = yeniUrun.anaKategori ? kategorilerData[yeniUrun.anaKategori] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-xl font-black tracking-wider text-black">
          TREND<span className="text-orange-500">TAN</span> <span className="text-xs text-gray-500 font-normal">| Satıcı Paneli</span>
        </Link>
        <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-black">
          ← Ana Sayfaya Dön
        </Link>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 my-6 bg-white rounded-2xl shadow-md border border-gray-100">
        
        {view === "login" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Satıcı Girişi</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setView("dashboard");
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı veya E-Posta</label>
                <input
                  type="text"
                  required
                  placeholder="Kullanıcı adınızı girin"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Giriş Yap
              </button>
            </form>

            <div className="mt-6 text-center border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-600">Henüz bir mağazanız yok mu?</p>
              <button
                onClick={() => setView("register")}
                className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl shadow transition-all cursor-pointer"
              >
                Hemen Mağaza Aç (Başvuru Yap)
              </button>
            </div>
          </div>
        )}

        {view === "register" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Mağaza Başvuru Formu</h2>
            <p className="text-xs text-gray-500 text-center mb-6">Tüm alanların doldurulması zorunludur.</p>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium text-center">
                {formError}
              </div>
            )}

            <form onSubmit={handleBasvuruSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adı</label>
                  <input
                    type="text"
                    value={formData.adi}
                    onChange={(e) => setFormData({ ...formData, adi: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soyadı</label>
                  <input
                    type="text"
                    value={formData.soyadi}
                    onChange={(e) => setFormData({ ...formData, soyadi: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="05XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TC veya Vergi Kimlik Numarası</label>
                  <input
                    type="text"
                    value={formData.tcVergiNo}
                    onChange={(e) => setFormData({ ...formData, tcVergiNo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="TCKN veya Vergi No"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firma Adı</label>
                <input
                  type="text"
                  value={formData.firmaAdi}
                  onChange={(e) => setFormData({ ...formData, firmaAdi: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Şirket veya Mağaza Adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <textarea
                  value={formData.adres}
                  onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Açık adresiniz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IBAN Numarası</label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Başvuruyu Tamamla
                </button>
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all cursor-pointer"
                >
                  İptal / Girişe Dön
                </button>
              </div>
            </form>
          </div>
        )}

        {view === "success" && (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Tebrikler Başvurunuz Alındı</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              En Kısa Sürede Tarafınıza Dönüş Yapılacaktır.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-block px-8 py-3.5 bg-black hover:bg-gray-900 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        )}

        {view === "dashboard" && (
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-800">Ürün Yönetim ve Ekleme Paneli</h2>
              <button
                onClick={() => setView("login")}
                className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 cursor-pointer"
              >
                Çıkış Yap
              </button>
            </div>

            {urunError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium text-center">
                {urunError}
              </div>
            )}

            <form onSubmit={handleUrunKaydet} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4 mb-8">
              <h3 className="font-bold text-gray-700 text-sm">{duzenleId !== null ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ürün Adı *</label>
                <input
                  type="text"
                  value={yeniUrun.ad}
                  onChange={(e) => setYeniUrun({ ...yeniUrun, ad: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ürün adı"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ana Kategori Seçimi */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ana Kategori Seçimi *</label>
                  <select
                    value={yeniUrun.anaKategori}
                    onChange={(e) => setYeniUrun({ ...yeniUrun, anaKategori: e.target.value, altKategori: "" })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Ana Kategori Seçiniz</option>
                    {Object.keys(kategorilerData).map((kat, idx) => (
                      <option key={idx} value={kat}>{kat}</option>
                    ))}
                  </select>
                </div>

                {/* Alt Kategori Seçimi */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Alt Kategori Seçimi *</label>
                  <select
                    value={yeniUrun.altKategori}
                    onChange={(e) => setYeniUrun({ ...yeniUrun, altKategori: e.target.value })}
                    disabled={!yeniUrun.anaKategori}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                  >
                    <option value="">Önce Ana Kategori Seçin</option>
                    {mevcutAltKategoriler.map((alt, idx) => (
                      <option key={idx} value={alt}>{alt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ürün Fiyatı (TL) *</label>
                  <input
                    type="number"
                    value={yeniUrun.fiyat}
                    onChange={(e) => setYeniUrun({ ...yeniUrun, fiyat: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stok Miktarı (Stok Takibi) *</label>
                  <input
                    type="number"
                    value={yeniUrun.stok}
                    onChange={(e) => setYeniUrun({ ...yeniUrun, stok: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Adet"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ürün Görseli (Dosya Seç / Sürükle Bırak)</label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setYeniUrun({ ...yeniUrun, gorsel: e.target.files[0].name });
                    }
                  }}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ürün Açıklaması</label>
                <textarea
                  value={yeniUrun.aciklama}
                  onChange={(e) => setYeniUrun({ ...yeniUrun, aciklama: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ürün detayları..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow transition-all cursor-pointer"
              >
                {duzenleId !== null ? "Ürünü Güncelle" : "Ürünü Ekle / Yayına Al"}
              </button>
            </form>

            <div>
              <h3 className="font-bold text-gray-800 text-sm mb-3">Mağazanızdaki Ürünler ({urunler.length})</h3>
              {urunler.length === 0 ? (
                <p className="text-gray-400 text-xs text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  Henüz eklenmiş bir ürün bulunmuyor.
                </p>
              ) : (
                <div className="space-y-3">
                  {urunler.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{item.ad}</h4>
                        <p className="text-xs text-gray-500">{item.anaKategori} &gt; {item.altKategori} | Fiyat: {item.fiyat} TL | Stok: {item.stok}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => ürünDüzenle(index)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg cursor-pointer"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => ürünSil(index)}
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg cursor-pointer"
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
        )}

      </main>
    </div>
  );
}