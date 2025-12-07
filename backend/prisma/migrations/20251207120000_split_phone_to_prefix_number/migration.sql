-- AlterTable: Split phone field into phonePrefix and phoneNumber
-- Add new columns
ALTER TABLE "User" ADD COLUMN "phonePrefix" TEXT;
ALTER TABLE "User" ADD COLUMN "phoneNumber" TEXT;

-- Drop the old phone column
ALTER TABLE "User" DROP COLUMN "phone";
