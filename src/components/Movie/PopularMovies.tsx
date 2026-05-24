import { getPopularMovies } from '@/lib/tmdb'
import PopularClient from './PopularMoviesClient'

const PopularMovies = async () => {
	const movies = await getPopularMovies()
	return <PopularClient movies={movies} />
}

export default PopularMovies
