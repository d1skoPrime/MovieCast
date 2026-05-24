import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'
export const dynamic = 'force-dynamic'
export const revalidate = 21600 // 6 hours in seconds
export default function Home() {
	return (
		<div className="w-full h-full">
			<nav className="w-full h-22 bg-[#141720] text-white flex items-center justify-center">
				<NavBar />
			</nav>
			<div className="bg-primary w-full h-0.5"></div>

			<main className="w-full h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center">
				<div className=" w-full h-full">
					<Hero />
				</div>
			</main>
		</div>
	)
}
