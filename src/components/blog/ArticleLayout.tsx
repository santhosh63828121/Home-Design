import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowRight, ArrowLeft, Calendar, Clock, PenLine } from 'lucide-react'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import SkipLink from '@/components/page/SkipLink'
import { routes } from '@/lib/routes'
import { siteConfig } from '@/lib/seo'
import { formatPostDate, type Post, type PostMeta } from '@/lib/blog'
import { mdxComponents } from './mdx-components'
import Toc from './Toc'
import ShareButtons from './ShareButtons'
import BlogCard from './BlogCard'

/** Full article shell: header · share · TOC + prose · money CTA · related · CTA. */
export default function ArticleLayout({ post, related }: { post: Post; related: PostMeta[] }) {
  const { frontmatter: fm } = post
  const url = `${siteConfig.url}${routes.blogPost(post.slug)}`

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" className="bg-background pt-28">
        <article className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-caps text-[11px] uppercase tracking-wide2 text-muted">
              <li>
                <Link href={routes.home} className="hover:text-accent">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={routes.blog} className="hover:text-accent">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink" aria-current="page">{fm.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mx-auto max-w-3xl">
            {fm.category && <p className="eyebrow">{fm.category}</p>}
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] sm:text-5xl">{fm.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">{fm.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <PenLine size={15} aria-hidden="true" /> {fm.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} aria-hidden="true" />
                <time dateTime={fm.date}>{formatPostDate(fm.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} aria-hidden="true" /> {post.readingTimeMins} min read
              </span>
            </div>

            <div className="mt-5">
              <ShareButtons url={url} title={fm.title} />
            </div>
          </header>

          {/* Cover */}
          {fm.cover && (
            <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl">
              <Image
                src={fm.cover}
                alt={fm.coverAlt || fm.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56rem"
                className="object-cover"
              />
            </div>
          )}

          {/* Body: sticky TOC + prose */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-28">
                <Toc items={post.toc} />
              </div>
            </aside>

            <div className="order-1 min-w-0 lg:order-2">
              <div className="max-w-2xl">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>

              {/* Money-page CTA (the cluster → pillar link) */}
              {fm.moneyPage && (
                <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/[0.06] p-6">
                  <p className="font-serif text-lg text-ink">Ready to see real numbers for your home?</p>
                  <p className="mt-1 text-sm text-ink/70">
                    Get a transparent, itemised estimate and a free HD 3D walkthrough.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={fm.moneyPage.href}
                      className="btn-pill bg-accent text-white hover:bg-accent-dark"
                    >
                      {fm.moneyPage.label} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link
                      href={routes.getQuote}
                      className="btn-pill border border-accent bg-transparent text-accent hover:bg-accent hover:text-white"
                    >
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-10">
                <Link href={routes.blog} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                  <ArrowLeft size={16} aria-hidden="true" /> Back to all articles
                </Link>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-divider pt-12">
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">Related reading</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
