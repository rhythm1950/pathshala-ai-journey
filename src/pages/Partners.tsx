import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Building, GraduationCap, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    {
      name: 'BUET',
      type: language === 'bn' ? 'বিশ্ববিদ্যালয়' : 'University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/da/BUET_LOGO.svg'
    },
    {
      name: 'Dhaka University',
      type: language === 'bn' ? 'বিশ্ববিদ্যালয়' : 'University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Dhaka_University_logo.svg/200px-Dhaka_University_logo.svg.png'
    },
    {
      name: 'Prothom Alo',
      type: language === 'bn' ? 'মিডিয়া' : 'Media',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prothom_Alo_logo.svg/200px-Prothom_Alo_logo.svg.png'
    },
    {
      name: 'Grameenphone',
      type: language === 'bn' ? 'টেলিকম' : 'Telecom',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Grameenphone-Logo.wine.svg/200px-Grameenphone-Logo.wine.svg.png'
    },
    {
      name: 'bKash',
      type: language === 'bn' ? 'ফিনটেক' : 'Fintech',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Bkash_logo.png/200px-Bkash_logo.png'
    },
    {
      name: 'Robi',
      type: language === 'bn' ? 'টেলিকম' : 'Telecom',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Robi_Axiata_logo.svg/200px-Robi_Axiata_logo.svg.png'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-primary/10 mb-5">
              <Handshake className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-secondary-foreground mb-4 tracking-tight">
              {language === 'bn' ? 'অংশীদার হন' : 'Become a Partner'}
            </h1>
            <p className="text-secondary-foreground/60 text-lg max-w-xl mx-auto">
              {language === 'bn'
                ? 'আমাদের সাথে যোগ দিন এবং শিক্ষায় বিপ্লব আনতে সাহায্য করুন।'
                : 'Join us and help revolutionize education across Bangladesh.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Card className="border-border h-full">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-3">
                      <type.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{type.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {type.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" size="sm">
                      {language === 'bn' ? 'আবেদন করুন' : 'Apply Now'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center mb-2">
              {language === 'bn' ? 'আমাদের অংশীদার' : 'Our Partners'}
            </h2>
            <p className="text-muted-foreground text-center text-sm mb-10">
              {language === 'bn' ? 'বাংলাদেশের শীর্ষ প্রতিষ্ঠানগুলোর সাথে আমরা কাজ করি' : 'We work with Bangladesh\'s leading organizations'}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentPartners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.3 }}
              >
                <Card className="border-border text-center hover:border-primary/30 transition-colors">
                  <CardContent className="p-5 flex flex-col items-center justify-center min-h-[120px]">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-10 w-auto object-contain mb-2 dark:brightness-0 dark:invert"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.querySelector('.fallback')?.classList.remove('hidden');
                      }}
                    />
                    <div className="fallback hidden text-2xl mb-2">🏢</div>
                    <h3 className="font-semibold text-xs">{partner.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{partner.type}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
