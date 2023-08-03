/*
  Warnings:

  - You are about to drop the column `dni` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dni_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Person` table. All the data in the column will be lost.
  - Added the required column `complete_name` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "user_type" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "reports_to" TEXT NOT NULL,
    "names" TEXT,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "User_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "created_At", "email", "id", "lastname", "reports_to", "updated_At", "user_type", "username") SELECT "active", "created_At", "email", "id", "lastname", "reports_to", "updated_At", "user_type", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "complete_name" TEXT NOT NULL,
    "lastname1" TEXT NOT NULL,
    "lastname2" TEXT NOT NULL,
    "dni_type" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Person_dni_type_fkey" FOREIGN KEY ("dni_type") REFERENCES "DniType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("active", "company_id", "created_At", "dni", "dni_type", "id", "lastname1", "lastname2", "picture", "position_id", "updated_At") SELECT "active", "company_id", "created_At", "dni", "dni_type", "id", "lastname1", "lastname2", "picture", "position_id", "updated_At" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
