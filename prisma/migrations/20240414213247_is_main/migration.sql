-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PromoBanner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL,
    "created_by" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updated" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME,
    "updated_by" TEXT NOT NULL DEFAULT '',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "is_main" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PromoBanner" ("created_at", "created_by", "deleted", "description", "id", "image", "meta_title", "title", "updated", "updated_at", "updated_by", "url") SELECT "created_at", "created_by", "deleted", "description", "id", "image", "meta_title", "title", "updated", "updated_at", "updated_by", "url" FROM "PromoBanner";
DROP TABLE "PromoBanner";
ALTER TABLE "new_PromoBanner" RENAME TO "PromoBanner";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
