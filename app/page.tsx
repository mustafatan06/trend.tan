"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-black">TREND<span className="text-orange-500">TAN</span></h1>
        <Link href="/admin" className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold">Mağaza Aç</Link>
      </header>
      <main className="p-6 text-center">
        <h2 className="text-3xl font-bold mt-10">Ürünlerini Yönetmek Çok Kolay!</h2>
        <p className="text-gray-500 mt-4">Hızlı, sade ve etkili satıcı paneli ile tanışın.</p>
        <Link href="/admin" className="inline-block mt-8 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold">Paneli Başlat</Link>
      </main>
    </div>
  );
}