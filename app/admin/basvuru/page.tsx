"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminBasvuru() {
  const [form, setForm] = useState({
    ad: "Mustafa",
    soyad: "Tan",
    tc: "66139240304",
    telefon: "05XXXXXXXXX",
    magazaAdi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Başvurunuz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Satıcı Başvuru Formu</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Ad Soyad</label>
            <input type="text" value={`${form.ad} ${form.soyad}`} disabled className="w-full p-3 bg-gray-100 rounded-lg border" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">TC Kimlik No</label>
            <input type="text" value={form.tc} disabled className="w-full p-3 bg-gray-100 rounded-lg border" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Mağaza Adınız</label>
            <input type="text" required onChange={(e) => setForm({...form, magazaAdi: e.target.value})} className="w-full p-3 border rounded-lg" placeholder="Mağazanızın ismi" />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold hover:bg-orange-700 transition">Başvuruyu Tamamla</button>
        </form>
        <Link href="/" className="block mt-4 text-center text-sm text-gray-500 hover:text-black">← Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}