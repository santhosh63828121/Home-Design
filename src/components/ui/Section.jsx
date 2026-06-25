'use client'

/**
 * Standard section wrapper: consistent vertical rhythm + centered max-width.
 * `bleed` renders an edge-to-edge section (no inner container).
 */
export default function Section({
  id,
  bg = 'bg-background',
  className = '',
  containerClassName = '',
  bleed = false,
  children,
  ...props
}) {
  return (
    <section id={id} className={`${bg} ${className}`} {...props}>
      {bleed ? (
        children
      ) : (
        <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${containerClassName}`}>
          {children}
        </div>
      )}
    </section>
  )
}