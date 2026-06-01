import fs from "fs";
import path from "path";

export const DATA_DIR = path.join(process.cwd(), "data");

export const DATA_FILES = {
  users: path.join(DATA_DIR, "users.json"),
  progress: path.join(DATA_DIR, "progress.json"),
  subscriptions: path.join(DATA_DIR, "subscriptions.json"),
  quizAttempts: path.join(DATA_DIR, "quiz-attempts.json"),
  certificates: path.join(DATA_DIR, "certificates.json"),
  pendingEft: path.join(DATA_DIR, "pending-eft.json"),
  notifications: path.join(DATA_DIR, "notifications.json"),
} as const;

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  image?: string;
  provider?: string;
  locale: string;
  learningPath: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Subscription {
  id: string;
  email: string;
  plan: string;
  paystackReference: string;
  paystackCustomerCode: string;
  amountPaid: number;
  currency: string;
  status: "active" | "cancelled";
  purchasedAt: string;
}

export interface ProgressEntry {
  userId: string;
  lessonId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completedAt: string | null;
  updatedAt: string;
}

export interface QuizAttemptRecord {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  passed: boolean;
  answers: unknown[];
  completedAt: string;
}

export function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readJsonFile<T>(filePath: string, fallback: T): T {
  ensureDataDir();
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonFile<T>(filePath: string, data: T) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getUsers(): StoredUser[] {
  return readJsonFile<StoredUser[]>(DATA_FILES.users, []);
}

export function saveUsers(users: StoredUser[]) {
  writeJsonFile(DATA_FILES.users, users);
}

export function getProgress(): ProgressEntry[] {
  return readJsonFile<ProgressEntry[]>(DATA_FILES.progress, []);
}

export function saveProgress(entries: ProgressEntry[]) {
  writeJsonFile(DATA_FILES.progress, entries);
}

export function getSubscriptions(): Subscription[] {
  return readJsonFile<Subscription[]>(DATA_FILES.subscriptions, []);
}

export function saveSubscriptions(subscriptions: Subscription[]) {
  writeJsonFile(DATA_FILES.subscriptions, subscriptions);
}

export function getQuizAttempts(): QuizAttemptRecord[] {
  return readJsonFile<QuizAttemptRecord[]>(DATA_FILES.quizAttempts, []);
}

export function saveQuizAttempts(attempts: QuizAttemptRecord[]) {
  writeJsonFile(DATA_FILES.quizAttempts, attempts);
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
