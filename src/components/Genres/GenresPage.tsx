import { getAnimeByGenre } from '@/lib/jikan'
import AnimeGenrePage from './AnimeGenrePage'

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
