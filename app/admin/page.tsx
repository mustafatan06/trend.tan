"use client";
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  category: string;
  isSuperDeal?: boolean;
}

// Ana sayfa ile %100 uyumlu genişletilmiş kategori listesi
const CATEGORIES = [
  "Elektronik", 
  "Moda ve Giyim", 
  "Ev ve Yaşam", 
  "Kozmetik ve Kişisel Bakım", 
  "Spor ve Outdoor", 
  "Anne ve Bebek", 
  "Kitap ve Hobi", 
  "Yapı Market ve Oto", 
  "Diğer"
];

export default function AdminPage() {
  // Giriş yetkilendirme durumu
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Ürün yönetimi state'leri
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [oldPrice, setOldPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [isSuperDeal, setIsSuperDeal] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('trendtan_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const saved = localStorage.getItem('trendtan_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Ürünler yüklenirken hata oluştu", e);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem('trendtan_admin_auth', 'true');
    } else {
      alert("Hatalı kullanıcı adı veya şifre!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('trendtan_admin_auth');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("Lütfen zorunlu alanları (Ürün Adı, Fiyat, Görsel URL) doldurun!");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
      image,
      description,
      category,
      isSuperDeal
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('trendtan_products', JSON.stringify(updated));

    // Formu temizle
    setName("");
    setPrice("");
    setOldPrice("");
    setImage("");
    setDescription("");
    setIsSuperDeal(false);
    alert("Ürün başarıyla eklendi ve ana sayfada yayınlandı!");
  };

  const handleDelete = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('trendtan_products', JSON.stringify(updated));
  };

  // 1. GİRİŞ YAPILMADIYSA GÖSTERİLECEK ŞİFRELİ EKRAN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black italic tracking-tighter text-black select-none">
              TREND<span className="text-orange-500">TAN</span>
            </h1>
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
              TAN MEDYA TASARIM KURULUŞUDUR
            </p>
            <p className="text-xs font-bold text-gray-400">
              E-Ticaretin Yeni Kodunu TrendTan Yazıyor.
            </p>
            <h2 className="text-xl font-bold text-gray-900 pt-4">Satıcı Paneli Girişi</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Kullanıcı Adı</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 font-medium focus:outline-orange-500 bg-gray-50 text-gray-900"
                placeholder="Kullanıcı adınız"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Şifre</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 font-medium focus:outline-orange-500 bg-gray-50 text-gray-900"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-black text-white py-4 rounded-2xl font-black hover:bg-orange-500 transition shadow-lg"
            >
              Giriş Yap
            </button>
          </form>

          {/* ÜYE OLMAYANLAR İÇİN HEMEN MAĞAZA AÇ BÖLÜMÜ */}
          <div className="pt-6 border-t border-gray-100 text-center space-y-3">
            <p className="text-sm text-gray-500 font-medium">Henüz bir mağazanız yok mu?</p>
            <a 
              href="/" 
              className="block w-full bg-orange-500 text-white py-3.5 rounded-2xl font-black hover:bg-black transition shadow-md"
            >
              Hemen Mağaza Aç →
            </a>
          </div>

          <div className="text-center pt-2">
            <a href="/" className="text-xs font-bold text-gray-400 hover:text-black transition">← Ana Sayfaya Dön</a>
          </div>
        </div>
      </div>
    );
  }

  // 2. GİRİŞ BAŞARILI İSE GÖSTERİLECEK YÖNETİM PANELİ
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Üst Header */}
        <div className="bg-black text-white p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center shadow-xl border-b-4 border-orange-500 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black italic">
              TREND<span className="text-orange-500">TAN</span> <span className="text-sm font-normal not-italic text-gray-400">Satıcı Paneli</span>
            </h1>
            <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mt-1">
              E-Ticaretin Yeni Kodunu TrendTan Yazıyor.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="/" className="bg-white/10 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white hover:text-black transition">
              Ana Sayfa
            </a>
            <button onClick={handleLogout} className="bg-orange-500 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white hover:text-black transition">
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Ürün Ekleme Formu */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Yeni Ürün Ekle</h2>
          
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Ürün Adı *</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-medium text-gray-900"
                placeholder="Örn: Kablosuz Kulaklık Pro"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-medium text-gray-900"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Fiyat (TL) *</label>
              <input 
                type="number" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                required 
                className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-medium text-gray-900"
                placeholder="990"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Eski Fiyat (İndirimli göstermek için)</label>
              <input 
                type="number" 
                value={oldPrice} 
                onChange={e => setOldPrice(e.target.value)} 
                className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-medium text-gray-900"
                placeholder="1450"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-600 mb-1">Görsel URL *</label>
              <input 
                type="text" 
                value={image} 
                onChange={e => setImage(e.target.value)} 
                required 
                className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-medium text-gray-900"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-600 mb-1">Açıklama</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                rows={3} 
                className="w-full border border-gray-200 rounded-2xl p-3.5 bg-gray-50 focus:outline-orange-500 font-medium text-gray-900"
                placeholder="Ürün detaylarını giriniz..."
              ></textarea>
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <input 
                type="checkbox" 
                id="superDeal" 
                checked={isSuperDeal} 
                onChange={e => setIsSuperDeal(e.target.checked)}
                className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
              />
              <label htmlFor="superDeal" className="font-bold text-sm text-gray-700 cursor-pointer select-none">
                Günün Süper Fırsatı olarak ana sayfada öne çıkar 🔥
              </label>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-black hover:bg-orange-500 transition shadow-lg">
                Ürünü Yayınla
              </button>
            </div>
          </form>
        </div>

        {/* Eklenen Ürünler */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Mağazadaki Ürünler ({products.length})</h2>

          {products.length === 0 ? (
            <p className="text-gray-400 font-medium text-center py-8">Henüz ürün eklenmemiş.</p>
          ) : (
            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl bg-gray-200" />
                    <div>
                      <h4 className="font-bold text-gray-900">{p.name}</h4>
                      <p className="text-xs text-orange-500 font-bold">
                        {p.category} • <span className="text-gray-900">{p.price} TL</span>
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}