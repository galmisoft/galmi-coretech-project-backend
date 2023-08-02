-- CreateTable
CREATE TABLE "DayPartPerson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    CONSTRAINT "DayPartPerson_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartPerson_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "complete_name" TEXT NOT NULL,
    "lastname1" TEXT NOT NULL,
    "lastname2" TEXT NOT NULL,
    "dni_type" INTEGER NOT NULL DEFAULT 0,
    "dni" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "company_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Person_dni_type_fkey" FOREIGN KEY ("dni_type") REFERENCES "DniType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("active", "company_id", "complete_name", "created_At", "dni", "dni_type", "id", "lastname1", "lastname2", "picture", "position_id", "updated_At") SELECT "active", "company_id", "complete_name", "created_At", "dni", "dni_type", "id", "lastname1", "lastname2", "picture", "position_id", "updated_At" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
