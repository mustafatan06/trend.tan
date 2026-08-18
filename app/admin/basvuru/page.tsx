"use client";
import { useState } from 'react';

export default function BasvuruPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ad: '',
    soyad: '',
    magazaAdi: '',
    vergiNo: '',
    iban: '',
    adres: '',
    iletisim: '',
    neSatacak: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Yeni Mağaza Başvurusu (mustafatan690@gmail.com):", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-black">Başvurunuz Alındı!</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tarafınıza en kısa sürede dönüş yapılacaktır. TrendTan ailesine katıldığınız için teşekkür ederiz.
            </p>
          </div>
          <a 
            href="/" 
            className="inline-block w-full bg-black text-white py-3.5 rounded-2xl font-black hover:bg-orange-500 transition shadow-lg"
          >
            Ana Sayfaya Geri Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">TrendTan Satıcı Programı</span>
          <h1 className="text-3xl font-black text-black">Mağaza Açılış Başvuru Formu</h1>
          <p className="text-gray-500 text-sm">Formu doldurarak hemen satış ağımıza katılın.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">İsim *</label>
              <input type="text" name="ad" required value={form.ad} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="Adınız" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Soyisim *</label>
              <input type="text" name="soyad" required value={form.soyad} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="Soyadınız" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mağaza Adı *</label>
              <input type="text" name="magazaAdi" required value={form.magazaAdi} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="Örn: Trend Dünyası" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Vergi Numarası / T.C. *</label>
              <input type="text" name="vergiNo" required value={form.vergiNo} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="Vergi No veya T.C." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Kazanç Aktarımı İçin IBAN Numarası *</label>
            <input type="text" name="iban" required value={form.iban} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-mono" placeholder="TR00 0000 0000 0000 0000 0000 00" />
            <p className="text-xs text-gray-400 mt-1">Onaylanan satışlarınızdan elde edeceğiniz kazançlar bu IBAN hesabına aktarılacaktır.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">İletişim Bilgileri (Telefon / E-posta) *</label>
              <input type="text" name="iletisim" required value={form.iletisim} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="0555 ... / e-posta" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Adres *</label>
              <input type="text" name="adres" required value={form.adres} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="İl / İlçe" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ne Satmak İstiyorsunuz? *</label>
            <textarea name="neSatacak" rows={3} required value={form.neSatacak} onChange={handleChange} className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500" placeholder="Ürün grupları hakkında kısa bilgi..."></textarea>
          </div>

          {/* KURUMSAL BİLGİLENDİRME VE KOMİSYON AÇIKLAMASI */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 space-y-3 text-xs md:text-sm text-gray-700 shadow-inner">
            <h4 className="font-black text-orange-600 uppercase tracking-wide text-sm flex items-center gap-2">
              <span>📌</span> Satıcı Komisyon ve Ödeme Koşulları
            </h4>
            <p className="leading-relaxed">
              TrendTan platformu üzerinden gerçekleştireceğiniz tüm başarılı satışlar üzerinden <strong>%10 komisyon</strong> kesintisi uygulanmaktadır.
            </p>
            <p className="leading-relaxed">
              Ödemeleriniz, güvenli tahsilat altyapımız olan <strong>PAYTR ödeme sisteminin</strong> çalışma prensibi gereği haftalık olarak hesaplanmakta ve onaylanan bakiye her hafta düzenli şekilde yukarıda belirttiğiniz <strong>IBAN</strong> adresinize transfer edilmektedir.
            </p>
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition shadow-xl">
            Başvuru Yap
          </button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-sm font-bold text-gray-500 hover:text-black">← Ana Sayfaya Geri Dön</a>
        </div>
      </div>
    </div>
  );
}