<?php

namespace App\Controllers;

use App\Services\BlogData;

class BlogController extends BaseController
{
    public function index(): void
    {
        $this->render('blog/index', [
            'meta' => [
                'title' => 'Home Interior Design Guides & Cost Blogs | RGL Decors',
                'description' => 'Read expert interior design guides for Chennai — 2BHK costs, modular kitchen price guides, material comparisons (MDF vs Plywood), and Vastu tips.',
                'canonical_path' => '/blog',
            ],
            'categories' => BlogData::getCategories(),
            'posts' => BlogData::getAllPosts(),
        ]);
    }

    public function show(string $slug): void
    {
        $post = BlogData::getPostBySlug($slug);
        if (!$post) {
            http_response_code(404);
            $this->render('pages/404');
            return;
        }

        $this->render('blog/show', [
            'meta' => [
                'title' => ($post['metaTitle'] ?? $post['title']) . ' | RGL Decors',
                'description' => $post['description'],
                'canonical_path' => '/blog/' . $slug,
                'image' => $post['cover'],
                'json_ld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'BlogPosting',
                    'headline' => $post['title'],
                    'datePublished' => $post['date'],
                    'author' => [
                        '@type' => 'Organization',
                        'name' => $post['author'],
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => 'RGL Decors',
                        'logo' => [
                            '@type' => 'ImageObject',
                            'url' => 'https://www.rgldecors.com/icon.svg',
                        ]
                    ]
                ]
            ],
            'post' => $post,
        ]);
    }
}
