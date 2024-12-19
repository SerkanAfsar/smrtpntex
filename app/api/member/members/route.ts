import { GetMemberListService } from "@/Services/MemberService";
import { MemberListType } from "@/Types/Member.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const gsm = searchParams.get("gsm");
  const isActive = searchParams.get("isActive");

  const searchType: MemberListType = {
    pageSize,
    pageIndex,
  };

  if (gsm && gsm != "undefined") {
    searchType.gsm = gsm;
  }

  if (isActive && isActive != "undefined") {
    searchType.status = isActive == "true" ? true : false;
  }

  const result = await GetMemberListService({
    searchType,
  });

  return NextResponse.json(result);
}
