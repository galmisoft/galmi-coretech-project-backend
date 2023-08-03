/*
  Warnings:

  - You are about to drop the `DayPartFluids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `type` on the `Activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN "name" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DayPartFluids";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TerrainType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "terrain_name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER,
    "condition" BOOLEAN,
    "meters_from" INTEGER,
    "drill_bit_change" BOOLEAN,
    "end_condition" BOOLEAN,
    "meters_to" INTEGER,
    "change_motive" INTEGER,
    CONSTRAINT "DayPartProducts_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartProducts" ("change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "meters_from", "meters_to", "product_id") SELECT "change_motive", "condition", "dayPart_id", "drill_bit_change", "end_condition", "id", "meters_from", "meters_to", "product_id" FROM "DayPartProducts";
DROP TABLE "DayPartProducts";
ALTER TABLE "new_DayPartProducts" RENAME TO "DayPartProducts";
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
    "M1" REAL NOT NULL,
    "M2" REAL NOT NULL,
    "M3" REAL NOT NULL,
    "M4" REAL NOT NULL,
    "PH" REAL NOT NULL,
    "PPM" REAL NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "DayPart_probe_id_fkey" FOREIGN KEY ("probe_id") REFERENCES "Probe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPart" ("M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "status", "surplus_meters", "team_id", "updated_At") SELECT "M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "status", "surplus_meters", "team_id", "updated_At" FROM "DayPart";
DROP TABLE "DayPart";
ALTER TABLE "new_DayPart" RENAME TO "DayPart";
CREATE TABLE "new_Activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Activities_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ActivityType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activities" ("active", "created_At", "id", "name", "updated_At") SELECT "active", "created_At", "id", "name", "updated_At" FROM "Activities";
DROP TABLE "Activities";
ALTER TABLE "new_Activities" RENAME TO "Activities";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
