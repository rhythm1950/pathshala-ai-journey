import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play, Clock, Users, Star, BookOpen, CheckCircle, Lock,
  ArrowLeft, Download, Share2, Heart, Award, MessageSquare, Shield, Infinity, Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const coursesData = [
  {
    id: "1",
    title: "Mathematics Fundamentals",
    titleBn: "গণিতের মৌলিক বিষয়",
    description: "Master basic mathematical concepts including algebra, geometry, and arithmetic",
    descriptionBn: "বীজগণিত, জ্যামিতি এবং পাটিগণিত সহ মৌলিক গাণিতিক ধারণাগুলি আয়ত্ত করুন",
    category: "mathematics",
    level: "beginner" as const,
    duration: "12 weeks",
    lessons: 48,
    students: 2450,
    rating: 4.8,
    instructor: "Dr. Rahman",
    instructorBio: "PhD in Mathematics from Dhaka University with 15 years of teaching experience.",
    instructorBioBn: "ঢাকা বিশ্ববিদ্যালয় থেকে গণিতে পিএইচডি, ১৫ বছরের শিক্ষকতার অভিজ্ঞতা।",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    price: 0,
    enrolled: true,
    progress: 65
  },
  {
    id: "2",
    title: "Advanced Physics",
    titleBn: "উন্নত পদার্থবিজ্ঞান",
    description: "Explore mechanics, thermodynamics, and modern physics concepts",
    descriptionBn: "বলবিদ্যা, তাপগতিবিদ্যা এবং আধুনিক পদার্থবিজ্ঞানের ধারণাগুলি অন্বেষণ করুন",
    category: "science",
    level: "advanced" as const,
    duration: "16 weeks",
    lessons: 64,
    students: 1890,
    rating: 4.9,
    instructor: "Prof. Ahmed",
    instructorBio: "Professor of Physics at BUET with research in quantum mechanics.",
    instructorBioBn: "বুয়েটে পদার্থবিজ্ঞানের অধ্যাপক, কোয়ান্টাম মেকানিক্সে গবেষণা।",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800",
    price: 2500,
    enrolled: false
  },
  {
    id: "3",
    title: "Bengali Literature",
    titleBn: "বাংলা সাহিত্য",
    description: "Deep dive into Bengali poetry, prose, and literary analysis",
    descriptionBn: "বাংলা কবিতা, গদ্য এবং সাহিত্য বিশ্লেষণে গভীরভাবে ডুব দিন",
    category: "language",
    level: "intermediate" as const,
    duration: "10 weeks",
    lessons: 40,
    students: 3200,
    rating: 4.7,
    instructor: "Dr. Khatun",
    instructorBio: "Award-winning author and literature professor at Jahangirnagar University.",
    instructorBioBn: "পুরস্কারপ্রাপ্ত লেখক এবং জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের সাহিত্যের অধ্যাপক।",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    price: 1500,
    enrolled: false
  },
  {
    id: "4",
    title: "Computer Science Basics",
    titleBn: "কম্পিউটার বিজ্ঞানের মৌলিক বিষয়",
    description: "Learn programming fundamentals, algorithms, and data structures",
    descriptionBn: "প্রোগ্রামিং মৌলিক বিষয়, অ্যালগরিদম এবং ডেটা স্ট্রাকচার শিখুন",
    category: "technology",
    level: "beginner" as const,
    duration: "14 weeks",
    lessons: 56,
    students: 4100,
    rating: 4.9,
    instructor: "Eng. Hasan",
    instructorBio: "Software Engineer at Google with expertise in algorithms and system design.",
    instructorBioBn: "গুগলে সফটওয়্যার ইঞ্জিনিয়ার, অ্যালগরিদম এবং সিস্টেম ডিজাইনে বিশেষজ্ঞ।",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    price: 0,
    enrolled: true,
    progress: 30
  },
  {
    id: "5",
    title: "History of Bangladesh",
    titleBn: "বাংলাদেশের ইতিহাস",
    description: "Comprehensive study of Bangladesh's history from ancient to modern times",
    descriptionBn: "প্রাচীন থেকে আধুনিক সময় পর্যন্ত বাংলাদেশের ইতিহাসের ব্যাপক অধ্যয়ন",
    category: "history",
    level: "intermediate" as const,
    duration: "8 weeks",
    lessons: 32,
    students: 1650,
    rating: 4.6,
    instructor: "Prof. Islam",
    instructorBio: "Historian and author of several books on Bangladesh's liberation war.",
    instructorBioBn: "ইতিহাসবিদ এবং বাংলাদেশের মুক্তিযুদ্ধের উপর একাধিক বইয়ের লেখক।",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800",
    price: 1000,
    enrolled: false
  },
  {
    id: "6",
    title: "English Communication",
    titleBn: "ইংরেজি যোগাযোগ",
    description: "Improve speaking, writing, and comprehension skills in English",
    descriptionBn: "ইংরেজিতে কথা বলা, লেখা এবং বোধগম্যতার দক্ষতা উন্নত করুন",
    category: "language",
    level: "beginner" as const,
    duration: "12 weeks",
    lessons: 48,
    students: 5600,
    rating: 4.8,
    instructor: "Ms. Akter",
    instructorBio: "IELTS trainer and English language specialist with Cambridge certification.",
    instructorBioBn: "আইইএলটিএস প্রশিক্ষক এবং কেমব্রিজ সার্টিফিকেশন সহ ইংরেজি ভাষা বিশেষজ্ঞ।",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    price: 2000,
    enrolled: false
  }
];

