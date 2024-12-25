export type ProcessType = "Araclar" | "Araclar1" | "Araclar2";
export type ExcelType = {
  data: (fetchFunc: any) => Promise<any[]>;
};

export type ExcelAraclarDataType = {
  Plaka: string;
  "Üye Adı": string;
  Tutar: number;
  "Oluşturulma Tarihi": string;
};

export type ExcelIstasyonlarDataType = {
  "İstasyon Adı": string;
  Marka: string;
  "İstasyon Kodu": string;
  "İstasyon Numarası": string;
  Durum: string;
  "Kayıt Tarihi": string;
};

export type ExcelKullanicilarDataType = {
  "E-Posta": string;
  "Kullanıcı Adı": string;
  Ad: string;
  "Rol İsmi": string;
  Aktif: string;
};

export type ExcelFirmalarSubeType = {};

export type ExcelFirmalarSatisType = {
  "Üye Adı": string;
  "Firma Adı": string;
  İstasyon: string;
  "Tank Adı": string;
  Plaka: string;
  "Satış Miktarı": string;
  "Satış Tutarı": string;
  "Satış Tarihi": string;
  "Kayıt Tarihi": string;
};

export type ExcelFirmalarKullanicilarType = {};
export type ExcelFirmalarFinansType = {};
export type ExcelFirmalarOtorizasyonType = {};
export type ExcelFirmalarKrediKartlariType = {};
export type ExcelFirmalarFaturalarType = {};

export type ExcelPetronetBayilerType = {
  "Bayi Id": string;
  "Lisans No": string;
  "Bayi Ünvan": string;
  Şehir: string;
  Online: string;
  "Kayıt Tarihi": string;
};

export type ExcelPetronetSatislarType = {
  "Bayi Id": string;
  "Lisans No": string;
  "Bayi Ünvan": string;
  Plaka: string;
  Fiyat: string;
  Litre: string;
  "Kart Tip": string;
  "Satış Tarihi": string;
  "Kayıt Tarihi": string;
};

export type ExcelPetronetTankDurumlariType = {
  "Bayi Adı": string;
  "Lisans No": string;
  "Tank Kapasitesi": string;
  Kalibrasyon: string;
  Sıcaklık: string;
};

export type ExcelPetronetTankHareketleriType = {
  "Bayi Id": string;
  "Lisans No": string;
  "Bayi Ünvan": string;
  "E.Yakıt": string;
  "Yakıt Seviye": string;
  "Yakıt Litre": string;
  "Su Seviye": string;
  "Su Litre": string;
  Sıcaklık: string;
  "Kayıt Tarihi": string;
};

export type ExcelPetronetTankDolulukOranlariType = {
  "Bayi Adı": string;
  "Tank Adı": string;
  "Tank Kapasitesi": string;
  "Yakıt Hacmi": string;
  "Boş Hacim": string;
  "Su Seviyesi": string;
  "Su Hacmi": string;
  Sıcaklık: string;
};

export type ExcelBpOrderType = {
  "Sipariş No": string;
  İstasyon: string;
  Litre: string;
  Durum: string;
  "Sipariş Tarihi": string;
  "Kayıt Tarihi": string;
};
