-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
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
