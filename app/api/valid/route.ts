import { ValidationService } from "@/Services/Login.Service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await ValidationService(body);
  return NextResponse.json(result);
}
