/*
  Warnings:

  - You are about to alter the column `picture` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.
  - You are about to alter the column `picture` on the `Run` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "complete_name" TEXT NOT NULL,
    "lastname1" TEXT,
    "lastname2" TEXT,
    "dni_type" INTEGER NOT NULL DEFAULT 0,
    "dni" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "picture" BLOB,
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
    "picture" BLOB
);
INSERT INTO "new_Run" ("id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3") SELECT "id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3" FROM "Run";
DROP TABLE "Run";
ALTER TABLE "new_Run" RENAME TO "Run";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
