<?php

/**
 * Computes default canonical page title.
 */
function seo_title(?string $title = null): string
{
    $siteName = 'RGL Decors — Best Interior Designers in Chennai';
    if (!$title) {
        return $siteName;
    }
    return $title . ' | RGL Decors';
}

/**
 * Computes canonical URL for current request.
 */
function canonical_url(?string $path = null): string
{
    $domain = rtrim($_ENV['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.rgldecors.com', '/');
    if ($path !== null) {
        return $domain . '/' . ltrim($path, '/');
    }
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    // Strip base path prefix if present
    $prefix = base_path_prefix();
    if ($prefix && strpos($uri, $prefix) === 0) {
        $uri = substr($uri, strlen($prefix));
    }
    return $domain . '/' . ltrim($uri, '/');
}

/**
 * Renders Meta, OpenGraph & Twitter head tags.
 */
function render_seo_tags(array $meta = []): string
{
    $title = seo_title($meta['title'] ?? null);
    $description = e($meta['description'] ?? 'RGL Decors is Chennai’s leading luxury interior design firm with 15+ years experience, 45-day execution, and 10-year warranty.');
    $canonical = canonical_url($meta['canonical_path'] ?? null);
    $image = e($meta['image'] ?? 'https://www.rgldecors.com/assets/images/og-image.jpg');

    $html = "<title>{$title}</title>\n";
    $html .= "    <meta name=\"description\" content=\"{$description}\">\n";
    $html .= "    <link rel=\"canonical\" href=\"{$canonical}\">\n";
    $html .= "    <!-- Open Graph -->\n";
    $html .= "    <meta property=\"og:title\" content=\"{$title}\">\n";
    $html .= "    <meta property=\"og:description\" content=\"{$description}\">\n";
    $html .= "    <meta property=\"og:url\" content=\"{$canonical}\">\n";
    $html .= "    <meta property=\"og:type\" content=\"website\">\n";
    $html .= "    <meta property=\"og:image\" content=\"{$image}\">\n";
    $html .= "    <meta property=\"og:site_name\" content=\"RGL Decors\">\n";
    $html .= "    <!-- Twitter -->\n";
    $html .= "    <meta name=\"twitter:card\" content=\"summary_large_image\">\n";
    $html .= "    <meta name=\"twitter:title\" content=\"{$title}\">\n";
    $html .= "    <meta name=\"twitter:description\" content=\"{$description}\">\n";
    $html .= "    <meta name=\"twitter:image\" content=\"{$image}\">\n";

    if (!empty($meta['json_ld'])) {
        $json = json_encode($meta['json_ld'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        $html .= "    <script type=\"application/ld+json\">\n{$json}\n    </script>\n";
    }

    return $html;
}
