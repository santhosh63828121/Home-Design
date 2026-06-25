'use client'

/**
 * Reusable typography primitives so headings/labels stay consistent and DRY.
 * Each accepts `className` for per-use tweaks and forwards remaining props.
 */

export function Eyebrow({ children, className = '', ...props }) {
  return (
    <span className={`eyebrow ${className}`} {...props}>
      {children}
    </span>
  )
}

export function Heading({ as: Tag = 'h2', children, className = '', ...props }) {
  return (
    <Tag
      className={`font-serif font-bold leading-[1.08] tracking-tight text-balance ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Body({ children, className = '', ...props }) {
  return (
    <p className={`font-sans text-base leading-relaxed text-ink/80 ${className}`} {...props}>
      {children}
    </p>
  )
}