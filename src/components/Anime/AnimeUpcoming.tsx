'use client'

import { Anime } from '@/types/types'
import { useRef, useState } from 'react'

export const getAirDate = (aired: { from: string | null; string?: string }) => {
	if (!aired?.from) return 'TBA'

	const release = new Date(aired.from)
	// Catch any unparseable invalid dates safely
	if (isNaN(release.getTime())) {
		return aired.string || 'Unknown Date'
	}

	const today = new Date()
	today.setHours(0, 0, 0, 0)

	// Calculate day difference cleanly
	const diff = Math.ceil(
		(release.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	)

	// 1. Future Dates (Upcoming)
	if (diff > 1) return `In ${diff} days`
	if (diff === 1) return 'Tomorrow'
	if (diff === 0) return 'Today'

	// 2. Past Dates (Released) - Format as a clean calendar date
	// Returns clean strings like "Jan 25, 2024"
	return release.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	})
}

type Props = {
	anime: Anime[]
	onLoadMore?: () => void
	isLoadingMore?: boolean
}

const AnimeUpcoming = ({ anime, onLoadMore, isLoadingMore }: Props) => {
	const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)

	const sortedAnime = [...anime].sort((a, b) => {
		const dateA = a.aired?.from ? new Date(a.aired.from).getTime() : Infinity
		const dateB = b.aired?.from ? new Date(b.aired.from).getTime() : Infinity

		// Soonest release date first. TBA (Infinity) goes to the very end.
		return dateA - dateB
	})

	const openModal = (item: Anime) => {
		setSelectedAnime(item)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedAnime(null)
	}

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
		<section className="w-full py-8">
			<div className="flex items-center justify-between mb-6 px-4">
				<div className="flex items-center gap-3">
					<h2 className="text-xl font-bold text-wite">Upcoming Anime</h2>
					<span className="text-sm text-primary bg-primary/20 px-2 py-0.5 rounded-full">
						{anime.length} titles
					</span>
				</div>
			</div>

			{/* Horizontal Scrolling Cards */}
			<div className="relative group/scroll px-4">
				{/* Left Arrow */}
				<button
					onClick={() => scroll('left')}
					className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-primary text-wite rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300"
				>
					<svg
						className="w-5 h-5"
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

				{/* Right Arrow */}
				<button
					onClick={() => scroll('right')}
					className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 hover:bg-primary text-wite rounded-full opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300"
				>
					<svg
						className="w-5 h-5"
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
					className="flex gap-4 overflow-x-auto pb-4"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{sortedAnime.map(item => (
						<div
							key={item.mal_id}
							onClick={() => openModal(item)}
							className="shrink-0 w-44 sm:w-48 cursor-pointer group"
						>
							{/* Card */}
							<div className="relative rounded-lg overflow-hidden bg-card-bg hover:bg-card-hover transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
								{/* Image */}
								<div className="relative h-56 sm:h-64 overflow-hidden">
									<img
										src={
											item.images?.jpg?.large_image_url ||
											item.images?.jpg?.image_url ||
											'/placeholder.svg'
										}
										alt={item.title}
										className="w-full h-full object-cover"
									/>
									{/* Gradient Overlay */}
									<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

									{/* Type Badge */}
									<div className="absolute top-2 left-2">
										<span className="text-xs font-semibold px-2 py-1 rounded bg-primary text-background">
											{item.type || 'N/A'}
										</span>
									</div>

									{/* Score Badge */}
									{item.score && (
										<div className="absolute top-2 right-2">
											<span className="text-xs font-bold px-2 py-1 rounded bg-cblue text-wite">
												{item.score.toFixed(1)}
											</span>
										</div>
									)}

									{/* Status Badge */}
									<div className="absolute bottom-2 left-2">
										<span
											className={`text-xs font-medium px-2 py-1 rounded ${
												item.status === 'Not yet aired'
													? 'bg-text/90 text-wite'
													: item.status === 'Currently Airing'
														? 'bg-green-600 text-wite'
														: 'bg-cblue text-wite'
											}`}
										>
											{item.status}
										</span>
									</div>
								</div>

								{/* Content */}
								<div className="p-3">
									<h3 className="text-sm font-semibold text-wite line-clamp-2 mb-1 group-hover:text-primary transition-colors">
										{item.title}
									</h3>
									{item.title_english && item.title_english !== item.title && (
										<p className="text-xs text-cblue line-clamp-1 mb-1">
											{item.title_english}
										</p>
									)}
									{/* Release countdown */}
									<p className="text-xs text-primary font-medium mb-2">
										{getAirDate(item.aired)}
									</p>
									<div className="flex flex-wrap gap-1">
										{item.genres?.slice(0, 2).map(genre => (
											<span
												key={genre.mal_id}
												className="text-xs px-1.5 py-0.5 rounded bg-background text-cblue"
											>
												{genre.name}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
					{/* Load More Button at end of scroll */}
					{onLoadMore && (
						<div className="shrink-0 flex items-center justify-center w-44 sm:w-48">
							<button
								onClick={onLoadMore}
								disabled={isLoadingMore}
								className="px-4 py-2 bg-card-bg border border-cblue/30 text-wite rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 text-sm disabled:opacity-50 whitespace-nowrap"
							>
								{isLoadingMore ? 'Loading...' : 'Load More'}
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && selectedAnime && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
					onClick={closeModal}
				>
					<div
						className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card-bg rounded-xl shadow-2xl"
						onClick={e => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 hover:bg-primary text-wite transition-colors"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>

						<div className="flex flex-col md:flex-row">
							{/* Poster */}
							<div className="md:w-1/3 shrink-0">
								<img
									src={
										selectedAnime.images?.jpg?.large_image_url ||
										selectedAnime.images?.jpg?.image_url ||
										'/placeholder.svg'
									}
									alt={selectedAnime.title}
									className="w-full h-64 md:h-full object-cover md:rounded-l-xl"
								/>
							</div>

							{/* Content */}
							<div className="flex-1 p-6">
								{/* Title */}
								<h2 className="text-2xl font-bold text-wite mb-1">
									{selectedAnime.title}
								</h2>
								{selectedAnime.title_english && (
									<p className="text-sm text-cblue mb-1">
										{selectedAnime.title_english}
									</p>
								)}
								{selectedAnime.title_japanese && (
									<p className="text-xs text-wite/60 mb-4">
										{selectedAnime.title_japanese}
									</p>
								)}

								{/* Stats Row */}
								<div className="flex flex-wrap gap-3 mb-4">
									{selectedAnime.score && (
										<div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
											<svg
												className="w-4 h-4 text-primary"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
											<span className="text-sm font-semibold text-primary">
												{selectedAnime.score.toFixed(1)}
											</span>
										</div>
									)}
									<div className="flex items-center gap-1 bg-cblue/20 px-3 py-1 rounded-full">
										<span className="text-sm text-cblue">
											{selectedAnime.type}
										</span>
									</div>
									{selectedAnime.episodes && (
										<div className="flex items-center gap-1 bg-cblue/20 px-3 py-1 rounded-full">
											<span className="text-sm text-cblue">
												{selectedAnime.episodes} eps
											</span>
										</div>
									)}
									<div className="flex items-center gap-1 bg-text/20 px-3 py-1 rounded-full">
										<span className="text-sm text-text">
											{selectedAnime.status}
										</span>
									</div>
								</div>

								{/* Info Grid */}
								<div className="grid grid-cols-2 gap-3 mb-4 text-sm">
									<div>
										<span className="text-wite/60">Source:</span>
										<span className="ml-2 text-wite">
											{selectedAnime.source || 'Unknown'}
										</span>
									</div>
									<div>
										<span className="text-wite/60">Duration:</span>
										<span className="ml-2 text-wite">
											{selectedAnime.duration || 'Unknown'}
										</span>
									</div>
									<div>
										<span className="text-wite/60">Rating:</span>
										<span className="ml-2 text-wite">
											{selectedAnime.rating || 'Unknown'}
										</span>
									</div>
									<div>
										<span className="text-wite/60">Popularity:</span>
										<span className="ml-2 text-wite">
											#{selectedAnime.popularity}
										</span>
									</div>
									{selectedAnime.season && selectedAnime.year && (
										<div>
											<span className="text-wite/60">Season:</span>
											<span className="ml-2 text-wite capitalize">
												{selectedAnime.season} {selectedAnime.year}
											</span>
										</div>
									)}
									<div>
										<span className="text-wite/60">Members:</span>
										<span className="ml-2 text-wite">
											{selectedAnime.members.toLocaleString()}
										</span>
									</div>
								</div>

								{/* Genres */}
								{selectedAnime.genres && selectedAnime.genres.length > 0 && (
									<div className="mb-4">
										<span className="text-sm text-wite/60 block mb-2">
											Genres
										</span>
										<div className="flex flex-wrap gap-2">
											{selectedAnime.genres.map(genre => (
												<span
													key={genre.mal_id}
													className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
												>
													{genre.name}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Themes */}
								{selectedAnime.themes && selectedAnime.themes.length > 0 && (
									<div className="mb-4">
										<span className="text-sm text-wite/60 block mb-2">
											Themes
										</span>
										<div className="flex flex-wrap gap-2">
											{selectedAnime.themes.map(theme => (
												<span
													key={theme.mal_id}
													className="text-xs px-2 py-1 rounded-full bg-cblue/20 text-cblue"
												>
													{theme.name}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Studios */}
								{selectedAnime.studios && selectedAnime.studios.length > 0 && (
									<div className="mb-4">
										<span className="text-sm text-wite/60 block mb-2">
											Studios
										</span>
										<div className="flex flex-wrap gap-2">
											{selectedAnime.studios.map(studio => (
												<span
													key={studio.mal_id}
													className="text-xs px-2 py-1 rounded-full bg-wite/10 text-wite"
												>
													{studio.name}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Synopsis */}
								{selectedAnime.synopsis && (
									<div>
										<span className="text-sm text-wite/60 block mb-2">
											Synopsis
										</span>
										<p className="text-sm text-wite/80 leading-relaxed">
											{selectedAnime.synopsis}
										</p>
									</div>
								)}

								{/* Action Buttons */}
								<div className="flex gap-3 mt-6">
									<a
										href={selectedAnime.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 py-2 px-4 bg-primary text-background font-semibold rounded-lg text-center hover:bg-primary/90 transition-colors"
									>
										View on MAL
									</a>
									<button
										onClick={closeModal}
										className="py-2 px-4 bg-wite/10 text-wite rounded-lg hover:bg-wite/20 transition-colors"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default AnimeUpcoming
