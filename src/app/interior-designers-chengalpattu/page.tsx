import CityPage, { cityMetadata } from '@/components/locations/CityPage'

const SLUG = "interior-designers-chengalpattu"

export const metadata = cityMetadata(SLUG)

export default function Page() {
  return <CityPage slug={SLUG} />
}
