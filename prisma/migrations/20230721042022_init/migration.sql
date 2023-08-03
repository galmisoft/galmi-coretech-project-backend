/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `active` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni_type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reports_to` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_At` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Modules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comercial_name" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Client_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "projected_cost_tools" TEXT NOT NULL,
    "projected_cost_fluids" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "visible_name" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "division" TEXT NOT NULL,
    "sub_division" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "sub_zone" TEXT NOT NULL,
    "canAddFluids" BOOLEAN NOT NULL,
    "canAddSteel" BOOLEAN NOT NULL,
    "canAddActivities" BOOLEAN NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "number_users_admin" INTEGER NOT NULL,
    "number_users_supervisor" INTEGER NOT NULL,
    "number_users_leader" INTEGER NOT NULL,
    "number_users_perforist" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Company_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyModules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "CompanyModules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Modules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CompanyModules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanydayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "dayPart_id" TEXT NOT NULL,
    CONSTRAINT "CompanydayPart_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CompanydayPart_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    CONSTRAINT "CompanyProject_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CompanyProject_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "mine_code" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "cfm" TEXT NOT NULL,
    "rpm" TEXT NOT NULL,
    "preasure" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Equipment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Assignation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignation_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DniType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastname" TEXT NOT NULL,
    "dni_type" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Person_dni_type_fkey" FOREIGN KEY ("dni_type") REFERENCES "DniType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Person_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mailType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mail_type" INTEGER NOT NULL,
    "mail_to" TEXT NOT NULL,
    "CC" TEXT NOT NULL,
    "CCO" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "email_mail_type_fkey" FOREIGN KEY ("mail_type") REFERENCES "mailType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    CONSTRAINT "CompanyUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CompanyUser_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_role_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    CONSTRAINT "TeamUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamUser_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "modifiable" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "role_permission_id" TEXT NOT NULL PRIMARY KEY,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    CONSTRAINT "RolePermission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RolePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "module_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Permission_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Modules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "dayPartActivities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    CONSTRAINT "dayPartActivities_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dayPartActivities_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "testAndMeassurements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "activityDayPart_id" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "azimut" INTEGER NOT NULL,
    "inclination" INTEGER NOT NULL,
    "supervisor_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "magnetic_intensity" INTEGER NOT NULL,
    "efective" BOOLEAN NOT NULL,
    CONSTRAINT "testAndMeassurements_activityDayPart_id_fkey" FOREIGN KEY ("activityDayPart_id") REFERENCES "dayPartActivities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meters_from" INTEGER NOT NULL,
    "meters_to" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "recuperation_percentage" INTEGER NOT NULL,
    "terrain_type1" INTEGER NOT NULL,
    "terrain_type2" INTEGER NOT NULL,
    "terrain_type3" INTEGER NOT NULL,
    "observation" TEXT NOT NULL,
    "picture" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Line" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "serial_number" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Product_type_fkey" FOREIGN KEY ("type") REFERENCES "ProductType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "line_id" INTEGER NOT NULL,
    "serial_number" TEXT NOT NULL,
    "unit_price" REAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Probe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date_ini" DATETIME NOT NULL,
    "date_fin" DATETIME NOT NULL,
    "job_type" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL,
    "labor" TEXT NOT NULL,
    "objective_vein" TEXT NOT NULL,
    "objective_prof" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "azimut_ini" INTEGER NOT NULL,
    "incline_ini" INTEGER NOT NULL,
    "horometer_ini" INTEGER NOT NULL,
    "horometer_fin" INTEGER NOT NULL,
    "finalized" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DayPart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "shift" BOOLEAN NOT NULL,
    "probe_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "meters_from" INTEGER NOT NULL,
    "meters_to" INTEGER NOT NULL,
    "surplus_meters" INTEGER NOT NULL,
    "constant_meters" INTEGER NOT NULL,
    "M1" INTEGER NOT NULL,
    "M2" INTEGER NOT NULL,
    "M3" INTEGER NOT NULL,
    "M4" INTEGER NOT NULL,
    "PH" INTEGER NOT NULL,
    "PPM" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "DayPart_probe_id_fkey" FOREIGN KEY ("probe_id") REFERENCES "Probe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPart_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayPartRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "run_id" TEXT NOT NULL,
    CONSTRAINT "DayPartRun_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartRun_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayPartProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "condition" BOOLEAN NOT NULL,
    "meters_from" INTEGER NOT NULL,
    "drill_bit_change" BOOLEAN NOT NULL,
    "end_condition" BOOLEAN NOT NULL,
    "meters_to" INTEGER NOT NULL,
    "change_motive" INTEGER NOT NULL,
    CONSTRAINT "DayPartProducts_dayPart_id_fkey" FOREIGN KEY ("dayPart_id") REFERENCES "DayPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayPartFluids" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayPartFluids_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dayPartId" TEXT,
    CONSTRAINT "DayPartFluids_dayPartFluids_id_fkey" FOREIGN KEY ("dayPartFluids_id") REFERENCES "DayPartProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayPartFluids_dayPartId_fkey" FOREIGN KEY ("dayPartId") REFERENCES "DayPart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dni_type" INTEGER NOT NULL,
    "dni" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_type" INTEGER NOT NULL,
    "reports_to" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo_code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL,
    CONSTRAINT "User_dni_type_fkey" FOREIGN KEY ("dni_type") REFERENCES "DniType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
