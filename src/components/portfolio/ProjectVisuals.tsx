import Image from 'next/image'
import { Layers, Building2, Home, Briefcase } from 'lucide-react'
import type { Project, ImageAsset } from '@/data/portfolio'

const SPACE_ICON = {
  Apartment: Home,
  Villa: Building2,
  Office: Briefcase,
  Commercial: Briefcase,
}

/**
 * Branded placeholder shown when a project has no real photo yet. Intentional
 * by design — it shows the project's type + style, never a stock room pretending
 * to be the actual space. Swapped for the real image automatically when added.
 */
export function ProjectPlaceholder({
  project,
  className = '',
  note = 'Visuals coming soon',
}: {
  project: Project
  className?: string
  note?: string
}) {
  const Icon = SPACE_ICON[project.space] ?? Layers
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#2a3b34] via-ink to-[#1a1512] text-white ${className}`}
    >
      <Icon size={34} className="text-accent/80" aria-hidden="true" />
      <p className="px-6 text-center font-caps text-xs uppercase tracking-wide2 text-white/80">
        {project.space}
        {project.bhk ? ` · ${project.bhk}` : ''} · {project.style}
      </p>
      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wide2 text-white/55">
        {note}
      </span>
    </div>
  )
}

/** Cover image if present, otherwise the branded placeholder. */
export function ProjectCover({
  project,
  className = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
}: {
  project: Project
  className?: string
  sizes?: string
}) {
  const cover = project.media.cover
  if (!cover) return <ProjectPlaceholder project={project} className={className} />
  return (
    <Image
      src={cover.src}
      alt={cover.alt}
      fill
      sizes={sizes}
      placeholder={cover.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={cover.blurDataURL}
      className="object-cover"
    />
  )
}

/** Image gallery — renders only when there are images (graceful otherwise). */
export function ProjectGallery({ images }: { images?: ImageAsset[] }) {
  if (!images?.length) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((img, i) => (
        <div key={`${img.src}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder={img.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={img.blurDataURL}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
