# Pandit Ji in Dubai (panditjiindubai.com)

Official web platform for **Pandit Ji in Dubai** ([panditjiindubai.com](https://panditjiindubai.com)) — providing traditional Vedic pooja ceremonies, Griha Pravesh, Havan & Yagna, wedding ceremonies, and astrological consultations across Dubai and the UAE.

---

## 🌟 Key Features

* **Authentic Vedic Pooja Catalog**: Detailed ritual descriptions, samagri preparation, muhurat scheduling, and ceremony steps.
* **Interactive Media Gallery**: Responsive multi-item carousel (powered by Embla Carousel) and high-resolution fullscreen lightbox modal supporting both optimized images (`.webp`) and streaming videos (`.mp4`).
* **Google Ads Conversion Tracking**: Fully audited event dispatch on call CTAs and WhatsApp buttons targeting Google Tag `AW-18533461761` with conversion label `G5X7CPXz1bAdEIHeuIVF` and canonical phone `+971504192987`.
* **SEO & Brand Verification**: Google-compliant multi-resolution favicon suite (`16x16`, `32x32`, `48x48`, `96x96`, `192x192`, `512x512`, `apple-touch-icon.png`), Web Manifest, and Schema.org `Organization` structured data.
* **Dual-Layer Persistence**: Hostinger LiteSpeed PHP JSON backend (`/api/photos.php`, `/api/services.php`) combined with client-side `localStorage` & `IndexedDB` caching.
* **Zero-Lag Mobile Experience**: 100% responsive layout optimized for mobile browsers, Instagram/WhatsApp webviews, and desktop viewports.

---

## 📁 Repository Structure

```text
panditjiindubai/
├── apps/
│   ├── web/                     # React + Vite web application
│   │   ├── public/              # Static public assets
│   │   │   ├── api/             # Hostinger PHP persistence backend
│   │   │   ├── images/          # Self-hosted ceremony photos (.webp) & videos (.mp4)
│   │   │   ├── favicon.ico      # Multi-resolution ICO (16, 32, 48px)
│   │   │   ├── favicon-48x48.png # Google Search crawler baseline icon
│   │   │   ├── site.webmanifest # PWA and Android manifest
│   │   │   └── .htaccess        # LiteSpeed routing & SPA rewrite rules
│   │   ├── src/                 # React source code
│   │   │   ├── components/      # UI elements (GridGallery, Navigation, Popups)
│   │   │   ├── pages/           # Landing pages and ceremony service pages
│   │   │   ├── services/        # Tracking, storage, and photo service modules
│   │   │   └── hooks/           # Custom React hooks (useSectionPhotos, etc.)
│   │   └── package.json
│   └── pocketbase/              # Optional PocketBase service configuration
├── dist/                        # Production build output
├── hostinger_public_html.zip    # Ready-to-deploy archive for Hostinger public_html
├── package.json                 # Monorepo configuration
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.x or v20.x (v22.x supported)
* **npm**: v9.x or higher

### Installation
Clone the repository and install all dependencies across the monorepo:

```bash
git clone https://github.com/Nobody-377/pandit_ji_in_dubai.git
cd panditjiindubai
npm run setup
```

### Development
Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build
Compile the optimized production bundle:

```bash
npm run build
```

This compiles the frontend directly to `dist/apps/web/`.

### Linting & Code Quality
Run ESLint across the codebase:

```bash
npm run lint
```

---

## 📦 Deployment to Hostinger

The repository maintains an automated deployment archive: **`hostinger_public_html.zip`**.

### Steps to Deploy:
1. **Build and Package**:
   Running a production build copies all compiled assets, static icons, and PHP APIs into `dist/apps/web/`, which is compressed into `hostinger_public_html.zip`.
2. **Upload to Hostinger File Manager**:
   * Log in to **Hostinger Dashboard** &rarr; **Websites** &rarr; **Manage** &rarr; **File Manager**.
   * Navigate directly into the **`public_html`** root directory.
   * Upload `hostinger_public_html.zip`.
3. **Extract Directly into `public_html`**:
   * Right-click `hostinger_public_html.zip` &rarr; click **Extract**.
   * Destination path: **`/public_html`** (or a single dot `.`).
   * *Ensure no extra nested folders like `files/public_html` are created.*
   * Delete the `.zip` file after extraction.
4. **Purge Browser Cache**:
   * Visit [https://panditjiindubai.com](https://panditjiindubai.com) and press `Ctrl + F5` (or test in Incognito).

---

## 🔒 Critical Invariants & Rules

1. **Google Ads Tracking Integrity**:
   * Tag ID: `AW-18533461761`
   * Phone Call Conversion Label: `G5X7CPXz1bAdEIHeuIVF`
   * Business Phone Target: `+971504192987`
   * WhatsApp Destination: `https://wa.me/971504192987` (must remain clean without query parameter clutter).
   * All 22 automated tracking tests must pass before deploying.
2. **Media Optimization**:
   * Photos must be converted to WebP (`quality=85`, max 1600px).
   * Videos must be encoded with H.264/AAC at 720p/1080p with `-movflags +faststart` for instant mobile streaming.
   * Always include an extracted WebP poster frame for videos in the gallery.
3. **SEO & Icons**:
   * Do not delete `favicon-48x48.png` or `favicon.ico` from `public/`; they are strictly required by Google's `Google-Favicon` crawler.

---

## 📄 License

Proprietary. All rights reserved by Pandit Ji in Dubai.
