'use client'

import Link from 'next/link'
import { useRef } from 'react'

const getBadgeColor = (badge: string | null) => {
	switch (badge) {
		case 'NEW':
			return 'bg-primary text-background'
		case 'HOT':
			return 'bg-text text-wite'
		case 'REMASTER':
			return 'bg-cblue text-wite'
		default:
			return ''
	}
}

const getDaysAgo = (dateStr: string) => {
	const today = new Date()
	const release = new Date(dateStr)
	const diff = Math.floor(
		(today.getTime() - release.getTime()) / (1000 * 60 * 60 * 24)
	)
	if (diff === 0) return 'Today'
	if (diff === 1) return 'Yesterday'
	return `${diff} days ago`
}

const JustDroppedClient = ({ movies }: { movies: any[] }) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const containerWidth = scrollRef.current.offsetWidth
			scrollRef.current.scrollBy({
				left: direction === 'left' ? -containerWidth : containerWidth,
				behavior: 'smooth'
			})
		}
	}

	return (
		<section className="py-8 px-6">
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-xl font-bold text-wite">Just Dropped</h2>
				<span className="text-sm text-text font-medium">
					{movies.length} titles
				</span>
			</div>

			<div className="relative group/scroll">
				<button
					onClick={() => scroll('left')}
					className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-cblue hover:bg-primary text-wite rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 -translate-x-1/2"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<button
					onClick={() => scroll('right')}
					className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-cblue hover:bg-primary text-wite rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 translate-x-1/2"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>

				<div
					ref={scrollRef}
					className="flex gap-3 overflow-x-auto pb-4"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{movies.map((movie: any) => (
						<Link
							href={`/details/${movie.id}`}
							key={movie.id}
							className="shrink-0 w-44 group cursor-pointer"
						>
							<div className="relative rounded-lg overflow-hidden bg-card-bg mb-2">
								<img
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
											: '/placeholder.png'
									}
									alt={movie.title}
									className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 text-white"
								/>
								<div className="absolute bottom-2 right-2">
									<span className="px-1.5 py-0.5 text-xs font-bold rounded bg-background/80 text-primary backdrop-blur-sm">
										★{' '}
										{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
									</span>
								</div>
								<div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent"></div>
							</div>
							<div className="space-y-1.5">
								<span className="text-text text-xs font-medium">
									{getDaysAgo(movie.release_date)}
								</span>
								<h3 className="text-wite font-medium text-sm truncate group-hover:text-primary transition-colors">
									{movie.title}
								</h3>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}

export default JustDroppedClient
