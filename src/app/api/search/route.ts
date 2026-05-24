import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const q = req.nextUrl.searchParams.get('q')
	if (!q) return NextResponse.json([])

	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(q)}&language=en-US&page=1`
	)
	const data = await res.json()

	const results =
		data.results?.slice(0, 6).map((m: any) => ({
			id: m.id,
			title: m.title,
			poster_path: m.poster_path,
			release_date: m.release_date,
			vote_average: m.vote_average
		})) ?? []

	return NextResponse.json(results)
}
