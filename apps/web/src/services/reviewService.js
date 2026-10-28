import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import localPhotoDb, { fileToDataUrl } from '@/services/localPhotoDb';

export const DEFAULT_REVIEWS = [
	{
		id: 'rev_default_1',
		name: 'Rajesh & Meera Sharma',
		location: 'Downtown Dubai, UAE',
		ceremony: 'Griha Pravesh & Vastu Shanti',
		rating: 5,
		comment: 'Pandit Vishal Ji performed our Griha Pravesh with complete Vedic authenticity and devotion. He guided us through every mantra and havan vidhi patiently. Our family felt immense peace and positive energy in our new home.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=600&fit=crop',
		date: 'October 2026',
		isApproved: true,
		createdAt: '2026-10-15T10:00:00.000Z',
	},
	{
		id: 'rev_default_2',
		name: 'Amit & Sneha Patel',
		location: 'Business Bay, Dubai',
		ceremony: 'Car & Vehicle Pooja',
		rating: 5,
		comment: 'Got our new vehicle blessed by Shastri Ji today. The vahan pooja, lemon ritual, and swastika vidhi were conducted purely according to Vedic scriptures. Highly recommend Pandit Ji for all ceremonies in Dubai!',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-2VtWj9NpLbLZZmNI.png?width=600&fit=crop',
		date: 'September 2026',
		isApproved: true,
		createdAt: '2026-09-20T14:30:00.000Z',
	},
	{
		id: 'rev_default_3',
		name: 'Vikramaditya Verma',
		location: 'Dubai Marina, UAE',
		ceremony: 'Satyanarayan Katha & Maha Havan',
		rating: 5,
		comment: 'We organized Lord Satyanarayan Pooja on Purnima. Pandit Ji brought all authentic samagri and recited the complete 5 adhyayas with Hindi explanation so everyone could understand the spiritual meaning. Blessed experience.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=600&fit=crop',
		date: 'August 2026',
		isApproved: true,
		createdAt: '2026-08-12T09:15:00.000Z',
	},
	{
		id: 'rev_default_4',
		name: 'Pooja & Sanjay Kulkarni',
		location: 'Jumeirah, Dubai',
		ceremony: 'Shiva Rudrabhishek & Planets Shanti',
		rating: 5,
		comment: 'Shree Vishal Shastriji conducted a powerful Rudrabhishek with bilva patra, panchamrit, and authentic Vedic chanting. The divine vibrations filled our entire residence. Truly blessed to have him in the UAE.',
		imageUrl: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20230916-wa0012.jpg-CJxXbw9LA6N6QwdH.jpeg?width=600&fit=crop',
		date: 'July 2026',
		isApproved: true,
		createdAt: '2026-07-28T16:45:00.000Z',
	},
];

export const CEREMONY_OPTIONS = [
	'Griha Pravesh & Vastu Shanti',
	'Car & Vehicle Pooja',
	'Satyanarayan Katha',
	'Shiva Rudrabhishek & Planets Shanti',
	'Vedic Wedding Ceremony (Vivah Sanskar)',
	'Maha Mrityunjaya & Shanti Havan',
	'Navchandi Yagna & Durga Pooja',
	'Mundan / Namkaran Ceremony',
	'Business & Office Opening Pooja',
	'Other Vedic Ritual',
];

