import { getAllAnime } from '@/lib/jikan'
import ExploreMoreClient from './ExploreMoreClient'

const ExploreMore = async () => {
	const anime = await getAllAnime()
	return <ExploreMoreClient anime={anime} />
}

export default ExploreMore
