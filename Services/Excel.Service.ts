import { CompanySalesType } from "@/Types/Company.Types";
import { CompanySalesService } from "./CompanyService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  ExcelAraclarDataType,
  ExcelBpOrderType,
  ExcelFirmalarSatisType,
  ExcelIstasyonlarDataType,
  ExcelKullanicilarDataType,
  ExcelPetronetBayilerType,
  ExcelPetronetSatislarType,
  ExcelPetronetTankDolulukOranlariType,
  ExcelPetronetTankDurumlariType,
  ExcelPetronetTankHareketleriType,
} from "@/Types/Excel.Types";
import { exportToExcel } from "@/Utils";
import { CarType } from "@/Types/Car.Types";
import { GetCarList } from "./CarService";
import { GetAllStationsService } from "./StationService";
import { StationType } from "@/Types/Station.Types";
import {
  GetPetronetDealerSalesService,
  GetPetronetDealersService,
  GetPetronetSimulesService,
  GetPetronetTankStatusService,
  GetPetronetTransactionsService,
} from "./PetronetService";
import {
  PetronetDealerSalesType,
  PetronetDealersType,
  PetronetTankSimulesType,
  PetronetTankStatusType,
  PetronetTankTransactionsType,
} from "@/Types/Petronet.Types";
import { GetBpOrderListData } from "./BpOrderService";
import { BpOrderType } from "@/Types/BpOrder.Types";
import { toast } from "react-toastify";
import { GetAllUsersService } from "./UserService";
import { UserType } from "@/Types/User.Types";

export const ExcelFirmalarSatisResult = async ({
  id,
  startDate,
  endDate,
  keywords,
}: {
  id: number;
  startDate: string;
  endDate: string;
  keywords: string;
}) => {
  const result: ResponseResult<PaginationType<CompanySalesType>> =
    await CompanySalesService({
      id,
      searchType: {
        pageIndex: 1,
        pageSize: 99999,
        startDate,
        endDate,
        keywords,
      },
    });
  let resultData: ExcelFirmalarSatisType[] = [];
  if (result.IsSuccess) {
    const data = result.Data as PaginationType<CompanySalesType>;
    resultData = (data.records as CompanySalesType[]).map((item) => ({
      "Üye Adı": item.DisplayName,
      "Firma Adı": item.CompanyName,
      İstasyon: item.StationName,
      "Tank Adı": item.TankName,
      Plaka: item.PlateNumber,
      "Satış Miktarı": item.NewAmount.toString(),
      "Satış Tutarı": item.DiscountRatio.toString(),
      "Satış Tarihi": item.SaleDate,
      "Kayıt Tarihi": item.CreatedDate,
    }));
    if (resultData.length == 0) {
      return toast.error("Veri Yok", { position: "top-right" });
    }
    exportToExcel(resultData, "Satışlar");
  } else {
    return toast.error(result.Message || "Hata", { position: "top-right" });
  }
};

export const ExcelAraclarResult = async ({
  startDate,
  endDate,
  keywords,
  plateNumber,
}: {
  startDate: string;
  endDate: string;
  keywords: string;
  plateNumber: string;
}) => {
  const result: ResponseResult<CarType> = await GetCarList({
    searchType: {
      pageIndex: 1,
      pageSize: 99999,
      keywords,
      plateNumber,
    },
  });

  let mainData: ExcelAraclarDataType[] = [];
  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<CarType>;
    mainData = (resultData.records as CarType[]).map((item: any) => ({
      Plaka: item.PlateNumber,
      "Üye Adı": item.FirstName,
      Tutar: item.Amount,
      "Oluşturulma Tarihi": item.CreatedDate,
    }));
  }
  exportToExcel(mainData, "Araclar");
};

export const ExcelIstasyonlarList = async ({
  stationName,
  status,
}: {
  stationName: string;
  status?: boolean;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 99999,
  };
  if (stationName) {
    searchType.stationName = stationName;
  }
  if (status != undefined) {
    searchType.status = status;
  }

  const result: ResponseResult<PaginationType<StationType>> =
    await GetAllStationsService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<StationType>;
    const data: ExcelIstasyonlarDataType[] = (
      resultData.records as StationType[]
    ).map((item: any) => ({
      "İstasyon Adı": item.Title,
      Marka: item.Brand,
      "İstasyon Kodu": item.AffiliateCode,
      "İstasyon Numarası": item.StationNumber,
      Durum: item.IsActive ? "Aktif" : "Pasif",
      "Kayıt Tarihi": item.CreatedDate,
    }));
    if (data.length == 0) {
      return toast.error("Null Error", { position: "top-right" });
    }
    exportToExcel(data, "İstasyonlar");
  } else {
    return toast.error(result.Message || "Hata", { position: "top-right" });
  }
};

