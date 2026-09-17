<?php

namespace App\Services;

class MarkdownParser
{
    public static function parse(string $content): array
    {
        $meta = [];
        $markdown = $content;

        // Extract YAML Frontmatter if present
        if (preg_match('/^---\s*\n(.*?)\n---\s*\n(.*)/s', $content, $matches)) {
            $yaml = $matches[1];
            $markdown = $matches[2];

            foreach (explode("\n", $yaml) as $line) {
                $line = trim($line);
                if (!$line || strpos($line, '#') === 0) continue;
                if (strpos($line, ':') !== false) {
                    [$key, $val] = explode(':', $line, 2);
                    $key = trim($key);
                    $val = trim($val);
                    // Trim quotes
                    $val = trim($val, '"\'');
                    // Check if JSON array
                    if (strpos($val, '[') === 0 && strrpos($val, ']') === strlen($val) - 1) {
                        $jsonVal = json_decode($val, true);
                        if (is_array($jsonVal)) {
                            $val = $jsonVal;
                        }
                    }
                    $meta[$key] = $val;
                }
            }
        }

        // Simple Markdown to HTML converter
        $html = self::markdownToHtml($markdown);

        return [
            'meta' => $meta,
            'html' => $html,
            'body' => $markdown,
        ];
    }

    private static function markdownToHtml(string $md): string
    {
        // Strip custom MDX tags like <PriceNote />, <Callout>, <MoneyPageCTA ... />
        $md = preg_replace('/<PriceNote\s*\/?>/i', '', $md);
        $md = preg_replace('/<Callout>(.*?)<\/Callout>/s', '<blockquote class="bg-amber-500/10 border-l-4 border-amber-500 p-4 my-6 text-amber-200">$1</blockquote>', $md);
        $md = preg_replace('/<MoneyPageCTA\s+href="([^"]+)"\s+label="([^"]+)"\s*\/?>/i', '<div class="my-8 text-center"><a href="$1" class="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-full transition-colors">$2 &rarr;</a></div>', $md);

        // Convert headers
        $md = preg_replace('/^### (.*?)$/m', '<h3 class="text-xl font-bold text-amber-100 mt-6 mb-3">$1</h3>', $md);
        $md = preg_replace('/^## (.*?)$/m', '<h2 class="text-2xl font-bold text-amber-200 mt-8 mb-4">$1</h2>', $md);
        $md = preg_replace('/^# (.*?)$/m', '<h1 class="text-3xl font-extrabold text-white mt-10 mb-6">$1</h1>', $md);

        // Bold & Italic
        $md = preg_replace('/\*\*(.*?)\*\*/s', '<strong>$1</strong>', $md);
        $md = preg_replace('/\*(.*?)\*/s', '<em>$1</em>', $md);

        // Lists
        $md = preg_replace('/^\- (.*?)$/m', '<li class="ml-4 list-disc text-neutral-300 mb-1">$1</li>', $md);

        // Markdown Tables
        $md = preg_replace_callback('/\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n)+)/', function ($matches) {
            $headers = array_map('trim', explode('|', trim($matches[1])));
            $headers = array_filter($headers);
            $rowsStr = trim($matches[2]);
            $rows = explode("\n", $rowsStr);

            $table = '<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-neutral-800 text-sm">';
            $table .= '<thead class="bg-neutral-900 text-amber-300"><tr>';
            foreach ($headers as $h) {
                $table .= '<th class="border border-neutral-800 p-3 text-left">' . $h . '</th>';
            }
            $table .= '</tr></thead><tbody>';

            foreach ($rows as $r) {
                $cols = array_map('trim', explode('|', trim($r)));
                $cols = array_filter($cols);
                if (empty($cols)) continue;
                $table .= '<tr class="border-b border-neutral-800 hover:bg-neutral-900/50">';
                foreach ($cols as $c) {
                    $table .= '<td class="border border-neutral-800 p-3 text-neutral-300">' . $c . '</td>';
                }
                $table .= '</tr>';
            }
            $table .= '</tbody></table></div>';
            return $table;
        }, $md);

        // Paragraphs
        $paragraphs = explode("\n\n", $md);
        $result = [];
        foreach ($paragraphs as $p) {
            $p = trim($p);
            if (!$p) continue;
            if (strpos($p, '<h') === 0 || strpos($p, '<div') === 0 || strpos($p, '<blockquote') === 0 || strpos($p, '<li') === 0) {
                $result[] = $p;
            } else {
                $result[] = '<p class="text-neutral-300 leading-relaxed mb-4">' . nl2br($p) . '</p>';
            }
        }

        return implode("\n", $result);
    }
}
