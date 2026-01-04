import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  X, ChevronLeft, ChevronRight, Sparkles, 
  BookOpen, Trophy, Brain, Users, Calendar,
  BarChart3, FileText, MessageSquare, Bell,
  GraduationCap, Target, Zap
} from "lucide-react";

export type UserRole = "student" | "teacher" | "parent";

interface TourStep {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: React.ReactNode;
  target?: string; // data-tour attribute value to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const studentTourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Pathshala AI! 🎉",
    titleBn: "পাঠশালা AI-তে স্বাগতম! 🎉",
    description: "Your personalized learning journey starts here. Let's explore the key features that will help you succeed.",
    descriptionBn: "আপনার ব্যক্তিগতকৃত শেখার যাত্রা এখানে শুরু। আসুন মূল বৈশিষ্ট্যগুলি অন্বেষণ করি যা আপনাকে সফল হতে সাহায্য করবে।",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    position: 'center'
  },
  {
    id: "ai-study-plan",
    title: "AI Study Planner",
    titleBn: "AI স্টাডি প্ল্যানার",
    description: "Get smart study schedules that adapt to your progress and optimize your learning time.",
    descriptionBn: "স্মার্ট স্টাডি শিডিউল পান যা আপনার অগ্রগতির সাথে মানিয়ে নেয়।",
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    target: "ai-study-plan",
    position: 'bottom'
  },
  {
    id: "gamification",
    title: "Earn Rewards & Badges",
    titleBn: "পুরস্কার ও ব্যাজ অর্জন করুন",
    description: "Complete lessons, maintain streaks, and earn XP to unlock achievements and certificates.",
    descriptionBn: "পাঠ সম্পূর্ণ করুন, স্ট্রিক বজায় রাখুন এবং অর্জন আনলক করতে XP অর্জন করুন।",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    target: "gamification",
    position: 'left'
  },
  {
    id: "learning-path",
    title: "Your Learning Path",
    titleBn: "আপনার শেখার পথ",
    description: "Follow your personalized curriculum designed by AI based on your goals and learning style.",
    descriptionBn: "AI দ্বারা ডিজাইন করা আপনার ব্যক্তিগতকৃত পাঠ্যক্রম অনুসরণ করুন।",
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    target: "learning-path",
    position: 'left'
  },
  {
    id: "skill-analysis",
    title: "Track Your Skills",
    titleBn: "আপনার দক্ষতা ট্র্যাক করুন",
    description: "See detailed analysis of your strengths and areas for improvement with AI recommendations.",
    descriptionBn: "AI সুপারিশ সহ আপনার শক্তি এবং উন্নতির ক্ষেত্রগুলির বিস্তারিত বিশ্লেষণ দেখুন।",
    icon: <Target className="w-8 h-8 text-green-500" />,
    target: "skill-analysis",
    position: 'right'
  },
  {
    id: "ready",
    title: "You're All Set! 🚀",
    titleBn: "আপনি প্রস্তুত! 🚀",
    description: "Start exploring your dashboard. Remember, consistency is key to success!",
    descriptionBn: "আপনার ড্যাশবোর্ড অন্বেষণ শুরু করুন। মনে রাখবেন, ধারাবাহিকতাই সাফল্যের চাবিকাঠি!",
    icon: <Zap className="w-8 h-8 text-primary" />,
    position: 'center'
  }
];

const teacherTourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome, Educator! 🎓",
    titleBn: "স্বাগতম, শিক্ষক! 🎓",
    description: "Pathshala AI empowers you with smart tools to enhance your teaching effectiveness.",
    descriptionBn: "পাঠশালা AI আপনাকে শিক্ষাদানের কার্যকারিতা বাড়াতে স্মার্ট সরঞ্জাম দিয়ে ক্ষমতায়িত করে।",
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    position: 'center'
  },
  {
    id: "performance-heatmap",
    title: "Student Performance Heatmap",
    titleBn: "শিক্ষার্থী পারফরম্যান্স হিটম্যাপ",
    description: "Visualize class performance at a glance. Identify struggling students and topics that need attention.",
    descriptionBn: "এক নজরে ক্লাসের পারফরম্যান্স দেখুন। সংগ্রামী শিক্ষার্থী এবং মনোযোগ প্রয়োজন এমন বিষয় চিহ্নিত করুন।",
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    target: "performance-heatmap",
    position: 'right'
  },
  {
    id: "ai-content",
    title: "AI Content Generator",
    titleBn: "AI কন্টেন্ট জেনারেটর",
    description: "Create lesson plans, quizzes, and educational content in seconds with AI assistance.",
    descriptionBn: "AI সহায়তায় সেকেন্ডের মধ্যে পাঠ পরিকল্পনা, কুইজ এবং শিক্ষামূলক বিষয়বস্তু তৈরি করুন।",
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    target: "ai-content",
    position: 'left'
  },
  {
    id: "assignment-grader",
    title: "Smart Assignment Grading",
    titleBn: "স্মার্ট অ্যাসাইনমেন্ট গ্রেডিং",
    description: "Get AI-powered grading suggestions and provide detailed feedback efficiently.",
    descriptionBn: "AI-চালিত গ্রেডিং পরামর্শ পান এবং দক্ষতার সাথে বিস্তারিত প্রতিক্রিয়া প্রদান করুন।",
    icon: <FileText className="w-8 h-8 text-green-500" />,
    target: "assignment-grader",
    position: 'right'
  },
  {
    id: "class-scheduler",
    title: "Class Scheduler",
    titleBn: "ক্লাস শিডিউলার",
    description: "Organize your classes, set reminders, and manage your teaching schedule seamlessly.",
    descriptionBn: "আপনার ক্লাস সংগঠিত করুন, রিমাইন্ডার সেট করুন এবং শিক্ষাদানের সময়সূচী পরিচালনা করুন।",
    icon: <Calendar className="w-8 h-8 text-orange-500" />,
    target: "class-scheduler",
    position: 'left'
  },
  {
    id: "ready",
    title: "Ready to Inspire! ✨",
    titleBn: "অনুপ্রাণিত করতে প্রস্তুত! ✨",
    description: "Your dashboard is set up. Start creating impactful learning experiences!",
    descriptionBn: "আপনার ড্যাশবোর্ড সেট আপ হয়েছে। প্রভাবশালী শেখার অভিজ্ঞতা তৈরি শুরু করুন!",
    icon: <Zap className="w-8 h-8 text-primary" />,
    position: 'center'
  }
];

const parentTourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Parent Portal! 👨‍👩‍👧",
    titleBn: "অভিভাবক পোর্টালে স্বাগতম! 👨‍👩‍👧",
    description: "Stay connected with your child's education journey and support their success.",
    descriptionBn: "আপনার সন্তানের শিক্ষা যাত্রার সাথে সংযুক্ত থাকুন এবং তাদের সাফল্যে সহায়তা করুন।",
    icon: <Users className="w-8 h-8 text-primary" />,
    position: 'center'
  },
  {
    id: "child-progress",
    title: "Track Progress",
    titleBn: "অগ্রগতি ট্র্যাক করুন",
    description: "View detailed academic progress, grades, and performance trends for each child.",
    descriptionBn: "প্রতিটি সন্তানের বিস্তারিত একাডেমিক অগ্রগতি, গ্রেড এবং পারফরম্যান্স প্রবণতা দেখুন।",
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    target: "child-progress",
    position: 'bottom'
  },
  {
    id: "attendance",
    title: "Attendance Calendar",
    titleBn: "উপস্থিতি ক্যালেন্ডার",
    description: "Monitor attendance patterns and receive alerts for any absences.",
    descriptionBn: "উপস্থিতির ধরণ পর্যবেক্ষণ করুন এবং যেকোনো অনুপস্থিতির জন্য সতর্কতা পান।",
    icon: <Calendar className="w-8 h-8 text-green-500" />,
    target: "attendance-tab",
    position: 'bottom'
  },
  {
    id: "teacher-communication",
    title: "Connect with Teachers",
    titleBn: "শিক্ষকদের সাথে সংযোগ করুন",
    description: "Send messages, schedule meetings, and stay in touch with your child's teachers.",
    descriptionBn: "বার্তা পাঠান, মিটিং শিডিউল করুন এবং আপনার সন্তানের শিক্ষকদের সাথে যোগাযোগ রাখুন।",
    icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
    target: "communication-tab",
    position: 'bottom'
  },
  {
    id: "notifications",
    title: "Stay Informed",
    titleBn: "অবগত থাকুন",
    description: "Get real-time notifications about grades, events, and important updates.",
    descriptionBn: "গ্রেড, ইভেন্ট এবং গুরুত্বপূর্ণ আপডেট সম্পর্কে রিয়েল-টাইম বিজ্ঞপ্তি পান।",
    icon: <Bell className="w-8 h-8 text-orange-500" />,
    target: "notifications",
    position: 'left'
  },
  {
    id: "ready",
    title: "You're Connected! 💪",
    titleBn: "আপনি সংযুক্ত! 💪",
    description: "Explore the dashboard and be an active part of your child's educational journey.",
    descriptionBn: "ড্যাশবোর্ড অন্বেষণ করুন এবং আপনার সন্তানের শিক্ষা যাত্রার সক্রিয় অংশ হন।",
    icon: <Zap className="w-8 h-8 text-primary" />,
    position: 'center'
  }
];

