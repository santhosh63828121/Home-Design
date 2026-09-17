<?php

return [
    'host' => $_ENV['MAIL_HOST'] ?? 'smtp.gmail.com',
    'port' => (int)($_ENV['MAIL_PORT'] ?? 587),
    'username' => $_ENV['MAIL_USERNAME'] ?? '',
    'password' => $_ENV['MAIL_PASSWORD'] ?? '',
    'from_address' => $_ENV['MAIL_FROM_ADDRESS'] ?? 'rgldecors@gmail.com',
    'from_name' => $_ENV['MAIL_FROM_NAME'] ?? 'RGL Decors',
    'recipient_email' => $_ENV['LEAD_RECIPIENT_EMAIL'] ?? 'rgldecors@gmail.com',
];
