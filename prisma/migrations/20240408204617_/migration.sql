/*
  Warnings:

  - Added the required column `user_id` to the `PromoBanner` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PromoBanner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT
);
INSERT INTO "new_PromoBanner" ("description", "id", "image", "meta_title", "slug", "title", "url") SELECT "description", "id", "image", "meta_title", "slug", "title", "url" FROM "PromoBanner";
DROP TABLE "PromoBanner";
ALTER TABLE "new_PromoBanner" RENAME TO "PromoBanner";
CREATE UNIQUE INDEX "PromoBanner_slug_key" ON "PromoBanner"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
