-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "shift" INTEGER NOT NULL DEFAULT 1,
    "status" INTEGER NOT NULL DEFAULT 1,
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
    "signature" BLOB,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "DayPart_probe_id_fkey" FOREIGN KEY ("probe_id") REFERENCES "Probe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPart" ("M1", "M2", "M3", "M4", "PH", "PPM", "company_id", "constant_meters", "created_At", "date", "fluid_return", "id", "meters_from", "meters_to", "probe_id", "shift", "signature", "status", "surplus_meters", "team_id", "updated_At") SELECT "M1", "M2", "M3", "M4", "PH", "PPM", "company_id", "constant_meters", "created_At", "date", "fluid_return", "id", "meters_from", "meters_to", "probe_id", "shift", "signature", "status", "surplus_meters", "team_id", "updated_At" FROM "DayPart";
DROP TABLE "DayPart";
ALTER TABLE "new_DayPart" RENAME TO "DayPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
