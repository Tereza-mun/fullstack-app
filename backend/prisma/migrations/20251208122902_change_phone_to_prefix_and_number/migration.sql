/*
  Warnings:

  - You are about to drop the column `phone` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "phone",
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "phonePrefix" TEXT;
