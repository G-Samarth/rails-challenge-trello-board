/*
  Warnings:

  - Made the column `position` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "position" SET NOT NULL;
