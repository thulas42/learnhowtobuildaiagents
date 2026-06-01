import { NextRequest, NextResponse } from "next/server";
import { getUsers, saveUsers } from "@/lib/data-store";
import { getSessionUser, unauthorizedResponse } from "@/lib/session";

/**
 * GET /api/profile — Get authenticated user's profile
 */
export async function GET() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) return unauthorizedResponse();

    const users = getUsers();
    const user = users.find((u) => u.id === sessionUser.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      image: user.image || "",
      locale: user.locale || "en",
      learningPath: user.learningPath || "STANDARD",
      provider: user.provider || "credentials",
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/profile — Update authenticated user's profile
 */
export async function PUT(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) return unauthorizedResponse();

    const { name, locale, learningPath } = await request.json();

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === sessionUser.id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (name !== undefined) users[userIndex].name = name;
    if (locale !== undefined) users[userIndex].locale = locale;
    if (learningPath !== undefined) users[userIndex].learningPath = learningPath;
    users[userIndex].updatedAt = new Date().toISOString();

    saveUsers(users);

    return NextResponse.json({
      success: true,
      user: {
        name: users[userIndex].name,
        email: users[userIndex].email,
        locale: users[userIndex].locale,
        learningPath: users[userIndex].learningPath,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
