import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award, TrendingUp, CheckCircle, Zap, Target, Shield, Star, Building, GraduationCap, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { testimonials, faqData } from '@/data/demoData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Landing() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [demoOpen, setDemoOpen] = useState(false);

  const stats = [
    { value: '50,000+', label: t('stats.students'), icon: Users },
    { value: '500+', label: t('stats.courses'), icon: BookOpen },
    { value: '200+', label: t('stats.teachers'), icon: Award },
    { value: '95%', label: t('stats.success'), icon: TrendingUp },
  ];

  const features = [
    { icon: Sparkles, title: t('features.aiPlan.title'), desc: t('features.aiPlan.desc') },
    { icon: Play, title: t('features.liveClass.title'), desc: t('features.liveClass.desc') },
    { icon: TrendingUp, title: t('features.skillGap.title'), desc: t('features.skillGap.desc') },
    { icon: Award, title: t('features.career.title'), desc: t('features.career.desc') },
    { icon: Shield, title: t('features.badges.title'), desc: t('features.badges.desc') },
    { icon: Users, title: t('features.collab.title'), desc: t('features.collab.desc') },
  ];

  const howItWorks = [
    {
      step: 1,
      title: language === 'bn' ? 'সাইন আপ করুন' : 'Sign Up',
      desc: language === 'bn' ? 'বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আপনার প্রোফাইল সেটআপ করুন' : 'Create a free account and set up your profile',
      icon: Users,
    },
    {
      step: 2,
      title: language === 'bn' ? 'AI বিশ্লেষণ' : 'AI Analysis',
      desc: language === 'bn' ? 'AI আপনার শেখার ধরন এবং দক্ষতা বিশ্লেষণ করবে' : 'AI analyzes your learning style and skills',
      icon: Sparkles,
    },
    {
      step: 3,
      title: language === 'bn' ? 'ব্যক্তিগত পথ' : 'Personal Path',
      desc: language === 'bn' ? 'আপনার জন্য কাস্টমাইজড শিক্ষা পথ তৈরি হবে' : 'A customized learning path is created for you',
      icon: Target,
    },
    {
      step: 4,
      title: language === 'bn' ? 'শিখুন ও বাড়ুন' : 'Learn & Grow',
      desc: language === 'bn' ? 'ইন্টারেক্টিভ কন্টেন্ট দিয়ে শিখুন এবং সার্টিফিকেট অর্জন করুন' : 'Learn with interactive content and earn certificates',
      icon: GraduationCap,
    },
  ];

  const pricingPlans = [
    {
      name: language === 'bn' ? 'বেসিক' : 'Basic',
      price: language === 'bn' ? 'বিনামূল্যে' : 'Free',
      period: '',
      features: language === 'bn' 
        ? ['৫টি বিনামূল্যে কোর্স', 'বেসিক AI সুপারিশ', 'কমিউনিটি সাপোর্ট', 'মোবাইল অ্যাপ অ্যাক্সেস']
        : ['5 Free Courses', 'Basic AI Recommendations', 'Community Support', 'Mobile App Access'],
      popular: false,
      cta: language === 'bn' ? 'শুরু করুন' : 'Get Started',
    },
    {
      name: language === 'bn' ? 'প্রো' : 'Pro',
      price: '৳499',
      period: language === 'bn' ? '/মাস' : '/month',
      features: language === 'bn'
        ? ['সব কোর্স অ্যাক্সেস', 'অ্যাডভান্সড AI স্টাডি প্ল্যান', 'লাইভ ক্লাস অ্যাক্সেস', 'প্রায়োরিটি সাপোর্ট', 'সার্টিফিকেট']
        : ['All Course Access', 'Advanced AI Study Plan', 'Live Class Access', 'Priority Support', 'Certificates'],
      popular: true,
      cta: language === 'bn' ? 'প্রো নিন' : 'Go Pro',
    },
    {
      name: language === 'bn' ? 'এন্টারপ্রাইজ' : 'Enterprise',
      price: language === 'bn' ? 'কাস্টম' : 'Custom',
      period: '',
      features: language === 'bn'
        ? ['সব প্রো ফিচার', 'ডেডিকেটেড সাপোর্ট', 'কাস্টম ইন্টিগ্রেশন', 'অ্যানালিটিক্স ড্যাশবোর্ড', 'হোয়াইট লেবেলিং']
        : ['All Pro Features', 'Dedicated Support', 'Custom Integration', 'Analytics Dashboard', 'White Labeling'],
      popular: false,
      cta: language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us',
    },
  ];

  const partners = [
    { name: 'ঢাকা বিশ্ববিদ্যালয়', nameEn: 'Dhaka University' },
    { name: 'BUET', nameEn: 'BUET' },
    { name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়', nameEn: 'Jahangirnagar University' },
    { name: 'চট্টগ্রাম বিশ্ববিদ্যালয়', nameEn: 'Chittagong University' },
    { name: 'রাজশাহী বিশ্ববিদ্যালয়', nameEn: 'Rajshahi University' },
    { name: 'খুলনা বিশ্ববিদ্যালয়', nameEn: 'Khulna University' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: language === 'bn' ? 'সাবস্ক্রিপশন সফল!' : 'Subscription Successful!',
        description: language === 'bn' ? 'আপনি আমাদের নিউজলেটারে সাবস্ক্রাইব করেছেন।' : 'You have subscribed to our newsletter.',
      });
      setEmail('');
    }
  };

  const handleDemoClick = () => {
    setDemoOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-slide-up">
              {t('hero.title')} <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/student">
                <Button size="lg" className="btn-gradient gap-2 text-lg px-8">
                  {t('hero.cta.student')} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8" onClick={handleDemoClick}>
                <Play className="h-5 w-5" /> {t('hero.cta.demo')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card text-center p-6 card-hover">
                <CardContent className="p-0">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {language === 'bn' ? 'কিভাবে কাজ করে' : 'How It Works'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'bn' ? '৪টি সহজ ধাপে আপনার শিক্ষা যাত্রা শুরু করুন' : 'Start your learning journey in 4 simple steps'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <Card className="glass-card p-6 card-hover text-center h-full">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-6 card-hover group">
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {language === 'bn' ? 'প্রাইসিং প্ল্যান' : 'Pricing Plans'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'bn' ? 'আপনার প্রয়োজন অনুযায়ী সঠিক প্ল্যান বেছে নিন' : 'Choose the right plan for your needs'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative p-6 ${plan.popular ? 'border-primary shadow-lg scale-105' : 'glass-card'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                    </span>
                  </div>
                )}
                <CardContent className="p-0 pt-4">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/student">
                    <Button className={`w-full ${plan.popular ? 'btn-gradient' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {language === 'bn' ? 'আমাদের পার্টনার' : 'Our Partners'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'bn' ? 'বাংলাদেশের শীর্ষ শিক্ষা প্রতিষ্ঠানগুলো আমাদের সাথে কাজ করছে' : 'Top educational institutions in Bangladesh are working with us'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="glass-card p-6 card-hover text-center">
                <CardContent className="p-0">
                  <Building className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <p className="text-sm font-medium">{language === 'bn' ? partner.name : partner.nameEn}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
            <p className="text-muted-foreground">{t('testimonials.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="glass-card p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold">{language === 'bn' ? testimonial.name : testimonial.nameEn}</div>
                      <div className="text-sm text-muted-foreground">{language === 'bn' ? testimonial.role : testimonial.roleEn}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">"{language === 'bn' ? testimonial.quote : testimonial.quoteEn}"</p>
                  <div className="flex gap-1 mt-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="gradient-secondary text-white p-8 md:p-12 rounded-2xl">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'bn' ? 'নিউজলেটার সাবস্ক্রাইব করুন' : 'Subscribe to Newsletter'}
              </h2>
              <p className="text-white/80 mb-6">
                {language === 'bn' 
                  ? 'নতুন কোর্স, অফার এবং শিক্ষা টিপস সরাসরি আপনার ইনবক্সে পান'
                  : 'Get new courses, offers, and learning tips directly to your inbox'}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
                <Button type="submit" className="bg-white text-secondary hover:bg-white/90 whitespace-nowrap">
                  {language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('faq.title')}</h2>
            <p className="text-muted-foreground">{t('faq.subtitle')}</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass-card px-6 rounded-lg border-none">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {language === 'bn' ? faq.question : faq.questionEn}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {language === 'bn' ? faq.answer : faq.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="gradient-primary text-white p-12 text-center rounded-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <Link to="/student">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 text-lg px-8">
                {t('cta.button')} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Demo Video Dialog */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{language === 'bn' ? 'প্ল্যাটফর্ম ডেমো' : 'Platform Demo'}</DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'পাঠশালা AI কিভাবে কাজ করে দেখুন' : 'See how Pathshala AI works'}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                {language === 'bn' ? 'ডেমো ভিডিও শীঘ্রই আসছে' : 'Demo video coming soon'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
