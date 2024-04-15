/*
  Warnings:

  - Added the required column `user_id` to the `NewsCategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_NewsCategory" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "NewsCategory";
DROP TABLE "NewsCategory";
ALTER TABLE "new_NewsCategory" RENAME TO "NewsCategory";
CREATE UNIQUE INDEX "NewsCategory_name_key" ON "NewsCategory"("name");
CREATE UNIQUE INDEX "NewsCategory_slug_key" ON "NewsCategory"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
