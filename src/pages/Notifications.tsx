import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  Trophy,
  BookOpen,
  MessageSquare,
  Calendar,
  Trash2,
  CheckCheck,
  Filter,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  type: 'success' | 'info' | 'warning' | 'achievement' | 'course' | 'message' | 'event';
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  time: string;
  timeEn: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    title: 'পরীক্ষায় সফল!',
    titleEn: 'Exam Passed!',
    message: 'আপনি গণিত পরীক্ষায় ৯২% পেয়েছেন। অভিনন্দন!',
    messageEn: 'You scored 92% in the Math exam. Congratulations!',
    time: '১০ মিনিট আগে',
    timeEn: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'নতুন ব্যাজ অর্জন!',
    titleEn: 'New Badge Earned!',
    message: 'আপনি "সপ্তাহের তারকা" ব্যাজ অর্জন করেছেন!',
    messageEn: 'You earned the "Star of the Week" badge!',
    time: '১ ঘন্টা আগে',
    timeEn: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'course',
    title: 'নতুন লেসন আনলক',
    titleEn: 'New Lesson Unlocked',
    message: 'পাইথন কোর্সে নতুন লেসন "ফাংশন" এখন উপলব্ধ।',
    messageEn: 'New lesson "Functions" is now available in the Python course.',
    time: '২ ঘন্টা আগে',
    timeEn: '2 hours ago',
    read: false,
  },
  {
    id: 4,
    type: 'message',
    title: 'শিক্ষকের বার্তা',
    titleEn: 'Teacher Message',
    message: 'ড. করিম আপনার অ্যাসাইনমেন্টে মন্তব্য করেছেন।',
    messageEn: 'Dr. Karim commented on your assignment.',
    time: '৩ ঘন্টা আগে',
    timeEn: '3 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'event',
    title: 'আগামীকাল লাইভ ক্লাস',
    titleEn: 'Live Class Tomorrow',
    message: 'অ্যালগরিদম মাস্টারক্লাস আগামীকাল সকাল ১০টায়।',
    messageEn: 'Algorithm Masterclass tomorrow at 10 AM.',
    time: '৫ ঘন্টা আগে',
    timeEn: '5 hours ago',
    read: true,
  },
  {
    id: 6,
    type: 'warning',
    title: 'অ্যাসাইনমেন্ট ডেডলাইন',
    titleEn: 'Assignment Deadline',
    message: 'বাইনারি সার্চ অ্যাসাইনমেন্ট জমা দেওয়ার শেষ দিন আগামীকাল।',
    messageEn: 'Binary Search assignment deadline is tomorrow.',
    time: 'গতকাল',
    timeEn: 'Yesterday',
    read: true,
  },
  {
    id: 7,
    type: 'info',
    title: 'সিস্টেম আপডেট',
    titleEn: 'System Update',
    message: 'প্ল্যাটফর্মে নতুন ফিচার যোগ করা হয়েছে। দেখুন কী নতুন!',
    messageEn: 'New features have been added to the platform. See what\'s new!',
    time: '২ দিন আগে',
    timeEn: '2 days ago',
    read: true,
  },
];

export default function Notifications() {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<string>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'achievement':
        return <Trophy className="h-5 w-5 text-accent" />;
      case 'course':
        return <BookOpen className="h-5 w-5 text-primary" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-secondary" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    toast({
      title: language === 'bn' ? 'পড়া হয়েছে' : 'Marked as read',
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: language === 'bn' ? 'সব পড়া হয়েছে' : 'All marked as read',
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: language === 'bn' ? 'মুছে ফেলা হয়েছে' : 'Deleted',
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: language === 'bn' ? 'সব মুছে ফেলা হয়েছে' : 'All cleared',
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bell className="w-8 h-8 text-primary" />
              {language === 'bn' ? 'বিজ্ঞপ্তি' : 'Notifications'}
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'bn' 
                ? 'আপনার সব আপডেট এবং বিজ্ঞপ্তি এখানে দেখুন'
                : 'View all your updates and notifications here'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCheck className="w-4 h-4 mr-2" />
              {language === 'bn' ? 'সব পড়া' : 'Mark all read'}
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
              <Trash2 className="w-4 h-4 mr-2" />
              {language === 'bn' ? 'সব মুছুন' : 'Clear all'}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="flex flex-wrap h-auto gap-2">
            <TabsTrigger value="all" className="flex-shrink-0">
              {language === 'bn' ? 'সব' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-shrink-0">
              {language === 'bn' ? 'অপঠিত' : 'Unread'}
            </TabsTrigger>
            <TabsTrigger value="achievement" className="flex-shrink-0">
              <Trophy className="w-4 h-4 mr-1" />
              {language === 'bn' ? 'অর্জন' : 'Achievements'}
            </TabsTrigger>
            <TabsTrigger value="course" className="flex-shrink-0">
              <BookOpen className="w-4 h-4 mr-1" />
              {language === 'bn' ? 'কোর্স' : 'Courses'}
            </TabsTrigger>
            <TabsTrigger value="message" className="flex-shrink-0">
              <MessageSquare className="w-4 h-4 mr-1" />
              {language === 'bn' ? 'বার্তা' : 'Messages'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'bn' ? 'কোনো বিজ্ঞপ্তি নেই' : 'No notifications'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'bn' 
                  ? 'আপনার কোনো নতুন বিজ্ঞপ্তি নেই'
                  : 'You have no new notifications'}
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${
                  !notification.read
                    ? 'bg-primary/5 border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>
                            {language === 'bn' ? notification.title : notification.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {language === 'bn' ? notification.message : notification.messageEn}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {language === 'bn' ? notification.time : notification.timeEn}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
