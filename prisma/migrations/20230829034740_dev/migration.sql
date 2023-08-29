/*
  Warnings:

  - You are about to drop the column `number_users_admin` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `number_users_leader` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `number_users_perforist` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `number_users_supervisor` on the `Company` table. All the data in the column will be lost.

*/
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
    "division" TEXT NOT NULL,
    "sub_division" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "sub_zone" TEXT NOT NULL,
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
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_type" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "reports_to" TEXT NOT NULL,
    "names" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "status" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "User_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "company_id", "created_At", "email", "id", "lastname", "names", "password", "reports_to", "status", "updated_At", "user_type", "username") SELECT "active", "company_id", "created_At", "email", "id", "lastname", "names", "password", "reports_to", "status", "updated_At", "user_type", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
