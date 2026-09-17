<?php

namespace App\Services;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $instance = null;

    public static function getConnection(): ?PDO
    {
        if (self::$instance === null) {
            $config = include __DIR__ . '/../../config/database.php';
            $dsn = sprintf(
                "mysql:host=%s;port=%s;dbname=%s;charset=%s",
                $config['host'],
                $config['port'],
                $config['database'],
                $config['charset']
            );

            try {
                self::$instance = new PDO(
                    $dsn,
                    $config['username'],
                    $config['password'],
                    $config['options']
                );
            } catch (PDOException $e) {
                // Return null if database is unreachable (allows static pages to work without DB)
                error_log("Database connection failure: " . $e->getMessage());
                return null;
            }
        }
        return self::$instance;
    }

    public static function runMigration(): bool
    {
        $pdo = self::getConnection();
        if (!$pdo) {
            return false;
        }

        $sql = file_get_contents(__DIR__ . '/../../database/migrations/001_create_leads_table.sql');
        if ($sql) {
            try {
                $pdo->exec($sql);
                return true;
            } catch (PDOException $e) {
                error_log("Migration error: " . $e->getMessage());
            }
        }
        return false;
    }
}
