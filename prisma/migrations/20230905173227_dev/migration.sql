-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meters_from" INTEGER NOT NULL,
    "meters_to" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "recuperation_percentage" INTEGER,
    "terrain_type1" INTEGER NOT NULL DEFAULT 0,
    "terrain_type2" INTEGER NOT NULL DEFAULT 0,
    "terrain_type3" INTEGER NOT NULL DEFAULT 0,
    "observation" TEXT,
    "picture" BLOB,
    CONSTRAINT "Run_terrain_type1_fkey" FOREIGN KEY ("terrain_type1") REFERENCES "TerrainType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Run_terrain_type2_fkey" FOREIGN KEY ("terrain_type2") REFERENCES "TerrainType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Run_terrain_type3_fkey" FOREIGN KEY ("terrain_type3") REFERENCES "TerrainType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Run" ("id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", "terrain_type1", "terrain_type2", "terrain_type3") SELECT "id", "length", "meters_from", "meters_to", "observation", "picture", "recuperation_percentage", coalesce("terrain_type1", 0) AS "terrain_type1", coalesce("terrain_type2", 0) AS "terrain_type2", coalesce("terrain_type3", 0) AS "terrain_type3" FROM "Run";
DROP TABLE "Run";
ALTER TABLE "new_Run" RENAME TO "Run";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
