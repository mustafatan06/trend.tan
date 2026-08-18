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
      <header className="w-full border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between bg-white">
        {/* Logo Alanı - Sadece TRENDTAN */}
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl font-black tracking-wider text-black">
            TREND<span className="text-orange-500">TAN</span>
          </span>
        </div>
      </header>

      {/* Kategoriler - Turuncu alanın hemen altında, yan yana sıralı */}
      <div className="w-full bg-white border-b border-gray-100 py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 whitespace-nowrap">
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
            "Süpermarket",
            "Oto & Bahçe",
            "Diğer"
          ].map((kategori, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                index === 0
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-8 py-6 flex flex-col items-center">
        {/* İnce ve Genişletilmiş Turuncu Banner */}
        <div className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 rounded-2xl py-6 px-6 sm:px-12 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden mb-8">
          <div className="flex flex-col text-center sm:text-left">
            <span className="bg-black/40 text-orange-200 text-xs font-bold px-3 py-1 rounded-full mb-2 w-fit mx-auto sm:mx-0 tracking-wide">
              TAN MEDYA TASARIM KURULUŞUDUR
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Sen de Ürünlerini Satmaya Başla!
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl">
              Mağazanızı hemen açın, binlerce müşteriye anında ulaşın ve kazancınızı katlayın.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-6 py-3 bg-black hover:bg-gray-900 text-white text-sm font-bold rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Mağaza Aç →
          </Link>
        </div>

        {/* Ürünler Eklendiğinde Gözükecek Temiz Alan */}
        <div className="w-full max-w-7xl flex-1 text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl mb-3 shadow-inner">
            📦
          </div>
          <p className="text-gray-600 font-semibold text-base sm:text-lg">
            Mağazalar ve ürünler yakında burada listelenecektir.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Ürün eklemek veya mağazanızı yönetmek için panel girişini kullanabilirsiniz.
          </p>
        </div>
      </main>
    </div>
  );
}