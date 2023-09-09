-- RedefineTables
PRAGMA foreign_keys=OFF;
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
