import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/onboarding/:path*", "/radiografia/:path*", "/dashboard/:path*", "/auth/:path*", "/login", "/signup", "/registro"],
};
