"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUnifiedPage() {
  const [mod, setMod] = useState<"giris" | "basvuru" | "panel">("giris");
  const [urunler, setUrunler] = useState<any[]>([]);
  const [yeniUrun, setYeniUrun] = useState({ ad: "", anaKategori: "", altKategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });

  useEffect(() => {
    const oturum = localStorage.getItem("trendtan_giris");
    if (oturum === "true") setMod("panel");
    const kayitli = localStorage.getItem("trendtan_urunler");
    if (kayitli) setUrunler(JSON.parse(kayitli));
  }, []);

  const handleUrunKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniUrun.ad || !yeniUrun.fiyat) return alert("Eksik alan var!");
    const guncel = [...urunler, yeniUrun];
    setUrunler(guncel);
    localStorage.setItem("trendtan_urunler", JSON.stringify(guncel));
    setYeniUrun({ ad: "", anaKategori: "", altKategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });
  };

  // Admin panelindeki görsel yükleme alanı
  const handleGorselYukle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setYeniUrun(prev => ({ ...prev, gorsel: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // ... (Giriş ve diğer fonksiyonlar aynı kalacak, sadece mod panel kısmına odaklan)
  // Panel içindeki görsel alanı:
  /*
  <input type="file" accept="image/*" onChange={handleGorselYukle} className="hidden" id="gorselInput" />
  <label htmlFor="gorselInput" className="cursor-pointer bg-black text-white px-4 py-2 rounded-xl">Dosya Seç</label>
  <span>{yeniUrun.gorsel ? "Görsel Seçildi ✓" : "Dosya seçilmedi"}</span>
  */
  // ... (Kodun geri kalanı aynı)
}