import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, BarChart, Shield, ToggleLeft } from 'lucide-react';

const Cookies = () => {
  const { language } = useLanguage();

  const cookieTypes = language === 'bn' ? [
    {
      icon: Shield,
      title: 'প্রয়োজনীয় কুকি',
      content: 'প্ল্যাটফর্মের মৌলিক কার্যকারিতার জন্য অপরিহার্য। এগুলো বন্ধ করা যায় না।',
      required: true
    },
    {
      icon: BarChart,
      title: 'অ্যানালিটিক্স কুকি',
      content: 'আমাদের প্ল্যাটফর্ম উন্নত করতে ব্যবহারকারীদের আচরণ বুঝতে সাহায্য করে।',
      required: false
    },
    {
      icon: Settings,
      title: 'কার্যকারিতা কুকি',
      content: 'আপনার পছন্দ মনে রাখে যেমন ভাষা এবং থিম সেটিংস।',
      required: false
    }
  ] : [
    {
      icon: Shield,
      title: 'Essential Cookies',
      content: 'Essential for basic platform functionality. These cannot be disabled.',
      required: true
    },
    {
      icon: BarChart,
      title: 'Analytics Cookies',
      content: 'Help us understand user behavior to improve our platform.',
      required: false
    },
    {
      icon: Settings,
      title: 'Functionality Cookies',
      content: 'Remember your preferences like language and theme settings.',
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'কুকি নীতি' : 'Cookie Policy'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'আমরা আপনার অভিজ্ঞতা উন্নত করতে কুকি ব্যবহার করি। এখানে জানুন কীভাবে এবং কেন।'
              : 'We use cookies to enhance your experience. Learn how and why here.'
            }
          </p>
        </div>

        <div className="space-y-6">
          {cookieTypes.map((cookie, index) => (
            <Card key={index} className="rounded-[3px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <cookie.icon className="h-5 w-5 text-primary" />
                    {cookie.title}
                  </div>
                  {cookie.required ? (
                    <span className="text-xs bg-muted px-2 py-1 rounded-[3px]">
                      {language === 'bn' ? 'প্রয়োজনীয়' : 'Required'}
                    </span>
                  ) : (
                    <Button variant="outline" size="sm" className="rounded-[3px]">
                      <ToggleLeft className="h-4 w-4 mr-1" />
                      {language === 'bn' ? 'পরিচালনা' : 'Manage'}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{cookie.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cookies;
