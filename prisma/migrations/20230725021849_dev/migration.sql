/*
  Warnings:

  - You are about to drop the column `dayPartFluids_id` on the `DayPartFluids` table. All the data in the column will be lost.
  - You are about to drop the column `dayPartId` on the `DayPartFluids` table. All the data in the column will be lost.
  - Added the required column `status` to the `DayPart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayPartProducts_id` to the `DayPartFluids` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "shift" BOOLEAN NOT NULL,
    "status" INTEGER NOT NULL,
    "probe_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "meters_from" INTEGER NOT NULL,
    "meters_to" INTEGER NOT NULL,
    "surplus_meters" INTEGER NOT NULL,
    "constant_meters" INTEGER NOT NULL,
    "M1" INTEGER NOT NULL,
    "M2" INTEGER NOT NULL,
    "M3" INTEGER NOT NULL,
    "M4" INTEGER NOT NULL,
    "PH" INTEGER NOT NULL,
    "PPM" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "DayPart_probe_id_fkey" FOREIGN KEY ("probe_id") REFERENCES "Probe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPart" ("M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "surplus_meters", "team_id", "updated_At") SELECT "M1", "M2", "M3", "M4", "PH", "PPM", "constant_meters", "created_At", "date", "id", "meters_from", "meters_to", "probe_id", "shift", "surplus_meters", "team_id", "updated_At" FROM "DayPart";
DROP TABLE "DayPart";
ALTER TABLE "new_DayPart" RENAME TO "DayPart";
CREATE TABLE "new_DayPartFluids" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPartProducts_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "DayPartFluids_dayPartProducts_id_fkey" FOREIGN KEY ("dayPartProducts_id") REFERENCES "DayPartProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartFluids" ("id", "quantity") SELECT "id", "quantity" FROM "DayPartFluids";
DROP TABLE "DayPartFluids";
ALTER TABLE "new_DayPartFluids" RENAME TO "DayPartFluids";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
