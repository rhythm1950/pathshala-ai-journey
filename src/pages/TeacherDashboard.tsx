import { useLanguage } from "@/contexts/LanguageContext";
import { teacherData } from "@/data/demoData";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Video, Award } from "lucide-react";
import { PerformanceHeatmap } from "@/components/teacher/PerformanceHeatmap";
import { AIContentGenerator } from "@/components/teacher/AIContentGenerator";
import { AssignmentGrader } from "@/components/teacher/AssignmentGrader";
import { ClassScheduler } from "@/components/teacher/ClassScheduler";
import { StudentAnalytics } from "@/components/teacher/StudentAnalytics";
import { ResourceLibrary } from "@/components/teacher/ResourceLibrary";

export default function TeacherDashboard() {
  const { language } = useLanguage();

  const stats = [
    {
      label: language === 'bn' ? 'মোট শিক্ষার্থী' : 'Total Students',
      value: teacherData.totalStudents,
      icon: Users,
      color: 'text-primary'
    },
    {
      label: language === 'bn' ? 'সক্রিয় ক্লাস' : 'Active Classes',
      value: teacherData.activeClasses,
      icon: BookOpen,
      color: 'text-secondary'
    },
    {
      label: language === 'bn' ? 'লাইভ সেশন' : 'Live Sessions',
      value: '12',
      icon: Video,
      color: 'text-accent'
    },
    {
      label: language === 'bn' ? 'গড় রেটিং' : 'Avg Rating',
      value: '4.9',
      icon: Award,
      color: 'text-green-500'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-8 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {language === 'bn' ? 'স্বাগতম, ' : 'Welcome, '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {teacherData.name}
                </span>
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'bn' ? teacherData.department : 'Mathematics Department'}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceHeatmap />
            <AIContentGenerator />
            <AssignmentGrader />
            <ClassScheduler />
            <StudentAnalytics />
            <ResourceLibrary />
          </div>
        </div>
      </section>
    </div>
  );
}