export const ExcelPetronetBayilerList = async ({
  keywords,
  status,
}: {
  keywords: string;
  status?: boolean;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 99999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }
  if (status != undefined) {
    searchType.status = status;
  }

  const result: ResponseResult<PaginationType<PetronetDealersType>> =
    await GetPetronetDealersService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<PetronetDealersType>;
    const data: ExcelPetronetBayilerType[] = (
      resultData.records as PetronetDealersType[]
    ).map((item) => ({
      "Bayi Id": item.DealerId.toString(),
      "Lisans No": item.LisenceNumber.toString(),
      "Bayi Ünvan": item.Title,
      Şehir: item.CityName,
      Online: item.IsOnline ? "Online" : "Pasif",
      "Kayıt Tarihi": item.CreatedDate,
    }));
    if (data.length == 0) {
      return toast.error("Data Null", {
        position: "bottom-right",
      });
    }

    exportToExcel(data, "Petronel Bayiler");
  } else {
    return toast.error(result.Message || "Hata", { position: "bottom-right" });
  }
};

export const ExcelPetronetSatislarList = async ({
  keywords,
  startDate,
  endDate,
}: {
  keywords: string;
  startDate?: string;
  endDate?: string;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }
  if (startDate) {
    searchType.startDate = startDate;
  }
  if (endDate) {
    searchType.endDate = endDate;
  }

  const result: ResponseResult<PaginationType<PetronetDealerSalesType>> =
    await GetPetronetDealerSalesService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<PetronetDealerSalesType>;
    const data: ExcelPetronetSatislarType[] = (
      resultData.records as PetronetDealerSalesType[]
    ).map((item) => ({
      "Bayi Id": item.DealerId.toString(),
      "Lisans No": item.LisansNo.toString(),
      "Bayi Ünvan": item.Unvan,
      Şehir: item.Sehir,
      Plaka: item.Plaka,
      Fiyat: item.BirimFiyat.toString(),
      Litre: item.Litre.toString(),
      "Kart Tip": item.KartTip,
      "Satış Tarihi": item.TarihSaat,
      "Kayıt Tarihi": item.CreatedDate,
    }));
    exportToExcel(data, "Petronel Satışlar");
  } else {
    return toast.error(result.Message || "Hata", { position: "bottom-right" });
  }
};

export const ExcelPetronetTankDurumlariList = async ({
  keywords,
  startDate,
  endDate,
}: {
  keywords: string;
  startDate?: string;
  endDate?: string;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 9999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }
  if (startDate) {
    searchType.startDate = startDate;
  }
  if (endDate) {
    searchType.endDate = endDate;
  }

  const result: ResponseResult<PaginationType<PetronetTankStatusType>> =
    await GetPetronetTankStatusService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<PetronetTankStatusType>;
    const data: ExcelPetronetTankDurumlariType[] = (
      resultData.records as PetronetTankStatusType[]
    ).map((item) => ({
      "Bayi Adı": item.Ad,
      "Lisans No": item.LisansNo.toString(),
      "Tank Kapasitesi": item.KapasiteHacim.toString(),
      Kalibrasyon: item.Kalibrasyon.toString(),
      Sıcaklık: item.Kalibrasyon.toString(),
    }));
    if (data.length == 0) {
      return toast.error("Data Null", {
        position: "bottom-right",
      });
    }
    exportToExcel(data, "Petronet Tank Durumları");
  } else {
    return toast.error(result.Message || "Hata", { position: "bottom-right" });
  }
};

