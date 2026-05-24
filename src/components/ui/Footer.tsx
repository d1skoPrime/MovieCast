const Footer = () => {
	return (
		<div className="w-full h-full">
			<div className="w-full h-full flex items-center justify-center px-8 py-4 border-t border-cblue/30">
				<p className="text-sm text-cblue/80">
					&copy; {new Date().getFullYear()} MovieCast. All rights reserved.
				</p>
			</div>
			<div className="w-full h-full flex items-center justify-center px-8 py-2">
				<p className="text-xs text-cblue/60">
					* Movie data provided by TMDB. All rights reserved by their respective
					owners.
				</p>
			</div>
		</div>
	)
}

export default Footer
