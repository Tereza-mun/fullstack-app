-- Step 1: Add a temporary JSONB column
ALTER TABLE "Product" ADD COLUMN "name_json" JSONB;

-- Step 2: Convert existing string names to JSON format (using English name as default)
UPDATE "Product" SET "name_json" = jsonb_build_object('en', "name", 'cs', "name");

-- Step 3: Drop the old column
ALTER TABLE "Product" DROP COLUMN "name";

-- Step 4: Rename the new column to 'name'
ALTER TABLE "Product" RENAME COLUMN "name_json" TO "name";

-- Step 5: Add NOT NULL constraint
ALTER TABLE "Product" ALTER COLUMN "name" SET NOT NULL;
