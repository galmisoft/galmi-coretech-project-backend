/*
  Warnings:

  - You are about to drop the column `product_id` on the `DayPartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `DayPartProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
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
    "quantity" INTEGER,
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
INSERT INTO "new_DayPartProducts" ("brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line_id", "matrix", "meters_from", "meters_to", "quantity", "serial_number") SELECT "brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line_id", "matrix", "meters_from", "meters_to", "quantity", "serial_number" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "meassure_id" INTEGER NOT NULL,
    "description" TEXT,
    "brand" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_meassure_id_fkey" FOREIGN KEY ("meassure_id") REFERENCES "Meassure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "presentation", "serial_number", "updated_At") SELECT "active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "presentation", "serial_number", "updated_At" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
