import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone, 
  Search, 
  Play, 
  GraduationCap,
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const faqData = {
  student: [
    {
      question: 'কিভাবে নতুন কোর্সে ভর্তি হব?',
      questionEn: 'How do I enroll in a new course?',
      answer: 'ড্যাশবোর্ডে যান এবং "কোর্স" বিভাগে ক্লিক করুন। আপনার পছন্দের কোর্স নির্বাচন করে "ভর্তি হন" বাটনে ক্লিক করুন।',
      answerEn: 'Go to the dashboard and click on the "Courses" section. Select your preferred course and click the "Enroll" button.'
    },
    {
      question: 'আমার অগ্রগতি কিভাবে ট্র্যাক করব?',
      questionEn: 'How do I track my progress?',
      answer: 'আপনার ড্যাশবোর্ডে স্কিল অ্যানালাইসিস এবং লার্নিং পাথ সেকশনে আপনার সম্পূর্ণ অগ্রগতি দেখতে পাবেন।',
      answerEn: 'You can view your complete progress in the Skill Analysis and Learning Path sections on your dashboard.'
    },
    {
      question: 'সার্টিফিকেট কিভাবে ডাউনলোড করব?',
      questionEn: 'How do I download certificates?',
      answer: 'প্রোফাইল পেজে যান, সার্টিফিকেট ট্যাবে ক্লিক করুন এবং ডাউনলোড আইকনে ক্লিক করুন।',
      answerEn: 'Go to your Profile page, click on the Certificates tab, and click the download icon.'
    },
    {
      question: 'লাইভ ক্লাসে কিভাবে যোগ দেব?',
      questionEn: 'How do I join live classes?',
      answer: 'ড্যাশবোর্ডে লাইভ ক্লাসেস সেকশনে নির্ধারিত ক্লাস দেখুন এবং "যোগ দিন" বাটনে ক্লিক করুন।',
      answerEn: 'View scheduled classes in the Live Classes section on your dashboard and click the "Join" button.'
    },
  ],
  teacher: [
    {
      question: 'কিভাবে নতুন অ্যাসাইনমেন্ট তৈরি করব?',
      questionEn: 'How do I create a new assignment?',
      answer: 'টিচার ড্যাশবোর্ডে যান, অ্যাসাইনমেন্ট গ্রেডার সেকশনে ক্লিক করুন এবং "নতুন অ্যাসাইনমেন্ট" বাটনে ক্লিক করুন।',
      answerEn: 'Go to Teacher Dashboard, click on Assignment Grader section and click "New Assignment" button.'
    },
    {
      question: 'AI কন্টেন্ট জেনারেটর কিভাবে ব্যবহার করব?',
      questionEn: 'How do I use the AI Content Generator?',
      answer: 'টিচার ড্যাশবোর্ডে AI কন্টেন্ট জেনারেটরে যান, বিষয় এবং টপিক নির্বাচন করুন, তারপর জেনারেট করুন।',
      answerEn: 'Go to AI Content Generator in Teacher Dashboard, select subject and topic, then generate.'
    },
    {
      question: 'ছাত্রদের পারফরম্যান্স রিপোর্ট কিভাবে দেখব?',
      questionEn: 'How do I view student performance reports?',
      answer: 'স্টুডেন্ট অ্যানালিটিক্স সেকশনে সকল ছাত্রের বিস্তারিত পারফরম্যান্স রিপোর্ট দেখতে পাবেন।',
      answerEn: 'View detailed performance reports of all students in the Student Analytics section.'
    },
  ],
  parent: [
    {
      question: 'আমার সন্তানের গ্রেড কিভাবে দেখব?',
      questionEn: 'How do I view my child\'s grades?',
      answer: 'প্যারেন্ট পোর্টালে লগইন করে গ্রেড ট্র্যাকার সেকশনে সকল গ্রেড দেখতে পাবেন।',
      answerEn: 'Login to Parent Portal and view all grades in the Grade Tracker section.'
    },
    {
      question: 'শিক্ষকের সাথে কিভাবে যোগাযোগ করব?',
      questionEn: 'How do I contact teachers?',
      answer: 'টিচার কমিউনিকেশন সেকশনে যান এবং সংশ্লিষ্ট শিক্ষকে মেসেজ পাঠান।',
      answerEn: 'Go to Teacher Communication section and send a message to the relevant teacher.'
    },
    {
      question: 'অগ্রগতি রিপোর্ট ডাউনলোড কিভাবে করব?',
      questionEn: 'How do I download progress reports?',
      answer: 'গ্রেড ট্র্যাকারে "রিপোর্ট ডাউনলোড" বাটনে ক্লিক করে PDF ফরম্যাটে রিপোর্ট ডাউনলোড করুন।',
      answerEn: 'Click "Download Report" button in Grade Tracker to download the report in PDF format.'
    },
  ],
};

