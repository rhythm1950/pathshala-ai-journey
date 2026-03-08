import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUBJECTS = ['Mathematics', 'Science', 'Bangla', 'English'];
const subjectEmojis: Record<string, string> = {
  Mathematics: '📐', Science: '🔬', Bangla: '📝', English: '📖'
};
const subjectColorMap: Record<string, string> = {
  Mathematics: 'bg-blue-500/10 text-blue-600 border-blue-200',
  Science: 'bg-purple-500/10 text-purple-600 border-purple-200',
  Bangla: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  English: 'bg-orange-500/10 text-orange-600 border-orange-200',
};

export default function Textbooks() {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const { data: textbooks = [], isLoading } = useQuery({
    queryKey: ['textbooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('textbooks')
        .select('*')
        .order('class_level', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const filtered = textbooks.filter(tb => {
    const title = language === 'bn' ? tb.title_bn : tb.title;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === 'all' || tb.subject === subjectFilter;
    const matchLevel = levelFilter === 'all' ||
      (levelFilter === 'primary' && tb.class_level <= 5) ||
      (levelFilter === 'high' && tb.class_level > 5);
    return matchSearch && matchSubject && matchLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-primary/8 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                {language === 'bn' ? 'সম্পূর্ণ বিনামূল্যে' : '100% Free'}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-secondary-foreground flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              {language === 'bn' ? 'পাঠ্যপুস্তক' : 'Textbooks'}
            </h1>
            <p className="text-secondary-foreground/50 mt-2 text-sm md:text-base max-w-2xl">
              {language === 'bn'
                ? 'বাংলাদেশের বর্তমান পাঠ্যক্রম অনুযায়ী প্রাথমিক ও মাধ্যমিক স্তরের পাঠ্যপুস্তকের অধ্যায়ভিত্তিক ব্যাখ্যা ও কুইজ অনুশীলন।'
                : 'Chapter-wise explanations and quiz practice for primary and high school textbooks based on the current Bangladesh curriculum.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'bn' ? 'পাঠ্যপুস্তক খুঁজুন...' : 'Search textbooks...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব বিষয়' : 'All Subjects'}</SelectItem>
              {SUBJECTS.map(s => (
                <SelectItem key={s} value={s}>{subjectEmojis[s]} {s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব স্তর' : 'All Levels'}</SelectItem>
              <SelectItem value="primary">{language === 'bn' ? 'প্রাথমিক (১-৫)' : 'Primary (1-5)'}</SelectItem>
              <SelectItem value="high">{language === 'bn' ? 'মাধ্যমিক (৬-১০)' : 'High School (6-10)'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="animate-pulse"><CardContent className="p-6 h-48" /></Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center text-muted-foreground">
              {language === 'bn' ? 'কোন পাঠ্যপুস্তক পাওয়া যায়নি।' : 'No textbooks found.'}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Group by level */}
            {(['primary', 'high'] as const).map(level => {
              const levelBooks = filtered.filter(tb =>
                level === 'primary' ? tb.class_level <= 5 : tb.class_level > 5
              );
              if (levelBooks.length === 0) return null;
              return (
                <div key={level} className="mb-10">
                  <h2 className="text-sm font-bold flex items-center gap-2 mb-4">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {level === 'primary'
                      ? (language === 'bn' ? 'প্রাথমিক স্তর (শ্রেণি ১-৫)' : 'Primary Level (Class 1-5)')
                      : (language === 'bn' ? 'মাধ্যমিক স্তর (শ্রেণি ৬-১০)' : 'High School Level (Class 6-10)')}
                    <Badge variant="secondary" className="text-[10px]">{levelBooks.length}</Badge>
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {levelBooks.map((tb, i) => (
                      <motion.div
                        key={tb.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link to={`/textbooks/${tb.id}`}>
                          <Card className="group h-full hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer">
                            <CardContent className="p-5 flex flex-col h-full">
                              <div className="flex items-start justify-between mb-3">
                                <span className="text-3xl">{tb.cover_emoji}</span>
                                <Badge variant="outline" className={`text-[10px] font-semibold border ${subjectColorMap[tb.subject] || ''}`}>
                                  {tb.subject}
                                </Badge>
                              </div>
                              <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                                {language === 'bn' ? tb.title_bn : tb.title}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                                {language === 'bn' ? tb.description_bn : tb.description}
                              </p>
                              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                                <Badge variant="secondary" className="text-[10px]">
                                  {language === 'bn' ? `শ্রেণি ${tb.class_level}` : `Class ${tb.class_level}`}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
