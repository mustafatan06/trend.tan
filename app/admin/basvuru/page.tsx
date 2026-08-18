import Link from "next/link";

export default function MagazaAc() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          🏪
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 text-center mb-2">Mağazanızı Hemen Açın</h1>
        <p className="text-gray-500 text-xs sm:text-sm text-center mb-6">
          TRENDTAN üzerinde yerinizi alın, hemen satışa başlayın.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">Mağaza Adı</label>
            <input 
              type="text" 
              placeholder="Örn: Tan Ticaret" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none text-sm bg-gray-50 text-black" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">Yetkili Ad Soyad</label>
            <input 
              type="text" 
              placeholder="Adınız Soyadınız" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none text-sm bg-gray-50 text-black" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 block">Telefon Numarası</label>
            <input 
              type="tel" 
              placeholder="05XX XXX XX XX" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none text-sm bg-gray-50 text-black" 
            />
          </div>

          <button 
            type="button" 
            className="w-full mt-2 py-3.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-md text-sm"
          >
            Başvuruyu Tamamla
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-orange-600 font-bold hover:underline">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}