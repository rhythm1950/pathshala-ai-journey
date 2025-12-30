import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Star, Zap, Award, Target } from 'lucide-react';

const badges = [
  { id: 1, nameBn: 'প্রথম পদক্ষেপ', nameEn: 'First Steps', icon: '🎯', earned: true },
  { id: 2, nameBn: 'গণিত তারকা', nameEn: 'Math Star', icon: '⭐', earned: true },
  { id: 3, nameBn: 'সপ্তাহের যোদ্ধা', nameEn: 'Week Warrior', icon: '⚔️', earned: true },
  { id: 4, nameBn: 'কুইজ মাস্টার', nameEn: 'Quiz Master', icon: '🧠', earned: false },
  { id: 5, nameBn: 'পারফেক্ট স্কোর', nameEn: 'Perfect Score', icon: '💯', earned: false },
  { id: 6, nameBn: 'দলনেতা', nameEn: 'Team Leader', icon: '👑', earned: false },
];

export function Gamification() {
  const { language } = useLanguage();
  const [streak] = useState(12);
  const [level] = useState(7);
  const [xp] = useState(2450);
  const [xpToNext] = useState(3000);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {language === 'bn' ? '🏆 আমার অগ্রগতি' : '🏆 My Progress'}
      </h3>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Streak */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
          <Flame className="w-8 h-8 mx-auto text-accent mb-2" />
          <p className="text-2xl font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">
            {language === 'bn' ? 'দিনের স্ট্রিক' : 'Day Streak'}
          </p>
        </div>

        {/* Level */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <Zap className="w-8 h-8 mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{level}</p>
          <p className="text-xs text-muted-foreground">
            {language === 'bn' ? 'বর্তমান লেভেল' : 'Current Level'}
          </p>
        </div>

        {/* XP */}
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20">
          <Star className="w-8 h-8 mx-auto text-secondary mb-2" />
          <p className="text-2xl font-bold text-foreground">{xp}</p>
          <p className="text-xs text-muted-foreground">
            {language === 'bn' ? 'মোট XP' : 'Total XP'}
          </p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {language === 'bn' ? `লেভেল ${level}` : `Level ${level}`}
          </span>
          <span className="text-foreground font-medium">{xp} / {xpToNext} XP</span>
        </div>
        <Progress value={(xp / xpToNext) * 100} className="h-3" />
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'bn' 
            ? `পরবর্তী লেভেলে ${xpToNext - xp} XP প্রয়োজন` 
            : `${xpToNext - xp} XP to next level`}
        </p>
      </div>

      {/* Badges */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Award className="w-4 h-4" />
          {language === 'bn' ? 'ব্যাজ সংগ্রহ' : 'Badge Collection'}
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`text-center p-3 rounded-xl transition-all duration-300 ${
                badge.earned 
                  ? 'bg-primary/10 border border-primary/20 hover:scale-105' 
                  : 'bg-muted/30 opacity-50 grayscale'
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-xs mt-1 font-medium truncate">
                {language === 'bn' ? badge.nameBn : badge.nameEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
