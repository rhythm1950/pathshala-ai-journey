import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildProgress } from '@/components/parent/ChildProgress';
import { GradeTracker } from '@/components/parent/GradeTracker';
import { TeacherCommunication } from '@/components/parent/TeacherCommunication';
import { AttendanceCalendar } from '@/components/parent/AttendanceCalendar';
import { UpcomingEvents } from '@/components/parent/UpcomingEvents';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Bell,
  BookOpen,
  Award,
  Clock,
  HelpCircle
} from 'lucide-react';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';

export default function ParentDashboard() {
  const { showTour, completeTour, skipTour, startTour, hasCompleted } = useOnboarding('parent');
  const quickStats = [
    { label: 'সার্বিক গড়', value: '82%', icon: TrendingUp, color: 'text-primary' },
    { label: 'উপস্থিতি হার', value: '95%', icon: Calendar, color: 'text-green-500' },
    { label: 'সম্পন্ন কোর্স', value: '12', icon: BookOpen, color: 'text-blue-500' },
    { label: 'অর্জিত ব্যাজ', value: '8', icon: Award, color: 'text-yellow-500' },
  ];

  const notifications = [
    { id: 1, text: 'রাহুলের গণিত পরীক্ষার ফলাফল প্রকাশিত হয়েছে', time: '১ ঘন্টা আগে', unread: true },
    { id: 2, text: 'আগামীকাল বিজ্ঞান ক্লাসের সময় পরিবর্তন হয়েছে', time: '৩ ঘন্টা আগে', unread: true },
    { id: 3, text: 'নতুন অ্যাসাইনমেন্ট যোগ করা হয়েছে: বাংলা রচনা', time: 'গতকাল', unread: false },
    { id: 4, text: 'রাহুল "গণিত বিশেষজ্ঞ" ব্যাজ অর্জন করেছে!', time: '২ দিন আগে', unread: false },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour role="parent" onComplete={completeTour} onSkip={skipTour} />
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              অভিভাবক পোর্টাল
            </h1>
            <p className="text-muted-foreground mt-2">আপনার সন্তানের শিক্ষা যাত্রা পর্যবেক্ষণ করুন</p>
          </div>
          {hasCompleted && (
            <Button variant="outline" size="sm" onClick={startTour}>
              <HelpCircle className="w-4 h-4 mr-2" />
              টিউটোরিয়াল
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, idx) => (
            <Card key={idx} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full" data-tour="child-progress">
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">অগ্রগতি</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">গ্রেড</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2" data-tour="attendance-tab">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">উপস্থিতি</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2" data-tour="communication-tab">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">যোগাযোগ</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">ইভেন্ট</span>
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
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
            </div>

            {/* Sidebar - Notifications */}
            <div className="space-y-6">
              <Card data-tour="notifications">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    বিজ্ঞপ্তি
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        notification.unread
                          ? 'bg-primary/5 border-primary/20'
                          : 'bg-card hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${notification.unread ? 'font-medium' : ''}`}>
                            {notification.text}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>দ্রুত কার্য</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button className="w-full p-3 rounded-lg border text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">শিক্ষককে মেসেজ করুন</span>
                    </div>
                  </button>
                  <button className="w-full p-3 rounded-lg border text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium">মিটিং সিডিউল করুন</span>
                    </div>
                  </button>
                  <button className="w-full p-3 rounded-lg border text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium">রিপোর্ট কার্ড দেখুন</span>
                    </div>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
