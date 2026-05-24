export type Anime = {
	mal_id: number
	url: string
	images: {
		jpg: {
			image_url: string
			small_image_url: string
			large_image_url: string
		}
	}
	title: string
	title_english: string | null
	title_japanese: string | null
	type: string
	source: string
	episodes: number | null
	status: string
	airing: boolean
	aired: {
		from: string | null
		to: string | null
		string: string
	}
	duration: string
	rating: string
	score: number | null
	scored_by: number | null
	rank: number | null
	popularity: number
	members: number
	favorites: number
	synopsis: string
	season: string | null
	year: number | null
	genres: { mal_id: number; name: string }[]
	themes: { mal_id: number; name: string }[]
	studios: { mal_id: number; name: string }[]
}

export interface Genre {
	mal_id: number
	name: string
	picture: string
}

export const animeGenresDict: Record<number, Genre> = {
	1: {
		mal_id: 1,
		name: 'Action',
		picture: 'https://cdn.myanimelist.net/images/anime/1763/150638l.webp'
	},
	2: {
		mal_id: 2,
		name: 'Adventure',
		picture: 'https://cdn.myanimelist.net/images/anime/6/79597l.webp'
	},
	3: {
		mal_id: 3,
		name: 'Racing',
		picture: 'https://cdn.myanimelist.net/images/anime/1427/142210l.webp'
	},
	4: {
		mal_id: 4,
		name: 'Comedy',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	5: {
		mal_id: 5,
		name: 'Avant Garde',
		picture: 'https://cdn.myanimelist.net/images/anime/1404/98182l.webp'
	},
	6: {
		mal_id: 6,
		name: 'Mythology',
		picture: 'https://cdn.myanimelist.net/images/anime/6/79597l.webp'
	},
	7: {
		mal_id: 7,
		name: 'Mystery',
		picture: 'https://cdn.myanimelist.net/images/anime/1084/112813l.webp'
	},
	8: {
		mal_id: 8,
		name: 'Drama',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	9: {
		mal_id: 9,
		name: 'Ecchi',
		picture: 'https://cdn.myanimelist.net/images/anime/1133/96040l.webp'
	},
	10: {
		mal_id: 10,
		name: 'Fantasy',
		picture: 'https://cdn.myanimelist.net/images/anime/1763/150638l.webp'
	},
	11: {
		mal_id: 11,
		name: 'Strategy Game',
		picture: 'https://cdn.myanimelist.net/images/anime/12/77614l.webp'
	},
	12: {
		mal_id: 12,
		name: 'Hentai',
		picture: 'https://cdn.myanimelist.net/images/anime/10/15026l.webp'
	},
	13: {
		mal_id: 13,
		name: 'Historical',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	14: {
		mal_id: 14,
		name: 'Horror',
		picture: 'https://cdn.myanimelist.net/images/anime/1254/134212l.webp'
	},
	15: {
		mal_id: 15,
		name: 'Kids',
		picture: 'https://cdn.myanimelist.net/images/anime/7/72436l.webp'
	},
	17: {
		mal_id: 17,
		name: 'Martial Arts',
		picture: 'https://cdn.myanimelist.net/images/anime/1575/93498l.webp'
	},
	18: {
		mal_id: 18,
		name: 'Mecha',
		picture: 'https://cdn.myanimelist.net/images/anime/12/19698l.webp'
	},
	19: {
		mal_id: 19,
		name: 'Music',
		picture: 'https://cdn.myanimelist.net/images/anime/1378/119190l.webp'
	},
	20: {
		mal_id: 20,
		name: 'Parody',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	21: {
		mal_id: 21,
		name: 'Samurai',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	22: {
		mal_id: 22,
		name: 'Romance',
		picture: 'https://cdn.myanimelist.net/images/anime/1670/130060l.webp'
	},
	23: {
		mal_id: 23,
		name: 'School',
		picture: 'https://cdn.myanimelist.net/images/anime/1745/129284l.webp'
	},
	24: {
		mal_id: 24,
		name: 'Sci-Fi',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	25: {
		mal_id: 25,
		name: 'Shoujo',
		picture: 'https://cdn.myanimelist.net/images/anime/1250/94846l.webp'
	},
	26: {
		mal_id: 26,
		name: 'Girls Love',
		picture: 'https://cdn.myanimelist.net/images/anime/1401/140053l.webp'
	},
	27: {
		mal_id: 27,
		name: 'Shounen',
		picture: 'https://cdn.myanimelist.net/images/anime/1763/150638l.webp'
	},
	28: {
		mal_id: 28,
		name: 'Boys Love',
		picture: 'https://cdn.myanimelist.net/images/anime/1663/144261l.webp'
	},
	29: {
		mal_id: 29,
		name: 'Space',
		picture: 'https://cdn.myanimelist.net/images/anime/12/19698l.webp'
	},
	30: {
		mal_id: 30,
		name: 'Sports',
		picture: 'https://cdn.myanimelist.net/images/anime/1745/129284l.webp'
	},
	31: {
		mal_id: 31,
		name: 'Super Power',
		picture: 'https://cdn.myanimelist.net/images/anime/12/19698l.webp'
	},
	32: {
		mal_id: 32,
		name: 'Vampire',
		picture: 'https://cdn.myanimelist.net/images/anime/1084/112813l.webp'
	},
	35: {
		mal_id: 35,
		name: 'Harem',
		picture: 'https://cdn.myanimelist.net/images/anime/1671/111411l.webp'
	},
	36: {
		mal_id: 36,
		name: 'Slice of Life',
		picture: 'https://cdn.myanimelist.net/images/anime/9/72689l.webp'
	},
	37: {
		mal_id: 37,
		name: 'Supernatural',
		picture: 'https://cdn.myanimelist.net/images/anime/1084/112813l.webp'
	},
	38: {
		mal_id: 38,
		name: 'Military',
		picture: 'https://cdn.myanimelist.net/images/anime/1379/145452l.webp'
	},
	39: {
		mal_id: 39,
		name: 'Detective',
		picture: 'https://cdn.myanimelist.net/images/anime/1138/133101l.webp'
	},
	40: {
		mal_id: 40,
		name: 'Psychological',
		picture: 'https://cdn.myanimelist.net/images/anime/1422/113533l.webp'
	},
	41: {
		mal_id: 41,
		name: 'Suspense',
		picture: 'https://cdn.myanimelist.net/images/anime/1379/145452l.webp'
	},
	42: {
		mal_id: 42,
		name: 'Seinen',
		picture: 'https://cdn.myanimelist.net/images/anime/1670/130060l.webp'
	},
	43: {
		mal_id: 43,
		name: 'Josei',
		picture: 'https://cdn.myanimelist.net/images/anime/12/71796l.webp'
	},
	46: {
		mal_id: 46,
		name: 'Award Winning',
		picture: 'https://cdn.myanimelist.net/images/anime/1122/96435l.webp'
	},
	47: {
		mal_id: 47,
		name: 'Gourmet',
		picture: 'https://cdn.myanimelist.net/images/anime/6/45745l.webp'
	},
	48: {
		mal_id: 48,
		name: 'Workplace',
		picture: 'https://cdn.myanimelist.net/images/anime/9/70701l.webp'
	},
	49: {
		mal_id: 49,
		name: 'Erotica',
		picture: 'https://cdn.myanimelist.net/images/anime/1070/110685l.webp'
	},
	50: {
		mal_id: 50,
		name: 'Adult Cast',
		picture: 'https://cdn.myanimelist.net/images/anime/9/72689l.webp'
	},
	51: {
		mal_id: 51,
		name: 'Anthropomorphic',
		picture: 'https://cdn.myanimelist.net/images/anime/1427/142210l.webp'
	},
	52: {
		mal_id: 52,
		name: 'CGDCT',
		picture: 'https://cdn.myanimelist.net/images/anime/1652/138188l.webp'
	},
	53: {
		mal_id: 53,
		name: 'Childcare',
		picture: 'https://cdn.myanimelist.net/images/anime/9/35721l.webp'
	},
	54: {
		mal_id: 54,
		name: 'Combat Sports',
		picture: 'https://cdn.myanimelist.net/images/anime/5/53557l.webp'
	},
	55: {
		mal_id: 55,
		name: 'Delinquents',
		picture: 'https://cdn.myanimelist.net/images/anime/3/25147l.webp'
	},
	56: {
		mal_id: 56,
		name: 'Educational',
		picture: 'https://cdn.myanimelist.net/images/anime/1413/108382l.webp'
	},
	57: {
		mal_id: 57,
		name: 'Gag Humor',
		picture: 'https://cdn.myanimelist.net/images/anime/1245/116760l.webp'
	},
	58: {
		mal_id: 58,
		name: 'Gore',
		picture: 'https://cdn.myanimelist.net/images/anime/1763/150638l.webp'
	},
	59: {
		mal_id: 59,
		name: 'High Stakes Game',
		picture: 'https://cdn.myanimelist.net/images/anime/11/48721l.webp'
	},
	60: {
		mal_id: 60,
		name: 'Idols (Female)',
		picture: 'https://cdn.myanimelist.net/images/anime/1552/151187l.webp'
	},
	61: {
		mal_id: 61,
		name: 'Idols (Male)',
		picture: 'https://cdn.myanimelist.net/images/anime/1698/136186l.webp'
	},
	62: {
		mal_id: 62,
		name: 'Isekai',
		picture: 'https://cdn.myanimelist.net/images/anime/1638/119321l.webp'
	},
	63: {
		mal_id: 63,
		name: 'Iyashikei',
		picture: 'https://cdn.myanimelist.net/images/anime/9/72689l.webp'
	},
	64: {
		mal_id: 64,
		name: 'Love Polygon',
		picture: 'https://cdn.myanimelist.net/images/anime/1469/146852l.webp'
	},
	65: {
		mal_id: 65,
		name: 'Magical Sex Shift',
		picture: 'https://cdn.myanimelist.net/images/anime/1855/95323l.webp'
	},
	66: {
		mal_id: 66,
		name: 'Mahou Shoujo',
		picture: 'https://cdn.myanimelist.net/images/anime/5/54231l.webp'
	},
	67: {
		mal_id: 67,
		name: 'Medical',
		picture: 'https://cdn.myanimelist.net/images/anime/1868/134318l.webp'
	},
	68: {
		mal_id: 68,
		name: 'Organized Crime',
		picture: 'https://cdn.myanimelist.net/images/anime/1127/93981l.webp'
	},
	69: {
		mal_id: 69,
		name: 'Otaku Culture',
		picture: 'https://cdn.myanimelist.net/images/anime/1716/142633l.webp'
	},
	70: {
		mal_id: 70,
		name: 'Performing Arts',
		picture: 'https://cdn.myanimelist.net/images/anime/1378/119190l.webp'
	},
	71: {
		mal_id: 71,
		name: 'Pets',
		picture: 'https://cdn.myanimelist.net/images/anime/3/75599l.webp'
	},
	72: {
		mal_id: 72,
		name: 'Reincarnation',
		picture: 'https://cdn.myanimelist.net/images/anime/1249/117182l.webp'
	},
	73: {
		mal_id: 73,
		name: 'Reverse Harem',
		picture: 'https://cdn.myanimelist.net/images/anime/1360/138828l.webp'
	},
	74: {
		mal_id: 74,
		name: 'Love Status Quo',
		picture: 'https://cdn.myanimelist.net/images/anime/1376/123398l.webp'
	},
	75: {
		mal_id: 75,
		name: 'Showbiz',
		picture: 'https://cdn.myanimelist.net/images/anime/1254/134212l.webp'
	},
	76: {
		mal_id: 76,
		name: 'Survival',
		picture: 'https://cdn.myanimelist.net/images/anime/1379/145452l.webp'
	},
	77: {
		mal_id: 77,
		name: 'Team Sports',
		picture: 'https://cdn.myanimelist.net/images/anime/1745/129284l.webp'
	},
	78: {
		mal_id: 78,
		name: 'Time Travel',
		picture: 'https://cdn.myanimelist.net/images/anime/10/51723l.webp'
	},
	79: {
		mal_id: 79,
		name: 'Video Game',
		picture: 'https://cdn.myanimelist.net/images/anime/1400/94320l.webp'
	},
	80: {
		mal_id: 80,
		name: 'Visual Arts',
		picture: 'https://cdn.myanimelist.net/images/anime/1714/108892l.webp'
	},
	81: {
		mal_id: 81,
		name: 'Crossdressing',
		picture: 'https://cdn.myanimelist.net/images/anime/1469/146852l.webp'
	},
	82: {
		mal_id: 82,
		name: 'Urban Fantasy',
		picture: 'https://cdn.myanimelist.net/images/anime/1763/150638l.webp'
	},
	83: {
		mal_id: 83,
		name: 'Villainess',
		picture: 'https://cdn.myanimelist.net/images/anime/1360/138828l.webp'
	}
}
