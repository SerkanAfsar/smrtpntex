import { CompanyCarListService } from "@/Services/CompanyService";
import { CompanyCarListType } from "@/Types/Company.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const id = Number(searchParams.get("id"));
  const searchType: CompanyCarListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.keywords = keywords;
  }

  console.log(searchType);
  const result = await CompanyCarListService({
    companyId: id,
    searchType,
  });

  return NextResponse.json(result);
}
