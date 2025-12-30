import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Video, Play, Calendar, Clock, Users } from 'lucide-react';

const classes = [
  { 
    id: 1, 
    titleBn: 'বীজগণিত মাস্টারক্লাস', 
    titleEn: 'Algebra Masterclass', 
    teacher: 'Dr. Rahman',
    time: '10:00 AM',
    date: 'Today',
    status: 'live',
    participants: 45
  },
  { 
    id: 2, 
    titleBn: 'পদার্থবিজ্ঞান সেশন', 
    titleEn: 'Physics Session', 
    teacher: 'Prof. Ahmed',
    time: '2:00 PM',
    date: 'Today',
    status: 'upcoming',
    participants: 32
  },
  { 
    id: 3, 
    titleBn: 'রসায়ন ল্যাব', 
    titleEn: 'Chemistry Lab', 
    teacher: 'Ms. Fatima',
    time: '4:00 PM',
    date: 'Tomorrow',
    status: 'upcoming',
    participants: 28
  },
];

const recordings = [
  { 
    id: 1, 
    titleBn: 'জ্যামিতি পর্ব ১', 
    titleEn: 'Geometry Part 1', 
    teacher: 'Dr. Rahman',
    duration: '45 min',
    views: 234
  },
  { 
    id: 2, 
    titleBn: 'ত্রিকোণমিতি পরিচিতি', 
    titleEn: 'Intro to Trigonometry', 
    teacher: 'Prof. Ahmed',
    duration: '52 min',
    views: 189
  },
];

export function LiveClasses() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'live' | 'recordings'>('live');

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          {language === 'bn' ? 'লাইভ ক্লাস' : 'Live Classes'}
        </h3>
        
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === 'live' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
          >
            {language === 'bn' ? 'লাইভ' : 'Live'}
          </button>
          <button
            onClick={() => setActiveTab('recordings')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === 'recordings' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground'
            }`}
          >
            {language === 'bn' ? 'রেকর্ডিং' : 'Recordings'}
          </button>
        </div>
      </div>

      {activeTab === 'live' ? (
        <div className="space-y-3">
          {classes.map((cls) => (
            <div 
              key={cls.id}
              className={`p-4 rounded-xl border ${
                cls.status === 'live' 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  cls.status === 'live' 
                    ? 'bg-accent text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Video className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">
                      {language === 'bn' ? cls.titleBn : cls.titleEn}
                    </p>
                    {cls.status === 'live' && (
                      <span className="px-2 py-0.5 text-xs bg-accent text-white rounded-full animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{cls.teacher}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {cls.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {cls.participants}
                    </span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className={cls.status === 'live' 
                    ? 'bg-accent hover:bg-accent/90' 
                    : ''
                  }
                  variant={cls.status === 'live' ? 'default' : 'outline'}
                >
                  {cls.status === 'live' 
                    ? (language === 'bn' ? 'যোগ দিন' : 'Join Now')
                    : (language === 'bn' ? 'রিমাইন্ডার' : 'Remind Me')
                  }
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {recordings.map((rec) => (
            <div 
              key={rec.id}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Play className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {language === 'bn' ? rec.titleBn : rec.titleEn}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{rec.teacher}</span>
                    <span>{rec.duration}</span>
                    <span>{rec.views} {language === 'bn' ? 'ভিউ' : 'views'}</span>
                  </div>
                </div>
                
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-1" />
                  {language === 'bn' ? 'দেখুন' : 'Watch'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