const syllabusData: Record<string, { week: number; title: string; titleBn: string; topics: string[] }[]> = {
  "1": [
    { week: 1, title: "Introduction to Numbers", titleBn: "সংখ্যার পরিচিতি", topics: ["Number systems", "Basic operations", "Order of operations"] },
    { week: 2, title: "Algebra Basics", titleBn: "বীজগণিতের মৌলিক বিষয়", topics: ["Variables", "Expressions", "Simple equations"] },
    { week: 3, title: "Linear Equations", titleBn: "রৈখিক সমীকরণ", topics: ["One variable", "Two variables", "Graphing"] },
    { week: 4, title: "Geometry Fundamentals", titleBn: "জ্যামিতির মৌলিক বিষয়", topics: ["Points and lines", "Angles", "Triangles"] },
  ],
  "2": [
    { week: 1, title: "Classical Mechanics", titleBn: "চিরায়ত বলবিদ্যা", topics: ["Newton's laws", "Motion", "Forces"] },
    { week: 2, title: "Energy and Work", titleBn: "শক্তি এবং কাজ", topics: ["Kinetic energy", "Potential energy", "Conservation"] },
    { week: 3, title: "Thermodynamics", titleBn: "তাপগতিবিদ্যা", topics: ["Heat transfer", "Laws of thermodynamics", "Entropy"] },
    { week: 4, title: "Waves and Optics", titleBn: "তরঙ্গ এবং আলোকবিদ্যা", topics: ["Wave properties", "Light", "Reflection and refraction"] },
  ],
  default: [
    { week: 1, title: "Introduction", titleBn: "পরিচিতি", topics: ["Course overview", "Learning objectives", "Prerequisites"] },
    { week: 2, title: "Core Concepts", titleBn: "মূল ধারণা", topics: ["Fundamental principles", "Key terminology", "Basic applications"] },
    { week: 3, title: "Intermediate Topics", titleBn: "মধ্যবর্তী বিষয়", topics: ["Advanced concepts", "Problem solving", "Case studies"] },
    { week: 4, title: "Final Project", titleBn: "চূড়ান্ত প্রকল্প", topics: ["Project planning", "Implementation", "Presentation"] },
  ]
};

