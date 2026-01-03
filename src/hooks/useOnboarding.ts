import { useState, useEffect, useCallback } from "react";
import { UserRole } from "@/components/onboarding/OnboardingTour";

const ONBOARDING_STORAGE_KEY = "pathshala-onboarding-completed";

interface OnboardingState {
  student: boolean;
  teacher: boolean;
  parent: boolean;
}

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

export const useOnboarding = (role: UserRole) => {
  const [showTour, setShowTour] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(true);

  useEffect(() => {
    const state = getInitialState();
    const completed = state[role];
    setHasCompleted(completed);
    
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

  return {
    showTour,
    hasCompleted,
    completeTour,
    skipTour,
    resetTour,
    startTour
  };
};

export default useOnboarding;
