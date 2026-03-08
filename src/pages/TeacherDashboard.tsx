import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { teacherData, assignments, teacherClasses } from "@/data/demoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Users, BookOpen, Video, Award, HelpCircle, Plus, Clock,
  BarChart3, Sparkles, FileText, Calendar, FolderOpen,
  Bell, TrendingUp, CheckCircle, AlertCircle, ChevronRight
} from "lucide-react";
import { PerformanceHeatmap } from "@/components/teacher/PerformanceHeatmap";
import { AIContentGenerator } from "@/components/teacher/AIContentGenerator";
import { AssignmentGrader } from "@/components/teacher/AssignmentGrader";
import { ClassScheduler } from "@/components/teacher/ClassScheduler";
import { StudentAnalytics } from "@/components/teacher/StudentAnalytics";
import { ResourceLibrary } from "@/components/teacher/ResourceLibrary";
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { ProgressChecklist } from '@/components/onboarding/ProgressChecklist';
import { useOnboarding } from '@/hooks/useOnboarding';
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" }
  })
};

export default function TeacherDashboard() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const {
    showTour, completeTour, skipTour, startTour, hasCompleted,
    getFeatures, getProgress, markFeatureExplored, resetFeatures
  } = useOnboarding('teacher');

  const handleFeatureClick = (featureId: string) => {
    markFeatureExplored(featureId);
    const element = document.querySelector(`[data-tour="${featureId}"]`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const stats = [
    { label: language === 'bn' ? 'মোট শিক্ষার্থী' : 'Total Students', value: teacherData.totalStudents, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: language === 'bn' ? 'সক্রিয় ক্লাস' : 'Active Classes', value: teacherData.activeClasses, icon: BookOpen, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: language === 'bn' ? 'লাইভ সেশন' : 'Live Sessions', value: '12', icon: Video, color: 'text-accent', bg: 'bg-accent/10' },
    { label: language === 'bn' ? 'গড় রেটিং' : 'Avg Rating', value: '4.9', icon: Award, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const quickActions = [
    { label: language === 'bn' ? 'নতুন ক্লাস' : 'New Class', icon: Plus, tab: 'schedule' },
    { label: language === 'bn' ? 'গ্রেডিং' : 'Grading', icon: FileText, tab: 'grading' },
    { label: language === 'bn' ? 'AI কন্টেন্ট' : 'AI Content', icon: Sparkles, tab: 'ai' },
    { label: language === 'bn' ? 'রিসোর্স' : 'Resources', icon: FolderOpen, tab: 'resources' },
  ];

  const recentActivity = [
    { icon: CheckCircle, color: 'text-green-500', text: language === 'bn' ? 'রাফি আহমেদ বাইনারি সার্চ অ্যাসাইনমেন্ট জমা দিয়েছে' : 'Rafi Ahmed submitted Binary Search assignment', time: language === 'bn' ? '১০ মিনিট আগে' : '10 min ago' },
    { icon: TrendingUp, color: 'text-primary', text: language === 'bn' ? 'ক্লাস পারফরম্যান্স ৫% বৃদ্ধি পেয়েছে' : 'Class performance increased by 5%', time: language === 'bn' ? '১ ঘন্টা আগে' : '1 hour ago' },
    { icon: Bell, color: 'text-accent', text: language === 'bn' ? 'আগামীকাল অ্যালগরিদম ১০১ লাইভ ক্লাস' : 'Algorithm 101 live class tomorrow', time: language === 'bn' ? '২ ঘন্টা আগে' : '2 hours ago' },
    { icon: AlertCircle, color: 'text-yellow-500', text: language === 'bn' ? 'করিম উদ্দিনের অগ্রগতি কমেছে - সাহায্য প্রয়োজন' : 'Karim Uddin\'s progress declining - needs help', time: language === 'bn' ? '৩ ঘন্টা আগে' : '3 hours ago' },
    { icon: Users, color: 'text-secondary', text: language === 'bn' ? '৩ জন নতুন শিক্ষার্থী পাইথন অ্যাডভান্সডে যোগ দিয়েছে' : '3 new students joined Python Advanced', time: language === 'bn' ? '৫ ঘন্টা আগে' : '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showTour && (
        <OnboardingTour role="teacher" onComplete={completeTour} onSkip={skipTour} />
      )}

      {/* Enhanced Hero Section */}
      <section className="relative py-8 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-secondary/8" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto max-w-7xl relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
                <AvatarImage src={teacherData.avatar} alt={teacherData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {teacherData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {language === 'bn' ? 'স্বাগতম, ' : 'Welcome, '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {language === 'bn' ? teacherData.name : teacherData.nameEn}
                  </span>
                </h1>
                <p className="text-muted-foreground mt-0.5">
                  {language === 'bn' ? teacherData.department : teacherData.departmentEn}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    <Award className="h-3 w-3 mr-1" />
                    {language === 'bn' ? 'শীর্ষ শিক্ষক' : 'Top Teacher'}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-green-500/30 text-green-600">
                    ⭐ 4.9
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasCompleted && (
                <Button variant="outline" size="sm" onClick={startTour}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorial'}
                </Button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-5">
            {quickActions.map((action, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="gap-1.5 border-border/60 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                onClick={() => setActiveTab(action.tab)}
              >
                <action.icon className="h-3.5 w-3.5" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {hasCompleted && (
            <ProgressChecklist
              features={getFeatures()}
              progress={getProgress()}
              onFeatureClick={handleFeatureClick}
              onReset={resetFeatures}
              className="mb-6"
            />
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap h-auto gap-1 bg-muted/50 p-1">
              <TabsTrigger value="overview" className="gap-1.5 text-xs md:text-sm">
                <BarChart3 className="h-3.5 w-3.5" />
                {language === 'bn' ? 'সারসংক্ষেপ' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-1.5 text-xs md:text-sm">
                <Calendar className="h-3.5 w-3.5" />
                {language === 'bn' ? 'শিডিউল' : 'Schedule'}
              </TabsTrigger>
              <TabsTrigger value="grading" className="gap-1.5 text-xs md:text-sm">
                <FileText className="h-3.5 w-3.5" />
                {language === 'bn' ? 'গ্রেডিং' : 'Grading'}
              </TabsTrigger>
              <TabsTrigger value="ai" className="gap-1.5 text-xs md:text-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {language === 'bn' ? 'AI টুলস' : 'AI Tools'}
              </TabsTrigger>
              <TabsTrigger value="resources" className="gap-1.5 text-xs md:text-sm">
                <FolderOpen className="h-3.5 w-3.5" />
                {language === 'bn' ? 'রিসোর্স' : 'Resources'}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Today's Classes */}
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        {language === 'bn' ? 'আজকের ক্লাস' : "Today's Classes"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {teacherClasses.map((cls, index) => (
                          <motion.div
                            key={cls.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Video className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{language === 'bn' ? cls.name : cls.nameEn}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{language === 'bn' ? cls.schedule : cls.scheduleEn}</span>
                                  <span>•</span>
                                  <Users className="h-3 w-3" />
                                  <span>{cls.students} {language === 'bn' ? 'জন' : 'students'}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="hidden sm:block w-24">
                                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${cls.progress}%` }} />
                                </div>
                                <p className="text-[10px] text-muted-foreground text-right mt-0.5">{cls.progress}%</p>
                              </div>
                              <Button size="sm" variant="outline" className="text-xs">
                                <Video className="h-3 w-3 mr-1" />
                                {language === 'bn' ? 'শুরু' : 'Start'}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pending Assignments */}
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-secondary" />
                        {language === 'bn' ? 'অ্যাসাইনমেন্ট স্ট্যাটাস' : 'Assignment Status'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {assignments.map((a, index) => (
                          <motion.div
                            key={a.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${a.status === 'completed' ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                                {a.status === 'completed'
                                  ? <CheckCircle className="h-4 w-4 text-green-500" />
                                  : <Clock className="h-4 w-4 text-yellow-500" />
                                }
                              </div>
                              <div>
                                <p className="font-medium text-sm">{language === 'bn' ? a.title : a.titleEn}</p>
                                <p className="text-xs text-muted-foreground">
                                  {a.submitted}/{a.total} {language === 'bn' ? 'জমা দিয়েছে' : 'submitted'} • {language === 'bn' ? a.deadline : a.deadlineEn}
                                </p>
                              </div>
                            </div>
                            <Badge variant={a.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                              {a.status === 'completed'
                                ? (language === 'bn' ? 'সম্পন্ন' : 'Done')
                                : (language === 'bn' ? 'চলমান' : 'Active')
                              }
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Heatmap */}
                  <div data-tour="performance-heatmap" onClick={() => markFeatureExplored('performance-heatmap')}>
                    <PerformanceHeatmap />
                  </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-6">
                  {/* Recent Activity */}
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Bell className="h-5 w-5 text-accent" />
                        {language === 'bn' ? 'সাম্প্রতিক কার্যকলাপ' : 'Recent Activity'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="flex gap-3 group cursor-pointer"
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              <activity.icon className={`h-4 w-4 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm leading-tight group-hover:text-primary transition-colors">{activity.text}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/50 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Student Analytics */}
                  <div data-tour="student-analytics" onClick={() => markFeatureExplored('student-analytics')}>
                    <StudentAnalytics />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div data-tour="class-scheduler" onClick={() => markFeatureExplored('class-scheduler')}>
                  <ClassScheduler />
                </div>
                <div data-tour="performance-heatmap-2">
                  <PerformanceHeatmap />
                </div>
              </div>
            </TabsContent>

            {/* Grading Tab */}
            <TabsContent value="grading">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div data-tour="assignment-grader" onClick={() => markFeatureExplored('assignment-grader')}>
                  <AssignmentGrader />
                </div>
                <div data-tour="student-analytics-2">
                  <StudentAnalytics />
                </div>
              </div>
            </TabsContent>

            {/* AI Tools Tab */}
            <TabsContent value="ai">
              <div className="max-w-2xl mx-auto" data-tour="ai-content" onClick={() => markFeatureExplored('ai-content')}>
                <AIContentGenerator />
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="max-w-2xl mx-auto" data-tour="resource-library" onClick={() => markFeatureExplored('resource-library')}>
                <ResourceLibrary />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
