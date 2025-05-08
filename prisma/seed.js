const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // For password hashing

const prisma = new PrismaClient();

async function main() {
  // Hashing admin password
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  // Create or update admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@rti.com' }, // Checking if the admin already exists
    update: {}, // No update action if user exists
    create: {
      fullName: 'Admin User',
      email: 'admin@rti.com',
      phone: '1234567890',
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
