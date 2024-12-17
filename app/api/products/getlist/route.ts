import { GetCarList } from "@/Services/CarService";
import { CarListType } from "@/Types/Car.Types";
import { ProductListType, ProductType } from "@/Types/Product.Types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");

  const searchType: ProductListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.productName = keywords;
  }

  const result = await GetCarList({
    searchType,
  });

  return NextResponse.json(result);
}
