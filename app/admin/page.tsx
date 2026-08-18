"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [urunler, setUrunler] = useState<string[]>([]);
  const [yeniUrun, setYeniUrun] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        
        {/* Navigasyon */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-sm font-bold text-gray-500">← Ana Sayfa</Link>
          {!isLoggedIn && (
            <button 
              onClick={() => {
                const kAdi = prompt("Kullanıcı Adı:");
                const sifre = prompt("Şifre:");
                if (kAdi === "admin" && sifre === "123456") setIsLoggedIn(true);
              }}
              className="text-sm font-bold bg-black text-white px-4 py-1.5 rounded-full"
            >
              Satıcı Girişi
            </button>
          )}
        </div>

        {isLoggedIn ? (
          <div>
            <h2 className="text-xl font-bold mb-4">📦 Ürün Yönetimi</h2>
            <div className="flex gap-2 mb-4">
              <input 
                className="flex-1 border p-2 rounded-lg text-sm" 
                placeholder="Ürün adı yaz..." 
                value={yeniUrun} 
                onChange={(e) => setYeniUrun(e.target.value)}
              />
              <button 
                onClick={() => { setUrunler([...urunler, yeniUrun]); setYeniUrun(""); }}
                className="bg-orange-500 text-white px-4 rounded-lg font-bold"
              >
                +
              </button>
            </div>
            {urunler.map((u, i) => (
              <div key={i} className="bg-gray-100 p-2 mb-2 rounded-lg text-sm flex justify-between">
                {u} <button onClick={() => setUrunler(urunler.filter((_, idx) => idx !== i))} className="text-red-500 font-bold">Sil</button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Mağaza Başvurusu</h2>
            <div className="space-y-3">
              <input placeholder="Ad Soyad" className="w-full border p-2.5 rounded-lg text-sm" />
              <input placeholder="TC / Vergi Kimlik No" className="w-full border p-2.5 rounded-lg text-sm" />
              <input placeholder="Mağaza Adı" className="w-full border p-2.5 rounded-lg text-sm" />
              <input placeholder="Telefon" className="w-full border p-2.5 rounded-lg text-sm" />
              <button className="w-full bg-orange-600 text-white font-bold p-3 rounded-lg mt-2">Başvuruyu Gönder</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}