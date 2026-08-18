"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUnifiedPage() {
  // Görünüm modu: 'giris' | 'basvuru' | 'panel'
  const [mod, setMod] = useState<"giris" | "basvuru" | "panel">("giris");
  
  // Giriş state'leri
  const [kadi, setKadi] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");

  // Başvuru form state'leri
  const [basvuruForm, setBasvuruForm] = useState({
    adSoyad: "",
    dogumTarihi: "",
    tcVergiNo: "",
    firmaAdi: "",
    telefon: "",
    iban: "",
    adres: "",
  });
  const [basvuruTamamlandi, setBasvuruTamamlandi] = useState(false);

  // Ürün yönetim state'leri
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

  // Sayfa açıldığında localStorage kontrolü
  useEffect(() => {
    const oturum = localStorage.getItem("trendtan_giris");
    if (oturum === "true") {
      setMod("panel");
    }

    const kayitliUrunler = localStorage.getItem("trendtan_urunler");
    if (kayitliUrunler) {
      setUrunler(JSON.parse(kayitliUrunler));
    }
  }, []);

  // Giriş Yapma
  const handleGiris = (e: React.FormEvent) => {
    e.preventDefault();
    if (kadi === "admin" && sifre === "123456") {
      localStorage.setItem("trendtan_giris", "true");
      setMod("panel");
      setHata("");
    } else {
      setHata("Hatalı kullanıcı adı veya şifre!");
    }
  };

  // Çıkış Yapma
  const handleCikis = () => {
    localStorage.removeItem("trendtan_giris");
    setMod("giris");
    setKadi("");
    setSifre("");
  };

  // Başvuru Gönderme
  const handleBasvuruSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mustafatan690@gmail.com adresine bildirim altyapısı buraya bağlanacak
    setBasvuruTamamlandi(true);
  };

  // Ürün Kaydet / Güncelle
  const handleUrunKaydet = (e: React.FormEvent) => {
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
  const handleUrunSil = (index: number) => {
    const guncelListe = urunler.filter((_, i) => i !== index);
    setUrunler(guncelListe);
    localStorage.setItem("trendtan_urunler", JSON.stringify(guncelListe));
  };

  // Ürün Düzenle
  const handleUrunDuzenle = (index: number) => {
    setYeniUrun(urunler[index]);
    setDuzenleIndex(index);
  };

  // 1. GİRİŞ EKRANI
  if (mod === "giris") {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">Satıcı Giriş Paneli</h1>
            <p className="text-xs text-gray-400 mt-1">Mağazanızı yönetmek için giriş yapın</p>
          </div>

          {hata && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs rounded-xl font-medium text-center">
              {hata}
            </div>
          )}

          <form onSubmit={handleGiris} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Kullanıcı Adı</label>
              <input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={kadi}
                onChange={(e) => setKadi(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Şifre</label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm cursor-pointer"
            >
              Giriş Yap
            </button>
          </form>

          {/* Başvuru Yönlendirmesi */}
          <div className="mt-6 text-center border-t border-gray-100 pt-4 space-y-2">
            <p className="text-xs text-gray-500">
              Hâlâ kayıtlı bir mağazanız yok mu?{" "}
              <button
                onClick={() => { setBasvuruTamamlandi(false); setMod("basvuru"); }}
                className="text-orange-500 font-bold hover:underline cursor-pointer"
              >
                Hemen Başvur →
              </button>
            </p>
            <div>
              <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
                ← Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAĞAZA BAŞVURU FORMU EKRANI
  if (mod === "basvuru") {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          {basvuruTamamlandi ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-inner">
                ✓
              </div>
              <h1 className="text-xl font-bold text-gray-800 mb-2">Tebrikler!</h1>
              <p className="text-sm text-gray-600 mb-6">Başvurunuz Alındı En Kısa Sürede Tarafınıza Dönüş Yapılacaktır.</p>
              <button
                onClick={() => setMod("giris")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm cursor-pointer"
              >
                Giriş Paneline Dön
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">Mağaza Başvuru Formu</h1>
                <p className="text-xs text-gray-400 mt-1">TRENDTAN ailesine katılmak için bilgilerinizi eksiksiz doldurun</p>
              </div>

              <form onSubmit={handleBasvuruSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={basvuruForm.adSoyad}
                    onChange={(e) => setBasvuruForm({ ...basvuruForm, adSoyad: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Doğum Tarihi *</label>
                    <input
                      type="date"
                      required
                      value={basvuruForm.dogumTarihi}
                      onChange={(e) => setBasvuruForm({ ...basvuruForm, dogumTarihi: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">TC Kimlik No veya Vergi No *</label>
                    <input
                      type="text"
                      required
                      placeholder="TCKN / Vergi No"
                      value={basvuruForm.tcVergiNo}
                      onChange={(e) => setBasvuruForm({ ...basvuruForm, tcVergiNo: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Firma Adı *</label>
                    <input
                      type="text"
                      required
                      placeholder="Şirket veya Mağaza Adı"
                      value={basvuruForm.firmaAdi}
                      onChange={(e) => setBasvuruForm({ ...basvuruForm, firmaAdi: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon Numarası *</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={basvuruForm.telefon}
                      onChange={(e) => setBasvuruForm({ ...basvuruForm, telefon: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">IBAN Bilgisi *</label>
                  <input
                    type="text"
                    required
                    placeholder="TRXX XXXX XXXX XXXX XXXX XXXX XX"
                    value={basvuruForm.iban}
                    onChange={(e) => setBasvuruForm({ ...basvuruForm, iban: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Adres *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Açık adresiniz..."
                    value={basvuruForm.adres}
                    onChange={(e) => setBasvuruForm({ ...basvuruForm, adres: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm cursor-pointer"
                >
                  Başvuruyu Tamamla
                </button>
              </form>

              <div className="mt-6 text-center border-t border-gray-100 pt-4">
                <button
                  onClick={() => setMod("giris")}
                  className="text-xs text-gray-500 hover:text-orange-500 font-medium cursor-pointer"
                >
                  ← Satıcı Giriş Paneline Geri Dön
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 3. ÜRÜN YÖNETİM PANELİ (GİRİŞ YAPILINCA)
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Üst Başlık ve Çıkış */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Ürün Yönetim ve Ekleme Paneli</h1>
          <button
            onClick={handleCikis}
            className="bg-red-50 text-red-500 hover:bg-red-100 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Yeni Ürün Ekle Kartı */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4">Yeni Ürün Ekle</h2>
          
          <form onSubmit={handleUrunKaydet} className="space-y-4">
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
                      onClick={() => handleUrunDuzenle(index)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleUrunSil(index)}
                      className="bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
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