import AnimeHero from '@/components/Anime/AnimeHero'
import HomeClient from '@/components/HomeClient'
import Hero from '@/components/Movie/Hero'

export default function Home() {
	return (
		<div className="w-full h-full">
			<main className="w-full bg-background">
				<HomeClient
					movies={<Hero />}
					anime={<AnimeHero />}
				/>
			</main>
		</div>
	)
}
