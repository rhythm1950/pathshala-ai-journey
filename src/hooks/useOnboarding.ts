import { useState, useEffect, useCallback } from "react";
import { UserRole } from "@/components/onboarding/OnboardingTour";

const ONBOARDING_STORAGE_KEY = "pathshala-onboarding-completed";
const FEATURES_STORAGE_KEY = "pathshala-features-explored";

interface OnboardingState {
  student: boolean;
  teacher: boolean;
  parent: boolean;
}

export interface FeatureItem {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  completed: boolean;
}

interface FeaturesState {
  student: Record<string, boolean>;
  teacher: Record<string, boolean>;
  parent: Record<string, boolean>;
}

const studentFeatures: Omit<FeatureItem, 'completed'>[] = [
  { id: 'ai-study-plan', name: 'AI Study Plan', nameBn: 'AI স্টাডি প্ল্যান', description: 'Generate a personalized study schedule', descriptionBn: 'একটি ব্যক্তিগতকৃত স্টাডি শিডিউল তৈরি করুন' },
  { id: 'learning-path', name: 'Learning Path', nameBn: 'শেখার পথ', description: 'Start a lesson from your curriculum', descriptionBn: 'আপনার পাঠ্যক্রম থেকে একটি পাঠ শুরু করুন' },
  { id: 'gamification', name: 'Gamification', nameBn: 'গেমিফিকেশন', description: 'Check your XP and achievements', descriptionBn: 'আপনার XP এবং অর্জনগুলি দেখুন' },
  { id: 'skill-analysis', name: 'Skill Analysis', nameBn: 'দক্ষতা বিশ্লেষণ', description: 'Review your skill gap analysis', descriptionBn: 'আপনার দক্ষতার ঘাটতি বিশ্লেষণ পর্যালোচনা করুন' },
  { id: 'live-classes', name: 'Live Classes', nameBn: 'লাইভ ক্লাস', description: 'Join or schedule a live class', descriptionBn: 'একটি লাইভ ক্লাসে যোগ দিন বা শিডিউল করুন' },
  { id: 'micro-credentials', name: 'Micro Credentials', nameBn: 'মাইক্রো ক্রেডেনশিয়াল', description: 'Explore available badges and certificates', descriptionBn: 'উপলব্ধ ব্যাজ এবং সার্টিফিকেট অন্বেষণ করুন' },
];

const teacherFeatures: Omit<FeatureItem, 'completed'>[] = [
  { id: 'performance-heatmap', name: 'Performance Heatmap', nameBn: 'পারফরম্যান্স হিটম্যাপ', description: 'Analyze class performance patterns', descriptionBn: 'ক্লাসের পারফরম্যান্স প্যাটার্ন বিশ্লেষণ করুন' },
  { id: 'ai-content', name: 'AI Content Generator', nameBn: 'AI কন্টেন্ট জেনারেটর', description: 'Create a lesson or quiz with AI', descriptionBn: 'AI দিয়ে একটি পাঠ বা কুইজ তৈরি করুন' },
  { id: 'assignment-grader', name: 'Assignment Grader', nameBn: 'অ্যাসাইনমেন্ট গ্রেডার', description: 'Grade an assignment with AI suggestions', descriptionBn: 'AI পরামর্শ সহ একটি অ্যাসাইনমেন্ট গ্রেড করুন' },
  { id: 'class-scheduler', name: 'Class Scheduler', nameBn: 'ক্লাস শিডিউলার', description: 'Schedule your upcoming classes', descriptionBn: 'আপনার আসন্ন ক্লাস শিডিউল করুন' },
  { id: 'student-analytics', name: 'Student Analytics', nameBn: 'শিক্ষার্থী বিশ্লেষণ', description: 'View detailed student progress reports', descriptionBn: 'বিস্তারিত শিক্ষার্থী অগ্রগতি রিপোর্ট দেখুন' },
  { id: 'resource-library', name: 'Resource Library', nameBn: 'রিসোর্স লাইব্রেরি', description: 'Browse and upload teaching materials', descriptionBn: 'শিক্ষণ উপকরণ ব্রাউজ করুন এবং আপলোড করুন' },
];

