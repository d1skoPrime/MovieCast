import { searchMovies } from '@/lib/tmdb'
import Link from 'next/link'

export default async function SearchPage({
	searchParams
}: {
	searchParams: Promise<{ q: string }>
}) {
	const { q } = await searchParams
	const movies = await searchMovies(q)

	return (
		<div className="min-h-screen bg-background px-6 py-10">
			<h1 className="text-white text-2xl font-bold mb-2">
				Results for <span className="text-primary">"{q}"</span>
			</h1>
			<p className="text-cblue text-sm mb-8">{movies.length} movies found</p>

			<a
				href="/"
				className="text-primary hover:underline mb-6 inline-block"
			>
				← Go Back
			</a>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{movies.map((movie: any) => (
					<Link
						href={`/details/${movie.id}`}
						key={movie.id}
						className="group cursor-pointer"
					>
						<div className="relative rounded-lg overflow-hidden bg-card-bg mb-2">
							<img
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: '/placeholder.png'
								}
								alt={movie.title}
								className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<div className="absolute top-2 right-2">
								<span className="px-1.5 py-0.5 text-xs font-bold rounded bg-primary text-white">
									★ {movie.vote_average.toFixed(1)}
								</span>
							</div>
						</div>
						<h3 className="text-white text-sm font-medium truncate group-hover:text-primary transition-colors">
							{movie.title}
						</h3>
						<p className="text-cblue text-xs">
							{movie.release_date?.split('-')[0]}
						</p>
					</Link>
				))}
			</div>
			{movies.length === 0 && (
				<div className="text-center py-20">
					<p className="text-cblue text-lg">No movies found for "{q}"</p>
				</div>
			)}
		</div>
	)
}
