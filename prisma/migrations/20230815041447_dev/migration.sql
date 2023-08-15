/*
  Warnings:

  - You are about to drop the column `dayPartProducts_id` on the `Items` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ItemDayPartProduct" (
    "itemId" TEXT NOT NULL,
    "dayPartProductId" TEXT NOT NULL,

    PRIMARY KEY ("itemId", "dayPartProductId"),
    CONSTRAINT "ItemDayPartProduct_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemDayPartProduct_dayPartProductId_fkey" FOREIGN KEY ("dayPartProductId") REFERENCES "DayPartProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "serial_number" TEXT NOT NULL,
    "unit_price" REAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("client_id", "created_At", "id", "line_id", "product_id", "project_id", "serial_number", "unit_price", "updated_At") SELECT "client_id", "created_At", "id", "line_id", "product_id", "project_id", "serial_number", "unit_price", "updated_At" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
