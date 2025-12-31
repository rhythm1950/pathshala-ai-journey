import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const events = [
  {
    id: 1,
    title: 'অভিভাবক-শিক্ষক মিটিং',
    date: '৫ জানুয়ারি ২০২৫',
    time: '৩:০০ PM - ৫:০০ PM',
    type: 'meeting',
    location: 'স্কুল অডিটোরিয়াম',
    isOnline: false,
  },
  {
    id: 2,
    title: 'বার্ষিক পরীক্ষা শুরু',
    date: '১৫ জানুয়ারি ২০২৫',
    time: '১০:০০ AM',
    type: 'exam',
    location: null,
    isOnline: false,
  },
  {
    id: 3,
    title: 'বিজ্ঞান প্রকল্প প্রদর্শনী',
    date: '২০ জানুয়ারি ২০২৫',
    time: '১১:০০ AM - ২:০০ PM',
    type: 'event',
    location: 'অনলাইন',
    isOnline: true,
  },
  {
    id: 4,
    title: 'গণিত অলিম্পিয়াড প্রস্তুতি ক্লাস',
    date: '৮ জানুয়ারি ২০২৫',
    time: '৪:০০ PM - ৫:৩০ PM',
    type: 'class',
    location: 'অনলাইন',
    isOnline: true,
  },
];

export function UpcomingEvents() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'exam':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'event':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'class':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting': return 'মিটিং';
      case 'exam': return 'পরীক্ষা';
      case 'event': return 'ইভেন্ট';
      case 'class': return 'ক্লাস';
      default: return type;
    }
  };

  const handleReminder = (eventTitle: string) => {
    toast({
      title: "রিমাইন্ডার সেট হয়েছে",
      description: `"${eventTitle}" এর জন্য রিমাইন্ডার সেট করা হয়েছে।`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          আসন্ন ইভেন্ট
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge variant="outline" className={getTypeColor(event.type)}>
                    {getTypeLabel(event.type)}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      {event.isOnline ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReminder(event.title)}
              >
                <Bell className="w-4 h-4 mr-1" />
                রিমাইন্ডার
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
