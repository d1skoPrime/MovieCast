import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	// 1. Extract the page query parameter (defaulting to '1')
	const page = req.nextUrl.searchParams.get('page') ?? '1'

	// 2. Build the correct Jikan API URL
	// - order_by=start_date: Orders the list by release date
	// - sort=desc: Ensures the most recent items come first
	// - Optional: add &start_date=2015-01-01 if you only want movies from 2015 onwards
	const jikanUrl = `https://api.jikan.moe/v4/anime?type=movie&status=complete&order_by=start_date&sort=desc&limit=25&page=${page}`

	try {
		const res = await fetch(jikanUrl)

		if (!res.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch data from Jikan' },
				{ status: res.status }
			)
		}

		const data = await res.json()

		// Return the data array
		return NextResponse.json(data.data ?? [])
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
