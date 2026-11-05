import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { SITE_SECTIONS } from '@/config/siteSections';
import photoService from '@/services/photoService';
import popupService, { DEFAULT_POPUP_SETTINGS } from '@/services/popupService';
import reviewService from '@/services/reviewService';
import poojaService from '@/services/poojaService';
import localPhotoDb, { ensureHostedImageUrl } from '@/services/localPhotoDb';
import { isSupabaseConfigured } from '@/lib/supabaseClient';
import MediaGalleryManager from './MediaGalleryManager';
import {
	LogOut,
	ExternalLink,
	Plus,
	Trash2,
	Edit3,
	ArrowUp,
	ArrowDown,
	Upload,
	Image as ImageIcon,
	Images,
	CheckCircle,
	AlertTriangle,
	RefreshCw,
	RotateCcw,
	Layers,
	FileText,
	Copy,
	Check,
	X,
	Eye,
	EyeOff,
	Bell,
	Sparkles,
	Link as LinkIcon,
	MessageSquare,
	Star,
	ZoomIn,
	MapPin,
	Calendar,
	Search,
	BookOpen,
	Tag,
	Lock,
	ShieldCheck,
	Key
} from 'lucide-react';

export default function AdminDashboard() {
	const { adminUser, logout, credentialsInfo, changeCredentials, resetCredentials } = useAdminAuth();

	// Primary module tab: 'gallery' | 'photos' | 'popup' | 'reviews' | 'services' | 'security'
	const [activeModule, setActiveModule] = useState('gallery');

	// =========================================================================
	// PHOTOS MANAGEMENT STATE
	// =========================================================================
	const [selectedPageId, setSelectedPageId] = useState(SITE_SECTIONS[0].pageId);
	const activePage = useMemo(
		() => SITE_SECTIONS.find((p) => p.pageId === selectedPageId) || SITE_SECTIONS[0],
		[selectedPageId]
	);

	const [selectedSectionId, setSelectedSectionId] = useState(activePage.sections[0].sectionId);
	const activeSection = useMemo(
		() => activePage.sections.find((s) => s.sectionId === selectedSectionId) || activePage.sections[0],
		[activePage, selectedSectionId]
	);

	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isLiveFromDb, setIsLiveFromDb] = useState(false);
	const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

	// Modals state
	const [isUploadOpen, setIsUploadOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);
	const [copiedSql, setCopiedSql] = useState(false);

	// Target photo for edit / delete
	const [selectedPhoto, setSelectedPhoto] = useState(null);

	// Upload form state
	const [uploadFile, setUploadFile] = useState(null);
	const [uploadPreview, setUploadPreview] = useState('');
	const [uploadTitle, setUploadTitle] = useState('');
	const [uploadAlt, setUploadAlt] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Edit form state
	const [editTitle, setEditTitle] = useState('');
	const [editAlt, setEditAlt] = useState('');
	const [editSortOrder, setEditSortOrder] = useState(0);
	const [editFile, setEditFile] = useState(null);
	const [editPreview, setEditPreview] = useState('');

	// =========================================================================
	// POP-UP NOTIFICATION STATE
	// =========================================================================
	const [popupSettings, setPopupSettings] = useState(DEFAULT_POPUP_SETTINGS);
	const [popupLoading, setPopupLoading] = useState(false);
	const [popupSaving, setPopupSaving] = useState(false);
	const [popupUploading, setPopupUploading] = useState(false);
	const [popupFile, setPopupFile] = useState(null);
	const [popupPreview, setPopupPreview] = useState(DEFAULT_POPUP_SETTINGS.image_url);

	// =========================================================================
	// CUSTOMER REVIEWS MODERATION STATE
	// =========================================================================
	const [adminReviews, setAdminReviews] = useState([]);
	const [reviewsLoading, setReviewsLoading] = useState(false);
	const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'approved' | 'hidden' | 'with-photo'
	const [reviewSearch, setReviewSearch] = useState('');
	const [selectedReviewForDelete, setSelectedReviewForDelete] = useState(null);
	const [isReviewDeleteOpen, setIsReviewDeleteOpen] = useState(false);
	const [reviewPhotoLightbox, setReviewPhotoLightbox] = useState(null);

	// =========================================================================
	// POOJA SERVICES CATALOG & BOXES STATE
	// =========================================================================
	const [services, setServices] = useState([]);
	const [servicesLoading, setServicesLoading] = useState(false);
	const [serviceFilter, setServiceFilter] = useState('all'); // 'all' | 'active' | 'hidden' | 'custom'
	const [serviceSearch, setServiceSearch] = useState('');
	const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
	const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
	const [isDeleteServiceOpen, setIsDeleteServiceOpen] = useState(false);
	const [selectedService, setSelectedService] = useState(null);

	// Add/Edit Service Form fields
	const [serviceTitle, setServiceTitle] = useState('');
	const [serviceBadge, setServiceBadge] = useState('');
	const [serviceDescription, setServiceDescription] = useState('');
	const [serviceTargetUrl, setServiceTargetUrl] = useState('/book-pandit-in-dubai');
	const [serviceButtonText, setServiceButtonText] = useState('Book This Pooja');
	const [serviceFile, setServiceFile] = useState(null);
	const [servicePreview, setServicePreview] = useState('');

	// =========================================================================
	// ADMIN CREDENTIALS & SECURITY STATE
	// =========================================================================
	const [securityCurrentPassword, setSecurityCurrentPassword] = useState('');
	const [securityNewEmail, setSecurityNewEmail] = useState('');
	const [securityNewPassword, setSecurityNewPassword] = useState('');
	const [securityConfirmPassword, setSecurityConfirmPassword] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRevealedPassword, setShowRevealedPassword] = useState(false);
	const [securitySubmitting, setSecuritySubmitting] = useState(false);
	const [securityStatus, setSecurityStatus] = useState({ type: '', text: '' });

	// Close any open modal on Escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setIsUploadOpen(false);
				setIsEditOpen(false);
				setIsDeleteOpen(false);
				setIsSetupGuideOpen(false);
				setIsReviewDeleteOpen(false);
				setReviewPhotoLightbox(null);
				setIsAddServiceOpen(false);
				setIsEditServiceOpen(false);
				setIsDeleteServiceOpen(false);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	// When page changes, reset section
	useEffect(() => {
		if (activePage?.sections?.length) {
			setSelectedSectionId(activePage.sections[0].sectionId);
		}
	}, [activePage]);

	// Load photos for active section (Cloud or Local Persistent Storage)
	const loadPhotos = useCallback(async () => {
		if (!activePage || !activeSection) return;

		setLoading(true);
		setStatusMessage({ type: '', text: '' });

		try {
			const savedPhotos = await photoService.fetchSectionPhotos(activePage.pageId, activeSection.sectionId);
			if (savedPhotos !== null && Array.isArray(savedPhotos)) {
				setPhotos(savedPhotos);
				setIsLiveFromDb(true);
			} else {
				setPhotos(activeSection.defaults || []);
				setIsLiveFromDb(false);
			}
		} catch (err) {
			console.error('Failed to load photos:', err);
			setPhotos(activeSection.defaults || []);
			setIsLiveFromDb(false);
		} finally {
			setLoading(false);
		}
	}, [activePage, activeSection]);

	// Restore default photos for the active section
	const handleRestoreDefaults = async () => {
		try {
			setIsSubmitting(true);
			await photoService.restoreDefaultPhotos(activePage.pageId, activeSection.sectionId);
			await poojaService.syncSectionToService(activePage.pageId, activeSection.sectionId, null);
			setStatusMessage({ type: 'success', text: `Default photo restored for ${activeSection.title}!` });
			await loadPhotos();
		} catch (err) {
			console.error('Restore failed:', err);
			alert(`Restore failed: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (activeModule === 'photos') {
			loadPhotos();
		}
	}, [loadPhotos, activeModule]);

	// Load popup settings
	const loadPopupSettings = useCallback(async () => {
		setPopupLoading(true);
		try {
			const data = await popupService.fetchPopupSettings();
			const current = data || DEFAULT_POPUP_SETTINGS;
			setPopupSettings(current);
			setPopupPreview(current.image_url);
		} catch (err) {
			console.error('Failed to load popup settings:', err);
		} finally {
			setPopupLoading(false);
		}
	}, []);

	useEffect(() => {
		if (activeModule === 'popup') {
			loadPopupSettings();
		}
	}, [loadPopupSettings, activeModule]);

	// Photo File Selection (Upload Modal)
	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select an image file (JPEG, PNG, WebP).');
			return;
		}

		setUploadFile(file);
		setUploadPreview(URL.createObjectURL(file));
		if (!uploadTitle) {
			const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
			setUploadTitle(cleanName);
		}
	};

	// Photo File Selection (Edit Modal - Image Replacement)
	const handleEditFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file (JPEG, PNG, WebP).');
			return;
		}

		setEditFile(file);
		setEditPreview(URL.createObjectURL(file));
	};

	// Execute Photo Upload
	const handleUploadSubmit = async (e) => {
		e.preventDefault();
		if (!uploadFile) {
			alert('Please select an image file to upload.');
			return;
		}

		try {
			setIsSubmitting(true);
			const newSortOrder = photos.length;
			await photoService.uploadPhoto(uploadFile, {
				pageId: activePage.pageId,
				sectionId: activeSection.sectionId,
				title: uploadTitle,
				altText: uploadAlt || uploadTitle,
				sortOrder: newSortOrder,
				existingPhotos: photos,
			});

			setIsUploadOpen(false);
			setUploadFile(null);
			setUploadPreview('');
			setUploadTitle('');
			setUploadAlt('');
			setStatusMessage({ type: 'success', text: 'Photo uploaded and permanently saved!' });
			await loadPhotos();

			// Sync with corresponding pooja service card if applicable
			try {
				const currentPhotos = await photoService.fetchSectionPhotos(activePage.pageId, activeSection.sectionId);
				if (currentPhotos && currentPhotos[0]?.src) {
					await poojaService.syncSectionToService(activePage.pageId, activeSection.sectionId, currentPhotos[0].src);
				}
			} catch (_) {}
		} catch (err) {
			console.error('Upload failed:', err);
			alert(`Upload failed: ${err.message || 'Unknown error'}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Open Edit Modal
	const openEditModal = (photo) => {
		setSelectedPhoto(photo);
		setEditTitle(photo.title || '');
		setEditAlt(photo.alt || '');
		setEditSortOrder(photo.sortOrder ?? 0);
		setEditFile(null);
		setEditPreview(photo.src || '');
		setIsEditOpen(true);
	};

	// Execute Edit (Updates photo metadata AND replaces image file if chosen)
	const handleEditSubmit = async (e) => {
		e.preventDefault();
		if (!selectedPhoto) return;

		try {
			setIsSubmitting(true);
			await photoService.updatePhoto(
				selectedPhoto,
				{
					title: editTitle,
					altText: editAlt,
					sortOrder: Number(editSortOrder)
				},
				editFile,
				{
					pageId: activePage.pageId,
					sectionId: activeSection.sectionId,
					allPhotos: photos,
				}
			);
			setIsEditOpen(false);
			setEditFile(null);
			setEditPreview('');
			setStatusMessage({ type: 'success', text: 'Photo updated and permanently saved!' });
			await loadPhotos();

			// Sync with corresponding pooja service card if applicable
			try {
				const currentPhotos = await photoService.fetchSectionPhotos(activePage.pageId, activeSection.sectionId);
				if (currentPhotos && currentPhotos[0]?.src) {
					await poojaService.syncSectionToService(activePage.pageId, activeSection.sectionId, currentPhotos[0].src);
				}
			} catch (_) {}
		} catch (err) {
			console.error('Update failed:', err);
			alert(`Failed to update: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Open Delete Modal
	const openDeleteModal = (photo) => {
		setSelectedPhoto(photo);
		setIsDeleteOpen(true);
	};

	// Execute Delete
	const handleDeleteSubmit = async () => {
		if (!selectedPhoto) return;

		try {
			setIsSubmitting(true);
			await photoService.deletePhoto(selectedPhoto, {
				pageId: activePage.pageId,
				sectionId: activeSection.sectionId,
				allPhotos: photos,
			});
			setIsDeleteOpen(false);
			setSelectedPhoto(null);
			setStatusMessage({ type: 'success', text: 'Photo permanently deleted.' });
			await loadPhotos();

			// Sync with corresponding pooja service card if applicable
			try {
				const currentPhotos = await photoService.fetchSectionPhotos(activePage.pageId, activeSection.sectionId);
				const nextSrc = currentPhotos && currentPhotos.length > 0 ? currentPhotos[0]?.src : null;
				await poojaService.syncSectionToService(activePage.pageId, activeSection.sectionId, nextSrc);
			} catch (_) {}
		} catch (err) {
			console.error('Delete failed:', err);
			alert(`Delete failed: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Reorder handler
	const handleMove = async (index, direction) => {
		const newPhotos = [...photos];
		const targetIndex = direction === 'up' ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= newPhotos.length) return;

		const temp = newPhotos[index];
		newPhotos[index] = newPhotos[targetIndex];
		newPhotos[targetIndex] = temp;

		setPhotos(newPhotos);

		try {
			await photoService.reorderPhotos(newPhotos, {
				pageId: activePage.pageId,
				sectionId: activeSection.sectionId,
			});
			setStatusMessage({ type: 'success', text: 'Photo order updated!' });
		} catch (err) {
			console.error('Reorder error:', err);
			await loadPhotos();
		}
	};

	// =========================================================================
	// POPUP NOTIFICATION HANDLERS
	// =========================================================================
	const uploadAndSetPopupImage = async (fileOrDataUrl) => {
		setPopupUploading(true);
		try {
			let hostedUrl = '';
			if (fileOrDataUrl instanceof File) {
				const res = await popupService.uploadPopupImage(fileOrDataUrl);
				hostedUrl = res?.publicUrl || '';
			} else if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:image/')) {
				hostedUrl = await ensureHostedImageUrl(fileOrDataUrl);
			}

			if (hostedUrl) {
				setPopupSettings((prev) => ({
					...prev,
					image_url: hostedUrl,
				}));
				setPopupPreview(hostedUrl);
				setPopupFile(null);
				setStatusMessage({
					type: 'success',
					text: 'Banner image saved and hosted on server! Click Save & Apply below to publish it live.',
				});
				return hostedUrl;
			}
		} catch (err) {
			console.error('Immediate banner upload failed:', err);
		} finally {
			setPopupUploading(false);
		}
		return null;
	};

	const handlePopupFileSelect = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file (JPEG, PNG, WebP).');
			return;
		}

		setPopupFile(file);
		setPopupPreview(URL.createObjectURL(file));
		await uploadAndSetPopupImage(file);
	};

	const handlePopupFileDrop = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const file = e.dataTransfer?.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			alert('Please select a valid image file (JPEG, PNG, WebP).');
			return;
		}

		setPopupFile(file);
		setPopupPreview(URL.createObjectURL(file));
		await uploadAndSetPopupImage(file);
	};

	const handleSavePopupSettings = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		setPopupSaving(true);

		try {
			let finalImageUrl = popupSettings.image_url;
			let finalStoragePath = popupSettings.storage_path;

			if (popupFile) {
				const uploadRes = await popupService.uploadPopupImage(popupFile);
				if (uploadRes && uploadRes.publicUrl) {
					finalImageUrl = uploadRes.publicUrl;
					finalStoragePath = uploadRes.storagePath;
				}
			} else if (finalImageUrl && finalImageUrl.startsWith('data:image/')) {
				finalImageUrl = await ensureHostedImageUrl(finalImageUrl);
			}

			const payload = {
				...popupSettings,
				image_url: finalImageUrl,
				storage_path: finalStoragePath
			};

			const saved = await popupService.savePopupSettings(payload);
			setPopupSettings(saved);
			setPopupPreview(saved.image_url);
			setPopupFile(null);

			// Clear session suppression so popup can be tested immediately
			try {
				sessionStorage.removeItem('pj_popup_shown_in_session');
				localStorage.setItem('pj_last_sync_timestamp', String(Date.now()));
			} catch (_) {}

			setStatusMessage({
				type: 'success',
				text: 'Pop-Up Notification banner saved permanently! The live site has been updated.'
			});
			return saved;
		} catch (err) {
			console.error('Error saving popup settings:', err);
			alert(`Failed to save popup settings: ${err.message}`);
			throw err;
		} finally {
			setPopupSaving(false);
		}
	};

	// =========================================================================
	// CUSTOMER REVIEWS MODERATION HANDLERS
	// =========================================================================
	const loadAdminReviews = useCallback(async () => {
		setReviewsLoading(true);
		try {
			const data = await reviewService.fetchReviews(false);
			setAdminReviews(data || []);
		} catch (err) {
			console.error('Failed to load admin reviews:', err);
		} finally {
			setReviewsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadAdminReviews();
	}, [loadAdminReviews]);

	const handleToggleReviewStatus = async (review) => {
		try {
			const newStatus = !review.isApproved;
			await reviewService.toggleApproval(review.id, newStatus);
			setStatusMessage({
				type: 'success',
				text: newStatus
					? `Review by "${review.name}" is now live on the website!`
					: `Review by "${review.name}" is now hidden from the website.`
			});
			await loadAdminReviews();
		} catch (err) {
			console.error('Failed to update review status:', err);
			alert(`Failed to update review: ${err.message}`);
		}
	};

	const openDeleteReviewModal = (review) => {
		setSelectedReviewForDelete(review);
		setIsReviewDeleteOpen(true);
	};

	const handleDeleteReviewConfirm = async () => {
		if (!selectedReviewForDelete) return;
		try {
			setIsSubmitting(true);
			await reviewService.deleteReview(selectedReviewForDelete.id);
			setIsReviewDeleteOpen(false);
			setSelectedReviewForDelete(null);
			setStatusMessage({ type: 'success', text: 'Customer review permanently deleted.' });
			await loadAdminReviews();
		} catch (err) {
			console.error('Delete review failed:', err);
			alert(`Delete failed: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRestoreDefaultReviews = async () => {
		if (!window.confirm('Reset customer reviews back to the default 4 verified client testimonials?')) return;
		try {
			setReviewsLoading(true);
			await reviewService.restoreDefaultReviews();
			setStatusMessage({ type: 'success', text: 'Default customer reviews restored successfully!' });
			await loadAdminReviews();
		} catch (err) {
			console.error('Restore reviews failed:', err);
			alert(`Restore failed: ${err.message}`);
		} finally {
			setReviewsLoading(false);
		}
	};

	const handleClearAllReviews = async () => {
		if (!window.confirm('Remove all reviews? The reviews section on the website will be clean and ready for real customer reviews.')) return;
		try {
			setReviewsLoading(true);
			await reviewService.clearAllReviews();
			setStatusMessage({ type: 'success', text: 'All reviews cleared. Ready for fresh customer reviews!' });
			await loadAdminReviews();
		} catch (err) {
			console.error('Clear reviews failed:', err);
			alert(`Failed to clear reviews: ${err.message}`);
		} finally {
			setReviewsLoading(false);
		}
	};

	const reviewStats = useMemo(() => {
		const total = adminReviews.length;
		const approved = adminReviews.filter((r) => r.isApproved !== false).length;
		const hidden = total - approved;
		const withPhotos = adminReviews.filter((r) => !!r.imageUrl).length;
		const avgRating = total > 0
			? (adminReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / total).toFixed(1)
			: '5.0';
		return { total, approved, hidden, withPhotos, avgRating };
	}, [adminReviews]);

	const filteredAdminReviews = useMemo(() => {
		return adminReviews.filter((r) => {
			if (reviewFilter === 'approved' && r.isApproved === false) return false;
			if (reviewFilter === 'hidden' && r.isApproved !== false) return false;
			if (reviewFilter === 'with-photo' && !r.imageUrl) return false;
			if (reviewSearch.trim()) {
				const q = reviewSearch.trim().toLowerCase();
				const matchName = r.name?.toLowerCase().includes(q);
				const matchComment = r.comment?.toLowerCase().includes(q);
				const matchCeremony = r.ceremony?.toLowerCase().includes(q);
				const matchLocation = r.location?.toLowerCase().includes(q);
				if (!matchName && !matchComment && !matchCeremony && !matchLocation) return false;
			}
			return true;
		});
	}, [adminReviews, reviewFilter, reviewSearch]);

	// =========================================================================
	// POOJA SERVICES HANDLERS
	// =========================================================================
	const loadServices = useCallback(async () => {
		setServicesLoading(true);
		try {
			const data = await poojaService.fetchServices(false);
			setServices(data || []);
		} catch (err) {
			console.error('Failed to load pooja services:', err);
		} finally {
			setServicesLoading(false);
		}
	}, []);

	useEffect(() => {
		loadServices();
	}, [loadServices]);

	const handleOpenAddService = () => {
		setServiceTitle('');
		setServiceBadge('');
		setServiceDescription('');
		setServiceTargetUrl('/book-pandit-in-dubai');
		setServiceButtonText('Book This Pooja');
		setServiceFile(null);
		setServicePreview('https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0014.jpg-dtnFK7LOaT2QSB1P.jpeg?width=600&fit=crop');
		setIsAddServiceOpen(true);
	};

	const handleAddServiceSubmit = async (e) => {
		e.preventDefault();
		if (!serviceTitle.trim() || !serviceDescription.trim()) {
			alert('Please provide a pooja title and description.');
			return;
		}

		try {
			setIsSubmitting(true);
			await poojaService.addService({
				title: serviceTitle,
				badge: serviceBadge,
				description: serviceDescription,
				targetUrl: serviceTargetUrl,
				buttonText: serviceButtonText,
				imageFile: serviceFile,
				imageUrl: servicePreview,
			});
			setIsAddServiceOpen(false);
			setStatusMessage({ type: 'success', text: `New pooja service "${serviceTitle}" added successfully!` });
			await loadServices();
		} catch (err) {
			console.error('Add service failed:', err);
			alert(`Failed to add service: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleOpenEditService = (srv) => {
		setSelectedService(srv);
		setServiceTitle(srv.title || '');
		setServiceBadge(srv.badge || '');
		setServiceDescription(srv.description || '');
		setServiceTargetUrl(srv.targetUrl || '/book-pandit-in-dubai');
		setServiceButtonText(srv.buttonText || 'Book This Pooja');
		setServiceFile(null);
		setServicePreview(srv.imageUrl || '');
		setIsEditServiceOpen(true);
	};

	const handleEditServiceSubmit = async (e) => {
		e.preventDefault();
		if (!selectedService) return;

		try {
			setIsSubmitting(true);
			await poojaService.updateService(
				selectedService.id,
				{
					title: serviceTitle,
					badge: serviceBadge,
					description: serviceDescription,
					targetUrl: serviceTargetUrl,
					buttonText: serviceButtonText,
					imageUrl: servicePreview,
				},
				serviceFile
			);
			setIsEditServiceOpen(false);
			setSelectedService(null);
			setStatusMessage({ type: 'success', text: `Pooja service "${serviceTitle}" updated!` });
			await loadServices();
		} catch (err) {
			console.error('Update service failed:', err);
			alert(`Failed to update service: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleOpenDeleteService = (srv) => {
		setSelectedService(srv);
		setIsDeleteServiceOpen(true);
	};

	const handleDeleteServiceSubmit = async () => {
		if (!selectedService) return;

		try {
			setIsSubmitting(true);
			await poojaService.deleteService(selectedService.id);
			setIsDeleteServiceOpen(false);
			setSelectedService(null);
			setStatusMessage({ type: 'success', text: 'Pooja service box permanently removed.' });
			await loadServices();
		} catch (err) {
			console.error('Delete service failed:', err);
			alert(`Failed to delete service: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleToggleServiceVisibility = async (srv) => {
		try {
			const newStatus = !srv.isActive;
			await poojaService.toggleVisibility(srv.id, newStatus);
			setStatusMessage({
				type: 'success',
				text: newStatus
					? `"${srv.title}" is now active on the website.`
					: `"${srv.title}" is now hidden from the website.`
			});
			await loadServices();
		} catch (err) {
			console.error('Toggle service visibility failed:', err);
			alert(`Failed to update status: ${err.message}`);
		}
	};

	const handleRestoreDefaultServices = async () => {
		if (!window.confirm('Reset all pooja services back to the default list? Any custom added services will be reset.')) return;
		try {
			setServicesLoading(true);
			await poojaService.restoreDefaultServices();
			setStatusMessage({ type: 'success', text: 'Default pooja services restored!' });
			await loadServices();
		} catch (err) {
			console.error('Restore services failed:', err);
			alert(`Failed to restore services: ${err.message}`);
		} finally {
			setServicesLoading(false);
		}
	};

	const serviceStats = useMemo(() => {
		const total = services.length;
		const active = services.filter((s) => s.isActive !== false).length;
		const hidden = total - active;
		const custom = services.filter((s) => !s.isDefault).length;
		return { total, active, hidden, custom };
	}, [services]);

	const filteredServices = useMemo(() => {
		return services.filter((s) => {
			if (serviceFilter === 'active' && s.isActive === false) return false;
			if (serviceFilter === 'hidden' && s.isActive !== false) return false;
			if (serviceFilter === 'custom' && s.isDefault) return false;
			if (serviceSearch.trim()) {
				const q = serviceSearch.trim().toLowerCase();
				const matchTitle = s.title?.toLowerCase().includes(q);
				const matchDesc = s.description?.toLowerCase().includes(q);
				const matchBadge = s.badge?.toLowerCase().includes(q);
				if (!matchTitle && !matchDesc && !matchBadge) return false;
			}
			return true;
		});
	}, [services, serviceFilter, serviceSearch]);

	const copySqlSnippet = () => {
		const sql = `-- See supabase_schema.sql in the project root\n-- Run that file in Supabase SQL Editor to initialize tables and storage.`;
		navigator.clipboard.writeText(sql);
		setCopiedSql(true);
		setTimeout(() => setCopiedSql(false), 2000);
	};

	// Keep security email in sync when opening the security tab
	useEffect(() => {
		if (activeModule === 'security') {
			setSecurityNewEmail(adminUser?.email || credentialsInfo?.email || '');
			setSecurityCurrentPassword('');
			setSecurityNewPassword('');
			setSecurityConfirmPassword('');
		}
	}, [activeModule]);

	const handleUpdateSecurityCredentials = async (e) => {
		e.preventDefault();
		setSecurityStatus({ type: '', text: '' });

		if (securityNewPassword) {
			if (securityNewPassword.length < 6) {
				setSecurityStatus({
					type: 'error',
					text: 'New password must be at least 6 characters long.',
				});
				return;
			}
			if (securityConfirmPassword && securityNewPassword !== securityConfirmPassword) {
				setSecurityStatus({
					type: 'error',
					text: 'New password and confirmation password do not match.',
				});
				return;
			}
		}

		if (!securityNewPassword && securityNewEmail === (adminUser?.email || credentialsInfo?.email)) {
			setSecurityStatus({
				type: 'error',
				text: 'Please enter a new password or a different email address to update.',
			});
			return;
		}

		try {
			setSecuritySubmitting(true);
			const res = await changeCredentials({
				currentPassword: securityCurrentPassword.trim() || undefined,
				newEmail: securityNewEmail.trim(),
				newPassword: securityNewPassword.trim() || undefined,
			});

			setSecurityStatus({
				type: 'success',
				text: `Login credentials successfully updated! Your active login is now "${res.email}". Use your new credentials on your next login.`,
			});
			setStatusMessage({
				type: 'success',
				text: 'Admin login credentials updated successfully!',
			});
			setSecurityCurrentPassword('');
			setSecurityNewPassword('');
			setSecurityConfirmPassword('');
		} catch (err) {
			console.error('Update credentials failed:', err);
			setSecurityStatus({
				type: 'error',
				text: err.message || 'Failed to update credentials. Please check your current password.',
			});
		} finally {
			setSecuritySubmitting(false);
		}
	};

	const handleResetSecurityCredentials = async () => {
		const enteredCurrent = window.prompt(
			'Enter your current password to reset login credentials back to the factory default (vishaldevmorari487@gmail.com):'
		);
		if (enteredCurrent === null) return; // User pressed cancel

		try {
			setSecuritySubmitting(true);
			const res = await resetCredentials(enteredCurrent);
			setSecurityStatus({
				type: 'success',
				text: `Credentials successfully reset to factory default (${res.email}).`,
			});
			setSecurityNewEmail(res.email);
			setSecurityCurrentPassword('');
			setSecurityNewPassword('');
			setSecurityConfirmPassword('');
		} catch (err) {
			alert(`Reset failed: ${err.message}`);
		} finally {
			setSecuritySubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#FAF6F0] text-[#2B1A14] flex flex-col font-['Mukta',sans-serif] text-base leading-relaxed">
			{/* Top Bar (Matches website navigation background #F2EBDD) */}
			<header className="bg-[#F2EBDD] border-b border-[#E5DCCF] px-6 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
				<div className="flex items-center gap-3.5">
					<img
						src="https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/new_astrologer_shree_vishal_shastri-removebg-preview-G1TPRlnciYHDfUKK.png?width=768&fit=scale-down"
						alt="Pandit Ji Logo"
						className="h-12 w-auto object-contain"
					/>
					<div>
						<h1 className="font-bold text-lg sm:text-xl tracking-wide text-[#8C2B1D] font-['Marcellus',serif]">
							Pandit Ji in Dubai
						</h1>
						<p className="text-xs uppercase tracking-[0.2em] text-[#C4923C] font-bold font-['Poppins',sans-serif]">
							Administrative Control Center
						</p>
					</div>
				</div>

				<div className="flex items-center gap-3.5 text-sm">
					{/* DB / Storage Status Badge */}
					<button
						onClick={() => setIsSetupGuideOpen(true)}
						className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition font-bold text-xs sm:text-sm font-['Poppins',sans-serif] bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-2xs"
						title={isSupabaseConfigured ? 'Connected to Supabase Cloud' : 'Persistent Storage Active (Click to connect Cloud Sync)'}
					>
						<CheckCircle className="w-4 h-4 text-emerald-600" />
						<span>{isSupabaseConfigured ? 'Cloud Sync Active' : 'Persistent Storage Active'}</span>
					</button>

					{/* View Live Site */}
					<a
						href="/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:border-[#8C2B1D]/40 transition font-bold text-xs sm:text-sm font-['Poppins',sans-serif] shadow-2xs"
					>
						<span>View Live Website</span>
						<ExternalLink className="w-3.5 h-3.5 text-[#8C2B1D]" />
					</a>

					{/* Admin Info & Logout */}
					{adminUser && (
						<div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#E2D7C8]">
							<button
								onClick={() => setActiveModule('security')}
								className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition text-xs sm:text-sm font-bold font-['Poppins',sans-serif] ${
									activeModule === 'security'
										? 'bg-[#8C2B1D] text-white border-[#8C2B1D] shadow-xs'
										: 'bg-white border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:bg-[#F2EBDD]'
								}`}
								title="Change Login Email & Password"
							>
								<ShieldCheck className={`w-4 h-4 ${activeModule === 'security' ? 'text-[#E5B361]' : 'text-[#8C2B1D]'}`} />
								<span className="max-w-[170px] truncate">{adminUser.email}</span>
							</button>
							<button
								onClick={logout}
								title="Sign Out"
								className="p-2 rounded-xl text-red-700 hover:bg-red-50 hover:text-red-800 transition"
							>
								<LogOut className="w-4 h-4" />
							</button>
						</div>
					)}
				</div>
			</header>

			{/* Status Banner */}
			{statusMessage.text && (
				<div
					className={`px-8 py-3 text-sm flex items-center justify-between transition ${
						statusMessage.type === 'error'
							? 'bg-red-50 text-red-800 border-b border-red-200'
							: 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
					}`}
				>
					<span className="font-semibold">{statusMessage.text}</span>
					<button
						onClick={() => setStatusMessage({ type: '', text: '' })}
						className="hover:opacity-75"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			)}

			<div className="flex-1 flex overflow-hidden">
				{/* Sidebar (Matches website soft sand background #F7EFE5) */}
				<aside className="w-80 bg-[#F7EFE5] border-r border-[#E5DCCF] flex flex-col shrink-0">
					{/* Primary Navigation Tabs */}
					<div className="p-4 border-b border-[#E5DCCF] space-y-2">
						{/* MEDIA GALLERY MODULE TAB */}
						<button
							onClick={() => setActiveModule('gallery')}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition font-['Poppins',sans-serif] ${
								activeModule === 'gallery'
									? 'bg-[#8C2B1D] text-white shadow-md shadow-[#8C2B1D]/20'
									: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
							}`}
						>
							<div className="flex items-center gap-3">
								<Images className={`w-5 h-5 ${activeModule === 'gallery' ? 'text-[#FAF6F0]' : 'text-[#8C2B1D]'}`} />
								<span>Media Gallery</span>
							</div>
							<span
								className={`text-xs px-2.5 py-1 rounded-full font-bold font-['Poppins',sans-serif] ${
									activeModule === 'gallery'
										? 'bg-black/20 text-[#FAF6F0]'
										: 'bg-[#FAF6F0] text-[#8C2B1D] border border-[#E5DCCF]'
								}`}
							>
								Featured
							</span>
						</button>

						<button
							onClick={() => setActiveModule('photos')}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition font-['Poppins',sans-serif] ${
								activeModule === 'photos'
									? 'bg-[#8C2B1D] text-white shadow-md shadow-[#8C2B1D]/20'
									: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
							}`}
						>
							<Layers className={`w-5 h-5 ${activeModule === 'photos' ? 'text-[#FAF6F0]' : 'text-[#8C2B1D]'}`} />
							<span>Page Banners & Photos</span>
						</button>

						<button
							onClick={() => setActiveModule('popup')}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition font-['Poppins',sans-serif] ${
								activeModule === 'popup'
									? 'bg-[#8C2B1D] text-white shadow-md shadow-[#8C2B1D]/20'
									: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
							}`}
						>
							<div className="flex items-center gap-3">
								<Bell className={`w-5 h-5 ${activeModule === 'popup' ? 'text-[#FAF6F0]' : 'text-[#8C2B1D]'}`} />
								<span>3-Sec Pop-Up Modal</span>
							</div>
							<span
								className={`text-xs px-2.5 py-1 rounded-full font-bold font-['Poppins',sans-serif] ${
									popupSettings.is_enabled
										? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
										: 'bg-stone-200 text-stone-600'
								}`}
							>
								{popupSettings.is_enabled ? 'ON' : 'OFF'}
							</span>
						</button>

						<button
							onClick={() => setActiveModule('reviews')}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition font-['Poppins',sans-serif] ${
								activeModule === 'reviews'
									? 'bg-[#8C2B1D] text-white shadow-md shadow-[#8C2B1D]/20'
									: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
							}`}
						>
							<div className="flex items-center gap-3">
								<MessageSquare className={`w-5 h-5 ${activeModule === 'reviews' ? 'text-[#FAF6F0]' : 'text-[#8C2B1D]'}`} />
								<span>Customer Reviews</span>
							</div>
							<span
								className={`text-xs px-2.5 py-1 rounded-full font-bold font-['Poppins',sans-serif] ${
									activeModule === 'reviews'
										? 'bg-black/20 text-[#FAF6F0]'
										: 'bg-[#FAF6F0] text-[#8C2B1D] border border-[#E5DCCF]'
								}`}
							>
								{adminReviews.length}
							</span>
						</button>

						<button
							onClick={() => setActiveModule('services')}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition font-['Poppins',sans-serif] ${
								activeModule === 'services'
									? 'bg-[#8C2B1D] text-white shadow-md shadow-[#8C2B1D]/20'
									: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
							}`}
						>
							<div className="flex items-center gap-3">
								<BookOpen className={`w-5 h-5 ${activeModule === 'services' ? 'text-[#FAF6F0]' : 'text-[#8C2B1D]'}`} />
								<span>Pooja Services</span>
							</div>
							<span
								className={`text-xs px-2.5 py-1 rounded-full font-bold font-['Poppins',sans-serif] ${
									activeModule === 'services'
										? 'bg-black/20 text-[#FAF6F0]'
										: 'bg-[#FAF6F0] text-[#8C2B1D] border border-[#E5DCCF]'
								}`}
							>
								{services.length}
							</span>
						</button>

						<button
							onClick={() => setActiveModule('security')}
							className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-bold transition font-['Poppins',sans-serif] ${
								activeModule === 'security'
									? 'bg-[#8C2B1D] text-white shadow-md shadow-[#8C2B1D]/20'
									: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
							}`}
						>
							<div className="flex items-center gap-3">
								<ShieldCheck className={`w-5 h-5 ${activeModule === 'security' ? 'text-[#FAF6F0]' : 'text-[#8C2B1D]'}`} />
								<span>Login & Security</span>
							</div>
							<span
								className={`text-[11px] px-2 py-0.5 rounded-full font-bold font-['Poppins',sans-serif] ${
									activeModule === 'security'
										? 'bg-black/20 text-[#FAF6F0]'
										: credentialsInfo?.isCustom
										? 'bg-amber-100 text-amber-800 border border-amber-300'
										: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
								}`}
							>
								{credentialsInfo?.isCustom ? 'Custom' : 'Active'}
							</span>
						</button>
					</div>

					{/* Module-Specific Sidebar Content */}
					{activeModule === 'gallery' ? (
						<div className="p-5 flex-1 text-sm text-[#2B1A14]/80 space-y-4">
							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-1.5 font-['Poppins',sans-serif] flex items-center gap-2">
									<Images className="w-4 h-4" />
									<span>Media Gallery Help</span>
								</p>
								<p className="text-xs text-[#2B1A14]/70 leading-relaxed font-['Poppins',sans-serif]">
									Manage the photo showcase carousel on your live homepage. Add ceremony photos, reorder slides, or update photo titles and SEO alt text.
								</p>
							</div>

							<div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#E5DCCF] text-xs space-y-2 font-['Poppins',sans-serif]">
								<p className="font-bold text-[#8C2B1D]">Quick Tips:</p>
								<ul className="list-disc list-inside space-y-1 text-[#2B1A14]/75">
									<li>Images are automatically stored on Hostinger server.</li>
									<li>Square 1:1 or landscape 4:3 images work best.</li>
									<li>Reorder slides using the left/right arrows.</li>
									<li>Changes reflect immediately on your live website.</li>
								</ul>
							</div>
						</div>
					) : activeModule === 'photos' ? (
						<>
							<div className="p-4 border-b border-[#E5DCCF]">
								<div className="text-xs font-bold text-[#8C2B1D] uppercase tracking-wider font-['Poppins',sans-serif]">
									Select Page
								</div>
								<p className="text-xs text-[#2B1A14]/70 mt-1">
									Click a page to manage its photos.
								</p>
							</div>

							<nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
								{SITE_SECTIONS.map((page) => {
									const isSelected = page.pageId === selectedPageId;
									return (
										<button
											key={page.pageId}
											onClick={() => setSelectedPageId(page.pageId)}
											className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
												isSelected
													? 'bg-[#8C2B1D] text-white font-bold shadow-sm'
													: 'text-[#2B1A14] hover:bg-[#EFE5D8]'
											}`}
										>
											<span className="truncate">{page.pageTitle}</span>
											<span
												className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
													isSelected
														? 'bg-black/20 text-[#FAF6F0]'
														: 'bg-[#EAE0CE] text-[#2B1A14]'
												}`}
											>
												{page.sections.length} {page.sections.length === 1 ? 'sec' : 'secs'}
											</span>
										</button>
									);
								})}
							</nav>
						</>
					) : activeModule === 'popup' ? (
						<div className="p-5 flex-1 text-sm text-[#2B1A14]/80 space-y-4">
							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-1.5 font-['Poppins',sans-serif]">Pop-Up Overview</p>
								<p className="text-xs sm:text-sm leading-relaxed text-[#2B1A14]/80">
									This high-attention modal appears in the center of the screen <strong>3 seconds</strong> after a visitor opens the website.
								</p>
							</div>
							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-1.5 font-['Poppins',sans-serif]">Click Action</p>
								<p className="text-xs sm:text-sm leading-relaxed text-[#2B1A14]/80">
									When visitors click the picture, they are directly redirected to that particular pooja's detailed information page.
								</p>
							</div>
						</div>
					) : activeModule === 'reviews' ? (
						/* Reviews Module Sidebar: Quick Filters & Info */
						<div className="p-5 flex-1 text-sm text-[#2B1A14]/80 space-y-4">
							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-2.5 font-['Poppins',sans-serif]">Filter Reviews</p>
								<div className="space-y-1.5 font-['Poppins',sans-serif] text-xs">
									<button
										onClick={() => setReviewFilter('all')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											reviewFilter === 'all'
												? 'bg-[#8C2B1D] text-white'
												: 'bg-[#FAF6F0] text-[#2B1A14] hover:bg-[#EFE5D8]'
										}`}
									>
										<span>All Reviews</span>
										<span>{reviewStats.total}</span>
									</button>
									<button
										onClick={() => setReviewFilter('approved')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											reviewFilter === 'approved'
												? 'bg-emerald-700 text-white'
												: 'bg-[#FAF6F0] text-emerald-800 hover:bg-emerald-50'
										}`}
									>
										<span>Visible on Site</span>
										<span>{reviewStats.approved}</span>
									</button>
									<button
										onClick={() => setReviewFilter('hidden')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											reviewFilter === 'hidden'
												? 'bg-stone-700 text-white'
												: 'bg-[#FAF6F0] text-stone-700 hover:bg-stone-100'
										}`}
									>
										<span>Hidden (Drafts)</span>
										<span>{reviewStats.hidden}</span>
									</button>
									<button
										onClick={() => setReviewFilter('with-photo')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											reviewFilter === 'with-photo'
												? 'bg-[#C4923C] text-white'
												: 'bg-[#FAF6F0] text-[#8C2B1D] hover:bg-[#EFE5D8]'
										}`}
									>
										<span>With Ceremony Photos</span>
										<span>{reviewStats.withPhotos}</span>
									</button>
								</div>
							</div>

							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-1.5 font-['Poppins',sans-serif]">Live Devotee Submissions</p>
								<p className="text-xs sm:text-sm leading-relaxed text-[#2B1A14]/80">
									Clients who complete ceremonies can leave reviews and upload ritual photos from the home page. You have full power to approve, hide, or delete any review at any time.
								</p>
							</div>
						</div>
					) : activeModule === 'services' ? (
						/* Services Module Sidebar: Quick Filters & Info */
						<div className="p-5 flex-1 text-sm text-[#2B1A14]/80 space-y-4">
							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-2.5 font-['Poppins',sans-serif]">Filter Services</p>
								<div className="space-y-1.5 font-['Poppins',sans-serif] text-xs">
									<button
										onClick={() => setServiceFilter('all')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											serviceFilter === 'all'
												? 'bg-[#8C2B1D] text-white'
												: 'bg-[#FAF6F0] text-[#2B1A14] hover:bg-[#EFE5D8]'
										}`}
									>
										<span>All Services</span>
										<span>{serviceStats.total}</span>
									</button>
									<button
										onClick={() => setServiceFilter('active')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											serviceFilter === 'active'
												? 'bg-emerald-700 text-white'
												: 'bg-[#FAF6F0] text-emerald-800 hover:bg-emerald-50'
										}`}
									>
										<span>Active on Site</span>
										<span>{serviceStats.active}</span>
									</button>
									<button
										onClick={() => setServiceFilter('hidden')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											serviceFilter === 'hidden'
												? 'bg-stone-700 text-white'
												: 'bg-[#FAF6F0] text-stone-700 hover:bg-stone-100'
										}`}
									>
										<span>Hidden (Paused)</span>
										<span>{serviceStats.hidden}</span>
									</button>
									<button
										onClick={() => setServiceFilter('custom')}
										className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-bold transition ${
											serviceFilter === 'custom'
												? 'bg-[#C4923C] text-white'
												: 'bg-[#FAF6F0] text-[#8C2B1D] hover:bg-[#EFE5D8]'
										}`}
									>
										<span>Custom Added</span>
										<span>{serviceStats.custom}</span>
									</button>
								</div>
							</div>

							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-1.5 font-['Poppins',sans-serif]">Instant Website Update</p>
								<p className="text-xs sm:text-sm leading-relaxed text-[#2B1A14]/80">
									Adding a new pooja service creates a new box on the website immediately. Removing or hiding a box removes it from the catalog in real time.
								</p>
							</div>
						</div>
					) : (
						/* Security Module Sidebar */
						<div className="p-5 flex-1 text-sm text-[#2B1A14]/80 space-y-4">
							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-2 font-['Poppins',sans-serif] flex items-center gap-1.5">
									<Lock className="w-4 h-4 text-[#C4923C]" />
									<span>Security & Credentials</span>
								</p>
								<p className="text-xs sm:text-sm leading-relaxed text-[#2B1A14]/80">
									Manage the administrator email address and master password required to access this portal.
								</p>
							</div>

							<div className="p-4 bg-white rounded-xl border border-[#E5DCCF] shadow-2xs">
								<p className="text-[#8C2B1D] font-bold text-sm mb-1.5 font-['Poppins',sans-serif]">Account Status</p>
								<div className="mt-2 space-y-2 text-xs font-['Poppins',sans-serif]">
									<div className="flex justify-between py-1 border-b border-[#F2EBDD]">
										<span className="text-[#2B1A14]/60">Mode:</span>
										<span className="font-bold text-[#8C2B1D]">
											{credentialsInfo?.isCustom ? 'Custom Admin Login' : 'Factory Default'}
										</span>
									</div>
									<div className="flex justify-between py-1">
										<span className="text-[#2B1A14]/60">Privilege:</span>
										<span className="font-bold text-emerald-800">Super Administrator</span>
									</div>
								</div>
							</div>

							<div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 shadow-2xs">
								<p className="text-amber-900 font-bold text-xs uppercase tracking-wider mb-1 font-['Poppins',sans-serif]">
									Security Best Practice
								</p>
								<p className="text-xs leading-relaxed text-amber-950/80">
									Choose a strong password with at least 6 characters. Any changes apply immediately for your next login.
								</p>
							</div>
						</div>
					)}
				</aside>

				{/* Main Workspace (Matches website pure ivory background #FAF6F0) */}
				<main className="flex-1 flex flex-col overflow-y-auto bg-[#FAF6F0]">
					{/* ========================================================================= */}
					{/* MODULE 0: DEDICATED MEDIA GALLERY MANAGER */}
					{/* ========================================================================= */}
					{activeModule === 'gallery' ? (
						<MediaGalleryManager />
					) : activeModule === 'popup' ? (
						<div className="p-8 sm:p-10 max-w-5xl">
							{/* Header */}
							<div className="mb-7 pb-5 border-b border-[#E5DCCF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div>
									<div className="flex items-center gap-2 text-xs sm:text-sm text-[#C4923C] font-bold tracking-wider uppercase mb-1.5 font-['Poppins',sans-serif]">
										<Bell className="w-4 h-4 text-[#8C2B1D]" />
										<span>Visitor Engagement</span>
									</div>
									<h2 className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
										3-Second Pop-Up Notification Modal
									</h2>
									<p className="text-sm sm:text-base text-[#2B1A14]/70 mt-1">
										Configure the centered promotional dialog, picture, and destination pooja page.
									</p>
								</div>

								<button
									onClick={loadPopupSettings}
									disabled={popupLoading}
									title="Refresh Settings"
									className="p-2.5 self-start rounded-xl bg-white border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:border-[#8C2B1D]/40 transition shadow-2xs"
								>
									<RefreshCw className={`w-5 h-5 ${popupLoading ? 'animate-spin' : ''}`} />
								</button>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
								{/* Left Column: Form & Settings (7 cols) */}
								<div className="lg:col-span-7 bg-white border border-[#E5DCCF] rounded-3xl p-7 shadow-sm">
									<form onSubmit={handleSavePopupSettings} className="space-y-6">
										{/* Master Toggle */}
										<div className="flex items-center justify-between p-4 sm:p-5 bg-[#FAF6F0] rounded-2xl border border-[#E2D7C8]">
											<div>
												<h4 className="text-base font-bold text-[#2B1A14]">Pop-Up Status</h4>
												<p className="text-xs sm:text-sm text-[#2B1A14]/70 mt-0.5">
													{popupSettings.is_enabled
														? 'Enabled: Displaying to visitors after 3 seconds on every visit'
														: 'Disabled: Pop-up will not appear to any visitors'}
												</p>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													checked={popupSettings.is_enabled}
													onChange={(e) =>
														setPopupSettings({ ...popupSettings, is_enabled: e.target.checked })
													}
													className="sr-only peer"
												/>
												<div className="w-12 h-6.5 bg-[#E2D7C8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-emerald-600"></div>
											</label>
										</div>

										{/* Upload Picture */}
										<div>
											<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-2 font-['Poppins',sans-serif]">
												Promotional Picture / Banner
											</label>
											<div
												onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
												onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); }}
												onDrop={handlePopupFileDrop}
												className="border-2 border-dashed border-[#E2D7C8] hover:border-[#8C2B1D] rounded-2xl p-5 text-center cursor-pointer transition relative bg-[#FAF6F0]"
											>
												<input
													type="file"
													accept="image/*"
													onChange={handlePopupFileSelect}
													className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
												/>
												<div className="py-3 flex flex-col items-center">
													{popupUploading ? (
														<>
															<RefreshCw className="w-8 h-8 text-[#8C2B1D] animate-spin mb-2" />
															<p className="text-sm font-bold text-[#8C2B1D]">
																Uploading & hosting banner on server...
															</p>
															<p className="text-xs text-[#2B1A14]/60 mt-1">
																Saving to permanent storage, please wait...
															</p>
														</>
													) : (
														<>
															<Upload className="w-8 h-8 text-[#8C2B1D] mb-2" />
															<p className="text-sm font-bold text-[#2B1A14]">
																{popupFile ? popupFile.name : 'Click or drag new banner to replace picture'}
															</p>
															<p className="text-xs text-[#2B1A14]/60 mt-1">
																Recommended ratio: Square (1:1) or Vertical Poster (4:5)
															</p>
														</>
													)}
												</div>
											</div>

											{/* Direct Image URL input */}
											<div className="mt-3">
												<label className="block text-xs font-bold text-[#2B1A14]/75 uppercase mb-1 font-['Poppins',sans-serif]">
													Or Direct Image Link / CDN URL
												</label>
												<input
													type="text"
													value={popupSettings.image_url || ''}
													onChange={async (e) => {
														const val = e.target.value;
														setPopupFile(null);
														setPopupSettings({ ...popupSettings, image_url: val });
														setPopupPreview(val);
														if (val && val.startsWith('data:image/')) {
															await uploadAndSetPopupImage(val);
														}
													}}
													placeholder="https://... or /api/uploads/..."
													className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none"
												/>
											</div>

											{/* Quick Authentic Presets */}
											<div className="mt-3 pt-3 border-t border-[#E2D7C8]">
												<span className="text-[11px] font-bold text-[#8C2B1D] uppercase tracking-wider block mb-2 font-['Poppins',sans-serif]">
													One-Click Authentic Pooja Banners:
												</span>
												<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
													{[
														{
															name: 'Vedic Wedding',
															url: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0011.jpg-m4730MVyqgY9OzLF.jpeg?width=768&fit=crop',
															target: '/wedding-ceremonies',
														},
														{
															name: 'Sacred Havan',
															url: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0016.jpg-LbPgYucL565kxmOf.jpeg?width=768&fit=crop',
															target: '/shanti-havan-and-yagna',
														},
														{
															name: 'Griha Pravesh',
															url: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/img-20260712-wa0012.jpg-0veqAugf2xgtLIbu.jpeg?width=768&fit=crop',
															target: '/griha-pravesh-and-vastu',
														},
														{
															name: 'Satyanarayan',
															url: 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/generated/generated-Wer3mZjaMh9kGTR9.png?width=768&fit=crop',
															target: '/satyanarayan-and-festivals',
														},
													].map((preset) => (
														<button
															key={preset.name}
															type="button"
															onClick={() => {
																setPopupFile(null);
																setPopupSettings({
																	...popupSettings,
																	image_url: preset.url,
																	target_url: preset.target,
																});
																setPopupPreview(preset.url);
															}}
															className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E2D7C8] hover:border-[#8C2B1D] text-left transition group"
														>
															<img
																src={preset.url}
																alt={preset.name}
																className="w-8 h-8 rounded-lg object-cover shrink-0"
															/>
															<span className="text-[11px] font-bold text-[#2B1A14] group-hover:text-[#8C2B1D] truncate">
																{preset.name}
															</span>
														</button>
													))}
												</div>
											</div>
										</div>

										{/* Target Destination Link */}
										<div>
											<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 flex items-center gap-2 font-['Poppins',sans-serif]">
												<LinkIcon className="w-4 h-4 text-[#8C2B1D]" />
												<span>Pooja Information Destination (Target Page)</span>
											</label>
											<p className="text-xs text-[#2B1A14]/70 mb-2">
												Select which specific Pooja Information page this pop-up should link to:
											</p>

											{/* Quick Preset Selector */}
											<select
												value={
													[
														'/authentic-vedic-pooja-dubai',
														'/griha-pravesh-and-vastu',
														'/satyanarayan-and-festivals',
														'/rudrabhishek-and-planets',
														'/shanti-havan-and-yagna',
														'/wedding-ceremonies',
														'/car-pooja-in-dubai-vehicle-pooja-in-dubai',
														'/pitru-paksha-pooja-dubai',
														'/pooja-services-in-dubai',
														'/book-pandit-in-dubai',
														'https://wa.me/971504192987',
														'tel:+971504192987'
													].includes(popupSettings.target_url)
														? popupSettings.target_url
														: 'custom'
												}
												onChange={(e) => {
													if (e.target.value !== 'custom') {
														setPopupSettings({ ...popupSettings, target_url: e.target.value });
													}
												}}
												className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-3 text-sm outline-none mb-2 font-medium"
											>
												<option value="/authentic-vedic-pooja-dubai">Authentic Vedic Pooja Details (/authentic-vedic-pooja-dubai)</option>
												<option value="/griha-pravesh-and-vastu">Griha Pravesh & Vastu Details (/griha-pravesh-and-vastu)</option>
												<option value="/satyanarayan-and-festivals">Satyanarayan Katha & Festivals Details (/satyanarayan-and-festivals)</option>
												<option value="/rudrabhishek-and-planets">Rudrabhishek & Planets Details (/rudrabhishek-and-planets)</option>
												<option value="/shanti-havan-and-yagna">Shanti Havan & Yagna Details (/shanti-havan-and-yagna)</option>
												<option value="/wedding-ceremonies">Wedding Ceremonies Details (/wedding-ceremonies)</option>
												<option value="/car-pooja-in-dubai-vehicle-pooja-in-dubai">Car & Vehicle Pooja Details (/car-pooja-in-dubai-vehicle-pooja-in-dubai)</option>
												<option value="/pitru-paksha-pooja-dubai">Pitru Paksha Pooja Details (/pitru-paksha-pooja-dubai)</option>
												<option value="/pooja-services-in-dubai">All Pooja Services Catalog (/pooja-services-in-dubai)</option>
												<option value="/book-pandit-in-dubai">Booking Page (/book-pandit-in-dubai)</option>
												<option value="https://wa.me/971504192987">WhatsApp Inquiry (Direct Chat)</option>
												<option value="tel:+971504192987">Direct Phone Call</option>
												<option value="custom">-- Custom Page or Link --</option>
											</select>

											{/* Exact URL Input */}
											<input
												type="text"
												value={popupSettings.target_url}
												onChange={(e) =>
													setPopupSettings({ ...popupSettings, target_url: e.target.value })
												}
												placeholder="/your-custom-page or https://..."
												className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm font-mono outline-none"
											/>
										</div>

										{/* Title / Caption */}
										<div>
											<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
												Banner Headline / Overlay Title
											</label>
											<input
												type="text"
												value={popupSettings.title || ''}
												onChange={(e) =>
													setPopupSettings({ ...popupSettings, title: e.target.value })
												}
												placeholder="e.g. Special Festive Pooja Bookings & Consultation"
												className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-3 text-sm sm:text-base outline-none font-medium"
											/>
										</div>

										{/* Delay */}
										<div className="flex items-center justify-between text-sm text-[#2B1A14]/70 p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E2D7C8]">
											<span>Pop-Up Delay Timing</span>
											<span className="font-mono text-[#8C2B1D] font-bold">3 Seconds after page load</span>
										</div>

										{/* Submit Button */}
										<button
											type="submit"
											disabled={popupSaving}
											className="w-full py-3.5 bg-[#8C2B1D] hover:bg-[#a33222] text-white font-bold rounded-xl text-base sm:text-lg transition duration-200 shadow-md shadow-[#8C2B1D]/20 flex items-center justify-center gap-2.5 font-['Marcellus',serif] disabled:opacity-50"
										>
											{popupSaving ? (
												<>
													<RefreshCw className="w-5 h-5 animate-spin" />
													<span>Saving Pop-Up Settings...</span>
												</>
											) : (
												<>
													<Sparkles className="w-5 h-5" />
													<span>Save & Apply Pop-Up Changes</span>
												</>
											)}
										</button>
									</form>
								</div>

								{/* Right Column: Live Modal Visitor Preview (5 cols) */}
								<div className="lg:col-span-5 flex flex-col items-center">
									<div className="text-sm font-bold text-[#8C2B1D] uppercase tracking-wider mb-2 flex items-center gap-2 font-['Poppins',sans-serif]">
										<Eye className="w-4 h-4 text-[#C4923C]" />
										<span>Live Visitor Preview</span>
									</div>
									<p className="text-xs sm:text-sm text-[#2B1A14]/70 text-center mb-4">
										This is exactly how visitors see the modal on the website.
									</p>

									{/* Simulated Dimmed Screen */}
									<div className="w-full p-6 bg-black/60 backdrop-blur-xs rounded-3xl border border-[#E5DCCF] shadow-xl relative flex items-center justify-center min-h-[400px]">
										{/* Mock Pop-up Card */}
										<div className="relative max-w-xs w-full bg-[#FAF6F0] border-2 border-[#E5B361] rounded-3xl shadow-2xl overflow-hidden group">
											{/* UPPER RIGHT CUT / CLOSE BUTTON */}
											<div className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-black/75 text-white border border-[#E5B361]/60 flex items-center justify-center shadow-lg">
												<X className="w-4 h-4 text-white" />
											</div>

											{/* Image Frame */}
											<div className="relative w-full aspect-[4/5] bg-black/10 overflow-hidden">
												<img
													src={popupPreview || DEFAULT_POPUP_SETTINGS.image_url}
													alt="Preview"
													className="w-full h-full object-cover"
												/>

												<div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end text-left pointer-events-none">
													{popupSettings.title && (
														<p className="text-sm font-bold text-white mb-1 flex items-center gap-1.5 drop-shadow-sm font-['Marcellus',serif]">
															<Sparkles className="w-3.5 h-3.5 text-[#E5B361]" />
															<span className="truncate">{popupSettings.title}</span>
														</p>
													)}
													<div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5B361] uppercase tracking-wider font-['Poppins',sans-serif]">
														<span>Tap to Read Pooja Information & Vidhi</span>
														<ExternalLink className="w-3.5 h-3.5" />
													</div>
												</div>
											</div>
										</div>
									</div>

									<p className="text-xs text-[#2B1A14]/70 mt-3 text-center">
										Target Link: <span className="text-[#8C2B1D] font-mono font-bold">{popupSettings.target_url}</span>
									</p>

									<div className="mt-4 flex flex-col gap-2.5 w-full max-w-xs">
										{/* Primary Save Button under Preview */}
										<button
											type="button"
											onClick={handleSavePopupSettings}
											disabled={popupSaving || popupUploading}
											className="w-full py-3.5 bg-[#8C2B1D] hover:bg-[#a33222] text-white font-bold rounded-xl text-base transition duration-200 shadow-md shadow-[#8C2B1D]/20 flex items-center justify-center gap-2 font-['Marcellus',serif] disabled:opacity-50"
										>
											{popupSaving ? (
												<>
													<RefreshCw className="w-5 h-5 animate-spin" />
													<span>Publishing to Live Site...</span>
												</>
											) : popupUploading ? (
												<>
													<RefreshCw className="w-5 h-5 animate-spin" />
													<span>Uploading Banner Image...</span>
												</>
											) : (
												<>
													<Sparkles className="w-5 h-5" />
													<span>Save & Apply Pop-Up Changes</span>
												</>
											)}
										</button>

										{/* Save & Test Live Button */}
										<button
											type="button"
											onClick={async () => {
												try {
													await handleSavePopupSettings();
													window.open('/?preview_popup=true', '_blank', 'noopener,noreferrer');
												} catch (_) {}
											}}
											disabled={popupSaving || popupUploading}
											className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E2D7C8] hover:border-[#8C2B1D] text-[#8C2B1D] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-xs hover:bg-[#FAF6F0]"
										>
											<Eye className="w-4 h-4 text-[#8C2B1D]" />
											<span>Save & Test Pop-Up on Live Website</span>
										</button>

										{/* Reset Session & Save Button */}
										<button
											type="button"
											onClick={async () => {
												try {
													sessionStorage.removeItem('pj_popup_shown_in_session');
													await handleSavePopupSettings();
													alert('Pop-up saved and session timer reset! You can now view the pop-up on the website.');
												} catch (_) {}
											}}
											disabled={popupSaving || popupUploading}
											className="w-full py-2 px-3 rounded-xl bg-[#FAF6F0] border border-[#E2D7C8] text-[#2B1A14]/80 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#F2EBDD] transition"
										>
											<RotateCcw className="w-3.5 h-3.5" />
											<span>Reset Session Timer & Save</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					) : activeModule === 'reviews' ? (
						/* ========================================================================= */
						/* MODULE 3: CUSTOMER REVIEWS & PHOTO MODERATION */
						/* ========================================================================= */
						<div className="p-8 sm:p-10 max-w-7xl">
							{/* Header */}
							<div className="mb-7 pb-5 border-b border-[#E5DCCF] flex flex-col md:flex-row md:items-center justify-between gap-4">
								<div>
									<div className="flex items-center gap-2 text-xs sm:text-sm text-[#C4923C] font-bold tracking-wider uppercase mb-1.5 font-['Poppins',sans-serif]">
										<MessageSquare className="w-4 h-4 text-[#8C2B1D]" />
										<span>Devotee Testimonials & Photos</span>
									</div>
									<h2 className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
										Customer Reviews Moderation
									</h2>
									<p className="text-sm sm:text-base text-[#2B1A14]/70 mt-1">
										Moderate reviews and ceremony photos submitted by devotees. Control which reviews appear live on the website.
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-2.5">
									<button
										onClick={loadAdminReviews}
										disabled={reviewsLoading}
										title="Refresh Reviews"
										className="p-2.5 rounded-xl bg-white border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:border-[#8C2B1D]/40 transition shadow-2xs"
									>
										<RefreshCw className={`w-5 h-5 ${reviewsLoading ? 'animate-spin' : ''}`} />
									</button>
									<button
										onClick={handleRestoreDefaultReviews}
										title="Restore Starter Testimonials"
										className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] shadow-2xs"
									>
										<RotateCcw className="w-4 h-4 text-[#8C2B1D]" />
										<span>Restore Starter Reviews</span>
									</button>
									<button
										onClick={handleClearAllReviews}
										title="Remove all reviews so the site has zero default reviews"
										className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-red-200 text-red-700 hover:bg-red-50 text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] shadow-2xs"
									>
										<Trash2 className="w-4 h-4 text-red-600" />
										<span>Clear All Reviews</span>
									</button>
									<a
										href="/#reviews"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-xs sm:text-sm font-bold transition shadow-md shadow-[#8C2B1D]/20 font-['Poppins',sans-serif]"
									>
										<span>View on Website</span>
										<ExternalLink className="w-3.5 h-3.5" />
									</a>
								</div>
							</div>

							{/* Review Metrics KPI Cards */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-[#2B1A14]/60 uppercase tracking-wider font-['Poppins',sans-serif]">Total Reviews</span>
									<div className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] mt-1 font-['Marcellus',serif]">
										{reviewStats.total}
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">All customer submissions</span>
								</div>

								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-['Poppins',sans-serif]">Live on Website</span>
									<div className="text-2xl sm:text-3xl font-bold text-emerald-800 mt-1 font-['Marcellus',serif] flex items-center gap-2">
										<span>{reviewStats.approved}</span>
										<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">Approved for public view</span>
								</div>

								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-[#C4923C] uppercase tracking-wider font-['Poppins',sans-serif]">Average Rating</span>
									<div className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] mt-1 font-['Marcellus',serif] flex items-center gap-1.5">
										<span>{reviewStats.avgRating}</span>
										<Star className="w-5 h-5 fill-[#C4923C] text-[#C4923C]" />
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">Across all reviews</span>
								</div>

								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-[#8C2B1D] uppercase tracking-wider font-['Poppins',sans-serif]">Ceremony Photos</span>
									<div className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] mt-1 font-['Marcellus',serif]">
										{reviewStats.withPhotos}
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">Uploaded with images</span>
								</div>
							</div>

							{/* Search & Filter Bar */}
							<div className="bg-white border border-[#E5DCCF] rounded-2xl p-4 mb-6 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
								<div className="relative flex-1">
									<Search className="w-4 h-4 text-[#2B1A14]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
									<input
										type="text"
										value={reviewSearch}
										onChange={(e) => setReviewSearch(e.target.value)}
										placeholder="Search reviews by devotee name, ceremony, comment or location..."
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none transition"
									/>
									{reviewSearch && (
										<button
											onClick={() => setReviewSearch('')}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2B1A14]/50 hover:text-[#2B1A14]"
										>
											Clear
										</button>
									)}
								</div>

								<div className="flex flex-wrap items-center gap-1.5 font-['Poppins',sans-serif] text-xs">
									<button
										onClick={() => setReviewFilter('all')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											reviewFilter === 'all'
												? 'bg-[#8C2B1D] text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-[#2B1A14] hover:bg-[#EFE5D8]'
										}`}
									>
										All ({reviewStats.total})
									</button>
									<button
										onClick={() => setReviewFilter('approved')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											reviewFilter === 'approved'
												? 'bg-emerald-700 text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-emerald-800 hover:bg-emerald-50'
										}`}
									>
										Live ({reviewStats.approved})
									</button>
									<button
										onClick={() => setReviewFilter('hidden')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											reviewFilter === 'hidden'
												? 'bg-stone-700 text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-stone-700 hover:bg-stone-100'
										}`}
									>
										Hidden ({reviewStats.hidden})
									</button>
									<button
										onClick={() => setReviewFilter('with-photo')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											reviewFilter === 'with-photo'
												? 'bg-[#C4923C] text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-[#8C2B1D] hover:bg-[#EFE5D8]'
										}`}
									>
										With Photos ({reviewStats.withPhotos})
									</button>
								</div>
							</div>

							{/* Reviews Grid */}
							{reviewsLoading ? (
								<div className="py-20 flex flex-col items-center justify-center text-[#8C2B1D]">
									<RefreshCw className="w-10 h-10 animate-spin mb-3.5 text-[#8C2B1D]" />
									<p className="text-sm uppercase tracking-wider font-bold font-['Poppins',sans-serif]">Loading Customer Reviews...</p>
								</div>
							) : filteredAdminReviews.length === 0 ? (
								<div className="py-16 text-center border-2 border-dashed border-[#E2D7C8] rounded-3xl bg-white p-8">
									<MessageSquare className="w-14 h-14 text-[#2B1A14]/20 mx-auto mb-3.5" />
									<h3 className="text-xl font-bold text-[#8C2B1D] mb-1.5 font-['Marcellus',serif]">
										No matching customer reviews found
									</h3>
									<p className="text-sm text-[#2B1A14]/75 mb-6 max-w-md mx-auto">
										{reviewSearch
											? `No reviews match "${reviewSearch}". Try clearing your search term.`
											: 'There are no reviews under this filter category.'}
									</p>
									<button
										onClick={() => {
											setReviewFilter('all');
											setReviewSearch('');
										}}
										className="px-5 py-2.5 bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] rounded-xl text-sm font-bold transition shadow-xs font-['Poppins',sans-serif]"
									>
										Reset Filter
									</button>
								</div>
							) : (
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{filteredAdminReviews.map((rev) => {
										const isLive = rev.isApproved !== false;
										return (
											<div
												key={rev.id}
												className="bg-white border border-[#E5DCCF] rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
											>
												<div>
													{/* Card Header: Author info & Live Status */}
													<div className="flex items-start justify-between gap-3 mb-3">
														<div>
															<div className="flex items-center gap-1.5">
																<h4 className="text-lg font-bold text-[#2B1A14] font-['Marcellus',serif]">
																	{rev.name}
																</h4>
																<CheckCircle className="w-4 h-4 text-emerald-600" title="Verified Customer" />
															</div>
															<div className="flex flex-wrap items-center gap-2 text-xs text-[#2B1A14]/60 mt-0.5 font-['Poppins',sans-serif]">
																<span className="flex items-center gap-1">
																	<MapPin className="w-3 h-3 text-[#C4923C]" />
																	{rev.location || 'Dubai, UAE'}
																</span>
																<span>•</span>
																<span className="flex items-center gap-1">
																	<Calendar className="w-3 h-3 text-[#2B1A14]/40" />
																	{rev.date || 'Recent'}
																</span>
															</div>
														</div>

														<span
															className={`px-3 py-1 rounded-full text-xs font-bold font-['Poppins',sans-serif] shrink-0 ${
																isLive
																	? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
																	: 'bg-stone-200 text-stone-700 border border-stone-300'
															}`}
														>
															{isLive ? 'LIVE ON SITE' : 'HIDDEN'}
														</span>
													</div>

													{/* Ceremony & Star Rating */}
													<div className="flex flex-wrap items-center justify-between gap-2 mb-4">
														<span className="px-3 py-1 rounded-lg bg-[#FAF6F0] border border-[#E2D7C8] text-[#8C2B1D] text-xs font-bold font-['Poppins',sans-serif]">
															{rev.ceremony}
														</span>
														<div className="flex text-[#C4923C]">
															{[...Array(Number(rev.rating) || 5)].map((_, i) => (
																<Star key={i} className="w-4 h-4 fill-current" />
															))}
														</div>
													</div>

													{/* Photo Thumbnail (if attached) */}
													{rev.imageUrl && (
														<div className="mb-4">
															<div
																onClick={() => setReviewPhotoLightbox(rev.imageUrl)}
																className="relative h-44 rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E2D7C8] cursor-pointer group/thumb"
																title="Click to inspect photo in high resolution"
															>
																<img
																	src={rev.imageUrl}
																	alt={`${rev.name} review photo`}
																	className="w-full h-full object-cover transition duration-300 group-hover/thumb:scale-105"
																/>
																<div className="absolute inset-0 bg-black/25 opacity-0 group-hover/thumb:opacity-100 transition flex items-center justify-center">
																	<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-bold font-['Poppins',sans-serif]">
																		<ZoomIn className="w-3.5 h-3.5" />
																		<span>Inspect High-Res Photo</span>
																	</span>
																</div>
															</div>
														</div>
													)}

													{/* Comment Quote */}
													<div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#F2EBDD] mb-5">
														<p className="text-sm sm:text-base text-[#2B1A14]/85 leading-relaxed italic">
															"{rev.comment}"
														</p>
													</div>
												</div>

												{/* Action Buttons: Toggle Visibility & Delete */}
												<div className="pt-4 border-t border-[#F2EBDD] flex items-center justify-between gap-2">
													<button
														onClick={() => handleToggleReviewStatus(rev)}
														className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] ${
															isLive
																? 'bg-[#FAF6F0] text-stone-700 border border-[#E2D7C8] hover:bg-stone-200'
																: 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
														}`}
													>
														{isLive ? (
															<>
																<EyeOff className="w-4 h-4 text-stone-500" />
																<span>Hide from Website</span>
															</>
														) : (
															<>
																<Eye className="w-4 h-4 text-emerald-600" />
																<span>Approve & Publish</span>
															</>
														)}
													</button>

													<button
														onClick={() => openDeleteReviewModal(rev)}
														className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition font-['Poppins',sans-serif]"
														title="Delete Review"
													>
														<Trash2 className="w-4 h-4" />
														<span>Delete</span>
													</button>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					) : activeModule === 'services' ? (
						/* ========================================================================= */
						/* MODULE 4: POOJA SERVICES CATALOG & BOXES */
						/* ========================================================================= */
						<div className="p-8 sm:p-10 max-w-7xl">
							{/* Header */}
							<div className="mb-7 pb-5 border-b border-[#E5DCCF] flex flex-col md:flex-row md:items-center justify-between gap-4">
								<div>
									<div className="flex items-center gap-2 text-xs sm:text-sm text-[#C4923C] font-bold tracking-wider uppercase mb-1.5 font-['Poppins',sans-serif]">
										<BookOpen className="w-4 h-4 text-[#8C2B1D]" />
										<span>Pooja Offerings & Service Cards</span>
									</div>
									<h2 className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
										Pooja Services Management
									</h2>
									<p className="text-sm sm:text-base text-[#2B1A14]/70 mt-1">
										Add new pooja service boxes, customize descriptions, change pictures, or remove pooja boxes from your website.
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-2.5">
									<button
										onClick={loadServices}
										disabled={servicesLoading}
										title="Refresh Services"
										className="p-2.5 rounded-xl bg-white border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:border-[#8C2B1D]/40 transition shadow-2xs"
									>
										<RefreshCw className={`w-5 h-5 ${servicesLoading ? 'animate-spin' : ''}`} />
									</button>
									<button
										onClick={handleRestoreDefaultServices}
										title="Restore Starter Services"
										className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] shadow-2xs"
									>
										<RotateCcw className="w-4 h-4 text-[#8C2B1D]" />
										<span>Restore Default Services</span>
									</button>
									<button
										onClick={handleOpenAddService}
										className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-xs sm:text-sm font-bold transition shadow-md shadow-[#8C2B1D]/20 font-['Poppins',sans-serif]"
									>
										<Plus className="w-4 h-4 text-[#E5B361]" />
										<span>Add New Pooja Service</span>
									</button>
									<a
										href="/pooja-services-in-dubai"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] text-xs sm:text-sm font-bold transition shadow-2xs font-['Poppins',sans-serif]"
									>
										<span>View Live Catalog</span>
										<ExternalLink className="w-3.5 h-3.5" />
									</a>
								</div>
							</div>

							{/* KPI Cards */}
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-[#2B1A14]/60 uppercase tracking-wider font-['Poppins',sans-serif]">Total Services</span>
									<div className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] mt-1 font-['Marcellus',serif]">
										{serviceStats.total}
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">All pooja offerings</span>
								</div>

								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-['Poppins',sans-serif]">Active on Site</span>
									<div className="text-2xl sm:text-3xl font-bold text-emerald-800 mt-1 font-['Marcellus',serif] flex items-center gap-2">
										<span>{serviceStats.active}</span>
										<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">Visible to visitors</span>
								</div>

								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-[#C4923C] uppercase tracking-wider font-['Poppins',sans-serif]">Custom Added</span>
									<div className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] mt-1 font-['Marcellus',serif] flex items-center gap-1.5">
										<span>{serviceStats.custom}</span>
										<Sparkles className="w-4 h-4 text-[#C4923C]" />
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">Created by you</span>
								</div>

								<div className="bg-white border border-[#E5DCCF] rounded-2xl p-5 shadow-2xs">
									<span className="text-xs font-bold text-stone-600 uppercase tracking-wider font-['Poppins',sans-serif]">Hidden / Paused</span>
									<div className="text-2xl sm:text-3xl font-bold text-stone-700 mt-1 font-['Marcellus',serif]">
										{serviceStats.hidden}
									</div>
									<span className="text-xs text-[#2B1A14]/60 mt-0.5 block font-['Poppins',sans-serif]">Temporarily hidden</span>
								</div>
							</div>

							{/* Search & Filter Bar */}
							<div className="bg-white border border-[#E5DCCF] rounded-2xl p-4 mb-6 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
								<div className="relative flex-1">
									<Search className="w-4 h-4 text-[#2B1A14]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
									<input
										type="text"
										value={serviceSearch}
										onChange={(e) => setServiceSearch(e.target.value)}
										placeholder="Search pooja services by name, description or category..."
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none transition"
									/>
									{serviceSearch && (
										<button
											onClick={() => setServiceSearch('')}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2B1A14]/50 hover:text-[#2B1A14]"
										>
											Clear
										</button>
									)}
								</div>

								<div className="flex flex-wrap items-center gap-1.5 font-['Poppins',sans-serif] text-xs">
									<button
										onClick={() => setServiceFilter('all')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											serviceFilter === 'all'
												? 'bg-[#8C2B1D] text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-[#2B1A14] hover:bg-[#EFE5D8]'
										}`}
									>
										All ({serviceStats.total})
									</button>
									<button
										onClick={() => setServiceFilter('active')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											serviceFilter === 'active'
												? 'bg-emerald-700 text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-emerald-800 hover:bg-emerald-50'
										}`}
									>
										Active ({serviceStats.active})
									</button>
									<button
										onClick={() => setServiceFilter('hidden')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											serviceFilter === 'hidden'
												? 'bg-stone-700 text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-stone-700 hover:bg-stone-100'
										}`}
									>
										Hidden ({serviceStats.hidden})
									</button>
									<button
										onClick={() => setServiceFilter('custom')}
										className={`px-3 py-2 rounded-xl font-bold transition ${
											serviceFilter === 'custom'
												? 'bg-[#C4923C] text-white shadow-2xs'
												: 'bg-[#FAF6F0] text-[#8C2B1D] hover:bg-[#EFE5D8]'
										}`}
									>
										Custom ({serviceStats.custom})
									</button>
								</div>
							</div>

							{/* Services Grid */}
							{servicesLoading ? (
								<div className="py-20 flex flex-col items-center justify-center text-[#8C2B1D]">
									<RefreshCw className="w-10 h-10 animate-spin mb-3.5 text-[#8C2B1D]" />
									<p className="text-sm uppercase tracking-wider font-bold font-['Poppins',sans-serif]">Loading Pooja Services...</p>
								</div>
							) : filteredServices.length === 0 ? (
								<div className="py-16 text-center border-2 border-dashed border-[#E2D7C8] rounded-3xl bg-white p-8">
									<BookOpen className="w-14 h-14 text-[#2B1A14]/20 mx-auto mb-3.5" />
									<h3 className="text-xl font-bold text-[#8C2B1D] mb-1.5 font-['Marcellus',serif]">
										No matching pooja services found
									</h3>
									<p className="text-sm text-[#2B1A14]/75 mb-6 max-w-md mx-auto">
										{serviceSearch
											? `No services match "${serviceSearch}". Try clearing your search term.`
											: 'There are no pooja services in this category.'}
									</p>
									<button
										onClick={handleOpenAddService}
										className="px-5 py-2.5 bg-[#8C2B1D] text-white rounded-xl text-sm font-bold hover:bg-[#a33222] transition shadow-md shadow-[#8C2B1D]/20 font-['Poppins',sans-serif]"
									>
										Add New Pooja Service
									</button>
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{filteredServices.map((srv) => {
										const isActive = srv.isActive !== false;
										return (
											<div
												key={srv.id}
												className="bg-white border border-[#E5DCCF] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
											>
												<div>
													{/* Thumbnail Image */}
													<div className="relative h-44 bg-[#F7EFE5] overflow-hidden">
														<img
															src={srv.imageUrl}
															alt={srv.title}
															className="w-full h-full object-cover"
														/>
														<div className="absolute top-3 left-3 flex items-center gap-1.5">
															{srv.badge && (
																<span className="px-2.5 py-1 rounded-full bg-[#8C2B1D] text-white text-[11px] font-bold uppercase tracking-wider font-['Poppins',sans-serif]">
																	{srv.badge}
																</span>
															)}
															{!srv.isDefault && (
																<span className="px-2.5 py-1 rounded-full bg-[#C4923C] text-white text-[11px] font-bold uppercase tracking-wider font-['Poppins',sans-serif]">
																	Custom
																</span>
															)}
														</div>

														<span
															className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold font-['Poppins',sans-serif] ${
																isActive
																	? 'bg-emerald-600 text-white'
																	: 'bg-stone-800 text-white'
															}`}
														>
															{isActive ? 'ACTIVE' : 'HIDDEN'}
														</span>
													</div>

													{/* Details */}
													<div className="p-5">
														<h4 className="text-lg font-bold text-[#8C2B1D] font-['Marcellus',serif] mb-2 leading-snug">
															{srv.title}
														</h4>
														<p className="text-xs sm:text-sm text-[#2B1A14]/75 leading-relaxed line-clamp-3 mb-3">
															{srv.description}
														</p>
														<div className="text-[11px] font-mono text-[#8C2B1D] truncate bg-[#FAF6F0] px-2.5 py-1 rounded-lg border border-[#E2D7C8]">
															Target: {srv.targetUrl || '/book-pandit-in-dubai'}
														</div>
													</div>
												</div>

												{/* Action Buttons */}
												<div className="p-5 pt-0 border-t border-[#F2EBDD] flex items-center justify-between gap-2 mt-2">
													<div className="flex items-center gap-1.5">
														<button
															onClick={() => handleOpenEditService(srv)}
															className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#FAF6F0] hover:bg-[#F2EBDD] text-[#8C2B1D] border border-[#E2D7C8] transition font-['Poppins',sans-serif]"
														>
															<Edit3 className="w-3.5 h-3.5" />
															<span>Edit</span>
														</button>

														<button
															onClick={() => handleToggleServiceVisibility(srv)}
															className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition font-['Poppins',sans-serif] ${
																isActive
																	? 'bg-[#FAF6F0] text-stone-700 border border-[#E2D7C8] hover:bg-stone-200'
																	: 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
															}`}
														>
															{isActive ? (
																<>
																	<EyeOff className="w-3.5 h-3.5 text-stone-500" />
																	<span>Hide</span>
																</>
															) : (
																<>
																	<Eye className="w-3.5 h-3.5 text-emerald-600" />
																	<span>Show</span>
																</>
															)}
														</button>
													</div>

													<button
														onClick={() => handleOpenDeleteService(srv)}
														className="p-2 rounded-xl text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition"
														title="Remove Pooja Box"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					) : activeModule === 'security' ? (
						/* ========================================================================= */
						/* MODULE 5: ADMIN LOGIN & SECURITY SETTINGS */
						/* ========================================================================= */
						<div className="p-8 sm:p-10 max-w-5xl">
							{/* Header */}
							<div className="mb-7 pb-5 border-b border-[#E5DCCF]">
								<div className="flex items-center gap-2 text-xs sm:text-sm text-[#C4923C] font-bold tracking-wider uppercase mb-1.5 font-['Poppins',sans-serif]">
									<ShieldCheck className="w-4 h-4 text-[#8C2B1D]" />
									<span>Administrator Access Control</span>
								</div>
								<h2 className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Admin Login & Security
								</h2>
								<p className="text-sm sm:text-base text-[#2B1A14]/70 mt-1">
									Change the administrator email address and master password used to log into this portal.
								</p>
							</div>

							{/* Status Message */}
							{securityStatus.text && (
								<div
									className={`mb-6 p-4 rounded-2xl border text-sm sm:text-base flex items-start gap-3 transition ${
										securityStatus.type === 'error'
											? 'bg-red-50 border-red-200 text-red-800'
											: 'bg-emerald-50 border-emerald-300 text-emerald-900'
									}`}
								>
									{securityStatus.type === 'error' ? (
										<AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
									) : (
										<CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
									)}
									<div className="flex-1">
										<p className="font-semibold">{securityStatus.text}</p>
									</div>
									<button
										onClick={() => setSecurityStatus({ type: '', text: '' })}
										className="p-1 text-[#2B1A14]/50 hover:text-[#2B1A14]"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							)}

							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
								{/* Main Credentials Form (2 cols) */}
								<div className="lg:col-span-2 bg-white border border-[#E5DCCF] rounded-3xl p-6 sm:p-8 shadow-sm">
									<div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F2EBDD]">
										<div className="flex items-center gap-2.5">
											<Key className="w-5 h-5 text-[#8C2B1D]" />
											<h3 className="text-lg sm:text-xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
												Update Login Credentials
											</h3>
										</div>
										<span className="text-xs bg-[#FAF6F0] text-[#8C2B1D] border border-[#E5DCCF] px-3 py-1 rounded-full font-bold font-['Poppins',sans-serif]">
											Identity Verification
										</span>
									</div>

									<form onSubmit={handleUpdateSecurityCredentials} className="space-y-6">
										{/* Current Password Field (Optional Verification) */}
										<div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E2D7C8]">
											<label className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
												<span className="flex items-center gap-1.5">
													<span>Current Password</span>
													<span className="text-[#2B1A14]/50 font-normal text-xs">(Optional verification)</span>
												</span>
												<span className="text-xs font-normal normal-case text-[#2B1A14]/60">
													Already authenticated as admin
												</span>
											</label>
											<div className="relative">
												<Lock className="w-4 h-4 text-[#2B1A14]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
												<input
													type={showCurrentPassword ? 'text' : 'password'}
													value={securityCurrentPassword}
													onChange={(e) => setSecurityCurrentPassword(e.target.value)}
													placeholder="Leave blank to change directly, or enter current password"
													className="w-full bg-white border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl pl-10 pr-12 py-3 text-sm sm:text-base outline-none transition font-['Mukta',sans-serif]"
												/>
												<button
													type="button"
													onClick={() => setShowCurrentPassword(!showCurrentPassword)}
													className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2B1A14]/50 hover:text-[#2B1A14] p-1"
													title={showCurrentPassword ? 'Hide password' : 'Show password'}
												>
													{showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
												</button>
											</div>
										</div>

										<div className="border-t border-[#F2EBDD] pt-4 space-y-4">
											{/* New Admin Email */}
											<div>
												<label className="block text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
													Administrator Login Email
												</label>
												<input
													type="email"
													value={securityNewEmail}
													onChange={(e) => setSecurityNewEmail(e.target.value)}
													placeholder="admin@example.com"
													required
													className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-3 text-sm sm:text-base outline-none transition font-['Mukta',sans-serif]"
												/>
												<p className="text-xs text-[#2B1A14]/60 mt-1 font-['Poppins',sans-serif]">
													Enter the email address you want to use to log into this admin panel.
												</p>
											</div>

											{/* New Password */}
											<div>
												<label className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
													<span>New Password</span>
													<span className="text-xs font-normal normal-case text-[#2B1A14]/60">
														(Leave blank to keep unchanged)
													</span>
												</label>
												<div className="relative">
													<Lock className="w-4 h-4 text-[#2B1A14]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
													<input
														type={showNewPassword ? 'text' : 'password'}
														value={securityNewPassword}
														onChange={(e) => setSecurityNewPassword(e.target.value)}
														placeholder="Enter new password (min. 6 characters)"
														className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl pl-10 pr-12 py-3 text-sm sm:text-base outline-none transition font-['Mukta',sans-serif]"
													/>
													<button
														type="button"
														onClick={() => setShowNewPassword(!showNewPassword)}
														className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2B1A14]/50 hover:text-[#2B1A14] p-1"
														title={showNewPassword ? 'Hide password' : 'Show password'}
													>
														{showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
													</button>
												</div>
											</div>

											{/* Confirm New Password */}
											<div>
												<label className="block text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
													Confirm New Password
												</label>
												<div className="relative">
													<Lock className="w-4 h-4 text-[#2B1A14]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
													<input
														type={showNewPassword ? 'text' : 'password'}
														value={securityConfirmPassword}
														onChange={(e) => setSecurityConfirmPassword(e.target.value)}
														placeholder="Confirm new password"
														className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl pl-10 pr-12 py-3 text-sm sm:text-base outline-none transition font-['Mukta',sans-serif]"
													/>
												</div>
											</div>
										</div>

										{/* Submit Action */}
										<div className="pt-4 border-t border-[#F2EBDD] flex items-center justify-end gap-3">
											<button
												type="submit"
												disabled={securitySubmitting}
												className="px-6 py-3 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white font-bold text-sm sm:text-base transition shadow-md shadow-[#8C2B1D]/20 disabled:opacity-50 flex items-center gap-2 font-['Poppins',sans-serif]"
											>
												<ShieldCheck className="w-4 h-4 text-[#E5B361]" />
												<span>{securitySubmitting ? 'Saving Changes...' : 'Save & Apply New Credentials'}</span>
											</button>
										</div>
									</form>
								</div>

								{/* Side Info & Reset Cards (1 col) */}
								<div className="space-y-6">
									{/* Account Info */}
									<div className="bg-white border border-[#E5DCCF] rounded-3xl p-6 shadow-sm">
										<h4 className="text-base font-bold text-[#8C2B1D] font-['Marcellus',serif] mb-4 flex items-center gap-2">
											<Sparkles className="w-4 h-4 text-[#C4923C]" />
											<span>Current Account Info</span>
										</h4>
										<div className="space-y-3 text-xs sm:text-sm font-['Poppins',sans-serif]">
											<div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E2D7C8]">
												<span className="text-[#2B1A14]/60 block text-xs">Active Login Email</span>
												<span className="font-bold text-[#8C2B1D] text-sm break-all">
													{adminUser?.email || credentialsInfo?.email}
												</span>
											</div>
											<div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E2D7C8]">
												<span className="text-[#2B1A14]/60 block text-xs">Active Login Password</span>
												<div className="flex items-center justify-between mt-1">
													<span className="font-mono font-bold text-sm text-[#8C2B1D]">
														{showRevealedPassword ? (credentialsInfo?.password || 'shashtrivishal16914') : '••••••••••••••••'}
													</span>
													<button
														type="button"
														onClick={() => setShowRevealedPassword(!showRevealedPassword)}
														className="text-xs text-[#8C2B1D] hover:underline font-bold flex items-center gap-1 font-['Poppins',sans-serif]"
													>
														{showRevealedPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
														<span>{showRevealedPassword ? 'Hide' : 'Reveal'}</span>
													</button>
												</div>
											</div>
											<div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E2D7C8]">
												<span className="text-[#2B1A14]/60 block text-xs">Role</span>
												<span className="font-bold text-emerald-800 text-sm">
													Super Administrator
												</span>
											</div>
											<div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E2D7C8]">
												<span className="text-[#2B1A14]/60 block text-xs">Credentials Configuration</span>
												<span className="font-bold text-[#2B1A14] text-sm">
													{credentialsInfo?.isCustom ? 'Custom Configured' : 'Factory Default'}
												</span>
											</div>
										</div>
									</div>

									{/* Reset to Factory Default Zone */}
									<div className="bg-white border border-red-200 rounded-3xl p-6 shadow-sm">
										<h4 className="text-base font-bold text-red-900 font-['Marcellus',serif] mb-2 flex items-center gap-2">
											<RotateCcw className="w-4 h-4 text-red-700" />
											<span>Factory Default Reset</span>
										</h4>
										<p className="text-xs text-[#2B1A14]/70 leading-relaxed mb-4 font-['Poppins',sans-serif]">
											Revert administrator login email and password back to the factory initial default (<strong className="text-[#8C2B1D]">vishaldevmorari487@gmail.com</strong>).
										</p>
										<button
											type="button"
											onClick={handleResetSecurityCredentials}
											disabled={securitySubmitting}
											className="w-full py-2.5 px-4 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 font-['Poppins',sans-serif]"
										>
											<RotateCcw className="w-3.5 h-3.5" />
											<span>Reset to Factory Default</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						/* ========================================================================= */
						/* MODULE 2: PAGE PHOTOS & GALLERIES */
						/* ========================================================================= */
						<>
							{/* Page / Section Header */}
							<div className="bg-white border-b border-[#E5DCCF] px-8 sm:px-10 py-6 shadow-2xs">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
									<div>
										<div className="flex items-center gap-2 text-xs sm:text-sm text-[#C4923C] font-bold tracking-wider uppercase mb-1.5 font-['Poppins',sans-serif]">
											<span>{activePage.pageTitle}</span>
											<span className="text-[#2B1A14]/30">•</span>
											<span className="text-[#2B1A14]/70 font-mono text-xs">{activePage.route}</span>
										</div>
										<h2 className="text-2xl sm:text-3xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
											{activeSection.title}
										</h2>
										<p className="text-sm sm:text-base text-[#2B1A14]/70 mt-1">{activeSection.description}</p>
									</div>

									<div className="flex flex-wrap items-center gap-2.5">
										<button
											onClick={loadPhotos}
											disabled={loading}
											title="Refresh from Database"
											className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E2D7C8] text-[#2B1A14] hover:text-[#8C2B1D] hover:border-[#8C2B1D]/40 transition disabled:opacity-50"
										>
											<RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
										</button>
										<button
											onClick={handleRestoreDefaults}
											title="Restore the original template photo for this section"
											className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] text-xs sm:text-sm font-bold transition font-['Poppins',sans-serif] shadow-2xs"
										>
											<RotateCcw className="w-4 h-4 text-[#8C2B1D]" />
											<span>Restore Default</span>
										</button>
										<button
											onClick={() => setIsUploadOpen(true)}
											className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-sm sm:text-base font-bold shadow-md shadow-[#8C2B1D]/20 transition font-['Marcellus',serif]"
										>
											<Plus className="w-5 h-5" />
											<span>Upload New Photo</span>
										</button>
									</div>
								</div>

								{/* Section Tabs (if page has multiple sections) */}
								{activePage.sections.length > 1 && (
									<div className="flex gap-2.5 border-t border-[#F2EBDD] pt-4">
										{activePage.sections.map((sec) => {
											const isSecActive = sec.sectionId === selectedSectionId;
											return (
												<button
													key={sec.sectionId}
													onClick={() => setSelectedSectionId(sec.sectionId)}
													className={`px-4 py-2 rounded-xl text-sm font-bold transition font-['Poppins',sans-serif] ${
														isSecActive
															? 'bg-[#8C2B1D] text-white shadow-2xs'
															: 'bg-[#F2EBDD] text-[#2B1A14]/80 hover:bg-[#EAE0CE] hover:text-[#2B1A14]'
													}`}
												>
													{sec.title}
												</button>
											);
										})}
									</div>
								)}
							</div>

							{/* Photos Content Canvas */}
							<div className="p-8 sm:p-10">
								{/* Mode Status Pill */}
								<div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DCCF]">
									<div className="flex items-center gap-2.5 text-sm">
										<span className="text-[#2B1A14]/70 font-semibold font-['Poppins',sans-serif]">Source:</span>
										{isLiveFromDb ? (
											<span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs sm:text-sm font-['Poppins',sans-serif]">
												<span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
												Live Database Photos ({photos.length})
											</span>
										) : (
											<span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs sm:text-sm font-['Poppins',sans-serif]">
												<span className="w-2 h-2 rounded-full bg-amber-600" />
												Default Website Photos ({photos.length})
											</span>
										)}
									</div>

									<div className="text-xs sm:text-sm text-[#2B1A14]/70 font-semibold font-['Poppins',sans-serif]">
										{activeSection.type === 'single'
											? 'Single Feature Image slot (Upload to replace)'
											: 'Multi-image gallery (Drag or use arrows to reorder)'}
									</div>
								</div>

								{/* Photos Grid */}
								{loading ? (
									<div className="py-20 flex flex-col items-center justify-center text-[#8C2B1D]">
										<RefreshCw className="w-10 h-10 animate-spin mb-3.5 text-[#8C2B1D]" />
										<p className="text-sm uppercase tracking-wider font-bold font-['Poppins',sans-serif]">Loading Section Photos...</p>
									</div>
								) : photos.length === 0 ? (
									<div className="py-16 text-center border-2 border-dashed border-[#E2D7C8] rounded-3xl bg-white p-8">
										<ImageIcon className="w-14 h-14 text-[#2B1A14]/20 mx-auto mb-3.5" />
										<h3 className="text-xl font-bold text-[#8C2B1D] mb-1.5 font-['Marcellus',serif]">No photos currently in this section</h3>
										<p className="text-sm text-[#2B1A14]/75 mb-6 max-w-md mx-auto">
											All photos were removed. This section is currently hidden on your live website. You can restore the original default photo or upload a new one.
										</p>
										<div className="flex flex-wrap items-center justify-center gap-3">
											<button
												onClick={handleRestoreDefaults}
												className="px-5 py-3 bg-white border border-[#E2D7C8] text-[#8C2B1D] hover:bg-[#F2EBDD] rounded-xl text-sm font-bold transition shadow-xs flex items-center gap-2 font-['Poppins',sans-serif]"
											>
												<RotateCcw className="w-4 h-4 text-[#8C2B1D]" />
												<span>Restore Original Photo</span>
											</button>
											<button
												onClick={() => setIsUploadOpen(true)}
												className="px-5 py-3 bg-[#8C2B1D] text-white rounded-xl text-sm font-bold hover:bg-[#a33222] transition shadow-md shadow-[#8C2B1D]/20 flex items-center gap-2 font-['Marcellus',serif]"
											>
												<Plus className="w-4 h-4" />
												<span>Upload New Photo</span>
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
													className="bg-white border border-[#E5DCCF] hover:border-[#8C2B1D]/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col"
												>
													{/* Image Frame */}
													<div className="aspect-square relative bg-[#FAF6F0] overflow-hidden">
														<img
															src={photo.src}
															alt={photo.alt || photo.title}
															className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
															loading="lazy"
														/>

														{/* Order Badge */}
														<div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#2B1A14]/85 backdrop-blur-md text-xs font-bold text-[#E5B361] border border-white/10 font-['Poppins',sans-serif]">
															#{index + 1}
														</div>

														{/* Quick Hover Overlay */}
														<div className="absolute inset-0 bg-[#2B1A14]/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 p-4">
															<a
																href={photo.src}
																target="_blank"
																rel="noopener noreferrer"
																title="View High Resolution"
																className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transition"
															>
																<Eye className="w-5 h-5" />
															</a>
															<button
																onClick={() => openEditModal(photo)}
																title="Edit Details"
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

													{/* Info & Metadata */}
													<div className="p-4 flex-1 flex flex-col justify-between">
														<div>
															<h4 className="text-sm sm:text-base font-bold text-[#2B1A14] truncate mb-1" title={photo.title || 'Untitled'}>
																{photo.title || 'Untitled Photo'}
															</h4>
															<p className="text-xs text-[#2B1A14]/70 truncate" title={photo.alt || 'No alt text'}>
																Alt: {photo.alt || 'None'}
															</p>
														</div>

														{/* Reorder / Action Footer */}
														<div className="mt-3.5 pt-3.5 border-t border-[#F2EBDD] flex items-center justify-between">
															<div className="flex items-center gap-1.5">
																<button
																	onClick={() => handleMove(index, 'up')}
																	disabled={isFirst || !isLiveFromDb}
																	title="Move Previous"
																	className="p-1.5 rounded-lg text-[#2B1A14]/70 hover:text-[#8C2B1D] hover:bg-[#FAF6F0] transition disabled:opacity-20"
																>
																	<ArrowUp className="w-4 h-4" />
																</button>
																<button
																	onClick={() => handleMove(index, 'down')}
																	disabled={isLast || !isLiveFromDb}
																	title="Move Next"
																	className="p-1.5 rounded-lg text-[#2B1A14]/70 hover:text-[#8C2B1D] hover:bg-[#FAF6F0] transition disabled:opacity-20"
																>
																	<ArrowDown className="w-4 h-4" />
																</button>
															</div>

															<div className="flex items-center gap-2">
																<button
																	onClick={() => openEditModal(photo)}
																	className="text-xs sm:text-sm font-bold text-[#8C2B1D] hover:underline px-2.5 py-1 rounded transition font-['Poppins',sans-serif]"
																>
																	Edit
																</button>
																<button
																	onClick={() => openDeleteModal(photo)}
																	className="text-xs sm:text-sm font-bold text-red-600 hover:underline px-2.5 py-1 rounded transition font-['Poppins',sans-serif]"
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
						</>
					)}
				</main>
			</div>

			{/* ========================================================================= */}
			{/* UPLOAD PHOTO MODAL */}
			{/* ========================================================================= */}
			{isUploadOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsUploadOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Modal Header */}
						<div className="flex items-start justify-between pb-3 mb-4 border-b border-[#F2EBDD] shrink-0">
							<div>
								<h3 className="text-xl sm:text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Upload Photo to {activeSection.title}
								</h3>
								<p className="text-xs sm:text-sm text-[#2B1A14]/70 mt-1 font-['Poppins',sans-serif]">
									Page: <span className="text-[#8C2B1D] font-bold">{activePage.pageTitle}</span>
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsUploadOpen(false)}
								className="p-1 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition shrink-0 ml-3"
								title="Close (Esc)"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form with scrollable body and pinned footer */}
						<form onSubmit={handleUploadSubmit} className="flex-1 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto pr-1.5 space-y-4">
								{/* File Dropzone */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-2 font-['Poppins',sans-serif]">
										Select Image File
									</label>
									<div className="border-2 border-dashed border-[#E2D7C8] hover:border-[#8C2B1D] rounded-2xl p-5 text-center cursor-pointer transition relative bg-[#FAF6F0]">
										<input
											type="file"
											accept="image/*"
											onChange={handleFileSelect}
											className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
										/>
										{uploadPreview ? (
											<div className="flex flex-col items-center">
												<img
													src={uploadPreview}
													alt="Preview"
													className="h-32 max-h-36 object-contain rounded-xl mb-2.5"
												/>
												<span className="text-sm text-[#8C2B1D] font-bold">Click to choose a different photo</span>
											</div>
										) : (
											<div className="py-4">
												<Upload className="w-8 h-8 text-[#8C2B1D] mx-auto mb-2" />
												<p className="text-sm font-bold text-[#2B1A14]">Click or drag photo here</p>
												<p className="text-xs text-[#2B1A14]/60 mt-1">Supports JPEG, PNG, WebP up to 10MB</p>
											</div>
										)}
									</div>
								</div>

								{/* Photo Title */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Photo Title / Caption
									</label>
									<input
										type="text"
										value={uploadTitle}
										onChange={(e) => setUploadTitle(e.target.value)}
										placeholder="e.g. Traditional Mandap and Havan Kund"
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none"
									/>
								</div>

								{/* Alt Text */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Accessibility / SEO Alt Text
									</label>
									<input
										type="text"
										value={uploadAlt}
										onChange={(e) => setUploadAlt(e.target.value)}
										placeholder="e.g. Vedic Pandit performing ritual in Dubai"
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none"
									/>
								</div>
							</div>

							{/* Pinned Action Buttons */}
							<div className="flex gap-3.5 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
								<button
									type="button"
									onClick={() => setIsUploadOpen(false)}
									className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting || !uploadFile}
									className="flex-1 py-3 rounded-xl bg-[#8C2B1D] text-white text-sm sm:text-base font-bold hover:bg-[#a33222] transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif]"
								>
									{isSubmitting ? (
										<>
											<RefreshCw className="w-4 h-4 animate-spin" />
											<span>Uploading...</span>
										</>
									) : (
										<>
											<Upload className="w-4 h-4" />
											<span>Upload to Section</span>
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* EDIT PHOTO MODAL */}
			{/* ========================================================================= */}
			{isEditOpen && selectedPhoto && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsEditOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Modal Header */}
						<div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2EBDD] shrink-0">
							<h3 className="text-xl sm:text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
								Edit Photo Details
							</h3>
							<button
								type="button"
								onClick={() => setIsEditOpen(false)}
								className="p-1 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition shrink-0 ml-3"
								title="Close (Esc)"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form with scrollable body and pinned footer */}
						<form onSubmit={handleEditSubmit} className="flex-1 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto pr-1.5 space-y-4">
								{/* Photo Preview & Image Replacement Section */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Photo & Replace Image
									</label>
									<div className="flex flex-col sm:flex-row items-center gap-3.5 p-3.5 bg-[#FAF6F0] rounded-2xl border border-[#E2D7C8]">
										<img
											src={editPreview || selectedPhoto.src}
											alt={editTitle || selectedPhoto.title || ''}
											className="rounded-xl shrink-0 border border-[#E2D7C8] object-cover bg-stone-100 shadow-2xs"
											style={{ width: '84px', height: '84px', minWidth: '84px', minHeight: '84px', maxWidth: '84px', maxHeight: '84px' }}
										/>
										<div className="flex-1 w-full space-y-1.5">
											<div className="flex flex-wrap items-center gap-2">
												<label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C2B1D] text-white text-xs font-bold hover:bg-[#a33222] transition shadow-2xs font-['Poppins',sans-serif]">
													<Upload className="w-3.5 h-3.5" />
													<span>{editFile ? 'Choose Different Image' : 'Replace Picture'}</span>
													<input
														type="file"
														accept="image/*"
														onChange={handleEditFileSelect}
														className="hidden"
													/>
												</label>
												{editFile && (
													<button
														type="button"
														onClick={() => {
															setEditFile(null);
															setEditPreview(selectedPhoto.src);
														}}
														className="text-xs text-red-700 hover:underline font-bold"
													>
														Cancel
													</button>
												)}
											</div>
											<p className="text-xs text-[#2B1A14]/70">
												{editFile ? (
													<span className="text-emerald-700 font-bold">New picture ready ({editFile.name})</span>
												) : (
													'Click "Replace Picture" to upload a new image from your device.'
												)}
											</p>
											<p className="text-[11px] text-[#8C2B1D] font-semibold truncate font-['Poppins',sans-serif]">
												Section: {activeSection.title}
											</p>
										</div>
									</div>
								</div>

								{/* Photo Title Input */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Photo Title / Caption
									</label>
									<input
										type="text"
										value={editTitle}
										onChange={(e) => setEditTitle(e.target.value)}
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none"
									/>
								</div>

								{/* Alt Text Input */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Alt Text (Accessibility)
									</label>
									<input
										type="text"
										value={editAlt}
										onChange={(e) => setEditAlt(e.target.value)}
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none"
									/>
								</div>

								{/* Display Sort Order */}
								<div>
									<label className="block text-xs sm:text-sm font-bold text-[#2B1A14] uppercase mb-1.5 font-['Poppins',sans-serif]">
										Display Sort Order (Number)
									</label>
									<input
										type="number"
										value={editSortOrder}
										onChange={(e) => setEditSortOrder(e.target.value)}
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none"
									/>
								</div>
							</div>

							{/* Pinned Action Buttons */}
							<div className="flex gap-3 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
								<button
									type="button"
									onClick={() => setIsEditOpen(false)}
									className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 py-3 rounded-xl bg-[#8C2B1D] text-white text-sm sm:text-base font-bold hover:bg-[#a33222] transition disabled:opacity-50 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif]"
								>
									{isSubmitting ? 'Saving...' : 'Save Changes'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* DELETE CONFIRMATION MODAL */}
			{/* ========================================================================= */}
			{isDeleteOpen && selectedPhoto && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsDeleteOpen(false);
					}}
				>
					<div className="bg-white border border-red-200 rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
						<div className="w-14 h-14 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600 mx-auto mb-4">
							<Trash2 className="w-7 h-7" />
						</div>

						<h3 className="text-xl font-bold text-center text-[#2B1A14] mb-2 font-['Marcellus',serif]">Delete Photo?</h3>
						<p className="text-sm text-[#2B1A14]/75 text-center mb-6 leading-relaxed">
							Are you sure you want to delete <span className="text-[#8C2B1D] font-bold">"{selectedPhoto.title || 'this photo'}"</span>? This will permanently remove it from storage and database.
						</p>

						<div className="flex gap-3.5">
							<button
								type="button"
								onClick={() => setIsDeleteOpen(false)}
								className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
							>
								Keep It
							</button>
							<button
								type="button"
								onClick={handleDeleteSubmit}
								disabled={isSubmitting}
								className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition disabled:opacity-50 font-['Poppins',sans-serif]"
							>
								{isSubmitting ? 'Deleting...' : 'Yes, Delete'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* SETUP GUIDE MODAL */}
			{/* ========================================================================= */}
			{isSetupGuideOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget) setIsSetupGuideOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Modal Header */}
						<div className="flex items-start justify-between pb-3 mb-4 border-b border-[#F2EBDD] shrink-0">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E2D7C8] flex items-center justify-center text-[#8C2B1D] shrink-0">
									<FileText className="w-5 h-5" />
								</div>
								<div>
									<h3 className="text-xl sm:text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">Connecting Your Supabase Backend</h3>
									<p className="text-xs sm:text-sm text-[#2B1A14]/70 mt-0.5">
										Follow these 3 quick steps to enable live database storage and cloud photo uploads.
									</p>
								</div>
							</div>
							<button
								type="button"
								onClick={() => setIsSetupGuideOpen(false)}
								className="p-1 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition shrink-0 ml-3"
								title="Close (Esc)"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Scrollable Content */}
						<div className="flex-1 overflow-y-auto pr-1.5 space-y-4 text-sm">
							{/* Step 1 */}
							<div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E2D7C8]">
								<h4 className="font-bold text-[#8C2B1D] text-base mb-1 font-['Poppins',sans-serif]">Step 1: Run the Database SQL Script</h4>
								<p className="text-[#2B1A14]/80 mb-3">
									Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-[#8C2B1D] font-bold underline">Supabase Dashboard</a>, go to <strong>SQL Editor</strong>, and run the contents of the generated schema file:
								</p>
								<div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E2D7C8] font-mono text-xs sm:text-sm text-[#2B1A14]">
									<span>supabase_schema.sql (located in your project root)</span>
									<button
										onClick={copySqlSnippet}
										className="flex items-center gap-1.5 text-[#8C2B1D] font-bold hover:underline font-['Poppins',sans-serif]"
									>
										{copiedSql ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
										<span>{copiedSql ? 'Copied' : 'Copy'}</span>
									</button>
								</div>
							</div>

							{/* Step 2 */}
							<div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E2D7C8]">
								<h4 className="font-bold text-[#8C2B1D] text-base mb-1 font-['Poppins',sans-serif]">Step 2: Add API Keys to Environment File</h4>
								<p className="text-[#2B1A14]/80 mb-3">
									In your Supabase project under <strong>Project Settings → API</strong>, copy your Project URL and anon public key, then add them to <code className="text-[#8C2B1D] font-bold">apps/web/.env</code>:
								</p>
								<pre className="p-3 rounded-xl bg-white border border-[#E2D7C8] font-mono text-xs sm:text-sm text-[#8C2B1D] overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
								</pre>
							</div>

							{/* Step 3 */}
							<div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E2D7C8]">
								<h4 className="font-bold text-[#8C2B1D] text-base mb-1 font-['Poppins',sans-serif]">Step 3: Admin Login Ready</h4>
								<p className="text-[#2B1A14]/80">
									Your login is already pre-configured for <code className="text-[#8C2B1D] font-bold">Vishaldevmorari487@gmail.com</code>.
								</p>
							</div>
						</div>

						{/* Pinned Button */}
						<div className="pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
							<button
								type="button"
								onClick={() => setIsSetupGuideOpen(false)}
								className="w-full py-3.5 bg-[#8C2B1D] text-white font-bold rounded-xl text-base hover:bg-[#a33222] transition shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif]"
							>
								Got It, Return to Admin Panel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 5: DELETE REVIEW CONFIRMATION */}
			{/* ========================================================================= */}
			{isReviewDeleteOpen && selectedReviewForDelete && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
					onClick={(e) => {
						if (e.target === e.currentTarget && !isSubmitting) setIsReviewDeleteOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative my-auto">
						<div className="flex items-center gap-3 text-red-700 mb-4">
							<div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
								<Trash2 className="w-6 h-6 text-red-700" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Delete Customer Review?
								</h3>
								<p className="text-xs text-[#2B1A14]/70">This action cannot be undone.</p>
							</div>
						</div>

						<div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E2D7C8] mb-6 space-y-1.5 text-sm">
							<p className="font-bold text-[#2B1A14]">
								Reviewer: <span className="text-[#8C2B1D]">{selectedReviewForDelete.name}</span>
							</p>
							<p className="text-xs text-[#2B1A14]/70">
								Ceremony: {selectedReviewForDelete.ceremony}
							</p>
							<p className="text-xs text-[#2B1A14]/70 italic line-clamp-2">
								"{selectedReviewForDelete.comment}"
							</p>
						</div>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setIsReviewDeleteOpen(false)}
								disabled={isSubmitting}
								className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleDeleteReviewConfirm}
								disabled={isSubmitting}
								className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-bold transition disabled:opacity-50 shadow-md font-['Poppins',sans-serif] flex items-center justify-center gap-2"
							>
								{isSubmitting ? 'Deleting...' : 'Delete Review'}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 6: ADMIN REVIEW PHOTO FULLSCREEN LIGHTBOX */}
			{/* ========================================================================= */}
			{reviewPhotoLightbox && (
				<div
					className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
					onClick={() => setReviewPhotoLightbox(null)}
				>
					<div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
						<button
							onClick={() => setReviewPhotoLightbox(null)}
							className="absolute -top-12 right-0 text-white/80 hover:text-white p-2"
							title="Close (Esc)"
						>
							<X className="w-8 h-8" />
						</button>
						<img
							src={reviewPhotoLightbox}
							alt="Enlarged Ceremony Review Photo"
							className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
						/>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 7: ADD NEW POOJA SERVICE BOX */}
			{/* ========================================================================= */}
			{isAddServiceOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget && !isSubmitting) setIsAddServiceOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Header */}
						<div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F2EBDD] shrink-0">
							<div>
								<div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C4923C] mb-1 font-['Poppins',sans-serif]">
									<Sparkles className="w-3.5 h-3.5" />
									<span>New Service Box</span>
								</div>
								<h3 className="text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Add New Pooja Service
								</h3>
							</div>
							<button
								type="button"
								onClick={() => setIsAddServiceOpen(false)}
								disabled={isSubmitting}
								className="p-1.5 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition shrink-0 ml-3"
								title="Close (Esc)"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleAddServiceSubmit} className="flex-1 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto pr-1.5 space-y-4 text-sm">
								{/* Title */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Pooja Name / Title</span>
										<span className="text-red-600 font-bold">*</span>
									</label>
									<input
										type="text"
										value={serviceTitle}
										onChange={(e) => setServiceTitle(e.target.value)}
										placeholder="e.g. Navchandi Yagna & Durga Pooja"
										required
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none transition"
									/>
								</div>

								{/* Badge / Category */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Badge / Category Tag</span>
									</label>
									<input
										type="text"
										value={serviceBadge}
										onChange={(e) => setServiceBadge(e.target.value)}
										placeholder="e.g. Special Blessing, Housewarming, Protection"
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none transition"
									/>
								</div>

								{/* Description */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Pooja Description & Vidhi</span>
										<span className="text-red-600 font-bold">*</span>
									</label>
									<textarea
										rows={3}
										value={serviceDescription}
										onChange={(e) => setServiceDescription(e.target.value)}
										placeholder="Describe the ceremony, mantras chanted, purpose, and blessings..."
										required
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl p-3.5 text-sm sm:text-base outline-none transition leading-relaxed resize-none"
									/>
								</div>

								{/* Image */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Service Box Picture</span>
									</label>
									<div className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAF6F0] border border-[#E2D7C8]">
										{servicePreview && (
											<img
												src={servicePreview}
												alt="Preview"
												className="w-20 h-20 object-cover rounded-xl border border-[#E2D7C8] shrink-0"
											/>
										)}
										<div className="flex-1">
											<label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2D7C8] hover:border-[#8C2B1D] rounded-xl text-xs font-bold text-[#8C2B1D] transition shadow-2xs font-['Poppins',sans-serif]">
												<Upload className="w-3.5 h-3.5" />
												<span>Upload Custom Image</span>
												<input
													type="file"
													accept="image/*"
													onChange={(e) => {
														const file = e.target.files?.[0];
														if (file) {
															setServiceFile(file);
															setServicePreview(URL.createObjectURL(file));
														}
													}}
													className="hidden"
												/>
											</label>
											<input
												type="text"
												value={servicePreview || ''}
												onChange={(e) => {
													setServiceFile(null);
													setServicePreview(e.target.value);
												}}
												placeholder="https://... (or paste direct image URL)"
												className="mt-2 w-full bg-white border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-3 py-1.5 text-xs outline-none"
											/>
											<p className="text-[11px] text-[#2B1A14]/60 mt-1">
												Recommended: 600x400 JPEG or PNG
											</p>
										</div>
									</div>
								</div>

								{/* Target Link */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Button Action / Destination</span>
									</label>
									<select
										value={
											[
												'/book-pandit-in-dubai',
												'https://wa.me/971504192987',
												'/pooja-services-in-dubai',
												'/authentic-vedic-pooja-dubai',
												'/griha-pravesh-and-vastu',
												'/wedding-ceremonies',
												'/shanti-havan-and-yagna',
												'/satyanarayan-and-festivals',
												'/rudrabhishek-and-planets',
												'/car-pooja-in-dubai-vehicle-pooja-in-dubai',
												'/pitru-paksha-pooja-dubai'
											].includes(serviceTargetUrl)
												? serviceTargetUrl
												: 'custom'
										}
										onChange={(e) => {
											if (e.target.value !== 'custom') {
												setServiceTargetUrl(e.target.value);
											}
										}}
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none transition font-['Mukta',sans-serif] mb-2"
									>
										<option value="/book-pandit-in-dubai">Booking Form (/book-pandit-in-dubai)</option>
										<option value="https://wa.me/971504192987">WhatsApp Inquiry</option>
										<option value="/pooja-services-in-dubai">All Pooja Services (/pooja-services-in-dubai)</option>
										<option value="/griha-pravesh-and-vastu">Griha Pravesh Page</option>
										<option value="/wedding-ceremonies">Wedding Page</option>
										<option value="/shanti-havan-and-yagna">Shanti Havan Page</option>
										<option value="/satyanarayan-and-festivals">Satyanarayan Page</option>
										<option value="/rudrabhishek-and-planets">Rudrabhishek Page</option>
										<option value="/car-pooja-in-dubai-vehicle-pooja-in-dubai">Car Pooja Page</option>
										<option value="/pitru-paksha-pooja-dubai">Pitru Paksha Page</option>
										<option value="custom">-- Custom Link / URL --</option>
									</select>

									<input
										type="text"
										value={serviceTargetUrl}
										onChange={(e) => setServiceTargetUrl(e.target.value)}
										placeholder="/your-page or https://..."
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2 text-xs font-mono outline-none"
									/>
								</div>

								{/* Button Label */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Button Label</span>
									</label>
									<input
										type="text"
										value={serviceButtonText}
										onChange={(e) => setServiceButtonText(e.target.value)}
										placeholder="e.g. Book This Pooja"
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm outline-none transition"
									/>
								</div>
							</div>

							{/* Actions */}
							<div className="flex gap-3 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
								<button
									type="button"
									onClick={() => setIsAddServiceOpen(false)}
									disabled={isSubmitting}
									className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 py-3 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-sm sm:text-base font-bold transition disabled:opacity-50 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif] flex items-center justify-center gap-2"
								>
									{isSubmitting ? 'Adding...' : 'Create Pooja Service Box'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 8: EDIT POOJA SERVICE BOX */}
			{/* ========================================================================= */}
			{isEditServiceOpen && selectedService && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen"
					onClick={(e) => {
						if (e.target === e.currentTarget && !isSubmitting) setIsEditServiceOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
						{/* Header */}
						<div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F2EBDD] shrink-0">
							<div>
								<div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C4923C] mb-1 font-['Poppins',sans-serif]">
									<Edit3 className="w-3.5 h-3.5" />
									<span>Edit Service Box</span>
								</div>
								<h3 className="text-2xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Edit Pooja Service
								</h3>
							</div>
							<button
								type="button"
								onClick={() => setIsEditServiceOpen(false)}
								disabled={isSubmitting}
								className="p-1.5 rounded-full text-[#2B1A14]/50 hover:text-[#2B1A14] hover:bg-[#FAF6F0] transition shrink-0 ml-3"
								title="Close (Esc)"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleEditServiceSubmit} className="flex-1 flex flex-col min-h-0">
							<div className="flex-1 overflow-y-auto pr-1.5 space-y-4 text-sm">
								{/* Title */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Pooja Name / Title</span>
										<span className="text-red-600 font-bold">*</span>
									</label>
									<input
										type="text"
										value={serviceTitle}
										onChange={(e) => setServiceTitle(e.target.value)}
										required
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm sm:text-base outline-none transition"
									/>
								</div>

								{/* Badge */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Badge / Category Tag</span>
									</label>
									<input
										type="text"
										value={serviceBadge}
										onChange={(e) => setServiceBadge(e.target.value)}
										placeholder="e.g. Housewarming, Special Blessing"
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm outline-none transition"
									/>
								</div>

								{/* Description */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Pooja Description & Vidhi</span>
										<span className="text-red-600 font-bold">*</span>
									</label>
									<textarea
										rows={3}
										value={serviceDescription}
										onChange={(e) => setServiceDescription(e.target.value)}
										required
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl p-3.5 text-sm sm:text-base outline-none transition leading-relaxed resize-none"
									/>
								</div>

								{/* Image */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Service Box Picture</span>
									</label>
									<div className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAF6F0] border border-[#E2D7C8]">
										{servicePreview && (
											<img
												src={servicePreview}
												alt="Preview"
												className="w-20 h-20 object-cover rounded-xl border border-[#E2D7C8] shrink-0"
											/>
										)}
										<div className="flex-1">
											<label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2D7C8] hover:border-[#8C2B1D] rounded-xl text-xs font-bold text-[#8C2B1D] transition shadow-2xs font-['Poppins',sans-serif]">
												<Upload className="w-3.5 h-3.5" />
												<span>{serviceFile ? 'Change Selected File' : 'Replace Picture'}</span>
												<input
													type="file"
													accept="image/*"
													onChange={(e) => {
														const file = e.target.files?.[0];
														if (file) {
															setServiceFile(file);
															setServicePreview(URL.createObjectURL(file));
														}
													}}
													className="hidden"
												/>
											</label>
											<input
												type="text"
												value={servicePreview || ''}
												onChange={(e) => {
													setServiceFile(null);
													setServicePreview(e.target.value);
												}}
												placeholder="https://... (or paste direct image URL)"
												className="mt-2 w-full bg-white border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-3 py-1.5 text-xs outline-none"
											/>
											{serviceFile && (
												<p className="text-[11px] text-emerald-700 font-bold mt-1">
													New file: {serviceFile.name}
												</p>
											)}
										</div>
									</div>
								</div>

								{/* Target Link */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Button Action / Destination</span>
									</label>
									<select
										value={
											[
												'/book-pandit-in-dubai',
												'https://wa.me/971504192987',
												'/pooja-services-in-dubai',
												'/authentic-vedic-pooja-dubai',
												'/griha-pravesh-and-vastu',
												'/wedding-ceremonies',
												'/shanti-havan-and-yagna',
												'/satyanarayan-and-festivals',
												'/rudrabhishek-and-planets',
												'/car-pooja-in-dubai-vehicle-pooja-in-dubai',
												'/pitru-paksha-pooja-dubai'
											].includes(serviceTargetUrl)
												? serviceTargetUrl
												: 'custom'
										}
										onChange={(e) => {
											if (e.target.value !== 'custom') {
												setServiceTargetUrl(e.target.value);
											}
										}}
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none transition font-['Mukta',sans-serif] mb-2"
									>
										<option value="/book-pandit-in-dubai">Booking Form (/book-pandit-in-dubai)</option>
										<option value="https://wa.me/971504192987">WhatsApp Inquiry</option>
										<option value="/pooja-services-in-dubai">All Pooja Services (/pooja-services-in-dubai)</option>
										<option value="/griha-pravesh-and-vastu">Griha Pravesh Page</option>
										<option value="/wedding-ceremonies">Wedding Page</option>
										<option value="/shanti-havan-and-yagna">Shanti Havan Page</option>
										<option value="/satyanarayan-and-festivals">Satyanarayan Page</option>
										<option value="/rudrabhishek-and-planets">Rudrabhishek Page</option>
										<option value="/car-pooja-in-dubai-vehicle-pooja-in-dubai">Car Pooja Page</option>
										<option value="/pitru-paksha-pooja-dubai">Pitru Paksha Page</option>
										<option value="custom">-- Custom Link / URL --</option>
									</select>

									<input
										type="text"
										value={serviceTargetUrl}
										onChange={(e) => setServiceTargetUrl(e.target.value)}
										placeholder="/your-page or https://..."
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2 text-xs font-mono outline-none"
									/>
								</div>

								{/* Button Label */}
								<div>
									<label className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase text-[#2B1A14] mb-1.5 font-['Poppins',sans-serif]">
										<span>Button Label</span>
									</label>
									<input
										type="text"
										value={serviceButtonText}
										onChange={(e) => setServiceButtonText(e.target.value)}
										className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] text-[#2B1A14] rounded-xl px-4 py-2.5 text-sm outline-none transition"
									/>
								</div>
							</div>

							{/* Actions */}
							<div className="flex gap-3 pt-4 mt-3 border-t border-[#F2EBDD] shrink-0">
								<button
									type="button"
									onClick={() => setIsEditServiceOpen(false)}
									disabled={isSubmitting}
									className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 py-3 rounded-xl bg-[#8C2B1D] hover:bg-[#a33222] text-white text-sm sm:text-base font-bold transition disabled:opacity-50 shadow-md shadow-[#8C2B1D]/20 font-['Marcellus',serif] flex items-center justify-center gap-2"
								>
									{isSubmitting ? 'Saving...' : 'Save Changes'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* MODAL 9: DELETE POOJA SERVICE CONFIRMATION */}
			{/* ========================================================================= */}
			{isDeleteServiceOpen && selectedService && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
					onClick={(e) => {
						if (e.target === e.currentTarget && !isSubmitting) setIsDeleteServiceOpen(false);
					}}
				>
					<div className="bg-white border border-[#E5DCCF] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative my-auto">
						<div className="flex items-center gap-3 text-red-700 mb-4">
							<div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
								<Trash2 className="w-6 h-6 text-red-700" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-[#8C2B1D] font-['Marcellus',serif]">
									Remove Pooja Service Box?
								</h3>
								<p className="text-xs text-[#2B1A14]/70">This will remove this box from your website.</p>
							</div>
						</div>

						<div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E2D7C8] mb-6 space-y-1.5 text-sm">
							<p className="font-bold text-[#2B1A14]">
								Pooja: <span className="text-[#8C2B1D]">{selectedService.title}</span>
							</p>
							<p className="text-xs text-[#2B1A14]/70 italic line-clamp-2">
								{selectedService.description}
							</p>
						</div>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={() => setIsDeleteServiceOpen(false)}
								disabled={isSubmitting}
								className="flex-1 py-3 rounded-xl border border-[#E2D7C8] text-[#2B1A14] text-sm font-bold hover:bg-[#F2EBDD] transition font-['Poppins',sans-serif]"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleDeleteServiceSubmit}
								disabled={isSubmitting}
								className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-sm font-bold transition disabled:opacity-50 shadow-md font-['Poppins',sans-serif] flex items-center justify-center gap-2"
							>
								{isSubmitting ? 'Removing...' : 'Remove Box'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
