import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Only seed if database is empty
  const existingProducts = await prisma.product.count();
  if (existingProducts > 0) {
    console.log('⏭️  Database already seeded, skipping...');
    return;
  }

  // Create sample products with images from Unsplash
  const products = await prisma.product.createMany({
    data: [
      // Audio
      { name: 'Wireless Headphones', price: 79.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
      { name: 'Bluetooth Speaker', price: 59.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
      { name: 'Studio Microphone', price: 129.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400' },
      { name: 'Earbuds Pro', price: 199.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400' },
      { name: 'Noise Cancelling Headphones', price: 249.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400' },
      { name: 'Portable Speaker', price: 45.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400' },
      { name: 'USB Microphone', price: 79.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
      { name: 'Gaming Headset', price: 119.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
      { name: 'Soundbar', price: 179.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
      { name: 'Audio Interface', price: 299.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400' },
      { name: 'Wireless Earphones', price: 89.99, category: 'audio', imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' },

      // Keyboards & Mice
      { name: 'Mechanical Keyboard', price: 149.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
      { name: 'Wireless Mouse', price: 39.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400' },
      { name: 'Gaming Keyboard RGB', price: 179.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400' },
      { name: 'Ergonomic Mouse', price: 49.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400' },
      { name: 'Compact Keyboard', price: 89.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1560762484-813fc97650a0?w=400' },
      { name: 'Vertical Mouse', price: 59.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=400' },
      { name: 'Gaming Mouse', price: 79.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400' },
      { name: 'Wireless Keyboard', price: 69.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400' },
      { name: 'Split Ergonomic Keyboard', price: 199.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
      { name: 'Wireless Trackpad', price: 99.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400' },
      { name: 'Numeric Keypad', price: 29.99, category: 'keyboardsAndMice', imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400' },

      // Monitors & Displays
      { name: '4K Monitor', price: 399.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
      { name: 'Ultrawide Monitor', price: 599.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
      { name: 'Portable Monitor', price: 249.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400' },
      { name: 'Gaming Monitor 144Hz', price: 449.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400' },
      { name: 'Curved Monitor', price: 379.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=400' },
      { name: 'Touchscreen Monitor', price: 329.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400' },
      { name: 'Dual Monitor Stand', price: 129.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400' },
      { name: 'Monitor Arm Mount', price: 89.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400' },
      { name: '8K Monitor', price: 1299.99, category: 'monitors', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },

      // Accessories
      { name: 'USB-C Hub', price: 49.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400' },
      { name: 'Laptop Stand', price: 29.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
      { name: 'Webcam HD', price: 89.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400' },
      { name: 'Mouse Pad XL', price: 19.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400' },
      { name: 'Cable Management Kit', price: 14.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
      { name: 'Desk Lamp LED', price: 34.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400' },
      { name: 'Phone Stand', price: 24.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
      { name: 'Ergonomic Cushion', price: 39.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400' },
      { name: 'Document Holder', price: 22.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1544016768-982d1554f0b9?w=400' },
      { name: 'Desk Organizer', price: 27.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400' },
      { name: 'Screen Cleaning Kit', price: 16.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
      { name: 'Anti-Glare Screen Filter', price: 29.99, category: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },

      // Storage
      { name: 'External SSD 1TB', price: 109.99, category: 'storage', imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400' },
      { name: 'External HDD 4TB', price: 89.99, category: 'storage', imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400' },
      { name: 'USB Flash Drive 128GB', price: 24.99, category: 'storage', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
      { name: 'M.2 SSD 1TB', price: 129.99, category: 'storage', imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400' },
      { name: 'NAS Drive 8TB', price: 299.99, category: 'storage', imageUrl: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400' },
      { name: 'MicroSD Card 512GB', price: 69.99, category: 'storage', imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400' },

      // Cables & Adapters
      { name: 'USB-C Cable 6ft', price: 12.99, category: 'cables', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
      { name: 'USB-C to USB-A Adapter', price: 9.99, category: 'cables', imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400' },
      { name: 'Ethernet Cable 25ft', price: 11.99, category: 'cables', imageUrl: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400' },
      { name: 'USB-C Hub 7-in-1', price: 59.99, category: 'cables', imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400' },
      { name: 'Thunderbolt 3 Cable', price: 29.99, category: 'cables', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
      { name: 'HDMI to DisplayPort Adapter', price: 24.99, category: 'cables', imageUrl: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400' },
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

