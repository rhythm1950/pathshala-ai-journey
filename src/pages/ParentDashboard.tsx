import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChildProgress } from '@/components/parent/ChildProgress';
import { GradeTracker } from '@/components/parent/GradeTracker';
import { TeacherCommunication } from '@/components/parent/TeacherCommunication';
import { AttendanceCalendar } from '@/components/parent/AttendanceCalendar';
import { UpcomingEvents } from '@/components/parent/UpcomingEvents';
import { useLanguage } from '@/contexts/LanguageContext';
import { parentData, childrenData, parentNotifications } from '@/data/demoData';
import {
  Users, TrendingUp, MessageSquare, Calendar, Bell,
  BookOpen, Award, Clock, HelpCircle, ChevronRight,
  GraduationCap, Shield, Heart, Star, AlertCircle,
  CheckCircle, FileText, Download
} from 'lucide-react';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { ProgressChecklist } from '@/components/onboarding/ProgressChecklist';
import { useOnboarding } from '@/hooks/useOnboarding';
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0, 0, 0.2, 1] as const }
  })
};

export default function ParentDashboard() {
  const { language } = useLanguage();
  const [selectedChild, setSelectedChild] = useState(0);
  const [activeTab, setActiveTab] = useState("progress");

  const {
    showTour, completeTour, skipTour, startTour, hasCompleted,
    getFeatures, getProgress, markFeatureExplored, resetFeatures
  } = useOnboarding('parent');

  const handleFeatureClick = (featureId: string) => {
    markFeatureExplored(featureId);
    const element = document.querySelector(`[data-tour="${featureId}"]`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const child = childrenData[selectedChild];

  const quickStats = [
    {
      label: language === 'bn' ? 'সার্বিক গ্রেড' : 'Overall Grade',
      value: child.overallGrade,
      icon: Award,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: language === 'bn' ? 'উপস্থিতি হার' : 'Attendance',
      value: `${child.attendance}%`,
      icon: Calendar,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      label: language === 'bn' ? 'বিষয় সংখ্যা' : 'Subjects',
      value: child.subjects.length.toString(),
      icon: BookOpen,
      color: 'text-secondary',
      bg: 'bg-secondary/10'
    },
    {
      label: language === 'bn' ? 'সাম্প্রতিক কার্যকলাপ' : 'Activities',
      value: child.recentActivities.length.toString(),
      icon: Star,
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showTour && (
        <OnboardingTour role="parent" onComplete={completeTour} onSkip={skipTour} />
      )}

      {/* Enhanced Hero Section */}
      <section className="relative py-8 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4" />

        <div className="container mx-auto max-w-7xl relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
                <AvatarImage src={parentData.avatar} alt={parentData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {parentData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {language === 'bn' ? 'অভিভাবক পোর্টাল' : 'Parent Portal'}
                  </span>
                </h1>
                <p className="text-muted-foreground mt-0.5">
                  {language === 'bn' ? parentData.name : parentData.nameEn}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    <Shield className="h-3 w-3 mr-1" />
                    {language === 'bn' ? 'অভিভাবক' : 'Guardian'}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-green-500/30 text-green-600">
                    <Heart className="h-3 w-3 mr-1" />
                    {childrenData.length} {language === 'bn' ? 'সন্তান' : 'Children'}
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

          {/* Child Selector */}
          <div className="flex gap-3 mt-6 mb-2 overflow-x-auto pb-2 overflow-x-auto pb-2">
            {childrenData.map((c, index) => (
              <button
                key={c.id}
                onClick={() => setSelectedChild(index)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  selectedChild === index
                    ? 'bg-primary/10 border-primary/30 shadow-sm'
                    : 'bg-card/50 border-border/50 hover:bg-muted/50'
                }`}
              >
                <Avatar className="h-10 w-10 border border-border/50">
                  <AvatarImage src={c.avatar} alt={language === 'bn' ? c.name : c.nameEn} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {(language === 'bn' ? c.name : c.nameEn).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className={`font-medium text-sm ${selectedChild === index ? 'text-primary' : ''}`}>
                    {language === 'bn' ? c.name : c.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground">{language === 'bn' ? c.class : c.classEn}</p>
                </div>
                {selectedChild === index && (
                  <Badge className="bg-primary text-primary-foreground text-xs ml-1">
                    {c.overallGrade}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {quickStats.map((stat, index) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2 cols */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 flex-wrap h-auto  w-full overflow-x-autogap-1 bg-muted/50 p-1" data-tour="child-progress" onClick={() => markFeatureExplored('child-progress')}>
                  <TabsTrigger value="progress" className="gap-1.5 text-xs md:text-sm">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {language === 'bn' ? 'অগ্রগতি' : 'Progress'}
                  </TabsTrigger>
                  <TabsTrigger value="grades" className="gap-1.5 text-xs md:text-sm" onClick={() => markFeatureExplored('grade-tracker')}>
                    <BookOpen className="h-3.5 w-3.5" />
                    {language === 'bn' ? 'গ্রেড' : 'Grades'}
                  </TabsTrigger>
                  <TabsTrigger value="attendance" className="gap-1.5 text-xs md:text-sm" data-tour="attendance-tab" onClick={() => markFeatureExplored('attendance')}>
                    <Calendar className="h-3.5 w-3.5" />
                    {language === 'bn' ? 'উপস্থিতি' : 'Attendance'}
                  </TabsTrigger>
                  <TabsTrigger value="communication" className="gap-1.5 text-xs md:text-sm" data-tour="communication-tab" onClick={() => markFeatureExplored('teacher-communication')}>
                    <MessageSquare className="h-3.5 w-3.5" />
                    {language === 'bn' ? 'যোগাযোগ' : 'Communication'}
                  </TabsTrigger>
                  <TabsTrigger value="events" className="gap-1.5 text-xs md:text-sm" data-tour="events-tab" onClick={() => markFeatureExplored('events')}>
                    <Clock className="h-3.5 w-3.5" />
                    {language === 'bn' ? 'ইভেন্ট' : 'Events'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="progress" className="mt-0">
                  <ChildProgress />
                </TabsContent>
                <TabsContent value="grades" className="mt-0">
                  <GradeTracker />
                </TabsContent>
                <TabsContent value="attendance" className="mt-0">
                  <AttendanceCalendar />
                </TabsContent>
                <TabsContent value="communication" className="mt-0">
                  <TeacherCommunication />
                </TabsContent>
                <TabsContent value="events" className="mt-0">
                  <UpcomingEvents />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activities for selected child */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {language === 'bn' ? 'সাম্প্রতিক কার্যকলাপ' : 'Recent Activities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.recentActivities.map((activity, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex gap-3 group cursor-pointer"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-tight group-hover:text-primary transition-colors">
                            {language === 'bn' ? activity.activity : activity.activityEn}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {language === 'bn' ? activity.date : activity.dateEn}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Subject Performance */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    {language === 'bn' ? 'বিষয়ভিত্তিক পারফরম্যান্স' : 'Subject Performance'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {child.subjects.map((subject, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{language === 'bn' ? subject.name : subject.nameEn}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                          <Badge variant="outline" className="text-xs font-semibold">{subject.grade}</Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm" data-tour="notifications" onClick={() => markFeatureExplored('notifications')}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Bell className="h-5 w-5 text-accent" />
                    {language === 'bn' ? 'বিজ্ঞপ্তি' : 'Notifications'}
                    <Badge className="bg-primary text-primary-foreground text-xs ml-auto">
                      {parentNotifications.filter(n => n.type === 'success' || n.type === 'info').length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {parentNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        custom={notification.id}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/30 ${
                          notification.type === 'warning'
                            ? 'border-yellow-500/20'
                            : notification.type === 'success'
                            ? 'border-green-500/20'
                            : 'border-border/50'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex-shrink-0">
                            {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {notification.type === 'info' && <Bell className="h-4 w-4 text-primary" />}
                            {notification.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold">
                              {language === 'bn' ? notification.title : notification.titleEn}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {language === 'bn' ? notification.message : notification.messageEn}
                            </p>
                            <p className="text-[10px] text-muted-foreground/70 mt-1">
                              {language === 'bn' ? notification.time : notification.timeEn}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    {language === 'bn' ? 'দ্রুত কার্য' : 'Quick Actions'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-3 border-border/50 hover:bg-primary/5 hover:border-primary/30"
                    onClick={() => setActiveTab('communication')}
                  >
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-sm">{language === 'bn' ? 'শিক্ষককে মেসেজ করুন' : 'Message Teacher'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-3 border-border/50 hover:bg-primary/5 hover:border-primary/30"
                    onClick={() => setActiveTab('events')}
                  >
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span className="text-sm">{language === 'bn' ? 'মিটিং সিডিউল করুন' : 'Schedule Meeting'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-3 border-border/50 hover:bg-primary/5 hover:border-primary/30"
                    onClick={() => setActiveTab('grades')}
                  >
                    <Download className="w-4 h-4 text-accent" />
                    <span className="text-sm">{language === 'bn' ? 'রিপোর্ট কার্ড দেখুন' : 'View Report Card'}</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
