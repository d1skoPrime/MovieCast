import { getUpcomingAnime } from '@/lib/jikan'
import AnimeUpcoming from './AnimeUpcoming'
// src/app/page.tsx
export const dynamic = 'force-dynamic'
const UpcomingLogicAnime = async () => {
	const anime = await getUpcomingAnime()
	return <AnimeUpcoming anime={anime} />
}

export default UpcomingLogicAnime
