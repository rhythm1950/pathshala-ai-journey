import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Users, BookOpen, Video, FileText, Link2, Download,
  Search, Clock, Star, Play, ExternalLink, Lightbulb, GraduationCap,
  Brain, Target, Sparkles
} from 'lucide-react';

// Subject-specific learning resources
const subjectResources: Record<string, {
  videos: Array<{ title: string; titleBn: string; duration: string; difficulty: string; thumbnail: string }>;
  notes: Array<{ title: string; titleBn: string; pages: number; type: string }>;
  links: Array<{ title: string; titleBn: string; url: string; source: string }>;
  tips: Array<{ text: string; textBn: string }>;
}> = {
  Mathematics: {
    videos: [
      { title: 'Algebra Fundamentals', titleBn: 'বীজগণিতের মৌলিক ধারণা', duration: '25:30', difficulty: 'Beginner', thumbnail: '🔢' },
      { title: 'Calculus Introduction', titleBn: 'ক্যালকুলাসের ভূমিকা', duration: '40:15', difficulty: 'Intermediate', thumbnail: '📐' },
      { title: 'Geometry & Trigonometry', titleBn: 'জ্যামিতি ও ত্রিকোণমিতি', duration: '35:00', difficulty: 'Intermediate', thumbnail: '📏' },
      { title: 'Statistics & Probability', titleBn: 'পরিসংখ্যান ও সম্ভাব্যতা', duration: '30:45', difficulty: 'Advanced', thumbnail: '📊' },
    ],
    notes: [
      { title: 'Algebra Complete Notes', titleBn: 'বীজগণিত সম্পূর্ণ নোটস', pages: 45, type: 'pdf' },
      { title: 'Geometry Formulas Sheet', titleBn: 'জ্যামিতি সূত্র শীট', pages: 8, type: 'pdf' },
      { title: 'Practice Problem Set', titleBn: 'অনুশীলন সমস্যা সেট', pages: 20, type: 'pdf' },
      { title: 'Calculus Cheat Sheet', titleBn: 'ক্যালকুলাস চিট শীট', pages: 4, type: 'pdf' },
    ],
    links: [
      { title: 'Khan Academy - Math', titleBn: 'খান একাডেমি - গণিত', url: '#', source: 'Khan Academy' },
      { title: 'Wolfram Alpha Calculator', titleBn: 'উলফ্রাম আলফা ক্যালকুলেটর', url: '#', source: 'Wolfram' },
      { title: 'Desmos Graphing', titleBn: 'ডেসমস গ্রাফিং', url: '#', source: 'Desmos' },
    ],
    tips: [
      { text: 'Practice solving problems daily for at least 30 minutes', textBn: 'প্রতিদিন কমপক্ষে ৩০ মিনিট সমস্যা সমাধান অনুশীলন করুন' },
      { text: 'Focus on understanding concepts, not just memorizing formulas', textBn: 'শুধু সূত্র মুখস্থ না করে ধারণা বুঝতে মনোযোগ দিন' },
      { text: 'Use visual aids and graphs to understand complex topics', textBn: 'জটিল বিষয় বুঝতে ভিজ্যুয়াল এইড ও গ্রাফ ব্যবহার করুন' },
    ],
  },
  Physics: {
    videos: [
      { title: 'Newton\'s Laws of Motion', titleBn: 'নিউটনের গতিসূত্র', duration: '32:00', difficulty: 'Beginner', thumbnail: '🍎' },
      { title: 'Electricity & Magnetism', titleBn: 'বিদ্যুৎ ও চুম্বকত্ব', duration: '45:20', difficulty: 'Intermediate', thumbnail: '⚡' },
      { title: 'Thermodynamics', titleBn: 'তাপগতিবিদ্যা', duration: '38:10', difficulty: 'Advanced', thumbnail: '🌡️' },
      { title: 'Optics & Light', titleBn: 'আলোকবিজ্ঞান ও আলো', duration: '28:45', difficulty: 'Intermediate', thumbnail: '💡' },
    ],
    notes: [
      { title: 'Mechanics Complete Guide', titleBn: 'বলবিদ্যা সম্পূর্ণ গাইড', pages: 52, type: 'pdf' },
      { title: 'Physics Formula Handbook', titleBn: 'পদার্থবিজ্ঞান সূত্র হ্যান্ডবুক', pages: 12, type: 'pdf' },
      { title: 'Lab Experiment Notes', titleBn: 'ল্যাব পরীক্ষা নোটস', pages: 30, type: 'pdf' },
    ],
    links: [
      { title: 'PhET Simulations', titleBn: 'ফেট সিমুলেশন', url: '#', source: 'PhET' },
      { title: 'Physics Classroom', titleBn: 'ফিজিক্স ক্লাসরুম', url: '#', source: 'TPC' },
    ],
    tips: [
      { text: 'Draw free-body diagrams for every mechanics problem', textBn: 'প্রতিটি বলবিদ্যা সমস্যার জন্য ফ্রি-বডি ডায়াগ্রাম আঁকুন' },
      { text: 'Relate physics concepts to real-world examples', textBn: 'পদার্থবিজ্ঞানের ধারণাগুলো বাস্তব জীবনের উদাহরণের সাথে সম্পর্কিত করুন' },
    ],
  },
  English: {
    videos: [
      { title: 'Grammar Essentials', titleBn: 'ব্যাকরণ অত্যাবশ্যকীয়', duration: '20:00', difficulty: 'Beginner', thumbnail: '📝' },
      { title: 'Essay Writing Techniques', titleBn: 'রচনা লেখার কৌশল', duration: '35:30', difficulty: 'Intermediate', thumbnail: '✍️' },
      { title: 'Reading Comprehension', titleBn: 'পঠন বোধগম্যতা', duration: '28:15', difficulty: 'Intermediate', thumbnail: '📖' },
    ],
    notes: [
      { title: 'Grammar Rules Handbook', titleBn: 'ব্যাকরণ নিয়ম হ্যান্ডবুক', pages: 35, type: 'pdf' },
      { title: 'Vocabulary Builder', titleBn: 'শব্দভাণ্ডার তৈরি', pages: 20, type: 'pdf' },
    ],
    links: [
      { title: 'Grammarly Writing Assistant', titleBn: 'গ্রামারলি লেখার সহকারী', url: '#', source: 'Grammarly' },
      { title: 'Oxford Dictionary Online', titleBn: 'অক্সফোর্ড অভিধান অনলাইন', url: '#', source: 'Oxford' },
    ],
    tips: [
      { text: 'Read English newspapers and novels daily', textBn: 'প্রতিদিন ইংরেজি পত্রিকা ও উপন্যাস পড়ুন' },
      { text: 'Practice writing essays on different topics weekly', textBn: 'প্রতি সপ্তাহে বিভিন্ন বিষয়ে রচনা লেখার অনুশীলন করুন' },
    ],
  },
  Chemistry: {
    videos: [
      { title: 'Atomic Structure', titleBn: 'পরমাণুর গঠন', duration: '30:00', difficulty: 'Beginner', thumbnail: '⚛️' },
      { title: 'Chemical Bonding', titleBn: 'রাসায়নিক বন্ধন', duration: '42:00', difficulty: 'Intermediate', thumbnail: '🧪' },
      { title: 'Organic Chemistry Basics', titleBn: 'জৈব রসায়নের মৌলিক বিষয়', duration: '50:15', difficulty: 'Advanced', thumbnail: '🔬' },
    ],
    notes: [
      { title: 'Periodic Table Guide', titleBn: 'পর্যায় সারণি গাইড', pages: 15, type: 'pdf' },
      { title: 'Chemical Reactions Notes', titleBn: 'রাসায়নিক বিক্রিয়া নোটস', pages: 40, type: 'pdf' },
    ],
    links: [
      { title: 'Periodic Table Interactive', titleBn: 'ইন্টারেক্টিভ পর্যায় সারণি', url: '#', source: 'Ptable' },
    ],
    tips: [
      { text: 'Memorize the periodic table groups and their properties', textBn: 'পর্যায় সারণির গ্রুপ ও তাদের বৈশিষ্ট্য মুখস্থ করুন' },
    ],
  },
  Biology: {
    videos: [
      { title: 'Cell Biology', titleBn: 'কোষ জীববিদ্যা', duration: '35:00', difficulty: 'Beginner', thumbnail: '🧬' },
      { title: 'Human Anatomy', titleBn: 'মানবদেহ শারীরবিদ্যা', duration: '48:30', difficulty: 'Intermediate', thumbnail: '🫀' },
    ],
    notes: [
      { title: 'Biology Chapter Summaries', titleBn: 'জীববিদ্যা অধ্যায় সারসংক্ষেপ', pages: 60, type: 'pdf' },
      { title: 'Diagram Collection', titleBn: 'ডায়াগ্রাম সংকলন', pages: 25, type: 'pdf' },
    ],
    links: [
      { title: 'Biology Online Dictionary', titleBn: 'জীববিদ্যা অনলাইন অভিধান', url: '#', source: 'Biology Online' },
    ],
    tips: [
      { text: 'Draw and label diagrams regularly to reinforce learning', textBn: 'শেখার জন্য নিয়মিত ডায়াগ্রাম আঁকুন ও লেবেল করুন' },
    ],
  },
  'Computer Science': {
    videos: [
      { title: 'Programming Basics', titleBn: 'প্রোগ্রামিং মৌলিক বিষয়', duration: '40:00', difficulty: 'Beginner', thumbnail: '💻' },
      { title: 'Data Structures', titleBn: 'ডেটা স্ট্রাকচার', duration: '55:00', difficulty: 'Advanced', thumbnail: '🗂️' },
    ],
    notes: [
      { title: 'Algorithm Notes', titleBn: 'অ্যালগরিদম নোটস', pages: 35, type: 'pdf' },
      { title: 'Python Cheat Sheet', titleBn: 'পাইথন চিট শীট', pages: 6, type: 'pdf' },
    ],
    links: [
      { title: 'LeetCode Practice', titleBn: 'লিটকোড অনুশীলন', url: '#', source: 'LeetCode' },
      { title: 'W3Schools Tutorials', titleBn: 'W3Schools টিউটোরিয়াল', url: '#', source: 'W3Schools' },
    ],
    tips: [
      { text: 'Code every day, even if it\'s just 15 minutes', textBn: 'প্রতিদিন কোড করুন, এমনকি মাত্র ১৫ মিনিট হলেও' },
    ],
  },
  History: {
    videos: [
      { title: 'Ancient Civilizations', titleBn: 'প্রাচীন সভ্যতা', duration: '38:00', difficulty: 'Beginner', thumbnail: '🏛️' },
      { title: 'Bangladesh Liberation War', titleBn: 'বাংলাদেশের মুক্তিযুদ্ধ', duration: '45:00', difficulty: 'Intermediate', thumbnail: '🇧🇩' },
    ],
    notes: [
      { title: 'Timeline of World History', titleBn: 'বিশ্ব ইতিহাসের সময়রেখা', pages: 30, type: 'pdf' },
    ],
    links: [
      { title: 'History.com', titleBn: 'হিস্টোরি ডট কম', url: '#', source: 'History.com' },
    ],
    tips: [
      { text: 'Create timelines to understand the sequence of events', textBn: 'ঘটনার ক্রম বুঝতে টাইমলাইন তৈরি করুন' },
    ],
  },
};

