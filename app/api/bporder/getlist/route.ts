import { GetBpOrderListData } from "@/Services/BpOrderService";
import { BpOrderListType } from "@/Types/BpOrder.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const orderStateId = searchParams.get("orderStateId");

  const searchType: BpOrderListType = {
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
  if (orderStateId && orderStateId != "undefined") {
    searchType.orderStateId = Number(orderStateId);
  }

  const result = await GetBpOrderListData({
    searchType,
  });

  return NextResponse.json(result);
}
