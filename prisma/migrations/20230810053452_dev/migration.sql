/*
  Warnings:

  - You are about to alter the column `picture` on the `Run` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
CREATE TABLE "new_email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mail_type" INTEGER NOT NULL,
    "mail_to" TEXT NOT NULL,
    "CC" TEXT,
    "CCO" TEXT,
    "active" BOOLEAN NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "email_mail_type_fkey" FOREIGN KEY ("mail_type") REFERENCES "mailType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "email_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_email" ("CC", "CCO", "active", "company_id", "created_At", "id", "mail_to", "mail_type", "updated_At") SELECT "CC", "CCO", "active", "company_id", "created_At", "id", "mail_to", "mail_type", "updated_At" FROM "email";
DROP TABLE "email";
ALTER TABLE "new_email" RENAME TO "email";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "User_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "created_At", "email", "id", "lastname", "names", "password", "reports_to", "updated_At", "user_type", "username") SELECT "active", "created_At", "email", "id", "lastname", "names", "password", "reports_to", "updated_At", "user_type", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
