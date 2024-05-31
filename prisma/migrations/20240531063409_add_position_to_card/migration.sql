-- Add the `position` column with a default value of 0
ALTER TABLE "Card" ADD COLUMN "position" INTEGER DEFAULT 0;

-- Update existing rows to set the `position` column based on row number
DO $$
DECLARE
  rec RECORD;
  counter INTEGER := 0;
BEGIN
  FOR rec IN SELECT id FROM "Card" ORDER BY id -- assuming id is sequential
  LOOP
    UPDATE "Card"
    SET "position" = counter
    WHERE "id" = rec.id;
    counter := counter + 1;
  END LOOP;
END $$;

-- Remove the default value constraint if desired
ALTER TABLE "Card" ALTER COLUMN "position" DROP DEFAULT;
