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

interface CartItem extends Product {
  quantity: number;
}

// Admin paneliyle birebir aynı genişletilmiş kategori listesi
const CATEGORIES = [
  "Tümü",
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const savedProducts = localStorage.getItem('trendtan_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    const savedCart = localStorage.getItem('trendtan_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const handleQuantityChange = (productId: number, qty: string) => {
    setQuantities({ ...quantities, [productId]: Math.max(1, parseInt(qty) || 1) });
  };

  const addToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      let updatedCart: CartItem[];
      if (existing) {
        updatedCart = prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      } else {
        updatedCart = [...prevCart, { ...product, quantity: qty }];
      }
      localStorage.setItem('trendtan_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    alert(`${product.name} (${qty} adet) sepete eklendi!`);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const filteredProducts = selectedCategory === "Tümü" 
    ? products 
    : products.filter(p => (p.category || "Genel") === selectedCategory);
    
  const superDeals = products.filter(p => p.isSuperDeal);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Üst Süper Fırsat Şeridi */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white text-xs md:text-sm font-semibold py-2 px-4 text-center tracking-wide shadow-inner flex justify-center items-center gap-2">
        <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs uppercase tracking-wider font-bold">Süper Fırsat</span>
        <span>Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! Sınırlı Sayıda Stok. 🔥</span>
      </div>

      {/* Navbar */}
      <header className="border-b border-gray-100 sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3" translate="no">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-orange-500 font-black text-xl shadow-md">T</div>
            <h1 className="text-2xl font-black tracking-tighter text-black select-none">
              TREND<span className="text-orange-500">TAN</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <a href="/admin" className="text-sm font-bold text-gray-700 hover:text-orange-500 transition bg-gray-100 px-4 py-2 rounded-xl">Satıcı Ol</a>
            <a href="/cart" className="bg-black text-white px-5 py-2.5 rounded-2xl font-medium hover:bg-orange-500 transition shadow-lg flex items-center gap-2">
              <span>Sepetim</span>
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{totalCartCount}</span>
            </a>
          </div>
        </div>
      </header>

      {/* BANNER ALANI (TAN MEDYA TASARIM KURULUŞUDUR) */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-black text-orange-300 text-xs font-black uppercase px-3 py-1 rounded-lg tracking-wider">TAN MEDYA TASARIM KURULUŞUDUR</span>
            <h2 className="text-2xl md:text-3xl font-black">Sen de Ürünlerini Satmaya Başla!</h2>
            <p className="text-orange-100 text-sm max-w-xl">Mağazanızı hemen açın, binlerce müşteriye anında ulaşın. Kolay ürün yönetimi ve güvenli ödeme altyapısıyla kazancınızı katlayın.</p>
          </div>
          <a 
            href="/admin" 
            className="bg-black text-white px-8 py-4 rounded-2xl font-black text-base hover:bg-white hover:text-black transition shadow-xl whitespace-nowrap"
          >
            Mağaza Aç →
          </a>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex flex-wrap gap-2 justify-center bg-gray-50/80 p-4 rounded-3xl border border-gray-100">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                selectedCategory === cat 
                  ? "bg-black text-white shadow-md scale-105" 
                  : "bg-white text-gray-700 border border-gray-200 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Süper Fırsat Banner */}
      {superDeals.length > 0 && selectedCategory === "Tümü" && (
        <section className="max-w-7xl mx-auto px-6 pt-8">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden border border-orange-500/20">
            <div className="space-y-4 max-w-xl z-10">
              <span className="bg-orange-500 text-white text-xs font-black uppercase px-3 py-1.5 rounded-xl tracking-wider">Günün Süper Fırsatı</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{superDeals[0].name}</h2>
              <p className="text-gray-300 text-sm md:text-base line-clamp-2">{superDeals[0].description}</p>
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-black text-orange-400">{superDeals[0].price} TL</span>
                {superDeals[0].oldPrice && (
                  <span className="text-lg text-gray-500 line-through font-semibold">{superDeals[0].oldPrice} TL</span>
                )}
              </div>
            </div>
            <div className="z-10 w-full md:w-72 h-64 bg-white rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border-4 border-orange-500/30">
              <img src={superDeals[0].image} alt={superDeals[0].name} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Ürünler Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black tracking-tight text-gray-900">
            {selectedCategory === "Tümü" ? "Tüm Ürünler" : `${selectedCategory} Ürünleri`}
          </h3>
          <span className="text-sm font-medium text-gray-400">{filteredProducts.length} ürün listeleniyor</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-bold text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
            <p className="text-gray-400 text-sm mt-2">Admin panelinden yeni ürünler ekleyerek burada listeleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const currentQty = quantities[product.id] || 1;
              const hasDiscount = product.oldPrice && product.oldPrice > product.price;

              return (
                <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
                  <div>
                    <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
                      {hasDiscount && (
                        <span className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md tracking-wide">
                          İNDİRİMLİ
                        </span>
                      )}
                      <img src={product.image || "https://via.placeholder.com/500"} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="p-6 space-y-2">
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{product.category || "Genel"}</span>
                      <h4 className="font-bold text-lg text-gray-900 line-clamp-1">{product.name}</h4>
                      <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-baseline gap-3 pt-2">
                        <span className="text-2xl font-black text-gray-900">{product.price} TL</span>
                        {hasDiscount && (
                          <span className="text-sm text-gray-400 line-through font-bold">{product.oldPrice} TL</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <input 
                      type="number" 
                      min="1" 
                      value={currentQty} 
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-16 border border-gray-200 rounded-2xl px-3 py-3 text-center font-bold bg-gray-50 focus:outline-orange-500"
                    />
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-black text-white py-3.5 rounded-2xl font-bold hover:bg-orange-500 transition shadow-md"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}