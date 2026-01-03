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
  ArrowLeft, Download, Share2, Heart, Award, MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Course data (shared structure)
const coursesData = [
  {
    id: "1",
    title: "Mathematics Fundamentals",
    titleBn: "গণিতের মৌলিক বিষয়",
    description: "Master basic mathematical concepts including algebra, geometry, and arithmetic",
    descriptionBn: "বীজগণিত, জ্যামিতি এবং পাটিগণিত সহ মৌলিক গাণিতিক ধারণাগুলি আয়ত্ত করুন",
    category: "mathematics",
    level: "beginner",
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
    level: "advanced",
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
    level: "intermediate",
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
    level: "beginner",
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
    level: "intermediate",
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
    level: "beginner",
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

// Syllabus data
const syllabusData = {
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

// Lessons data
const lessonsData = {
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

// Reviews data
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
  const syllabus = syllabusData[id as keyof typeof syllabusData] || syllabusData.default;
  const lessons = lessonsData[id as keyof typeof lessonsData] || lessonsData.default;

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

  const levelColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/courses')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'bn' ? 'কোর্সে ফিরে যান' : 'Back to Courses'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Placeholder */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                {currentLesson ? (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-medium">
                        {language === 'bn' ? 'পাঠ চলছে...' : 'Playing Lesson...'}
                      </p>
                      <p className="text-sm opacity-70">
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
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="relative z-10 text-center">
                      <Button size="lg" className="rounded-full w-16 h-16" onClick={() => handlePlayLesson(1, false)}>
                        <Play className="w-8 h-8" />
                      </Button>
                      <p className="mt-4 font-medium">
                        {language === 'bn' ? 'প্রিভিউ দেখুন' : 'Watch Preview'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Course Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={levelColors[course.level]}>
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {language === 'bn' ? course.titleBn : course.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                {language === 'bn' ? course.descriptionBn : course.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {course.rating} ({reviewsData.length} {language === 'bn' ? 'রিভিউ' : 'reviews'})
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
            </div>

            {/* Tabs */}
            <Tabs defaultValue="lessons" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="lessons">{language === 'bn' ? 'পাঠ' : 'Lessons'}</TabsTrigger>
                <TabsTrigger value="syllabus">{language === 'bn' ? 'সিলেবাস' : 'Syllabus'}</TabsTrigger>
                <TabsTrigger value="reviews">{language === 'bn' ? 'রিভিউ' : 'Reviews'}</TabsTrigger>
              </TabsList>

              {/* Lessons Tab */}
              <TabsContent value="lessons" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'bn' ? 'কোর্স পাঠ' : 'Course Lessons'}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {lessons.map((lesson, index) => (
                        <div 
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                            lesson.locked && !course.enrolled ? 'opacity-60' : 'cursor-pointer'
                          }`}
                          onClick={() => handlePlayLesson(lesson.id, lesson.locked)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              lesson.completed 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                                : 'bg-muted'
                            }`}>
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : lesson.locked && !course.enrolled ? (
                                <Lock className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                {index + 1}. {language === 'bn' ? lesson.titleBn : lesson.title}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </p>
                            </div>
                          </div>
                          {lesson.locked && !course.enrolled && (
                            <Badge variant="secondary">
                              {language === 'bn' ? 'লক' : 'Locked'}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Syllabus Tab */}
              <TabsContent value="syllabus" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'bn' ? 'কোর্স সিলেবাস' : 'Course Syllabus'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {syllabus.map((week) => (
                      <div key={week.week} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {week.week}
                          </div>
                          <h3 className="font-semibold">
                            {language === 'bn' ? `সপ্তাহ ${week.week}: ${week.titleBn}` : `Week ${week.week}: ${week.title}`}
                          </h3>
                        </div>
                        <ul className="ml-11 space-y-1">
                          {week.topics.map((topic, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{language === 'bn' ? 'শিক্ষার্থী রিভিউ' : 'Student Reviews'}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="text-muted-foreground font-normal">
                          ({reviewsData.length})
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviewsData.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{language === 'bn' ? review.userBn : review.user}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {language === 'bn' ? review.commentBn : review.comment}
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'আপনার রিভিউ লিখুন' : 'Write Your Review'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                {course.enrolled && course.progress !== undefined ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{language === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button className="w-full" size="lg">
                      <Play className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'শেখা চালিয়ে যান' : 'Continue Learning'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Award className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'সার্টিফিকেট দেখুন' : 'View Certificate'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      {course.price === 0 ? (
                        <div className="text-3xl font-bold text-green-600">
                          {language === 'bn' ? 'বিনামূল্যে' : 'FREE'}
                        </div>
                      ) : (
                        <div className="text-3xl font-bold">৳{course.price}</div>
                      )}
                    </div>
                    <Button className="w-full" size="lg" onClick={handleEnroll}>
                      {language === 'bn' ? 'এখনই নথিভুক্ত হন' : 'Enroll Now'}
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    {language === 'bn' ? 'সংরক্ষণ' : 'Save'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === 'bn' ? 'শেয়ার' : 'Share'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Card */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'bn' ? 'প্রশিক্ষক' : 'Instructor'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'bn' ? 'বিশেষজ্ঞ প্রশিক্ষক' : 'Expert Instructor'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' ? course.instructorBioBn : course.instructorBio}
                </p>
              </CardContent>
            </Card>

            {/* Course Includes Card */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'bn' ? 'এই কোর্সে রয়েছে' : 'This Course Includes'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Play className="w-4 h-4 text-primary" />
                  <span>{course.lessons} {language === 'bn' ? 'ভিডিও পাঠ' : 'video lessons'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{course.duration} {language === 'bn' ? 'সময়কাল' : 'duration'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Download className="w-4 h-4 text-primary" />
                  <span>{language === 'bn' ? 'ডাউনলোডযোগ্য রিসোর্স' : 'Downloadable resources'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{language === 'bn' ? 'সমাপ্তি সার্টিফিকেট' : 'Certificate of completion'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>{language === 'bn' ? 'প্রশিক্ষকের সাথে চ্যাট' : 'Chat with instructor'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
