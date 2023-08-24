/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `permission_id` on the `UserPermission` table. All the data in the column will be lost.
  - Added the required column `active` to the `UserPermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `UserPermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Permission";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPermission" (
    "user_permission_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "module_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "UserPermission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPermission_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Modules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserPermission" ("user_id", "user_permission_id") SELECT "user_id", "user_permission_id" FROM "UserPermission";
DROP TABLE "UserPermission";
ALTER TABLE "new_UserPermission" RENAME TO "UserPermission";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
