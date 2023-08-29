-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "visible_name" TEXT NOT NULL,
    "visible_icon" BLOB,
    "visible_logo1" BLOB,
    "visible_logo2" BLOB,
    "country_id" INTEGER NOT NULL,
    "division" TEXT,
    "sub_division" TEXT,
    "zone" TEXT,
    "sub_zone" TEXT,
    "canAddFluids" BOOLEAN NOT NULL,
    "canAddSteel" BOOLEAN NOT NULL,
    "canAddActivities" BOOLEAN NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Company_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("active", "canAddActivities", "canAddFluids", "canAddSteel", "contact_email", "contact_name", "contact_phone", "country_id", "created_At", "division", "id", "name", "sub_division", "sub_zone", "updated_At", "visible_icon", "visible_logo1", "visible_logo2", "visible_name", "zone") SELECT "active", "canAddActivities", "canAddFluids", "canAddSteel", "contact_email", "contact_name", "contact_phone", "country_id", "created_At", "division", "id", "name", "sub_division", "sub_zone", "updated_At", "visible_icon", "visible_logo1", "visible_logo2", "visible_name", "zone" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
