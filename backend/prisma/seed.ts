import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing products
  await prisma.product.deleteMany();

  // Create sample products with images from Unsplash
  const products = await prisma.product.createMany({
    data: [
      { name: 'Wireless Headphones', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
      { name: 'Mechanical Keyboard', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
      { name: 'USB-C Hub', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400' },
      { name: '4K Monitor', price: 399.99, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
      { name: 'Laptop Stand', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
      { name: 'Webcam HD', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400' },
      { name: 'Mouse Pad XL', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400' },
      { name: 'External SSD 1TB', price: 109.99, imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400' },
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

