import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	Plus,
	Trash2,
	Edit3,
	ArrowLeft,
	ArrowRight,
	Upload,
	Image as ImageIcon,
	CheckCircle,
	AlertTriangle,
	RefreshCw,
	RotateCcw,
	ExternalLink,
	X,
	Eye,
	ZoomIn,
	Sparkles,
	Sliders,
	Layers,
	ChevronLeft,
	ChevronRight
} from 'lucide-react';
import photoService from '@/services/photoService';
import { SITE_SECTIONS } from '@/config/siteSections';

// Default fallback images for home_gallery if DB/server is empty
const HOME_GALLERY_DEFAULTS = SITE_SECTIONS.find(p => p.pageId === 'home')
	?.sections.find(s => s.sectionId === 'home_gallery')?.defaults || [];

// Gallery targets configuration
const GALLERY_TARGETS = [
	{
		id: 'home_gallery',
		pageId: 'home',
		sectionId: 'home_gallery',
		title: 'Home Page Media Gallery',
		sectionName: 'Section 6 (Gallery Carousel)',
		websiteUrl: '/#vW1W8G',
		description: 'The primary photo showcase near the bottom of your homepage, viewed by all visitors.',
		defaults: HOME_GALLERY_DEFAULTS
	},
	{
		id: 'authentic_gallery',
		pageId: 'authentic-vedic-pooja-dubai',
		sectionId: 'authentic_gallery',
		title: 'Authentic Ceremony Gallery',
		sectionName: 'Authentic Vedic Pooja • Section 3',
		websiteUrl: '/authentic-vedic-pooja-dubai',
		description: 'Ceremony proceedings gallery on the Authentic Vedic Pooja in Dubai service page.',
		defaults: SITE_SECTIONS.find(p => p.pageId === 'authentic-vedic-pooja-dubai')
			?.sections.find(s => s.sectionId === 'authentic_gallery')?.defaults || []
	}
];

