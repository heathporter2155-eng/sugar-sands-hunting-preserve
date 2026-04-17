-- Sugar Sands Hunting Preserve - Database Schema
-- Run this in Supabase SQL Editor after creating the project

-- Members table
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'FL',
  zip TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  join_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waiting list
CREATE TABLE waiting_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  state TEXT DEFAULT 'FL',
  hunting_experience TEXT,
  referred_by TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'declined')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery photos
CREATE TABLE gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uploaded_by UUID REFERENCES members(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  title TEXT,
  description TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('property', 'wildlife', 'hunting', 'stewardship', 'general')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES members(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Members can view other members (authenticated only)
CREATE POLICY "Members can view all members"
  ON members FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert/update/delete members
CREATE POLICY "Admins can manage members"
  ON members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Anyone can insert to waiting list (public form)
CREATE POLICY "Anyone can submit to waiting list"
  ON waiting_list FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view/manage waiting list
CREATE POLICY "Admins can manage waiting list"
  ON waiting_list FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Anyone can view approved gallery photos
CREATE POLICY "Anyone can view approved photos"
  ON gallery_photos FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Members can upload photos (pending approval)
CREATE POLICY "Members can upload photos"
  ON gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM members WHERE user_id = auth.uid()
    )
  );

-- Admins can manage all photos
CREATE POLICY "Admins can manage photos"
  ON gallery_photos FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Storage bucket for gallery photos
-- Run in Supabase Dashboard > Storage > Create bucket: "gallery"
-- Set public access for approved photos

-- Insert admin member (run after Heath creates his account)
-- INSERT INTO members (user_id, first_name, last_name, email, phone, role)
-- VALUES ('<heath-user-id>', 'Heath', 'Porter', 'heath@coastalcontractorsofnwfl.com', '850-978-2155', 'admin');
