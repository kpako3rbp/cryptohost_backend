/*
  Warnings:

  - You are about to drop the column `description` on the `NewsPost` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `NewsPost` table. All the data in the column will be lost.
  - Added the required column `body` to the `NewsPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `NewsPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published_at` to the `NewsPost` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "published_at" DATETIME NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "NewsPost_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NewsPost" ("id", "image", "meta_title", "slug", "title", "user_id") SELECT "id", "image", "meta_title", "slug", "title", "user_id" FROM "NewsPost";
DROP TABLE "NewsPost";
ALTER TABLE "new_NewsPost" RENAME TO "NewsPost";
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
