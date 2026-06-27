import CityPage, { cityMetadata } from '@/components/locations/CityPage'

const SLUG = 'interior-designers-tambaram'
export const metadata = cityMetadata(SLUG)
export default function Page() {
  return <CityPage slug={SLUG} />
}
