<?php

namespace App\Middleware;

class RedirectMiddleware
{
    public static function handle(?string $method = null, ?string $uri = null): bool
    {
        $redirects = include __DIR__ . '/../../config/redirects.php';

        if ($uri === null) {
            $rawUri = $_SERVER['REQUEST_URI'] ?? '/';
            $uri = parse_url($rawUri, PHP_URL_PATH) ?? '/';

            // Strip subfolder prefix if present e.g. /Design
            $basePrefix = base_path_prefix();
            if ($basePrefix && strpos($uri, $basePrefix) === 0) {
                $uri = substr($uri, strlen($basePrefix));
            }

            if ($uri === '' || $uri === false) {
                $uri = '/';
            }
        }

        if (isset($redirects[$uri])) {
            $dest = \url($redirects[$uri]);
            header("HTTP/1.1 301 Moved Permanently");
            header("Location: {$dest}");
            exit;
        }

        return true;
    }
}
