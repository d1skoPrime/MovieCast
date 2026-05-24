'use client'

import { useState } from 'react'
import NavBar from './ui/NavBar'
const HomeClient = ({
	movies: MoviesComponent,
	anime: AnimeComponent
}: {
	movies: React.ReactNode
	anime: React.ReactNode
}) => {
	const [mode, setMode] = useState<'movies' | 'anime'>('movies')

	return (
		<>
			<nav className="w-full h-22 bg-[#141720] text-white flex items-center justify-center">
				<NavBar mode={mode} />
			</nav>
			<div className="bg-primary w-full h-0.5" /> {/* add this line */}
			<div className="flex items-center justify-center gap-2 py-4 bg-background">
				<button
					onClick={() => setMode('movies')}
					className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'movies' ? 'bg-primary text-white' : 'bg-card-bg text-cblue hover:text-white'}`}
				>
					🎬 Movies
				</button>
				<button
					onClick={() => setMode('anime')}
					className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'anime' ? 'bg-primary text-white' : 'bg-card-bg text-cblue hover:text-white'}`}
				>
					⛩️ Anime
				</button>
			</div>
			<div>{mode === 'movies' ? MoviesComponent : AnimeComponent}</div>
		</>
	)
}

export default HomeClient
