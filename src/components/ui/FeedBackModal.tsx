'use client'

import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'

const FeedbackModal = () => {
	const [open, setOpen] = useState(false)
	const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus('sending')
		const form = e.currentTarget
		await fetch('https://formspree.io/f/xgoqzqkk', {
			method: 'POST',
			body: new FormData(form),
			headers: { Accept: 'application/json' }
		})
		setStatus('done')
		form.reset()
	}

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="flex items-center py-1.5 bg-background/50 border border-gray-700 rounded-xl hover:border-cblue hover:text-wite cursor-pointer duration-300 ease-in-out text-sm font-sans px-3 text-gray-400"
			>
				<HiOutlineMail className="mr-2 size-4" />
				<span className="hidden lg:inline">Feedback</span>
			</button>

			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
					<div className="bg-card-bg border border-cblue/30 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-white font-bold text-lg">Send Feedback</h2>
							<button
								onClick={() => {
									setOpen(false)
									setStatus('idle')
								}}
								className="text-cblue hover:text-white transition-colors"
							>
								✕
							</button>
						</div>

						{status === 'done' ? (
							<div className="text-center py-8">
								<p className="text-green-400 font-medium text-lg">
									Thanks for your feedback!
								</p>
								<button
									onClick={() => {
										setOpen(false)
										setStatus('idle')
									}}
									className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm"
								>
									Close
								</button>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-4"
							>
								<div>
									<label className="text-cblue text-sm mb-1 block">
										Email (optional)
									</label>
									<input
										name="email"
										type="email"
										placeholder="your@email.com"
										className="w-full px-3 py-2 bg-background border border-cblue/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
									/>
								</div>
								<div>
									<label className="text-cblue text-sm mb-1 block">
										Message
									</label>
									<textarea
										name="message"
										required
										rows={4}
										placeholder="What's on your mind?"
										className="w-full px-3 py-2 bg-background border border-cblue/30 rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
									/>
								</div>
								<button
									type="submit"
									disabled={status === 'sending'}
									className="w-full py-2 bg-primary text-white font-semibold rounded-lg text-sm hover:bg-primary/80 transition-colors disabled:opacity-50"
								>
									{status === 'sending' ? 'Sending...' : 'Send Feedback'}
								</button>
							</form>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default FeedbackModal
