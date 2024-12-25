import { CompanySalesType } from "@/Types/Company.Types";
import { CompanySalesService } from "./CompanyService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  ExcelAraclarDataType,
  ExcelFirmalarSatisType,
  ExcelIstasyonlarDataType,
} from "@/Types/Excel.Types";
import { exportToExcel } from "@/Utils";
import { CarType } from "@/Types/Car.Types";
import { GetCarList } from "./CarService";
import { GetAllStationsService } from "./StationService";
import { StationType } from "@/Types/Station.Types";

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
        pageSize: 9999,
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
  }
  exportToExcel(resultData, "Satışlar");
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
      pageSize: 9999,
      keywords,
      plateNumber,
    },
  });
  console.log("result is ", result);
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
    pageSize: 9999,
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
    exportToExcel(data, "İstasyonlar");
  }
};
