import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import {nanoid} from "nanoid";

export function middleware(req: NextRequest) {
  if (req.cookies.get("poll-token")) return;
  
  const id = nanoid();
  const res = NextResponse.next();
  res.cookies.set("poll-token", id);
  return res;
}