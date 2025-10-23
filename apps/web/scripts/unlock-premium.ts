import { PrismaClient } from '@prisma/client';
import { PremiumTier } from '@prisma/client';

const prisma = new PrismaClient();

async function unlockPremiumForAllUsers() {
  console.log('🔓 Unlocking premium features for all users...');
  
  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        premiumId: true,
      },
    });

    console.log(`Found ${users.length} users`);

    // Process each user
    for (const user of users) {
      console.log(`Processing user: ${user.email}`);
      
      // Set a far future date for lifetime access (10 years from now)
      const lifetimeDate = new Date();
      lifetimeDate.setFullYear(lifetimeDate.getFullYear() + 10);
      
      if (user.premiumId) {
        // Update existing premium record
        await prisma.premium.update({
          where: { id: user.premiumId },
          data: {
            tier: PremiumTier.LIFETIME,
            lemonSqueezyRenewsAt: lifetimeDate,
            stripeSubscriptionStatus: 'active',
            emailAccountsAccess: 999, // Unlimited seats
            unsubscribeCredits: 9999, // Unlimited credits
          },
        });
        console.log(`✅ Updated premium for ${user.email}`);
      } else {
        // Create new premium record
        await prisma.premium.create({
          data: {
            users: { connect: { id: user.id } },
            admins: { connect: { id: user.id } },
            tier: PremiumTier.LIFETIME,
            lemonSqueezyRenewsAt: lifetimeDate,
            stripeSubscriptionStatus: 'active',
            emailAccountsAccess: 999, // Unlimited seats
            unsubscribeCredits: 9999, // Unlimited credits
          },
        });
        console.log(`✅ Created premium for ${user.email}`);
      }
    }

    console.log('🎉 All users have been upgraded to lifetime premium!');
  } catch (error) {
    console.error('❌ Error unlocking premium:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
unlockPremiumForAllUsers();