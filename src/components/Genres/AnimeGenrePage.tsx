'use client'
import { Anime } from '@/types/types'
import { useRef, useState } from 'react'
import { getAirDate } from '../Anime/AnimeUpcoming'

type Props = { anime: Anime[]; genreId: string }

const AnimeGenrePage = ({ anime, genreId }: Props) => {
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
	const seenIds = useRef<Set<number>>(new Set(anime.map(a => a.mal_id)))

	const openModal = (item: Anime) => {
		setSelectedAnime(item)
		setIsModalOpen(true)
	}
	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedAnime(null)
	}

	const loadMore = async (currentPage = page) => {
		setIsLoading(true)
		try {
			const res = await fetch(
				`/api/anime-genre?genreId=${genreId}&page=${currentPage}`
			)
			const newAnime: Anime[] = await res.json()
			if (newAnime.length === 0) {
				setHasMore(false)
				return
			}
			const unique = newAnime.filter(a => !seenIds.current.has(a.mal_id))
			unique.forEach(a => seenIds.current.add(a.mal_id))
			const nextPage = currentPage + 1
			setPage(nextPage)
			if (unique.length === 0 && currentPage < 20) {
				await loadMore(nextPage)
				return
			}
			if (unique.length > 0) setItems(prev => [...prev, ...unique])
			if (newAnime.length < 25) setHasMore(false)
		} catch {
			console.error('failed')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-background px-6 py-10">
			<a
				href="/"
				className="text-primary hover:underline mb-6 inline-block cursor-pointer"
			>
				← Back
			</a>
			<h1 className="text-white text-2xl font-bold mb-2">Anime Movies</h1>
			<p className="text-cblue text-sm mb-8">{items.length} titles</p>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{items.map(item => (
					<div
						key={item.mal_id}
						onClick={() => openModal(item)}
						className="cursor-pointer group"
					>
						<div className="relative rounded-lg overflow-hidden bg-card-bg group-hover:scale-105 transition-all duration-300">
							<div className="relative h-56 overflow-hidden">
								<img
									src={item.images?.jpg?.large_image_url || '/placeholder.svg'}
									alt={item.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
								{item.score && (
									<div className="absolute top-2 right-2">
										<span className="text-xs font-bold px-2 py-1 rounded bg-cblue text-wite">
											★ {item.score.toFixed(1)}
										</span>
									</div>
								)}
							</div>
							<div className="p-3">
								<h3 className="text-sm font-semibold text-wite line-clamp-2 mb-1 group-hover:text-primary transition-colors">
									{item.title}
								</h3>
								<p className="text-xs text-primary font-medium">
									{getAirDate(item.aired)}
								</p>
								<div className="flex flex-wrap gap-1 mt-1">
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
						className="px-8 py-2.5 bg-card-bg border border-cblue/30 text-wite rounded-full hover:border-primary transition-all duration-300 text-sm disabled:opacity-50"
					>
						{isLoading ? 'Loading...' : 'Load More'}
					</button>
				</div>
			)}

			{/* Modal - same as other anime modals */}
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
								{selectedAnime.synopsis && (
									<div className="mt-4">
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
										className="flex-1 py-2 px-4 bg-primary text-background font-semibold rounded-lg text-center"
									>
										View on MAL
									</a>
									<button
										onClick={closeModal}
										className="py-2 px-4 bg-wite/10 text-wite rounded-lg"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnimeGenrePage
