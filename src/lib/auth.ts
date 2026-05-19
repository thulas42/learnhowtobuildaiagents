import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  provider?: string;
  locale: string;
  learningPath: string;
  createdAt: string;
}

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getUsers(): StoredUser[] {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users: StoredUser[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

const providers: any[] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

providers.push(
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const users = getUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
      );
      if (!user || !user.passwordHash) return null;
      const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!isValid) return null;
      return { id: user.id, email: user.email, name: user.name, image: user.image };
    },
  })
);

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production",
  pages: { signIn: "/auth/login", newUser: "/auth/signup" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const users = getUsers();
        const existing = users.find(
          (u) => u.email?.toLowerCase() === user.email?.toLowerCase()
        );
        if (!existing) {
          users.push({
            id: generateId(),
            name: user.name || "User",
            email: user.email!.toLowerCase(),
            image: user.image || undefined,
            provider: account.provider,
            locale: "en",
            learningPath: "STANDARD",
            createdAt: new Date().toISOString(),
          });
          saveUsers(users);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) token.id = user.id;
      if (account) token.provider = account.provider;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/dashboard`;
    },
  },
};
