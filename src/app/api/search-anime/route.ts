import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const q = req.nextUrl.searchParams.get('q')
	if (!q) return NextResponse.json([])

	const res = await fetch(
		`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&type=movie&limit=6`
	)
	const data = await res.json()

	const results = (data.data ?? []).slice(0, 6).map((a: any) => ({
		id: a.mal_id,
		title: a.title_english ?? a.title,
		poster_path: a.images?.jpg?.large_image_url,
		release_date: a.aired?.from?.split('T')[0] ?? 'TBA',
		vote_average: a.score ?? 0,
		isAnime: true
	}))

	return NextResponse.json(results)
}
