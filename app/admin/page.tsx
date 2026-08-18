// Ürün Ekleme / Güncelleme
  const handleUrunKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniUrun.ad || !yeniUrun.kategori || !yeniUrun.fiyat || !yeniUrun.stok) {
      setUrunError("Lütfen zorunlu alanları doldurun!");
      return;
    }

    let yeniListe = [];
    if (duzenleId !== null) {
      yeniListe = urunler.map((item, idx) => (idx === duzenleId ? yeniUrun : item));
      setDuzenleId(null);
    } else {
      yeniListe = [...urunler, yeniUrun];
    }

    setUrunler(yeniListe);
    localStorage.setItem("trendtan_urunler", JSON.stringify(yeniListe)); // Veriyi kaydet
    setYeniUrun({ ad: "", kategori: "", fiyat: "", stok: "", aciklama: "", gorsel: "" });
    setUrunError("");
  };