// Fallback resources for unknown subjects
const defaultResources = {
  videos: [
    { title: 'Study Techniques', titleBn: 'পড়াশোনার কৌশল', duration: '20:00', difficulty: 'Beginner', thumbnail: '📚' },
  ],
  notes: [
    { title: 'General Study Notes', titleBn: 'সাধারণ পড়াশোনার নোটস', pages: 15, type: 'pdf' },
  ],
  links: [
    { title: 'Wikipedia', titleBn: 'উইকিপিডিয়া', url: '#', source: 'Wikipedia' },
  ],
  tips: [
    { text: 'Set specific study goals for each session', textBn: 'প্রতিটি সেশনের জন্য নির্দিষ্ট পড়াশোনার লক্ষ্য নির্ধারণ করুন' },
  ],
};

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Advanced: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function StudyGroupDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: group, isLoading } = useQuery({
    queryKey: ['study-group', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .eq('id', id!)
        .single();
      if (error) throw error;

      const { data: members } = await supabase
        .from('study_group_members')
        .select('user_id')
        .eq('group_id', id!);

      return {
        ...data,
        member_count: members?.length || 0,
        is_member: members?.some(m => m.user_id === user?.id) || false,
      };
    },
    enabled: !!id && !!user,
  });

  const resources = group ? (subjectResources[group.subject] || defaultResources) : defaultResources;

  const filteredVideos = resources.videos.filter(v =>
    (language === 'bn' ? v.titleBn : v.title).toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredNotes = resources.notes.filter(n =>
    (language === 'bn' ? n.titleBn : n.title).toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredLinks = resources.links.filter(l =>
    (language === 'bn' ? l.titleBn : l.title).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{language === 'bn' ? 'গ্রুপ পাওয়া যায়নি' : 'Group not found'}</p>
        <Link to="/study-groups">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === 'bn' ? 'ফিরে যান' : 'Go Back'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/study-groups" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {language === 'bn' ? 'সব গ্রুপ' : 'All Groups'}
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-secondary-foreground">
                    {group.name}
                  </h1>
                  <Badge variant="outline" className="text-xs font-semibold">
                    {group.subject}
                  </Badge>
                </div>
                {group.description && (
                  <p className="text-secondary-foreground/60 text-sm max-w-xl">{group.description}</p>
                )}
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {group.member_count}/{group.max_members} {language === 'bn' ? 'সদস্য' : 'members'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    {resources.videos.length + resources.notes.length + resources.links.length} {language === 'bn' ? 'টি রিসোর্স' : 'resources'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'bn' ? 'রিসোর্স খুঁজুন...' : 'Search resources...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="videos">
              <TabsList className="mb-4">
                <TabsTrigger value="videos" className="gap-1.5">
                  <Video className="h-3.5 w-3.5" />
                  {language === 'bn' ? 'ভিডিও' : 'Videos'}
                  <Badge variant="secondary" className="text-[10px] ml-1">{filteredVideos.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="notes" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {language === 'bn' ? 'নোটস' : 'Notes'}
                  <Badge variant="secondary" className="text-[10px] ml-1">{filteredNotes.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="links" className="gap-1.5">
                  <Link2 className="h-3.5 w-3.5" />
                  {language === 'bn' ? 'লিংক' : 'Links'}
                  <Badge variant="secondary" className="text-[10px] ml-1">{filteredLinks.length}</Badge>
                </TabsTrigger>
              </TabsList>

              {/* Videos Tab */}
              <TabsContent value="videos" className="space-y-3">
                {filteredVideos.map((video, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/10 transition-colors">
                          {video.thumbnail}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {language === 'bn' ? video.titleBn : video.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {video.duration}
                            </span>
                            <Badge variant="outline" className={`text-[10px] ${difficultyColors[video.difficulty] || ''}`}>
                              {video.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" className="shrink-0 h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                {filteredVideos.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    {language === 'bn' ? 'কোন ভিডিও পাওয়া যায়নি' : 'No videos found'}
                  </p>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-3">
                {filteredNotes.map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-destructive/5 flex items-center justify-center shrink-0 group-hover:bg-destructive/10 transition-colors">
                          <FileText className="h-6 w-6 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {language === 'bn' ? note.titleBn : note.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {note.pages} {language === 'bn' ? 'পৃষ্ঠা' : 'pages'} • PDF
                          </p>
                        </div>
                        <Button size="icon" variant="ghost" className="shrink-0 h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                {filteredNotes.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    {language === 'bn' ? 'কোন নোটস পাওয়া যায়নি' : 'No notes found'}
                  </p>
                )}
              </TabsContent>

              {/* Links Tab */}
              <TabsContent value="links" className="space-y-3">
                {filteredLinks.map((link, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-accent/50 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                          <Link2 className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {language === 'bn' ? link.titleBn : link.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{link.source}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="shrink-0 h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                {filteredLinks.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    {language === 'bn' ? 'কোন লিংক পাওয়া যায়নি' : 'No links found'}
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Study Tips */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  {language === 'bn' ? 'পড়াশোনার টিপস' : 'Study Tips'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2.5 text-sm">
                    <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {language === 'bn' ? tip.textBn : tip.text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  {language === 'bn' ? 'রিসোর্স সারসংক্ষেপ' : 'Resource Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Video className="h-4 w-4" />
                    {language === 'bn' ? 'ভিডিও লেকচার' : 'Video Lectures'}
                  </span>
                  <Badge variant="secondary" className="text-xs">{resources.videos.length}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {language === 'bn' ? 'স্টাডি নোটস' : 'Study Notes'}
                  </span>
                  <Badge variant="secondary" className="text-xs">{resources.notes.length}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Link2 className="h-4 w-4" />
                    {language === 'bn' ? 'দরকারি লিংক' : 'Useful Links'}
                  </span>
                  <Badge variant="secondary" className="text-xs">{resources.links.length}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  {language === 'bn' ? 'শেখার পথ' : 'Learning Path'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
                  const count = resources.videos.filter(v => v.difficulty === level).length;
                  const total = resources.videos.length;
                  return (
                    <div key={level}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{level}</span>
                        <span className="text-muted-foreground">{count} {language === 'bn' ? 'টি' : 'items'}</span>
                      </div>
                      <Progress value={total > 0 ? (count / total) * 100 : 0} className="h-1.5" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
