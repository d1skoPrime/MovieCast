import { getUpcoming } from '@/lib/tmdb'
import UpcomingClient from './UpcomingMoviesClient'

const UpcomingMovies = async () => {
	const movies = await getUpcoming()
	return <UpcomingClient movies={movies} />
}

export default UpcomingMovies
