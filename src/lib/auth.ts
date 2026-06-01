import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {
  generateId,
  getUsers,
  saveUsers,
} from "@/lib/data-store";

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is required in production");
}

const providers: NextAuthOptions["providers"] = [];

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
      const isValid = await bcrypt.compare(
        credentials.password,
        user.passwordHash
      );
      if (!isValid) return null;
      return { id: user.id, email: user.email, name: user.name, image: user.image };
    },
  })
);

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  secret:
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV === "production"
      ? undefined
      : "dev-secret-change-in-production"),
  pages: { signIn: "/auth/login", newUser: "/auth/signup" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const users = getUsers();
        const existing = users.find(
          (u) => u.email?.toLowerCase() === user.email?.toLowerCase()
        );
        if (!existing) {
          const newUser = {
            id: generateId("user"),
            name: user.name || "User",
            email: user.email!.toLowerCase(),
            image: user.image || undefined,
            provider: account.provider,
            locale: "en",
            learningPath: "STANDARD",
            createdAt: new Date().toISOString(),
          };
          users.push(newUser);
          saveUsers(users);
          user.id = newUser.id;
        } else {
          user.id = existing.id;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      } else if (token.email) {
        const users = getUsers();
        const existing = users.find(
          (u) =>
            u.email?.toLowerCase() === (token.email as string).toLowerCase()
        );
        if (existing) token.id = existing.id;
      }
      if (user && "provider" in user) {
        token.provider = (user as { provider?: string }).provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { provider?: string }).provider =
          token.provider as string;
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
