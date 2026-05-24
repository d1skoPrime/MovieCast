import { getPopularAnime } from '@/lib/jikan'
import AnimePopular from '././AnimePopular'

const PopularLogicAnime = async () => {
	const anime = await getPopularAnime()
	return <AnimePopular anime={anime} />
}

export default PopularLogicAnime
