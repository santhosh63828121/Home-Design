<?php

/**
 * Escapes string for safe HTML output.
 */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Base asset path helper.
 */
function asset(string $path): string
{
    $base = rtrim(base_path_prefix(), '/');
    return $base . '/assets/' . ltrim($path, '/');
}

/**
 * URL helper.
 */
function url(string $path = ''): string
{
    $base = rtrim(base_path_prefix(), '/');
    $p = '/' . ltrim($path, '/');
    return ($p === '/') ? ($base ?: '/') : ($base . $p);
}

/**
 * Computes base path prefix (e.g. '/Design' under XAMPP or '' in production).
 */
function base_path_prefix(): string
{
    static $prefix = null;
    if ($prefix !== null) {
        return $prefix;
    }
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    $dir = dirname($scriptName);
    // Remove '/public' if present
    $dir = preg_replace('#/public$#', '', $dir);
    $prefix = ($dir === '/' || $dir === '\\') ? '' : str_replace('\\', '/', $dir);
    return $prefix;
}

/**
 * Renders a view component template with data extraction.
 */
function component(string $name, array $data = []): void
{
    extract($data);
    $path = __DIR__ . '/../../resources/views/components/' . str_replace('.', '/', $name) . '.php';
    if (file_exists($path)) {
        include $path;
    } else {
        echo "<!-- Component [{$name}] not found -->";
    }
}

/**
 * Renders a main view page.
 */
function render_view(string $viewName, array $data = []): void
{
    extract($data);
    $viewPath = __DIR__ . '/../../resources/views/' . str_replace('.', '/', $viewName) . '.php';
    $layoutPath = __DIR__ . '/../../resources/views/layouts/main.php';

    if (file_exists($viewPath)) {
        ob_start();
        include $viewPath;
        $content = ob_get_clean();

        if (file_exists($layoutPath)) {
            include $layoutPath;
        } else {
            echo $content;
        }
    } else {
        http_response_code(404);
        echo "<h1>Page Not Found</h1>";
    }
}

/**
 * CSRF Token Generator & Input Field Helper.
 */
function csrf_token(): string
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (empty($_SESSION['_token'])) {
        $_SESSION['_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="_token" value="' . e(csrf_token()) . '">';
}

/**
 * Returns JSON response.
 */
function json_response(array $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
