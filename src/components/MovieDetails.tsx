'use client'
type Props = {
	title: string
	original_title?: string
	original_language?: string
	overview: string
	poster_path: string | null
	backdrop_path?: string | null
	release_date: string
	vote_average: number
	vote_count?: number
	popularity?: number
	adult?: boolean
	media_type: string
	genres?: string[]
	origin_country?: string
	runtime?: number
	tagline?: string
}

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

const streamingPlatforms = [
	{ name: 'Netflix', color: '#E50914', icon: 'N' },
	{ name: 'Prime Video', color: '#00A8E1', icon: 'P' },
	{ name: 'Disney+', color: '#113CCF', icon: 'D+' },
	{ name: 'HBO Max', color: '#B535F6', icon: 'HBO' },
	{ name: 'Hulu', color: '#1CE783', icon: 'H' },
	{ name: 'Apple TV+', color: '#555555', icon: 'TV+' }
]

const MovieDetails = (props: Props) => {
	const ratingPercentage = (props.vote_average / 10) * 100

	return (
		<div className="bg-card-bg border border-cblue/30 rounded-2xl max-w-5xl mx-auto overflow-hidden shadow-2xl shadow-primary/5">
			<div className="flex flex-col lg:flex-row">
				{/* Left Side - Poster Image */}
				<div className="lg:w-[320px] shrink-0 relative">
					<img
						src={
							props.poster_path
								? `https://image.tmdb.org/t/p/w500${props.poster_path}`
								: '/placeholder.png'
						}
						alt={props.title}
						className="w-full h-full  min-h-100 lg:min-h-125"
					/>
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-card-bg via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-card-bg" />

					{/* Media Type Badge */}
					<div className="absolute top-4 left-4">
						<span className="px-3 py-1 bg-primary text-background text-xs font-bold rounded-full uppercase tracking-wider">
							{props.media_type}
						</span>
					</div>
				</div>

				{/* Right Side - Content */}
				<div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
					{/* Back Button */}
					<button
						onClick={() => window.history.back()}
						className="flex items-center gap-2 text-cblue hover:text-white transition-colors duration-200 mb-6 group w-fit cursor-pointer"
					>
						<svg
							className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
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
						<span className="text-sm font-medium">Back</span>
					</button>
					{/* Title and Rating Row */}
					<div>
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
							<h1 className="text-3xl lg:text-4xl font-bold text-wite leading-tight">
								{props.title}
							</h1>

							{/* Rating Circle */}
							<div className="flex items-center gap-3 shrink-0">
								<div className="relative w-16 h-16">
									<svg
										className="w-16 h-16 -rotate-90"
										viewBox="0 0 36 36"
									>
										<path
											d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
											fill="none"
											stroke="#1a1f2e"
											strokeWidth="3"
										/>
										<path
											d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
											fill="none"
											stroke={
												ratingPercentage >= 70
													? '#22c55e'
													: ratingPercentage >= 50
														? '#f4ac45'
														: '#a61c3c'
											}
											strokeWidth="3"
											strokeDasharray={`${ratingPercentage}, 100`}
											strokeLinecap="round"
										/>
									</svg>
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-wite font-bold text-sm">
											{props.vote_average.toFixed(1)}
										</span>
									</div>
								</div>
								<div className="text-xs text-cblue">
									<div>User</div>
									<div>Score</div>
								</div>
							</div>
						</div>

						{/* Release Date */}
						<div className="flex items-center gap-2 mb-6">
							<svg
								className="w-5 h-5 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span className="text-cblue text-sm">Release Date:</span>
							<span className="text-wite font-medium">
								{new Date(props.release_date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</span>
						</div>

						{/* Overview */}
						<div className="mb-8">
							<h2 className="text-lg font-semibold text-wite mb-3">Overview</h2>
							<p className="text-cblue leading-relaxed text-sm lg:text-base">
								{props.overview}
							</p>
						</div>
					</div>

					{/* Origin Country */}
					{props.origin_country && (
						<div className="flex items-center gap-2 mb-4">
							<svg
								className="w-5 h-5 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
								/>
							</svg>
							<span className="text-cblue text-sm">Country:</span>
							<span className="text-wite font-medium">
								{props.origin_country}
							</span>
						</div>
					)}

					{/* Genres */}
					{props.genres && props.genres.length > 0 && (
						<div className="flex items-center gap-2 mb-6 flex-wrap">
							<svg
								className="w-5 h-5 text-primary shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z"
								/>
							</svg>
							<span className="text-cblue text-sm">Genres:</span>
							<div className="flex gap-2 flex-wrap">
								{props.genres.map(genre => (
									<span
										key={genre}
										className="px-2 py-0.5 text-xs rounded-full border border-cblue/30 text-wite bg-background/50"
									>
										{genre}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Original Title */}
					{props.original_title && props.original_title !== props.title && (
						<div className="flex items-center gap-2 mb-4">
							<span className="text-cblue text-sm">Original Title:</span>
							<span className="text-wite font-medium">
								{props.original_title}
							</span>
						</div>
					)}

					{/* Original Language */}
					{props.original_language && (
						<div className="flex items-center gap-2 mb-4">
							<span className="text-cblue text-sm">Language:</span>
							<span className="text-wite font-medium uppercase">
								{getLanguageName(props.original_language)}
							</span>
						</div>
					)}

					{/* Popularity */}
					{props.popularity && (
						<div className="flex items-center gap-2 mb-4">
							<span className="text-cblue text-sm">Popularity:</span>
							<span className="text-wite font-medium">
								{props.popularity.toFixed(0)}
							</span>
						</div>
					)}

					{/* Watch On Section */}
					<div>
						<h2 className="text-lg font-semibold text-wite mb-4">
							Where to Watch
						</h2>
						<div className="flex flex-wrap gap-3">
							{streamingPlatforms.map(platform => (
								<button
									key={platform.name}
									className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-cblue/30 bg-background/50 hover:border-primary hover:bg-card-hover transition-all duration-300"
								>
									<span
										className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold"
										style={{ backgroundColor: platform.color }}
									>
										{platform.icon}
									</span>
									<span className="text-wite text-sm group-hover:text-primary transition-colors">
										{platform.name}
									</span>
								</button>
							))}
						</div>
						<p className="text-cblue/60 text-xs mt-3">
							* Availability may vary by region
						</p>
						<p className="text-cblue/60 text-xs mt-3">
							* Data provided by TMDB. Availability and accuracy may vary.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MovieDetails