export default function MediaGalleryManager() {
	// Active gallery target ('home_gallery' is default)
	const [selectedTargetId, setSelectedTargetId] = useState('home_gallery');
	const currentTarget = useMemo(
		() => GALLERY_TARGETS.find(t => t.id === selectedTargetId) || GALLERY_TARGETS[0],
		[selectedTargetId]
	);

	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isLiveFromDb, setIsLiveFromDb] = useState(false);
	const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

	// Modals
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isRestoreOpen, setIsRestoreOpen] = useState(false);
	const [lightboxPhoto, setLightboxPhoto] = useState(null);

	// Target photo for edit / delete
	const [selectedPhoto, setSelectedPhoto] = useState(null);

	// Add Form State
	const [addMode, setAddMode] = useState('upload'); // 'upload' | 'url'
	const [addFile, setAddFile] = useState(null);
	const [addPreview, setAddPreview] = useState('');
	const [addImageUrl, setAddImageUrl] = useState('');
	const [addTitle, setAddTitle] = useState('');
	const [addAlt, setAddAlt] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Edit Form State
	const [editMode, setEditMode] = useState('keep'); // 'keep' | 'upload' | 'url'
	const [editFile, setEditFile] = useState(null);
	const [editPreview, setEditPreview] = useState('');
	const [editImageUrl, setEditImageUrl] = useState('');
	const [editTitle, setEditTitle] = useState('');
	const [editAlt, setEditAlt] = useState('');
	const [editPosition, setEditPosition] = useState(1);

	// Interactive Live Preview State
	const [previewIndex, setPreviewIndex] = useState(0);

	// Auto-dismiss status message after 4 seconds
	useEffect(() => {
		if (statusMessage.text) {
			const timer = setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
			return () => clearTimeout(timer);
		}
	}, [statusMessage]);

	// Load photos for active gallery
	const loadPhotos = useCallback(async () => {
		setLoading(true);
		try {
			const saved = await photoService.fetchSectionPhotos(currentTarget.pageId, currentTarget.sectionId);
			if (saved !== null && Array.isArray(saved) && saved.length > 0) {
				setPhotos(saved);
				setIsLiveFromDb(true);
			} else {
				setPhotos(currentTarget.defaults || []);
				setIsLiveFromDb(false);
			}
		} catch (err) {
			console.error('Failed to load gallery photos:', err);
			setPhotos(currentTarget.defaults || []);
			setIsLiveFromDb(false);
		} finally {
			setLoading(false);
		}
	}, [currentTarget]);

	useEffect(() => {
		loadPhotos();
		setPreviewIndex(0);
	}, [loadPhotos]);

	// Listen to real-time events across tabs
	useEffect(() => {
		const handleDataUpdate = (event) => {
			const detail = event?.detail;
			if (!detail || !detail.pageId || (detail.pageId === currentTarget.pageId && detail.sectionId === currentTarget.sectionId)) {
				loadPhotos();
			}
		};

		window.addEventListener('pj_site_data_updated', handleDataUpdate);
		return () => window.removeEventListener('pj_site_data_updated', handleDataUpdate);
	}, [loadPhotos, currentTarget]);

	// Keep previewIndex within bounds
	useEffect(() => {
		if (photos.length > 0 && previewIndex >= photos.length) {
			setPreviewIndex(Math.max(0, photos.length - 1));
		}
	}, [photos.length, previewIndex]);

	// =========================================================================
	// ADD PHOTO HANDLERS
	// =========================================================================
	const handleAddFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file (JPG, PNG, WebP).');
			return;
		}

		if (file.size > 15 * 1024 * 1024) {
			alert('Image size exceeds 15MB limit. Please select a smaller image.');
			return;
		}

		setAddFile(file);
		const reader = new FileReader();
		reader.onload = (event) => {
			setAddPreview(event.target.result);
		};
		reader.readAsDataURL(file);

		// Autofill title if empty
		if (!addTitle) {
			const cleanName = file.name
				.replace(/\.[^/.]+$/, '')
				.replace(/[-_]/g, ' ')
				.replace(/\b\w/g, (c) => c.toUpperCase());
			setAddTitle(cleanName);
		}
	};

	const handleAddSubmit = async (e) => {
		e.preventDefault();
		if (addMode === 'upload' && !addFile) {
			alert('Please select an image file to upload.');
			return;
		}
		if (addMode === 'url' && !addImageUrl.trim()) {
			alert('Please enter a valid image URL.');
			return;
		}

		try {
			setIsSubmitting(true);
			const newSortOrder = photos.length;
			await photoService.uploadPhoto(addMode === 'upload' ? addFile : null, {
				pageId: currentTarget.pageId,
				sectionId: currentTarget.sectionId,
				title: addTitle.trim() || 'Vedic Ceremony Photo',
				altText: addAlt.trim() || addTitle.trim() || 'Vedic Ceremony in Dubai',
				sortOrder: newSortOrder,
				existingPhotos: photos,
				imageUrl: addMode === 'url' ? addImageUrl.trim() : ''
			});

			setIsAddOpen(false);
			setAddFile(null);
			setAddPreview('');
			setAddImageUrl('');
			setAddTitle('');
			setAddAlt('');
			setStatusMessage({
				type: 'success',
				text: 'New photo successfully added to Media Gallery and saved to live server!'
			});
			await loadPhotos();
		} catch (err) {
			console.error('Add photo failed:', err);
			alert(`Failed to add photo: ${err.message || 'Please try again'}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// =========================================================================
	// EDIT PHOTO HANDLERS
	// =========================================================================
	const openEditModal = (photo, index) => {
		setSelectedPhoto(photo);
		setEditTitle(photo.title || '');
		setEditAlt(photo.alt || '');
		setEditPosition(index + 1);
		setEditMode('keep');
		setEditFile(null);
		setEditPreview(photo.src || '');
		setEditImageUrl(photo.src || '');
		setIsEditOpen(true);
	};

	const handleEditFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file (JPG, PNG, WebP).');
			return;
		}

		setEditFile(file);
		const reader = new FileReader();
		reader.onload = (event) => {
			setEditPreview(event.target.result);
		};
		reader.readAsDataURL(file);
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		if (!selectedPhoto) return;

		try {
			setIsSubmitting(true);
			let replacementFile = null;
			let updates = {
				title: editTitle.trim(),
				altText: editAlt.trim(),
				sortOrder: Number(editPosition) - 1
			};

			if (editMode === 'upload' && editFile) {
				replacementFile = editFile;
			} else if (editMode === 'url' && editImageUrl.trim()) {
				updates.imageUrl = editImageUrl.trim();
			}

			// Update the photo object
			const updated = await photoService.updatePhoto(
				selectedPhoto,
				updates,
				replacementFile,
				{
					pageId: currentTarget.pageId,
					sectionId: currentTarget.sectionId,
					allPhotos: photos
				}
			);

			// If position changed, re-sort array
			const newIndex = Math.max(0, Math.min(photos.length - 1, Number(editPosition) - 1));
			const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id || p.src === selectedPhoto.src);
			if (currentIndex !== -1 && currentIndex !== newIndex) {
				const reordered = [...photos];
				const [moved] = reordered.splice(currentIndex, 1);
				reordered.splice(newIndex, 0, { ...moved, ...updated });
				await photoService.reorderPhotos(reordered, {
					pageId: currentTarget.pageId,
					sectionId: currentTarget.sectionId
				});
			}

			setIsEditOpen(false);
			setSelectedPhoto(null);
			setEditFile(null);
			setEditPreview('');
			setStatusMessage({
				type: 'success',
				text: 'Photo details successfully updated and saved to live server!'
			});
			await loadPhotos();
		} catch (err) {
			console.error('Update failed:', err);
			alert(`Failed to update photo: ${err.message || 'Please try again'}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// =========================================================================
	// DELETE PHOTO HANDLERS
	// =========================================================================
	const openDeleteModal = (photo) => {
		setSelectedPhoto(photo);
		setIsDeleteOpen(true);
	};

	const handleDeleteSubmit = async () => {
		if (!selectedPhoto) return;

		try {
			setIsSubmitting(true);
			await photoService.deletePhoto(selectedPhoto, {
				pageId: currentTarget.pageId,
				sectionId: currentTarget.sectionId,
				allPhotos: photos
			});

			setIsDeleteOpen(false);
			setSelectedPhoto(null);
			setStatusMessage({
				type: 'success',
				text: 'Photo removed from Media Gallery.'
			});
			await loadPhotos();
		} catch (err) {
			console.error('Delete failed:', err);
			alert(`Failed to delete photo: ${err.message || 'Please try again'}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// =========================================================================
	// REORDER HANDLERS (Move Left / Move Right)
	// =========================================================================
	const handleMove = async (index, direction) => {
		const targetIndex = direction === 'left' ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= photos.length) return;

		const reordered = [...photos];
		const temp = reordered[index];
		reordered[index] = reordered[targetIndex];
		reordered[targetIndex] = temp;

		// Update UI optimistically
		setPhotos(reordered);

		try {
			await photoService.reorderPhotos(reordered, {
				pageId: currentTarget.pageId,
				sectionId: currentTarget.sectionId
			});
			setStatusMessage({
				type: 'success',
				text: `Photo order updated (moved to #${targetIndex + 1}).`
			});
		} catch (err) {
			console.error('Reorder failed:', err);
			await loadPhotos();
		}
	};

	// =========================================================================
	// RESTORE DEFAULTS HANDLER
	// =========================================================================
	const handleRestoreDefaults = async () => {
		try {
			setIsSubmitting(true);
			await photoService.restoreDefaultPhotos(currentTarget.pageId, currentTarget.sectionId);
			setIsRestoreOpen(false);
			setStatusMessage({
				type: 'success',
				text: `Original default photos restored for ${currentTarget.title}!`
			});
			await loadPhotos();
		} catch (err) {
			console.error('Restore failed:', err);
			alert(`Failed to restore: ${err.message || 'Please try again'}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex-1 flex flex-col overflow-y-auto bg-[#FAF6F0]">
			{/* Toast Notification */}
			{statusMessage.text && (
				<div
					className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl transition-all duration-300 font-['Poppins',sans-serif] text-sm font-semibold ${
						statusMessage.type === 'success'
							? 'bg-emerald-800 text-white border border-emerald-600'
							: 'bg-rose-800 text-white border border-rose-600'
					}`}
				>
					{statusMessage.type === 'success' ? (
						<CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
					) : (
						<AlertTriangle className="w-5 h-5 text-rose-300 shrink-0" />
					)}
					<span>{statusMessage.text}</span>
				</div>
			)}

			{/* ========================================================================= */}
			{/* HEADER BANNER */}
			{/* ========================================================================= */}
			<div className="bg-white border-b border-[#E5DCCF] px-8 sm:px-10 py-6 shadow-2xs">
				<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
					<div>
						<div className="flex items-center gap-2 text-xs sm:text-sm text-[#C4923C] font-bold tracking-wider uppercase mb-1.5 font-['Poppins',sans-serif]">
							<Sparkles className="w-4 h-4 text-[#8C2B1D]" />
							<span>Website Media Management</span>
							<span className="text-[#2B1A14]/30">•</span>
							<span className="text-[#8C2B1D] font-mono">{currentTarget.sectionName}</span>
						</div>
						<h1 className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
							Media Gallery Manager
						</h1>
						<p className="text-sm sm:text-base text-[#2B1A14]/75 mt-1 max-w-2xl font-['Poppins',sans-serif]">
							{currentTarget.description}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap items-center gap-2.5">
						<button
							onClick={loadPhotos}
							disabled={loading}
							title="Refresh photos from server"
							className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:border-[#8C2B1D]/40 transition disabled:opacity-50"
						>
							<RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
						</button>

						<button
							onClick={() => setIsRestoreOpen(true)}
							title="Restore original default photos"
							className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] shadow-2xs"
						>
							<RotateCcw className="w-4 h-4 text-[#8C2B1D]" />
							<span>Restore Defaults</span>
						</button>

						<a
							href={currentTarget.websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif]"
						>
							<span>View Live on Site</span>
							<ExternalLink className="w-4 h-4" />
						</a>

						<button
							onClick={() => {
								setAddMode('upload');
								setAddFile(null);
								setAddPreview('');
								setAddImageUrl('');
								setAddTitle('');
								setAddAlt('');
								setIsAddOpen(true);
							}}
							className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-sm sm:text-base font-bold shadow-md shadow-[#8C2B1D]/20 transition font-['Marcellus',serif]"
						>
							<Plus className="w-5 h-5" />
							<span>+ Add New Photo</span>
						</button>
					</div>
				</div>

				{/* Gallery Target Switcher Tabs */}
				<div className="flex flex-wrap gap-2.5 border-t border-[#F2EBDD] pt-4">
					{GALLERY_TARGETS.map((target) => {
						const isActive = target.id === selectedTargetId;
						return (
							<button
								key={target.id}
								onClick={() => setSelectedTargetId(target.id)}
								className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] flex items-center gap-2 ${
									isActive
										? 'bg-[#8C2B1D] text-white shadow-xs'
										: 'bg-[#F2EBDD] text-[#2B1A14]/80 hover:bg-[#EAE0CE] hover:text-[#2B1A14]'
								}`}
							>
								<ImageIcon className="w-4 h-4" />
								<span>{target.title}</span>
								<span className={`text-[11px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-[#2B1A14]'}`}>
									{target.id === selectedTargetId ? photos.length : target.defaults.length}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* MAIN WORKSPACE CONTENT */}
			{/* ========================================================================= */}
			<div className="p-8 sm:p-10 max-w-7xl space-y-8">
				{/* Status & Info Bar */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#E5DCCF] shadow-2xs">
					<div className="flex items-center gap-3">
						<span className="text-xs font-bold uppercase tracking-wider text-[#2B1A14]/70 font-['Poppins',sans-serif]">Status:</span>
						{isLiveFromDb ? (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs font-['Poppins',sans-serif]">
								<span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
								Live Server Overrides Active ({photos.length} photos)
							</span>
						) : (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs font-['Poppins',sans-serif]">
								<span className="w-2 h-2 rounded-full bg-amber-600" />
								Original Template Photos Active ({photos.length} photos)
							</span>
						)}
					</div>

					<div className="text-xs text-[#2B1A14]/70 font-semibold font-['Poppins',sans-serif]">
						💡 Tip: Use <span className="text-[#8C2B1D] font-bold">←</span> and <span className="text-[#8C2B1D] font-bold">→</span> arrows to reorder photos in the carousel.
					</div>
				</div>

				{/* ========================================================================= */}
				{/* INTERACTIVE LIVE CAROUSEL PREVIEW */}
				{/* ========================================================================= */}
				{photos.length > 0 && (
					<div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-8 shadow-xs">
						<div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F2EBDD]">
							<div className="flex items-center gap-2.5">
								<div className="w-8 h-8 rounded-xl bg-[#8C2B1D]/10 text-[#8C2B1D] flex items-center justify-center">
									<Eye className="w-4 h-4" />
								</div>
								<div>
									<h3 className="text-lg font-bold text-[#8C2B1D] font-['Marcellus',serif]">
										Live Carousel Preview
									</h3>
									<p className="text-xs text-[#2B1A14]/70 font-['Poppins',sans-serif]">
										Exact interactive view as visitors experience on your live website
									</p>
								</div>
							</div>

							<div className="text-xs font-bold text-[#C4923C] font-['Poppins',sans-serif] bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#E5DCCF]">
								Slide {previewIndex + 1} of {photos.length}
							</div>
						</div>

						{/* Carousel Window */}
						<div className="relative rounded-2xl overflow-hidden bg-[#2B1A14] aspect-16/9 sm:aspect-21/9 max-h-[380px] flex items-center justify-center shadow-inner group">
							<img
								src={photos[previewIndex]?.src}
								alt={photos[previewIndex]?.alt || photos[previewIndex]?.title || 'Preview'}
								className="w-full h-full object-cover transition-opacity duration-300"
							/>

							{/* Gradient Vignette */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

							{/* Caption Overlay */}
							<div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
								<div>
									<span className="inline-block px-2.5 py-1 rounded-md bg-[#8C2B1D] text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 font-['Poppins',sans-serif]">
										Slide #{previewIndex + 1}
									</span>
									<h4 className="text-lg sm:text-xl font-bold text-white font-['Marcellus',serif] drop-shadow-md">
										{photos[previewIndex]?.title || 'Untitled Photo'}
									</h4>
									<p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-['Poppins',sans-serif] drop-shadow-sm">
										Alt: {photos[previewIndex]?.alt || 'None'}
									</p>
								</div>

								<button
									onClick={() => setLightboxPhoto(photos[previewIndex])}
									className="pointer-events-auto p-2.5 rounded-xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition shadow-md"
									title="Fullscreen Zoom"
								>
									<ZoomIn className="w-5 h-5" />
								</button>
							</div>

							{/* Prev / Next Nav Buttons */}
							<button
								onClick={() => setPreviewIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
								className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2B1A14] flex items-center justify-center transition shadow-lg opacity-80 hover:opacity-100"
								title="Previous Slide"
							>
								<ChevronLeft className="w-6 h-6" />
							</button>
							<button
								onClick={() => setPreviewIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
								className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2B1A14] flex items-center justify-center transition shadow-lg opacity-80 hover:opacity-100"
								title="Next Slide"
							>
								<ChevronRight className="w-6 h-6" />
							</button>
						</div>

						{/* Thumbnails strip */}
						<div className="flex gap-2.5 overflow-x-auto pt-4 pb-1">
							{photos.map((p, idx) => (
								<button
									key={p.id || idx}
									onClick={() => setPreviewIndex(idx)}
									className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
										idx === previewIndex
											? 'border-[#8C2B1D] ring-2 ring-[#8C2B1D]/30 scale-105'
											: 'border-transparent opacity-60 hover:opacity-100'
									}`}
								>
									<img src={p.src} alt={p.title || `Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
									<span className="absolute bottom-0 right-0 px-1 text-[9px] font-bold bg-black/70 text-white rounded-tl">
										#{idx + 1}
									</span>
								</button>
							))}
						</div>
					</div>
				)}

				{/* ========================================================================= */}
				{/* PHOTOS GRID & MANAGEMENT */}
				{/* ========================================================================= */}
				<div>
					<div className="flex items-center justify-between mb-5">
						<div className="flex items-center gap-2">
							<h3 className="text-xl sm:text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
								Gallery Photos ({photos.length})
							</h3>
						</div>

						<button
							onClick={() => {
								setAddMode('upload');
								setAddFile(null);
								setAddPreview('');
								setAddImageUrl('');
								setAddTitle('');
								setAddAlt('');
								setIsAddOpen(true);
							}}
							className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C2B1D] text-white text-xs sm:text-sm font-bold hover:bg-[#a33222] transition font-['Marcellus',serif] shadow-xs"
						>
							<Plus className="w-4 h-4" />
							<span>Add Photo</span>
						</button>
					</div>

					{loading ? (
						<div className="py-20 flex flex-col items-center justify-center text-[#8C2B1D]">
							<RefreshCw className="w-10 h-10 animate-spin mb-3 text-[#8C2B1D]" />
							<p className="text-sm uppercase tracking-wider font-bold font-['Poppins',sans-serif]">Loading Gallery Photos...</p>
						</div>
					) : photos.length === 0 ? (
						<div className="py-16 text-center border-2 border-dashed border-[#E2D7C8] rounded-3xl bg-white p-8">
							<ImageIcon className="w-14 h-14 text-[#2B1A14]/20 mx-auto mb-3.5" />
							<h3 className="text-xl font-bold text-[#8C2B1D] mb-1.5 font-['Marcellus',serif]">
								No photos in this gallery
							</h3>
							<p className="text-sm text-[#2B1A14]/75 mb-6 max-w-md mx-auto font-['Poppins',sans-serif]">
								You can upload your ceremony photos or restore the original curated Vedic Puja photos.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-3">
								<button
									onClick={handleRestoreDefaults}
									className="px-5 py-2.5 bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] rounded-xl text-sm font-bold transition shadow-xs flex items-center gap-2 font-['Poppins',sans-serif]"
								>
									<RotateCcw className="w-4 h-4 text-[#8C2B1D]" />
									<span>Restore Original 8 Photos</span>
								</button>
								<button
									onClick={() => setIsAddOpen(true)}
									className="px-5 py-2.5 bg-[#8C2B1D] text-white rounded-xl text-sm font-bold hover:bg-[#a33222] transition shadow-md shadow-[#8C2B1D]/20 flex items-center gap-2 font-['Marcellus',serif]"
								>
									<Plus className="w-4 h-4" />
									<span>Add New Photo</span>
								</button>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{photos.map((photo, index) => {
								const isFirst = index === 0;
								const isLast = index === photos.length - 1;

								return (
									<div
										key={photo.id || index}
										className="bg-white border border-[#E5DCCF] hover:border-[#8C2B1D]/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition duration-300 group flex flex-col"
									>
										{/* Image Aspect Square Frame */}
										<div className="aspect-square relative bg-[#FAF6F0] overflow-hidden">
											<img
												src={photo.src}
												alt={photo.alt || photo.title || 'Ceremony Photo'}
												className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
												loading="lazy"
											/>

											{/* Position Badge */}
											<div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#2B1A14]/85 backdrop-blur-md text-xs font-bold text-[#E5B361] border border-white/10 font-['Poppins',sans-serif]">
												#{index + 1}
											</div>

											{/* Quick Hover Overlay */}
											<div className="absolute inset-0 bg-[#2B1A14]/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2.5 p-4">
												<button
													onClick={() => setLightboxPhoto(photo)}
													title="View Fullscreen"
													className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transition"
												>
													<ZoomIn className="w-5 h-5" />
												</button>
												<button
													onClick={() => openEditModal(photo, index)}
													title="Edit Photo Details"
													className="p-2.5 rounded-xl bg-[#E5B361] text-[#2B1A14] hover:bg-[#d6a24d] font-bold backdrop-blur-sm transition"
												>
													<Edit3 className="w-5 h-5" />
												</button>
												<button
													onClick={() => openDeleteModal(photo)}
													title="Delete Photo"
													className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 backdrop-blur-sm transition"
												>
													<Trash2 className="w-5 h-5" />
												</button>
											</div>
										</div>

										{/* Photo Metadata */}
										<div className="p-4 flex-1 flex flex-col justify-between">
											<div>
												<h4 className="text-sm font-bold text-[#2B1A14] truncate mb-1" title={photo.title || 'Untitled'}>
													{photo.title || 'Untitled Photo'}
												</h4>
												<p className="text-xs text-[#2B1A14]/70 truncate" title={photo.alt || 'No alt text'}>
													Alt: {photo.alt || 'None'}
												</p>
											</div>

											{/* Reorder & Action Footer */}
											<div className="mt-4 pt-3.5 border-t border-[#F2EBDD] flex items-center justify-between">
												<div className="flex items-center gap-1">
													<button
														onClick={() => handleMove(index, 'left')}
														disabled={isFirst}
														title="Move Left (Earlier in carousel)"
														className="p-1.5 rounded-lg text-[#2B1A14]/70 hover:text-[#8C2B1D] hover:bg-[#FAF6F0] transition disabled:opacity-20"
													>
														<ArrowLeft className="w-4 h-4" />
													</button>
													<button
														onClick={() => handleMove(index, 'right')}
														disabled={isLast}
														title="Move Right (Later in carousel)"
														className="p-1.5 rounded-lg text-[#2B1A14]/70 hover:text-[#8C2B1D] hover:bg-[#FAF6F0] transition disabled:opacity-20"
													>
														<ArrowRight className="w-4 h-4" />
													</button>
												</div>

												<div className="flex items-center gap-2">
													<button
														onClick={() => openEditModal(photo, index)}
														className="text-xs font-bold text-[#8C2B1D] hover:underline px-2 py-1 rounded transition font-['Poppins',sans-serif]"
													>
														Edit
													</button>
													<button
														onClick={() => openDeleteModal(photo)}
														className="text-xs font-bold text-red-600 hover:underline px-2 py-1 rounded transition font-['Poppins',sans-serif]"
													>
														Delete
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* MODAL: ADD NEW PHOTO */}
			{/* ========================================================================= */}
			{isAddOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsAddOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Header */}
						<div className="flex items-start justify-between pb-3 mb-4 border-b border-[#F2EBDD] shrink-0">
							<div>
								<h3 className="text-xl sm:text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Add Photo to Media Gallery
								</h3>
								<p className="text-xs text-[#2B1A14]/70 mt-1 font-['Poppins',sans-serif]">
									Target: <span className="text-[#8C2B1D] font-bold">{currentTarget.title}</span>
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsAddOpen(false)}
								className="p-1 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition"
								title="Close"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleAddSubmit} className="flex-1 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto pr-1.5 space-y-4">
								{/* Mode Switcher: Upload File vs Image URL */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-2 font-['Poppins',sans-serif]">
										Image Source Method
									</label>
									<div className="grid grid-cols-2 gap-2 bg-[#FAF6F0] p-1.5 rounded-xl border border-[#E5DCCF]">
										<button
											type="button"
											onClick={() => setAddMode('upload')}
											className={`py-2 rounded-lg text-xs font-bold transition font-['Poppins',sans-serif] flex items-center justify-center gap-1.5 ${
												addMode === 'upload'
													? 'bg-[#8C2B1D] text-white shadow-xs'
													: 'text-[#2B1A14]/70 hover:text-[#2B1A14]'
											}`}
										>
											<Upload className="w-4 h-4" />
											<span>Upload from Device</span>
										</button>
										<button
											type="button"
											onClick={() => setAddMode('url')}
											className={`py-2 rounded-lg text-xs font-bold transition font-['Poppins',sans-serif] flex items-center justify-center gap-1.5 ${
												addMode === 'url'
													? 'bg-[#8C2B1D] text-white shadow-xs'
													: 'text-[#2B1A14]/70 hover:text-[#2B1A14]'
											}`}
										>
											<ImageIcon className="w-4 h-4" />
											<span>Image URL Link</span>
										</button>
									</div>
								</div>

								{/* Upload Mode Dropzone */}
								{addMode === 'upload' ? (
									<div>
										<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
											Select Image File
										</label>
										<div className="border-2 border-dashed border-[#E2D7C8] hover:border-[#8C2B1D] rounded-2xl p-5 text-center cursor-pointer transition relative bg-[#FAF6F0]">
											<input
												type="file"
												accept="image/*"
												onChange={handleAddFileSelect}
												className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
											/>
											{addPreview ? (
												<div className="flex flex-col items-center">
													<img
														src={addPreview}
														alt="Preview"
														className="h-32 max-h-36 object-contain rounded-xl mb-2.5 shadow-xs"
													/>
													<span className="text-xs text-[#8C2B1D] font-bold">
														{addFile?.name} (Click to change)
													</span>
												</div>
											) : (
												<div className="flex flex-col items-center py-4">
													<Upload className="w-10 h-10 text-[#8C2B1D] mb-2 stroke-1" />
													<p className="text-sm font-bold text-[#2B1A14] mb-1 font-['Poppins',sans-serif]">
														Drag & drop or click to browse
													</p>
													<p className="text-xs text-[#2B1A14]/60">Supports JPG, PNG, WebP (Square 1:1 recommended)</p>
												</div>
											)}
										</div>
									</div>
								) : (
									/* URL Mode Input */
									<div>
										<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
											Paste Image URL
										</label>
										<input
											type="url"
											value={addImageUrl}
											onChange={(e) => setAddImageUrl(e.target.value)}
											placeholder="https://.../photo.jpg"
											className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C8] focus:border-[#8C2B1D] focus:ring-1 focus:ring-[#8C2B1D] outline-hidden text-sm"
										/>
										{addImageUrl && (
											<div className="mt-2 p-2 bg-[#FAF6F0] rounded-xl border border-[#E2D7C8] flex items-center justify-center">
												<img
													src={addImageUrl}
													alt="URL Preview"
													className="h-28 max-h-32 object-contain rounded-lg"
													onError={(e) => {
														e.currentTarget.style.display = 'none';
													}}
												/>
											</div>
										)}
									</div>
								)}

								{/* Title Input */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Photo Title / Caption
									</label>
									<input
										type="text"
										value={addTitle}
										onChange={(e) => setAddTitle(e.target.value)}
										placeholder="e.g. Traditional Havan and Mandap Setup"
										className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C8] focus:border-[#8C2B1D] focus:ring-1 focus:ring-[#8C2B1D] outline-hidden text-sm"
									/>
								</div>

								{/* Alt Text Input */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Alt Text (SEO & Accessibility)
									</label>
									<input
										type="text"
										value={addAlt}
										onChange={(e) => setAddAlt(e.target.value)}
										placeholder="e.g. Vedic Puja Ceremony in Dubai with Pandit Ji"
										className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C8] focus:border-[#8C2B1D] focus:ring-1 focus:ring-[#8C2B1D] outline-hidden text-sm"
									/>
								</div>
							</div>

							{/* Actions Footer */}
							<div className="flex gap-3 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
								<button
									type="button"
									onClick={() => setIsAddOpen(false)}
									className="flex-1 py-2.5 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting || (addMode === 'upload' && !addFile) || (addMode === 'url' && !addImageUrl)}
									className="flex-1 py-2.5 rounded-xl bg-[#8C2B1D] text-white text-sm font-bold hover:bg-[#a33222] transition disabled:opacity-50 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif] flex items-center justify-center gap-2"
								>
									{isSubmitting ? (
										<>
											<RefreshCw className="w-4 h-4 animate-spin" />
											<span>Saving to Live Server...</span>
										</>
									) : (
										<>
											<Plus className="w-4 h-4" />
											<span>Add to Gallery</span>
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL: EDIT PHOTO */}
			{/* ========================================================================= */}
			{isEditOpen && selectedPhoto && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsEditOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Header */}
						<div className="flex items-start justify-between pb-3 mb-4 border-b border-[#F2EBDD] shrink-0">
							<div>
								<h3 className="text-xl sm:text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Edit Photo Details
								</h3>
								<p className="text-xs text-[#2B1A14]/70 mt-1 font-['Poppins',sans-serif]">
									Gallery: <span className="text-[#8C2B1D] font-bold">{currentTarget.title}</span>
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsEditOpen(false)}
								className="p-1 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition"
								title="Close"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleEditSubmit} className="flex-1 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto pr-1.5 space-y-4">
								{/* Current Image Preview */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Photo Preview
									</label>
									<div className="relative rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E5DCCF] aspect-video flex items-center justify-center">
										<img
											src={editPreview || selectedPhoto.src}
											alt="Preview"
											className="w-full h-full object-contain"
										/>
									</div>
								</div>

								{/* Replace Image Option */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Replace Image (Optional)
									</label>
									<div className="grid grid-cols-3 gap-2 bg-[#FAF6F0] p-1.5 rounded-xl border border-[#E5DCCF] mb-3">
										<button
											type="button"
											onClick={() => setEditMode('keep')}
											className={`py-1.5 rounded-lg text-xs font-bold transition font-['Poppins',sans-serif] ${
												editMode === 'keep' ? 'bg-[#8C2B1D] text-white' : 'text-[#2B1A14]/70'
											}`}
										>
											Keep Current
										</button>
										<button
											type="button"
											onClick={() => setEditMode('upload')}
											className={`py-1.5 rounded-lg text-xs font-bold transition font-['Poppins',sans-serif] ${
												editMode === 'upload' ? 'bg-[#8C2B1D] text-white' : 'text-[#2B1A14]/70'
											}`}
										>
											Upload New File
										</button>
										<button
											type="button"
											onClick={() => setEditMode('url')}
											className={`py-1.5 rounded-lg text-xs font-bold transition font-['Poppins',sans-serif] ${
												editMode === 'url' ? 'bg-[#8C2B1D] text-white' : 'text-[#2B1A14]/70'
											}`}
										>
											Change URL
										</button>
									</div>

									{editMode === 'upload' && (
										<div className="border-2 border-dashed border-[#E2D7C8] hover:border-[#8C2B1D] rounded-xl p-3 text-center cursor-pointer transition relative bg-[#FAF6F0]">
											<input
												type="file"
												accept="image/*"
												onChange={handleEditFileSelect}
												className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
											/>
											<span className="text-xs text-[#8C2B1D] font-bold">
												{editFile ? editFile.name : 'Click to select new image file'}
											</span>
										</div>
									)}

									{editMode === 'url' && (
										<input
											type="url"
											value={editImageUrl}
											onChange={(e) => {
												setEditImageUrl(e.target.value);
												setEditPreview(e.target.value);
											}}
											placeholder="https://.../new-photo.jpg"
											className="w-full px-4 py-2 rounded-xl border border-[#E2D7C8] text-sm"
										/>
									)}
								</div>

								{/* Title Input */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Photo Title / Caption
									</label>
									<input
										type="text"
										value={editTitle}
										onChange={(e) => setEditTitle(e.target.value)}
										className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C8] focus:border-[#8C2B1D] text-sm"
									/>
								</div>

								{/* Alt Text Input */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Alt Text (SEO)
									</label>
									<input
										type="text"
										value={editAlt}
										onChange={(e) => setEditAlt(e.target.value)}
										className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C8] focus:border-[#8C2B1D] text-sm"
									/>
								</div>

								{/* Position In Gallery */}
								<div>
									<label className="block text-xs font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Carousel Position (#1 to #{photos.length})
									</label>
									<select
										value={editPosition}
										onChange={(e) => setEditPosition(Number(e.target.value))}
										className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C8] focus:border-[#8C2B1D] text-sm bg-white"
									>
										{photos.map((_, i) => (
											<option key={i + 1} value={i + 1}>
												Position #{i + 1} {i === 0 ? '(First Slide)' : i === photos.length - 1 ? '(Last Slide)' : ''}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Actions Footer */}
							<div className="flex gap-3 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
								<button
									type="button"
									onClick={() => setIsEditOpen(false)}
									className="flex-1 py-2.5 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 py-2.5 rounded-xl bg-[#8C2B1D] text-white text-sm font-bold hover:bg-[#a33222] transition disabled:opacity-50 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif] flex items-center justify-center gap-2"
								>
									{isSubmitting ? (
										<>
											<RefreshCw className="w-4 h-4 animate-spin" />
											<span>Saving Changes...</span>
										</>
									) : (
										<span>Save Changes</span>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL: DELETE CONFIRMATION */}
			{/* ========================================================================= */}
			{isDeleteOpen && selectedPhoto && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsDeleteOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto">
						<div className="flex items-center gap-3 text-red-600 mb-4">
							<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
								<Trash2 className="w-5 h-5 text-red-600" />
							</div>
							<h3 className="text-xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
								Delete Photo?
							</h3>
						</div>

						<p className="text-sm text-[#2B1A14]/75 mb-4 font-['Poppins',sans-serif]">
							Are you sure you want to remove <span className="font-bold text-[#2B1A14]">"{selectedPhoto.title || 'this photo'}"</span> from your Media Gallery?
						</p>

						<div className="rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E5DCCF] aspect-video mb-5">
							<img src={selectedPhoto.src} alt="To delete" className="w-full h-full object-contain" />
						</div>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setIsDeleteOpen(false)}
								className="flex-1 py-2.5 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleDeleteSubmit}
								disabled={isSubmitting}
								className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition disabled:opacity-50 shadow-md font-['Marcellus',serif]"
							>
								{isSubmitting ? 'Deleting...' : 'Delete Photo'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL: RESTORE DEFAULTS CONFIRMATION */}
			{/* ========================================================================= */}
			{isRestoreOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsRestoreOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto">
						<div className="flex items-center gap-3 text-amber-600 mb-4">
							<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
								<RotateCcw className="w-5 h-5 text-amber-700" />
							</div>
							<h3 className="text-xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
								Restore Default Gallery?
							</h3>
						</div>

						<p className="text-sm text-[#2B1A14]/75 mb-6 font-['Poppins',sans-serif]">
							This will remove all custom photo changes for <span className="font-bold text-[#2B1A14]">{currentTarget.title}</span> and restore the original 8 curated Vedic ceremony photos.
						</p>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setIsRestoreOpen(false)}
								className="flex-1 py-2.5 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleRestoreDefaults}
								disabled={isSubmitting}
								className="flex-1 py-2.5 rounded-xl bg-[#8C2B1D] text-white text-sm font-bold hover:bg-[#a33222] transition disabled:opacity-50 shadow-md font-['Marcellus',serif]"
							>
								{isSubmitting ? 'Restoring...' : 'Restore Defaults'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL: LIGHTBOX FULLSCREEN */}
			{/* ========================================================================= */}
			{lightboxPhoto && (
				<div
					className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex flex-col items-center justify-center"
					onClick={() => setLightboxPhoto(null)}
				>
					<button
						onClick={() => setLightboxPhoto(null)}
						className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
					>
						<X className="w-6 h-6" />
					</button>

					<div className="max-w-4xl max-h-[85vh] p-2 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
						<img
							src={lightboxPhoto.src}
							alt={lightboxPhoto.title}
							className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl mb-3"
						/>
						<div className="text-center text-white">
							<h4 className="text-lg font-bold font-['Marcellus',serif]">{lightboxPhoto.title}</h4>
							<p className="text-xs text-stone-300 font-['Poppins',sans-serif]">{lightboxPhoto.alt}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
