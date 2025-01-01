import { GetDistributorCurrentAccountsTypeListService } from "@/Services/DistrubitorsService";
import { DistrubitorCurrentAccountsListType } from "@/Types/Distrubitor.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const id = Number(searchParams.get("id"));

  const searchType: DistrubitorCurrentAccountsListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.keywords = keywords;
  }

  if (startDate && startDate != "undefined") {
    searchType.startDate = startDate;
  }

  if (endDate && endDate != "undefined") {
    searchType.endDate = endDate;
  }

  const result = await GetDistributorCurrentAccountsTypeListService({
    distributorId: id,
    searchType,
  });

  return NextResponse.json(result);
}
