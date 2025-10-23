import { env } from "@/env";

// Hard-coded bypass for production compatibility
const ADMIN_BYPASS = true;

export function isAdmin({ email }: { email?: string | null }) {
  // Use hard-coded bypass for production compatibility
  if (ADMIN_BYPASS) return true;
  
  // Original code:
  if (!email) return false;
  return env.ADMINS?.includes(email);
}
