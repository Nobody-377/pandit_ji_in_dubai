import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
	const { login } = useAdminAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const from = location.state?.from?.pathname || '/admin-portal';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!email || !password) {
			setError('Please enter your email and password.');
			return;
		}

		try {
			setLoading(true);
			await login(email, password);
			navigate(from, { replace: true });
		} catch (err) {
			console.error('Login error:', err);
			setError(err?.message || 'Invalid credentials. Access is restricted to authorized personnel.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-['Mukta',sans-serif]">
			{/* Decorative warm ambient shapes */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#F2EBDD] to-transparent rounded-full blur-2xl pointer-events-none opacity-80" />
			<div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E5B361]/15 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute -top-20 -left-20 w-80 h-80 bg-[#8C2B1D]/10 rounded-full blur-3xl pointer-events-none" />

			<div className="w-full max-w-lg relative z-10">
				{/* Brand Header */}
				<div className="text-center mb-8">
					<div className="inline-block mb-3">
						<img
							src="/images/pandit_ji_logo.webp"
							alt="Pandit Ji in Dubai"
							className="h-28 w-auto mx-auto object-contain drop-shadow-sm"
						/>
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-[#8C2B1D] font-['Marcellus',serif] mb-1.5">
						Pandit Ji in Dubai
					</h1>
					<p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#C4923C] font-bold font-['Poppins',sans-serif]">
						Administrative Control Portal
					</p>
				</div>

				{/* Login Card */}
				<div className="bg-[#FFFFFF] border border-[#E8DFD3] rounded-3xl shadow-xl shadow-[#8C2B1D]/5 p-7 sm:p-10">
					<div className="flex items-center gap-2.5 mb-7 text-sm text-[#2B1A14]/80 pb-3.5 border-b border-[#F2EBDD] font-['Poppins',sans-serif]">
						<ShieldCheck className="w-5 h-5 text-[#8C2B1D]" />
						<span className="font-semibold tracking-wide">Authorized Personnel Access Only</span>
					</div>

					{error && (
						<div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm flex items-start gap-3 font-['Mukta',sans-serif]">
							<AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
							<span className="font-medium">{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
						<div>
							<label className="block text-sm font-bold uppercase tracking-wider text-[#2B1A14] mb-2 font-['Poppins',sans-serif]">
								Email
							</label>
							<div className="relative">
								<Mail className="w-5 h-5 text-[#2B1A14]/40 absolute left-4 top-1/2 -translate-y-1/2" />
								<input
									type="email"
									name="custom_admin_identity"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									required
									autoComplete="off"
									className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] focus:bg-white text-[#2B1A14] rounded-xl pl-12 pr-4 py-3 text-base outline-none transition placeholder-[#2B1A14]/40 font-['Mukta',sans-serif]"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-bold uppercase tracking-wider text-[#2B1A14] mb-2 font-['Poppins',sans-serif]">
								Password
							</label>
							<div className="relative">
								<Lock className="w-5 h-5 text-[#2B1A14]/40 absolute left-4 top-1/2 -translate-y-1/2" />
								<input
									type="password"
									name="custom_admin_token"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter your password"
									required
									autoComplete="new-password"
									className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#8C2B1D] focus:bg-white text-[#2B1A14] rounded-xl pl-12 pr-4 py-3 text-base outline-none transition placeholder-[#2B1A14]/40 font-['Mukta',sans-serif]"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full mt-4 py-3.5 px-5 bg-[#8C2B1D] hover:bg-[#a33222] text-[#FAF6F0] font-bold rounded-xl transition duration-200 shadow-md shadow-[#8C2B1D]/20 flex items-center justify-center gap-2.5 text-lg font-['Marcellus',serif] disabled:opacity-50"
						>
							{loading ? (
								<span>Authenticating...</span>
							) : (
								<>
									<span>Sign In to Admin Portal</span>
									<ArrowRight className="w-5 h-5" />
								</>
							)}
						</button>
					</form>
				</div>

				<p className="text-center text-sm text-[#2B1A14]/60 mt-7 font-['Poppins',sans-serif]">
					This is a private administrative system. All activities are monitored.
				</p>
			</div>
		</div>
	);
}
