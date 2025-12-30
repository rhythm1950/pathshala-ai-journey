import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const skills = [
  { id: 1, nameBn: 'গণিত', nameEn: 'Mathematics', score: 85, trend: 'up', change: 5 },
  { id: 2, nameBn: 'পদার্থবিজ্ঞান', nameEn: 'Physics', score: 72, trend: 'up', change: 3 },
  { id: 3, nameBn: 'রসায়ন', nameEn: 'Chemistry', score: 68, trend: 'stable', change: 0 },
  { id: 4, nameBn: 'জীববিজ্ঞান', nameEn: 'Biology', score: 78, trend: 'down', change: 2 },
  { id: 5, nameBn: 'ইংরেজি', nameEn: 'English', score: 90, trend: 'up', change: 8 },
  { id: 6, nameBn: 'বাংলা', nameEn: 'Bengali', score: 95, trend: 'stable', change: 0 },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

const getProgressColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

export function SkillAnalysis() {
  const { language } = useLanguage();

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {language === 'bn' ? '📊 দক্ষতা বিশ্লেষণ' : '📊 Skill Analysis'}
      </h3>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">
                {language === 'bn' ? skill.nameBn : skill.nameEn}
              </span>
              <div className="flex items-center gap-2">
                <TrendIcon trend={skill.trend} />
                <span className={`font-bold ${getScoreColor(skill.score)}`}>
                  {skill.score}%
                </span>
                {skill.change > 0 && (
                  <span className={`text-xs ${skill.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {skill.trend === 'up' ? '+' : '-'}{skill.change}%
                  </span>
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(skill.score)}`}
                style={{ width: `${skill.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <p className="text-sm text-foreground">
          {language === 'bn' 
            ? '💡 পরামর্শ: রসায়ন এবং জীববিজ্ঞানে আরও মনোযোগ দিন। গণিত ও ইংরেজিতে দুর্দান্ত অগ্রগতি!' 
            : '💡 Tip: Focus more on Chemistry and Biology. Great progress in Math & English!'}
        </p>
      </div>
    </div>
  );
}
