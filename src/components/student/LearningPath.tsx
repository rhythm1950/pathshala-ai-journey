import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Lock } from 'lucide-react';

const modules = [
  { id: 1, titleBn: 'গণিতের মৌলিক ধারণা', titleEn: 'Basic Math Concepts', progress: 100, completed: true, locked: false },
  { id: 2, titleBn: 'বীজগণিত পরিচিতি', titleEn: 'Introduction to Algebra', progress: 75, completed: false, locked: false },
  { id: 3, titleBn: 'জ্যামিতি', titleEn: 'Geometry', progress: 30, completed: false, locked: false },
  { id: 4, titleBn: 'ত্রিকোণমিতি', titleEn: 'Trigonometry', progress: 0, completed: false, locked: true },
  { id: 5, titleBn: 'ক্যালকুলাস', titleEn: 'Calculus', progress: 0, completed: false, locked: true },
];

export function LearningPath() {
  const { language } = useLanguage();

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {language === 'bn' ? '📚 আমার শিক্ষা পথ' : '📚 My Learning Path'}
      </h3>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted" />
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                module.locked 
                  ? 'bg-muted/30 opacity-60' 
                  : module.completed 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-card hover:bg-accent/5 border border-border/30'
              }`}
            >
              {/* Status icon */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                module.completed 
                  ? 'bg-primary text-primary-foreground' 
                  : module.locked 
                    ? 'bg-muted text-muted-foreground' 
                    : 'bg-secondary text-secondary-foreground'
              }`}>
                {module.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : module.locked ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${module.locked ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {language === 'bn' ? module.titleBn : module.titleEn}
                </p>
                {!module.locked && (
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={module.progress} className="h-2 flex-1" />
                    <span className="text-sm text-muted-foreground font-medium">
                      {module.progress}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
