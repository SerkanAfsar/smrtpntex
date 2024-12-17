import {
  GetPetronetSimulesService,
  GetPetronetTankStatusService,
} from "@/Services/PetronetService";
import { PetronetSearchType } from "@/Types/Petronet.Types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageIndex = Number(searchParams.get("pageIndex"));
  const pageSize = Number(searchParams.get("pageSize"));
  const keywords = String(searchParams.get("keywords"));
  const startDate = String(searchParams.get("startDate"));
  const endDate = String(searchParams.get("endDate"));
  const isActive = String(searchParams.get("isActive"));

  const searchType: PetronetSearchType = {
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
  if (isActive && isActive != "undefined") {
    searchType.status = isActive == "true" ? true : false;
  }

  const result = await GetPetronetSimulesService({
    searchType,
  });

  return NextResponse.json(result);
}
