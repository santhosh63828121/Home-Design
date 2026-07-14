'use client'

import dynamic from 'next/dynamic'

/**
 * Client wrapper for the WebGL walkthrough.
 *
 * `ssr: false` is only permitted inside a Client Component in the App Router, so
 * this thin boundary exists purely to hold that option. three.js touches
 * `window` during init, and there is nothing meaningful to server-render for a
 * <canvas> in any case.
 *
 * The walkthrough lives on /3d-walkthrough rather than the homepage because
 * building the procedural house blocks the main thread for ~2.0-2.7s, which
 * capped the homepage at Performance 49-60. Here the visitor has explicitly
 * clicked through for the 3D — they opted into the wait.
 */
const CinematicExperience = dynamic(() => import('@/components/CinematicExperience.jsx'), {
  ssr: false,
  loading: () => (
    <div
      className="skeleton h-svh min-h-[600px] w-full"
      role="status"
      aria-label="Loading the 3D walkthrough"
    />
  ),
})

export default function WalkthroughDemo() {
  return <CinematicExperience />
}