export const ExcelPetronetTankHareketleriList = async ({
  keywords,
  startDate,
  endDate,
}: {
  keywords: string;
  startDate?: string;
  endDate?: string;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 9999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }
  if (startDate) {
    searchType.startDate = startDate;
  }
  if (endDate) {
    searchType.endDate = endDate;
  }

  const result: ResponseResult<PaginationType<PetronetTankTransactionsType>> =
    await GetPetronetTransactionsService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData =
      result.Data as PaginationType<PetronetTankTransactionsType>;
    const data: ExcelPetronetTankHareketleriType[] = (
      resultData.records as PetronetTankTransactionsType[]
    ).map((item) => ({
      "Bayi Id": item.DealerId.toString(),
      "Lisans No": item.LisansNo.toString(),
      "Bayi Ünvan": item.BayiUnvan,
      "E.Yakıt": item.EpdkYakitAd,
      "Yakıt Seviye": item.YakitSeviye.toString(),
      "Yakıt Litre": item.YakitHacim.toString(),
      "Su Seviye": item.SuSeviye.toString(),
      "Su Litre": item.SuHacim.toString(),
      Sıcaklık: item.YakitSicaklik.toString(),
      "Kayıt Tarihi": item.CreatedDate.toString(),
    }));
    if (data.length == 0) {
      return toast.error("Data null", {
        position: "bottom-right",
      });
    }
    exportToExcel(data, "Petronet Tank Hareketleri");
  } else {
    return toast.error(result.Message || "Hata", { position: "bottom-right" });
  }
};

export const ExcelPetronetTankDolulukOranlariList = async ({
  keywords,
  startDate,
  endDate,
}: {
  keywords: string;
  startDate?: string;
  endDate?: string;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 9999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }
  if (startDate) {
    searchType.startDate = startDate;
  }
  if (endDate) {
    searchType.endDate = endDate;
  }

  const result: ResponseResult<PaginationType<PetronetTankSimulesType>> =
    await GetPetronetSimulesService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<PetronetTankSimulesType>;
    const data: ExcelPetronetTankDolulukOranlariType[] = (
      resultData.records as PetronetTankSimulesType[]
    ).map((item) => ({
      "Bayi Adı": item.Title,
      "Tank Adı": item.TankAd,
      "Tank Kapasitesi": item.KapasiteHacim.toString(),
      "Yakıt Hacmi": item.YakitHacim.toString(),
      "Boş Hacim": item.BosHacim.toString(),
      "Su Seviyesi": item.SuSeviye.toString(),
      "Su Hacmi": item.SuHacim.toString(),
      Sıcaklık: item.YakitSicaklik.toString(),
    }));
    exportToExcel(data, "Petronet Tank Doluluk Oranları");
  }
};

export const ExcelBPList = async ({
  keywords,
  startDate,
  endDate,
}: {
  keywords: string;
  startDate?: string;
  endDate?: string;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 9999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }
  if (startDate) {
    searchType.startDate = startDate;
  }
  if (endDate) {
    searchType.endDate = endDate;
  }

  const result: ResponseResult<PaginationType<BpOrderType>> =
    await GetBpOrderListData({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<BpOrderType>;
    const data: ExcelBpOrderType[] = (resultData.records as BpOrderType[]).map(
      (item) => ({
        "Sipariş No": item.OrderCode.toString(),
        İstasyon: item.StationName,
        Litre: item.Quantity.toString(),
        Durum: item.StateMessage,
        "Sipariş Tarihi": item.OrderDate,
        "Kayıt Tarihi": item.CreatedDate,
      }),
    );

    if (data.length == 0) {
      return toast.error("Data Null", { position: "top-right" });
    }

    exportToExcel(data, "BP Sipariş Listesi");
  } else {
    return toast.error(result.Message || "Hata", { position: "top-right" });
  }
};

export const ExportExcelUserList = async ({
  keywords,
}: {
  keywords: string;
}) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 9999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }

  const result: ResponseResult<PaginationType<UserType>> =
    await GetAllUsersService({
      searchType,
    });

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<UserType>;
    const data: ExcelKullanicilarDataType[] = (
      resultData.records as UserType[]
    ).map((item) => ({
      "E-Posta": item.Email,
      "Kullanıcı Adı": item.UserName,
      Ad: item.FullName,
      "Rol İsmi": item.RoleName,
      Aktif: item.IsActive ? "Aktif" : "Pasif",
    }));
    if (data.length == 0) {
      return toast.error("Data Null", { position: "top-right" });
    }
    exportToExcel(data, "Kullanıcılar");
  } else {
    return toast.error(result.Message || "Hata", { position: "top-right" });
  }
};
