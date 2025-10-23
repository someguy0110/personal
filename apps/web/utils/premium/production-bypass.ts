import { type Premium, PremiumTier } from "@prisma/client";

// Production-safe premium bypass
// This file provides a clean way to bypass premium checks without breaking production builds

export const PRODUCTION_BYPASS_ENABLED = true;

export function bypassPremiumCheck<T>(originalFunction: () => T, bypassValue: T): T {
  // In production, we want to ensure the bypass works without breaking the build
  if (PRODUCTION_BYPASS_ENABLED) {
    return bypassValue;
  }
  return originalFunction();
}

export function getBypassedTier(): PremiumTier {
  return PremiumTier.LIFETIME;
}

export function getBypassedBoolean(): boolean {
  return true;
}

export function getBypassedNumber(): number {
  return 999; // For unlimited access
}