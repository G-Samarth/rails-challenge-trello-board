ALTER TABLE "Card" ADD COLUMN "title" TEXT;
ALTER TABLE "Card" ADD COLUMN "description" TEXT;

UPDATE "Card" SET "title" = 'Default Title' WHERE "title" IS NULL;
UPDATE "Card" SET "description" = 'Default Description' WHERE "description" IS NULL;
