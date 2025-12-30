import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Lightbulb, Play, BookOpen, PenTool, ArrowRight } from 'lucide-react';

const recommendations = [
  { 
    id: 1, 
    titleBn: 'বীজগণিত: সমীকরণ সমাধান', 
    titleEn: 'Algebra: Solving Equations', 
    type: 'video',
    duration: '15 min',
    reason: 'Based on your recent progress'
  },
  { 
    id: 2, 
    titleBn: 'ত্রিকোণমিতি অনুশীলন', 
    titleEn: 'Trigonometry Practice', 
    type: 'practice',
    duration: '20 min',
    reason: 'Strengthen weak areas'
  },
  { 
    id: 3, 
    titleBn: 'পদার্থবিজ্ঞান নোট', 
    titleEn: 'Physics Notes', 
    type: 'reading',
    duration: '10 min',
    reason: 'Prepare for tomorrow\'s class'
  },
];

const typeConfig = {
  video: { icon: Play, color: 'text-accent', bg: 'bg-accent/10' },
  practice: { icon: PenTool, color: 'text-primary', bg: 'bg-primary/10' },
  reading: { icon: BookOpen, color: 'text-secondary', bg: 'bg-secondary/10' },
};

export function DailyRecommendations() {
  const { language } = useLanguage();

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-secondary" />
        {language === 'bn' ? 'আজকের সুপারিশ' : 'Today\'s Recommendations'}
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const config = typeConfig[rec.type as keyof typeof typeConfig];
          const Icon = config.icon;
          
          return (
            <div 
              key={rec.id}
              className="group p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center ${config.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {language === 'bn' ? rec.titleBn : rec.titleEn}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>{rec.duration}</span>
                    <span>•</span>
                    <span className="truncate">{rec.reason}</span>
                  </div>
                </div>
                
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full mt-4">
        {language === 'bn' ? 'সব দেখুন' : 'View All'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
