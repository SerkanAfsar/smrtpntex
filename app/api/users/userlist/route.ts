import { GetAllUsersService } from "@/Services/UserService";
import { UserListType } from "@/Types/User.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = searchParams.get("keywords");

  const searchType: UserListType = {
    pageSize,
    pageIndex,
  };

  if (keywords && keywords != "undefined") {
    searchType.keywords = keywords;
  }

  const result = await GetAllUsersService({
    searchType,
  });

  return NextResponse.json(result);
}
