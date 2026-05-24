import MovieDetails from '@/components/MovieDetails'
import { getMovieDetails } from '@/lib/tmdb'

export default async function Page({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const movie = await getMovieDetails(Number(id))
	return (
		<div className="min-h-screen bg-background flex justify-center items-center py-10">
			<MovieDetails
				title={movie.title}
				original_title={movie.original_title}
				original_language={movie.original_language}
				overview={movie.overview}
				poster_path={movie.poster_path}
				backdrop_path={movie.backdrop_path}
				release_date={movie.release_date}
				vote_average={movie.vote_average}
				vote_count={movie.vote_count}
				popularity={movie.popularity}
				adult={movie.adult}
				media_type={movie.media_type}
				genres={movie.genres}
				origin_country={movie.origin_country}
				runtime={movie.runtime}
				tagline={movie.tagline}
			/>
		</div>
	)
}
