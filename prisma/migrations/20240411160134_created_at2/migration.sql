-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_NewsCategory" ("created_at", "deleted", "id", "name", "slug", "updated", "updated_at", "user_id") SELECT "created_at", "deleted", "id", "name", "slug", "updated", "updated_at", "user_id" FROM "NewsCategory";
DROP TABLE "NewsCategory";
ALTER TABLE "new_NewsCategory" RENAME TO "NewsCategory";
CREATE UNIQUE INDEX "NewsCategory_name_key" ON "NewsCategory"("name");
CREATE UNIQUE INDEX "NewsCategory_slug_key" ON "NewsCategory"("slug");
CREATE TABLE "new_NewsPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "published_at" DATETIME NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "NewsPost_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NewsPost" ("body", "category_id", "created_at", "deleted", "id", "image", "meta_title", "published_at", "slug", "title", "updated", "updated_at", "user_id") SELECT "body", "category_id", "created_at", "deleted", "id", "image", "meta_title", "published_at", "slug", "title", "updated", "updated_at", "user_id" FROM "NewsPost";
DROP TABLE "NewsPost";
ALTER TABLE "new_NewsPost" RENAME TO "NewsPost";
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");
CREATE TABLE "new_PromoBanner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PromoBanner" ("created_at", "deleted", "description", "id", "image", "meta_title", "slug", "title", "updated", "updated_at", "url", "user_id") SELECT "created_at", "deleted", "description", "id", "image", "meta_title", "slug", "title", "updated", "updated_at", "url", "user_id" FROM "PromoBanner";
DROP TABLE "PromoBanner";
ALTER TABLE "new_PromoBanner" RENAME TO "PromoBanner";
CREATE UNIQUE INDEX "PromoBanner_slug_key" ON "PromoBanner"("slug");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "email", "id", "login", "password") SELECT "created_at", "email", "id", "login", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
