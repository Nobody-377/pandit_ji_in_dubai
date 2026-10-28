import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const AdminAuthContext = createContext(null);

const MASTER_ADMIN_EMAIL = 'vishaldevmorari487@gmail.com';
const MASTER_ADMIN_PASSWORD = 'shashtrivishal16914';
const ADMIN_SESSION_STORAGE_KEY = 'pj_admin_authorized_session';

export const AdminAuthProvider = ({ children }) => {
	const [adminUser, setAdminUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// 1. Check for active local session
		try {
			const savedSession = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) || localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
			if (savedSession) {
				const parsed = JSON.parse(savedSession);
				if (parsed?.email?.toLowerCase() === MASTER_ADMIN_EMAIL) {
					setAdminUser(parsed);
					setLoading(false);
					return;
				}
			}
		} catch (_) {}

		// 2. If Supabase is configured, check Supabase session
		if (isSupabaseConfigured && supabase) {
			supabase.auth.getSession().then(({ data: { session } }) => {
				if (session?.user) {
					setAdminUser(session.user);
				}
				setLoading(false);
			}).catch(() => setLoading(false));

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
	}, []);

	const login = async (email, password) => {
		const cleanEmail = (email || '').trim().toLowerCase();
		const cleanPassword = (password || '').trim();

		// Check against designated Admin Credentials
		if (cleanEmail === MASTER_ADMIN_EMAIL && cleanPassword === MASTER_ADMIN_PASSWORD) {
			const userObj = {
				id: 'admin_shastri_vishal',
				email: 'Vishaldevmorari487@gmail.com',
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
				supabase.auth.signInWithPassword({
					email: cleanEmail,
					password: cleanPassword,
				}).catch(() => {
					// Ignore if user not yet created in Supabase
				});
			}

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
			login,
			logout,
		}),
		[adminUser, loading]
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
