<?php

/**
 * Lightweight Standalone PSR-4 Autoloader
 * Namespace 'App\' maps to directory 'app/'
 */
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/../app/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Load helper files
require_once __DIR__ . '/../app/Helpers/view_helpers.php';
require_once __DIR__ . '/../app/Helpers/seo_helpers.php';
