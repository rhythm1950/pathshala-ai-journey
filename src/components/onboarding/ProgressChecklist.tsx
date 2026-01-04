import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Trophy,
  RotateCcw
} from "lucide-react";
import { FeatureItem } from "@/hooks/useOnboarding";
import { cn } from "@/lib/utils";

interface ProgressChecklistProps {
  features: FeatureItem[];
  progress: { completed: number; total: number; percentage: number };
  onFeatureClick: (featureId: string) => void;
  onReset?: () => void;
  className?: string;
}

export const ProgressChecklist = ({ 
  features, 
  progress, 
  onFeatureClick, 
  onReset,
  className 
}: ProgressChecklistProps) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);

  const isComplete = progress.percentage === 100;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              {isComplete ? (
                <Trophy className="w-5 h-5 text-yellow-500" />
              ) : (
                <Sparkles className="w-5 h-5 text-primary" />
              )}
              {language === 'bn' ? 'অন্বেষণ চেকলিস্ট' : 'Exploration Checklist'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isComplete ? "default" : "secondary"} className="text-xs">
                {progress.completed}/{progress.total}
              </Badge>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>
                {language === 'bn' ? 'অগ্রগতি' : 'Progress'}
              </span>
              <span>{progress.percentage}%</span>
            </div>
            <Progress 
              value={progress.percentage} 
              className={cn("h-2", isComplete && "bg-yellow-100 [&>div]:bg-yellow-500")} 
            />
          </div>

          {/* Completion message */}
          {isComplete && (
            <div className="mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                {language === 'bn' 
                  ? '🎉 অভিনন্দন! আপনি সব বৈশিষ্ট্য অন্বেষণ করেছেন!' 
                  : '🎉 Congratulations! You\'ve explored all features!'}
              </p>
            </div>
          )}
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-2">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => onFeatureClick(feature.id)}
                className={cn(
                  "w-full p-3 rounded-lg border text-left transition-all duration-200",
                  "hover:bg-muted/50 hover:border-primary/30",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  feature.completed 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-card border-border"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {feature.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium text-sm",
                      feature.completed && "text-primary"
                    )}>
                      {language === 'bn' ? feature.nameBn : feature.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {language === 'bn' ? feature.descriptionBn : feature.description}
                    </p>
                  </div>
                  {!feature.completed && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {language === 'bn' ? 'অন্বেষণ করুন' : 'Explore'}
                    </Badge>
                  )}
                </div>
              </button>
            ))}

            {/* Reset Button */}
            {onReset && progress.completed > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onReset}
                className="w-full mt-2 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-2" />
                {language === 'bn' ? 'অগ্রগতি রিসেট করুন' : 'Reset progress'}
              </Button>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ProgressChecklist;
