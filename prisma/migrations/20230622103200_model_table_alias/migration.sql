/*
  Warnings:

  - You are about to drop the `NamespacesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `NamespacesToUser` DROP FOREIGN KEY `NamespacesToUser_namespace_id_fkey`;

-- DropForeignKey
ALTER TABLE `NamespacesToUser` DROP FOREIGN KEY `NamespacesToUser_user_id_fkey`;

-- DropTable
DROP TABLE `NamespacesToUser`;

-- CreateTable
CREATE TABLE `namespaces_to_user` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `namespace_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `namespaces_to_user` ADD CONSTRAINT `namespaces_to_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `namespaces_to_user` ADD CONSTRAINT `namespaces_to_user_namespace_id_fkey` FOREIGN KEY (`namespace_id`) REFERENCES `namespaces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
