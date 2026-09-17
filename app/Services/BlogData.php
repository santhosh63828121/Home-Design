<?php

namespace App\Services;

class BlogData
{
    public static function getCategories(): array
    {
        return [
            ['name' => 'All Articles', 'slug' => 'all'],
            ['name' => 'Cost Guides', 'slug' => 'cost-guides'],
            ['name' => 'Materials & Durability', 'slug' => 'materials-durability'],
            ['name' => 'Design & Ideas', 'slug' => 'design-ideas'],
            ['name' => 'Warranty & Care', 'slug' => 'warranty-care'],
            ['name' => 'Execution & Planning', 'slug' => 'execution-planning'],
        ];
    }

    public static function getAllPosts(): array
    {
        $dir = __DIR__ . '/../../src/content/blog';
        if (!is_dir($dir)) {
            return [];
        }

        $files = glob($dir . '/*.mdx');
        $posts = [];

        foreach ($files as $file) {
            $slug = basename($file, '.mdx');
            $content = file_get_contents($file);
            $parsed = MarkdownParser::parse($content);

            $posts[] = [
                'slug' => $slug,
                'title' => $parsed['meta']['title'] ?? ucwords(str_replace('-', ' ', $slug)),
                'metaTitle' => $parsed['meta']['metaTitle'] ?? null,
                'description' => $parsed['meta']['description'] ?? '',
                'date' => $parsed['meta']['date'] ?? '2026-01-01',
                'author' => $parsed['meta']['author'] ?? 'RGL Decors Team',
                'category' => $parsed['meta']['category'] ?? 'Design & Ideas',
                'cover' => $parsed['meta']['cover'] ?? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
                'coverAlt' => $parsed['meta']['coverAlt'] ?? $parsed['meta']['title'] ?? '',
                'tags' => $parsed['meta']['tags'] ?? [],
                'html' => $parsed['html'],
            ];
        }

        // Sort posts by date descending
        usort($posts, fn($a, $b) => strcmp($b['date'], $a['date']));

        return $posts;
    }

    public static function getPostBySlug(string $slug): ?array
    {
        $posts = self::getAllPosts();
        foreach ($posts as $p) {
            if ($p['slug'] === $slug) {
                return $p;
            }
        }
        return null;
    }
}
