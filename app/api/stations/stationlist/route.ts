import { GetAllStationsService } from "@/Services/StationService";
import { StationListType } from "@/Types/Station.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const isActive = searchParams.get("isActive");

  const searchType: StationListType = {
    pageSize,
    pageIndex,
  };

  if (isActive && isActive != "undefined") {
    searchType.status = isActive == "true" ? true : false;
  }

  if (keywords && keywords != "undefined") {
    searchType.stationName = keywords;
  }

  const result = await GetAllStationsService({
    searchType,
  });

  return NextResponse.json(result);
}
