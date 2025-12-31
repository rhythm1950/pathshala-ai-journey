import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, Minus, BookOpen, Clock, Target } from 'lucide-react';

const childrenData = [
  {
    id: 1,
    name: 'রাহুল শর্মা',
    class: 'অষ্টম শ্রেণি',
    avatar: '/placeholder.svg',
    overallProgress: 78,
    trend: 'up',
    subjects: [
      { name: 'গণিত', progress: 85, grade: 'A', trend: 'up' },
      { name: 'বাংলা', progress: 72, grade: 'B+', trend: 'stable' },
      { name: 'ইংরেজি', progress: 80, grade: 'A-', trend: 'up' },
      { name: 'বিজ্ঞান', progress: 68, grade: 'B', trend: 'down' },
    ],
    stats: {
      hoursThisWeek: 12,
      lessonsCompleted: 8,
      streak: 7,
    },
  },
];

export function ChildProgress() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (grade.startsWith('B')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    if (grade.startsWith('C')) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-red-500/10 text-red-600 border-red-500/20';
  };

  return (
    <div className="space-y-6">
      {childrenData.map((child) => (
        <Card key={child.id} className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={child.avatar} alt={child.name} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {child.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{child.name}</CardTitle>
                  {getTrendIcon(child.trend)}
                </div>
                <p className="text-muted-foreground">{child.class}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{child.overallProgress}%</div>
                <p className="text-sm text-muted-foreground">সার্বিক অগ্রগতি</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{child.stats.hoursThisWeek}</div>
                <div className="text-xs text-muted-foreground">ঘন্টা এই সপ্তাহে</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">{child.stats.lessonsCompleted}</div>
                <div className="text-xs text-muted-foreground">লেসন সম্পন্ন</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">{child.stats.streak}🔥</div>
                <div className="text-xs text-muted-foreground">দিনের ধারা</div>
              </div>
            </div>

            {/* Subject Progress */}
            <h4 className="font-semibold mb-4">বিষয়ভিত্তিক অগ্রগতি</h4>
            <div className="space-y-4">
              {child.subjects.map((subject, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subject.name}</span>
                      {getTrendIcon(subject.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getGradeColor(subject.grade)}>
                        {subject.grade}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
