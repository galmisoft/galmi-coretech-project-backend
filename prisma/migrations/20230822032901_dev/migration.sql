-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DayPartActivities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "hours" INTEGER,
    CONSTRAINT "DayPartActivities_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartActivities_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayPartActivities" ("activity_id", "dayPart_id", "hours", "id") SELECT "activity_id", "dayPart_id", "hours", "id" FROM "DayPartActivities";
DROP TABLE "DayPartActivities";
ALTER TABLE "new_DayPartActivities" RENAME TO "DayPartActivities";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
