"use client";
import { useState } from "react";
import Link from "next/link";

export default function MagazaBasvuru() {
  const [basarili, setBasarili] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Resend entegrasyonu buraya gelecek
    setBasarili(true);
  };

  if (basarili) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black mb-4">Tebrikler!</h1>
        <p className="mb-6">Başvurunuz alındı. En kısa sürede tarafınıza dönüş yapılacaktır.</p>
        <Link href="/" className="bg-black text-white px-6 py-2 rounded-lg font-bold">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">Mağaza Başvuru Formu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Adı Soyadı" className="w-full border p-2 rounded" />
        <input required type="tel" placeholder="Telefon Numarası" className="w-full border p-2 rounded" />
        <input required placeholder="TC veya Vergi Kimlik No" className="w-full border p-2 rounded" />
        <input required placeholder="Firma Adı" className="w-full border p-2 rounded" />
        <textarea required placeholder="Adres" className="w-full border p-2 rounded" />
        <input required placeholder="IBAN Numarası" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded font-bold">Başvuruyu Tamamla</button>
      </form>
    </div>
  );
}