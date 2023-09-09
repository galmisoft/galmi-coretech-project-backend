/*
  Warnings:

  - You are about to drop the `CompanyUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CompanyUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CompanyTypeUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "userType_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "CompanyTypeUser_userType_id_fkey" FOREIGN KEY ("userType_id") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CompanyTypeUser_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL DEFAULT 'dd6eb56d-f8f4-4686-80b8-31a41062ea77',
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
INSERT INTO "new_User" ("active", "created_At", "email", "id", "lastname", "names", "password", "reports_to", "status", "updated_At", "user_type", "username") SELECT "active", "created_At", "email", "id", "lastname", "names", "password", "reports_to", "status", "updated_At", "user_type", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
