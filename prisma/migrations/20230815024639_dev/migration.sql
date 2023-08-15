/*
  Warnings:

  - You are about to drop the column `serial_number` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "type_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "meassure_id" INTEGER NOT NULL,
    "description" TEXT,
    "brand" TEXT NOT NULL,
    "presentation" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_meassure_id_fkey" FOREIGN KEY ("meassure_id") REFERENCES "Meassure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "name", "presentation", "type_id", "updated_At") SELECT "active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "name", "presentation", "type_id", "updated_At" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
