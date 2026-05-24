import { getReleased } from '@/lib/tmdb'
import JustDroppedClient from './JustDroppedMoviesClient'

const JustDroppedMovies = async () => {
	const movies = await getReleased()
	return <JustDroppedClient movies={movies} />
}

export default JustDroppedMovies
