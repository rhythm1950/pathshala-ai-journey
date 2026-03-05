import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award, TrendingUp, CheckCircle, Zap, Target, Shield, Star, Building, GraduationCap, Mail, ChevronRight, Globe, Brain, Rocket, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { testimonials, faqData } from '@/data/demoData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

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
    { step: 1, title: language === 'bn' ? 'সাইন আপ করুন' : 'Sign Up', desc: language === 'bn' ? 'বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আপনার প্রোফাইল সেটআপ করুন' : 'Create a free account and set up your profile', icon: Users },
    { step: 2, title: language === 'bn' ? 'AI বিশ্লেষণ' : 'AI Analysis', desc: language === 'bn' ? 'AI আপনার শেখার ধরন এবং দক্ষতা বিশ্লেষণ করবে' : 'AI analyzes your learning style and skills', icon: Brain },
    { step: 3, title: language === 'bn' ? 'ব্যক্তিগত পথ' : 'Personal Path', desc: language === 'bn' ? 'আপনার জন্য কাস্টমাইজড শিক্ষা পথ তৈরি হবে' : 'A customized learning path is created for you', icon: Target },
    { step: 4, title: language === 'bn' ? 'শিখুন ও বাড়ুন' : 'Learn & Grow', desc: language === 'bn' ? 'ইন্টারেক্টিভ কন্টেন্ট দিয়ে শিখুন এবং সার্টিফিকেট অর্জন করুন' : 'Learn with interactive content and earn certificates', icon: Rocket },
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

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ════════════════ HERO ════════════════ */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-highlight/5 rounded-full blur-[150px]" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-primary/20"
            >
              <Sparkles className="h-4 w-4" />
              {t('hero.badge')}
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight"
            >
              {t('hero.title')}{' '}
              <span className="gradient-text inline-block">{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/auth">
                <Button size="lg" className="btn-gradient gap-2 text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  {t('hero.cta.student')} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-10 py-6 rounded-xl border-2" onClick={() => setDemoOpen(true)}>
                <Play className="h-5 w-5" /> {t('hero.cta.demo')}
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} custom={4}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> {language === 'bn' ? 'বিনামূল্যে শুরু করুন' : 'Free to start'}</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> {language === 'bn' ? 'ক্রেডিট কার্ড দরকার নেই' : 'No credit card needed'}</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-primary" /> {language === 'bn' ? 'বাংলায় শিখুন' : 'Learn in Bengali'}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ STATS ════════════════ */}
      <section className="relative py-20 -mt-10 z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeUp} custom={index}>
                <Card className="relative overflow-hidden border-0 bg-card/80 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-500 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 lg:p-8 text-center relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/40 to-transparent" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="h-4 w-4" /> {language === 'bn' ? '৪টি সহজ ধাপ' : '4 Simple Steps'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-black mb-4">
              {language === 'bn' ? 'কিভাবে কাজ করে' : 'How It Works'}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {language === 'bn' ? '৪টি সহজ ধাপে আপনার শিক্ষা যাত্রা শুরু করুন' : 'Start your learning journey in 4 simple steps'}
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {howItWorks.map((item, index) => (
              <motion.div key={index} variants={fadeUp} custom={index} className="relative group">
                <div className="relative bg-card border border-border/50 rounded-2xl p-8 text-center h-full hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full gradient-primary flex items-center justify-center font-black text-white text-sm shadow-lg">
                    {item.step}
                  </div>
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-primary/40">
                    <ChevronRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" /> {language === 'bn' ? 'শক্তিশালী ফিচার' : 'Powerful Features'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-black mb-4">{t('features.title')}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-2xl mx-auto text-lg">{t('features.subtitle')}</motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeUp} custom={index}>
                <Card className="relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm p-8 group hover:border-primary/30 hover:shadow-xl transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-0 relative z-10">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ PRICING ════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-highlight/10 text-highlight px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="h-4 w-4" /> {language === 'bn' ? 'সেরা মূল্য' : 'Best Value'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-black mb-4">
              {language === 'bn' ? 'প্রাইসিং প্ল্যান' : 'Pricing Plans'}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {language === 'bn' ? 'আপনার প্রয়োজন অনুযায়ী সঠিক প্ল্যান বেছে নিন' : 'Choose the right plan for your needs'}
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {pricingPlans.map((plan, index) => (
              <motion.div key={index} variants={fadeUp} custom={index}>
                <Card className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${plan.popular ? 'border-2 border-primary shadow-2xl scale-[1.04] bg-card' : 'border border-border/50 bg-card/80 hover:border-primary/20 hover:shadow-lg'}`}>
                  {plan.popular && (
                    <div className="gradient-primary py-2 text-center">
                      <span className="text-white text-sm font-bold tracking-wide uppercase">
                        {language === 'bn' ? '🔥 সবচেয়ে জনপ্রিয়' : '🔥 Most Popular'}
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-8">
                      <span className="text-5xl font-black">{plan.price}</span>
                      <span className="text-muted-foreground text-lg">{plan.period}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/auth">
                      <Button className={`w-full py-6 rounded-xl text-base font-semibold ${plan.popular ? 'btn-gradient shadow-lg' : ''}`} variant={plan.popular ? 'default' : 'outline'} size="lg">
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ PARTNERS ════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl lg:text-4xl font-black mb-4">
              {language === 'bn' ? 'আমাদের পার্টনার' : 'Trusted Partners'}
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {language === 'bn' ? 'বাংলাদেশের শীর্ষ শিক্ষা প্রতিষ্ঠানগুলো আমাদের সাথে কাজ করছে' : 'Top educational institutions in Bangladesh trust us'}
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {partners.map((partner, index) => (
              <motion.div key={index} variants={fadeUp} custom={index}>
                <div className="bg-card border border-border/50 rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Building className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground">{language === 'bn' ? partner.name : partner.nameEn}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIALS ════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="h-4 w-4 fill-accent" /> {language === 'bn' ? 'শিক্ষার্থীদের মতামত' : 'Student Reviews'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-black mb-4">{t('testimonials.title')}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">{t('testimonials.subtitle')}</motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={fadeUp} custom={index}>
                <Card className="border border-border/50 bg-card/80 backdrop-blur-sm p-8 h-full hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="flex gap-1 mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      "{language === 'bn' ? testimonial.quote : testimonial.quoteEn}"
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full ring-2 ring-primary/20" />
                      <div>
                        <div className="font-bold text-sm">{language === 'bn' ? testimonial.name : testimonial.nameEn}</div>
                        <div className="text-xs text-muted-foreground">{language === 'bn' ? testimonial.role : testimonial.roleEn}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ NEWSLETTER ════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Card className="relative overflow-hidden gradient-secondary rounded-3xl border-0 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-[80px]" />
              <CardContent className="relative z-10 p-10 md:p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  {language === 'bn' ? 'নিউজলেটার সাবস্ক্রাইব করুন' : 'Stay in the Loop'}
                </h2>
                <p className="text-white/70 mb-8 max-w-lg mx-auto text-lg">
                  {language === 'bn'
                    ? 'নতুন কোর্স, অফার এবং শিক্ষা টিপস সরাসরি আপনার ইনবক্সে পান'
                    : 'Get new courses, offers, and learning tips directly to your inbox'}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'your@email.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-13 rounded-xl text-base"
                    required
                  />
                  <Button type="submit" className="bg-white text-secondary hover:bg-white/90 whitespace-nowrap h-13 px-8 rounded-xl font-bold">
                    {language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ FAQ ════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Clock className="h-4 w-4" /> {language === 'bn' ? 'সচরাচর প্রশ্ন' : 'FAQ'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-black mb-4">{t('faq.title')}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">{t('faq.subtitle')}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/50 px-6 rounded-2xl overflow-hidden">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {language === 'bn' ? faq.question : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {language === 'bn' ? faq.answer : faq.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Card className="relative overflow-hidden gradient-primary border-0 rounded-3xl shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
              <CardContent className="relative z-10 p-12 md:p-20 text-center">
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">{t('cta.title')}</h2>
                <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg leading-relaxed">{t('cta.subtitle')}</p>
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 text-lg px-12 py-7 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all">
                    {t('cta.button')} <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Demo Dialog */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-4xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{language === 'bn' ? 'প্ল্যাটফর্ম ডেমো' : 'Platform Demo'}</DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'পাঠশালা AI কিভাবে কাজ করে দেখুন' : 'See how Pathshala AI works'}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <p className="text-muted-foreground font-medium">
                {language === 'bn' ? 'ডেমো ভিডিও শীঘ্রই আসছে' : 'Demo video coming soon'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
