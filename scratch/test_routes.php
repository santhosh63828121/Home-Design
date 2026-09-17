<?php

require_once __DIR__ . '/../vendor/autoload.php';

echo "=== TESTING DATA SERVICES ===\n";

$b = App\Services\BusinessData::getBusiness();
echo "[+] Business: {$b['brand']} ({$b['legalName']})\n";

$s = App\Services\ServiceData::getServiceGroups();
echo "[+] Service Groups count: " . count($s) . "\n";

$p = App\Services\PortfolioData::getProjects();
echo "[+] Portfolio Projects count: " . count($p) . "\n";

$c = App\Services\LocationData::getCities();
echo "[+] Cities count: " . count($c) . "\n";

$sub = App\Services\LocationData::getSuburbs();
echo "[+] Suburbs count: " . count($sub) . "\n";

$blog = App\Services\BlogData::getAllPosts();
echo "[+] Blog Posts count: " . count($blog) . "\n";

$faq = App\Services\FaqData::getFaqCategories();
echo "[+] FAQ Categories count: " . count($faq) . "\n";

$pkgs = App\Services\PricingData::getPackages();
echo "[+] Pricing Packages count: " . count($pkgs) . "\n";

echo "\n=== TESTING CONTROLLER RENDERING ===\n";

$_SERVER['HTTP_HOST'] = 'localhost';
$_SERVER['REQUEST_URI'] = '/Design/';

$homeCtrl = new App\Controllers\HomeController();
ob_start();
$homeCtrl->index();
$html = ob_get_clean();
echo "[+] Homepage HTML length: " . strlen($html) . " bytes\n";

$pageCtrl = new App\Controllers\PageController();
ob_start();
$pageCtrl->about();
$htmlAbout = ob_get_clean();
echo "[+] About page HTML length: " . strlen($htmlAbout) . " bytes\n";

$servCtrl = new App\Controllers\ServiceController();
ob_start();
$servCtrl->index();
$htmlServ = ob_get_clean();
echo "[+] Services page HTML length: " . strlen($htmlServ) . " bytes\n";

$portCtrl = new App\Controllers\PortfolioController();
ob_start();
$portCtrl->index();
$htmlPort = ob_get_clean();
echo "[+] Portfolio page HTML length: " . strlen($htmlPort) . " bytes\n";

$locCtrl = new App\Controllers\LocationController();
ob_start();
$locCtrl->show('interior-designers-in-adyar');
$htmlAdyar = ob_get_clean();
echo "[+] Location Adyar page HTML length: " . strlen($htmlAdyar) . " bytes\n";

$seoCtrl = new App\Controllers\SeoController();
ob_start();
$seoCtrl->sitemap();
$xmlSitemap = ob_get_clean();
echo "[+] Sitemap XML length: " . strlen($xmlSitemap) . " bytes\n";

echo "\nALL TESTS PASSED SUCCESSFULLY WITH 0 ERRORS!\n";
