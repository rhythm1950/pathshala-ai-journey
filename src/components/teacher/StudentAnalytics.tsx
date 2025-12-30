import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { BarChart3, TrendingUp, TrendingDown, Minus, User } from "lucide-react";

const studentStats = [
  { name: 'রাফি আহমেদ', nameEn: 'Rafi Ahmed', progress: 92, trend: 'up', attendance: 95 },
  { name: 'সারা খান', nameEn: 'Sara Khan', progress: 88, trend: 'up', attendance: 98 },
  { name: 'আরিফ হোসেন', nameEn: 'Arif Hossain', progress: 75, trend: 'stable', attendance: 85 },
  { name: 'মিতা রহমান', nameEn: 'Mita Rahman', progress: 82, trend: 'up', attendance: 90 },
  { name: 'করিম উদ্দিন', nameEn: 'Karim Uddin', progress: 68, trend: 'down', attendance: 78 },
];

export function StudentAnalytics() {
  const { language } = useLanguage();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          {language === 'bn' ? 'শিক্ষার্থী বিশ্লেষণ' : 'Student Analytics'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studentStats.map((student, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium">
                    {language === 'bn' ? student.name : student.nameEn}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(student.trend)}
                  <span className="text-sm font-semibold">{student.progress}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{language === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
                  <span>{language === 'bn' ? 'উপস্থিতি' : 'Attendance'}: {student.attendance}%</span>
                </div>
                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full transition-all ${getProgressColor(student.progress)}`}
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-500">3</p>
              <p className="text-xs text-muted-foreground">
                {language === 'bn' ? 'উন্নতি' : 'Improving'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">1</p>
              <p className="text-xs text-muted-foreground">
                {language === 'bn' ? 'স্থির' : 'Stable'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">1</p>
              <p className="text-xs text-muted-foreground">
                {language === 'bn' ? 'সাহায্য প্রয়োজন' : 'Needs Help'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
