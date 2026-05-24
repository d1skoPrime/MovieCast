export async function getUpcomingAnime() {
	const today = new Date().toISOString().split('T')[0]

	const pages = await Promise.all(
		Array.from({ length: 8 }, (_, i) =>
			fetch(
				// Added &start_date=${today} to the API URL
				`https://api.jikan.moe/v4/anime?type=movie&status=upcoming&order_by=start_date&sort=asc&limit=25&page=${i + 1}&start_date=${today}`,
				{ next: { revalidate: 21600 } }
			).then(r => r.json())
		)
	)

	return pages
		.flatMap(p => p.data ?? [])
		.filter(
			(anime, index, self) =>
				index === self.findIndex(a => a.mal_id === anime.mal_id)
		)
		.sort((a, b) => {
			const dateA = a.aired?.from ? new Date(a.aired.from).getTime() : Infinity
			const dateB = b.aired?.from ? new Date(b.aired.from).getTime() : Infinity

			return dateA - dateB
		})
}
export async function getPopularAnime() {
	const pages = await Promise.all(
		Array.from({ length: 3 }, (_, i) =>
			fetch(
				`https://api.jikan.moe/v4/anime?type=movie&order_by=popularity&sort=asc&limit=25&page=${i + 1}`,
				{ next: { revalidate: 21600 } }
			).then(r => r.json())
		)
	)

	const getCompositeScore = (anime: any) => {
		// normalize popularity rank (lower = better, invert it)
		const popularityScore = anime.popularity ? 1 / anime.popularity : 0

		// score out of 10
		const scoreWeight = anime.score ? anime.score / 10 : 0

		// rank (lower = better, invert it)
		const rankScore = anime.rank ? 1 / anime.rank : 0

		// weighted average — popularity counts most
		return popularityScore * 0.5 + scoreWeight * 0.3 + rankScore * 0.2
	}

	return pages
		.flatMap(p => p.data ?? [])
		.filter(
			(anime, index, self) =>
				index === self.findIndex(a => a.mal_id === anime.mal_id)
		)
		.sort((a, b) => getCompositeScore(b) - getCompositeScore(a))
}

export async function getAllAnime() {
	const res = await fetch(
		`https://api.jikan.moe/v4/anime?type=movie&status=complete&order_by=start_date&sort=desc&`,
		{
			next: { revalidate: 21600 }
		}
	)
	const data = await res.json()
	console.log('Fetched all anime:', data)
	return data.data ?? []
}

export async function searchAnime(query: string) {
	const res = await fetch(
		`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&type=movie&limit=20`,
		{ next: { revalidate: 3600 } }
	)
	const data = await res.json()
	return data.data ?? []
}

export async function getUpcomingAnimePage1() {
	const res = await fetch(
		'https://api.jikan.moe/v4/anime?type=movie&status=upcoming&order_by=start_date&sort=asc&limit=25&page=1',
		{ next: { revalidate: 21600 } }
	)
	const data = await res.json()
	return data.data ?? []
}

export async function getAnimeGenres() {
	const res = await fetch(`https://api.jikan.moe/v4/genres/anime?type=movie`, {
		next: { revalidate: 21600 }
	})
	const data = await res.json()
	console.log('Fetched genres:', data)
	return data.data ?? []
}
export async function getAnimeByGenre(genreId: string) {
	const res = await fetch(
		`https://api.jikan.moe/v4/anime?type=movie&genres=${genreId}&themes=${genreId}&order_by=popularity&sort=asc&limit=25&page=1`,
		{ next: { revalidate: 21600 } }
	)
	const data = await res.json()
	return data.data ?? []
}
