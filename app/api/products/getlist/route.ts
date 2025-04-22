import { GetAllProducts } from "@/Services/ProductService";
import { ProductListType } from "@/Types/Product.Types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const statusId = searchParams.get("statusId");

  const searchType: ProductListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.productName = keywords;
  }
  if (statusId && statusId != "undefined") {
    searchType.status = statusId == "true" ? true : false;
  }

  const result = await GetAllProducts({
    searchType,
  });

  return NextResponse.json(result);
}
