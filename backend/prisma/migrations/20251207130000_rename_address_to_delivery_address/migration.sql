-- Rename address fields to delivery-prefixed names
ALTER TABLE "User" RENAME COLUMN "address" TO "deliveryAddress";
ALTER TABLE "User" RENAME COLUMN "city" TO "deliveryCity";
ALTER TABLE "User" RENAME COLUMN "postalCode" TO "deliveryPostalCode";
ALTER TABLE "User" RENAME COLUMN "country" TO "deliveryCountry";
