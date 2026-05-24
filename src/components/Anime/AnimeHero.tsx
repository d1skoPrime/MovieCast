'use client'

import { animeGenresDict } from '@/types/types'
import { useEffect, useState } from 'react'
import AnimePopular from './AnimePopular'
import AnimeUpcoming from './AnimeUpcoming'
import ExploreMoreClient from './ExploreMoreClient'
import GenresClient from './GenresClient'

const AnimeHero = () => {
	const [upcoming, setUpcoming] = useState([])
	const [popular, setPopular] = useState([])
	const [explore, setExplore] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchAll = async () => {
			const [upcomingRes, popularRes, exploreRes] = await Promise.all([
				fetch('/api/anime-upcoming?page=1').then(r => r.json()),
				fetch('/api/anime-popular?page=1').then(r => r.json()),
				fetch('/api/anime-upcoming?page=2').then(r => r.json())
			])
			setUpcoming(upcomingRes)
			setPopular(popularRes)
			setExplore(exploreRes)
			setLoading(false)
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
			<AnimeUpcoming anime={upcoming} />
			<AnimePopular anime={popular} />
			<GenresClient genres={genres} />
			<ExploreMoreClient anime={explore} />
		</div>
	)
}

export default AnimeHero
