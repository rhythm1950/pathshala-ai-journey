// Demo data for Pathshala AI
import avatarRahul from '@/assets/avatars/rahul.jpg';
import avatarAminul from '@/assets/avatars/aminul.jpg';
import avatarAbdul from '@/assets/avatars/abdul.jpg';
import avatarSabrina from '@/assets/avatars/sabrina.jpg';
import avatarTanvir from '@/assets/avatars/tanvir.jpg';
import avatarNadia from '@/assets/avatars/nadia.jpg';
import avatarFatema from '@/assets/avatars/fatema.jpg';

export const studentData = {
  name: 'রাহুল আহমেদ',
  nameEn: 'Rahul Ahmed',
  email: 'rahul@example.com',
  avatar: avatarRahul,
  level: 12,
  xp: 8750,
  xpToNext: 10000,
  streak: 15,
  badges: [
    { id: 1, name: 'প্রথম পদক্ষেপ', nameEn: 'First Steps', icon: '🎯', earned: true },
    { id: 2, name: 'সপ্তাহিক যোদ্ধা', nameEn: 'Weekly Warrior', icon: '⚔️', earned: true },
    { id: 3, name: 'গণিত মাস্টার', nameEn: 'Math Master', icon: '🧮', earned: true },
    { id: 4, name: 'কোড নিনজা', nameEn: 'Code Ninja', icon: '💻', earned: true },
    { id: 5, name: '৩০ দিনের স্ট্রিক', nameEn: '30 Day Streak', icon: '🔥', earned: false },
    { id: 6, name: 'সম্পূর্ণ কোর্স', nameEn: 'Course Complete', icon: '🎓', earned: false },
  ],
  completedCourses: 8,
  totalCourses: 12,
  hoursLearned: 156,
};

export const learningPath = [
  { id: 1, title: 'পাইথন বেসিক', titleEn: 'Python Basics', progress: 100, status: 'completed' },
  { id: 2, title: 'ডাটা স্ট্রাকচার', titleEn: 'Data Structures', progress: 75, status: 'in-progress' },
  { id: 3, title: 'অ্যালগরিদম', titleEn: 'Algorithms', progress: 30, status: 'in-progress' },
  { id: 4, title: 'ওয়েব ডেভেলপমেন্ট', titleEn: 'Web Development', progress: 0, status: 'locked' },
  { id: 5, title: 'মেশিন লার্নিং', titleEn: 'Machine Learning', progress: 0, status: 'locked' },
];

export const aiRecommendations = [
  { id: 1, title: 'বাইনারি সার্চ অনুশীলন করুন', titleEn: 'Practice Binary Search', type: 'practice', priority: 'high', duration: '25 মিনিট', durationEn: '25 min' },
  { id: 2, title: 'রিকার্শন ভিডিও দেখুন', titleEn: 'Watch Recursion Video', type: 'video', priority: 'medium', duration: '15 মিনিট', durationEn: '15 min' },
  { id: 3, title: 'কুইজ: লিংকড লিস্ট', titleEn: 'Quiz: Linked List', type: 'quiz', priority: 'medium', duration: '10 মিনিট', durationEn: '10 min' },
  { id: 4, title: 'প্রজেক্ট: ক্যালকুলেটর', titleEn: 'Project: Calculator', type: 'project', priority: 'low', duration: '45 মিনিট', durationEn: '45 min' },
];

export const studyPlan = {
  daily: [
    { time: '09:00', task: 'ডাটা স্ট্রাকচার রিভিউ', taskEn: 'Data Structures Review', duration: 60 },
    { time: '10:30', task: 'অনুশীলন সমস্যা', taskEn: 'Practice Problems', duration: 45 },
    { time: '14:00', task: 'লাইভ ক্লাস: অ্যালগরিদম', taskEn: 'Live Class: Algorithms', duration: 60 },
    { time: '16:00', task: 'প্রজেক্ট কাজ', taskEn: 'Project Work', duration: 90 },
  ],
  weekly: {
    target: 20,
    completed: 14,
    subjects: [
      { name: 'পাইথন', nameEn: 'Python', hours: 5 },
      { name: 'ডাটা স্ট্রাকচার', nameEn: 'Data Structures', hours: 4 },
      { name: 'অ্যালগরিদম', nameEn: 'Algorithms', hours: 3 },
      { name: 'গণিত', nameEn: 'Mathematics', hours: 2 },
    ]
  }
};

