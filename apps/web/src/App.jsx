import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ScrollToTop from '@/components/ScrollToTop';
import CustomSiteCode from '@/components/builder/CustomSiteCode';
import CookieConsent from '@/components/builder/CookieConsent';
import WhatsAppBubble from '@/components/builder/WhatsAppBubble';
import PhoneBubble from '@/components/builder/PhoneBubble';
import NotificationPopup from '@/components/builder/NotificationPopup';
import { EcommerceCartProvider } from '@/components/builder/blocks/EcommerceCart';
import EcommerceCheckoutSuccess from '@/components/builder/blocks/EcommerceCheckoutSuccess';
import HomePage_system_home from "@/pages/builder/home/HomePage";
import PitruPakshaPoojaDubaiPage_system_zBN4fQ from "@/pages/builder/pitru-paksha-pooja-dubai/PitruPakshaPoojaDubaiPage";
import CarPoojaInDubaiVehiclePoojaInDubaiPage_system_zBo0UF from "@/pages/builder/car-pooja-in-dubai-vehicle-pooja-in-dubai/CarPoojaInDubaiVehiclePoojaInDubaiPage";
import WeddingCeremoniesPage_system_zLiR5v from "@/pages/builder/wedding-ceremonies/WeddingCeremoniesPage";
import BookPanditInDubaiPage_system_zXyBpB from "@/pages/builder/book-pandit-in-dubai/BookPanditInDubaiPage";
import ShantiHavanAndYagnaPage_system_zaW86l from "@/pages/builder/shanti-havan-and-yagna/ShantiHavanAndYagnaPage";
import AuthenticVedicPoojaDubaiPage_system_zcfa3j from "@/pages/builder/authentic-vedic-pooja-dubai/AuthenticVedicPoojaDubaiPage";
import RudrabhishekAndPlanetsPage_system_zggWVH from "@/pages/builder/rudrabhishek-and-planets/RudrabhishekAndPlanetsPage";
import SatyanarayanAndFestivalsPage_system_zma8j from "@/pages/builder/satyanarayan-and-festivals/SatyanarayanAndFestivalsPage";
import PoojaServicesInDubaiPage_system_zz4Hbb from "@/pages/builder/pooja-services-in-dubai/PoojaServicesInDubaiPage";
import GrihaPraveshAndVastuPage_system_zzyXkY from "@/pages/builder/griha-pravesh-and-vastu/GrihaPraveshAndVastuPage";
import DynamicProductPage_system from "@/pages/builder/dynamic-product/DynamicProductPage";
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import '@/components/builder/styles/global.css';

function App() {
	return (
		<TooltipProvider>
			<AdminAuthProvider>
				<EcommerceCartProvider>
					<Router>
						<ScrollToTop />
						<CustomSiteCode />
						<CookieConsent />
						<PhoneBubble />
						<WhatsAppBubble />
						<NotificationPopup />
						<EcommerceCheckoutSuccess />
						<Routes>
						{/* Private Admin Portal Routes (placed before dynamic slug) */}
						<Route path={"/admin-portal/login"} element={<AdminLogin />} />
						<Route
							path={"/admin-portal/*"}
							element={
								<AdminProtectedRoute>
									<AdminDashboard />
								</AdminProtectedRoute>
							}
						/>

						<Route path={"/"} element={<HomePage_system_home />} />
						<Route path={"/pitru-paksha-pooja-dubai"} element={<PitruPakshaPoojaDubaiPage_system_zBN4fQ />} />
						<Route path={"/car-pooja-in-dubai-vehicle-pooja-in-dubai"} element={<CarPoojaInDubaiVehiclePoojaInDubaiPage_system_zBo0UF />} />
						<Route path={"/wedding-ceremonies"} element={<WeddingCeremoniesPage_system_zLiR5v />} />
						<Route path={"/book-pandit-in-dubai"} element={<BookPanditInDubaiPage_system_zXyBpB />} />
						<Route path={"/shanti-havan-and-yagna"} element={<ShantiHavanAndYagnaPage_system_zaW86l />} />
						<Route path={"/authentic-vedic-pooja-dubai"} element={<AuthenticVedicPoojaDubaiPage_system_zcfa3j />} />
						<Route path={"/rudrabhishek-and-planets"} element={<RudrabhishekAndPlanetsPage_system_zggWVH />} />
						<Route path={"/satyanarayan-and-festivals"} element={<SatyanarayanAndFestivalsPage_system_zma8j />} />
						<Route path={"/pooja-services-in-dubai"} element={<PoojaServicesInDubaiPage_system_zz4Hbb />} />
						<Route path={"/griha-pravesh-and-vastu"} element={<GrihaPraveshAndVastuPage_system_zzyXkY />} />
						<Route path={"/:slug"} element={<DynamicProductPage_system />} />
						</Routes>
					</Router>
				</EcommerceCartProvider>
			</AdminAuthProvider>
			<Toaster />
		</TooltipProvider>
	);
}

export default App;
