import { searchAnime } from '@/lib/jikan'

const getYearByItSelf = (aired: { from: string | null }) => {
	if (!aired?.from) return 'TBA'
	const release = new Date(aired.from)
	return release.getFullYear()
}
export default async function AnimeSearchPage({
	searchParams
}: {
	searchParams: Promise<{ q: string }>
}) {
	const { q } = await searchParams
	const anime = await searchAnime(q)

	return (
		<div className="min-h-screen bg-background px-6 py-10">
			<h1 className="text-white text-2xl font-bold mb-2">
				Anime results for <span className="text-primary">"{q}"</span>
			</h1>
			<p className="text-cblue text-sm mb-8">{anime.length} titles found</p>
			<a
				href="/"
				className="text-primary hover:underline mb-6 inline-block"
			>
				← Go Back
			</a>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{anime.map((item: any) => (
					<a
						href={item.url}
						target="_blank"
						rel="noreferrer"
						key={item.mal_id}
						className="group cursor-pointer"
					>
						<div className="relative rounded-lg overflow-hidden bg-card-bg mb-2">
							<img
								src={item.images?.jpg?.large_image_url || '/placeholder.png'}
								alt={item.title}
								className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							{item.score && (
								<div className="absolute top-2 right-2">
									<span className="px-1.5 py-0.5 text-xs font-bold rounded bg-primary text-white">
										★ {item.score.toFixed(1)}
									</span>
								</div>
							)}
						</div>
						<h3 className="text-white text-sm font-medium truncate group-hover:text-primary transition-colors">
							{item.title_english ?? item.title}
						</h3>
						<p className="text-cblue text-xs">{getYearByItSelf(item.aired)}</p>
					</a>
				))}
			</div>
			{anime.length === 0 && (
				<div className="text-center py-20">
					<p className="text-cblue text-lg">No anime found for "{q}"</p>
				</div>
			)}
		</div>
	)
}
