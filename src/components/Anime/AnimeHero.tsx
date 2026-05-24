import Footer from '../ui/Footer'
import ExploreMore from './ExploreMore'
import Genres from './Genres'
import PopularLogicAnime from './PopularLogic'
import UpcomingLogicAnime from './UpcomingLogic'

type Props = {}
// src/app/page.tsx
export const dynamic = 'force-dynamic'
const AnimeHero = (props: Props) => {
	return (
		<div className="w-full min-h-screen">
			Coming Soon
			<>
				<UpcomingLogicAnime />
				<PopularLogicAnime />
				<Genres />
				<ExploreMore />
			</>
			<footer className="w-full h-full bg-background/50 border-t border-cblue/30 flex items-center justify-center mt-12">
				<Footer />
			</footer>
		</div>
	)
}

export default AnimeHero