const parentFeatures: Omit<FeatureItem, 'completed'>[] = [
  { id: 'child-progress', name: 'Child Progress', nameBn: 'সন্তানের অগ্রগতি', description: 'Review your child\'s academic progress', descriptionBn: 'আপনার সন্তানের একাডেমিক অগ্রগতি পর্যালোচনা করুন' },
  { id: 'grade-tracker', name: 'Grade Tracker', nameBn: 'গ্রেড ট্র্যাকার', description: 'Check subject-wise grades', descriptionBn: 'বিষয়ভিত্তিক গ্রেড দেখুন' },
  { id: 'attendance', name: 'Attendance Calendar', nameBn: 'উপস্থিতি ক্যালেন্ডার', description: 'View attendance history', descriptionBn: 'উপস্থিতির ইতিহাস দেখুন' },
  { id: 'teacher-communication', name: 'Teacher Communication', nameBn: 'শিক্ষক যোগাযোগ', description: 'Send a message to a teacher', descriptionBn: 'একজন শিক্ষককে মেসেজ পাঠান' },
  { id: 'notifications', name: 'Notifications', nameBn: 'বিজ্ঞপ্তি', description: 'Check recent updates and alerts', descriptionBn: 'সাম্প্রতিক আপডেট এবং সতর্কতা দেখুন' },
  { id: 'events', name: 'Upcoming Events', nameBn: 'আসন্ন ইভেন্ট', description: 'View scheduled events and activities', descriptionBn: 'নির্ধারিত ইভেন্ট এবং কার্যক্রম দেখুন' },
];

const getFeaturesList = (role: UserRole): Omit<FeatureItem, 'completed'>[] => {
  switch (role) {
    case 'student': return studentFeatures;
    case 'teacher': return teacherFeatures;
    case 'parent': return parentFeatures;
    default: return studentFeatures;
  }
};

const getInitialState = (): OnboardingState => {
  try {
    const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading onboarding state:", error);
  }
  return { student: false, teacher: false, parent: false };
};

const getFeaturesState = (): FeaturesState => {
  try {
    const stored = localStorage.getItem(FEATURES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading features state:", error);
  }
  return { student: {}, teacher: {}, parent: {} };
};

export const useOnboarding = (role: UserRole) => {
  const [showTour, setShowTour] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(true);
  const [exploredFeatures, setExploredFeatures] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const state = getInitialState();
    const completed = state[role];
    setHasCompleted(completed);
    
    const featuresState = getFeaturesState();
    setExploredFeatures(featuresState[role] || {});
    
    // Show tour after a short delay for first-time users
    if (!completed) {
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [role]);

  const completeTour = useCallback(() => {
    const state = getInitialState();
    state[role] = true;
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
    setHasCompleted(true);
    setShowTour(false);
  }, [role]);

  const skipTour = useCallback(() => {
    completeTour();
  }, [completeTour]);

  const resetTour = useCallback(() => {
    const state = getInitialState();
    state[role] = false;
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
    setHasCompleted(false);
    setShowTour(true);
  }, [role]);

  const startTour = useCallback(() => {
    setShowTour(true);
  }, []);

  const markFeatureExplored = useCallback((featureId: string) => {
    const featuresState = getFeaturesState();
    featuresState[role] = { ...featuresState[role], [featureId]: true };
    localStorage.setItem(FEATURES_STORAGE_KEY, JSON.stringify(featuresState));
    setExploredFeatures(featuresState[role]);
  }, [role]);

  const resetFeatures = useCallback(() => {
    const featuresState = getFeaturesState();
    featuresState[role] = {};
    localStorage.setItem(FEATURES_STORAGE_KEY, JSON.stringify(featuresState));
    setExploredFeatures({});
  }, [role]);

  const getFeatures = useCallback((): FeatureItem[] => {
    const featuresList = getFeaturesList(role);
    return featuresList.map(feature => ({
      ...feature,
      completed: exploredFeatures[feature.id] || false
    }));
  }, [role, exploredFeatures]);

  const getProgress = useCallback(() => {
    const features = getFeatures();
    const completed = features.filter(f => f.completed).length;
    return {
      completed,
      total: features.length,
      percentage: features.length > 0 ? Math.round((completed / features.length) * 100) : 0
    };
  }, [getFeatures]);

  return {
    showTour,
    hasCompleted,
    completeTour,
    skipTour,
    resetTour,
    startTour,
    exploredFeatures,
    markFeatureExplored,
    resetFeatures,
    getFeatures,
    getProgress
  };
};

export default useOnboarding;
