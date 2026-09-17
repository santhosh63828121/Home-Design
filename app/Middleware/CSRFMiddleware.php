<?php

namespace App\Middleware;

class CSRFMiddleware
{
    public static function handle(string $method, string $uri): bool
    {
        if (strtoupper($method) === 'POST') {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }

            $token = $_POST['_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
            $sessionToken = $_SESSION['_token'] ?? '';

            if (!$token || !$sessionToken || !hash_equals($sessionToken, $token)) {
                http_response_code(403);
                if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
                    \json_response(['success' => false, 'error' => 'Invalid CSRF token.'], 403);
                } else {
                    die('CSRF token validation failed.');
                }
                return false;
            }
        }

        return true;
    }
}
