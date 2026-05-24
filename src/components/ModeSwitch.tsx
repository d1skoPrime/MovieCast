import { useState } from 'react'

type Props = {}

const ModeSwitch = (props: Props) => {
	const [mode, setMode] = useState<'movies' | 'anime'>('movies')
	return (
		<div className="flex items-center justify-center gap-2 py-4 bg-background">
			<button
				onClick={() => setMode('movies')}
				className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'movies' ? 'bg-primary text-white' : 'bg-card-bg text-cblue hover:text-white'}`}
			>
				🎬 Movies
			</button>
			<button
				onClick={() => setMode('anime')}
				className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'anime' ? 'bg-primary text-white' : 'bg-card-bg text-cblue hover:text-white'}`}
			>
				⛩️ Anime
			</button>
		</div>
	)
}

export default ModeSwitch
