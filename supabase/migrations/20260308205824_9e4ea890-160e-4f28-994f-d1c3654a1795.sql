
-- Study groups table
CREATE TABLE public.study_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  max_members INTEGER NOT NULL DEFAULT 10,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Study group members table
CREATE TABLE public.study_group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Enable RLS
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;

-- Study groups policies: anyone authenticated can view, students can create
CREATE POLICY "Authenticated users can view study groups"
  ON public.study_groups FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Students can create study groups"
  ON public.study_groups FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Creators can delete their groups"
  ON public.study_groups FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

-- Members policies
CREATE POLICY "Authenticated users can view group members"
  ON public.study_group_members FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Students can join groups"
  ON public.study_group_members FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Users can leave groups"
  ON public.study_group_members FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Seed some initial groups
INSERT INTO public.study_groups (name, subject, description, max_members, created_by)
SELECT 
  name, subject, description, max_members,
  (SELECT id FROM auth.users LIMIT 1)
FROM (VALUES
  ('Calculus Masters', 'Mathematics', 'Deep dive into calculus, limits, and integrals', 8),
  ('Physics Lab', 'Physics', 'Discuss mechanics, thermodynamics and optics problems', 10),
  ('English Literature Circle', 'English', 'Weekly discussions on classic and modern literature', 6),
  ('Chemistry Study Buddies', 'Chemistry', 'Organic and inorganic chemistry problem solving', 8),
  ('Biology Explorers', 'Biology', 'Cell biology, genetics, and ecology discussions', 10),
  ('Programming Fundamentals', 'Computer Science', 'Learn Python, algorithms and data structures together', 12),
  ('History Discussion Group', 'History', 'World history debates and essay preparation', 6),
  ('Creative Writing Workshop', 'English', 'Practice creative writing and get peer feedback', 8)
) AS t(name, subject, description, max_members)
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1);
