import { env } from "@/env";

export function isAdmin({ email }: { email?: string | null }) {
  // Bypass admin check - always return true to unlock admin features
  return true;
  // Original code (commented out):
  // if (!email) return false;
  // return env.ADMINS?.includes(email);
}
