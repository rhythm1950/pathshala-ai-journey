import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Search, Clock, Users, Star, BookOpen, Play, CheckCircle } from "lucide-react";

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

const Courses = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
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

  const handleContinue = (courseId: string) => {
    toast({
      title: language === "bn" ? "কোর্স শুরু হচ্ছে..." : "Starting Course...",
      description: language === "bn" 
        ? "আপনার শেষ পাঠে নিয়ে যাওয়া হচ্ছে" 
        : "Taking you to your last lesson",
    });
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === "bn" ? "কোর্স ক্যাটালগ" : "Course Catalog"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "bn" 
              ? "আপনার শেখার যাত্রা শুরু করতে শত শত কোর্স থেকে বেছে নিন"
              : "Choose from hundreds of courses to start your learning journey"}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          {language === "bn" 
            ? `${filteredCourses.length}টি কোর্স পাওয়া গেছে`
            : `${filteredCourses.length} courses found`}
        </p>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={language === "bn" ? course.titleBn : course.title}
                  className="w-full h-full object-cover"
                />
                {course.enrolled && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {language === "bn" ? "নথিভুক্ত" : "Enrolled"}
                    </Badge>
                  </div>
                )}
                {course.price === 0 && !course.enrolled && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white">
                      {language === "bn" ? "বিনামূল্যে" : "Free"}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={getLevelBadgeColor(course.level)}>
                    {language === "bn" 
                      ? levels.find(l => l.value === course.level)?.labelBn 
                      : course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm text-foreground">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {language === "bn" ? course.titleBn : course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {language === "bn" ? course.descriptionBn : course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground gap-4 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.lessons} {language === "bn" ? "পাঠ" : "lessons"}
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} {language === "bn" ? "শিক্ষার্থী" : "students"}
                </div>
                
                {course.enrolled && course.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {language === "bn" ? "অগ্রগতি" : "Progress"}
                      </span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-2">
                {course.enrolled ? (
                  <Button 
                    className="w-full" 
                    onClick={() => handleContinue(course.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {language === "bn" ? "চালিয়ে যান" : "Continue"}
                  </Button>
                ) : (
                  <div className="w-full flex items-center justify-between">
                    <span className="font-bold text-lg">
                      {course.price === 0 
                        ? (language === "bn" ? "বিনামূল্যে" : "Free")
                        : `৳${course.price.toLocaleString()}`}
                    </span>
                    <Button onClick={() => handleEnroll(course.id)}>
                      {language === "bn" ? "নথিভুক্ত হন" : "Enroll Now"}
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === "bn" ? "কোনো কোর্স পাওয়া যায়নি" : "No courses found"}
            </h3>
            <p className="text-muted-foreground">
              {language === "bn" 
                ? "আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে দেখুন"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
