import { PageIndexType } from "./Common.Types";

export type PetronetSearchType = PageIndexType & {
  keywords?: string;
  status?: boolean;
  startDate?: string;
  endDate?: string;
};

export type PetronetDealersType = {
  DealerId: number;
  LisenceNumber: string;
  Title: string;
  CityName: string;
  IsOnline: boolean;
  CreatedDate: string;
  Id: number;
  CustomProperties: { [key: string]: any };
};

export type PetronetDealerSalesType = {
  PetronetId: number;
  DealerId: number;
  LisansNo: string;
  Unvan: string;
  Sehir: string;
  TarihSaat: string;
  Yakit_Ad: string;
  Ada_No: number;
  Cpu_no: number;
  Tabanca_No: number;
  CariUnvan: string;
  Tank_Id: number;
  FisNo: string;
  Plaka: string;
  BirimFiyat: number;
  Litre: number;
  Tutar: number;
  Km: string;
  KartTip: string;
  CreatedDate: string;
  Id: number;
  CustomProperties: { [key: string]: any };
};

export type PetronetTankStatusType = {
  DealerId: number;
  LisansNo: string;
  Bayi_id: number;
  Tank_Id: number;
  Ad: string;
  PropTip: number;
  YakitTurID: number;
  OnlineTarih: string;
  Durum: number;
  Adres: string;
  KapasiteHacim: number;
  MevcutHacim: number;
  BoyCap: number;
  Yatay: number;
  Bombe: number;
  Alt_Bosluk: number;
  Prob_Uzunluk: number;
  SpeedWire: number;
  Kalibrasyon: number;
  Kalibrasyon_Yuzde: number;
  HesapTip: number;
  MerkezYakitId: number;
  Tank_No: number;
  OzelDurumId: number;
  CreatedDate: string;
  Id: number;
  CustomProperties: { [key: string]: any };
};

export type PetronetTankTransactionsType = {
  PetronetId: number;
  DealerId: number;
  LisansNo: string;
  BayiUnvan: string;
  TarihSaat: string;
  TankAd: string;
  EpdkYakitAd: string;
  YakitSeviye: number;
  YakitHacim: number;
  SuSeviye: number;
  SuHacim: number;
  YakitSicaklik: number;
  CreatedDate: string;
  Id: number;
  CustomProperties: { [key: string]: any };
};

export type PetronetTankSimulesType = {
  LicenseNumber: string;
  Title: string;
  CityName: string;
  TankAd: string;
  BosHacim: number;
  KapasiteHacim: number;
  YakitSeviye: number;
  YakitHacim: number;
  SuSeviye: number;
  SuHacim: number;
  YakitSicaklik: number;
  IsOnline: boolean;
  Durum: string;
  Ratio: number;
  RatioLevel: number;
};
