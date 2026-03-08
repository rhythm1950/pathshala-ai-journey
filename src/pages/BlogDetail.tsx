import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: 'How AI is Transforming Education',
    titleBn: 'AI কীভাবে শিক্ষাকে রূপান্তরিত করছে',
    excerpt: 'Artificial intelligence is revolutionizing education. Learn how...',
    excerptBn: 'কৃত্রিম বুদ্ধিমত্তা শিক্ষা ক্ষেত্রে বিপ্লব আনছে। জানুন কীভাবে...',
    content: `Artificial intelligence is no longer a futuristic concept—it's here, and it's reshaping how we learn, teach, and interact with educational content.

## Personalized Learning Paths

One of the most significant impacts of AI in education is the ability to create truly personalized learning experiences. Traditional classrooms follow a one-size-fits-all approach, but AI-powered platforms like Pathshala AI can analyze each student's learning patterns, strengths, and weaknesses to create customized study plans.

## Intelligent Tutoring Systems

AI tutors can provide immediate feedback, answer questions 24/7, and adapt their teaching style based on how a student responds. This is particularly valuable in Bangladesh, where access to quality tutoring can be limited in rural areas.

## Automated Assessment

AI can grade assignments, provide detailed feedback, and even identify areas where students commonly struggle. This frees up teachers to focus on what they do best—mentoring and inspiring students.

## Predictive Analytics

By analyzing patterns in student performance data, AI can predict which students might be at risk of falling behind and suggest early interventions. This proactive approach can significantly improve educational outcomes.

## The Bangladesh Context

In Bangladesh, where the student-to-teacher ratio is often high, AI can bridge the gap by providing additional support to each student. Pathshala AI is at the forefront of this revolution, making quality education accessible to every student regardless of their location.

## Looking Ahead

The future of AI in education is bright. As technology continues to evolve, we can expect even more innovative applications—from virtual reality classrooms to AI-powered career guidance systems. The key is to use these tools to enhance, not replace, the human elements of education.`,
    contentBn: `কৃত্রিম বুদ্ধিমত্তা আর ভবিষ্যতের ধারণা নয়—এটি এখানে, এবং এটি আমরা কীভাবে শিখি, শেখাই এবং শিক্ষামূলক বিষয়বস্তুর সাথে যোগাযোগ করি তা পুনর্গঠন করছে।

## ব্যক্তিগতকৃত শেখার পথ

শিক্ষায় AI-এর সবচেয়ে গুরুত্বপূর্ণ প্রভাবগুলির মধ্যে একটি হল সত্যিকারের ব্যক্তিগতকৃত শেখার অভিজ্ঞতা তৈরি করার ক্ষমতা। ঐতিহ্যগত শ্রেণীকক্ষগুলি একটি সকলের জন্য একই পদ্ধতি অনুসরণ করে, কিন্তু পাঠশালা AI-এর মতো AI-চালিত প্ল্যাটফর্মগুলি প্রতিটি শিক্ষার্থীর শেখার ধরণ, শক্তি এবং দুর্বলতা বিশ্লেষণ করে কাস্টমাইজড স্টাডি প্ল্যান তৈরি করতে পারে।

## বুদ্ধিমান টিউটরিং সিস্টেম

AI টিউটররা তাৎক্ষণিক প্রতিক্রিয়া দিতে পারে, ২৪/৭ প্রশ্নের উত্তর দিতে পারে এবং একজন শিক্ষার্থী কীভাবে সাড়া দেয় তার উপর ভিত্তি করে তাদের শিক্ষাদানের শৈলী মানিয়ে নিতে পারে।

## স্বয়ংক্রিয় মূল্যায়ন

AI অ্যাসাইনমেন্ট গ্রেড করতে পারে, বিস্তারিত প্রতিক্রিয়া দিতে পারে এবং এমনকি এমন ক্ষেত্রগুলি চিহ্নিত করতে পারে যেখানে শিক্ষার্থীরা সাধারণত সংগ্রাম করে।

## বাংলাদেশ প্রসঙ্গ

বাংলাদেশে, যেখানে শিক্ষার্থী-শিক্ষক অনুপাত প্রায়ই বেশি, AI প্রতিটি শিক্ষার্থীকে অতিরিক্ত সহায়তা প্রদান করে এই ব্যবধান পূরণ করতে পারে। পাঠশালা AI এই বিপ্লবের অগ্রভাগে রয়েছে।`,
    category: 'Technology',
    categoryBn: 'প্রযুক্তি',
    author: 'Rafi Ahmed',
    authorBn: 'রাফি আহমেদ',
    authorBio: 'EdTech researcher and AI enthusiast with 8 years of experience in educational technology.',
    authorBioBn: 'শিক্ষা প্রযুক্তিতে ৮ বছরের অভিজ্ঞতা সহ এডটেক গবেষক এবং AI উৎসাহী।',
    date: '2026-01-03',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  },
  {
    id: 2,
    title: '10 Tips for Building Effective Study Habits',
    titleBn: 'কার্যকর স্টাডি হ্যাবিট তৈরির ১০টি টিপস',
    excerpt: 'Good study habits are the key to your success...',
    excerptBn: 'ভালো স্টাডি হ্যাবিট আপনার সাফল্যের চাবিকাঠি...',
    content: `Building effective study habits is one of the most important skills a student can develop. Here are 10 proven strategies to help you study smarter, not harder.

## 1. Set a Consistent Schedule

Your brain thrives on routine. Set specific times each day dedicated to studying and stick to them. Consistency builds momentum and makes studying feel natural rather than forced.

## 2. Create a Dedicated Study Space

Find a quiet, well-lit area that you associate exclusively with studying. Remove distractions like your phone, and keep all your materials organized and within reach.

## 3. Use Active Recall

Instead of passively re-reading notes, test yourself regularly. Active recall—trying to retrieve information from memory—is one of the most effective study techniques proven by cognitive science.

## 4. Practice Spaced Repetition

Don't cram everything into one session. Spread your study sessions over days and weeks. Reviewing material at increasing intervals helps move information from short-term to long-term memory.

## 5. Break Tasks into Smaller Chunks

Large assignments can feel overwhelming. Break them into manageable pieces and tackle them one at a time. The Pomodoro Technique—25 minutes of focused study followed by a 5-minute break—works wonders.

## 6. Teach What You Learn

Explaining concepts to someone else forces you to organize your thoughts and identify gaps in your understanding. If you can teach it simply, you truly understand it.

## 7. Take Care of Your Health

Sleep, exercise, and nutrition directly impact your ability to learn. Aim for 7-8 hours of sleep, regular physical activity, and a balanced diet rich in brain-boosting foods.

## 8. Use Multiple Learning Methods

Combine reading with visual aids, videos, practice problems, and discussion. Engaging multiple senses strengthens neural connections and improves retention.

## 9. Set Specific Goals

Instead of vague goals like "study math," set specific ones like "complete 10 algebra problems from Chapter 3." Clear goals give you direction and a sense of accomplishment.

## 10. Review and Reflect

At the end of each study session, spend 5 minutes reviewing what you learned. Reflecting on your progress helps consolidate knowledge and plan your next session effectively.`,
    contentBn: `কার্যকর স্টাডি হ্যাবিট তৈরি করা একজন শিক্ষার্থীর সবচেয়ে গুরুত্বপূর্ণ দক্ষতাগুলির মধ্যে একটি। এখানে ১০টি প্রমাণিত কৌশল রয়েছে যা আপনাকে আরও স্মার্টভাবে পড়াশোনা করতে সাহায্য করবে।

## ১. একটি ধারাবাহিক সময়সূচী সেট করুন

আপনার মস্তিষ্ক রুটিনে সমৃদ্ধ হয়। প্রতিদিন পড়াশোনার জন্য নির্দিষ্ট সময় নির্ধারণ করুন।

## ২. একটি নির্দিষ্ট পড়ার জায়গা তৈরি করুন

একটি শান্ত, ভালোভাবে আলোকিত এলাকা খুঁজুন যা আপনি একচেটিয়াভাবে পড়াশোনার সাথে যুক্ত করেন।

## ৩. সক্রিয় স্মরণ ব্যবহার করুন

নিষ্ক্রিয়ভাবে নোট পুনরায় পড়ার পরিবর্তে, নিয়মিত নিজেকে পরীক্ষা করুন।

## ৪. স্পেসড রিপিটিশন অনুশীলন করুন

সবকিছু এক সেশনে গুঁজে দেবেন না। দিন এবং সপ্তাহ জুড়ে আপনার স্টাডি সেশন ছড়িয়ে দিন।

## ৫. কাজগুলিকে ছোট টুকরোয় ভাগ করুন

বড় অ্যাসাইনমেন্টগুলি অপ্রতিরোধ্য মনে হতে পারে। সেগুলিকে পরিচালনাযোগ্য টুকরোয় ভাগ করুন।`,
    category: 'Learning Tips',
    categoryBn: 'শেখার টিপস',
    author: 'Nusrat Jahan',
    authorBn: 'নুসরাত জাহান',
    authorBio: 'Education psychologist and learning strategies expert.',
    authorBioBn: 'শিক্ষা মনোবিজ্ঞানী এবং শেখার কৌশল বিশেষজ্ঞ।',
    date: '2026-01-01',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  },
  {
    id: 3,
    title: 'The Future of Online Learning',
    titleBn: 'অনলাইন শিক্ষার ভবিষ্যত',
    excerpt: 'Where online education is heading in 2026...',
    excerptBn: '২০২৬ সালে অনলাইন শিক্ষা কোন দিকে যাচ্ছে...',
    content: `The landscape of online learning is evolving rapidly. Here's what we can expect in 2026 and beyond.

## Immersive Learning Experiences

Virtual and augmented reality are making online learning more engaging than ever. Students can now explore historical sites, conduct virtual lab experiments, and practice skills in simulated environments.

## Micro-Credentials and Skill-Based Learning

The traditional degree is being supplemented by micro-credentials—short, focused certifications that prove competency in specific skills. Employers are increasingly valuing these practical qualifications.

## Social Learning 2.0

Online learning platforms are becoming more social. Study groups, peer mentoring, collaborative projects, and community forums create a sense of belonging that was once missing from distance education.

## AI-Powered Adaptive Content

Content that adapts in real-time to student performance is becoming the norm. If a student struggles with a concept, the platform automatically provides additional resources, alternative explanations, and practice opportunities.

## Mobile-First Education

With smartphone penetration reaching new highs in Bangladesh and across South Asia, mobile-first learning experiences are crucial. Pathshala AI is designed with this reality in mind.`,
    contentBn: `অনলাইন শিক্ষার দৃশ্যপট দ্রুত পরিবর্তন হচ্ছে। ২০২৬ এবং তার পরে আমরা কী আশা করতে পারি তা এখানে।

## নিমজ্জিত শেখার অভিজ্ঞতা

ভার্চুয়াল এবং অগমেন্টেড রিয়েলিটি অনলাইন শেখাকে আগের চেয়ে আরও আকর্ষক করে তুলছে।

## মাইক্রো-ক্রেডেনশিয়াল এবং দক্ষতা-ভিত্তিক শিক্ষা

ঐতিহ্যগত ডিগ্রি মাইক্রো-ক্রেডেনশিয়াল দ্বারা পরিপূরক হচ্ছে।

## মোবাইল-ফার্স্ট শিক্ষা

বাংলাদেশে স্মার্টফোনের ব্যবহার নতুন উচ্চতায় পৌঁছানোর সাথে সাথে, মোবাইল-ফার্স্ট শেখার অভিজ্ঞতা অত্যন্ত গুরুত্বপূর্ণ।`,
    category: 'EdTech',
    categoryBn: 'এডটেক',
    author: 'Tanvir Hasan',
    authorBn: 'তানভীর হাসান',
    authorBio: 'Senior EdTech analyst and online learning advocate.',
    authorBioBn: 'সিনিয়র এডটেক বিশ্লেষক এবং অনলাইন শিক্ষার সমর্থক।',
    date: '2025-12-28',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
  },
  {
    id: 4,
    title: 'Mental Health Tips for Students',
    titleBn: 'শিক্ষার্থীদের জন্য মানসিক স্বাস্থ্য টিপস',
    excerpt: 'Follow these tips to manage study stress...',
    excerptBn: 'পড়াশোনার চাপ সামলাতে এই টিপসগুলো অনুসরণ করুন...',
    content: `Student life can be stressful. Here are practical tips to maintain your mental health while pursuing academic excellence.

## Recognize the Signs

The first step is awareness. Common signs of student stress include difficulty sleeping, loss of appetite, irritability, difficulty concentrating, and feeling overwhelmed. Recognizing these signs early allows you to take action before they escalate.

## Practice Mindfulness

Even 10 minutes of daily mindfulness meditation can significantly reduce anxiety and improve focus. Apps and guided sessions make it easy to get started.

## Stay Connected

Don't isolate yourself during stressful times. Maintain relationships with friends, family, and classmates. Social support is one of the strongest buffers against stress.

## Set Realistic Expectations

Perfectionism is a common trap for students. Set achievable goals and celebrate progress rather than demanding perfection from yourself.

## Seek Help When Needed

There's no shame in asking for help. Talk to a trusted teacher, counselor, or mental health professional if you're struggling. Many platforms, including Pathshala AI, provide resources for student wellbeing.

## Balance is Key

All work and no play leads to burnout. Make time for hobbies, exercise, socializing, and simply relaxing. A well-rounded life supports better academic performance in the long run.`,
    contentBn: `শিক্ষার্থীদের জীবন চাপপূর্ণ হতে পারে। একাডেমিক উৎকর্ষ অনুসরণ করার সময় আপনার মানসিক স্বাস্থ্য বজায় রাখার জন্য এখানে ব্যবহারিক টিপস রয়েছে।

## লক্ষণগুলো চিনুন

প্রথম পদক্ষেপ হল সচেতনতা। শিক্ষার্থীদের স্ট্রেসের সাধারণ লক্ষণগুলির মধ্যে রয়েছে ঘুমের অসুবিধা, ক্ষুধা হ্রাস এবং মনোযোগ দিতে অসুবিধা।

## মাইন্ডফুলনেস অনুশীলন করুন

এমনকি প্রতিদিন ১০ মিনিটের মাইন্ডফুলনেস মেডিটেশন উল্লেখযোগ্যভাবে উদ্বেগ কমাতে এবং মনোযোগ উন্নত করতে পারে।

## সংযুক্ত থাকুন

চাপের সময়ে নিজেকে বিচ্ছিন্ন করবেন না। বন্ধু, পরিবার এবং সহপাঠীদের সাথে সম্পর্ক বজায় রাখুন।

## প্রয়োজনে সাহায্য নিন

সাহায্য চাইতে কোনো লজ্জা নেই। আপনি যদি সংগ্রাম করছেন তবে একজন বিশ্বস্ত শিক্ষক বা মানসিক স্বাস্থ্য পেশাদারের সাথে কথা বলুন।`,
    category: 'Wellness',
    categoryBn: 'স্বাস্থ্য',
    author: 'Sadia Rahman',
    authorBn: 'সাদিয়া রহমান',
    authorBio: 'Clinical psychologist specializing in student mental health.',
    authorBioBn: 'শিক্ষার্থীদের মানসিক স্বাস্থ্যে বিশেষজ্ঞ ক্লিনিক্যাল মনোবিজ্ঞানী।',
    date: '2025-12-25',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  },
];

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isLiked, setIsLiked] = React.useState(false);

  const post = blogPosts.find(p => p.id === Number(id));
  const otherPosts = blogPosts.filter(p => p.id !== Number(id)).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'bn' ? 'ব্লগ পাওয়া যায়নি' : 'Blog Not Found'}
          </h1>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to Blog'}
          </Button>
        </div>
      </div>
    );
  }

  const content = language === 'bn' ? post.contentBn : post.content;
  const paragraphs = content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-secondary">
        <img
          src={post.image}
          alt={language === 'bn' ? post.titleBn : post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/40" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="text-secondary-foreground/70 hover:text-secondary-foreground mb-4 -ml-2 p-2 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              {language === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to Blog'}
            </Button>

            <Badge className="mb-3 bg-primary/10 text-primary border border-primary/20 text-xs">
              {language === 'bn' ? post.categoryBn : post.category}
            </Badge>

            <h1 className="text-2xl md:text-4xl font-bold text-secondary-foreground mb-3 tracking-tight max-w-3xl">
              {language === 'bn' ? post.titleBn : post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-foreground/50">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {language === 'bn' ? post.authorBn : post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} {language === 'bn' ? 'পড়ার সময়' : 'read'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">
                      {para.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 mr-1.5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                {language === 'bn' ? 'পছন্দ' : 'Like'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1.5" />
                {language === 'bn' ? 'শেয়ার' : 'Share'}
              </Button>
            </div>

            {/* Author Card */}
            <Card className="mt-8 border-border">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                  {(language === 'bn' ? post.authorBn : post.author).charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{language === 'bn' ? post.authorBn : post.author}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {language === 'bn' ? post.authorBioBn : post.authorBio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="border-border sticky top-4">
              <CardContent className="p-5">
                <h3 className="font-bold text-sm mb-4">
                  {language === 'bn' ? 'আরও পড়ুন' : 'More Articles'}
                </h3>
                <div className="space-y-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/blog/${p.id}`}
                      className="group block"
                    >
                      <div className="flex gap-3">
                        <img
                          src={p.image}
                          alt={language === 'bn' ? p.titleBn : p.title}
                          className="w-16 h-16 rounded-sm object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {language === 'bn' ? p.titleBn : p.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {p.readTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => navigate('/blog')}
                >
                  {language === 'bn' ? 'সব ব্লগ দেখুন' : 'View All Posts'}
                  <ArrowRight className="w-3 h-3 ml-1.5" />
                </Button>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
