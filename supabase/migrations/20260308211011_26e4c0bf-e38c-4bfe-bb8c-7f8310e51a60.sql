
-- Textbooks table
CREATE TABLE public.textbooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  subject TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  description TEXT,
  description_bn TEXT,
  cover_emoji TEXT DEFAULT '📘',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chapters table
CREATE TABLE public.chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  textbook_id UUID REFERENCES public.textbooks(id) ON DELETE CASCADE NOT NULL,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  explanation TEXT,
  explanation_bn TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quiz questions table
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  question_bn TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  options_bn JSONB NOT NULL DEFAULT '[]',
  correct_answer INTEGER NOT NULL DEFAULT 0,
  explanation TEXT,
  explanation_bn TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.textbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Public read access (free for all)
CREATE POLICY "Anyone can view textbooks" ON public.textbooks FOR SELECT USING (true);
CREATE POLICY "Anyone can view chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions FOR SELECT USING (true);

-- Only admins/teachers can manage content
CREATE POLICY "Teachers can manage textbooks" ON public.textbooks FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can update textbooks" ON public.textbooks FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can manage chapters" ON public.chapters FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can update chapters" ON public.chapters FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can manage quizzes" ON public.quiz_questions FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can update quizzes" ON public.quiz_questions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
