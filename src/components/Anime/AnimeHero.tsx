'use client'

import { animeGenresDict } from '@/types/types'
import { useEffect, useState } from 'react'
import AnimePopular from './AnimePopular'
import AnimeUpcoming from './AnimeUpcoming'
import ExploreMoreClient from './ExploreMoreClient'
import GenresClient from './GenresClient'

const AnimeHero = () => {
	const [upcoming, setUpcoming] = useState<any[]>([])
	const [popular, setPopular] = useState<any[]>([])
	const [explore, setExplore] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [upcomingPage, setUpcomingPage] = useState(1)
	const [popularPage, setPopularPage] = useState(1)
	const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false)
	const [isLoadingPopular, setIsLoadingPopular] = useState(false)
	const dedup = (arr: any[]) => {
		if (!Array.isArray(arr)) return []
		const seen = new Set()
		return arr.filter(a => {
			if (seen.has(a.mal_id)) return false
			seen.add(a.mal_id)
			return true
		})
	}

	const loadMoreUpcoming = async () => {
		setIsLoadingUpcoming(true)
		const nextPage = upcomingPage + 1

		// Fix the URL params here to match standard page tracking
		const res = await fetch(`/api/anime-upcoming?page=${nextPage}`).then(r =>
			r.json()
		)

		setUpcoming(prev => dedup([...prev, ...(Array.isArray(res) ? res : [])]))
		setUpcomingPage(nextPage)
		setIsLoadingUpcoming(false)
	}

	const loadMorePopular = async () => {
		setIsLoadingPopular(true)
		const nextPage = popularPage + 1
		const res = await fetch(`/api/anime-popular?page=${nextPage}`).then(r =>
			r.json()
		)
		setPopular(prev => dedup([...prev, ...(Array.isArray(res) ? res : [])]))
		setPopularPage(nextPage)
		setIsLoadingPopular(false)
	}

	useEffect(() => {
		const fetchAll = async () => {
			try {
				// fetch one at a time with small delays
				const upcomingRes = await fetch('/api/anime-upcoming?page=1').then(r =>
					r.json()
				)
				setUpcoming(dedup(Array.isArray(upcomingRes) ? upcomingRes : []))

				await new Promise(r => setTimeout(r, 500))

				const popularRes = await fetch('/api/anime-popular?page=1').then(r =>
					r.json()
				)
				setPopular(dedup(Array.isArray(popularRes) ? popularRes : []))

				await new Promise(r => setTimeout(r, 500))

				const exploreRes = await fetch(
					'/api/anime-released?pages=1&startPage=2'
				).then(r => r.json())
				setExplore(dedup(Array.isArray(exploreRes) ? exploreRes : []))
			} catch (e) {
				console.error(e)
			} finally {
				setLoading(false)
			}
		}
		fetchAll()
	}, [])

	const genres = Object.values(animeGenresDict)

	if (loading)
		return (
			<div className="w-full h-screen py-20 flex items-center justify-center">
				<p className="text-cblue">Loading anime...</p>
			</div>
		)

	return (
		<div className="w-full">
			<AnimeUpcoming
				anime={upcoming}
				onLoadMore={loadMoreUpcoming}
				isLoadingMore={isLoadingUpcoming}
			/>
			<AnimePopular
				anime={popular}
				onLoadMore={loadMorePopular}
				isLoadingMore={isLoadingPopular}
			/>
			<GenresClient genres={genres} />
			<ExploreMoreClient anime={explore} />
		</div>
	)
}

export default AnimeHero
