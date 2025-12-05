-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryMethod" TEXT NOT NULL DEFAULT 'delivery',
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'cash';
