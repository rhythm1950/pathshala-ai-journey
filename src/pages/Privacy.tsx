import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

const Privacy = () => {
  const { language } = useLanguage();

  const sections = language === 'bn' ? [
    {
      icon: Database,
      title: 'তথ্য সংগ্রহ',
      content: 'আমরা আপনার নাম, ইমেইল, এবং শিক্ষাগত তথ্য সংগ্রহ করি শুধুমাত্র আপনার শিক্ষা অভিজ্ঞতা উন্নত করতে। আমরা কখনও আপনার তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।'
    },
    {
      icon: Lock,
      title: 'তথ্য সুরক্ষা',
      content: 'আপনার সমস্ত তথ্য SSL এনক্রিপশন এবং আধুনিক নিরাপত্তা প্রোটোকল দ্বারা সুরক্ষিত। আমরা নিয়মিত নিরাপত্তা অডিট পরিচালনা করি।'
    },
    {
      icon: Eye,
      title: 'তথ্যের ব্যবহার',
      content: 'আপনার তথ্য ব্যক্তিগতকৃত শিক্ষা অভিজ্ঞতা প্রদান, কোর্স সুপারিশ এবং প্ল্যাটফর্ম উন্নতির জন্য ব্যবহৃত হয়।'
    },
    {
      icon: UserCheck,
      title: 'আপনার অধিকার',
      content: 'আপনি যেকোনো সময় আপনার তথ্য দেখতে, সম্পাদনা করতে বা মুছে ফেলার অনুরোধ করতে পারেন। আমাদের সাপোর্ট টিমে যোগাযোগ করুন।'
    },
    {
      icon: Mail,
      title: 'যোগাযোগ',
      content: 'গোপনীয়তা সম্পর্কিত যেকোনো প্রশ্নের জন্য privacy@pathshala.ai তে ইমেইল করুন।'
    }
  ] : [
    {
      icon: Database,
      title: 'Information Collection',
      content: 'We collect your name, email, and educational information solely to enhance your learning experience. We never sell your data to third parties.'
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: 'All your data is protected by SSL encryption and modern security protocols. We conduct regular security audits to ensure your information is safe.'
    },
    {
      icon: Eye,
      title: 'Use of Information',
      content: 'Your information is used to provide personalized learning experiences, course recommendations, and platform improvements.'
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: 'You can request to view, edit, or delete your data at any time. Contact our support team for assistance.'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: 'For any privacy-related questions, email us at privacy@pathshala.ai.'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
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

export default Privacy;
