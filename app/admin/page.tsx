"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminBasvuru() {
  const [form, setForm] = useState({ ad: "", soyad: "", tc: "", magazaAdi: "" });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Satıcı Başvuru Formu</h1>
        <form className="space-y-4">
          <input className="w-full p-3 border rounded-lg" placeholder="Ad Soyad" />
          <input className="w-full p-3 border rounded-lg" placeholder="TC Kimlik No" />
          <input className="w-full p-3 border rounded-lg" placeholder="Mağaza Adı" />
          <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold">Başvuruyu Tamamla</button>
        </form>
        <Link href="/" className="block mt-4 text-center text-sm text-gray-500">← Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}