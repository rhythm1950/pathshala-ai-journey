import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Clock, CheckCircle, XCircle, HelpCircle, Mail } from 'lucide-react';

const Refund = () => {
  const { language } = useLanguage();

  const policies = language === 'bn' ? [
    {
      icon: Clock,
      title: '৭ দিনের গ্যারান্টি',
      content: 'ক্রয়ের ৭ দিনের মধ্যে রিফান্ড অনুরোধ করতে পারবেন।'
    },
    {
      icon: CheckCircle,
      title: 'যোগ্যতা',
      content: 'কোর্সের ২০% এর কম সম্পন্ন হলে রিফান্ড পাওয়া যাবে।'
    },
    {
      icon: XCircle,
      title: 'অযোগ্যতা',
      content: 'সার্টিফিকেট ডাউনলোড বা কোর্স সম্পন্ন হলে রিফান্ড প্রযোজ্য নয়।'
    },
    {
      icon: HelpCircle,
      title: 'প্রক্রিয়া',
      content: 'রিফান্ড অনুরোধ প্রক্রিয়াকরণে ৫-৭ কার্যদিবস সময় লাগে।'
    }
  ] : [
    {
      icon: Clock,
      title: '7-Day Guarantee',
      content: 'Request a refund within 7 days of purchase.'
    },
    {
      icon: CheckCircle,
      title: 'Eligibility',
      content: 'Refunds are available if less than 20% of the course is completed.'
    },
    {
      icon: XCircle,
      title: 'Non-Eligibility',
      content: 'Refunds are not applicable after certificate download or course completion.'
    },
    {
      icon: HelpCircle,
      title: 'Process',
      content: 'Refund requests take 5-7 business days to process.'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <RotateCcw className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'রিফান্ড নীতি' : 'Refund Policy'}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {policies.map((policy, index) => (
            <Card key={index} className="rounded-[3px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <policy.icon className="h-5 w-5 text-primary" />
                  {policy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{policy.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 rounded-[3px]">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'bn' 
                ? 'রিফান্ড অনুরোধের জন্য refund@pathshala.ai তে ইমেইল করুন'
                : 'For refund requests, email us at refund@pathshala.ai'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Refund;
