import type { Metadata } from 'next'
import PageStub from '@/components/page/PageStub'
import BlogCard from '@/components/blog/BlogCard'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd } from '@/lib/structured-data'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Ideas & Cost Guides',
  description:
    'Cost guides, design ideas and material comparisons to help you plan your Chennai home — original, useful articles written by the RGL Decors design team.',
  path: routes.blog,
})

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'RGL Decors Blog',
    url: `${siteConfig.url}${routes.blog}`,
    description: 'Interior design ideas, cost guides and material comparisons for Chennai homes.',
    publisher: { '@id': `${siteConfig.url}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.frontmatter.title,
      url: `${siteConfig.url}${routes.blogPost(p.slug)}`,
      datePublished: p.frontmatter.date,
      author: { '@type': 'Organization', name: p.frontmatter.author },
    })),
  }

  return (
    <PageStub
      title="Interior Design Ideas & Cost Guides"
      kicker="RGL Decors · Blog"
      intro="Honest cost guides, practical design ideas and material comparisons to help you plan your Chennai home — written by our design team, not scraped from anywhere."
      crumbs={[
        { name: 'Home', path: routes.home },
        { name: 'Blog', path: routes.blog },
      ]}
    >
      {posts.length === 0 ? (
        <p className="rounded-2xl border border-divider bg-white px-6 py-5 text-sm text-muted">
          Our first articles are being written. Meanwhile, explore our services or get a free 3D
          design and quote.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      <JsonLd id="ld-blog" data={blogSchema} />
    </PageStub>
  )
}
