import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import BaseFetch from "./BaseService";
import { AddPriceType, PriceSearchType, PriceType } from "@/Types/Price.Types";
import { toast } from "react-toastify";
import { exportToExcel } from "@/Utils";
import { format } from "date-fns";

export async function GetPriceListService({
  searchType,
}: {
  searchType: PriceSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Price/list",
    body: searchType,
  })) as ResponseResult<PaginationType<PriceType>>;
}

export const ExportPriceList = async ({ keywords }: { keywords: string }) => {
  const searchType: any = {
    pageIndex: 1,
    pageSize: 9999999,
  };
  if (keywords) {
    searchType.keywords = keywords;
  }

  const result: ResponseResult<PaginationType<PriceType>> =
    await GetPriceListService({
      searchType,
    });

  // {
  //     name: "Başlangıç Tarihi",
  //     selector: (row: PriceType) => format(row.StartDate, "dd.MM.yyyy HH:ss"),
  //     sortable: true,
  //   },
  //   {
  //     name: "Bitiş Tarihi",
  //     selector: (row: PriceType) => format(row.FinishDate, "dd.MM.yyyy HH:ss"),
  //     sortable: true,
  //   },
  //   {
  //     name: "Firma Adı",
  //     selector: (row: PriceType) => row.CompanyName,
  //     sortable: true,
  //   },
  //   {
  //     name: "Üye Adı",
  //     selector: (row: PriceType) => row.MemberName,
  //     sortable: true,
  //   },
  //   {
  //     name: "Yeni Fiyat",
  //     selector: (row: PriceType) => row.NewAmount,
  //     sortable: true,
  //   },
  //   {
  //     name: "İndirim Oranı",
  //     selector: (row: PriceType) => row.DiscountRatio,
  //     sortable: true,
  //   },
  //   {
  //     name: "Kayıt Tarihi",
  //     selector: (row: PriceType) => format(row.CreatedDate, "dd.MM.yyyy HH:ss"),
  //     sortable: true,
  //   },

  if (result.IsSuccess) {
    const resultData = result.Data as PaginationType<PriceType>;
    const data: any[] = (resultData.records as PriceType[]).map((item) => ({
      "Başlangıç Tarihi": format(item.StartDate, "dd.MM.yyyy HH:ss"),
      "Bitiş Tarihi:": format(item.FinishDate, "dd.MM.yyyy HH:ss").toString(),
      "Firma Adı": item.CompanyName,
      "Kayıt Tarihi": format(item.CreatedDate, "dd.MM.yyyy HH:ss"),
      "Yeni Fiyat": item.NewAmount.toString(),
      "Üye Adı": item.MemberName.toString(),
      "İndirim Oranı": item.DiscountRatio.toString(),
    }));
    if (data.length == 0) {
      return toast.error("Data Null", { position: "top-right" });
    }
    exportToExcel(data, "Fiyatlar");
  } else {
    return toast.error(result.Message || "Hata", { position: "top-right" });
  }
};

export async function GetPriceByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Price/getbyid/${id}`,
  })) as ResponseResult<PriceType>;
}

export async function AddPriceService({ data }: { data: AddPriceType }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Price/add`,
    body: data,
  })) as ResponseResult<PriceType>;
}

export async function UpdatePriceService({
  id,
  data,
}: {
  id: number;
  data: AddPriceType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Price/edit/${id}`,
    body: data,
  })) as ResponseResult<PriceType>;
}

export async function DeletePriceService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Price/delete/${id}`,
  })) as ResponseResult<PriceType>;
}
