-- =========================================================================
-- SUPABASE SCHEMA FOR PANDITJI IN DUBAI ADMIN PHOTO MANAGEMENT
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. Create table for site photos
CREATE TABLE IF NOT EXISTS public.site_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id TEXT NOT NULL,
    section_id TEXT NOT NULL,
    title TEXT DEFAULT '',
    alt_text TEXT DEFAULT '',
    image_url TEXT NOT NULL,
    storage_path TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant querying by page & section
CREATE INDEX IF NOT EXISTS idx_site_photos_page_section 
ON public.site_photos(page_id, section_id, sort_order ASC);

-- 2. Enable Row-Level Security (RLS)
ALTER TABLE public.site_photos ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone (public) can read active site photos
DROP POLICY IF EXISTS "Public can view active site photos" ON public.site_photos;
CREATE POLICY "Public can view active site photos"
ON public.site_photos
FOR SELECT
USING (true);

-- 4. Policy: Authenticated admin users can INSERT, UPDATE, DELETE
DROP POLICY IF EXISTS "Admin users can insert photos" ON public.site_photos;
CREATE POLICY "Admin users can insert photos"
ON public.site_photos
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin users can update photos" ON public.site_photos;
CREATE POLICY "Admin users can update photos"
ON public.site_photos
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admin users can delete photos" ON public.site_photos;
CREATE POLICY "Admin users can delete photos"
ON public.site_photos
FOR DELETE
TO authenticated
USING (true);

-- 5. Create the Storage Bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-photos', 'site-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies: Public read, Authenticated write/delete
DROP POLICY IF EXISTS "Public can read site photos" ON storage.objects;
CREATE POLICY "Public can read site photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-photos');

DROP POLICY IF EXISTS "Authenticated admins can upload photos" ON storage.objects;
CREATE POLICY "Authenticated admins can upload photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-photos');

DROP POLICY IF EXISTS "Authenticated admins can update photos" ON storage.objects;
CREATE POLICY "Authenticated admins can update photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'site-photos');

DROP POLICY IF EXISTS "Authenticated admins can delete photos" ON storage.objects;
CREATE POLICY "Authenticated admins can delete photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'site-photos');

-- =========================================================================
-- 6. Pop-Up Notification Settings
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.popup_settings (
    id TEXT PRIMARY KEY DEFAULT 'main_popup',
    is_enabled BOOLEAN DEFAULT TRUE,
    image_url TEXT NOT NULL DEFAULT '/images/pandit_ji_portrait.webp',
    storage_path TEXT DEFAULT '',
    target_url TEXT NOT NULL DEFAULT '/book-pandit-in-dubai',
    title TEXT DEFAULT 'Book Your Sacred Vedic Pooja in Dubai',
    delay_seconds INTEGER DEFAULT 3,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial row if not exists
INSERT INTO public.popup_settings (id, is_enabled, image_url, target_url, title, delay_seconds)
VALUES (
    'main_popup',
    TRUE,
    '/images/pandit_ji_portrait.webp',
    '/book-pandit-in-dubai',
    'Book Your Sacred Vedic Pooja in Dubai',
    3
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for popup_settings
ALTER TABLE public.popup_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active popup settings
DROP POLICY IF EXISTS "Public can view popup settings" ON public.popup_settings;
CREATE POLICY "Public can view popup settings"
ON public.popup_settings
FOR SELECT
USING (true);

-- Policy: Authenticated admins can modify popup settings
DROP POLICY IF EXISTS "Admin users can insert popup settings" ON public.popup_settings;
CREATE POLICY "Admin users can insert popup settings"
ON public.popup_settings
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin users can update popup settings" ON public.popup_settings;
CREATE POLICY "Admin users can update popup settings"
ON public.popup_settings
FOR UPDATE
TO authenticated
USING (true);

-- =========================================================================
-- 7. Customer Reviews & Photos
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.customer_reviews (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    location TEXT DEFAULT 'Dubai, UAE',
    ceremony TEXT NOT NULL DEFAULT 'Vedic Pooja',
    rating INTEGER DEFAULT 5,
    comment TEXT NOT NULL,
    image_url TEXT DEFAULT '',
    date_display TEXT DEFAULT '',
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for customer_reviews
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved customer reviews
DROP POLICY IF EXISTS "Public can view approved customer reviews" ON public.customer_reviews;
CREATE POLICY "Public can view approved customer reviews"
ON public.customer_reviews
FOR SELECT
USING (true);

-- Policy: Anyone can submit a review
DROP POLICY IF EXISTS "Anyone can insert customer review" ON public.customer_reviews;
CREATE POLICY "Anyone can insert customer review"
ON public.customer_reviews
FOR INSERT
WITH CHECK (true);

-- Policy: Admins can update and delete reviews
DROP POLICY IF EXISTS "Admin users can update customer reviews" ON public.customer_reviews;
CREATE POLICY "Admin users can update customer reviews"
ON public.customer_reviews
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admin users can delete customer reviews" ON public.customer_reviews;
CREATE POLICY "Admin users can delete customer reviews"
ON public.customer_reviews
FOR DELETE
TO authenticated
USING (true);

-- =========================================================================
-- 8. Pooja Services & Dynamic Offerings
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.pooja_services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    badge TEXT DEFAULT '',
    description TEXT NOT NULL,
    image_url TEXT DEFAULT '',
    target_url TEXT DEFAULT '/book-pandit-in-dubai',
    button_text TEXT DEFAULT 'Book This Pooja',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for pooja_services
ALTER TABLE public.pooja_services ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read active pooja services
DROP POLICY IF EXISTS "Public can view active pooja services" ON public.pooja_services;
CREATE POLICY "Public can view active pooja services"
ON public.pooja_services
FOR SELECT
USING (true);

-- Policy: Authenticated admins can insert, update, delete pooja services
DROP POLICY IF EXISTS "Admin users can insert pooja services" ON public.pooja_services;
CREATE POLICY "Admin users can insert pooja services"
ON public.pooja_services
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin users can update pooja services" ON public.pooja_services;
CREATE POLICY "Admin users can update pooja services"
ON public.pooja_services
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admin users can delete pooja services" ON public.pooja_services;
CREATE POLICY "Admin users can delete pooja services"
ON public.pooja_services
FOR DELETE
TO authenticated
USING (true);




