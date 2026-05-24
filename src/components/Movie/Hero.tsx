import JustDroppedMovies from '../Movie/JustDroppedMovies'
import PopularMovies from '../Movie/PopularMovies'
import Footer from '../ui/Footer'
import UpcomingMovies from './UpcomingMovies'

const Hero = () => {
	return (
		<div className="w-full bg-background">
			<>
				<UpcomingMovies />
				<JustDroppedMovies />
				<PopularMovies />
			</>
			<footer className="w-full h-full bg-background/50 border-t border-cblue/30 flex items-center justify-center mt-12">
				<Footer />
			</footer>
		</div>
	)
}

export default Hero
