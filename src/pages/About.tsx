import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Target, Users, Award, Globe, Heart, Zap, Lightbulb, GraduationCap } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const stats = [
    { value: '50,000+', label: language === 'bn' ? 'শিক্ষার্থী' : 'Students' },
    { value: '500+', label: language === 'bn' ? 'কোর্স' : 'Courses' },
    { value: '200+', label: language === 'bn' ? 'শিক্ষক' : 'Teachers' },
    { value: '95%', label: language === 'bn' ? 'সন্তুষ্টি' : 'Satisfaction' },
  ];

  const values = language === 'bn' ? [
    { icon: Heart, title: 'শিক্ষার প্রতি ভালোবাসা', desc: 'প্রতিটি শিক্ষার্থীর সাফল্যই আমাদের অনুপ্রেরণা' },
    { icon: Zap, title: 'উদ্ভাবন', desc: 'AI প্রযুক্তি দিয়ে শিক্ষাকে আধুনিক করা' },
    { icon: Users, title: 'সহযোগিতা', desc: 'শিক্ষক, শিক্ষার্থী এবং অভিভাবকদের সংযুক্ত করা' },
    { icon: Lightbulb, title: 'ব্যক্তিগতকরণ', desc: 'প্রতিটি শিক্ষার্থীর জন্য অনন্য শিক্ষা পথ' },
  ] : [
    { icon: Heart, title: 'Passion for Learning', desc: 'Every student\'s success is our inspiration' },
    { icon: Zap, title: 'Innovation', desc: 'Modernizing education with AI technology' },
    { icon: Users, title: 'Collaboration', desc: 'Connecting teachers, students, and parents' },
    { icon: Lightbulb, title: 'Personalization', desc: 'Unique learning paths for every student' },
  ];

  const team = [
    { name: language === 'bn' ? 'রাফি আহমেদ' : 'Rafi Ahmed', role: language === 'bn' ? 'প্রতিষ্ঠাতা ও CEO' : 'Founder & CEO', avatar: '👨‍💼' },
    { name: language === 'bn' ? 'নুসরাত জাহান' : 'Nusrat Jahan', role: language === 'bn' ? 'CTO' : 'CTO', avatar: '👩‍💻' },
    { name: language === 'bn' ? 'তানভীর হাসান' : 'Tanvir Hasan', role: language === 'bn' ? 'শিক্ষা পরিচালক' : 'Head of Education', avatar: '👨‍🏫' },
    { name: language === 'bn' ? 'সাদিয়া রহমান' : 'Sadia Rahman', role: language === 'bn' ? 'প্রোডাক্ট প্রধান' : 'Head of Product', avatar: '👩‍🎨' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'পাঠশালা AI বাংলাদেশের প্রথম AI-চালিত শিক্ষা প্ল্যাটফর্ম যা প্রতিটি শিক্ষার্থীর জন্য ব্যক্তিগতকৃত শিক্ষা অভিজ্ঞতা প্রদান করে।'
              : 'Pathshala AI is Bangladesh\'s first AI-powered education platform providing personalized learning experiences for every student.'
            }
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="rounded-[3px] text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[3px] bg-primary/10 text-primary mb-4">
                <Target className="h-4 w-4" />
                {language === 'bn' ? 'আমাদের মিশন' : 'Our Mission'}
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {language === 'bn' 
                  ? 'শিক্ষাকে সবার জন্য সুলভ করা'
                  : 'Making Education Accessible to All'
                }
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === 'bn'
                  ? 'আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থীর অনন্য শেখার ধরন আছে। AI প্রযুক্তি ব্যবহার করে আমরা প্রতিটি শিক্ষার্থীর জন্য তাদের গতি এবং স্টাইল অনুযায়ী শিক্ষা প্রদান করি।'
                  : 'We believe every student has a unique learning style. Using AI technology, we provide education tailored to each student\'s pace and style.'
                }
              </p>
              <Button asChild className="gradient-primary rounded-[3px]">
                <Link to="/courses">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {language === 'bn' ? 'কোর্স দেখুন' : 'View Courses'}
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, i) => (
                <Card key={i} className="rounded-[3px]">
                  <CardContent className="p-6">
                    <value.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'bn' ? 'আমাদের টিম' : 'Our Team'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'bn'
                ? 'শিক্ষার ভবিষ্যত তৈরিতে নিবেদিত মানুষেরা'
                : 'Dedicated people building the future of education'
              }
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Card key={i} className="rounded-[3px] text-center">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{member.avatar}</div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
