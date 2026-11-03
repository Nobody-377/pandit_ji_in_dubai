import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { initPhoneCallTracking } from '@/services/trackingService';
import '@/index.css';

// Initialize safe, delegated phone call CTA tracking (AW-18533461761)
initPhoneCallTracking();

ReactDOM.createRoot(document.getElementById('root')).render(
	<App />
);
