import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.student': 'শিক্ষার্থী',
    'nav.teacher': 'শিক্ষক',
    'nav.parent': 'অভিভাবক',
    'nav.profile': 'প্রোফাইল',
    'nav.settings': 'সেটিংস',
    'nav.notifications': 'বিজ্ঞপ্তি',
    'nav.logout': 'লগআউট',
    
    // Promo Bar
    'promo.text': '🎉 নতুন বছরের অফার! ৫০% ছাড় সব প্রিমিয়াম কোর্সে - সীমিত সময়ের জন্য!',
    'promo.cta': 'এখনই দেখুন',
    
    // Hero Section
    'hero.badge': 'বিশ্বের সবচেয়ে অভিযোজিত শিক্ষা ইকোসিস্টেম',
    'hero.title': 'পাঠশালা',
    'hero.titleHighlight': 'AI',
    'hero.subtitle': 'ব্যক্তিগতকৃত শিক্ষা পথ, AI স্টাডি প্ল্যান, এবং স্মার্ট বিশ্লেষণ দিয়ে আপনার শিক্ষা যাত্রা রূপান্তর করুন।',
    'hero.cta.student': 'শিক্ষার্থী হিসেবে শুরু করুন',
    'hero.cta.demo': 'ডেমো দেখুন',
    
    // Stats
    'stats.students': 'সক্রিয় শিক্ষার্থী',
    'stats.courses': 'কোর্স',
    'stats.teachers': 'বিশেষজ্ঞ শিক্ষক',
    'stats.success': 'সাফল্যের হার',
    
    // Features
    'features.title': 'প্রিমিয়াম বৈশিষ্ট্য',
    'features.subtitle': 'AI-চালিত শিক্ষা সরঞ্জাম যা আপনার সাফল্য নিশ্চিত করে',
    'features.aiPlan.title': 'AI স্টাডি প্ল্যান',
    'features.aiPlan.desc': 'আপনার শেখার ধরন এবং লক্ষ্য অনুযায়ী ব্যক্তিগতকৃত পরিকল্পনা',
    'features.liveClass.title': 'লাইভ ক্লাস',
    'features.liveClass.desc': 'বিশেষজ্ঞ শিক্ষকদের সাথে ইন্টারেক্টিভ সেশন',
    'features.skillGap.title': 'দক্ষতা বিশ্লেষণ',
    'features.skillGap.desc': 'আপনার শক্তি এবং উন্নতির ক্ষেত্র চিহ্নিত করুন',
    'features.career.title': 'ক্যারিয়ার গাইডেন্স',
    'features.career.desc': 'AI-চালিত ক্যারিয়ার পথ সুপারিশ',
    'features.badges.title': 'মাইক্রো-ক্রেডেনশিয়াল',
    'features.badges.desc': 'ব্লকচেইন-যাচাইকৃত সার্টিফিকেট ও ব্যাজ',
    'features.collab.title': 'গ্রুপ প্রজেক্ট',
    'features.collab.desc': 'সহপাঠীদের সাথে সহযোগিতামূলক শিক্ষা',
    
    // Testimonials
    'testimonials.title': 'শিক্ষার্থীদের মতামত',
    'testimonials.subtitle': 'হাজার হাজার শিক্ষার্থী ইতিমধ্যে তাদের শিক্ষা রূপান্তর করেছে',
    
    // FAQ
    'faq.title': 'সাধারণ প্রশ্নাবলী',
    'faq.subtitle': 'আপনার প্রশ্নের উত্তর এখানে',
    
    // CTA
    'cta.title': 'আজই শুরু করুন',
    'cta.subtitle': 'বিনামূল্যে শুরু করুন এবং আপনার শিক্ষা যাত্রা রূপান্তর করুন',
    'cta.button': 'বিনামূল্যে শুরু করুন',
    
    // Footer
    'footer.description': 'বিশ্বের সবচেয়ে অভিযোজিত শিক্ষা ইকোসিস্টেম',
    'footer.quickLinks': 'দ্রুত লিঙ্ক',
    'footer.resources': 'রিসোর্স',
    'footer.support': 'সাপোর্ট',
    'footer.contact': 'যোগাযোগ',
    'footer.blog': 'ব্লগ',
    'footer.help': 'সাহায্য কেন্দ্র',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'শর্তাবলী',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত',
    
    // Dashboard Common
    'dashboard.welcome': 'স্বাগতম',
    'dashboard.today': 'আজ',
    'dashboard.thisWeek': 'এই সপ্তাহ',
    'dashboard.thisMonth': 'এই মাস',
    'dashboard.viewAll': 'সব দেখুন',
    'dashboard.progress': 'অগ্রগতি',
    'dashboard.completed': 'সম্পন্ন',
    'dashboard.pending': 'বাকি',
    'dashboard.upcoming': 'আসছে',
    
    // Student Dashboard
    'student.title': 'শিক্ষার্থী ড্যাশবোর্ড',
    'student.learningPath': 'আমার শিক্ষা পথ',
    'student.aiRecommendations': 'AI সুপারিশ',
    'student.studyPlan': 'স্টাডি প্ল্যান',
    'student.generatePlan': 'AI প্ল্যান তৈরি করুন',
    'student.streak': 'স্ট্রিক',
    'student.badges': 'ব্যাজ',
    'student.level': 'লেভেল',
    'student.xp': 'XP',
    'student.skillAnalysis': 'দক্ষতা বিশ্লেষণ',
    'student.careerPath': 'ক্যারিয়ার পথ',
    'student.liveClasses': 'লাইভ ক্লাস',
    'student.groupProjects': 'গ্রুপ প্রজেক্ট',
    'student.certificates': 'সার্টিফিকেট',
    
    // Teacher Dashboard
    'teacher.title': 'শিক্ষক ড্যাশবোর্ড',
    'teacher.classes': 'আমার ক্লাস',
    'teacher.students': 'শিক্ষার্থী',
    'teacher.heatmap': 'পারফরম্যান্স হিটম্যাপ',
    'teacher.contentGenerator': 'AI কন্টেন্ট জেনারেটর',
    'teacher.assignmentGrader': 'অ্যাসাইনমেন্ট গ্রেডার',
    'teacher.schedule': 'ক্লাস সিডিউল',
    'teacher.recordings': 'রেকর্ডিং',
    'teacher.resources': 'রিসোর্স লাইব্রেরি',
    
    // Parent Portal
    'parent.title': 'অভিভাবক পোর্টাল',
    'parent.children': 'আমার সন্তান',
    'parent.progress': 'অগ্রগতি',
    'parent.attendance': 'উপস্থিতি',
    'parent.reports': 'রিপোর্ট কার্ড',
    'parent.notifications': 'বিজ্ঞপ্তি',
    'parent.messages': 'বার্তা',
    
    // Profile
    'profile.title': 'প্রোফাইল',
    'profile.edit': 'সম্পাদনা করুন',
    'profile.save': 'সংরক্ষণ করুন',
    'profile.achievements': 'অর্জন',
    'profile.activity': 'সাম্প্রতিক কার্যক্রম',
    
    // Settings
    'settings.title': 'সেটিংস',
    'settings.theme': 'থিম',
    'settings.language': 'ভাষা',
    'settings.notifications': 'বিজ্ঞপ্তি',
    
    // Common Actions
    'action.join': 'যোগ দিন',
    'action.start': 'শুরু করুন',
    'action.continue': 'চালিয়ে যান',
    'action.download': 'ডাউনলোড',
    'action.share': 'শেয়ার করুন',
    'action.close': 'বন্ধ করুন',
    'action.cancel': 'বাতিল',
    'action.confirm': 'নিশ্চিত করুন',
    'action.generate': 'তৈরি করুন',
    'action.view': 'দেখুন',
    'action.edit': 'সম্পাদনা',
    'action.delete': 'মুছুন',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.student': 'Student',
    'nav.teacher': 'Teacher',
    'nav.parent': 'Parent',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.notifications': 'Notifications',
    'nav.logout': 'Logout',
    
    // Promo Bar
    'promo.text': '🎉 New Year Offer! 50% OFF on all premium courses - Limited time only!',
    'promo.cta': 'View Now',
    
    // Hero Section
    'hero.badge': "The World's Most Adaptive Learning Ecosystem",
    'hero.title': 'Pathshala',
    'hero.titleHighlight': 'AI',
    'hero.subtitle': 'Transform your learning journey with personalized learning paths, AI study plans, and smart analytics.',
    'hero.cta.student': 'Start as Student',
    'hero.cta.demo': 'Watch Demo',
    
    // Stats
    'stats.students': 'Active Students',
    'stats.courses': 'Courses',
    'stats.teachers': 'Expert Teachers',
    'stats.success': 'Success Rate',
    
    // Features
    'features.title': 'Premium Features',
    'features.subtitle': 'AI-powered learning tools that ensure your success',
    'features.aiPlan.title': 'AI Study Plan',
    'features.aiPlan.desc': 'Personalized plans based on your learning style and goals',
    'features.liveClass.title': 'Live Classes',
    'features.liveClass.desc': 'Interactive sessions with expert teachers',
    'features.skillGap.title': 'Skill Analysis',
    'features.skillGap.desc': 'Identify your strengths and areas for improvement',
    'features.career.title': 'Career Guidance',
    'features.career.desc': 'AI-powered career path recommendations',
    'features.badges.title': 'Micro-credentials',
    'features.badges.desc': 'Blockchain-verified certificates and badges',
    'features.collab.title': 'Group Projects',
    'features.collab.desc': 'Collaborative learning with peers',
    
    // Testimonials
    'testimonials.title': 'Student Reviews',
    'testimonials.subtitle': 'Thousands of students have already transformed their education',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to your questions here',
    
    // CTA
    'cta.title': 'Start Today',
    'cta.subtitle': 'Get started for free and transform your learning journey',
    'cta.button': 'Get Started Free',
    
    // Footer
    'footer.description': "The world's most adaptive learning ecosystem",
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.support': 'Support',
    'footer.contact': 'Contact',
    'footer.blog': 'Blog',
    'footer.help': 'Help Center',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved',
    
    // Dashboard Common
    'dashboard.welcome': 'Welcome',
    'dashboard.today': 'Today',
    'dashboard.thisWeek': 'This Week',
    'dashboard.thisMonth': 'This Month',
    'dashboard.viewAll': 'View All',
    'dashboard.progress': 'Progress',
    'dashboard.completed': 'Completed',
    'dashboard.pending': 'Pending',
    'dashboard.upcoming': 'Upcoming',
    
    // Student Dashboard
    'student.title': 'Student Dashboard',
    'student.learningPath': 'My Learning Path',
    'student.aiRecommendations': 'AI Recommendations',
    'student.studyPlan': 'Study Plan',
    'student.generatePlan': 'Generate AI Plan',
    'student.streak': 'Streak',
    'student.badges': 'Badges',
    'student.level': 'Level',
    'student.xp': 'XP',
    'student.skillAnalysis': 'Skill Analysis',
    'student.careerPath': 'Career Path',
    'student.liveClasses': 'Live Classes',
    'student.groupProjects': 'Group Projects',
    'student.certificates': 'Certificates',
    
    // Teacher Dashboard
    'teacher.title': 'Teacher Dashboard',
    'teacher.classes': 'My Classes',
    'teacher.students': 'Students',
    'teacher.heatmap': 'Performance Heatmap',
    'teacher.contentGenerator': 'AI Content Generator',
    'teacher.assignmentGrader': 'Assignment Grader',
    'teacher.schedule': 'Class Schedule',
    'teacher.recordings': 'Recordings',
    'teacher.resources': 'Resource Library',
    
    // Parent Portal
    'parent.title': 'Parent Portal',
    'parent.children': 'My Children',
    'parent.progress': 'Progress',
    'parent.attendance': 'Attendance',
    'parent.reports': 'Report Cards',
    'parent.notifications': 'Notifications',
    'parent.messages': 'Messages',
    
    // Profile
    'profile.title': 'Profile',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.achievements': 'Achievements',
    'profile.activity': 'Recent Activity',
    
    // Settings
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    
    // Common Actions
    'action.join': 'Join',
    'action.start': 'Start',
    'action.continue': 'Continue',
    'action.download': 'Download',
    'action.share': 'Share',
    'action.close': 'Close',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
    'action.generate': 'Generate',
    'action.view': 'View',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('pathshala-language');
    return (saved as Language) || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('pathshala-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
