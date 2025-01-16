import { GetDistributorCarsListService } from "@/Services/DistrubitorsService";
import { GetHelpDescListService } from "@/Services/HelpDescService";

import { HelpDescSearchType } from "@/Types/Help.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const subjectId = searchParams.get("subjectId");
  const statusId = searchParams.get("statusId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const searchType: HelpDescSearchType = {
    pageSize,
    pageIndex,
  };

  if (subjectId && subjectId != "undefined") {
    searchType.subjectId = Number(subjectId);
  }

  if (statusId && statusId != "undefined") {
    searchType.statusId = Number(statusId);
  }

  if (startDate && startDate != "undefined") {
    searchType.startDate = startDate;
  }

  if (endDate && endDate != "undefined") {
    searchType.endDate = endDate;
  }

  const result = await GetHelpDescListService({
    searchType,
  });

  return NextResponse.json(result);
}
