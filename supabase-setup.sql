-- Sugar Sands Hunting Preserve - Complete Database Setup
-- Paste this entire block into Supabase SQL Editor and click "Run"

-- 1. Members table
CREATE TABLE IF NOT EXISTS members (
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

-- 2. Waiting list table
CREATE TABLE IF NOT EXISTS waiting_list (
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

-- 3. Gallery photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
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

-- 4. Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Members: authenticated users can view all members
CREATE POLICY "Authenticated users can view members"
  ON members FOR SELECT
  TO authenticated
  USING (true);

-- Members: admins can do everything
CREATE POLICY "Admins can manage members"
  ON members FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Waiting list: anyone can submit
CREATE POLICY "Public can submit to waiting list"
  ON waiting_list FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Waiting list: admins can view and manage
CREATE POLICY "Admins can manage waiting list"
  ON waiting_list FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update waiting list"
  ON waiting_list FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete waiting list"
  ON waiting_list FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Gallery: anyone can view approved photos
CREATE POLICY "Public can view approved photos"
  ON gallery_photos FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Gallery: members can upload (pending approval)
CREATE POLICY "Members can upload photos"
  ON gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid())
  );

-- Gallery: admins can manage all photos
CREATE POLICY "Admins can manage all photos"
  ON gallery_photos FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM members WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 6. Insert initial members (without user_id for now - will link after they create accounts)
INSERT INTO members (first_name, last_name, email, phone, address, city, state, zip, role) VALUES
  ('Heath', 'Porter', 'heathporter2155@gmail.com', '850-978-2155', '464 Phillips Dr', 'Freeport', 'FL', '32439', 'admin'),
  ('Heath C.', 'Porter', 'Heathporter0077@gmail.com', '850-585-0077', '7298 Hwy 20', 'Freeport', 'FL', '32439', 'member'),
  ('John', 'Skinner', 'john@pcbsell.com', '850-543-5763', '30 Fox Lake Dr', 'Santa Rosa Beach', 'FL', '32459', 'member'),
  ('Phillip', 'Poundstone', 'Phillip.poundstone@gmail.com', '850-832-8715', '16 Medley St', 'Inlet Beach', 'FL', '32461', 'member'),
  ('Austin', 'Ellington', 'Austin.Ellington@Si-bone.com', '770-298-8386', '114 West Georgie St', 'Santa Rosa Beach', 'FL', '32459', 'member');
