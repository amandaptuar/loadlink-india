-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('company', 'driver', 'admin')),
  company_name TEXT,
  gst_number TEXT,
  license_number TEXT,
  truck_number TEXT,
  truck_type TEXT,
  state TEXT,
  city TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create loads table
CREATE TABLE public.loads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  driver_id UUID REFERENCES auth.users ON DELETE SET NULL,
  pickup_city TEXT NOT NULL,
  pickup_state TEXT NOT NULL,
  drop_city TEXT NOT NULL,
  drop_state TEXT NOT NULL,
  material TEXT NOT NULL,
  weight NUMERIC NOT NULL,
  truck_type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  pickup_date DATE,
  status TEXT DEFAULT 'posted' CHECK (status IN ('posted', 'accepted', 'picked', 'in_transit', 'delivered', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for loads
CREATE POLICY "Loads are viewable by everyone." ON public.loads
  FOR SELECT USING (true);

CREATE POLICY "Companies can insert loads." ON public.loads
  FOR INSERT WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Companies can update their own loads." ON public.loads
  FOR UPDATE USING (auth.uid() = company_id);

CREATE POLICY "Drivers can update status of loads they accepted." ON public.loads
  FOR UPDATE USING (auth.uid() = driver_id OR (status = 'posted' AND auth.uid() IS NOT NULL));
