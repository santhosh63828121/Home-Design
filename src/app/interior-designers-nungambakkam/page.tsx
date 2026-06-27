import CityPage, { cityMetadata } from '@/components/locations/CityPage'

const SLUG = 'interior-designers-nungambakkam'
export const metadata = cityMetadata(SLUG)
export default function Page() {
  return <CityPage slug={SLUG} />
}
