import CityPage, { cityMetadata } from '@/components/locations/CityPage'

const SLUG = 'interior-designers-ecr'
export const metadata = cityMetadata(SLUG)
export default function Page() {
  return <CityPage slug={SLUG} />
}
