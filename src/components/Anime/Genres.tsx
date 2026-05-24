import { getAnimeGenres } from '@/lib/jikan'
import GenresClient from './GenresClient'

const Genres = async () => {
	const genres = await getAnimeGenres()
	return <GenresClient genres={genres} />
}

export default Genres
