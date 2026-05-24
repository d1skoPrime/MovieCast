'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { FaList } from 'react-icons/fa'
import { MdGridView } from 'react-icons/md'

const getLanguageName = (code: string) => {
	try {
		return (
			new Intl.DisplayNames(['en'], { type: 'language' }).of(code) ??
			code.toUpperCase()
		)
	} catch {
		return code.toUpperCase()
	}
}

const getDaysUntil = (dateStr: string) => {
	const release = new Date(dateStr)
	const today = new Date()
	const diff = Math.ceil(
		(release.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	)
	if (diff === 0) return 'Today'
	if (diff === 1) return 'Tomorrow'
	if (diff < 0) return 'Out now'
	return `In ${diff} days`
}

const UpcomingClient = ({ movies }: { movies: any[] }) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [view, setView] = useState<'grid' | 'list'>('grid')

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: direction === 'left' ? -300 : 300,
				behavior: 'smooth'
			})
		}
	}

	return (
		<section className="py-8 px-4 md:px-6">
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-lg md:text-xl font-bold text-white">Coming Up</h2>
				<span className="text-xs md:text-sm text-primary font-medium">
					{movies.length} releases
				</span>
				<div className="ml-auto flex items-center gap-2">
					<button
						onClick={() => setView('grid')}
						className={`p-2 rounded-full transition-colors duration-300 cursor-pointer ${view === 'grid' ? 'bg-primary text-white' : 'bg-background/50 text-white hover:bg-primary'}`}
					>
						<MdGridView className="size-4 md:size-5" />
					</button>
					<button
						onClick={() => setView('list')}
						className={`p-2 rounded-full transition-colors duration-300 cursor-pointer ${view === 'list' ? 'bg-primary text-white' : 'bg-background/50 text-white hover:bg-primary'}`}
					>
						<FaList className="size-4 md:size-5" />
					</button>
				</div>
			</div>

			{/* Grid View */}
			{view === 'grid' && (
				<div className="relative group/scroll">
					<button
						onClick={() => scroll('left')}
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-primary text-white rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 -translate-x-1/2"
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
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-primary text-white rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300 translate-x-1/2"
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
						className="flex gap-3 md:gap-4 overflow-x-auto pb-4"
						style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
					>
						{movies.map((movie: any) => (
							<div
								key={movie.id}
								className="shrink-0 w-40 md:w-56 group cursor-pointer"
							>
								<div className="relative rounded-lg overflow-hidden bg-gray-800 mb-3">
									<img
										src={
											movie.poster_path
												? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
												: '/placeholder.png'
										}
										alt={movie.title}
										className="w-full h-60 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute top-2 right-2 md:top-3 md:right-3">
										<span className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-bold rounded bg-primary text-white">
											★ {movie.vote_average.toFixed(1)}
										</span>
									</div>
									<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
										<Link
											className="w-full py-1.5 md:py-2 px-2 text-center bg-primary cursor-pointer hover:bg-primary/10 duration-300 ease-in-out text-white font-semibold rounded-lg text-xs md:text-sm"
											href={`/details/${movie.id}`}
										>
											View Details
										</Link>
									</div>
								</div>
								<div className="space-y-1">
									<span className="text-primary text-xs md:text-sm font-medium">
										{getDaysUntil(movie.release_date)}
									</span>
									<h3 className="text-white font-semibold text-sm md:text-base truncate group-hover:text-primary transition-colors">
										{movie.title}
									</h3>
									<p className="text-gray-400 text-xs line-clamp-2 hidden md:block">
										{movie.overview}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* List View - Responsive */}
			{view === 'list' && (
				<div className="flex flex-col gap-1">
					{/* Table Header - Hidden on Mobile */}
					<div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-cblue uppercase tracking-wider border-b border-cblue/20">
						<span className="col-span-1">Release</span>
						<span className="col-span-4">Title</span>
						<span className="col-span-3">Genre</span>
						<span className="col-span-2">Language</span>
						<span className="col-span-1">Rating</span>
						<span className="col-span-1"></span>
					</div>

					{movies.map((movie: any) => (
						<div key={movie.id}>
							{/* Mobile Card View */}
							<div className="md:hidden flex gap-3 p-3 rounded-lg bg-card-bg/50 border border-cblue/10 mb-2">
								<img
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
											: '/placeholder.png'
									}
									alt={movie.title}
									className="w-16 h-24 object-cover rounded shrink-0"
								/>
								<div className="flex flex-col justify-between flex-1 min-w-0">
									<div>
										<span className="text-primary text-xs font-medium">
											{getDaysUntil(movie.release_date)}
										</span>
										<h3 className="text-white text-sm font-semibold truncate">
											{movie.title}
										</h3>
										<div className="flex flex-wrap gap-1 mt-1">
											{movie.genres?.slice(0, 2).map((genre: string) => (
												<span
													key={genre}
													className="px-1.5 py-0.5 text-xs rounded bg-cblue/20 text-cblue border border-cblue/30"
												>
													{genre}
												</span>
											))}
										</div>
									</div>
									<div className="flex items-center justify-between mt-2">
										<div className="flex items-center gap-2">
											<span className="text-white text-xs">
												★ {movie.vote_average.toFixed(1)}
											</span>
											<span className="text-cblue text-xs uppercase">
												{getLanguageName(movie.original_language)}
											</span>
										</div>
										<Link
											href={`/details/${movie.id}`}
											className="text-xs px-2 py-1 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200"
										>
											Details
										</Link>
									</div>
								</div>
							</div>

							{/* Desktop Table Row */}
							<div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-card-bg transition-colors duration-200 items-center border-b border-cblue/10">
								{/* Release */}
								<span className="col-span-1 text-primary text-sm font-medium whitespace-nowrap">
									{getDaysUntil(movie.release_date)}
								</span>

								{/* Title */}
								<div className="col-span-4 flex items-center gap-3">
									<img
										src={
											movie.poster_path
												? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
												: '/placeholder.png'
										}
										alt={movie.title}
										className="w-8 h-11 object-cover rounded shrink-0"
									/>
									<span className="text-white text-sm font-semibold truncate">
										{movie.title}
									</span>
								</div>

								{/* Genres */}
								<div className="col-span-3 flex flex-wrap gap-1">
									{movie.genres?.slice(0, 2).map((genre: string) => (
										<span
											key={genre}
											className="px-2 py-0.5 text-xs rounded bg-cblue/20 text-cblue border border-cblue/30"
										>
											{genre}
										</span>
									))}
								</div>

								{/* Language */}
								<span className="col-span-2 text-cblue text-sm uppercase">
									{getLanguageName(movie.original_language)}
								</span>

								{/* Rating */}
								<span className="col-span-1 text-white text-sm">
									★ {movie.vote_average.toFixed(1)}
								</span>

								{/* Action */}
								<div className="col-span-1">
									<Link
										href={`/details/${movie.id}`}
										className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200 whitespace-nowrap"
									>
										Details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	)
}

export default UpcomingClient
