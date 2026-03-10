CREATE POLICY "Teachers can delete quizzes"
ON public.quiz_questions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'teacher'::app_role));