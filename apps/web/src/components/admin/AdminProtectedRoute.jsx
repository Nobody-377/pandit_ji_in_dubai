import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
	const { isAdmin, loading } = useAdminAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="min-h-screen bg-[#1F1917] flex flex-col items-center justify-center text-[#E5B361]">
				<Loader2 className="w-10 h-10 animate-spin mb-4" />
				<p className="text-sm font-medium tracking-wider uppercase">Verifying Admin Access...</p>
			</div>
		);
	}

	// Strictly require admin authentication
	if (!isAdmin) {
		return <Navigate to="/admin-portal/login" state={{ from: location }} replace />;
	}

	return children;
}
