/*
  Warnings:

  - You are about to drop the column `lastname` on the `Person` table. All the data in the column will be lost.
  - Added the required column `active` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname1` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname2` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "meassure_id" INTEGER NOT NULL,
    "description" TEXT,
    "brand" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "serial_number" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_type_fkey" FOREIGN KEY ("type") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_meassure_id_fkey" FOREIGN KEY ("meassure_id") REFERENCES "Meassure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("SKU", "active", "brand", "company_id", "created_At", "id", "line_id", "meassure_id", "name", "serial_number", "type", "updated_At") SELECT "SKU", "active", "brand", "company_id", "created_At", "id", "line_id", "meassure_id", "name", "serial_number", "type", "updated_At" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lastname1" TEXT NOT NULL,
    "lastname2" TEXT NOT NULL,
    "dni_type" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Person_dni_type_fkey" FOREIGN KEY ("dni_type") REFERENCES "DniType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("created_At", "dni", "dni_type", "id", "position_id", "updated_At") SELECT "created_At", "dni", "dni_type", "id", "position_id", "updated_At" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