const lessonsData: Record<string, { id: number; title: string; titleBn: string; duration: string; completed: boolean; locked: boolean }[]> = {
  "1": [
    { id: 1, title: "Welcome to Mathematics", titleBn: "গণিতে স্বাগতম", duration: "10:00", completed: true, locked: false },
    { id: 2, title: "Understanding Numbers", titleBn: "সংখ্যা বোঝা", duration: "15:30", completed: true, locked: false },
    { id: 3, title: "Addition and Subtraction", titleBn: "যোগ এবং বিয়োগ", duration: "20:00", completed: true, locked: false },
    { id: 4, title: "Multiplication Tables", titleBn: "গুণের টেবিল", duration: "18:45", completed: false, locked: false },
    { id: 5, title: "Division Basics", titleBn: "ভাগের মৌলিক বিষয়", duration: "22:00", completed: false, locked: false },
    { id: 6, title: "Introduction to Fractions", titleBn: "ভগ্নাংশের পরিচিতি", duration: "25:00", completed: false, locked: true },
    { id: 7, title: "Decimal Numbers", titleBn: "দশমিক সংখ্যা", duration: "20:00", completed: false, locked: true },
    { id: 8, title: "Quiz: Number Operations", titleBn: "কুইজ: সংখ্যা অপারেশন", duration: "15:00", completed: false, locked: true },
  ],
  default: [
    { id: 1, title: "Course Introduction", titleBn: "কোর্স পরিচিতি", duration: "10:00", completed: false, locked: false },
    { id: 2, title: "Getting Started", titleBn: "শুরু করা", duration: "15:00", completed: false, locked: false },
    { id: 3, title: "Core Concepts Part 1", titleBn: "মূল ধারণা পর্ব ১", duration: "20:00", completed: false, locked: true },
    { id: 4, title: "Core Concepts Part 2", titleBn: "মূল ধারণা পর্ব ২", duration: "20:00", completed: false, locked: true },
    { id: 5, title: "Practice Session", titleBn: "অনুশীলন সেশন", duration: "30:00", completed: false, locked: true },
    { id: 6, title: "Final Assessment", titleBn: "চূড়ান্ত মূল্যায়ন", duration: "45:00", completed: false, locked: true },
  ]
};

