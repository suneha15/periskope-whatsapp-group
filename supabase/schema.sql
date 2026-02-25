-- WhatsApp groups table for Periskope assignment
-- Run this in Supabase Dashboard > SQL Editor

-- Table: groups
CREATE TABLE IF NOT EXISTS public.groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  project text NOT NULL,
  members_count integer NOT NULL DEFAULT 0,
  last_active timestamptz NOT NULL DEFAULT now(),
  labels text[] DEFAULT '{}',
  avatar_url text,
  unread_count integer DEFAULT 0,
  has_alert boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (optional; allow read for anon for assignment)
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Policy: allow public read for demo (replace with auth later if needed)
CREATE POLICY "Allow public read on groups"
  ON public.groups FOR SELECT
  USING (true);

-- Seed data (10–20 groups)
INSERT INTO public.groups (name, project, members_count, last_active, labels, unread_count, has_alert) VALUES
  ('Evoke <> Skope', 'Demo', 3, now() - interval '2 hours', ARRAY['High Value', 'Priority', 'Warm'], 10, false),
  ('Xindus Trade Network <> Periskope', 'Clients', 8, now() - interval '1 day', ARRAY['Pilot', '1+'], 17, false),
  ('TBC <> Periskope', 'Demo', 5, now() - interval '3 hours', ARRAY['Priority'], 8, true),
  ('Alpha <> Skope', 'Demo', 4, now() - interval '5 hours', ARRAY['Warm'], 0, false),
  ('Beta <> Periskope', 'Clients', 6, now() - interval '2 days', ARRAY['High Value', 'Pilot'], 3, false),
  ('Gamma <> Skope', 'Internal', 10, now() - interval '30 minutes', ARRAY['Priority', 'Warm'], 5, false),
  ('Delta <> Periskope', 'Clients', 7, now() - interval '1 day', ARRAY['Pilot'], 12, false),
  ('Epsilon <> Skope', 'Demo', 3, now() - interval '4 hours', ARRAY['Warm'], 0, true),
  ('Zeta <> Periskope', 'Internal', 9, now() - interval '3 days', ARRAY['High Value'], 2, false),
  ('Eta <> Skope', 'Clients', 5, now() - interval '6 hours', ARRAY['Priority', '1+'], 6, false),
  ('Theta <> Periskope', 'Demo', 4, now() - interval '12 hours', ARRAY['Pilot', 'Warm'], 1, false),
  ('Iota <> Skope', 'Clients', 8, now() - interval '1 hour', ARRAY['High Value'], 15, false),
  ('Kappa <> Periskope', 'Internal', 6, now() - interval '2 days', ARRAY['1+'], 0, false),
  ('Lambda <> Skope', 'Demo', 5, now() - interval '8 hours', ARRAY['Priority'], 4, false),
  ('Mu <> Periskope', 'Clients', 7, now() - interval '4 hours', ARRAY['Warm', 'Pilot'], 9, false),
  ('Nu <> Skope', 'Demo', 3, now() - interval '1 day', ARRAY['High Value', '1+'], 0, true),
  ('Xi <> Periskope', 'Internal', 11, now() - interval '30 minutes', ARRAY['Priority'], 7, false),
  ('Omicron <> Skope', 'Clients', 4, now() - interval '5 days', ARRAY['Pilot'], 2, false);
