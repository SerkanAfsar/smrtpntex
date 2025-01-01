import { GetDistributorCarsListService } from "@/Services/DistrubitorsService";
import { DistrubitorCarsListType } from "@/Types/Distrubitor.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const id = Number(searchParams.get("id"));

  const searchType: DistrubitorCarsListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.keywords = keywords;
  }

  const result = await GetDistributorCarsListService({
    distributorId: id,
    searchType,
  });

  return NextResponse.json(result);
}
