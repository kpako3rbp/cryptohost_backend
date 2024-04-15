-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "NewsPost_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NewsPost" ("body", "category_id", "created_at", "deleted", "id", "image", "meta_title", "published_at", "slug", "title", "updated", "updated_at", "user_id") SELECT "body", "category_id", "created_at", "deleted", "id", "image", "meta_title", "published_at", "slug", "title", "updated", "updated_at", "user_id" FROM "NewsPost";
DROP TABLE "NewsPost";
ALTER TABLE "new_NewsPost" RENAME TO "NewsPost";
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
