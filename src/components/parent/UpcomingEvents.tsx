import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  {
    id: 1, title: 'অভিভাবক-শিক্ষক মিটিং', titleEn: 'Parent-Teacher Meeting',
    date: '৫ জানুয়ারি ২০২৫', dateEn: 'January 5, 2025',
    time: '৩:০০ PM - ৫:০০ PM', timeEn: '3:00 PM - 5:00 PM',
    type: 'meeting', location: 'স্কুল অডিটোরিয়াম', locationEn: 'School Auditorium', isOnline: false,
  },
  {
    id: 2, title: 'বার্ষিক পরীক্ষা শুরু', titleEn: 'Annual Exam Begins',
    date: '১৫ জানুয়ারি ২০২৫', dateEn: 'January 15, 2025',
    time: '১০:০০ AM', timeEn: '10:00 AM',
    type: 'exam', location: null, locationEn: null, isOnline: false,
  },
  {
    id: 3, title: 'বিজ্ঞান প্রকল্প প্রদর্শনী', titleEn: 'Science Project Exhibition',
    date: '২০ জানুয়ারি ২০২৫', dateEn: 'January 20, 2025',
    time: '১১:০০ AM - ২:০০ PM', timeEn: '11:00 AM - 2:00 PM',
    type: 'event', location: 'অনলাইন', locationEn: 'Online', isOnline: true,
  },
  {
    id: 4, title: 'গণিত অলিম্পিয়াড প্রস্তুতি ক্লাস', titleEn: 'Math Olympiad Preparation',
    date: '৮ জানুয়ারি ২০২৫', dateEn: 'January 8, 2025',
    time: '৪:০০ PM - ৫:৩০ PM', timeEn: '4:00 PM - 5:30 PM',
    type: 'class', location: 'অনলাইন', locationEn: 'Online', isOnline: true,
  },
];

export function UpcomingEvents() {
  const { language } = useLanguage();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'exam': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'event': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'class': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    if (language === 'bn') {
      switch (type) {
        case 'meeting': return 'মিটিং';
        case 'exam': return 'পরীক্ষা';
        case 'event': return 'ইভেন্ট';
        case 'class': return 'ক্লাস';
        default: return type;
      }
    }
    switch (type) {
      case 'meeting': return 'Meeting';
      case 'exam': return 'Exam';
      case 'event': return 'Event';
      case 'class': return 'Class';
      default: return type;
    }
  };

  const handleReminder = (eventTitle: string) => {
    toast({
      title: language === 'bn' ? 'রিমাইন্ডার সেট হয়েছে' : 'Reminder Set',
      description: language === 'bn'
        ? `"${eventTitle}" এর জন্য রিমাইন্ডার সেট করা হয়েছে।`
        : `Reminder has been set for "${eventTitle}".`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {language === 'bn' ? 'আসন্ন ইভেন্ট' : 'Upcoming Events'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{language === 'bn' ? event.title : event.titleEn}</h4>
                  <Badge variant="outline" className={getTypeColor(event.type)}>
                    {getTypeLabel(event.type)}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{language === 'bn' ? event.date : event.dateEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{language === 'bn' ? event.time : event.timeEn}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      {event.isOnline ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      <span>{language === 'bn' ? event.location : event.locationEn}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleReminder(language === 'bn' ? event.title : event.titleEn)}>
                <Bell className="w-4 h-4 mr-1" />
                {language === 'bn' ? 'রিমাইন্ডার' : 'Reminder'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
