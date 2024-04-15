/*
  Warnings:

  - You are about to drop the column `slug` on the `PromoBanner` table. All the data in the column will be lost.
  - Made the column `url` on table `PromoBanner` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PromoBanner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PromoBanner" ("created_at", "deleted", "description", "id", "image", "meta_title", "title", "updated", "updated_at", "url", "user_id") SELECT "created_at", "deleted", "description", "id", "image", "meta_title", "title", "updated", "updated_at", "url", "user_id" FROM "PromoBanner";
DROP TABLE "PromoBanner";
ALTER TABLE "new_PromoBanner" RENAME TO "PromoBanner";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
