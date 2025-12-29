import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials, faqData } from '@/data/demoData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Landing() {
  const { language, t } = useLanguage();

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
    { icon: Award, title: t('features.badges.title'), desc: t('features.badges.desc') },
    { icon: Users, title: t('features.collab.title'), desc: t('features.collab.desc') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
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
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                <Play className="h-5 w-5" /> {t('hero.cta.demo')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
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
                      <span key={i} className="text-accent">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
        <div className="container mx-auto px-4">
          <Card className="gradient-secondary text-white p-12 text-center rounded-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <Link to="/student">
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 gap-2 text-lg px-8">
                {t('cta.button')} <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
