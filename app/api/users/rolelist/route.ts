import { GetAllRolesService } from "@/Services/RoleService";
import { RoleListType } from "@/Types/Role.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");

  const searchType: RoleListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.keywords = keywords;
  }

  const result = await GetAllRolesService({
    searchType,
  });

  return NextResponse.json(result);
}
