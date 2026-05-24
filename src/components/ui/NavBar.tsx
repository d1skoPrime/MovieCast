'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { PiCoffeeBold } from 'react-icons/pi'
import { RiMovie2AiFill } from 'react-icons/ri'
import FeedbackModal from './FeedBackModal'

const NavBar = ({ mode }: { mode: 'movies' | 'anime' }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [suggestions, setSuggestions] = useState<any[]>([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const router = useRouter()
	const debounceRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (searchQuery.trim().length < 2) {
			setSuggestions([])
			return
		}

		if (debounceRef.current) clearTimeout(debounceRef.current)
		debounceRef.current = setTimeout(async () => {
			const endpoint =
				mode === 'anime'
					? `/api/search-anime?q=${encodeURIComponent(searchQuery)}`
					: `/api/search?q=${encodeURIComponent(searchQuery)}`
			const res = await fetch(endpoint)
			const data = await res.json()
			setSuggestions(data.slice(0, 6))
		}, 300)

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current)
		}
	}, [searchQuery, mode])

	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && searchQuery.trim()) {
			const path =
				mode === 'anime'
					? `/search-anime?q=${encodeURIComponent(searchQuery.trim())}`
					: `/search?q=${encodeURIComponent(searchQuery.trim())}`
			router.push(path)
			setSearchQuery('')
			setSuggestions([])
			setShowSuggestions(false)
		}
	}

	return (
		<div className="w-full h-full relative">
			<div className="w-full h-full flex items-center justify-between px-4 md:px-8">
				{/* Logo */}
				<h1 className="text-xl font-bold text-primary flex items-center shrink-0">
					<RiMovie2AiFill className="size-7 md:size-9 text-text" />
					<span className="text-wite text-2xl md:text-4xl">Movie</span>
					<span className="text-primary text-xl md:text-2xl">Cast</span>
				</h1>

				{/* Search Bar - Center */}
				<div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
					<div className="relative w-full">
						<input
							type="text"
							value={searchQuery}
							onChange={e => {
								setSearchQuery(e.target.value)
								setShowSuggestions(true)
							}}
							onKeyDown={handleSearch}
							onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
							onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
							placeholder={
								mode === 'anime' ? 'Search anime...' : 'Search movies...'
							}
							className="w-full py-2 pl-10 pr-4 bg-card-bg border border-cblue/30 rounded-full text-wite placeholder-cblue/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
						/>
						<svg
							className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cblue/60"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>

						{/* Suggestions Dropdown */}
						{showSuggestions && suggestions.length > 0 && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-background border border-cblue/30 rounded-xl overflow-hidden shadow-xl z-50">
								{suggestions.map(item => (
									<button
										key={item.id}
										onMouseDown={() => {
											if (item.isAnime) {
												window.open(
													`https://myanimelist.net/anime/${item.id}`,
													'_blank'
												)
											} else {
												router.push(`/details/${item.id}`)
											}
											setSearchQuery('')
											setSuggestions([])
											setShowSuggestions(false)
										}}
										className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-card-bg transition-colors duration-150 cursor-pointer"
									>
										<img
											src={
												item.isAnime
													? item.poster_path
													: item.poster_path
														? `https://image.tmdb.org/t/p/w92${item.poster_path}`
														: '/placeholder.png'
											}
											alt={item.title}
											className="w-8 h-11 object-cover rounded shrink-0"
										/>
										<div className="text-left">
											<p className="text-white text-sm font-medium truncate">
												{item.title}
											</p>
											<p className="text-cblue text-xs">
												{item.release_date?.split('-')[0]} • ★{' '}
												{item.vote_average?.toFixed(1)}
											</p>
										</div>
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Right Side Actions - Desktop */}
				<ul className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
					<FeedbackModal />
					<a
						href="https://buymeacoffee.com/moviecast"
						target="_blank"
						className="flex items-center py-1.5 px-3 bg-primary text-background cursor-pointer duration-300 ease-in-out hover:bg-text rounded-xl text-sm font-semibold"
					>
						<PiCoffeeBold className="mr-2 size-4" />
						Buy me a coffee
					</a>
				</ul>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="md:hidden flex flex-col gap-1.5 p-2"
				>
					<span
						className={`w-6 h-0.5 bg-wite transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
					></span>
					<span
						className={`w-6 h-0.5 bg-wite transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
					></span>
					<span
						className={`w-6 h-0.5 bg-wite transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
					></span>
				</button>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden absolute bg-background top-full left-0 w-full bg-card-bg border-t border-cblue/20 transition-all duration-300 z-50 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
			>
				{/* Mobile Search */}
				<div className="p-4">
					<div className="relative w-full">
						<input
							type="text"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							placeholder="Search movies..."
							className="w-full py-2.5 pl-10 pr-4 bg-background border border-cblue/30 rounded-full text-wite placeholder-cblue/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
						/>
						<svg
							className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cblue/60"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Mobile Action Buttons */}
				<div className="flex flex-col gap-3 px-4 pb-4">
					<FeedbackModal />

					<a
						href="https://buymeacoffee.com/moviecast"
						className="flex items-center justify-center py-2.5 px-3 bg-primary text-background rounded-xl text-sm font-semibold"
					>
						<PiCoffeeBold className="mr-2 size-4" />
						Buy me a coffee
					</a>
				</div>
			</div>
		</div>
	)
}

export default NavBar
