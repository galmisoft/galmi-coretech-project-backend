/*
  Warnings:

  - You are about to alter the column `projected_cost_fluids` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `projected_cost_tools` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "projected_cost_tools" REAL NOT NULL,
    "projected_cost_fluids" REAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("active", "client_id", "created_At", "id", "location", "name", "projected_cost_fluids", "projected_cost_tools", "updated_At", "zone") SELECT "active", "client_id", "created_At", "id", "location", "name", "projected_cost_fluids", "projected_cost_tools", "updated_At", "zone" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
