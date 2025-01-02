import { GetCompanyInvoiceList } from "@/Services/CompanyService";
import { CompanyInvoiceListType } from "@/Types/Company.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const id = Number(searchParams.get("id"));

  const searchType: CompanyInvoiceListType = {
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

  const result = await GetCompanyInvoiceList({
    companyId: id,
    searchType,
  });

  return NextResponse.json(result);
}
