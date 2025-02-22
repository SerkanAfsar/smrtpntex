import { ReconciliationForCompanyService } from "@/Services/ReconciliationService";

import { ReconciliationSearchType } from "@/Types/Reconciliation.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const searchType: ReconciliationSearchType = {
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

  const result = await ReconciliationForCompanyService({
    searchType,
  });

  return NextResponse.json(result);
}
