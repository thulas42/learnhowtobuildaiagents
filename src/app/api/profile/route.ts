import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

function getUsers(): any[] {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users: any[]) {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

/**
 * GET /api/profile?email=user@example.com
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

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
}

/**
 * PUT /api/profile
 * Body: { email, name, locale, learningPath }
 */
export async function PUT(request: NextRequest) {
  try {
    const { email, name, locale, learningPath } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const users = getUsers();
    const userIndex = users.findIndex(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update allowed fields
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
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
