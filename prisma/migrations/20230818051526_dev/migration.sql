/*
  Warnings:

  - You are about to drop the column `serial_number` on the `DayPartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `serial_number_dayPartProduct` on the `Items` table. All the data in the column will be lost.
  - The required column `dayPartProduct_id` was added to the `Items` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "line" TEXT,
    "brand" TEXT,
    "matrix" TEXT,
    "condition" BOOLEAN,
    "meters_from" INTEGER,
    "drill_bit_change" BOOLEAN,
    "end_condition" BOOLEAN,
    "meters_to" INTEGER,
    "change_motive" INTEGER DEFAULT 0,
    CONSTRAINT "DayPartProducts_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartProducts" ("brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line", "matrix", "meters_from", "meters_to", "type_id") SELECT "brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line", "matrix", "meters_from", "meters_to", "type_id" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
CREATE TABLE "new_Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "serial_number" TEXT NOT NULL,
    "unit_price" REAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "dayPartProduct_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_dayPartProduct_id_fkey" FOREIGN KEY ("dayPartProduct_id") REFERENCES "DayPartProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("client_id", "created_At", "id", "line_id", "product_id", "project_id", "serial_number", "unit_price", "updated_At") SELECT "client_id", "created_At", "id", "line_id", "product_id", "project_id", "serial_number", "unit_price", "updated_At" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
