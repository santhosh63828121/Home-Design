import CityPage, { cityMetadata } from '@/components/locations/CityPage'

const SLUG = 'interior-designers-t-nagar'
export const metadata = cityMetadata(SLUG)
export default function Page() {
  return <CityPage slug={SLUG} />
}
