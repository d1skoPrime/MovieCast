'use client'
import { Anime } from '@/types/types'
import { useRef, useState } from 'react'
import { getAirDate } from './AnimeUpcoming'

type Props = { anime: Anime[] }

const ExploreMoreClient = ({ anime }: Props) => {
	const [items, setItems] = useState<Anime[]>(() => {
		const seen = new Set<number>()
		return anime.filter(a => {
			if (seen.has(a.mal_id)) return false
			seen.add(a.mal_id)
			return true
		})
	})
	const [page, setPage] = useState(2)
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isHidden, setIsHidden] = useState(false)

	const openModal = (item: Anime) => {
		setSelectedAnime(item)
		setIsModalOpen(true)
	}
	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedAnime(null)
	}
	const seenIds = useRef<Set<number>>(new Set(anime.map(a => a.mal_id)))

	const loadMore = async (currentPage = page) => {
		setIsLoading(true)
		try {
			const res = await fetch(`/api/anime-released?page=${currentPage}`)
			const newAnime: Anime[] = await res.json()

			if (newAnime.length === 0) {
				setHasMore(false)
				setIsLoading(false)
				return
			}

			const unique = newAnime.filter(a => !seenIds.current.has(a.mal_id))
			unique.forEach(a => seenIds.current.add(a.mal_id))

			const nextPage = currentPage + 1
			setPage(nextPage)

			if (unique.length === 0) {
				// entire page was duplicates, auto-fetch next page
				if (currentPage < 20) {
					await loadMore(nextPage)
				} else {
					setHasMore(false)
					setIsLoading(false)
				}
				return
			}

			setItems(prev => [...prev, ...unique])
			if (newAnime.length < 25) setHasMore(false)
		} catch {
			console.error('Failed to load more anime')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="w-full py-8 px-4">
			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<h2 className="text-xl font-bold text-wite">Explore More</h2>
				<span className="text-sm text-primary bg-primary/20 px-2 py-0.5 rounded-full">
					{items.length} titles
				</span>
				<button
					onClick={() => setIsHidden(!isHidden)}
					className="ml-auto text-xs text-cblue hover:text-white transition-colors px-3 py-1 rounded-lg border border-cblue/30 hover:border-primary"
				>
					{isHidden ? 'Show' : 'Hide'}
				</button>
			</div>

			{/* Grid */}
			{!isHidden && (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{items.map(item => (
							<div
								key={item.mal_id}
								onClick={() => openModal(item)}
								className="cursor-pointer group"
							>
								<div className="relative rounded-lg overflow-hidden bg-card-bg hover:bg-card-hover transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
									<div className="relative h-56 overflow-hidden">
										<img
											src={
												item.images?.jpg?.large_image_url ||
												item.images?.jpg?.image_url ||
												'/placeholder.svg'
											}
											alt={item.title}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
										<div className="absolute top-2 left-2">
											<span className="text-xs font-semibold px-2 py-1 rounded bg-primary text-background">
												{item.type || 'N/A'}
											</span>
										</div>
										{item.score && (
											<div className="absolute top-2 right-2">
												<span className="text-xs font-bold px-2 py-1 rounded bg-cblue text-wite">
													★ {item.score.toFixed(1)}
												</span>
											</div>
										)}
										<div className="absolute bottom-2 left-2">
											<span
												className={`text-xs font-medium px-2 py-1 rounded ${item.status === 'Not yet aired' ? 'bg-text/90 text-wite' : item.status === 'Currently Airing' ? 'bg-green-600 text-wite' : 'bg-cblue text-wite'}`}
											>
												{item.status}
											</span>
										</div>
									</div>
									<div className="p-3">
										<h3 className="text-sm font-semibold text-wite line-clamp-2 mb-1 group-hover:text-primary transition-colors">
											{item.title}
										</h3>
										{item.title_english &&
											item.title_english !== item.title && (
												<p className="text-xs text-cblue line-clamp-1 mb-1">
													{item.title_english}
												</p>
											)}
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
					</div>

					{hasMore && (
						<div className="flex justify-center mt-8">
							<button
								onClick={() => loadMore()}
								disabled={isLoading}
								className="px-8 py-2.5 bg-card-bg border border-cblue/30 text-wite rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 text-sm font-medium disabled:opacity-50"
							>
								{isLoading ? 'Loading...' : 'Load More'}
							</button>
						</div>
					)}
				</>
			)}

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
							<div className="md:w-1/3 shrink-0">
								<img
									src={
										selectedAnime.images?.jpg?.large_image_url ||
										'/placeholder.svg'
									}
									alt={selectedAnime.title}
									className="w-full h-64 md:h-full object-cover md:rounded-l-xl"
								/>
							</div>
							<div className="flex-1 p-6">
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
								<div className="flex flex-wrap gap-3 mb-4">
									{selectedAnime.score && (
										<div className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
											<span className="text-sm font-semibold text-primary">
												★ {selectedAnime.score.toFixed(1)}
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
									<div>
										<span className="text-wite/60">Members:</span>
										<span className="ml-2 text-wite">
											{selectedAnime.members?.toLocaleString()}
										</span>
									</div>
								</div>
								{selectedAnime.genres?.length > 0 && (
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
								{selectedAnime.themes?.length > 0 && (
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
								{selectedAnime.studios?.length > 0 && (
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

export default ExploreMoreClient
