-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL DEFAULT 0,
    "company_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Activities_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ActivityType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Activities_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activities" ("active", "company_id", "created_At", "id", "name", "type_id", "updated_At") SELECT "active", "company_id", "created_At", "id", "name", "type_id", "updated_At" FROM "Activities";
DROP TABLE "Activities";
ALTER TABLE "new_Activities" RENAME TO "Activities";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