export const reviewService = {
	/**
	 * Fetch all reviews.
	 * Checks Supabase if configured; otherwise reads from local persistent storage.
	 * If no reviews exist, seeds and returns DEFAULT_REVIEWS.
	 */
	async fetchReviews(onlyApproved = false) {
		// 1. Try Supabase Cloud Database first
		if (isSupabaseConfigured && supabase) {
			try {
				let query = supabase
					.from('customer_reviews')
					.select('*')
					.order('created_at', { ascending: false });

				if (onlyApproved) {
					query = query.eq('is_approved', true);
				}

				const { data, error } = await query;
				if (!error && data && data.length > 0) {
					const mapped = data.map((r) => ({
						id: r.id,
						name: r.customer_name || r.name,
						location: r.location || 'Dubai, UAE',
						ceremony: r.ceremony || 'Vedic Pooja',
						rating: Number(r.rating) || 5,
						comment: r.comment || '',
						imageUrl: r.image_url || '',
						date: r.date_display || new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
						isApproved: r.is_approved ?? true,
						createdAt: r.created_at,
						source: 'cloud',
					}));
					await localPhotoDb.saveReviews(mapped);
					return mapped;
				}
			} catch (cloudErr) {
				console.warn('Supabase reviews fetch failed, using local:', cloudErr);
			}
		}

		// 2. Check local persistent storage
		try {
			const local = await localPhotoDb.getReviews();
			if (local !== null && Array.isArray(local)) {
				return onlyApproved ? local.filter((r) => r.isApproved !== false) : local;
			}
		} catch (localErr) {
			console.warn('Local storage reviews fetch error:', localErr);
		}

		// 3. Fallback to default starter reviews
		await localPhotoDb.saveReviews(DEFAULT_REVIEWS);
		return onlyApproved ? DEFAULT_REVIEWS.filter((r) => r.isApproved !== false) : DEFAULT_REVIEWS;
	},

	/**
	 * Submit a new customer review with picture and comment.
	 */
	async submitReview({ name, location = 'Dubai, UAE', ceremony, rating = 5, comment, photoFile = null }) {
		let finalImageUrl = '';

		// Process picture upload if provided
		if (photoFile) {
			if (isSupabaseConfigured && supabase) {
				try {
					const ext = photoFile.name.split('.').pop() || 'jpg';
					const cleanName = photoFile.name
						.replace(/\.[^/.]+$/, '')
						.replace(/[^a-zA-Z0-9]/g, '_')
						.toLowerCase();
					const filePath = `reviews/${Date.now()}_${cleanName}.${ext}`;

					const { error: uploadError } = await supabase.storage
						.from('site-photos')
						.upload(filePath, photoFile, { cacheControl: '31536000', upsert: false });

					if (!uploadError) {
						const { data: urlData } = supabase.storage.from('site-photos').getPublicUrl(filePath);
						finalImageUrl = urlData.publicUrl;
					}
				} catch (err) {
					console.warn('Cloud photo upload failed, falling back to local:', err);
					finalImageUrl = await fileToDataUrl(photoFile);
				}
			} else {
				finalImageUrl = await fileToDataUrl(photoFile);
			}
		}

		const newReview = {
			id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
			name: name.trim(),
			location: location.trim() || 'Dubai, UAE',
			ceremony: ceremony || 'Vedic Pooja Ceremony',
			rating: Math.max(1, Math.min(5, Number(rating) || 5)),
			comment: comment.trim(),
			imageUrl: finalImageUrl,
			date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
			isApproved: true,
			createdAt: new Date().toISOString(),
			source: isSupabaseConfigured ? 'cloud' : 'local',
		};

		// 1. Save to local storage
		const current = (await localPhotoDb.getReviews()) || DEFAULT_REVIEWS;
		const updated = [newReview, ...current];
		await localPhotoDb.saveReviews(updated);

		// 2. Save to Supabase if configured
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('customer_reviews').insert([
					{
						id: newReview.id,
						customer_name: newReview.name,
						location: newReview.location,
						ceremony: newReview.ceremony,
						rating: newReview.rating,
						comment: newReview.comment,
						image_url: newReview.imageUrl,
						date_display: newReview.date,
						is_approved: true,
					},
				]);
			} catch (cloudInsertErr) {
				console.warn('Supabase review insert error:', cloudInsertErr);
			}
		}

		return newReview;
	},

	/**
	 * Delete a review (Admin action).
	 */
	async deleteReview(reviewId) {
		// 1. Delete from Supabase
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('customer_reviews').delete().eq('id', reviewId);
			} catch (_) {}
		}

		// 2. Remove from local storage
		const current = (await localPhotoDb.getReviews()) || DEFAULT_REVIEWS;
		const filtered = current.filter((r) => r.id !== reviewId);
		await localPhotoDb.saveReviews(filtered);
		return true;
	},

	/**
	 * Toggle review visibility (Approve / Hide).
	 */
	async toggleApproval(reviewId, isApproved) {
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('customer_reviews').update({ is_approved: isApproved }).eq('id', reviewId);
			} catch (_) {}
		}

		const current = (await localPhotoDb.getReviews()) || DEFAULT_REVIEWS;
		const updated = current.map((r) => (r.id === reviewId ? { ...r, isApproved } : r));
		await localPhotoDb.saveReviews(updated);
		return updated;
	},

	/**
	 * Restore default reviews list.
	 */
	async restoreDefaultReviews() {
		await localPhotoDb.saveReviews(DEFAULT_REVIEWS);
		return DEFAULT_REVIEWS;
	},

	/**
	 * Clear all reviews (remove default starter reviews).
	 */
	async clearAllReviews() {
		if (isSupabaseConfigured && supabase) {
			try {
				await supabase.from('customer_reviews').delete().neq('id', '___keep___');
			} catch (_) {}
		}
		await localPhotoDb.saveReviews([]);
		return [];
	},
};

export default reviewService;

