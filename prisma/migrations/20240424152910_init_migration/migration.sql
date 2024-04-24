-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `created_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_login_key`(`login`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `created_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromoBanner` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `updated` BOOLEAN NOT NULL DEFAULT false,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NOT NULL DEFAULT '',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_main` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsCategory` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `updated` BOOLEAN NOT NULL DEFAULT false,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NOT NULL DEFAULT '',
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `NewsCategory_name_key`(`name`),
    UNIQUE INDEX `NewsCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsPost` (
    `id` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `updated` BOOLEAN NOT NULL DEFAULT false,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NOT NULL DEFAULT '',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `NewsPost_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CryptoActivity` (
    `id` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `updated` BOOLEAN NOT NULL DEFAULT false,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NOT NULL DEFAULT '',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `views` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `CryptoActivity_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewsPost` ADD CONSTRAINT `NewsPost_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `NewsCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
