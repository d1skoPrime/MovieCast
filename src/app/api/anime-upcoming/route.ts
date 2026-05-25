// /api/anime-upcoming/route.ts
import { NextRequest, NextResponse } from 'next/server'

const cache = new Map<string, { data: any; expiry: number }>()
const CACHE_DURATION = 5 * 60 * 1000

export async function GET(req: NextRequest) {
	const pageParam = req.nextUrl.searchParams.get('page') ?? '1'
	const page = parseInt(pageParam)

	const cacheKey = `upcoming-page-${page}`
	const now = Date.now()

	if (cache.has(cacheKey)) {
		const cached = cache.get(cacheKey)!
		if (now < cached.expiry) return NextResponse.json(cached.data)
	}

	try {
		const res = await fetch(
			`https://api.jikan.moe/v4/top/anime?type=movie&filter=upcoming&page=${page}`
		).then(r => r.json())

		const rawData = res.data ?? []
		const today = new Date()
		today.setHours(0, 0, 0, 0)

		// Only drop items that explicitly aired in the past
		const filteredData = rawData.filter((anime: any) => {
			if (!anime.aired?.from) return true
			const releaseDate = new Date(anime.aired.from)
			return releaseDate >= today
		})

		cache.set(cacheKey, { data: filteredData, expiry: now + CACHE_DURATION })
		return NextResponse.json(filteredData)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