export const skillAnalysis = [
  { skill: 'পাইথন', skillEn: 'Python', level: 85, trend: 'up' },
  { skill: 'ডাটা স্ট্রাকচার', skillEn: 'Data Structures', level: 70, trend: 'up' },
  { skill: 'অ্যালগরিদম', skillEn: 'Algorithms', level: 55, trend: 'up' },
  { skill: 'সমস্যা সমাধান', skillEn: 'Problem Solving', level: 75, trend: 'stable' },
  { skill: 'গণিত', skillEn: 'Mathematics', level: 80, trend: 'up' },
  { skill: 'ওয়েব ডেভেলপমেন্ট', skillEn: 'Web Development', level: 40, trend: 'stable' },
];

export const careerPaths = [
  { 
    id: 1, 
    title: 'সফটওয়্যার ইঞ্জিনিয়ার', 
    titleEn: 'Software Engineer',
    match: 92, 
    skills: ['পাইথন', 'ডাটা স্ট্রাকচার', 'অ্যালগরিদম'],
    skillsEn: ['Python', 'Data Structures', 'Algorithms'],
    salary: '৳50,000 - ৳150,000',
    salaryEn: '৳50,000 - ৳150,000'
  },
  { 
    id: 2, 
    title: 'ডাটা সায়েন্টিস্ট', 
    titleEn: 'Data Scientist',
    match: 78, 
    skills: ['পাইথন', 'গণিত', 'মেশিন লার্নিং'],
    skillsEn: ['Python', 'Mathematics', 'Machine Learning'],
    salary: '৳60,000 - ৳200,000',
    salaryEn: '৳60,000 - ৳200,000'
  },
  { 
    id: 3, 
    title: 'ফুলস্ট্যাক ডেভেলপার', 
    titleEn: 'Full Stack Developer',
    match: 65, 
    skills: ['ওয়েব ডেভেলপমেন্ট', 'জাভাস্ক্রিপ্ট', 'ডাটাবেজ'],
    skillsEn: ['Web Development', 'JavaScript', 'Database'],
    salary: '৳45,000 - ৳120,000',
    salaryEn: '৳45,000 - ৳120,000'
  },
];

export const liveClasses = [
  { id: 1, title: 'অ্যালগরিদম মাস্টারক্লাস', titleEn: 'Algorithm Masterclass', teacher: 'ড. করিম', teacherEn: 'Dr. Karim', time: '14:00', date: 'আজ', dateEn: 'Today', students: 45, status: 'upcoming' },
  { id: 2, title: 'পাইথন অ্যাডভান্সড', titleEn: 'Python Advanced', teacher: 'প্রফেসর রহমান', teacherEn: 'Prof. Rahman', time: '16:00', date: 'আজ', dateEn: 'Today', students: 32, status: 'upcoming' },
  { id: 3, title: 'ডাটা স্ট্রাকচার', titleEn: 'Data Structures', teacher: 'মিস ফারিয়া', teacherEn: 'Ms. Faria', time: '10:00', date: 'আগামীকাল', dateEn: 'Tomorrow', students: 28, status: 'scheduled' },
];

export const groupProjects = [
  { id: 1, title: 'ই-কমার্স প্ল্যাটফর্ম', titleEn: 'E-commerce Platform', members: 4, progress: 65, deadline: '১৫ জানুয়ারি', deadlineEn: 'Jan 15' },
  { id: 2, title: 'চ্যাটবট অ্যাপ', titleEn: 'Chatbot App', members: 3, progress: 40, deadline: '২০ জানুয়ারি', deadlineEn: 'Jan 20' },
];

export const certificates = [
  { id: 1, title: 'পাইথন ফাউন্ডেশন', titleEn: 'Python Foundation', issueDate: '১ ডিসেম্বর, ২০২৪', issueDateEn: 'Dec 1, 2024', verified: true },
  { id: 2, title: 'ডাটা সায়েন্স বেসিক', titleEn: 'Data Science Basics', issueDate: '১৫ নভেম্বর, ২০২৪', issueDateEn: 'Nov 15, 2024', verified: true },
];

// Teacher Dashboard Data
export const teacherData = {
  name: 'ড. আমিনুল ইসলাম',
  nameEn: 'Dr. Aminul Islam',
  email: 'aminul@example.com',
  avatar: avatarAminul,
  department: 'কম্পিউটার সায়েন্স',
  departmentEn: 'Computer Science',
  totalStudents: 256,
  activeClasses: 5,
  rating: 4.8,
};

export const teacherClasses = [
  { id: 1, name: 'অ্যালগরিদম ১০১', nameEn: 'Algorithm 101', students: 45, progress: 60, schedule: 'সোম, বুধ, শুক্র - 14:00', scheduleEn: 'Mon, Wed, Fri - 14:00' },
  { id: 2, name: 'পাইথন অ্যাডভান্সড', nameEn: 'Python Advanced', students: 32, progress: 45, schedule: 'মঙ্গল, বৃহ - 16:00', scheduleEn: 'Tue, Thu - 16:00' },
  { id: 3, name: 'ডাটা স্ট্রাকচার', nameEn: 'Data Structures', students: 38, progress: 75, schedule: 'সোম, বুধ - 10:00', scheduleEn: 'Mon, Wed - 10:00' },
];

