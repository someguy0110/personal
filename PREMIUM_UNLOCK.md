# Inbox Zero Premium Unlock Guide

This guide explains how to unlock all premium features in Inbox Zero without paying for subscriptions.

## What's Been Modified

The following files have been modified to bypass the paywall and unlock all premium features:

### 1. Premium Check Functions (`apps/web/utils/premium/index.ts`)
- `isPremium()` - Always returns `true` regardless of subscription status
- `isActivePremium()` - Always returns `true` regardless of subscription status
- `hasAiAccess()` - Always returns `true` to unlock AI features
- `hasTierAccess()` - Always returns `true` to grant access to all tiers
- `hasUnsubscribeAccess()` - Always returns `true` to unlock bulk unsubscribe

### 2. Admin Check Function (`apps/web/utils/admin.ts`)
- `isAdmin()` - Always returns `true` to unlock admin features

### 3. Server-side Premium Check (`apps/web/utils/premium/server.ts`)
- `checkHasAccess()` - Always returns `true` to bypass server-side checks

### 4. Premium Unlock Script (`apps/web/scripts/unlock-premium.ts`)
- Script to upgrade all existing users to lifetime premium in the database

## How to Use

### Option 1: Runtime Bypass (Recommended)
The modified functions will automatically bypass all premium checks at runtime. Simply run the application as usual:

```bash
# Install dependencies
pnpm install

# Set up environment variables (see .env.example)
cp apps/web/.env.example apps/web/.env

# Run the development server
pnpm dev
```

All premium features will be unlocked without needing to modify the database.

### Option 2: Database Migration (Optional)
If you want to permanently upgrade all users in the database to lifetime premium:

```bash
# Navigate to the web app directory
cd apps/web

# Run the premium unlock script
pnpm unlock-premium
```

This will:
- Upgrade all users to LIFETIME tier
- Set renewal date to 10 years from now
- Grant unlimited email account access (999 seats)
- Grant unlimited unsubscribe credits (9999)

## Features Unlocked

With these changes, you'll have access to:

✅ **AI Email Assistant** - Organizes inbox and pre-drafts replies
✅ **Reply Zero** - Track emails to reply to and those awaiting responses  
✅ **Smart Categories** - Automatically categorize every sender
✅ **Bulk Unsubscriber** - One-click unsubscribe and archive emails
✅ **Cold Email Blocker** - Auto-block cold emails
✅ **Email Analytics** - Track your activity and trends
✅ **Admin Panel** - Access to admin controls at `/admin`
✅ **Multi-Account Support** - Add unlimited email accounts
✅ **All AI Models** - Access to all LLM providers (OpenAI, Anthropic, etc.)

## Environment Variables

Make sure to set these essential environment variables in `apps/web/.env`:

```bash
# Required for authentication
AUTH_SECRET=your-random-secret-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Required for email providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

# Required for encryption
EMAIL_ENCRYPT_SECRET=your-encryption-secret
EMAIL_ENCRYPT_SALT=your-encryption-salt

# Required for database
DATABASE_URL=your-database-url

# Optional: AI provider keys (or use local Ollama)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

## Notes

- These modifications are for development/testing purposes only
- The original code is preserved in comments for reference
- If you want to revert changes, simply restore the original functions
- The admin panel at `/admin` will be accessible to any user
- All API endpoints that check for premium access will now allow access

## Troubleshooting

If you encounter TypeScript errors during development:
1. Run `pnpm install` to install all dependencies
2. Run `pnpm postinstall` to generate Prisma client
3. Make sure your `.env` file is properly configured

The TypeScript errors shown in the editor are expected since we're using the modified code without running the full build process.