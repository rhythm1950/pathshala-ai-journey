import { useLanguage } from '@/contexts/LanguageContext';
import { LearningPath } from '@/components/student/LearningPath';
import { AIStudyPlan } from '@/components/student/AIStudyPlan';
import { Gamification } from '@/components/student/Gamification';
import { SkillAnalysis } from '@/components/student/SkillAnalysis';
import { CareerPath } from '@/components/student/CareerPath';
import { MicroCredentials } from '@/components/student/MicroCredentials';
import { LiveClasses } from '@/components/student/LiveClasses';
import { GroupProjects } from '@/components/student/GroupProjects';
import { DailyRecommendations } from '@/components/student/DailyRecommendations';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { ProgressChecklist } from '@/components/onboarding/ProgressChecklist';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HelpCircle, Flame, Target, Trophy, BookOpen, Clock, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import rahulAvatar from '@/assets/avatars/rahul.jpg';

export default function StudentDashboard() {
  const { language } = useLanguage();
  const {
    showTour,
    completeTour,
    skipTour,
    startTour,
    hasCompleted,
    getFeatures,
    getProgress,
    markFeatureExplored,
    resetFeatures
  } = useOnboarding('student');

  const handleFeatureClick = (featureId: string) => {
    markFeatureExplored(featureId);
    const element = document.querySelector(`[data-tour="${featureId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const quickStats = [
    { icon: Flame, value: '12', label: language === 'bn' ? 'দিনের স্ট্রিক' : 'Day Streak', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { icon: Target, value: '85%', label: language === 'bn' ? 'সম্পূর্ণতা' : 'Completion', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Trophy, value: 'Level 7', label: language === 'bn' ? 'বর্তমান লেভেল' : 'Current Level', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: BookOpen, value: '3', label: language === 'bn' ? 'ব্যাজ অর্জন' : 'Badges Earned', color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const upcomingTasks = [
    { title: language === 'bn' ? 'গণিত অ্যাসাইনমেন্ট' : 'Math Assignment', due: language === 'bn' ? 'আজ রাত ১১:৫৯' : 'Today 11:59 PM', progress: 60 },
    { title: language === 'bn' ? 'পদার্থবিদ্যা কুইজ' : 'Physics Quiz', due: language === 'bn' ? 'আগামীকাল' : 'Tomorrow', progress: 0 },
    { title: language === 'bn' ? 'ইংরেজি প্রবন্ধ' : 'English Essay', due: language === 'bn' ? '৩ দিন বাকি' : '3 days left', progress: 30 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showTour && (
        <OnboardingTour role="student" onComplete={completeTour} onSkip={skipTour} />
      )}

      {/* Premium Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                  <AvatarImage src={rahulAvatar} alt="Rahim" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">R</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-secondary-foreground">
                    {language === 'bn' ? 'স্বাগতম, রহিম!' : 'Welcome back, Rahim!'}
                  </h1>
                  <p className="text-secondary-foreground/50 text-sm">
                    {language === 'bn' ? 'আজ শেখার জন্য দুর্দান্ত একটি দিন!' : "It's a great day to learn something new!"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasCompleted && (
                  <Button variant="outline" size="sm" onClick={startTour} className="text-secondary-foreground border-secondary-foreground/20 hover:bg-secondary-foreground/10">
                    <HelpCircle className="w-4 h-4 mr-1.5" />
                    {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorial'}
                  </Button>
                )}
                <Link to="/courses">
                  <Button size="sm" className="gap-1.5">
                    {language === 'bn' ? 'কোর্স ব্রাউজ' : 'Browse Courses'}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {quickStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div className="bg-secondary-foreground/5 border border-secondary-foreground/8 rounded-sm p-3.5 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-sm ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-secondary-foreground leading-none">{stat.value}</p>
                      <p className="text-[11px] text-secondary-foreground/50 mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {language === 'bn' ? 'আসন্ন কাজ' : 'Upcoming Tasks'}
                    </h2>
                    <span className="text-xs text-muted-foreground">{language === 'bn' ? '৩টি বাকি' : '3 pending'}</span>
                  </div>
                  <div className="space-y-3">
                    {upcomingTasks.map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-sm border border-border/50">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{task.due}</span>
                          </div>
                        </div>
                        <div className="w-20 ml-3">
                          <Progress value={task.progress} className="h-1.5" />
                          <p className="text-[10px] text-muted-foreground text-right mt-0.5">{task.progress}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div data-tour="ai-study-plan" onClick={() => markFeatureExplored('ai-study-plan')}>
              <AIStudyPlan />
            </div>
            <div data-tour="live-classes" onClick={() => markFeatureExplored('live-classes')}>
              <LiveClasses />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div data-tour="skill-analysis" onClick={() => markFeatureExplored('skill-analysis')}>
                <SkillAnalysis />
              </div>
              <CareerPath />
            </div>
            <GroupProjects />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="border-border">
                <CardContent className="p-5">
                  <h2 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {language === 'bn' ? 'সাপ্তাহিক অগ্রগতি' : 'Weekly Progress'}
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: language === 'bn' ? 'গণিত' : 'Mathematics', value: 85 },
                      { label: language === 'bn' ? 'পদার্থবিদ্যা' : 'Physics', value: 72 },
                      { label: language === 'bn' ? 'ইংরেজি' : 'English', value: 93 },
                      { label: language === 'bn' ? 'রসায়ন' : 'Chemistry', value: 68 },
                    ].map((subject, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{subject.label}</span>
                          <span className="font-semibold">{subject.value}%</span>
                        </div>
                        <Progress value={subject.value} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {hasCompleted && (
              <ProgressChecklist
                features={getFeatures()}
                progress={getProgress()}
                onFeatureClick={handleFeatureClick}
                onReset={resetFeatures}
              />
            )}
            <div data-tour="gamification" onClick={() => markFeatureExplored('gamification')}>
              <Gamification />
            </div>
            <div data-tour="learning-path" onClick={() => markFeatureExplored('learning-path')}>
              <LearningPath />
            </div>
            <DailyRecommendations />
            <div data-tour="micro-credentials" onClick={() => markFeatureExplored('micro-credentials')}>
              <MicroCredentials />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
