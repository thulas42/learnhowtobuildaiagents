import { NextRequest } from "next/server";

/**
 * Validates admin access via Authorization: Bearer header (preferred)
 * or legacy ?key= query / body key (deprecated).
 */
export function isAdminAuthorized(request: NextRequest, bodyKey?: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7) === secret;
  }

  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get("key");
  if (queryKey === secret) return true;
  if (bodyKey === secret) return true;

  return false;
}

export function adminUnauthorizedResponse() {
  return Response.json(
    { error: "Unauthorized. Use Authorization: Bearer <ADMIN_SECRET>." },
    { status: 401 }
  );
}