const getTourSteps = (role: UserRole): TourStep[] => {
  switch (role) {
    case "student":
      return studentTourSteps;
    case "teacher":
      return teacherTourSteps;
    case "parent":
      return parentTourSteps;
    default:
      return studentTourSteps;
  }
};

interface TooltipPosition {
  top: number;
  left: number;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface OnboardingTourProps {
  role: UserRole;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTour = ({ role, onComplete, onSkip }: OnboardingTourProps) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);

  const steps = getTourSteps(role);
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const calculatePosition = useCallback((rect: DOMRect, position: string): TooltipPosition => {
    const tooltipWidth = 400;
    const tooltipHeight = 350;
    const padding = 16;
    const arrowOffset = 12;

    let top = 0;
    let left = 0;
    let placement: TooltipPosition['placement'] = position as TooltipPosition['placement'];

    switch (position) {
      case 'top':
        top = rect.top - tooltipHeight - arrowOffset;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = rect.bottom + arrowOffset;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.left - tooltipWidth - arrowOffset;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.right + arrowOffset;
        break;
      default:
        placement = 'center';
    }

    // Boundary checks
    if (left < padding) left = padding;
    if (left + tooltipWidth > window.innerWidth - padding) {
      left = window.innerWidth - tooltipWidth - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipHeight > window.innerHeight - padding) {
      top = window.innerHeight - tooltipHeight - padding;
    }

    return { top, left, placement };
  }, []);

  useEffect(() => {
    if (step.target) {
      const element = document.querySelector(`[data-tour="${step.target}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        
        // Scroll element into view smoothly
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Recalculate after scroll
        setTimeout(() => {
          const newRect = element.getBoundingClientRect();
          setTargetRect(newRect);
          setTooltipPosition(calculatePosition(newRect, step.position || 'bottom'));
        }, 300);
      } else {
        setTargetRect(null);
        setTooltipPosition(null);
      }
    } else {
      setTargetRect(null);
      setTooltipPosition(null);
    }
  }, [currentStep, step.target, step.position, calculatePosition]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onSkip, 300);
  };

  if (!isVisible) return null;

  const isCenter = !step.target || !targetRect;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay with spotlight */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#spotlight-mask)"
          className="animate-fade-in"
        />
      </svg>

      {/* Highlight ring around target */}
      {targetRect && (
        <div
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        >
          <div className="absolute inset-0 rounded-xl border-2 border-primary animate-pulse" />
          <div className="absolute inset-0 rounded-xl border-2 border-primary/50 animate-ping" />
        </div>
      )}

      {/* Clickable backdrop */}
      <div 
        className="absolute inset-0"
        onClick={handleSkip}
      />
      
      {/* Tour Card */}
      <Card 
        className={`absolute z-10 w-full max-w-md p-6 shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'animate-scale-in' : 'animate-scale-out'
        }`}
        style={
          isCenter || !tooltipPosition
            ? {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }
            : {
                top: tooltipPosition.top,
                left: tooltipPosition.left,
              }
        }
      >
        {/* Arrow pointer */}
        {!isCenter && tooltipPosition && (
          <div
            className={`absolute w-4 h-4 bg-card rotate-45 border ${
              tooltipPosition.placement === 'top' ? 'bottom-[-8px] left-1/2 -translate-x-1/2 border-l-0 border-t-0' :
              tooltipPosition.placement === 'bottom' ? 'top-[-8px] left-1/2 -translate-x-1/2 border-r-0 border-b-0' :
              tooltipPosition.placement === 'left' ? 'right-[-8px] top-1/2 -translate-y-1/2 border-l-0 border-b-0' :
              'left-[-8px] top-1/2 -translate-y-1/2 border-r-0 border-t-0'
            }`}
          />
        )}

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleSkip}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              {language === 'bn' ? `ধাপ ${currentStep + 1}/${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            {step.icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-3">
            {language === 'bn' ? step.titleBn : step.title}
          </h2>
          <p className="text-muted-foreground">
            {language === 'bn' ? step.descriptionBn : step.description}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-1.5 mb-6">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-primary w-6' 
                  : index < currentStep 
                    ? 'bg-primary/50' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrev}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {language === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            className={currentStep === 0 ? 'w-full' : 'flex-1'}
          >
            {currentStep === steps.length - 1 ? (
              language === 'bn' ? 'শুরু করুন' : 'Get Started'
            ) : (
              <>
                {language === 'bn' ? 'পরবর্তী' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        {/* Skip Link */}
        {currentStep < steps.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {language === 'bn' ? 'এড়িয়ে যান' : 'Skip tour'}
          </button>
        )}
      </Card>
    </div>
  );
};

export default OnboardingTour;
