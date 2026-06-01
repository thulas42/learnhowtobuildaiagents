import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const id = (session.user as { id?: string }).id;
  if (!id) return null;

  return {
    id,
    email: session.user.email,
    name: session.user.name,
  };
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
