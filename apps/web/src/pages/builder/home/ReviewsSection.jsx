import React, { useState, useEffect } from 'react';
import { Star, Upload, Plus, X, CheckCircle, Sparkles, MessageSquare, MapPin, Calendar, ZoomIn, Heart } from 'lucide-react';
import reviewService, { CEREMONY_OPTIONS } from '@/services/reviewService';

export default function ReviewsSection() {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	// Modal states
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [activeLightboxImg, setActiveLightboxImg] = useState(null);

	// Form states
	const [name, setName] = useState('');
	const [ceremony, setCeremony] = useState('');
	const [location, setLocation] = useState('');
	const [rating, setRating] = useState(5);
	const [hoverRating, setHoverRating] = useState(0);
	const [comment, setComment] = useState('');
	const [photoFile, setPhotoFile] = useState(null);
	const [photoPreview, setPhotoPreview] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [submittedSuccess, setSubmittedSuccess] = useState(false);

	// Load approved reviews
	const loadReviews = async () => {
		try {
			setLoading(true);
			const data = await reviewService.fetchReviews(true);
			setReviews(data || []);
		} catch (err) {
			console.error('Failed to load reviews:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadReviews();
	}, []);

	// Handle photo select
	const handlePhotoSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file (JPEG, PNG, WebP).');
			return;
		}

		setPhotoFile(file);
		setPhotoPreview(URL.createObjectURL(file));
	};

	// Handle review submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim() || !comment.trim()) {
			alert('Please provide your name and review comments.');
			return;
		}

		try {
			setSubmitting(true);
			await reviewService.submitReview({
				name,
				ceremony: ceremony || 'Vedic Pooja Ceremony',
				location: location.trim() || 'Dubai, UAE',
				rating,
				comment,
				photoFile,
			});

			setSubmittedSuccess(true);
			await loadReviews();

			// Reset form after short delay
			setTimeout(() => {
				setName('');
				setCeremony('');
				setLocation('');
				setComment('');
				setRating(5);
				setPhotoFile(null);
				setPhotoPreview('');
				setSubmittedSuccess(false);
				setIsReviewModalOpen(false);
			}, 1800);
		} catch (err) {
			console.error('Review submit failed:', err);
			alert(`Submission failed: ${err.message || 'Unknown error'}`);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section id="reviews" className="bg-[#FAF6F0] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E5DCCF] font-['Mukta',sans-serif]">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
					<div>
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EBDD] border border-[#E2D7C8] text-[#8C2B1D] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 font-['Poppins',sans-serif]">
							<Sparkles className="w-4 h-4 text-[#C4923C]" />
							<span>Devotee Experiences & Blessings</span>
						</div>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8C2B1D] font-['Marcellus',serif] tracking-tight leading-tight">
							Customer Reviews & Ceremony Photos
						</h2>
						<p className="text-base sm:text-lg text-[#2B1A14]/75 mt-3 max-w-2xl leading-relaxed">
							Read genuine experiences from families across Dubai, Sharjah, and Abu Dhabi whose homes, vehicles, and ceremonies were blessed by Shastri Shree Vishal Bhai.
						</p>

						{/* Aggregate Badge */}
						<div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-[#2B1A14]">
							<div className="flex items-center gap-1 bg-[#F2EBDD] border border-[#E2D7C8] px-3 py-1.5 rounded-xl font-bold font-['Poppins',sans-serif]">
								<div className="flex text-[#C4923C]">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-current" />
									))}
								</div>
								<span className="text-[#8C2B1D] ml-1.5">5.0 / 5.0</span>
							</div>
							<span className="text-xs sm:text-sm text-[#2B1A14]/70 font-semibold font-['Poppins',sans-serif]">
								• 100% Authentic Vedic Rituals • 1000+ Ceremonies Performed in UAE
							</span>
						</div>
					</div>

					{/* Action Button: Leave a Review */}
					<div className="shrink-0">
						<button
							onClick={() => setIsReviewModalOpen(true)}
							className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#8C2B1D] hover:bg-[#a33222] text-[#FAF6F0] font-bold text-base sm:text-lg transition shadow-lg shadow-[#8C2B1D]/20 font-['Marcellus',serif] group cursor-pointer"
						>
							<Plus className="w-5 h-5 text-[#E5B361] group-hover:rotate-90 transition-transform duration-300" />
							<span>Leave a Review & Share Photo</span>
						</button>
					</div>
				</div>

				{/* Reviews Grid */}
				{loading ? (
					<div className="py-20 text-center text-[#8C2B1D]">
						<div className="w-10 h-10 border-3 border-[#8C2B1D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
						<p className="text-sm font-bold uppercase tracking-wider font-['Poppins',sans-serif]">Loading Devotee Reviews...</p>
					</div>
				) : reviews.length === 0 ? (
					<div className="py-16 text-center bg-white border border-[#E5DCCF] rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
						<MessageSquare className="w-12 h-12 text-[#8C2B1D]/30 mx-auto mb-3" />
						<h3 className="text-xl font-bold text-[#8C2B1D] mb-1 font-['Marcellus',serif]">Be the First to Review</h3>
						<p className="text-sm text-[#2B1A14]/70 mb-5">Share your experience and photos from your pooja with Pandit Ji.</p>
						<button
							onClick={() => setIsReviewModalOpen(true)}
							className="px-5 py-2.5 bg-[#8C2B1D] text-white rounded-xl text-sm font-bold hover:bg-[#a33222] transition font-['Marcellus',serif]"
						>
							Write a Review
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
						{reviews.map((rev) => (
							<div
								key={rev.id}
								className="bg-white border border-[#E5DCCF] hover:border-[#8C2B1D]/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
							>
								{/* Customer Photo (if provided) */}
								{rev.imageUrl ? (
									<div
										className="relative h-56 bg-[#F7EFE5] overflow-hidden cursor-pointer group/photo"
										onClick={() => setActiveLightboxImg(rev.imageUrl)}
										title="Click to view full photo"
									>
										<img
											src={rev.imageUrl}
											alt={`${rev.name} - ${rev.ceremony}`}
											className="w-full h-full object-cover transition duration-500 group-hover/photo:scale-105"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-black/20 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
											<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-bold font-['Poppins',sans-serif]">
												<ZoomIn className="w-3.5 h-3.5" />
												<span>View Photo</span>
											</span>
										</div>
										<div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold font-['Poppins',sans-serif]">
											Pooja Ceremony Photo
										</div>
									</div>
								) : (
									<div className="h-3 bg-gradient-to-r from-[#8C2B1D] to-[#C4923C]" />
								)}

								{/* Review Content */}
								<div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
									<div>
										{/* Star Rating & Ceremony */}
										<div className="flex items-center justify-between gap-2 mb-3">
											<div className="flex text-[#C4923C]">
												{[...Array(rev.rating || 5)].map((_, i) => (
													<Star key={i} className="w-4 h-4 fill-current" />
												))}
											</div>
											<span className="text-xs text-[#2B1A14]/60 font-semibold font-['Poppins',sans-serif]">
												{rev.date}
											</span>
										</div>

										{/* Ceremony Badge */}
										<div className="mb-3">
											<span className="inline-block px-3 py-1 rounded-lg bg-[#FAF6F0] border border-[#E2D7C8] text-[#8C2B1D] text-xs font-bold font-['Poppins',sans-serif]">
												{rev.ceremony}
											</span>
										</div>

										{/* Review Text */}
										<p className="text-[#2B1A14]/85 text-base sm:text-lg leading-relaxed italic mb-5">
											"{rev.comment}"
										</p>
									</div>

									{/* Author Info */}
									<div className="pt-4 border-t border-[#F2EBDD] flex items-center justify-between">
										<div>
											<div className="flex items-center gap-1.5">
												<h4 className="font-bold text-[#2B1A14] text-base font-['Marcellus',serif]">
													{rev.name}
												</h4>
												<CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Devotee" />
											</div>
											<p className="text-xs text-[#2B1A14]/60 flex items-center gap-1 mt-0.5 font-['Poppins',sans-serif]">
												<MapPin className="w-3 h-3 text-[#C4923C]" />
												<span>{rev.location || 'Dubai, UAE'}</span>
											</p>
										</div>

										<span className="text-[11px] uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold font-['Poppins',sans-serif]">
											Verified
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* ========================================================================= */}
			{/* LEAVE A REVIEW MODAL */}
			{/* ========================================================================= */}
			{isReviewModalOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget && !submitting) setIsReviewModalOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Modal Header */}
						<div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F2EBDD] shrink-0">
							<h3 className="text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
								Share Your Experience & Photo
							</h3>
							<button
								type="button"
								onClick={() => setIsReviewModalOpen(false)}
								disabled={submitting}
								className="p-1.5 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition shrink-0 ml-3"
								title="Close (Esc)"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Success Banner */}
						{submittedSuccess ? (
							<div className="py-12 text-center flex flex-col items-center">
								<div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
									<CheckCircle className="w-9 h-9" />
								</div>
								<h4 className="text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif] mb-2">
									Dhanyawad! Your Review is Live
								</h4>
								<p className="text-sm text-[#2B1A14]/75 max-w-xs">
									Thank you for sharing your divine experience and photos with the community.
								</p>
							</div>
						) : (
							/* Form with scrollable body and pinned footer */
							<form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
								<div className="flex-1 overflow-y-auto pr-1.5 space-y-4 text-sm">
									{/* Name */}
									<div>
										<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
											<span>Your Full Name</span>
											<span className="text-red-600 font-bold">*</span>
										</label>
										<input
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder=""
											required
											className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none transition"
										/>
									</div>

									{/* Ceremony Selector */}
									<div>
										<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
											<span>Ceremony Performed</span>
											<span className="text-red-600 font-bold">*</span>
										</label>
										<select
											value={ceremony}
											onChange={(e) => setCeremony(e.target.value)}
											required
											className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none transition font-['Mukta',sans-serif]"
										>
											<option value="">Select Ceremony</option>
											{CEREMONY_OPTIONS.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
										</select>
									</div>

									{/* Location */}
									<div>
										<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
											<span>City / Area in UAE</span>
										</label>
										<input
											type="text"
											value={location}
											onChange={(e) => setLocation(e.target.value)}
											placeholder=""
											className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none transition"
										/>
									</div>

									{/* Star Rating Selector */}
									<div>
										<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
											<span>Your Rating</span>
											<span className="text-red-600 font-bold">*</span>
										</label>
										<div className="flex items-center gap-2 py-1">
											{[1, 2, 3, 4, 5].map((star) => (
												<button
													key={star}
													type="button"
													onClick={() => setRating(star)}
													onMouseEnter={() => setHoverRating(star)}
													onMouseLeave={() => setHoverRating(0)}
													className="p-1 text-[#C4923C] hover:scale-110 transition-transform cursor-pointer"
												>
													<Star
														className={`w-7 h-7 ${
															star <= (hoverRating || rating)
																? 'fill-[#C4923C] text-[#C4923C]'
																: 'text-[#E2D7C8]'
														}`}
													/>
												</button>
											))}
										</div>
									</div>

									{/* Comments */}
									<div>
										<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
											<span>Your Experience & Feedback</span>
											<span className="text-red-600 font-bold">*</span>
										</label>
										<textarea
											rows={4}
											value={comment}
											onChange={(e) => setComment(e.target.value)}
											placeholder=""
											required
											className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl p-3.5 text-sm sm:text-base outline-none transition leading-relaxed resize-none"
										/>
									</div>

									{/* Photo Upload Dropzone */}
									<div>
										<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
											<span>Attach Ceremony Photo (Optional)</span>
										</label>
										<div className="border-2 border-dashed border-[#E2D7C8] hover:border-[#8C2B1D] rounded-2xl p-4 text-center cursor-pointer transition relative bg-[#FAF6F0]">
											<input
												type="file"
												accept="image/*"
												onChange={handlePhotoSelect}
												className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
											/>
											{photoPreview ? (
												<div className="flex flex-col items-center">
													<img
														src={photoPreview}
														alt="Preview"
														className="h-28 object-contain rounded-xl mb-2 border border-[#E2D7C8]"
													/>
													<span className="text-xs text-[#8C2B1D] font-bold">
														Change Photo
													</span>
												</div>
											) : (
												<div className="py-2.5">
													<Upload className="w-7 h-7 text-[#8C2B1D] mx-auto mb-1.5" />
													<p className="text-xs sm:text-sm font-bold text-[#2B1A14]">
														Upload Photo
													</p>
												</div>
											)}
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
									<button
										type="button"
										onClick={() => setIsReviewModalOpen(false)}
										disabled={submitting}
										className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={submitting}
										className="flex-1 py-3 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-sm sm:text-base font-bold transition disabled:opacity-50 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif] flex items-center justify-center gap-2"
									>
										{submitting ? 'Submitting...' : 'Submit Review'}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* FULLSCREEN PHOTO LIGHTBOX */}
			{/* ========================================================================= */}
			{activeLightboxImg && (
				<div
					className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
					onClick={() => setActiveLightboxImg(null)}
				>
					<div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
						<button
							onClick={() => setActiveLightboxImg(null)}
							className="absolute -top-12 right-0 text-white/80 hover:text-white p-2"
							title="Close (Esc)"
						>
							<X className="w-8 h-8" />
						</button>
						<img
							src={activeLightboxImg}
							alt="Enlarged Ceremony Photo"
							className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
						/>
					</div>
				</div>
			)}
		</section>
	);
}
