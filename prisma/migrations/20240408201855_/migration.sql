-- CreateTable
CREATE TABLE "PromoBanner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meta_title" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PromoBanner_slug_key" ON "PromoBanner"("slug");
