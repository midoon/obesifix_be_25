-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `picture` TEXT NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `height` FLOAT NOT NULL,
    `weight` FLOAT NOT NULL,
    `activity` ENUM('sedentary', 'lowActive', 'active', 'veryActive') NOT NULL,
    `food_type` LONGTEXT NULL,
    `created_at` TIMESTAMP(3) NOT NULL,
    `updated_at` TIMESTAMP(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL,
    `updated_at` TIMESTAMP(3) NOT NULL,

    UNIQUE INDEX `tokens_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
