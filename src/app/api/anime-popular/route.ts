import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const page = req.nextUrl.searchParams.get('page') ?? '1'
	const res = await fetch(
		`https://api.jikan.moe/v4/anime?type=movie&order_by=popularity&sort=asc&limit=25&page=${page}`
	)
	const data = await res.json()
	return NextResponse.json(data.data ?? [])
}
