import { GetCarBrandList, GetCarList } from "@/Services/CarService";
import { CarBrandSearchType, CarListType } from "@/Types/Car.Types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");

  const searchType: CarBrandSearchType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.keywords = keywords;
  }

  const result = await GetCarBrandList({
    searchType,
  });

  return NextResponse.json(result);
}
