import { useLanguage } from "@/contexts/LanguageContext";
import { teacherData } from "@/data/demoData";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Video, Award, HelpCircle } from "lucide-react";
import { PerformanceHeatmap } from "@/components/teacher/PerformanceHeatmap";
import { AIContentGenerator } from "@/components/teacher/AIContentGenerator";
import { AssignmentGrader } from "@/components/teacher/AssignmentGrader";
import { ClassScheduler } from "@/components/teacher/ClassScheduler";
import { StudentAnalytics } from "@/components/teacher/StudentAnalytics";
import { ResourceLibrary } from "@/components/teacher/ResourceLibrary";
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';

export default function TeacherDashboard() {
  const { language } = useLanguage();
  const { showTour, completeTour, skipTour, startTour, hasCompleted } = useOnboarding('teacher');

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
      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour role="teacher" onComplete={completeTour} onSkip={skipTour} />
      )}

      {/* Hero Section */}
      <section className="relative py-8 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
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
            {hasCompleted && (
              <Button variant="outline" size="sm" onClick={startTour}>
                <HelpCircle className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorial'}
              </Button>
            )}
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
        <div className="container mx-auto max-w-6xl">
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
