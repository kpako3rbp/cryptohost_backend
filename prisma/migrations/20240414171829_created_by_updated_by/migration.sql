-- CreateTable
CREATE TABLE "CryptoActivity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT '718f20f2-89eb-495a-bdbf-d8e17f23dd39',
    "published_at" DATETIME NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "updated_by" TEXT NOT NULL DEFAULT '',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT '718f20f2-89eb-495a-bdbf-d8e17f23dd39',
    "published_at" DATETIME NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "updated_by" TEXT NOT NULL DEFAULT '',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "NewsPost_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NewsPost" ("body", "category_id", "created_at", "deleted", "id", "image", "meta_title", "published_at", "slug", "title", "updated", "updated_at", "views") SELECT "body", "category_id", "created_at", "deleted", "id", "image", "meta_title", "published_at", "slug", "title", "updated", "updated_at", "views" FROM "NewsPost";
DROP TABLE "NewsPost";
ALTER TABLE "new_NewsPost" RENAME TO "NewsPost";
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");
CREATE TABLE "new_PromoBanner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT '718f20f2-89eb-495a-bdbf-d8e17f23dd39',
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "updated_by" TEXT NOT NULL DEFAULT '',
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PromoBanner" ("created_at", "deleted", "description", "id", "image", "meta_title", "title", "updated", "updated_at", "url") SELECT "created_at", "deleted", "description", "id", "image", "meta_title", "title", "updated", "updated_at", "url" FROM "PromoBanner";
DROP TABLE "PromoBanner";
ALTER TABLE "new_PromoBanner" RENAME TO "PromoBanner";
CREATE TABLE "new_NewsCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL,
    "created_by" TEXT NOT NULL DEFAULT '718f20f2-89eb-495a-bdbf-d8e17f23dd39',
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "updated_by" TEXT NOT NULL DEFAULT '',
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_NewsCategory" ("created_at", "deleted", "id", "name", "slug", "updated", "updated_at") SELECT "created_at", "deleted", "id", "name", "slug", "updated", "updated_at" FROM "NewsCategory";
DROP TABLE "NewsCategory";
ALTER TABLE "new_NewsCategory" RENAME TO "NewsCategory";
CREATE UNIQUE INDEX "NewsCategory_name_key" ON "NewsCategory"("name");
CREATE UNIQUE INDEX "NewsCategory_slug_key" ON "NewsCategory"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "CryptoActivity_slug_key" ON "CryptoActivity"("slug");
