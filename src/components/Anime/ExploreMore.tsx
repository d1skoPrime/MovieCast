import { getAllAnime } from '@/lib/jikan'
import ExploreMoreClient from './ExploreMoreClient'
// src/app/page.tsx
export const dynamic = 'force-dynamic'
const ExploreMore = async () => {
	const anime = await getAllAnime()
	return <ExploreMoreClient anime={anime} />
}

export default ExploreMore
