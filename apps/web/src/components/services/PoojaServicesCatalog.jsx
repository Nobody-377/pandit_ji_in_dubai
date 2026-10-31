import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Sparkles, MessageCircle, Calendar, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import poojaService from '@/services/poojaService';
import localPhotoDb from '@/services/localPhotoDb';

export default function PoojaServicesCatalog({
	showHeader = true,
	title = "Sacred Vedic Pooja Services in Dubai",
	subtitle = "Book authentic rituals and ceremonies conducted strictly according to Hindu Vedic Shastras by Shastri Shree Vishal Bhai.",
	customOnly = false
}) {
	const [services, setServices] = useState(() => {
		return localPhotoDb.getPoojaServicesSync() || [];
	});
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedBadge, setSelectedBadge] = useState('all');

	const loadServices = useCallback(async () => {
		try {
			const data = await poojaService.fetchServices(true);
			setServices(data || []);
		} catch (err) {
			console.error('Failed to load pooja services:', err);
		}
	}, []);

	useEffect(() => {
		loadServices();

		const handleDataUpdate = (event) => {
			const detail = event?.detail;
			if (!detail || detail.type === 'services' || detail.type === 'photos') {
				loadServices();
			}
		};

		const handleStorage = (e) => {
			if (!e.key || e.key === 'pj_pooja_services' || e.key === 'pj_last_sync_timestamp') {
				loadServices();
			}
		};

		const handleFocus = () => {
			loadServices();
		};

		window.addEventListener('pj_site_data_updated', handleDataUpdate);
		window.addEventListener('storage', handleStorage);
		window.addEventListener('focus', handleFocus);

		let channel = null;
		try {
			if ('BroadcastChannel' in window) {
				channel = new BroadcastChannel('pj_sync_channel');
				channel.onmessage = (msg) => {
					const data = msg?.data;
					if (!data || data.type === 'services' || data.type === 'photos') {
						loadServices();
					}
				};
			}
		} catch (_) {}

		return () => {
			window.removeEventListener('pj_site_data_updated', handleDataUpdate);
			window.removeEventListener('storage', handleStorage);
			window.removeEventListener('focus', handleFocus);
			if (channel) {
				try { channel.close(); } catch (_) {}
			}
		};
	}, [loadServices]);

	// Filtered services
	const filteredServices = services.filter((s) => {
		if (customOnly && s.isDefault) return false;
		if (selectedBadge !== 'all' && s.badge !== selectedBadge) return false;
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			const matchTitle = s.title?.toLowerCase().includes(q);
			const matchDesc = s.description?.toLowerCase().includes(q);
			const matchBadge = s.badge?.toLowerCase().includes(q);
			if (!matchTitle && !matchDesc && !matchBadge) return false;
		}
		return true;
	});

	// Unique categories / badges
	const categories = ['all', ...Array.from(new Set(filteredServices.map((s) => s.badge).filter(Boolean)))];

	// If customOnly is enabled and there are no custom services, don't show section
	if (customOnly && !loading && filteredServices.length === 0) {
		return null;
	}

	return (
		<section className="bg-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8 font-['Mukta',sans-serif]">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				{showHeader && (
					<div className="text-center max-w-3xl mx-auto mb-12">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2EBDD] border border-[#E2D7C8] text-[#8C2B1D] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3.5 font-['Poppins',sans-serif]">
							<Sparkles className="w-4 h-4 text-[#C4923C]" />
							<span>Vedic Shastra Parampara</span>
						</div>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8C2B1D] font-['Marcellus',serif] tracking-tight leading-tight">
							{title}
						</h2>
						<p className="text-base sm:text-lg text-[#2B1A14]/75 mt-3 leading-relaxed">
							{subtitle}
						</p>

						{/* Search & Filter Bar */}
						<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
							<div className="relative w-full max-w-md">
								<Search className="w-4 h-4 text-[#2B1A14]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search any pooja (e.g. Griha Pravesh, Havan, Vahan)..."
									className="w-full bg-white border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-2xl pl-10 pr-4 py-3 text-sm outline-none transition shadow-2xs"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery('')}
										className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#2B1A14]/50 hover:text-[#2B1A14] font-bold"
									>
										Clear
									</button>
								)}
							</div>
						</div>

						{/* Category Pills */}
						{categories.length > 2 && (
							<div className="flex flex-wrap items-center justify-center gap-2 mt-4 font-['Poppins',sans-serif] text-xs">
								{categories.map((cat) => (
									<button
										key={cat}
										onClick={() => setSelectedBadge(cat)}
										className={`px-4 py-1.5 rounded-full font-bold transition capitalize ${
											selectedBadge === cat
												? 'bg-[#8C2B1D] text-white shadow-xs'
												: 'bg-white border border-[#E2D7C8] text-[#2B1A14]/80 hover:bg-[#F2EBDD]'
										}`}
									>
										{cat === 'all' ? 'All Poojas' : cat}
									</button>
								))}
							</div>
						)}
					</div>
				)}

				{/* Services Grid */}
				{loading ? (
					<div className="py-20 text-center text-[#8C2B1D]">
						<div className="w-10 h-10 border-3 border-[#8C2B1D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
						<p className="text-sm font-bold uppercase tracking-wider font-['Poppins',sans-serif]">Loading Pooja Services...</p>
					</div>
				) : filteredServices.length === 0 ? (
					<div className="py-16 text-center bg-white border border-[#E5DCCF] rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
						<Sparkles className="w-12 h-12 text-[#8C2B1D]/30 mx-auto mb-3" />
						<h3 className="text-xl font-bold text-[#8C2B1D] mb-1 font-['Marcellus',serif]">No Services Found</h3>
						<p className="text-sm text-[#2B1A14]/70 mb-5">
							{searchQuery
								? `No pooja services match "${searchQuery}". Try a different keyword.`
								: 'No pooja services currently published. You can add them from the Admin Panel.'}
						</p>
						<button
							onClick={() => {
								setSearchQuery('');
								setSelectedBadge('all');
							}}
							className="px-5 py-2.5 bg-[#8C2B1D] text-white rounded-xl text-sm font-bold hover:bg-[#a33222] transition font-['Poppins',sans-serif]"
						>
							View All Services
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredServices.map((service) => (
							<div
								key={service.id}
								className="bg-white border border-[#E5DCCF] hover:border-[#8C2B1D]/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
							>
								{/* Image Banner */}
								<div className="relative h-48 bg-[#F7EFE5] overflow-hidden">
									<img
										src={service.imageUrl}
										alt={service.title}
										className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
										loading="lazy"
									/>
									{service.badge && (
										<div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#8C2B1D] text-white text-[11px] font-bold uppercase tracking-wider font-['Poppins',sans-serif] shadow-md">
											{service.badge}
										</div>
									)}
									<div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
								</div>

								{/* Card Content */}
								<div className="p-6 flex-1 flex flex-col justify-between">
									<div>
										<h3 className="text-xl font-bold text-[#8C2B1D] group-hover:text-[#a33222] transition font-['Marcellus',serif] mb-2 leading-snug">
											{service.title}
										</h3>
										<p className="text-sm sm:text-base text-[#2B1A14]/75 leading-relaxed line-clamp-3 mb-5">
											{service.description}
										</p>
									</div>

									{/* Action Footer */}
									<div className="pt-4 border-t border-[#F2EBDD] flex items-center justify-between gap-2">
										<a
											href={service.targetUrl || '/book-pandit-in-dubai'}
											className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-xs sm:text-sm font-bold transition shadow-xs font-['Poppins',sans-serif] flex-1 justify-center"
										>
											<span>{service.buttonText || 'Book Pooja'}</span>
											<ArrowRight className="w-3.5 h-3.5" />
										</a>

										<a
											href={`https://wa.me/971504192987?text=${encodeURIComponent(`Namaste Pandit Ji, I would like to inquire about booking ${service.title} in Dubai.`)}`}
											target="_blank"
											rel="noopener noreferrer"
											title="WhatsApp Consultation"
											className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white transition shrink-0"
										>
											<MessageCircle className="w-5 h-5" />
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
