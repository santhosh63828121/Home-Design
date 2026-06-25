/**
 * Skip-to-content link (WCAG 2.4.1 Bypass Blocks). Visually hidden until focused,
 * then appears top-left as the first Tab stop so keyboard users can jump past the
 * repeated header/nav straight to <main>. Must be rendered before the Navbar.
 */
export default function SkipLink({ href = '#main' }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
  )
}
