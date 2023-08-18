/*
  Warnings:

  - You are about to drop the `ItemDayPartProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN "serial_number_dayPartProduct" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemDayPartProduct";
PRAGMA foreign_keys=on;
