import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, CreditCard, BookOpen, AlertTriangle, Scale } from 'lucide-react';

const Terms = () => {
  const { language } = useLanguage();

  const sections = language === 'bn' ? [
    {
      icon: Users,
      title: 'ব্যবহারকারী চুক্তি',
      content: 'পাঠশালা AI ব্যবহার করে আপনি এই শর্তাবলী মেনে নিতে সম্মত হচ্ছেন। আপনাকে অবশ্যই ১৩ বছর বা তার বেশি বয়সী হতে হবে।'
    },
    {
      icon: BookOpen,
      title: 'কোর্স অ্যাক্সেস',
      content: 'ক্রয়কৃত কোর্সে আপনার ব্যক্তিগত, অ-বাণিজ্যিক অ্যাক্সেস থাকবে। কোর্স সামগ্রী শেয়ার বা পুনর্বিতরণ নিষিদ্ধ।'
    },
    {
      icon: CreditCard,
      title: 'পেমেন্ট ও রিফান্ড',
      content: 'সমস্ত পেমেন্ট নিরাপদে প্রক্রিয়া করা হয়। ক্রয়ের ৭ দিনের মধ্যে রিফান্ড অনুরোধ করা যাবে যদি কোর্সের ২০% এর কম সম্পন্ন হয়ে থাকে।'
    },
    {
      icon: AlertTriangle,
      title: 'নিষিদ্ধ আচরণ',
      content: 'প্ল্যাটফর্মের অপব্যবহার, হ্যাকিং প্রচেষ্টা, অন্য ব্যবহারকারীদের হয়রানি, বা প্রতারণামূলক কার্যকলাপ কঠোরভাবে নিষিদ্ধ।'
    },
    {
      icon: Scale,
      title: 'মেধাস্বত্ব',
      content: 'সমস্ত কোর্স সামগ্রী, ব্র্যান্ডিং এবং প্ল্যাটফর্ম ডিজাইন পাঠশালা AI এর মেধাস্বত্ব দ্বারা সুরক্ষিত।'
    }
  ] : [
    {
      icon: Users,
      title: 'User Agreement',
      content: 'By using Pathshala AI, you agree to these terms. You must be at least 13 years old to use our platform.'
    },
    {
      icon: BookOpen,
      title: 'Course Access',
      content: 'You will have personal, non-commercial access to purchased courses. Sharing or redistributing course content is prohibited.'
    },
    {
      icon: CreditCard,
      title: 'Payment & Refunds',
      content: 'All payments are processed securely. Refunds can be requested within 7 days of purchase if less than 20% of the course is completed.'
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Conduct',
      content: 'Platform abuse, hacking attempts, harassment of other users, or fraudulent activities are strictly prohibited.'
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: 'All course content, branding, and platform design are protected by Pathshala AI intellectual property rights.'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'সেবার শর্তাবলী' : 'Terms of Service'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৬'
              : 'Last updated: January 2026'
            }
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="rounded-[3px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
