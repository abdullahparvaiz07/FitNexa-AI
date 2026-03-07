require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('FitNexaAI@2026.Ltd', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'abdullahparvaizofficial@gmail.com' },
    update: { 
      password: hashedPassword, 
      role: 'ADMIN', 
      name: 'Abdullah Parvaiz' 
    },
    create: { 
      email: 'abdullahparvaizofficial@gmail.com', 
      password: hashedPassword, 
      role: 'ADMIN', 
      name: 'Abdullah Parvaiz' 
    }
  });
  
  console.log('Admin user seeded successfully:', user.email);
}

main()
  .catch(e => { 
    console.error(e); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });
