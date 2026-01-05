import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, FileText, Download, Clock, BookOpen, Video, FileQuestion } from 'lucide-react';

const Tutorials = () => {
  const { language } = useLanguage();

  const tutorials = [
    {
      id: 1,
      title: language === 'bn' ? 'প্ল্যাটফর্ম পরিচিতি' : 'Platform Introduction',
      description: language === 'bn' 
        ? 'পাঠশালা AI এর সাথে পরিচিত হন এবং শুরু করুন।'
        : 'Get familiar with Pathshala AI and get started.',
      duration: '5:30',
      type: 'video',
      category: language === 'bn' ? 'শুরু করুন' : 'Getting Started'
    },
    {
      id: 2,
      title: language === 'bn' ? 'কোর্সে ভর্তি হওয়ার প্রক্রিয়া' : 'How to Enroll in a Course',
      description: language === 'bn' 
        ? 'ধাপে ধাপে কোর্সে ভর্তি হওয়ার গাইড।'
        : 'Step-by-step guide to enrolling in courses.',
      duration: '3:45',
      type: 'video',
      category: language === 'bn' ? 'কোর্স' : 'Courses'
    },
    {
      id: 3,
      title: language === 'bn' ? 'AI স্টাডি প্ল্যান ব্যবহার' : 'Using AI Study Plan',
      description: language === 'bn' 
        ? 'AI স্টাডি প্ল্যান থেকে সর্বাধিক সুবিধা নিন।'
        : 'Get the most out of the AI Study Plan.',
      duration: '8:20',
      type: 'video',
      category: language === 'bn' ? 'AI ফিচার' : 'AI Features'
    },
    {
      id: 4,
      title: language === 'bn' ? 'সার্টিফিকেট ডাউনলোড করা' : 'Downloading Certificates',
      description: language === 'bn' 
        ? 'কোর্স সম্পন্ন করার পর সার্টিফিকেট পাওয়ার উপায়।'
        : 'How to get your certificate after completing a course.',
      duration: '2 pages',
      type: 'document',
      category: language === 'bn' ? 'সার্টিফিকেট' : 'Certificates'
    },
    {
      id: 5,
      title: language === 'bn' ? 'অভিভাবক পোর্টাল গাইড' : 'Parent Portal Guide',
      description: language === 'bn' 
        ? 'অভিভাবকদের জন্য সম্পূর্ণ গাইড।'
        : 'Complete guide for parents.',
      duration: '6:15',
      type: 'video',
      category: language === 'bn' ? 'অভিভাবক' : 'Parents'
    },
    {
      id: 6,
      title: language === 'bn' ? 'পেমেন্ট FAQ' : 'Payment FAQ',
      description: language === 'bn' 
        ? 'পেমেন্ট সম্পর্কিত সাধারণ প্রশ্নের উত্তর।'
        : 'Answers to common payment questions.',
      duration: '5 pages',
      type: 'document',
      category: language === 'bn' ? 'পেমেন্ট' : 'Payment'
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      default: return FileQuestion;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorials'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'প্ল্যাটফর্ম ব্যবহারের সম্পূর্ণ গাইড'
              : 'Complete guide to using the platform'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => {
            const TypeIcon = getIcon(tutorial.type);
            return (
              <Card key={tutorial.id} className="rounded-[3px] card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="rounded-[3px]">
                      {tutorial.category}
                    </Badge>
                    <Badge variant="outline" className="rounded-[3px]">
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {tutorial.type === 'video' ? 'Video' : 'Doc'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tutorial.duration}
                    </span>
                    <Button size="sm" className="rounded-[3px]">
                      {tutorial.type === 'video' ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-1" />
                          {language === 'bn' ? 'দেখুন' : 'Watch'}
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          {language === 'bn' ? 'ডাউনলোড' : 'Download'}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
