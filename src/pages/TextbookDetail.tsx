import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, XCircle, ChevronDown, ChevronUp, HelpCircle, Sparkles, RotateCcw, Loader2, Wand2, Brain } from 'lucide-react';
import { toast } from 'sonner';

export default function TextbookDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { user, role } = useAuth();
  const queryClient = useQueryClient();
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [generatingContent, setGeneratingContent] = useState<string | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState<string | null>(null);

  const { data: textbook } = useQuery({
    queryKey: ['textbook', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('textbooks').select('*').eq('id', id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: chapters = [] } = useQuery({
    queryKey: ['chapters', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('textbook_id', id!)
        .order('chapter_number', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: quizQuestions = [] } = useQuery({
    queryKey: ['quiz', quizMode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('chapter_id', quizMode!);
      if (error) throw error;
      return data;
    },
    enabled: !!quizMode,
  });

  const handleAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => setSubmitted(true);

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted
    ? quizQuestions.filter(q => answers[q.id] === q.correct_answer).length
    : 0;

  const generateContent = async (chapter: typeof chapters[0]) => {
    if (!textbook) return;
    setGeneratingContent(chapter.id);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          type: 'explanation',
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          chapterNumber: chapter.chapter_number,
          textbookTitle: textbook.title,
          subject: textbook.subject,
          classLevel: textbook.class_level,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(language === 'bn' ? 'ব্যাখ্যা তৈরি হয়েছে!' : 'Explanation generated!');
      queryClient.invalidateQueries({ queryKey: ['chapters', id] });
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate content');
    } finally {
      setGeneratingContent(null);
    }
  };

  const generateQuiz = async (chapter: typeof chapters[0]) => {
    if (!textbook) return;
    setGeneratingQuiz(chapter.id);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          type: 'quiz',
          chapterId: chapter.id,
          chapterTitle: chapter.title,
          chapterNumber: chapter.chapter_number,
          textbookTitle: textbook.title,
          subject: textbook.subject,
          classLevel: textbook.class_level,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(language === 'bn' ? 'কুইজ তৈরি হয়েছে!' : 'Quiz generated!');
      queryClient.invalidateQueries({ queryKey: ['quiz', chapter.id] });
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate quiz');
    } finally {
      setGeneratingQuiz(null);
    }
  };

  const isTeacher = role === 'teacher';

  if (!textbook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/textbooks" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {language === 'bn' ? 'পাঠ্যপুস্তকে ফিরুন' : 'Back to Textbooks'}
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{textbook.cover_emoji}</span>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-secondary-foreground">
                  {language === 'bn' ? textbook.title_bn : textbook.title}
                </h1>
                <p className="text-secondary-foreground/50 text-sm mt-1">
                  {language === 'bn' ? textbook.description_bn : textbook.description}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge variant="secondary" className="text-[10px]">
                    {language === 'bn' ? `শ্রেণি ${textbook.class_level}` : `Class ${textbook.class_level}`}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">{textbook.subject}</Badge>
                  <Badge variant="outline" className="text-[10px] bg-primary/8 text-primary border-primary/20">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {language === 'bn' ? 'বিনামূল্যে' : 'Free'}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Teacher AI Controls */}
        {isTeacher && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{language === 'bn' ? 'AI কন্টেন্ট জেনারেটর' : 'AI Content Generator'}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {language === 'bn'
                        ? 'প্রতিটি অধ্যায়ের জন্য AI দিয়ে ব্যাখ্যা ও কুইজ তৈরি করুন। অধ্যায় খুলে Generate বাটনে ক্লিক করুন।'
                        : 'Generate explanations and quizzes for each chapter using AI. Open a chapter and click the Generate buttons.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {chapters.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-10 text-center text-muted-foreground text-sm">
              {language === 'bn' ? 'অধ্যায় শীঘ্রই যোগ হবে।' : 'Chapters coming soon.'}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {chapters.map((chapter, i) => {
              const isOpen = activeChapter === chapter.id;
              const isQuizActive = quizMode === chapter.id;
              const hasExplanation = !!(chapter.explanation || chapter.explanation_bn);
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-md' : 'hover:border-primary/15 hover:shadow-sm'}`}>
                    <CardContent className="p-0">
                      {/* Chapter Header */}
                      <button
                        onClick={() => {
                          setActiveChapter(isOpen ? null : chapter.id);
                          if (isOpen) { setQuizMode(null); resetQuiz(); }
                        }}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                            {chapter.chapter_number}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm truncate">
                              {language === 'bn' ? chapter.title_bn : chapter.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-[11px] text-muted-foreground">
                                {language === 'bn' ? `অধ্যায় ${chapter.chapter_number}` : `Chapter ${chapter.chapter_number}`}
                              </p>
                              {hasExplanation && (
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                                  <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                                  {language === 'bn' ? 'কন্টেন্ট আছে' : 'Has content'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <Separator />
                            <div className="p-4 sm:p-5">
                              {/* Explanation */}
                              {!isQuizActive && (
                                <div>
                                  {hasExplanation ? (
                                    <div className="prose prose-sm max-w-none text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
                                      {language === 'bn' ? chapter.explanation_bn : chapter.explanation}
                                    </div>
                                  ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                      <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
                                      <p className="text-sm">
                                        {language === 'bn' ? 'এই অধ্যায়ের কন্টেন্ট এখনো তৈরি হয়নি।' : 'Content for this chapter has not been generated yet.'}
                                      </p>
                                      {isTeacher && (
                                        <Button
                                          size="sm"
                                          className="mt-4 gap-1.5"
                                          onClick={() => generateContent(chapter)}
                                          disabled={generatingContent === chapter.id}
                                        >
                                          {generatingContent === chapter.id ? (
                                            <><Loader2 className="h-3.5 w-3.5 animate-spin" />{language === 'bn' ? 'তৈরি হচ্ছে...' : 'Generating...'}</>
                                          ) : (
                                            <><Wand2 className="h-3.5 w-3.5" />{language === 'bn' ? 'AI দিয়ে ব্যাখ্যা তৈরি করুন' : 'Generate with AI'}</>
                                          )}
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                  <div className="mt-6 flex flex-wrap gap-2">
                                    <Button
                                      size="sm"
                                      className="gap-1.5"
                                      onClick={() => { setQuizMode(chapter.id); resetQuiz(); }}
                                    >
                                      <HelpCircle className="h-3.5 w-3.5" />
                                      {language === 'bn' ? 'কুইজ শুরু করুন' : 'Start Quiz'}
                                    </Button>
                                    {isTeacher && hasExplanation && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5"
                                        onClick={() => generateContent(chapter)}
                                        disabled={generatingContent === chapter.id}
                                      >
                                        {generatingContent === chapter.id ? (
                                          <><Loader2 className="h-3.5 w-3.5 animate-spin" />{language === 'bn' ? 'তৈরি হচ্ছে...' : 'Regenerating...'}</>
                                        ) : (
                                          <><Wand2 className="h-3.5 w-3.5" />{language === 'bn' ? 'পুনরায় তৈরি' : 'Regenerate'}</>
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Quiz */}
                              {isQuizActive && (
                                <div className="space-y-6">
                                  <div className="flex items-center justify-between flex-wrap gap-2">
                                    <h4 className="font-bold text-sm flex items-center gap-2">
                                      <HelpCircle className="h-4 w-4 text-primary" />
                                      {language === 'bn' ? 'অনুশীলন কুইজ' : 'Practice Quiz'}
                                    </h4>
                                    <div className="flex gap-2 flex-wrap">
                                      {isTeacher && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => generateQuiz(chapter)}
                                          disabled={generatingQuiz === chapter.id}
                                          className="text-xs gap-1.5"
                                        >
                                          {generatingQuiz === chapter.id ? (
                                            <><Loader2 className="h-3 w-3 animate-spin" />{language === 'bn' ? 'তৈরি হচ্ছে...' : 'Generating...'}</>
                                          ) : (
                                            <><Brain className="h-3 w-3" />{language === 'bn' ? 'AI কুইজ তৈরি' : 'Generate Quiz'}</>
                                          )}
                                        </Button>
                                      )}
                                      <Button variant="ghost" size="sm" onClick={() => { setQuizMode(null); resetQuiz(); }} className="text-xs">
                                        <ArrowLeft className="h-3 w-3 mr-1" />
                                        {language === 'bn' ? 'ব্যাখ্যায় ফিরুন' : 'Back'}
                                      </Button>
                                    </div>
                                  </div>

                                  {quizQuestions.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                      <Brain className="h-10 w-10 mx-auto mb-3 opacity-30" />
                                      <p className="text-sm">
                                        {language === 'bn' ? 'কুইজ এখনো তৈরি হয়নি।' : 'No quiz available yet.'}
                                      </p>
                                      {isTeacher && (
                                        <Button
                                          size="sm"
                                          className="mt-4 gap-1.5"
                                          onClick={() => generateQuiz(chapter)}
                                          disabled={generatingQuiz === chapter.id}
                                        >
                                          {generatingQuiz === chapter.id ? (
                                            <><Loader2 className="h-3.5 w-3.5 animate-spin" />{language === 'bn' ? 'তৈরি হচ্ছে...' : 'Generating...'}</>
                                          ) : (
                                            <><Wand2 className="h-3.5 w-3.5" />{language === 'bn' ? 'AI দিয়ে কুইজ তৈরি করুন' : 'Generate Quiz with AI'}</>
                                          )}
                                        </Button>
                                      )}
                                    </div>
                                  ) : (
                                    <>
                                      {quizQuestions.map((q, qi) => {
                                        const options = language === 'bn'
                                          ? (q.options_bn as string[])
                                          : (q.options as string[]);
                                        const selected = answers[q.id];
                                        const isCorrect = selected === q.correct_answer;

                                        return (
                                          <motion.div
                                            key={q.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: qi * 0.05 }}
                                            className="space-y-2.5"
                                          >
                                            <p className="text-sm font-medium">
                                              <span className="text-primary mr-1.5">{qi + 1}.</span>
                                              {language === 'bn' ? q.question_bn : q.question}
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                              {options.map((opt: string, oi: number) => {
                                                let optClass = 'bg-muted/40 border-border/50 hover:bg-muted hover:border-primary/20';
                                                if (selected === oi && !submitted) {
                                                  optClass = 'bg-primary/10 border-primary/40 ring-1 ring-primary/20';
                                                }
                                                if (submitted) {
                                                  if (oi === q.correct_answer) {
                                                    optClass = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700';
                                                  } else if (selected === oi && !isCorrect) {
                                                    optClass = 'bg-destructive/10 border-destructive/30 text-destructive';
                                                  }
                                                }
                                                return (
                                                  <button
                                                    key={oi}
                                                    onClick={() => handleAnswer(q.id, oi)}
                                                    disabled={submitted}
                                                    className={`text-left text-xs p-3 rounded-lg border transition-all ${optClass} ${submitted ? '' : 'cursor-pointer'}`}
                                                  >
                                                    <span className="font-semibold mr-1.5">{String.fromCharCode(65 + oi)}.</span>
                                                    {opt}
                                                    {submitted && oi === q.correct_answer && <CheckCircle className="inline h-3.5 w-3.5 ml-1.5 text-emerald-500" />}
                                                    {submitted && selected === oi && !isCorrect && <XCircle className="inline h-3.5 w-3.5 ml-1.5 text-destructive" />}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                            {submitted && (
                                              <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xs text-muted-foreground bg-muted/50 p-2.5 rounded-lg"
                                              >
                                                💡 {language === 'bn' ? q.explanation_bn : q.explanation}
                                              </motion.p>
                                            )}
                                          </motion.div>
                                        );
                                      })}

                                      <Separator />

                                      {!submitted ? (
                                        <Button
                                          onClick={handleSubmitQuiz}
                                          disabled={Object.keys(answers).length < quizQuestions.length}
                                          className="w-full"
                                        >
                                          {language === 'bn'
                                            ? `জমা দিন (${Object.keys(answers).length}/${quizQuestions.length})`
                                            : `Submit (${Object.keys(answers).length}/${quizQuestions.length})`}
                                        </Button>
                                      ) : (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="text-center space-y-3"
                                        >
                                          <div className="p-4 rounded-lg bg-muted/50">
                                            <p className="text-2xl font-bold text-primary">{score}/{quizQuestions.length}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {language === 'bn' ? 'সঠিক উত্তর' : 'Correct Answers'}
                                            </p>
                                            <Progress value={(score / quizQuestions.length) * 100} className="h-2 mt-3" />
                                          </div>
                                          <Button variant="outline" size="sm" onClick={resetQuiz} className="gap-1.5">
                                            <RotateCcw className="h-3.5 w-3.5" />
                                            {language === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'}
                                          </Button>
                                        </motion.div>
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
