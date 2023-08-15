/*
  Warnings:

  - You are about to drop the `Line` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `line_id` on the `Items` table. All the data in the column will be lost.
  - You are about to alter the column `shift` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.
  - You are about to drop the column `line_id` on the `DayPartProducts` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Line";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "line" TEXT,
    "serial_number" TEXT NOT NULL,
    "unit_price" REAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "dayPartProducts_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "DayPartProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("client_id", "created_At", "dayPartProducts_id", "id", "product_id", "project_id", "serial_number", "unit_price", "updated_At") SELECT "client_id", "created_At", "dayPartProducts_id", "id", "product_id", "project_id", "serial_number", "unit_price", "updated_At" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
CREATE TABLE "new_DayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "shift" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "probe_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "meters_from" REAL NOT NULL,
    "meters_to" REAL NOT NULL,
    "surplus_meters" REAL NOT NULL,
    "constant_meters" REAL NOT NULL,
    "M1" REAL,
    "M2" REAL,
    "M3" REAL,
    "M4" REAL,
    "PH" REAL,
    "PPM" REAL,
    "fluid_return" BOOLEAN NOT NULL DEFAULT true,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "DayPart_probe_id_fkey" FOREIGN KEY ("probe_id") REFERENCES "Probe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPart" ("M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "status", "surplus_meters", "team_id", "updated_At") SELECT "M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "status", "surplus_meters", "team_id", "updated_At" FROM "DayPart";
DROP TABLE "DayPart";
ALTER TABLE "new_DayPart" RENAME TO "DayPart";
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "complete_name" TEXT NOT NULL,
    "lastname1" TEXT,
    "lastname2" TEXT,
    "dni_type" INTEGER NOT NULL DEFAULT 0,
    "dni" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "picture" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "company_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Person_dni_type_fkey" FOREIGN KEY ("dni_type") REFERENCES "DniType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("active", "company_id", "complete_name", "created_At", "dni", "dni_type", "id", "lastname1", "lastname2", "picture", "position_id", "updated_At") SELECT "active", "company_id", "complete_name", "created_At", "dni", "dni_type", "id", "lastname1", "lastname2", "picture", "position_id", "updated_At" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE TABLE "new_Probe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "probe_number" TEXT,
    "date_ini" DATETIME NOT NULL,
    "azimut_ini" INTEGER,
    "incline_ini" INTEGER,
    "job_type" TEXT,
    "objective_prof" INTEGER,
    "platform" TEXT,
    "level" TEXT,
    "labor" TEXT,
    "objective_vein" TEXT,
    "zone" TEXT,
    "horometer_ini" INTEGER NOT NULL,
    "horometer_fin" INTEGER NOT NULL,
    "finalized" BOOLEAN NOT NULL,
    "date_fin" DATETIME,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);
INSERT INTO "new_Probe" ("azimut_ini", "created_At", "date_fin", "date_ini", "finalized", "horometer_fin", "horometer_ini", "id", "incline_ini", "job_type", "labor", "level", "objective_prof", "objective_vein", "platform", "probe_number", "updated_At", "zone") SELECT "azimut_ini", "created_At", "date_fin", "date_ini", "finalized", "horometer_fin", "horometer_ini", "id", "incline_ini", "job_type", "labor", "level", "objective_prof", "objective_vein", "platform", "probe_number", "updated_At", "zone" FROM "Probe";
DROP TABLE "Probe";
ALTER TABLE "new_Probe" RENAME TO "Probe";
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "line" TEXT,
    "serial_number" TEXT,
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
INSERT INTO "new_DayPartProducts" ("brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "matrix", "meters_from", "meters_to", "serial_number", "type_id") SELECT "brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "matrix", "meters_from", "meters_to", "serial_number", "type_id" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