const reviewsData = [
  { id: 1, user: "Rahim Khan", userBn: "রহিম খান", rating: 5, date: "2024-01-15", comment: "Excellent course! The instructor explains concepts very clearly.", commentBn: "চমৎকার কোর্স! প্রশিক্ষক ধারণাগুলি খুব স্পষ্টভাবে ব্যাখ্যা করেন।" },
  { id: 2, user: "Fatima Begum", userBn: "ফাতিমা বেগম", rating: 4, date: "2024-01-10", comment: "Very helpful for beginners. Would recommend to anyone starting out.", commentBn: "নতুনদের জন্য খুবই সহায়ক। যারা শুরু করছেন তাদের সবাইকে সুপারিশ করব।" },
  { id: 3, user: "Karim Ahmed", userBn: "করিম আহমেদ", rating: 5, date: "2024-01-05", comment: "The practice problems are great. Really helped me understand the material.", commentBn: "অনুশীলন সমস্যাগুলি দুর্দান্ত। সত্যিই আমাকে বিষয়বস্তু বুঝতে সাহায্য করেছে।" },
  { id: 4, user: "Nasreen Akter", userBn: "নাসরীন আক্তার", rating: 4, date: "2023-12-28", comment: "Good course structure. Some videos could be shorter though.", commentBn: "ভালো কোর্স কাঠামো। যদিও কিছু ভিডিও আরও ছোট হতে পারত।" },
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);

  const course = coursesData.find(c => c.id === id);
  const syllabus = syllabusData[id as string] || syllabusData.default;
  const lessons = lessonsData[id as string] || lessonsData.default;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'bn' ? 'কোর্স পাওয়া যায়নি' : 'Course Not Found'}
          </h1>
          <Button onClick={() => navigate('/courses')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'কোর্সে ফিরে যান' : 'Back to Courses'}
          </Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    toast({
      title: language === 'bn' ? "সফলভাবে নথিভুক্ত হয়েছে!" : "Successfully Enrolled!",
      description: language === 'bn'
        ? `আপনি "${course.titleBn}" কোর্সে নথিভুক্ত হয়েছেন`
        : `You have enrolled in "${course.title}"`,
    });
  };

  const handlePlayLesson = (lessonId: number, locked: boolean) => {
    if (locked && !course.enrolled) {
      toast({
        title: language === 'bn' ? "লক করা আছে" : "Locked",
        description: language === 'bn'
          ? "এই পাঠটি আনলক করতে কোর্সে নথিভুক্ত হন"
          : "Enroll in the course to unlock this lesson",
        variant: "destructive"
      });
      return;
    }
    setCurrentLesson(lessonId);
  };

  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    advanced: "bg-primary/10 text-primary border-primary/20"
  };

  const completedLessons = lessons.filter(l => l.completed).length;
  const totalDuration = lessons.reduce((acc, l) => {
    const [m, s] = l.duration.split(':').map(Number);
    return acc + m + (s || 0) / 60;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Cinematic Hero */}
      <section className="relative h-[320px] md:h-[380px] overflow-hidden bg-secondary">
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/40" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" onClick={() => navigate('/courses')} className="text-secondary-foreground/70 hover:text-secondary-foreground mb-4 -ml-2 p-2 h-auto">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              {language === 'bn' ? 'কোর্সে ফিরে যান' : 'Back to Courses'}
            </Button>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={`${levelColors[course.level]} border text-xs`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-secondary-foreground/70 border-secondary-foreground/20 text-xs">
                {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-secondary-foreground mb-2 tracking-tight">
              {language === 'bn' ? course.titleBn : course.title}
            </h1>
            <p className="text-secondary-foreground/60 max-w-2xl mb-4">
              {language === 'bn' ? course.descriptionBn : course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-foreground/50">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-secondary-foreground font-semibold">{course.rating}</span>
                ({reviewsData.length} {language === 'bn' ? 'রিভিউ' : 'reviews'})
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.students.toLocaleString()} {language === 'bn' ? 'শিক্ষার্থী' : 'students'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.lessons} {language === 'bn' ? 'পাঠ' : 'lessons'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden border-border">
                <div className="relative aspect-video bg-secondary flex items-center justify-center">
                  {currentLesson ? (
                    <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                      <div className="text-center text-secondary-foreground">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                          <Play className="w-7 h-7 text-primary" />
                        </div>
                        <p className="text-lg font-semibold">
                          {language === 'bn' ? 'পাঠ চলছে...' : 'Playing Lesson...'}
                        </p>
                        <p className="text-sm text-secondary-foreground/50 mt-1">
                          {lessons.find(l => l.id === currentLesson)?.[language === 'bn' ? 'titleBn' : 'title']}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setCurrentLesson(null)}
                        >
                          {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={course.image}
                        alt={course.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="relative z-10 text-center">
                        <button
                          onClick={() => handlePlayLesson(1, false)}
                          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto transition-transform hover:scale-110 shadow-lg"
                        >
                          <Play className="w-7 h-7 text-primary-foreground ml-1" />
                        </button>
                        <p className="mt-3 font-medium text-secondary-foreground/80 text-sm">
                          {language === 'bn' ? 'প্রিভিউ দেখুন' : 'Watch Preview'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="lessons" className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 p-1">
                  <TabsTrigger value="lessons" className="text-sm">{language === 'bn' ? 'পাঠ' : 'Lessons'}</TabsTrigger>
                  <TabsTrigger value="syllabus" className="text-sm">{language === 'bn' ? 'সিলেবাস' : 'Syllabus'}</TabsTrigger>
                  <TabsTrigger value="reviews" className="text-sm">{language === 'bn' ? 'রিভিউ' : 'Reviews'}</TabsTrigger>
                </TabsList>

                {/* Lessons Tab */}
                <TabsContent value="lessons" className="mt-4">
                  <Card className="border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{language === 'bn' ? 'কোর্স পাঠ' : 'Course Lessons'}</CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {completedLessons}/{lessons.length} {language === 'bn' ? 'সম্পন্ন' : 'completed'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between px-4 py-3 transition-colors ${
                              lesson.locked && !course.enrolled ? 'opacity-50' : 'cursor-pointer hover:bg-muted/50'
                            } ${currentLesson === lesson.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
                            onClick={() => handlePlayLesson(lesson.id, lesson.locked)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-semibold ${
                                lesson.completed
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  : currentLesson === lesson.id
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {lesson.completed ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : lesson.locked && !course.enrolled ? (
                                  <Lock className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {index + 1}. {language === 'bn' ? lesson.titleBn : lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Syllabus Tab */}
                <TabsContent value="syllabus" className="mt-4">
                  <Card className="border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{language === 'bn' ? 'কোর্স সিলেবাস' : 'Course Syllabus'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {syllabus.map((week) => (
                        <div key={week.week} className="border border-border rounded-sm p-4 bg-muted/30">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-7 h-7 rounded-sm bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                              {week.week}
                            </div>
                            <h3 className="font-semibold text-sm">
                              {language === 'bn' ? `সপ্তাহ ${week.week}: ${week.titleBn}` : `Week ${week.week}: ${week.title}`}
                            </h3>
                          </div>
                          <ul className="ml-10 space-y-1">
                            {week.topics.map((topic, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-4">
                  <Card className="border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{language === 'bn' ? 'শিক্ষার্থী রিভিউ' : 'Student Reviews'}</CardTitle>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-sm">{course.rating}</span>
                          <span className="text-xs text-muted-foreground">({reviewsData.length})</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-0 divide-y divide-border">
                      {reviewsData.map((review) => (
                        <div key={review.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                                {review.user.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{language === 'bn' ? review.userBn : review.user}</p>
                                <p className="text-[11px] text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'bn' ? review.commentBn : review.comment}
                          </p>
                        </div>
                      ))}
                      <div className="pt-4">
                        <Button variant="outline" className="w-full" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {language === 'bn' ? 'আপনার রিভিউ লিখুন' : 'Write Your Review'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="sticky top-4 border-border overflow-hidden">
                {/* Price header */}
                <div className="bg-secondary p-5 text-center">
                  {course.enrolled && course.progress !== undefined ? (
                    <div>
                      <p className="text-sm text-secondary-foreground/60 mb-1">{language === 'bn' ? 'আপনার অগ্রগতি' : 'Your Progress'}</p>
                      <p className="text-3xl font-bold text-secondary-foreground">{course.progress}%</p>
                    </div>
                  ) : course.price === 0 ? (
                    <div>
                      <p className="text-3xl font-bold text-emerald-500">{language === 'bn' ? 'বিনামূল্যে' : 'FREE'}</p>
                      <p className="text-xs text-secondary-foreground/50 mt-1">{language === 'bn' ? 'কোনো খরচ নেই' : 'No cost at all'}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl font-bold text-secondary-foreground">৳{course.price.toLocaleString()}</p>
                      <p className="text-xs text-secondary-foreground/50 mt-1">{language === 'bn' ? 'একবার পেমেন্ট' : 'One-time payment'}</p>
                    </div>
                  )}
                </div>

                <CardContent className="p-5 space-y-3">
                  {course.enrolled && course.progress !== undefined ? (
                    <>
                      <Progress value={course.progress} className="h-1.5 mb-1" />
                      <Button className="w-full" size="lg">
                        <Play className="w-4 h-4 mr-2" />
                        {language === 'bn' ? 'শেখা চালিয়ে যান' : 'Continue Learning'}
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Award className="w-4 h-4 mr-2" />
                        {language === 'bn' ? 'সার্টিফিকেট দেখুন' : 'View Certificate'}
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handleEnroll}>
                      {language === 'bn' ? 'এখনই নথিভুক্ত হন' : 'Enroll Now'}
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`w-4 h-4 mr-1.5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                      {language === 'bn' ? 'সংরক্ষণ' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1.5" />
                      {language === 'bn' ? 'শেয়ার' : 'Share'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{language === 'bn' ? 'প্রশিক্ষক' : 'Instructor'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{course.instructor}</p>
                      <p className="text-xs text-muted-foreground">{language === 'bn' ? 'বিশেষজ্ঞ প্রশিক্ষক' : 'Expert Instructor'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'bn' ? course.instructorBioBn : course.instructorBio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Includes */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{language === 'bn' ? 'এই কোর্সে রয়েছে' : 'This Course Includes'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {[
                    { icon: Play, text: `${course.lessons} ${language === 'bn' ? 'ভিডিও পাঠ' : 'video lessons'}` },
                    { icon: Clock, text: `${Math.round(totalDuration)} ${language === 'bn' ? 'মিনিট' : 'mins'} ${language === 'bn' ? 'মোট সময়কাল' : 'total duration'}` },
                    { icon: Download, text: language === 'bn' ? 'ডাউনলোডযোগ্য রিসোর্স' : 'Downloadable resources' },
                    { icon: Award, text: language === 'bn' ? 'সমাপ্তি সার্টিফিকেট' : 'Certificate of completion' },
                    { icon: Infinity, text: language === 'bn' ? 'আজীবন অ্যাক্সেস' : 'Lifetime access' },
                    { icon: Globe, text: language === 'bn' ? 'বাংলা ও ইংরেজিতে' : 'Bengali & English' },
                    { icon: Shield, text: language === 'bn' ? '৩০ দিনের মানি-ব্যাক' : '30-day money-back' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <item.icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
