# PHP & MySQL Database Specification

This document details the exact schema migration from Prisma (SQLite) to MySQL for RGL Decors.

## 1. Prisma Model Mapping

### Next.js Prisma Schema (`prisma/schema.prisma`):
```prisma
model Lead {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  name     String
  email    String
  phone    String?
  city     String?
  homeType String?
  budget   String?
  subject  String?
  message  String

  source    String  @default("website")
  status    String  @default("NEW")
  ipHash    String?
  userAgent String?

  @@index([createdAt])
  @@index([status])
}
```

### MySQL DDL Creation Migration (`database/migrations/001_create_leads_table.sql`):
```sql
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
```

## 2. PHP Model Implementation (`app/Models/Lead.php`)

The `Lead` model in PHP handles CRUD operations against MySQL using PDO:

- **Create**: Inserts new lead record with generated UUID v4 or CUID fallback, captures timestamps, sanitizes inputs.
- **Find**: Queries lead by ID or filter criteria (status, source, date range).
- **Count**: Aggregates total lead volume for reporting/triage.
- **Update Status**: Triage status transitions (`NEW` → `CONTACTED` → `QUALIFIED` → `WON` / `LOST`).

## 3. Database Connection Configuration (`config/database.php`)

Environment-backed MySQL connection properties:
- `DB_HOST`: `localhost` / 127.0.0.1
- `DB_PORT`: `3306`
- `DB_DATABASE`: `design`
- `DB_USERNAME`: `root`
- `DB_PASSWORD`: ``
- `DB_CHARSET`: `utf8mb4`

Connection is instantiated lazily via `App\Services\Database::getConnection()` maintaining a single PDO singleton during the request lifecycle.
