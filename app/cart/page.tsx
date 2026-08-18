'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Sepetteki ürünlerin veri yapısını tanımlıyoruz
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sayfa yüklendiğinde localStorage'dan sepet verilerini çekiyoruz
  useEffect(() => {
    const savedCart = localStorage.getItem('trendtan_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Sepet yüklenirken hata oluştu:', e);
      }
    }
  }, []);

  // Sepeti güncelleyip hem state'e hem de localStorage'a kaydeden yardımcı fonksiyon
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('trendtan_cart', JSON.stringify(newCart));
  };

  // Ürün miktarını artırma
  const increaseQuantity = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  // Ürün miktarını azaltma (1'in altına düşerse isterse silinebilir veya 1 kalır)
  const decreaseQuantity = (id: string) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Miktarı 0 olanı sepetten çıkar
    updateCart(updated);
  };

  // Ürünü sepetten tamamen silme
  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // Toplam sepet tutarını hesaplama (Artık TypeScript 'price' ve 'quantity' özelliklerini güvenle tanır)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 150 : 0; // Örnek kargo ücreti
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-neutral-800">Sepetiniz Henüz Boş</h1>
        <p className="text-neutral-500 mb-6">TrendTan koleksiyonundan en şık ürünleri keşfetmeye başlayın.</p>
        <Link 
          href="/" 
          className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-neutral-800 transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900">Alışveriş Sepeti</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Ürün Listesi */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between border-b border-neutral-200 pb-6 gap-4"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md border border-neutral-200" 
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">{item.name}</h3>
                  <p className="text-neutral-600 mt-1">₺{item.price.toLocaleString('tr-TR')}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Adet Kontrol Butonları */}
                <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden">
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-medium text-neutral-800">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition"
                  >
                    +
                  </button>
                </div>

                {/* Ürünü Kaldır Butonu */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sipariş Özeti (Checkout Kısımı) */}
        <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-neutral-900">Sipariş Özeti</h2>
          
          <div className="space-y-3 mb-6 text-neutral-600">
            <div className="flex justify-between">
              <span>Ürünler Toplamı</span>
              <span className="font-medium text-neutral-900">₺{subtotal.toLocaleString('tr-TR')}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              <span className="font-medium text-neutral-900">₺{shipping.toLocaleString('tr-TR')}</span>
            </div>
            <div className="border-t border-neutral-200 pt-3 flex justify-between text-lg font-bold text-neutral-900">
              <span>Genel Toplam</span>
              <span>₺{total.toLocaleString('tr-TR')}</span>
            </div>
          </div>

          <button 
            onClick={() => alert('Sipariş başarıyla alındı! Teşekkür ederiz.')}
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-neutral-800 transition"
          >
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
}