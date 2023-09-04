-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);
INSERT INTO "new_UserType" ("active", "created_At", "id", "name", "updated_At") SELECT "active", "created_At", "id", "name", "updated_At" FROM "UserType";
DROP TABLE "UserType";
ALTER TABLE "new_UserType" RENAME TO "UserType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
