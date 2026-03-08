
-- Storage bucket for group resources
INSERT INTO storage.buckets (id, name, public) VALUES ('group-resources', 'group-resources', true);

-- Group resources table
CREATE TABLE public.group_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  file_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.group_resources ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view group resources
CREATE POLICY "Authenticated users can view group resources"
  ON public.group_resources FOR SELECT
  TO authenticated
  USING (true);

-- Members can upload resources
CREATE POLICY "Group members can upload resources"
  ON public.group_resources FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uploaded_by
    AND EXISTS (
      SELECT 1 FROM public.study_group_members
      WHERE group_id = group_resources.group_id AND user_id = auth.uid()
    )
  );

-- Uploaders can delete their own resources
CREATE POLICY "Users can delete their own resources"
  ON public.group_resources FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Storage policies for group-resources bucket
CREATE POLICY "Authenticated users can upload to group-resources"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'group-resources');

CREATE POLICY "Anyone can view group-resources"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'group-resources');

CREATE POLICY "Users can delete own group-resources"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'group-resources');

-- Group chat messages table
CREATE TABLE public.group_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.group_messages ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view messages
CREATE POLICY "Authenticated users can view group messages"
  ON public.group_messages FOR SELECT
  TO authenticated
  USING (true);

-- Group members can send messages
CREATE POLICY "Group members can send messages"
  ON public.group_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.study_group_members
      WHERE group_id = group_messages.group_id AND user_id = auth.uid()
    )
  );

-- Enable realtime for group messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_messages;
