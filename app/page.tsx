import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Üst Fırsat Bandı */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-sm">
        <span className="font-bold">SÜPER FIRSAT:</span> Seçili Ürünlerde Kaçırılmayacak İndirimler Başladı! Sınırlı Sayıda Stok. 🔥
      </div>

      {/* Header / Üst Menü */}
      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 bg-white">
        {/* Logo Alanı */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            T
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
            TREND<span className="text-orange-500">TAN</span>
          </span>
        </div>

        {/* Sağ Butonlar (Satıcı Ol ve Sepetim) - Mobilde taşmayı önleyecek esnek yapı */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <Link
            href="#"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-sm font-semibold rounded-full transition-all shadow-sm"
          >
            Satıcı Ol
          </Link>
          <Link
            href="#"
            className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-full transition-all shadow-md flex items-center gap-2"
          >
            Sepetim
          </Link>
        </div>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Banner Kartı */}
        <div className="w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden mb-8">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <span className="bg-black/80 text-orange-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide shadow-sm">
            TAN MEDYA TASARIM KURULUŞUDUR
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Sen de Ürünlerini Satmaya Başla!
          </h1>

          <p className="text-sm sm:text-base text-orange-50 max-w-xl mb-6 font-normal leading-relaxed">
            Mağazanızı hemen açın, binlerce müşteriye anında ulaşın. Kolay ürün yönetimi ve güvenli ödeme altyapısıyla kazancınızı katlayın.
          </p>

          <Link
            href="#"
            className="px-8 py-3.5 bg-black hover:bg-gray-900 text-white text-sm sm:text-base font-bold rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
          >
            Mağaza Aç →
          </Link>
        </div>

        {/* Kategoriler */}
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              "Tümü",
              "Elektronik",
              "Moda ve Giyim",
              "Ev ve Yaşam",
              "Kozmetik ve Kişisel Bakım",
              "Spor ve Outdoor",
              "Anne ve Bebek",
              "Kitap ve Hobi",
              "Yapı Market ve Oto",
              "Diğer",
            ].map((kategori, index) => (
              <button
                key={index}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  index === 0
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-black hover:text-black"
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}