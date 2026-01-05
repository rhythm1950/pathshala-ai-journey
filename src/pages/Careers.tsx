import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, Coffee } from 'lucide-react';

const Careers = () => {
  const { language } = useLanguage();

  const benefits = language === 'bn' ? [
    { icon: Heart, title: 'স্বাস্থ্য বীমা', desc: 'পরিবারসহ সম্পূর্ণ স্বাস্থ্য কভারেজ' },
    { icon: Coffee, title: 'নমনীয় সময়', desc: 'ওয়ার্ক ফ্রম হোম সুবিধা' },
    { icon: Zap, title: 'শেখার সুযোগ', desc: 'সকল কোর্সে বিনামূল্যে অ্যাক্সেস' },
    { icon: Users, title: 'টিম আউটিং', desc: 'নিয়মিত টিম ইভেন্ট ও ট্রিপ' },
  ] : [
    { icon: Heart, title: 'Health Insurance', desc: 'Full coverage including family' },
    { icon: Coffee, title: 'Flexible Hours', desc: 'Work from home options' },
    { icon: Zap, title: 'Learning', desc: 'Free access to all courses' },
    { icon: Users, title: 'Team Events', desc: 'Regular outings and trips' },
  ];

  const openings = [
    {
      title: language === 'bn' ? 'সিনিয়র ফ্রন্টএন্ড ইঞ্জিনিয়ার' : 'Senior Frontend Engineer',
      department: language === 'bn' ? 'ইঞ্জিনিয়ারিং' : 'Engineering',
      location: language === 'bn' ? 'ঢাকা / রিমোট' : 'Dhaka / Remote',
      type: language === 'bn' ? 'ফুল-টাইম' : 'Full-time'
    },
    {
      title: language === 'bn' ? 'কন্টেন্ট রাইটার' : 'Content Writer',
      department: language === 'bn' ? 'কন্টেন্ট' : 'Content',
      location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
      type: language === 'bn' ? 'ফুল-টাইম' : 'Full-time'
    },
    {
      title: language === 'bn' ? 'UI/UX ডিজাইনার' : 'UI/UX Designer',
      department: language === 'bn' ? 'ডিজাইন' : 'Design',
      location: language === 'bn' ? 'রিমোট' : 'Remote',
      type: language === 'bn' ? 'ফুল-টাইম' : 'Full-time'
    },
    {
      title: language === 'bn' ? 'মার্কেটিং ম্যানেজার' : 'Marketing Manager',
      department: language === 'bn' ? 'মার্কেটিং' : 'Marketing',
      location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
      type: language === 'bn' ? 'ফুল-টাইম' : 'Full-time'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'bn' ? 'আমাদের সাথে যোগ দিন' : 'Join Our Team'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'শিক্ষার ভবিষ্যত তৈরি করতে আমাদের সাথে কাজ করুন।'
              : 'Help us build the future of education.'
            }
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            {language === 'bn' ? 'কেন পাঠশালায় কাজ করবেন?' : 'Why Work at Pathshala?'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <Card key={i} className="rounded-[3px] text-center">
                <CardContent className="p-6">
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            {language === 'bn' ? 'খোলা পদসমূহ' : 'Open Positions'}
          </h2>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <Card key={i} className="rounded-[3px]">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="rounded-[3px]">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {job.department}
                        </Badge>
                        <Badge variant="outline" className="rounded-[3px]">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="rounded-[3px]">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                    <Button className="gradient-primary rounded-[3px]">
                      {language === 'bn' ? 'আবেদন করুন' : 'Apply Now'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
