import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleLayout from '@/components/blog/ArticleLayout'
import { buildMetadata, siteConfig } from '@/lib/seo'
import { routes } from '@/lib/routes'
import { JsonLd, breadcrumbSchema } from '@/lib/structured-data'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'

type Params = { slug: string }

// Pre-render every post at build time, straight from the content folder.
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return buildMetadata({ title: 'Article Not Found', noindex: true })
  const { frontmatter: fm } = post
  return buildMetadata({
    title: fm.metaTitle || fm.title,
    description: fm.description,
    path: routes.blogPost(slug),
    ogImage: fm.cover || undefined,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || (process.env.NODE_ENV === 'production' && post.frontmatter.draft)) notFound()

  const related = getRelatedPosts(slug)
  const { frontmatter: fm } = post
  const url = `${siteConfig.url}${routes.blogPost(slug)}`

  const crumbs = [
    { name: 'Home', path: routes.home },
    { name: 'Blog', path: routes.blog },
    { name: fm.title, path: routes.blogPost(slug) },
  ]

  // Author/date honesty: a real, true byline ("RGL Decors Team") and the actual
  // publish date from frontmatter — no invented person, no backdating.
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: fm.title,
    description: fm.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: fm.date,
    dateModified: fm.updated || fm.date,
    ...(fm.cover ? { image: [fm.cover] } : {}),
    author: { '@type': 'Organization', name: fm.author, url: siteConfig.url },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    ...(fm.tags?.length ? { keywords: fm.tags.join(', ') } : {}),
  }

  return (
    <>
      <ArticleLayout post={post} related={related} />
      <JsonLd id="ld-blogposting" data={blogPostingSchema} />
      <JsonLd id="ld-blog-breadcrumb" data={breadcrumbSchema(crumbs)} />
    </>
  )
}
