/*
  Warnings:

  - You are about to drop the column `activityDayPart_id` on the `testAndMeassurements` table. All the data in the column will be lost.
  - You are about to drop the column `SKU` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `line_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `dayPartActivities_id` to the `testAndMeassurements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `DayPartProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line_id` to the `DayPartProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matrix` to the `DayPartProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial_number` to the `DayPartProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayPartProducts_id` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentation` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_testAndMeassurements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPartActivities_id" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "azimut" INTEGER NOT NULL,
    "inclination" INTEGER NOT NULL,
    "supervisor_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "magnetic_intensity" INTEGER NOT NULL,
    "efective" BOOLEAN NOT NULL,
    CONSTRAINT "testAndMeassurements_dayPartActivities_id_fkey" FOREIGN KEY ("dayPartActivities_id") REFERENCES "DayPartActivities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_testAndMeassurements" ("azimut", "company_name", "depth", "efective", "id", "inclination", "magnetic_intensity", "supervisor_name") SELECT "azimut", "company_name", "depth", "efective", "id", "inclination", "magnetic_intensity", "supervisor_name" FROM "testAndMeassurements";
DROP TABLE "testAndMeassurements";
ALTER TABLE "new_testAndMeassurements" RENAME TO "testAndMeassurements";
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "serial_number" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "matrix" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER,
    "condition" BOOLEAN,
    "meters_from" INTEGER,
    "drill_bit_change" BOOLEAN,
    "end_condition" BOOLEAN,
    "meters_to" INTEGER,
    "change_motive" INTEGER,
    CONSTRAINT "DayPartProducts_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartProducts" ("change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "meters_from", "meters_to", "product_id", "quantity") SELECT "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "meters_from", "meters_to", "product_id", "quantity" FROM "DayPartProducts";
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
    "dayPartProducts_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "DayPartProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("client_id", "created_At", "id", "line_id", "product_id", "project_id", "serial_number", "unit_price", "updated_At") SELECT "client_id", "created_At", "id", "line_id", "product_id", "project_id", "serial_number", "unit_price", "updated_At" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "meassure_id" INTEGER NOT NULL,
    "description" TEXT,
    "brand" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_type_fkey" FOREIGN KEY ("type") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_meassure_id_fkey" FOREIGN KEY ("meassure_id") REFERENCES "Meassure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "serial_number", "type", "updated_At") SELECT "active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "serial_number", "type", "updated_At" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
