/*
  Warnings:

  - You are about to drop the column `content` on the `Card` table. All the data in the column will be lost.
  - Made the column `title` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "content",
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
