import Footer from './Footer'
import JustDroppedMovies from './JustDroppedMovies'
import PopularMovies from './PopularMovies'
import UpcomingMovies from './UpcomingMovies'

const Hero = () => {
	return (
		<div className="bg-background w-full min-h-screen">
			{/* Just Dropped Section */}
			<JustDroppedMovies />

			{/* Upcoming Movies Section */}
			<UpcomingMovies />

			{/* Popular Movies Section */}
			<PopularMovies />

			<footer className="w-full h-full bg-background/50 border-t border-cblue/30 flex items-center justify-center mt-12">
				<Footer />
			</footer>
		</div>
	)
}

export default Hero
