import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Building, GraduationCap, Globe, ArrowRight, CheckCircle } from 'lucide-react';

const Partners = () => {
  const { language } = useLanguage();

  const partnerTypes = language === 'bn' ? [
    {
      icon: Building,
      title: 'প্রাতিষ্ঠানিক অংশীদার',
      desc: 'স্কুল ও কলেজের সাথে অংশীদারিত্ব করে শিক্ষার্থীদের AI শিক্ষা প্রদান করুন।',
      benefits: ['কাস্টম কোর্স তৈরি', 'শিক্ষক প্রশিক্ষণ', 'বিশেষ মূল্য']
    },
    {
      icon: GraduationCap,
      title: 'কন্টেন্ট অংশীদার',
      desc: 'শিক্ষক ও বিষয় বিশেষজ্ঞদের জন্য কোর্স তৈরি ও আয়ের সুযোগ।',
      benefits: ['রেভিনিউ শেয়ারিং', 'মার্কেটিং সাপোর্ট', 'টেকনিক্যাল সহায়তা']
    },
    {
      icon: Globe,
      title: 'প্রযুক্তি অংশীদার',
      desc: 'এডটেক ও প্রযুক্তি কোম্পানিদের সাথে ইন্টিগ্রেশন সুযোগ।',
      benefits: ['API অ্যাক্সেস', 'কো-মার্কেটিং', 'জয়েন্ট ডেভেলপমেন্ট']
    }
  ] : [
    {
      icon: Building,
      title: 'Institutional Partners',
      desc: 'Partner with schools and colleges to provide AI education to students.',
      benefits: ['Custom course creation', 'Teacher training', 'Special pricing']
    },
    {
      icon: GraduationCap,
      title: 'Content Partners',
      desc: 'Opportunities for teachers and experts to create courses and earn.',
      benefits: ['Revenue sharing', 'Marketing support', 'Technical assistance']
    },
    {
      icon: Globe,
      title: 'Technology Partners',
      desc: 'Integration opportunities with EdTech and technology companies.',
      benefits: ['API access', 'Co-marketing', 'Joint development']
    }
  ];

  const currentPartners = [
    { name: 'BUET', type: language === 'bn' ? 'বিশ্ববিদ্যালয়' : 'University' },
    { name: 'Dhaka University', type: language === 'bn' ? 'বিশ্ববিদ্যালয়' : 'University' },
    { name: 'Prothom Alo', type: language === 'bn' ? 'মিডিয়া' : 'Media' },
    { name: 'Grameenphone', type: language === 'bn' ? 'টেলিকম' : 'Telecom' },
    { name: 'bKash', type: language === 'bn' ? 'ফিনটেক' : 'Fintech' },
    { name: 'Robi', type: language === 'bn' ? 'টেলিকম' : 'Telecom' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Handshake className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'bn' ? 'অংশীদার হন' : 'Become a Partner'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'আমাদের সাথে যোগ দিন এবং শিক্ষায় বিপ্লব আনতে সাহায্য করুন।'
              : 'Join us and help revolutionize education.'
            }
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((type, i) => (
              <Card key={i} className="rounded-[3px]">
                <CardHeader>
                  <type.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{type.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {type.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full gradient-primary rounded-[3px]">
                    {language === 'bn' ? 'আবেদন করুন' : 'Apply Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            {language === 'bn' ? 'আমাদের অংশীদার' : 'Our Partners'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentPartners.map((partner, i) => (
              <Card key={i} className="rounded-[3px] text-center">
                <CardContent className="p-6">
                  <div className="text-2xl mb-2">🏢</div>
                  <h3 className="font-semibold text-sm">{partner.name}</h3>
                  <p className="text-xs text-muted-foreground">{partner.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
