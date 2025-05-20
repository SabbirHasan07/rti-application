const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // For password hashing

const prisma = new PrismaClient();

async function main() {
  // Hashing admin password
  const hashedPassword = await bcrypt.hash('Admin@BelaRti2520', 10);

  // Create or update admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@rti.com' }, // Checking if the admin already exists
    update: {}, // No update action if user exists
    create: {
      fullName: 'Admin',
      email: 'belabanglaweb@gmail.com',
      phone: '01715062193',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created or already exists:', adminUser);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
