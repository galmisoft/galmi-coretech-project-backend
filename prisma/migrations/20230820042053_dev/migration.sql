/*
  Warnings:

  - You are about to alter the column `drill_bit_change` on the `DayPartProducts` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.
  - You are about to alter the column `end_condition` on the `DayPartProducts` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "line" TEXT,
    "brand" TEXT,
    "matrix" TEXT,
    "condition" INTEGER,
    "meters_from" INTEGER,
    "drill_bit_change" INTEGER,
    "end_condition" INTEGER,
    "meters_to" INTEGER,
    "change_motive" INTEGER DEFAULT 1,
    CONSTRAINT "DayPartProducts_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartProducts" ("brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line", "matrix", "meters_from", "meters_to", "serial_number", "type_id") SELECT "brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line", "matrix", "meters_from", "meters_to", "serial_number", "type_id" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
