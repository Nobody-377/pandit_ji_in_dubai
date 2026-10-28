import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import localPhotoDb from '@/services/localPhotoDb';

const AdminAuthContext = createContext(null);

export const DEFAULT_ADMIN_EMAIL = 'vishaldevmorari487@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'shashtrivishal16914';
const ADMIN_SESSION_STORAGE_KEY = 'pj_admin_authorized_session';

/**
 * Retrieve the active administrator credentials synchronously from localStorage
 * with fallback to default credentials.
 */
export function getActiveCredentials() {
	try {
		const custom = localPhotoDb.getAdminCredentialsSync();
		if (custom && custom.email && custom.password) {
			return {
				email: custom.email.trim(),
				password: custom.password.trim(),
				isCustom: true,
				updatedAt: custom.updatedAt || null,
			};
		}
	} catch (err) {
		console.warn('Could not read custom admin credentials:', err);
	}

	return {
		email: DEFAULT_ADMIN_EMAIL,
		password: DEFAULT_ADMIN_PASSWORD,
		isCustom: false,
		updatedAt: null,
	};
}

export const AdminAuthProvider = ({ children }) => {
	const [adminUser, setAdminUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [credentialsInfo, setCredentialsInfo] = useState(() => getActiveCredentials());

	// Refresh credentials metadata
	const refreshCredentialsInfo = useCallback(() => {
		const creds = getActiveCredentials();
		setCredentialsInfo(creds);
		return creds;
	}, []);

	useEffect(() => {
		async function initSession() {
			try {
				const creds = refreshCredentialsInfo();

				// 1. Check for active local session
				const savedSession = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) || localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
				if (savedSession) {
					const parsed = JSON.parse(savedSession);
					if (
						parsed?.email?.toLowerCase() === creds.email.toLowerCase() ||
						parsed?.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()
					) {
						setAdminUser({
							...parsed,
							email: creds.email,
						});
						setLoading(false);
						return;
					}
				}
			} catch (_) {}

			// 2. If Supabase is configured, check Supabase session
			if (isSupabaseConfigured && supabase) {
				supabase.auth
					.getSession()
					.then(({ data: { session } }) => {
						if (session?.user) {
							setAdminUser(session.user);
						}
						setLoading(false);
					})
					.catch(() => setLoading(false));

				const {
					data: { subscription },
				} = supabase.auth.onAuthStateChange((_event, session) => {
					if (session?.user) {
						setAdminUser(session.user);
					}
				});

				return () => subscription?.unsubscribe();
			} else {
				setLoading(false);
			}
		}

		initSession();
	}, [refreshCredentialsInfo]);

	/**
	 * Log in with admin credentials.
	 */
	const login = async (email, password) => {
		const cleanEmail = (email || '').trim().toLowerCase();
		const cleanPassword = (password || '').trim();

		const creds = getActiveCredentials();
		const validEmail = creds.email.trim().toLowerCase();
		const validPassword = creds.password.trim();

		// Check against active credentials
		if (cleanEmail === validEmail && cleanPassword === validPassword) {
			const userObj = {
				id: 'admin_shastri_vishal',
				email: creds.email,
				role: 'superadmin',
				name: 'Shastri Vishal Devmorari',
				authenticatedAt: new Date().toISOString(),
			};

			// Save session
			try {
				sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(userObj));
				localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(userObj));
			} catch (_) {}

			setAdminUser(userObj);

			// If Supabase is configured, also sync with Supabase auth in the background
			if (isSupabaseConfigured && supabase) {
				supabase.auth
					.signInWithPassword({
						email: cleanEmail,
						password: cleanPassword,
					})
					.catch(() => {
						// Ignore if user not yet created in Supabase
					});
			}

			return userObj;
		}

		// Also allow factory default if custom was somehow corrupted
		if (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() && cleanPassword === DEFAULT_ADMIN_PASSWORD) {
			const userObj = {
				id: 'admin_shastri_vishal',
				email: DEFAULT_ADMIN_EMAIL,
				role: 'superadmin',
				name: 'Shastri Vishal Devmorari',
				authenticatedAt: new Date().toISOString(),
			};

			try {
				sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(userObj));
				localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(userObj));
			} catch (_) {}

			setAdminUser(userObj);
			return userObj;
		}

		// If Supabase has additional users registered
		if (isSupabaseConfigured && supabase) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: cleanEmail,
				password: cleanPassword,
			});

			if (!error && data?.user) {
				setAdminUser(data.user);
				return data.user;
			}
		}

		throw new Error('Invalid email or password. Access is restricted to authorized admin credentials.');
	};

	/**
	 * Change administrator login email and/or password.
	 * If currentPassword is provided, it verifies against active or factory password.
	 * If omitted by an already-logged-in admin, allows updating directly.
	 */
	const changeCredentials = async ({ currentPassword, newEmail, newPassword }) => {
		const creds = getActiveCredentials();
		const validPassword = creds.password.trim();

		// Verify current password if entered
		if (currentPassword && currentPassword.trim()) {
			const entered = currentPassword.trim();
			if (entered !== validPassword && entered !== DEFAULT_ADMIN_PASSWORD) {
				throw new Error('The current password you entered is incorrect.');
			}
		}

		// Prepare new values
		const finalEmail = newEmail && newEmail.trim() ? newEmail.trim().toLowerCase() : creds.email;
		const finalPassword = newPassword && newPassword.trim() ? newPassword.trim() : creds.password;

		// Validate email
		if (newEmail && newEmail.trim()) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(finalEmail)) {
				throw new Error('Please enter a valid email address.');
			}
		}

		// Validate password length
		if (newPassword && newPassword.trim()) {
			if (newPassword.trim().length < 6) {
				throw new Error('The new password must be at least 6 characters long.');
			}
		}

		// Save updated credentials
		const credsToSave = {
			email: finalEmail,
			password: finalPassword,
			updatedAt: new Date().toISOString(),
		};

		await localPhotoDb.saveAdminCredentials(credsToSave);

		// If Supabase is configured, attempt to sync user attributes
		if (isSupabaseConfigured && supabase) {
			try {
				const updates = {};
				if (newEmail && newEmail.trim()) updates.email = finalEmail;
				if (newPassword && newPassword.trim()) updates.password = finalPassword;
				if (Object.keys(updates).length > 0) {
					await supabase.auth.updateUser(updates);
				}
			} catch (cloudErr) {
				console.warn('Supabase cloud user update note:', cloudErr);
			}
		}

		// Update active session
		const updatedUser = {
			...(adminUser || {
				id: 'admin_shastri_vishal',
				role: 'superadmin',
				name: 'Shastri Vishal Devmorari',
			}),
			email: finalEmail,
			updatedAt: new Date().toISOString(),
		};

		try {
			sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
			localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
		} catch (_) {}

		setAdminUser(updatedUser);
		refreshCredentialsInfo();

		return { success: true, email: finalEmail, password: finalPassword };
	};

	/**
	 * Reset administrator credentials back to factory default.
	 */
	const resetCredentials = async (currentPassword) => {
		const creds = getActiveCredentials();
		const validPassword = creds.password.trim();

		if (currentPassword && currentPassword.trim()) {
			const entered = currentPassword.trim();
			if (entered !== validPassword && entered !== DEFAULT_ADMIN_PASSWORD) {
				throw new Error('The current password you entered is incorrect.');
			}
		}

		await localPhotoDb.resetAdminCredentials();

		const defaultUser = {
			id: 'admin_shastri_vishal',
			email: DEFAULT_ADMIN_EMAIL,
			role: 'superadmin',
			name: 'Shastri Vishal Devmorari',
			authenticatedAt: new Date().toISOString(),
		};

		try {
			sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(defaultUser));
			localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(defaultUser));
		} catch (_) {}

		setAdminUser(defaultUser);
		refreshCredentialsInfo();

		return { success: true, email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
	};

	/**
	 * Sign out.
	 */
	const logout = async () => {
		try {
			sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
			localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
		} catch (_) {}

		if (isSupabaseConfigured && supabase) {
			await supabase.auth.signOut().catch(() => {});
		}

		setAdminUser(null);
	};

	const value = useMemo(
		() => ({
			adminUser,
			isAdmin: Boolean(adminUser),
			isConfigured: isSupabaseConfigured,
			loading,
			credentialsInfo,
			login,
			changeCredentials,
			resetCredentials,
			refreshCredentialsInfo,
			logout,
		}),
		[adminUser, loading, credentialsInfo, refreshCredentialsInfo]
	);

	return (
		<AdminAuthContext.Provider value={value}>
			{children}
		</AdminAuthContext.Provider>
	);
};

export const useAdminAuth = () => {
	const context = useContext(AdminAuthContext);
	if (!context) {
		throw new Error('useAdminAuth must be used within an AdminAuthProvider');
	}
	return context;
};

export default AdminAuthContext;
