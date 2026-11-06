import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { isBannedPhoto } from '@/services/localPhotoDb';
import './GridGallery.css';

export default function GridGallery({
	id,
	images = [],
	sizes = '',
	columnCount = 4,
	columnGap = '16px',
	layout = 'carousel',
	className = '',
}) {
	const [failedUrls, setFailedUrls] = useState(() => new Set());

	const validImages = useMemo(() => {
		return (Array.isArray(images) ? images : [])
			.filter((img) => img && (typeof img === 'string' || img?.src) && !isBannedPhoto(img))
			.map((img) => {
				if (typeof img === 'string') {
					return { src: img, alt: 'Pooja Ceremony in Dubai' };
				}
				return {
					src: img.src,
					alt: img.alt || 'Pooja Ceremony in Dubai',
				};
			})
			.filter((img) => !failedUrls.has(img.src));
	}, [images, failedUrls]);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: 'start',
		skipSnaps: false,
		dragFree: false,
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);
	const [isPaused, setIsPaused] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(null);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
			emblaApi.off('reInit', onSelect);
		};
	}, [emblaApi, onSelect]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index) => {
			if (emblaApi) emblaApi.scrollTo(index);
		},
		[emblaApi]
	);

	// Gentle auto-play with pause on hover/interaction
	useEffect(() => {
		if (!emblaApi || isPaused || lightboxIndex !== null) return;

		const timer = setInterval(() => {
			emblaApi.scrollNext();
		}, 3800);

		return () => clearInterval(timer);
	}, [emblaApi, isPaused, lightboxIndex]);

	// Lightbox handlers
	const openLightbox = (index) => {
		setLightboxIndex(index);
	};

	const closeLightbox = () => {
		setLightboxIndex(null);
	};

	const lightboxPrev = useCallback(
		(e) => {
			if (e) e.stopPropagation();
			setLightboxIndex((prev) =>
				prev > 0 ? prev - 1 : validImages.length - 1
			);
		},
		[validImages.length]
	);

	const lightboxNext = useCallback(
		(e) => {
			if (e) e.stopPropagation();
			setLightboxIndex((prev) =>
				prev < validImages.length - 1 ? prev + 1 : 0
			);
		},
		[validImages.length]
	);

	useEffect(() => {
		if (lightboxIndex === null) return;

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') closeLightbox();
			else if (e.key === 'ArrowLeft') lightboxPrev();
			else if (e.key === 'ArrowRight') lightboxNext();
		};

		window.addEventListener('keydown', handleKeyDown);
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = originalOverflow;
		};
	}, [lightboxIndex, lightboxPrev, lightboxNext]);

	if (validImages.length === 0) {
		return null;
	}

	return (
		<div
			className={`grid-gallery-carousel ${className}`}
			data-element-id={id}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onTouchStart={() => setIsPaused(true)}
			onTouchEnd={() => setIsPaused(false)}
			role="region"
			aria-roledescription="carousel"
			aria-label="Media Gallery"
		>
			<div className="grid-gallery-viewport" ref={emblaRef}>
				<div className="grid-gallery-track">
					{validImages.map((image, index) => (
						<div
							key={`${id}-${index}`}
							className="grid-gallery-slide"
							role="group"
							aria-roledescription="slide"
							aria-label={`${index + 1} of ${validImages.length}`}
						>
							<div
								className="grid-gallery-card"
								onClick={() => openLightbox(index)}
								title="Click to view full photo"
							>
								<div className="grid-gallery-card-aspect">
									<img
										src={image.src}
										alt={image.alt}
										loading="lazy"
										onError={() => {
											if (image.src) {
												setFailedUrls((prev) => new Set(prev).add(image.src));
											}
										}}
										className="grid-gallery-card-img"
									/>
									<div className="grid-gallery-card-overlay">
										<div className="grid-gallery-zoom-badge">
											<ZoomIn size={14} />
											<span>View</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Left / Right Carousel Navigation Controls */}
			<button
				type="button"
				className="grid-gallery-nav-btn grid-gallery-nav-btn--prev"
				onClick={scrollPrev}
				aria-label="Previous image"
			>
				<ChevronLeft size={22} />
			</button>
			<button
				type="button"
				className="grid-gallery-nav-btn grid-gallery-nav-btn--next"
				onClick={scrollNext}
				aria-label="Next image"
			>
				<ChevronRight size={22} />
			</button>

			{/* Dot Navigation Indicators */}
			{scrollSnaps.length > 1 && (
				<div className="grid-gallery-dots" aria-label="Gallery slides pagination">
					{scrollSnaps.map((_, idx) => (
						<button
							key={idx}
							type="button"
							className={`grid-gallery-dot ${
								selectedIndex === idx ? 'grid-gallery-dot--active' : ''
							}`}
							onClick={() => scrollTo(idx)}
							aria-label={`Go to slide ${idx + 1}`}
						/>
					))}
				</div>
			)}

			{/* Full-Screen Lightbox Modal */}
			{lightboxIndex !== null && validImages[lightboxIndex] && (
				<div
					className="grid-gallery-lightbox"
					onClick={closeLightbox}
					role="dialog"
					aria-modal="true"
					aria-label="Image Preview"
				>
					<div
						className="grid-gallery-lightbox-header"
						onClick={(e) => e.stopPropagation()}
					>
						<span className="grid-gallery-lightbox-counter">
							Photo {lightboxIndex + 1} of {validImages.length}
						</span>
						<button
							type="button"
							className="grid-gallery-lightbox-close"
							onClick={closeLightbox}
							aria-label="Close photo preview"
						>
							<X size={20} />
						</button>
					</div>

					<div
						className="grid-gallery-lightbox-stage"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={validImages[lightboxIndex].src.split('?')[0]}
							alt={validImages[lightboxIndex].alt}
							className="grid-gallery-lightbox-img"
						/>

						{validImages.length > 1 && (
							<>
								<button
									type="button"
									className="grid-gallery-lightbox-btn grid-gallery-lightbox-btn--prev"
									onClick={lightboxPrev}
									aria-label="Previous photo"
								>
									<ChevronLeft size={26} />
								</button>
								<button
									type="button"
									className="grid-gallery-lightbox-btn grid-gallery-lightbox-btn--next"
									onClick={lightboxNext}
									aria-label="Next photo"
								>
									<ChevronRight size={26} />
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
