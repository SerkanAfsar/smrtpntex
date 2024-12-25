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
