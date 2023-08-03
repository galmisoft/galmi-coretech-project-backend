/*
  Warnings:

  - You are about to drop the `dayPartActivities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `M1` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `M2` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `M3` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `M4` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `PH` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `PPM` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `constant_meters` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `meters_from` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `meters_to` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `surplus_meters` on the `DayPart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "dayPartActivities";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DayPartActivities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    CONSTRAINT "DayPartActivities_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartActivities_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_testAndMeassurements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "activityDayPart_id" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "azimut" INTEGER NOT NULL,
    "inclination" INTEGER NOT NULL,
    "supervisor_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "magnetic_intensity" INTEGER NOT NULL,
    "efective" BOOLEAN NOT NULL,
    CONSTRAINT "testAndMeassurements_activityDayPart_id_fkey" FOREIGN KEY ("activityDayPart_id") REFERENCES "DayPartActivities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_testAndMeassurements" ("activityDayPart_id", "azimut", "company_name", "depth", "efective", "id", "inclination", "magnetic_intensity", "supervisor_name") SELECT "activityDayPart_id", "azimut", "company_name", "depth", "efective", "id", "inclination", "magnetic_intensity", "supervisor_name" FROM "testAndMeassurements";
DROP TABLE "testAndMeassurements";
ALTER TABLE "new_testAndMeassurements" RENAME TO "testAndMeassurements";
CREATE TABLE "new_DayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "shift" BOOLEAN NOT NULL,
    "status" INTEGER NOT NULL,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
