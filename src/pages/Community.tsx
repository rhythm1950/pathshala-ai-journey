import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, ThumbsUp, Search, TrendingUp, Clock, Send } from 'lucide-react';

const Community = () => {
  const { language } = useLanguage();

  const discussions = [
    {
      id: 1,
      title: language === 'bn' ? 'গণিত সমস্যা সমাধানের সহজ উপায়' : 'Easy Ways to Solve Math Problems',
      author: language === 'bn' ? 'আহমেদ হাসান' : 'Ahmed Hassan',
      replies: 24,
      likes: 56,
      category: language === 'bn' ? 'গণিত' : 'Math',
      time: '2h ago'
    },
    {
      id: 2,
      title: language === 'bn' ? 'ইংরেজি স্পিকিং প্র্যাক্টিস পার্টনার খুঁজছি' : 'Looking for English Speaking Practice Partner',
      author: language === 'bn' ? 'ফাতেমা আক্তার' : 'Fatema Akter',
      replies: 18,
      likes: 32,
      category: language === 'bn' ? 'ইংরেজি' : 'English',
      time: '4h ago'
    },
    {
      id: 3,
      title: language === 'bn' ? 'HSC পরীক্ষার প্রস্তুতি টিপস' : 'HSC Exam Preparation Tips',
      author: language === 'bn' ? 'রাফিদ করিম' : 'Rafid Karim',
      replies: 45,
      likes: 89,
      category: language === 'bn' ? 'পরীক্ষা' : 'Exams',
      time: '6h ago'
    },
    {
      id: 4,
      title: language === 'bn' ? 'প্রোগ্রামিং শেখা শুরু করব কীভাবে?' : 'How to Start Learning Programming?',
      author: language === 'bn' ? 'সাকিব আলী' : 'Sakib Ali',
      replies: 67,
      likes: 120,
      category: language === 'bn' ? 'প্রোগ্রামিং' : 'Programming',
      time: '1d ago'
    },
  ];

  const topContributors = [
    { name: language === 'bn' ? 'মাহমুদ হোসেন' : 'Mahmud Hossain', points: 2500, avatar: '👨‍🎓' },
    { name: language === 'bn' ? 'সাবরিনা ইসলাম' : 'Sabrina Islam', points: 2200, avatar: '👩‍🎓' },
    { name: language === 'bn' ? 'ইমরান খান' : 'Imran Khan', points: 1900, avatar: '👨‍💻' },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'কমিউনিটি' : 'Community'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'সহপাঠীদের সাথে আলোচনা করুন এবং শিখুন'
              : 'Discuss and learn with fellow students'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'bn' ? 'আলোচনা খুঁজুন...' : 'Search discussions...'}
                className="pl-10 rounded-[3px]"
              />
            </div>

            {/* New Discussion */}
            <Card className="rounded-[3px]">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'bn' ? 'নতুন আলোচনা শুরু করুন' : 'Start a New Discussion'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder={language === 'bn' ? 'শিরোনাম...' : 'Title...'} 
                  className="rounded-[3px]"
                />
                <Textarea 
                  placeholder={language === 'bn' ? 'আপনার প্রশ্ন বা আলোচনা লিখুন...' : 'Write your question or discussion...'}
                  rows={3}
                  className="rounded-[3px]"
                />
                <Button className="gradient-primary rounded-[3px]">
                  <Send className="mr-2 h-4 w-4" />
                  {language === 'bn' ? 'পোস্ট করুন' : 'Post'}
                </Button>
              </CardContent>
            </Card>

            {/* Discussions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {language === 'bn' ? 'জনপ্রিয় আলোচনা' : 'Popular Discussions'}
              </h2>
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="rounded-[3px] card-hover cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="rounded-[3px]">
                            {discussion.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {discussion.time}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1">{discussion.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'bn' ? 'পোস্ট করেছেন' : 'Posted by'} {discussion.author}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {discussion.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-[3px]">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'bn' ? 'শীর্ষ অবদানকারী' : 'Top Contributors'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-2xl">{contributor.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contributor.points} {language === 'bn' ? 'পয়েন্ট' : 'points'}
                      </p>
                    </div>
                    <Badge variant={i === 0 ? 'default' : 'secondary'} className="rounded-[3px]">
                      #{i + 1}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[3px] gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">
                  {language === 'bn' ? 'কমিউনিটি গাইডলাইন' : 'Community Guidelines'}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  {language === 'bn' 
                    ? 'সম্মানজনক এবং সহায়ক আলোচনায় অংশ নিন।'
                    : 'Participate in respectful and helpful discussions.'
                  }
                </p>
                <Button variant="secondary" size="sm" className="rounded-[3px]">
                  {language === 'bn' ? 'বিস্তারিত' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
