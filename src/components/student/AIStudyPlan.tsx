import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, BookOpen, Target, RefreshCw } from 'lucide-react';

interface StudyTask {
  id: number;
  titleBn: string;
  titleEn: string;
  duration: string;
  type: 'video' | 'practice' | 'quiz' | 'review';
  priority: 'high' | 'medium' | 'low';
}

const generatePlan = (): StudyTask[] => [
  { id: 1, titleBn: 'বীজগণিত ভিডিও লেকচার', titleEn: 'Algebra Video Lecture', duration: '25 min', type: 'video', priority: 'high' },
  { id: 2, titleBn: 'সমীকরণ অনুশীলন', titleEn: 'Equation Practice', duration: '20 min', type: 'practice', priority: 'high' },
  { id: 3, titleBn: 'গতকালের পুনরালোচনা', titleEn: 'Yesterday\'s Review', duration: '15 min', type: 'review', priority: 'medium' },
  { id: 4, titleBn: 'দ্রুত কুইজ', titleEn: 'Quick Quiz', duration: '10 min', type: 'quiz', priority: 'medium' },
  { id: 5, titleBn: 'জ্যামিতি মৌলিক', titleEn: 'Geometry Basics', duration: '30 min', type: 'video', priority: 'low' },
];

const typeIcons = {
  video: '🎬',
  practice: '✏️',
  quiz: '📝',
  review: '🔄',
};

const priorityColors = {
  high: 'border-l-accent',
  medium: 'border-l-secondary',
  low: 'border-l-muted-foreground',
};

export function AIStudyPlan() {
  const { language } = useLanguage();
  const [plan, setPlan] = useState<StudyTask[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPlan(generatePlan());
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          {language === 'bn' ? 'AI স্টাডি প্ল্যান' : 'AI Study Plan'}
        </h3>
        <Button 
          onClick={handleGenerate} 
          size="sm" 
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          {language === 'bn' ? 'জেনারেট করুন' : 'Generate'}
        </Button>
      </div>

      {plan.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{language === 'bn' ? 'আজকের জন্য আপনার ব্যক্তিগত স্টাডি প্ল্যান তৈরি করুন' : 'Generate your personalized study plan for today'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plan.map((task, index) => (
            <div 
              key={task.id}
              className={`flex items-center gap-4 p-4 rounded-xl bg-accent/5 border-l-4 ${priorityColors[task.priority]} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-2xl">{typeIcons[task.type]}</span>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {language === 'bn' ? task.titleBn : task.titleEn}
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{task.duration}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                {language === 'bn' ? 'শুরু করুন' : 'Start'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
