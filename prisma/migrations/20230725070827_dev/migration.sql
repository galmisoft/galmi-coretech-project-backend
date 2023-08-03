/*
  Warnings:

  - You are about to alter the column `cfm` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `preasure` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `rpm` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "mine_code" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "cfm" REAL NOT NULL,
    "rpm" REAL NOT NULL,
    "preasure" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Equipment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipment" ("brand", "cfm", "client_id", "created_At", "id", "internal_code", "mine_code", "name", "preasure", "rpm", "status", "updated_At") SELECT "brand", "cfm", "client_id", "created_At", "id", "internal_code", "mine_code", "name", "preasure", "rpm", "status", "updated_At" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
