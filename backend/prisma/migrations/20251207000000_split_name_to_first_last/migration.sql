-- AlterTable for User: Add new columns, migrate data, drop old column
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;

-- Split existing name field in User table
UPDATE "User"
SET "firstName" = SPLIT_PART("name", ' ', 1),
    "lastName" = CASE
        WHEN POSITION(' ' IN "name") > 0 THEN SUBSTRING("name" FROM POSITION(' ' IN "name") + 1)
        ELSE ''
    END
WHERE "name" IS NOT NULL;

-- Make fields required after migration
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;

-- Drop old name column from User
ALTER TABLE "User" DROP COLUMN "name";

-- AlterTable for Order: Add new columns, migrate data, drop old column
ALTER TABLE "Order" ADD COLUMN "firstName" TEXT;
ALTER TABLE "Order" ADD COLUMN "lastName" TEXT;

-- Split existing customerName field in Order table
UPDATE "Order"
SET "firstName" = SPLIT_PART("customerName", ' ', 1),
    "lastName" = CASE
        WHEN POSITION(' ' IN "customerName") > 0 THEN SUBSTRING("customerName" FROM POSITION(' ' IN "customerName") + 1)
        ELSE ''
    END
WHERE "customerName" IS NOT NULL;

-- Make fields required after migration
ALTER TABLE "Order" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "Order" ALTER COLUMN "lastName" SET NOT NULL;

-- Drop old customerName column from Order
ALTER TABLE "Order" DROP COLUMN "customerName";