const tutorials = [
  {
    id: 1,
    title: 'প্ল্যাটফর্ম শুরু করার গাইড',
    titleEn: 'Getting Started Guide',
    duration: '৫ মিনিট',
    durationEn: '5 min',
    category: 'all',
    thumbnail: '🎬',
  },
  {
    id: 2,
    title: 'ড্যাশবোর্ড ব্যবহার করা',
    titleEn: 'Using the Dashboard',
    duration: '৮ মিনিট',
    durationEn: '8 min',
    category: 'all',
    thumbnail: '📊',
  },
  {
    id: 3,
    title: 'AI স্টাডি প্ল্যান তৈরি',
    titleEn: 'Creating AI Study Plan',
    duration: '৬ মিনিট',
    durationEn: '6 min',
    category: 'student',
    thumbnail: '🤖',
  },
  {
    id: 4,
    title: 'অ্যাসাইনমেন্ট গ্রেডিং টিউটোরিয়াল',
    titleEn: 'Assignment Grading Tutorial',
    duration: '১০ মিনিট',
    durationEn: '10 min',
    category: 'teacher',
    thumbnail: '📝',
  },
  {
    id: 5,
    title: 'সন্তানের অগ্রগতি মনিটরিং',
    titleEn: 'Monitoring Child Progress',
    duration: '৭ মিনিট',
    durationEn: '7 min',
    category: 'parent',
    thumbnail: '👨‍👩‍👧',
  },
  {
    id: 6,
    title: 'সার্টিফিকেট এক্সপোর্ট করা',
    titleEn: 'Exporting Certificates',
    duration: '৩ মিনিট',
    durationEn: '3 min',
    category: 'all',
    thumbnail: '🏆',
  },
];

export default function Help() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'bn' ? 'বার্তা পাঠানো হয়েছে' : 'Message Sent',
      description: language === 'bn' 
        ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' 
        : 'We will contact you soon.',
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'teacher': return <UserCheck className="w-4 h-4" />;
      case 'parent': return <Users className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    if (language === 'bn') {
      switch (category) {
        case 'student': return 'শিক্ষার্থী';
        case 'teacher': return 'শিক্ষক';
        case 'parent': return 'অভিভাবক';
        default: return 'সকল';
      }
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const filterFAQs = (faqs: typeof faqData.student) => {
    if (!searchQuery) return faqs;
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answerEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'bn' ? 'সাহায্য কেন্দ্র' : 'Help Center'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'আপনার যেকোনো প্রশ্নের উত্তর খুঁজুন, টিউটোরিয়াল দেখুন, অথবা আমাদের সাথে যোগাযোগ করুন।'
              : 'Find answers to your questions, watch tutorials, or contact us for support.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={language === 'bn' ? 'প্রশ্ন খুঁজুন...' : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{language === 'bn' ? 'শিক্ষার্থী গাইড' : 'Student Guide'}</p>
          </Card>
          <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
            <UserCheck className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <p className="font-medium">{language === 'bn' ? 'শিক্ষক গাইড' : 'Teacher Guide'}</p>
          </Card>
          <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
            <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-medium">{language === 'bn' ? 'অভিভাবক গাইড' : 'Parent Guide'}</p>
          </Card>
          <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">{language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="faq" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              {language === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ'}
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="gap-2">
              <Book className="w-4 h-4" />
              {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorials'}
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="w-4 h-4" />
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Student FAQs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    {language === 'bn' ? 'শিক্ষার্থী' : 'Student'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {filterFAQs(faqData.student).map((faq, idx) => (
                      <AccordionItem key={idx} value={`student-${idx}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left text-sm hover:no-underline">
                          {language === 'bn' ? faq.question : faq.questionEn}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {language === 'bn' ? faq.answer : faq.answerEn}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Teacher FAQs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-secondary" />
                    {language === 'bn' ? 'শিক্ষক' : 'Teacher'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {filterFAQs(faqData.teacher).map((faq, idx) => (
                      <AccordionItem key={idx} value={`teacher-${idx}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left text-sm hover:no-underline">
                          {language === 'bn' ? faq.question : faq.questionEn}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {language === 'bn' ? faq.answer : faq.answerEn}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Parent FAQs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    {language === 'bn' ? 'অভিভাবক' : 'Parent'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {filterFAQs(faqData.parent).map((faq, idx) => (
                      <AccordionItem key={idx} value={`parent-${idx}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left text-sm hover:no-underline">
                          {language === 'bn' ? faq.question : faq.questionEn}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {language === 'bn' ? faq.answer : faq.answerEn}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="group hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center text-5xl relative">
                    {tutorial.thumbnail}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs gap-1">
                        {getCategoryIcon(tutorial.category)}
                        {getCategoryLabel(tutorial.category)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Clock className="w-3 h-3" />
                        {language === 'bn' ? tutorial.duration : tutorial.durationEn}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">
                      {language === 'bn' ? tutorial.title : tutorial.titleEn}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'bn' ? 'বার্তা পাঠান' : 'Send a Message'}</CardTitle>
                  <CardDescription>
                    {language === 'bn' 
                      ? 'আমাদের টিম ২৪ ঘন্টার মধ্যে উত্তর দেবে।'
                      : 'Our team will respond within 24 hours.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'bn' ? 'নাম' : 'Name'}
                      </label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'bn' ? 'ইমেইল' : 'Email'}
                      </label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'bn' ? 'বার্তা' : 'Message'}
                      </label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {language === 'bn' ? 'ইমেইল সাপোর্ট' : 'Email Support'}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {language === 'bn' ? 'সাধারণ প্রশ্নের জন্য' : 'For general inquiries'}
                      </p>
                      <a href="mailto:support@eduplatform.bd" className="text-primary hover:underline">
                        support@eduplatform.bd
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {language === 'bn' ? 'ফোন সাপোর্ট' : 'Phone Support'}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {language === 'bn' ? 'সকাল ৯টা - রাত ৯টা' : '9 AM - 9 PM'}
                      </p>
                      <a href="tel:+8801712345678" className="text-primary hover:underline">
                        +880 1712-345678
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {language === 'bn' ? 'লাইভ চ্যাট' : 'Live Chat'}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {language === 'bn' ? 'তাৎক্ষণিক সাহায্যের জন্য' : 'For instant help'}
                      </p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {language === 'bn' ? 'অনলাইন' : 'Online'}
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
