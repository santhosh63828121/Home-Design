<?php

$_SERVER['HTTP_HOST'] = 'localhost';
$_SERVER['REQUEST_URI'] = '/Design/';
$_SERVER['REQUEST_METHOD'] = 'GET';

ob_start();
require __DIR__ . '/../public/index.php';
$html = ob_get_clean();

echo "INDEX.PHP RENDER SUCCESS! Length: " . strlen($html) . " bytes\n";
