import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing products
  await prisma.product.deleteMany();

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      { name: 'Wireless Headphones', price: 79.99 },
      { name: 'Mechanical Keyboard', price: 149.99 },
      { name: 'USB-C Hub', price: 49.99 },
      { name: '4K Monitor', price: 399.99 },
      { name: 'Laptop Stand', price: 29.99 },
      { name: 'Webcam HD', price: 89.99 },
      { name: 'Mouse Pad XL', price: 19.99 },
      { name: 'External SSD 1TB', price: 109.99 },
    ],
  });

  console.log(`✅ Seeded ${products.count} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

