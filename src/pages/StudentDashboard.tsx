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
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export default function StudentDashboard() {
  const { language } = useLanguage();
  const { showTour, completeTour, skipTour, startTour, hasCompleted } = useOnboarding('student');

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour role="student" onComplete={completeTour} onSkip={skipTour} />
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                R
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {language === 'bn' ? 'স্বাগতম, রহিম! 👋' : 'Welcome back, Rahim! 👋'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'bn' 
                    ? 'আজ শেখার জন্য দুর্দান্ত একটি দিন!' 
                    : "It's a great day to learn something new!"}
                </p>
              </div>
            </div>
            {hasCompleted && (
              <Button variant="outline" size="sm" onClick={startTour} className="hidden md:flex">
                <HelpCircle className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorial'}
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">
                {language === 'bn' ? 'দিনের স্ট্রিক 🔥' : 'Day Streak 🔥'}
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">
                {language === 'bn' ? 'সম্পূর্ণতা' : 'Completion'}
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <p className="text-2xl font-bold text-foreground">Level 7</p>
              <p className="text-sm text-muted-foreground">
                {language === 'bn' ? 'বর্তমান লেভেল' : 'Current Level'}
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">
                {language === 'bn' ? 'ব্যাজ অর্জন' : 'Badges Earned'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div data-tour="ai-study-plan">
              <AIStudyPlan />
            </div>
            <LiveClasses />
            <div className="grid md:grid-cols-2 gap-6">
              <div data-tour="skill-analysis">
                <SkillAnalysis />
              </div>
              <CareerPath />
            </div>
            <GroupProjects />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div data-tour="gamification">
              <Gamification />
            </div>
            <div data-tour="learning-path">
              <LearningPath />
            </div>
            <DailyRecommendations />
            <MicroCredentials />
          </div>
        </div>
      </div>
    </div>
  );
}
