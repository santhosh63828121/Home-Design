<?php

namespace App\Models;

use App\Services\Database;
use PDO;

class Lead
{
    public static function create(array $data): string|false
    {
        $pdo = Database::getConnection();
        if (!$pdo) {
            // Auto-fallback logging if DB disabled
            error_log("Lead captured without DB connection: " . json_encode($data));
            return 'lead_' . bin2hex(random_bytes(8));
        }

        // Generate CUID-style or UUID identifier
        $id = sprintf(
            'c%s%s',
            dechex(time()),
            bin2hex(random_bytes(8))
        );

        $sql = "INSERT INTO leads 
            (id, name, email, phone, city, home_type, budget, subject, message, source, status, ip_hash, user_agent)
            VALUES 
            (:id, :name, :email, :phone, :city, :home_type, :budget, :subject, :message, :source, :status, :ip_hash, :user_agent)";

        $stmt = $pdo->prepare($sql);
        $success = $stmt->execute([
            ':id' => $id,
            ':name' => $data['name'],
            ':email' => strtolower(trim($data['email'])),
            ':phone' => $data['phone'] ?? null,
            ':city' => $data['city'] ?? null,
            ':home_type' => $data['homeType'] ?? $data['home_type'] ?? null,
            ':budget' => $data['budget'] ?? null,
            ':subject' => $data['subject'] ?? null,
            ':message' => $data['message'],
            ':source' => $data['source'] ?? 'website',
            ':status' => 'NEW',
            ':ip_hash' => $data['ipHash'] ?? null,
            ':user_agent' => $data['userAgent'] ?? $_SERVER['HTTP_USER_AGENT'] ?? null,
        ]);

        return $success ? $id : false;
    }

    public static function count(): int
    {
        $pdo = Database::getConnection();
        if (!$pdo) {
            return 0;
        }
        $stmt = $pdo->query("SELECT COUNT(*) FROM leads");
        return (int) $stmt->fetchColumn();
    }
}