export const studentPerformanceHeatmap = [
  { student: 'রাহুল', studentEn: 'Rahul', week1: 85, week2: 78, week3: 92, week4: 88 },
  { student: 'ফাতেমা', studentEn: 'Fatema', week1: 92, week2: 95, week3: 88, week4: 91 },
  { student: 'করিম', studentEn: 'Karim', week1: 65, week2: 70, week3: 68, week4: 75 },
  { student: 'সুমাইয়া', studentEn: 'Sumaiya', week1: 78, week2: 82, week3: 85, week4: 80 },
  { student: 'আলী', studentEn: 'Ali', week1: 88, week2: 85, week3: 90, week4: 92 },
  { student: 'নুসরাত', studentEn: 'Nusrat', week1: 95, week2: 92, week3: 98, week4: 96 },
];

export const assignments = [
  { id: 1, title: 'বাইনারি সার্চ ইমপ্লিমেন্টেশন', titleEn: 'Binary Search Implementation', submitted: 42, total: 45, deadline: 'আজ', deadlineEn: 'Today', status: 'active' },
  { id: 2, title: 'লিংকড লিস্ট প্রজেক্ট', titleEn: 'Linked List Project', submitted: 38, total: 45, deadline: '২ দিন বাকি', deadlineEn: '2 days left', status: 'active' },
  { id: 3, title: 'রিকার্শন কুইজ', titleEn: 'Recursion Quiz', submitted: 45, total: 45, deadline: 'শেষ', deadlineEn: 'Ended', status: 'completed' },
];

// Parent Portal Data
export const parentData = {
  name: 'জনাব আব্দুল করিম',
  nameEn: 'Mr. Abdul Karim',
  email: 'abdul@example.com',
  avatar: avatarAbdul,
};

export const childrenData = [
  {
    id: 1,
    name: 'রাহুল করিম',
    nameEn: 'Rahul Karim',
    avatar: avatarRahul,
    class: 'ক্লাস ১০',
    classEn: 'Class 10',
    overallGrade: 'A+',
    attendance: 92,
    subjects: [
      { name: 'গণিত', nameEn: 'Mathematics', grade: 'A+', progress: 92 },
      { name: 'বিজ্ঞান', nameEn: 'Science', grade: 'A', progress: 85 },
      { name: 'ইংরেজি', nameEn: 'English', grade: 'A-', progress: 80 },
      { name: 'বাংলা', nameEn: 'Bengali', grade: 'A', progress: 88 },
    ],
    recentActivities: [
      { date: 'আজ', dateEn: 'Today', activity: 'গণিত পরীক্ষায় ৯৫% পেয়েছে', activityEn: 'Scored 95% in Math test' },
      { date: 'গতকাল', dateEn: 'Yesterday', activity: 'বিজ্ঞান প্রজেক্ট জমা দিয়েছে', activityEn: 'Submitted Science project' },
      { date: '৩ দিন আগে', dateEn: '3 days ago', activity: 'ইংরেজি ক্লাসে উপস্থিত', activityEn: 'Attended English class' },
    ],
  },
  {
    id: 2,
    name: 'ফাতেমা করিম',
    nameEn: 'Fatema Karim',
    avatar: avatarFatema,
    class: 'ক্লাস ৭',
    classEn: 'Class 7',
    overallGrade: 'A',
    attendance: 95,
    subjects: [
      { name: 'গণিত', nameEn: 'Mathematics', grade: 'A', progress: 88 },
      { name: 'বিজ্ঞান', nameEn: 'Science', grade: 'A+', progress: 94 },
      { name: 'ইংরেজি', nameEn: 'English', grade: 'A+', progress: 92 },
      { name: 'বাংলা', nameEn: 'Bengali', grade: 'A', progress: 86 },
    ],
    recentActivities: [
      { date: 'আজ', dateEn: 'Today', activity: 'আর্ট প্রতিযোগিতায় ১ম হয়েছে', activityEn: 'Won 1st place in Art competition' },
      { date: 'গতকাল', dateEn: 'Yesterday', activity: 'বিজ্ঞান কুইজে অংশ নিয়েছে', activityEn: 'Participated in Science quiz' },
    ],
  },
];

