import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Search, Clock, Users, Star, BookOpen, Play, CheckCircle, GraduationCap, TrendingUp, Award, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface Course {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  image: string;
  price: number;
  enrolled: boolean;
  progress?: number;
}

const coursesData: Course[] = [
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
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
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
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400",
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
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
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
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
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
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400",
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
    instructor: "Ms. Khan",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    price: 2000,
    enrolled: false
  },
  {
    id: "7",
    title: "Chemistry Lab Techniques",
    titleBn: "রসায়ন ল্যাব কৌশল",
    description: "Hands-on laboratory skills and chemical analysis methods",
    descriptionBn: "হ্যান্ডস-অন ল্যাবরেটরি দক্ষতা এবং রাসায়নিক বিশ্লেষণ পদ্ধতি",
    category: "science",
    level: "intermediate",
    duration: "10 weeks",
    lessons: 40,
    students: 980,
    rating: 4.5,
    instructor: "Dr. Begum",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    price: 3000,
    enrolled: false
  },
  {
    id: "8",
    title: "Web Development",
    titleBn: "ওয়েব ডেভেলপমেন্ট",
    description: "Build modern websites with HTML, CSS, JavaScript and React",
    descriptionBn: "HTML, CSS, JavaScript এবং React দিয়ে আধুনিক ওয়েবসাইট তৈরি করুন",
    category: "technology",
    level: "intermediate",
    duration: "16 weeks",
    lessons: 64,
    students: 3400,
    rating: 4.9,
    instructor: "Eng. Akter",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    price: 3500,
    enrolled: false
  }
];

const categories = [
  { value: "all", label: "All Categories", labelBn: "সব বিভাগ" },
  { value: "mathematics", label: "Mathematics", labelBn: "গণিত" },
  { value: "science", label: "Science", labelBn: "বিজ্ঞান" },
  { value: "language", label: "Language", labelBn: "ভাষা" },
  { value: "technology", label: "Technology", labelBn: "প্রযুক্তি" },
  { value: "history", label: "History", labelBn: "ইতিহাস" }
];

const levels = [
  { value: "all", label: "All Levels", labelBn: "সব স্তর" },
  { value: "beginner", label: "Beginner", labelBn: "প্রাথমিক" },
  { value: "intermediate", label: "Intermediate", labelBn: "মাধ্যমিক" },
  { value: "advanced", label: "Advanced", labelBn: "উন্নত" }
];

const stats = [
  { icon: BookOpen, value: "200+", label: "Courses", labelBn: "কোর্স" },
  { icon: Users, value: "50K+", label: "Students", labelBn: "শিক্ষার্থী" },
  { icon: Award, value: "95%", label: "Completion", labelBn: "সম্পূর্ণতা" },
  { icon: TrendingUp, value: "4.8", label: "Avg Rating", labelBn: "গড় রেটিং" },
];

const Courses = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (language === "bn" ? course.titleBn : course.title)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (courseId: string) => {
    setCourses(prev => prev.map(course =>
      course.id === courseId
        ? { ...course, enrolled: true, progress: 0, students: course.students + 1 }
        : course
    ));
    toast({
      title: language === "bn" ? "সফলভাবে নথিভুক্ত!" : "Successfully Enrolled!",
      description: language === "bn"
        ? "আপনি এই কোর্সে নথিভুক্ত হয়েছেন। শুভ শিক্ষা!"
        : "You have been enrolled in this course. Happy learning!",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "intermediate": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "advanced": return "bg-primary/10 text-primary border-primary/20";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-sm text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              {language === "bn" ? "আপনার ভবিষ্যৎ গড়ুন" : "Build Your Future"}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-secondary-foreground mb-4 tracking-tight">
              {language === "bn" ? "কোর্স ক্যাটালগ" : "Course Catalog"}
            </h1>
            <p className="text-secondary-foreground/60 text-lg max-w-xl mx-auto mb-10">
              {language === "bn"
                ? "বাংলাদেশের সেরা শিক্ষকদের কাছ থেকে শিখুন"
                : "Learn from Bangladesh's finest educators"}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-sm p-3"
                >
                  <stat.icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
                  <p className="text-xl font-bold text-secondary-foreground">{stat.value}</p>
                  <p className="text-xs text-secondary-foreground/50">{language === "bn" ? stat.labelBn : stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-sm p-4 mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Filter className="h-4 w-4" />
            {language === "bn" ? "ফিল্টার" : "Filters"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={language === "bn" ? "কোর্স অনুসন্ধান করুন..." : "Search courses..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder={language === "bn" ? "বিভাগ" : "Category"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {language === "bn" ? cat.labelBn : cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder={language === "bn" ? "স্তর" : "Level"} />
              </SelectTrigger>
              <SelectContent>
                {levels.map(lvl => (
                  <SelectItem key={lvl.value} value={lvl.value}>
                    {language === "bn" ? lvl.labelBn : lvl.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {language === "bn"
              ? `${filteredCourses.length}টি কোর্স পাওয়া গেছে`
              : `${filteredCourses.length} courses found`}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <Card
                className="group overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-md"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-muted">
                  <img
                    src={course.image}
                    alt={language === "bn" ? course.titleBn : course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={`${getLevelColor(course.level)} border text-[11px] font-semibold`}>
                      {language === "bn"
                        ? levels.find(l => l.value === course.level)?.labelBn
                        : course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </Badge>
                  </div>
                  
                  {course.enrolled && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground text-[11px]">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {language === "bn" ? "নথিভুক্ত" : "Enrolled"}
                      </Badge>
                    </div>
                  )}
                  {course.price === 0 && !course.enrolled && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-emerald-600 text-white text-[11px]">
                        {language === "bn" ? "বিনামূল্যে" : "Free"}
                      </Badge>
                    </div>
                  )}

                  {/* Bottom-left: instructor */}
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white/90 text-xs font-medium">{course.instructor}</p>
                  </div>

                  {/* Bottom-right: rating */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs font-semibold">{course.rating}</span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                    {language === "bn" ? course.titleBn : course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3 leading-relaxed">
                    {language === "bn" ? course.descriptionBn : course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {course.lessons} {language === "bn" ? "পাঠ" : "lessons"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {course.students.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress bar for enrolled */}
                  {course.enrolled && course.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{language === "bn" ? "অগ্রগতি" : "Progress"}</span>
                        <span className="font-semibold text-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    {course.enrolled ? (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
                      >
                        <Play className="h-3.5 w-3.5 mr-1.5" />
                        {language === "bn" ? "চালিয়ে যান" : "Continue"}
                      </Button>
                    ) : (
                      <>
                        <span className="font-bold text-foreground">
                          {course.price === 0
                            ? (language === "bn" ? "বিনামূল্যে" : "Free")
                            : `৳${course.price.toLocaleString()}`}
                        </span>
                        <Button
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleEnroll(course.id); }}
                        >
                          {language === "bn" ? "নথিভুক্ত হন" : "Enroll Now"}
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-sm bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">
              {language === "bn" ? "কোনো কোর্স পাওয়া যায়নি" : "No courses found"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {language === "bn"
                ? "আপনার অনুসন্ধান মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
