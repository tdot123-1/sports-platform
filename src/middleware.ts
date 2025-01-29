import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

// calls 'updateSession' for every request to check authentication
export async function middleware(request: NextRequest) {
    // either allows access or redirects
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/profile",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
