/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RolePermission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserRole";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserPermission" (
    "user_permission_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    CONSTRAINT "UserPermission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
