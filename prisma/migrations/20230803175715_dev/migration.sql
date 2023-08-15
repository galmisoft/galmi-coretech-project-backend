/*
  Warnings:

  - You are about to drop the column `name` on the `DayPartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `DayPartProducts` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "DayPartFluids" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "fluid_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "DayPartFluids_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartFluids_fluid_id_fkey" FOREIGN KEY ("fluid_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "line_id" INTEGER NOT NULL DEFAULT 0,
    "serial_number" TEXT,
    "brand" TEXT,
    "matrix" TEXT,
    "condition" BOOLEAN,
    "meters_from" INTEGER,
    "drill_bit_change" BOOLEAN,
    "end_condition" BOOLEAN,
    "meters_to" INTEGER,
    "change_motive" INTEGER,
    CONSTRAINT "DayPartProducts_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartProducts" ("brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line_id", "matrix", "meters_from", "meters_to", "serial_number", "type_id") SELECT "brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line_id", "matrix", "meters_from", "meters_to", "serial_number", "type_id" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
