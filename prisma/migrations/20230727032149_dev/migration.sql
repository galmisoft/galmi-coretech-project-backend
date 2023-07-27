/*
  Warnings:

  - Added the required column `company_id` to the `email` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mail_type" INTEGER NOT NULL,
    "mail_to" TEXT NOT NULL,
    "CC" TEXT NOT NULL,
    "CCO" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "email_mail_type_fkey" FOREIGN KEY ("mail_type") REFERENCES "mailType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "email_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_email" ("CC", "CCO", "active", "created_At", "id", "mail_to", "mail_type", "updated_At") SELECT "CC", "CCO", "active", "created_At", "id", "mail_to", "mail_type", "updated_At" FROM "email";
DROP TABLE "email";
ALTER TABLE "new_email" RENAME TO "email";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
