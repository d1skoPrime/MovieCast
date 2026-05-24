import { getAnimeGenres } from '@/lib/jikan'
import GenresClient from './GenresClient'
// src/app/page.tsx
export const dynamic = 'force-dynamic'
const Genres = async () => {
	const genres = await getAnimeGenres()
	return <GenresClient genres={genres} />
}

export default Genres
