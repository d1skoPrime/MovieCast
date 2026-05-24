import { getUpcomingAnime } from '@/lib/jikan'
import AnimeUpcoming from './AnimeUpcoming'

const UpcomingLogicAnime = async () => {
	const anime = await getUpcomingAnime()
	return <AnimeUpcoming anime={anime} />
}

export default UpcomingLogicAnime
