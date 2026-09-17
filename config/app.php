<?php

return [
    'name' => $_ENV['APP_NAME'] ?? 'RGL Decors',
    'env' => $_ENV['APP_ENV'] ?? 'production',
    'debug' => ($_ENV['APP_DEBUG'] ?? 'false') === 'true',
    'url' => $_ENV['APP_URL'] ?? 'http://localhost/Design',
    'site_url' => $_ENV['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.rgldecors.com',
    'timezone' => 'Asia/Kolkata',
];
