"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [sepetAdet, setSepetAdet] = useState(1);

  const sepeteEkle = () => {
    alert(`Sepete ${sepetAdet} adet ürün başarıyla eklendi! 🛒`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
        <span className="font-bold">SÜPER FIRSAT:</span> Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! 🔥
      </div>

      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">T</div>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">TREND<span className="text-orange-500">TAN</span></span>
        </div>

        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <Link href="/admin" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-sm font-semibold rounded-full transition-all shadow-sm">Satıcı Ol</Link>

          <div className="flex items-center bg-black text-white rounded-full p-1 shadow-md">
            <div className="flex items-center px-2 gap-1">
              <button onClick={() => setSepetAdet(Math.max(1, sepetAdet - 1))} className="text-gray-400 hover:text-white font-bold px-1 text-xs">-</button>
              <span className="text-xs font-bold w-4 text-center">{sepetAdet}</span>
              <button onClick={() => setSepetAdet(sepetAdet + 1)} className="text-gray-400 hover:text-white font-bold px-1 text-xs">+</button>
            </div>
            <button onClick={sepeteEkle} className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full">Sepete Ekle</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-3">Sen de Ürünlerini Satmaya Başla!</h1>
          <p className="text-sm sm:text-base text-orange-50 mb-6">Mağazanızı hemen açın, binlerce müşteriye ulaşın.</p>
          <Link href="/admin" className="px-8 py-3.5 bg-black hover:bg-gray-900 text-white font-bold rounded-2xl shadow-lg">Mağaza Aç →</Link>
        </div>
      </main>
    </div>
  );
}