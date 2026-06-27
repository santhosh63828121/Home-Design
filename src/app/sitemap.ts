import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'
import { staticRoutes, routes } from '@/lib/routes'
import { serviceCategories } from '@/data/business'
import { projects } from '@/data/portfolio'
import { allLocations } from '@/data/locations'
import { getAllPosts } from '@/lib/blog'

/** Auto-generated sitemap.xml — static routes + service / city / project pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (path: string) => `${siteConfig.url}${path === '/' ? '' : path}`

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))

  const serviceEntries: MetadataRoute.Sitemap = serviceCategories.map((s) => ({
    url: url(routes.service(s.slug)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const cityEntries: MetadataRoute.Sitemap = allLocations.map((c) => ({
    url: url(routes.city(c.slug)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: url(routes.portfolioProject(p.slug)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: url(routes.blogPost(p.slug)),
    lastModified: new Date(`${p.frontmatter.updated || p.frontmatter.date}T00:00:00`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...serviceEntries, ...cityEntries, ...projectEntries, ...postEntries]
}
