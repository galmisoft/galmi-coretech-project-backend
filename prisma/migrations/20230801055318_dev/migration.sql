/*
  Warnings:

  - Added the required column `name` to the `DayPartProducts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT,
    "location" TEXT,
    "projected_cost_tools" REAL,
    "projected_cost_fluids" REAL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("active", "client_id", "created_At", "id", "location", "name", "projected_cost_fluids", "projected_cost_tools", "updated_At", "zone") SELECT "active", "client_id", "created_At", "id", "location", "name", "projected_cost_fluids", "projected_cost_tools", "updated_At", "zone" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Probe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date_ini" DATETIME NOT NULL,
    "azimut_ini" INTEGER,
    "incline_ini" INTEGER,
    "job_type" BOOLEAN NOT NULL,
    "objective_prof" INTEGER,
    "platform" TEXT,
    "level" INTEGER,
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
INSERT INTO "new_Probe" ("azimut_ini", "created_At", "date_fin", "date_ini", "finalized", "horometer_fin", "horometer_ini", "id", "incline_ini", "job_type", "labor", "level", "objective_prof", "objective_vein", "platform", "updated_At", "zone") SELECT "azimut_ini", "created_At", "date_fin", "date_ini", "finalized", "horometer_fin", "horometer_ini", "id", "incline_ini", "job_type", "labor", "level", "objective_prof", "objective_vein", "platform", "updated_At", "zone" FROM "Probe";
DROP TABLE "Probe";
ALTER TABLE "new_Probe" RENAME TO "Probe";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "meassure_id" INTEGER NOT NULL,
    "description" TEXT,
    "brand" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "presentation" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_meassure_id_fkey" FOREIGN KEY ("meassure_id") REFERENCES "Meassure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "presentation", "serial_number", "type_id", "updated_At") SELECT "active", "brand", "company_id", "created_At", "description", "id", "meassure_id", "presentation", "serial_number", "type_id", "updated_At" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER,
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
INSERT INTO "new_DayPartProducts" ("brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line_id", "matrix", "meters_from", "meters_to", "quantity", "serial_number", "type_id") SELECT "brand", "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "line_id", "matrix", "meters_from", "meters_to", "quantity", "serial_number", "type_id" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
CREATE TABLE "new_Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "mine_code" TEXT NOT NULL,
    "brand" TEXT,
    "cfm" REAL,
    "rpm" REAL,
    "preasure" REAL,
    "status" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Equipment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipment" ("brand", "cfm", "client_id", "created_At", "id", "internal_code", "mine_code", "name", "preasure", "rpm", "status", "updated_At") SELECT "brand", "cfm", "client_id", "created_At", "id", "internal_code", "mine_code", "name", "preasure", "rpm", "status", "updated_At" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
CREATE TABLE "new_Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meters_from" INTEGER NOT NULL,
    "meters_to" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "recuperation_percentage" INTEGER,
    "terrain_type1" INTEGER NOT NULL,
    "terrain_type2" INTEGER,
    "terrain_type3" INTEGER,
    "observation" TEXT,
    "picture" TEXT
);
INSERT INTO "new_Run" ("id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3") SELECT "id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3" FROM "Run";
DROP TABLE "Run";
ALTER TABLE "new_Run" RENAME TO "Run";
CREATE TABLE "new_DayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "shift" BOOLEAN NOT NULL,
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
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "DayPart_probe_id_fkey" FOREIGN KEY ("probe_id") REFERENCES "Probe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPart" ("M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "status", "surplus_meters", "team_id", "updated_At") SELECT "M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "status", "surplus_meters", "team_id", "updated_At" FROM "DayPart";
DROP TABLE "DayPart";
ALTER TABLE "new_DayPart" RENAME TO "DayPart";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "user_type" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "reports_to" TEXT NOT NULL,
    "names" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "User_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "created_At", "email", "id", "lastname", "names", "reports_to", "updated_At", "user_type", "username") SELECT "active", "created_At", "email", "id", "lastname", "names", "reports_to", "updated_At", "user_type", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