export const parentNotifications = [
  { id: 1, type: 'success', title: 'পরীক্ষার ফলাফল', titleEn: 'Exam Results', message: 'রাহুল গণিতে A+ পেয়েছে', messageEn: 'Rahul got A+ in Mathematics', time: '১ ঘন্টা আগে', timeEn: '1 hour ago' },
  { id: 2, type: 'info', title: 'শ্রেণি সভা', titleEn: 'Parent Meeting', message: 'আগামী সোমবার অভিভাবক সভা', messageEn: 'Parent meeting next Monday', time: '৩ ঘন্টা আগে', timeEn: '3 hours ago' },
  { id: 3, type: 'warning', title: 'অ্যাসাইনমেন্ট', titleEn: 'Assignment', message: 'ফাতেমার বিজ্ঞান অ্যাসাইনমেন্ট জমা দেওয়া বাকি', messageEn: 'Fatema has pending Science assignment', time: '৫ ঘন্টা আগে', timeEn: '5 hours ago' },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'সাবরিনা আক্তার',
    nameEn: 'Sabrina Akter',
    role: 'HSC পরীক্ষার্থী',
    roleEn: 'HSC Student',
    avatar: avatarSabrina,
    quote: 'পাঠশালা AI আমার পড়াশোনা সম্পূর্ণ বদলে দিয়েছে। AI স্টাডি প্ল্যান আমাকে সময় সঠিকভাবে পরিচালনা করতে শিখিয়েছে।',
    quoteEn: 'Pathshala AI has completely transformed my studies. The AI study plan has taught me to manage my time effectively.',
    rating: 5,
  },
  {
    id: 2,
    name: 'তানভীর হাসান',
    nameEn: 'Tanvir Hasan',
    role: 'বিশ্ববিদ্যালয় শিক্ষার্থী',
    roleEn: 'University Student',
    avatar: avatarTanvir,
    quote: 'লাইভ ক্লাস এবং গ্রুপ প্রজেক্ট ফিচার অসাধারণ! আমি প্রোগ্রামিং শিখে ফ্রিল্যান্সিং শুরু করেছি।',
    quoteEn: 'The live class and group project features are amazing! I learned programming and started freelancing.',
    rating: 5,
  },
  {
    id: 3,
    name: 'নাদিয়া ইসলাম',
    nameEn: 'Nadia Islam',
    role: 'অভিভাবক',
    roleEn: 'Parent',
    avatar: avatarNadia,
    quote: 'প্যারেন্ট পোর্টাল দিয়ে আমি সহজেই আমার সন্তানের পড়াশোনার খোঁজ রাখতে পারি। খুবই সুবিধাজনক!',
    quoteEn: "The parent portal helps me easily track my child's studies. Very convenient!",
    rating: 5,
  },
];

// FAQ Data
export const faqData = [
  {
    question: 'পাঠশালা AI কীভাবে কাজ করে?',
    questionEn: 'How does Pathshala AI work?',
    answer: 'পাঠশালা AI আপনার শেখার ধরন বিশ্লেষণ করে এবং ব্যক্তিগতকৃত স্টাডি প্ল্যান তৈরি করে। আমাদের AI সিস্টেম আপনার অগ্রগতি ট্র্যাক করে এবং সেই অনুযায়ী সুপারিশ প্রদান করে।',
    answerEn: 'Pathshala AI analyzes your learning style and creates personalized study plans. Our AI system tracks your progress and provides recommendations accordingly.',
  },
  {
    question: 'প্ল্যাটফর্মটি কি বিনামূল্যে?',
    questionEn: 'Is the platform free?',
    answer: 'হ্যাঁ, বেসিক ফিচারগুলো সম্পূর্ণ বিনামূল্যে। প্রিমিয়াম ফিচারগুলোর জন্য সাবস্ক্রিপশন প্রয়োজন যা মাত্র ৳২৯৯/মাস থেকে শুরু।',
    answerEn: 'Yes, basic features are completely free. Premium features require a subscription starting from just ৳299/month.',
  },
  {
    question: 'লাইভ ক্লাসে কীভাবে যোগ দেব?',
    questionEn: 'How do I join live classes?',
    answer: 'আপনার ড্যাশবোর্ডে লাইভ ক্লাস সেকশনে গিয়ে আসন্ন ক্লাসগুলো দেখতে পাবেন। সময় হলে "যোগ দিন" বাটনে ক্লিক করুন।',
    answerEn: 'Go to the Live Classes section in your dashboard to see upcoming classes. Click "Join" when it\'s time.',
  },
  {
    question: 'সার্টিফিকেট কি আসল?',
    questionEn: 'Are the certificates real?',
    answer: 'হ্যাঁ, আমাদের সার্টিফিকেটগুলো ব্লকচেইন দিয়ে যাচাই করা হয় এবং অনেক প্রতিষ্ঠান দ্বারা স্বীকৃত।',
    answerEn: 'Yes, our certificates are blockchain-verified and recognized by many institutions.',
  },
];
