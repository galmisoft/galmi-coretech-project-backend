-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Probe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL DEFAULT '0db41464-e515-4647-90fa-06f477b80379',
    "probe_number" TEXT,
    "date_ini" DATETIME NOT NULL,
    "azimut_ini" INTEGER,
    "incline_ini" INTEGER,
    "job_type" INTEGER,
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
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Probe_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Probe_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Probe" ("azimut_ini", "company_id", "created_At", "date_fin", "date_ini", "finalized", "horometer_fin", "horometer_ini", "id", "incline_ini", "job_type", "labor", "level", "objective_prof", "objective_vein", "platform", "probe_number", "updated_At", "zone") SELECT "azimut_ini", "company_id", "created_At", "date_fin", "date_ini", "finalized", "horometer_fin", "horometer_ini", "id", "incline_ini", "job_type", "labor", "level", "objective_prof", "objective_vein", "platform", "probe_number", "updated_At", "zone" FROM "Probe";
DROP TABLE "Probe";
ALTER TABLE "new_Probe" RENAME TO "Probe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
