import { GetDistributorCompaniesListService } from "@/Services/DistrubitorsService";
import { DistrubitorCompanyListType } from "@/Types/Distrubitor.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const isActive = searchParams.get("isActive");
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const id = Number(searchParams.get("id"));

  const searchType: DistrubitorCompanyListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.companyName = keywords;
  }

  if (isActive && isActive != "undefined") {
    searchType.status = isActive == "true" ? true : false;
  }

  const result = await GetDistributorCompaniesListService({
    distributorId: id,
    searchType,
  });

  return NextResponse.json(result);
}
