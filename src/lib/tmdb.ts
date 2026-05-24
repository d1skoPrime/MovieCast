const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = process.env.TMDB_BASE_URL
const GENRE_MAP: Record<number, string> = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Sci-Fi',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western'
}
async function fetchAllPages(url: string, maxPages = 10) {
	const firstPage = await fetch(`${url}&page=1`, {
		next: { revalidate: 21600 }
	}).then(r => r.json())
	const totalPages = Math.min(firstPage.total_pages, maxPages)

	if (totalPages <= 1) return firstPage.results

	const rest = await Promise.all(
		Array.from({ length: totalPages - 1 }, (_, i) =>
			fetch(`${url}&page=${i + 2}`, { next: { revalidate: 21600 } }).then(r =>
				r.json()
			)
		)
	)

	return [firstPage, ...rest]
		.flatMap(p => p.results)
		.filter(
			(movie, index, self) => index === self.findIndex(m => m.id === movie.id)
		)
}

export async function getUpcoming() {
	const today = new Date().toISOString().split('T')[0]
	const future = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
		.toISOString()
		.split('T')[0]

	const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${today}&primary_release_date.lte=${future}&sort_by=release_date.asc&language=en-US`

	const results = (await fetchAllPages(url)).sort(
		(a: any, b: any) =>
			new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
	)

	return results.map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		overview: movie.overview,
		poster_path: movie.poster_path,
		release_date: movie.release_date,
		vote_average: movie.vote_average,
		genre_ids: movie.genre_ids ?? [],
		genres: (movie.genre_ids ?? [])
			.map((id: number) => GENRE_MAP[id])
			.filter(Boolean),
		original_language: movie.original_language,
		popularity: movie.popularity
	}))
}

export async function getReleased() {
	const today = new Date().toISOString().split('T')[0]
	const past = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
		.toISOString()
		.split('T')[0]

	const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${past}&primary_release_date.lte=${today}&sort_by=release_date.desc&language=en-US`

	const results = (await fetchAllPages(url)).sort(
		(a: any, b: any) =>
			new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
	)

	return results.map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		overview: movie.overview,
		poster_path: movie.poster_path,
		release_date: movie.release_date,
		vote_average: movie.vote_average
	}))
}

export async function getMovieDetails(id: number) {
	const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`

	const result = await fetch(url, { next: { revalidate: 21600 } })
	const movie = await result.json()

	console.log(movie)

	return {
		id: movie.id,
		title: movie.title,
		original_title: movie.original_title,
		original_language: movie.original_language,
		overview: movie.overview,
		poster_path: movie.poster_path,
		backdrop_path: movie.backdrop_path,
		release_date: movie.release_date,
		vote_average: movie.vote_average,
		vote_count: movie.vote_count,
		popularity: movie.popularity,
		adult: movie.adult,
		video: movie.video,
		media_type: 'movie',
		genres: movie.genres?.map((g: any) => g.name) ?? [],
		origin_country: movie.production_countries?.[0]?.name ?? 'Unknown',
		runtime: movie.runtime,
		tagline: movie.tagline
	}
}

export async function getPopularMovies() {
	const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
	const results = (await fetchAllPages(url)).sort(
		(a: any, b: any) => b.vote_average - a.vote_average
	)
	return results.map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		overview: movie.overview,
		poster_path: movie.poster_path,
		release_date: movie.release_date,
		vote_average: movie.vote_average
	}))
}
export async function searchMovies(query: string) {
	const res = await fetch(
		`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
		{ next: { revalidate: 3600 } }
	)
	const data = await res.json()
	return data.results.map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		overview: movie.overview,
		poster_path: movie.poster_path,
		release_date: movie.release_date,
		vote_average: movie.vote_average
	}))
}
