import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');

  const posts = [
    {
      id: 1,
      title: language === 'bn' ? 'AI কীভাবে শিক্ষাকে রূপান্তরিত করছে' : 'How AI is Transforming Education',
      excerpt: language === 'bn' 
        ? 'কৃত্রিম বুদ্ধিমত্তা শিক্ষা ক্ষেত্রে বিপ্লব আনছে। জানুন কীভাবে...'
        : 'Artificial intelligence is revolutionizing education. Learn how...',
      category: language === 'bn' ? 'প্রযুক্তি' : 'Technology',
      author: language === 'bn' ? 'রাফি আহমেদ' : 'Rafi Ahmed',
      date: '2026-01-03',
      readTime: '5 min'
    },
    {
      id: 2,
      title: language === 'bn' ? 'কার্যকর স্টাডি হ্যাবিট তৈরির ১০টি টিপস' : '10 Tips for Building Effective Study Habits',
      excerpt: language === 'bn' 
        ? 'ভালো স্টাডি হ্যাবিট আপনার সাফল্যের চাবিকাঠি...'
        : 'Good study habits are the key to your success...',
      category: language === 'bn' ? 'শেখার টিপস' : 'Learning Tips',
      author: language === 'bn' ? 'নুসরাত জাহান' : 'Nusrat Jahan',
      date: '2026-01-01',
      readTime: '7 min'
    },
    {
      id: 3,
      title: language === 'bn' ? 'অনলাইন শিক্ষার ভবিষ্যত' : 'The Future of Online Learning',
      excerpt: language === 'bn' 
        ? '২০২৬ সালে অনলাইন শিক্ষা কোন দিকে যাচ্ছে...'
        : 'Where online education is heading in 2026...',
      category: language === 'bn' ? 'এডটেক' : 'EdTech',
      author: language === 'bn' ? 'তানভীর হাসান' : 'Tanvir Hasan',
      date: '2025-12-28',
      readTime: '6 min'
    },
    {
      id: 4,
      title: language === 'bn' ? 'শিক্ষার্থীদের জন্য মানসিক স্বাস্থ্য টিপস' : 'Mental Health Tips for Students',
      excerpt: language === 'bn' 
        ? 'পড়াশোনার চাপ সামলাতে এই টিপসগুলো অনুসরণ করুন...'
        : 'Follow these tips to manage study stress...',
      category: language === 'bn' ? 'স্বাস্থ্য' : 'Wellness',
      author: language === 'bn' ? 'সাদিয়া রহমান' : 'Sadia Rahman',
      date: '2025-12-25',
      readTime: '4 min'
    },
  ];

  const categories = language === 'bn' 
    ? ['সব', 'প্রযুক্তি', 'শেখার টিপস', 'এডটেক', 'স্বাস্থ্য']
    : ['All', 'Technology', 'Learning Tips', 'EdTech', 'Wellness'];

  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === categories[0] || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[3px] gradient-primary mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {language === 'bn' ? 'ব্লগ' : 'Blog'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'bn' 
              ? 'শিক্ষা, প্রযুক্তি এবং ক্যারিয়ার সম্পর্কে সর্বশেষ আপডেট'
              : 'Latest updates on education, technology, and careers'
            }
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'bn' ? 'ব্লগ খুঁজুন...' : 'Search blogs...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-[3px]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className="cursor-pointer rounded-[3px]"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="rounded-[3px] card-hover">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="rounded-[3px]">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {post.author}
                    <span>•</span>
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-primary text-sm flex items-center gap-1 hover:underline"
                  >
                    {language === 'bn' ? 'পড়ুন' : 'Read'}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'bn' ? 'কোনো ব্লগ পাওয়া যায়নি' : 'No blogs found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
