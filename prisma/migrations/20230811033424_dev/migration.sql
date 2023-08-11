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
    "picture" TEXT
);
INSERT INTO "new_Run" ("id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3") SELECT "id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3" FROM "Run";
DROP TABLE "Run";
ALTER TABLE "new_Run" RENAME TO "Run";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
