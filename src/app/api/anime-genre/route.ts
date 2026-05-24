import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const genreId = req.nextUrl.searchParams.get('genreId')
	const page = req.nextUrl.searchParams.get('page') ?? '1'
	if (!genreId) return NextResponse.json([])

	const res = await fetch(
		`https://api.jikan.moe/v4/anime?type=movie&genres=${genreId}&themes=${genreId}&order_by=popularity&sort=asc&limit=25&page=${page}`
	)
	const data = await res.json()
	return NextResponse.json(data.data ?? [])
}
