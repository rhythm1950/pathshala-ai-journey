import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award, TrendingUp, CheckCircle, Zap, Target, Shield, Star, Building, GraduationCap, Mail, ChevronRight, Globe, Brain, Rocket, Clock, BarChart3, Layers, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { testimonials, faqData } from '@/data/demoData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import heroMockup from '@/assets/hero-mockup.jpg';
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
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
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
    { value: '50K+', label: t('stats.students'), icon: Users, color: 'from-primary/20 to-primary/5' },
    { value: '500+', label: t('stats.courses'), icon: BookOpen, color: 'from-accent/20 to-accent/5' },
    { value: '200+', label: t('stats.teachers'), icon: Award, color: 'from-highlight/20 to-highlight/5' },
    { value: '95%', label: t('stats.success'), icon: TrendingUp, color: 'from-primary/20 to-primary/5' },
  ];

  const features = [
    { icon: Sparkles, title: t('features.aiPlan.title'), desc: t('features.aiPlan.desc'), gradient: 'from-primary to-highlight' },
    { icon: Play, title: t('features.liveClass.title'), desc: t('features.liveClass.desc'), gradient: 'from-accent to-highlight' },
    { icon: BarChart3, title: t('features.skillGap.title'), desc: t('features.skillGap.desc'), gradient: 'from-highlight to-primary' },
    { icon: Rocket, title: t('features.career.title'), desc: t('features.career.desc'), gradient: 'from-primary to-accent' },
    { icon: Shield, title: t('features.badges.title'), desc: t('features.badges.desc'), gradient: 'from-accent to-primary' },
    { icon: Users, title: t('features.collab.title'), desc: t('features.collab.desc'), gradient: 'from-highlight to-accent' },
  ];

  const howItWorks = [
    { step: 1, title: language === 'bn' ? 'সাইন আপ করুন' : 'Sign Up', desc: language === 'bn' ? 'বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং আপনার প্রোফাইল সেটআপ করুন' : 'Create your free account and set up your learning profile in under 2 minutes', icon: Users },
    { step: 2, title: language === 'bn' ? 'AI বিশ্লেষণ' : 'AI Analysis', desc: language === 'bn' ? 'AI আপনার শেখার ধরন এবং দক্ষতা বিশ্লেষণ করবে' : 'Our AI analyzes your learning style, strengths, and areas for improvement', icon: Brain },
    { step: 3, title: language === 'bn' ? 'ব্যক্তিগত পথ' : 'Personal Path', desc: language === 'bn' ? 'আপনার জন্য কাস্টমাইজড শিক্ষা পথ তৈরি হবে' : 'Get a customized learning roadmap tailored to your goals and pace', icon: Target },
    { step: 4, title: language === 'bn' ? 'শিখুন ও বাড়ুন' : 'Learn & Grow', desc: language === 'bn' ? 'ইন্টারেক্টিভ কন্টেন্ট দিয়ে শিখুন এবং সার্টিফিকেট অর্জন করুন' : 'Learn with interactive content, earn badges, and get certified', icon: GraduationCap },
  ];

  const pricingPlans = [
    {
      name: language === 'bn' ? 'বেসিক' : 'Starter',
      price: language === 'bn' ? 'বিনামূল্যে' : 'Free',
      period: '',
      desc: language === 'bn' ? 'শুরু করার জন্য পারফেক্ট' : 'Perfect to get started',
      features: language === 'bn'
        ? ['৫টি বিনামূল্যে কোর্স', 'বেসিক AI সুপারিশ', 'কমিউনিটি সাপোর্ট', 'মোবাইল অ্যাপ অ্যাক্সেস']
        : ['5 Free Courses', 'Basic AI Recommendations', 'Community Support', 'Mobile App Access'],
      popular: false,
      cta: language === 'bn' ? 'শুরু করুন' : 'Get Started Free',
    },
    {
      name: language === 'bn' ? 'প্রো' : 'Pro',
      price: '৳499',
      period: language === 'bn' ? '/মাস' : '/mo',
      desc: language === 'bn' ? 'সিরিয়াস শিক্ষার্থীদের জন্য' : 'For serious learners',
      features: language === 'bn'
        ? ['সব কোর্স অ্যাক্সেস', 'অ্যাডভান্সড AI স্টাডি প্ল্যান', 'লাইভ ক্লাস অ্যাক্সেস', 'প্রায়োরিটি সাপোর্ট', 'সার্টিফিকেট', 'স্কিল অ্যানালিটিক্স']
        : ['All Course Access', 'Advanced AI Study Plan', 'Unlimited Live Classes', 'Priority Support', 'Verified Certificates', 'Skill Analytics'],
      popular: true,
      cta: language === 'bn' ? 'প্রো নিন' : 'Start Pro Trial',
    },
    {
      name: language === 'bn' ? 'টিম' : 'Team',
      price: language === 'bn' ? 'কাস্টম' : 'Custom',
      period: '',
      desc: language === 'bn' ? 'প্রতিষ্ঠানের জন্য' : 'For institutions',
      features: language === 'bn'
        ? ['সব প্রো ফিচার', 'ডেডিকেটেড সাপোর্ট', 'কাস্টম ইন্টিগ্রেশন', 'অ্যানালিটিক্স ড্যাশবোর্ড', 'হোয়াইট লেবেলিং']
        : ['Everything in Pro', 'Dedicated Account Manager', 'Custom Integrations', 'Admin Analytics', 'White Labeling'],
      popular: false,
      cta: language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Sales',
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
      {/* ════════════════════════════════════════════
          HERO SECTION 
      ════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-primary/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] bg-accent/6 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-highlight/4 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-primary/15"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t('hero.badge')}
                <ChevronRight className="h-3 w-3" />
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight"
              >
                {t('hero.title')}{' '}
                <span className="gradient-text inline-block">{t('hero.titleHighlight')}</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2}
                className="text-base lg:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3">
                <Link to="/auth">
                  <Button size="lg" className="btn-gradient gap-2 text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                    {t('hero.cta.student')} <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 rounded-xl border-2 hover:bg-muted/50" onClick={() => setDemoOpen(true)}>
                  <Play className="h-4 w-4" /> {t('hero.cta.demo')}
                </Button>
              </motion.div>

              {/* Trust row */}
              <motion.div variants={fadeUp} custom={4}
                className="mt-10 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> {language === 'bn' ? 'বিনামূল্যে শুরু করুন' : 'Free to start'}</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> {language === 'bn' ? 'ক্রেডিট কার্ড দরকার নেই' : 'No credit card'}</span>
                <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-primary" /> {language === 'bn' ? 'বাংলায় শিখুন' : 'Learn in Bengali'}</span>
              </motion.div>
            </motion.div>

            {/* Right: Hero Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/15 to-highlight/20 rounded-3xl blur-2xl" />
                <img
                  src={heroMockup}
                  alt="Pathshala AI Platform"
                  className="relative rounded-2xl shadow-2xl border border-border/30 w-full"
                />
                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 top-1/4 bg-card/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{language === 'bn' ? 'অগ্রগতি' : 'Progress'}</p>
                      <p className="text-lg font-black gradient-text">92%</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 bottom-1/4 bg-card/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{language === 'bn' ? 'ব্যাজ অর্জিত' : 'Badges Earned'}</p>
                      <p className="text-lg font-black">12 🏆</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SOCIAL PROOF MARQUEE
      ════════════════════════════════════════════ */}
      <section className="py-6 border-y border-border/30 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap opacity-50">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground whitespace-nowrap">
                <Building className="h-5 w-5" />
                <span className="text-sm font-semibold">{language === 'bn' ? partner.name : partner.nameEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={scaleUp} custom={index}>
                <div className="relative group cursor-default">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative bg-card border border-border/40 rounded-2xl p-6 lg:p-8 text-center hover:border-primary/20 hover:shadow-lg transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-black gradient-text mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-xs lg:text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
              <Zap className="h-3.5 w-3.5" /> {language === 'bn' ? 'কিভাবে কাজ করে' : 'How it works'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-black mb-5">
              {language === 'bn' ? 'চারটি ধাপে শুরু করুন' : 'Get Started in 4 Steps'}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-xl mx-auto text-base lg:text-lg">
              {language === 'bn' ? 'আপনার ব্যক্তিগত শিক্ষা যাত্রা আজই শুরু করুন' : 'Begin your personalized learning journey today'}
            </motion.p>
          </motion.div>

          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div key={index} variants={fadeUp} custom={index} className="relative group">
                  <div className="relative bg-card border border-border/40 rounded-2xl p-7 text-center h-full hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                    {/* Step number */}
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center font-black text-white text-base shadow-lg mx-auto mb-6 relative z-10">
                      {item.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURES - Bento Grid Style
      ════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
              <Layers className="h-3.5 w-3.5" /> {language === 'bn' ? 'ফিচার সমূহ' : 'Features'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-black mb-5">{t('features.title')}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-xl mx-auto text-base lg:text-lg">{t('features.subtitle')}</motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {features.map((feature, index) => (
              <motion.div key={index} variants={scaleUp} custom={index}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-card border border-border/40 rounded-2xl p-7 h-full hover:border-primary/25 hover:shadow-xl transition-all duration-500">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 shadow-sm`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {language === 'bn' ? 'আরও জানুন' : 'Learn more'} <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INTERACTIVE DEMO PREVIEW
      ════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp} custom={0}>
                <div className="inline-flex items-center gap-2 bg-highlight/10 text-highlight px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" /> {language === 'bn' ? 'AI চালিত' : 'AI-Powered'}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black mb-5">
                  {language === 'bn' ? 'আপনার শেখার সাথী হিসেবে AI' : 'AI as Your Learning Companion'}
                </h2>
                <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                  {language === 'bn'
                    ? 'আমাদের AI সিস্টেম আপনার শেখার ধরন বুঝে এবং ব্যক্তিগতকৃত পরামর্শ দেয়। রিয়েল-টাইম ফিডব্যাক এবং অভিযোজিত পাঠ্যক্রম দিয়ে আপনার শিক্ষা যাত্রাকে ত্বরান্বিত করুন।'
                    : 'Our AI understands your learning patterns and provides personalized guidance. Accelerate your learning with real-time feedback and adaptive curriculum.'}
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Brain, text: language === 'bn' ? 'স্মার্ট স্টাডি প্ল্যান জেনারেশন' : 'Smart study plan generation' },
                    { icon: BarChart3, text: language === 'bn' ? 'রিয়েল-টাইম পারফরম্যান্স ট্র্যাকিং' : 'Real-time performance tracking' },
                    { icon: MessageCircle, text: language === 'bn' ? 'AI টিউটর সাপোর্ট ২৪/৭' : 'AI tutor support 24/7' },
                    { icon: Target, text: language === 'bn' ? 'দুর্বলতা চিহ্নিত ও উন্নতি' : 'Weakness identification & improvement' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Button className="btn-gradient mt-8 gap-2 rounded-xl" size="lg" onClick={() => setDemoOpen(true)}>
                  {language === 'bn' ? 'ডেমো দেখুন' : 'Watch Demo'} <Play className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div variants={scaleUp} custom={1}>
                {/* Fake dashboard preview */}
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl blur-xl" />
                  <div className="relative bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Fake top bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-warning/60" />
                        <div className="w-3 h-3 rounded-full bg-primary/40" />
                      </div>
                      <div className="flex-1 mx-8">
                        <div className="bg-muted rounded-lg h-6 max-w-[200px] mx-auto" />
                      </div>
                    </div>
                    {/* Fake content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-4 w-32 bg-foreground/10 rounded mb-2" />
                          <div className="h-3 w-48 bg-muted-foreground/10 rounded" />
                        </div>
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      {/* Progress bars */}
                      <div className="grid grid-cols-2 gap-3">
                        {[85, 72, 93, 68].map((val, i) => (
                          <div key={i} className="bg-muted/50 rounded-xl p-4">
                            <div className="h-2.5 w-16 bg-muted-foreground/10 rounded mb-3" />
                            <div className="w-full bg-muted rounded-full h-2">
                              <motion.div
                                className="h-2 rounded-full gradient-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${val}%` }}
                                transition={{ duration: 1.5, delay: 0.5 + i * 0.15 }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <div className="text-right mt-1">
                              <span className="text-xs font-bold text-primary">{val}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* AI recommendation card */}
                      <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl p-4 border border-primary/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="text-xs font-bold text-primary">{language === 'bn' ? 'AI সুপারিশ' : 'AI Recommendation'}</span>
                        </div>
                        <div className="h-3 w-full bg-foreground/5 rounded mb-1.5" />
                        <div className="h-3 w-3/4 bg-foreground/5 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-highlight/10 text-highlight px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
              <Zap className="h-3.5 w-3.5" /> {language === 'bn' ? 'প্রাইসিং' : 'Pricing'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-black mb-5">
              {language === 'bn' ? 'সহজ ও স্বচ্ছ মূল্য' : 'Simple, Transparent Pricing'}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-xl mx-auto text-base lg:text-lg">
              {language === 'bn' ? 'আপনার প্রয়োজন অনুযায়ী সঠিক প্ল্যান বেছে নিন' : 'Choose the plan that fits your learning goals'}
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {pricingPlans.map((plan, index) => (
              <motion.div key={index} variants={fadeUp} custom={index}>
                <Card className={`relative overflow-hidden rounded-2xl transition-all duration-500 h-full flex flex-col ${plan.popular ? 'border-2 border-primary shadow-2xl bg-card ring-1 ring-primary/10' : 'border border-border/40 bg-card hover:border-primary/20 hover:shadow-lg'}`}>
                  {plan.popular && (
                    <div className="gradient-primary py-2.5 text-center">
                      <span className="text-white text-xs font-bold tracking-widest uppercase">
                        {language === 'bn' ? '🔥 সবচেয়ে জনপ্রিয়' : '🔥 Most Popular'}
                      </span>
                    </div>
                  )}
                  <CardContent className="p-7 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
                    <div className="mb-6">
                      <span className="text-4xl lg:text-5xl font-black tracking-tight">{plan.price}</span>
                      <span className="text-muted-foreground text-base ml-1">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/auth" className="block">
                      <Button className={`w-full py-5 rounded-xl text-sm font-bold ${plan.popular ? 'btn-gradient shadow-md' : ''}`} variant={plan.popular ? 'default' : 'outline'} size="lg">
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

      {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
              <Star className="h-3.5 w-3.5 fill-accent" /> {language === 'bn' ? 'শিক্ষার্থীদের মতামত' : 'Student Reviews'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-black mb-5">{t('testimonials.title')}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-base lg:text-lg">{t('testimonials.subtitle')}</motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={fadeUp} custom={index}>
                <Card className="border border-border/40 bg-card rounded-2xl p-7 h-full hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      "{language === 'bn' ? testimonial.quote : testimonial.quoteEn}"
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-border/30">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-11 h-11 rounded-full ring-2 ring-primary/15" />
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

      {/* ════════════════════════════════════════════
          NEWSLETTER
      ════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp} custom={0}>
            <div className="relative overflow-hidden gradient-secondary rounded-3xl shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-[80px]" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 p-10 md:p-14 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                  {language === 'bn' ? 'নিউজলেটার সাবস্ক্রাইব করুন' : 'Stay in the Loop'}
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto text-sm lg:text-base">
                  {language === 'bn'
                    ? 'নতুন কোর্স, অফার এবং শিক্ষা টিপস সরাসরি আপনার ইনবক্সে পান'
                    : 'Get new courses, offers, and learning tips directly to your inbox'}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                  <Input
                    type="email"
                    placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'your@email.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl text-sm backdrop-blur-sm"
                    required
                  />
                  <Button type="submit" className="bg-white text-secondary hover:bg-white/90 whitespace-nowrap h-12 px-6 rounded-xl font-bold text-sm">
                    {language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
              <Clock className="h-3.5 w-3.5" /> {language === 'bn' ? 'সচরাচর প্রশ্ন' : 'FAQ'}
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-black mb-5">{t('faq.title')}</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-base lg:text-lg">{t('faq.subtitle')}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/40 px-6 rounded-2xl overflow-hidden data-[state=open]:border-primary/20 data-[state=open]:shadow-md transition-all">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 text-sm">
                    {language === 'bn' ? faq.question : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                    {language === 'bn' ? faq.answer : faq.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp} custom={0}>
            <div className="relative overflow-hidden gradient-primary rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
              <div className="relative z-10 p-12 md:p-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-5 leading-tight">{t('cta.title')}</h2>
                <p className="text-white/70 mb-10 max-w-lg mx-auto text-base lg:text-lg leading-relaxed">{t('cta.subtitle')}</p>
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 text-base px-10 py-7 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                    {t('cta.button')} <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-white/40 text-xs mt-6">
                  {language === 'bn' ? 'বিনামূল্যে শুরু করুন • কোনো ক্রেডিট কার্ড লাগবে না' : 'Free to start • No credit card required'}
                </p>
              </div>
            </div>
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
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
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
