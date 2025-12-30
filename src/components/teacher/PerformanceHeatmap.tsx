import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { studentPerformanceHeatmap } from "@/data/demoData";

export function PerformanceHeatmap() {
  const { language } = useLanguage();

  const weeks = [1, 2, 3, 4];

  const getColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 75) return 'bg-green-400';
    if (value >= 60) return 'bg-yellow-400';
    if (value >= 40) return 'bg-orange-400';
    return 'bg-red-400';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {language === 'bn' ? 'ক্লাস পারফরম্যান্স হিটম্যাপ' : 'Class Performance Heatmap'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex gap-2 pl-24">
            {weeks.map((week) => (
              <div key={week} className="w-10 text-center text-xs text-muted-foreground">
                {language === 'bn' ? `সপ্তাহ ${week}` : `W${week}`}
              </div>
            ))}
          </div>
          {studentPerformanceHeatmap.map((student, studentIndex) => (
            <div key={studentIndex} className="flex items-center gap-2">
              <span className="w-20 text-xs text-muted-foreground truncate">
                {language === 'bn' ? student.student : student.studentEn}
              </span>
              {[student.week1, student.week2, student.week3, student.week4].map((value, weekIndex) => (
                <div
                  key={weekIndex}
                  className={`w-10 h-10 rounded-md ${getColor(value)} flex items-center justify-center text-white text-xs font-medium transition-transform hover:scale-110 cursor-pointer`}
                  title={`${value}%`}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-400"></div>
            <span>{language === 'bn' ? 'কম' : 'Low'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-400"></div>
            <span>{language === 'bn' ? 'মাঝারি' : 'Medium'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span>{language === 'bn' ? 'উচ্চ' : 'High'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
