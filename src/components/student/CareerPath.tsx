import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Compass, ChevronRight, Star, Briefcase } from 'lucide-react';

const careers = [
  { 
    id: 1, 
    titleBn: 'সফটওয়্যার ইঞ্জিনিয়ার', 
    titleEn: 'Software Engineer', 
    match: 92, 
    icon: '💻',
    skills: ['Mathematics', 'Logic', 'Problem Solving']
  },
  { 
    id: 2, 
    titleBn: 'ডাটা সায়েন্টিস্ট', 
    titleEn: 'Data Scientist', 
    match: 88, 
    icon: '📊',
    skills: ['Statistics', 'Mathematics', 'Programming']
  },
  { 
    id: 3, 
    titleBn: 'চিকিৎসক', 
    titleEn: 'Doctor', 
    match: 75, 
    icon: '⚕️',
    skills: ['Biology', 'Chemistry', 'Communication']
  },
  { 
    id: 4, 
    titleBn: 'প্রকৌশলী', 
    titleEn: 'Engineer', 
    match: 85, 
    icon: '⚙️',
    skills: ['Physics', 'Mathematics', 'Design']
  },
];

export function CareerPath() {
  const { language } = useLanguage();
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Compass className="w-5 h-5 text-primary" />
        {language === 'bn' ? 'ক্যারিয়ার পাথ সুপারিশ' : 'Career Path Recommendations'}
      </h3>

      <div className="space-y-3">
        {careers.map((career) => (
          <div 
            key={career.id}
            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              selectedCareer === career.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border/50 hover:border-primary/50 hover:bg-accent/5'
            }`}
            onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{career.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">
                    {language === 'bn' ? career.titleBn : career.titleEn}
                  </p>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{career.match}%</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      {language === 'bn' ? 'মিল' : 'match'}
                    </span>
                  </div>
                </div>
                
                {selectedCareer === career.id && (
                  <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in">
                    <p className="text-sm text-muted-foreground mb-2">
                      {language === 'bn' ? 'প্রয়োজনীয় দক্ষতা:' : 'Required Skills:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" className="mt-3 w-full" variant="outline">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'রোডম্যাপ দেখুন' : 'View Roadmap'}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
