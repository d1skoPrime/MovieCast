import AnimeGenrePage from '@/components/Genres/AnimeGenrePage'
import { getAnimeByGenre } from '@/lib/jikan'

export default async function Page({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const anime = await getAnimeByGenre(id)
	return (
		<AnimeGenrePage
			anime={anime}
			genreId={id}
		/>
	)
}
