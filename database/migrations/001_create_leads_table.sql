-- DDL Migration for Leads Table (MySQL)
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(36) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `city` VARCHAR(100) DEFAULT NULL,
  `home_type` VARCHAR(100) DEFAULT NULL,
  `budget` VARCHAR(100) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `source` VARCHAR(100) NOT NULL DEFAULT 'website',
  `status` VARCHAR(50) NOT NULL DEFAULT 'NEW',
  `ip_hash` VARCHAR(64) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_leads_created_at` (`created_at`),
  INDEX `idx_leads_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
