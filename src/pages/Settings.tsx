import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Bell, 
  Globe, 
  Shield, 
  Smartphone,
  Mail,
  MessageSquare,
  Trophy,
  BookOpen,
  Users,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Settings() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    courseUpdates: true,
    newAchievements: true,
    weeklyDigest: true,
    liveClassReminders: true,
    groupMessages: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "সেটিংস আপডেট হয়েছে",
      description: "আপনার নোটিফিকেশন পছন্দ সংরক্ষণ করা হয়েছে।",
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "সেটিংস আপডেট হয়েছে", 
      description: "আপনার প্রাইভেসি সেটিংস সংরক্ষণ করা হয়েছে।",
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'bn' | 'en');
    toast({
      title: value === 'bn' ? "ভাষা পরিবর্তন হয়েছে" : "Language Changed",
      description: value === 'bn' ? "বাংলা ভাষায় পরিবর্তন করা হয়েছে।" : "Changed to English.",
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark');
    toast({
      title: "থিম পরিবর্তন হয়েছে",
      description: value === 'dark' ? "ডার্ক মোড সক্রিয় করা হয়েছে।" : "লাইট মোড সক্রিয় করা হয়েছে।",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            সেটিংস
          </h1>
          <p className="text-muted-foreground mt-2">আপনার অ্যাকাউন্ট এবং অ্যাপ্লিকেশন সেটিংস পরিচালনা করুন</p>
        </div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">চেহারা</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">নোটিফিকেশন</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">ভাষা</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">প্রাইভেসি</span>
            </TabsTrigger>
          </TabsList>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  চেহারা সেটিংস
                </CardTitle>
                <CardDescription>
                  আপনার পছন্দ অনুযায়ী অ্যাপ্লিকেশনের চেহারা কাস্টমাইজ করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">থিম নির্বাচন করুন</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === 'light' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                          <Sun className="w-6 h-6 text-amber-600" />
                        </div>
                        <span className="font-medium">লাইট মোড</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === 'dark' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                          <Moon className="w-6 h-6 text-slate-200" />
                        </div>
                        <span className="font-medium">ডার্ক মোড</span>
                      </div>
                    </button>

                    <button
                      disabled
                      className="p-4 rounded-xl border-2 border-border opacity-50 cursor-not-allowed"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Monitor className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <span className="font-medium">সিস্টেম</span>
                        <span className="text-xs text-muted-foreground">শীঘ্রই আসছে</span>
                      </div>
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-medium">প্রিভিউ</Label>
                  <div className="p-6 rounded-xl border bg-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <div className="h-4 w-32 rounded bg-foreground/20" />
                        <div className="h-3 w-24 rounded bg-muted-foreground/20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-3/4 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  নোটিফিকেশন সেটিংস
                </CardTitle>
                <CardDescription>
                  কোন নোটিফিকেশন পেতে চান তা নির্বাচন করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">নোটিফিকেশন চ্যানেল</h3>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">ইমেইল নোটিফিকেশন</Label>
                        <p className="text-sm text-muted-foreground">গুরুত্বপূর্ণ আপডেট ইমেইলে পান</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">পুশ নোটিফিকেশন</Label>
                        <p className="text-sm text-muted-foreground">ব্রাউজারে তাৎক্ষণিক নোটিফিকেশন</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">SMS নোটিফিকেশন</Label>
                        <p className="text-sm text-muted-foreground">মোবাইলে মেসেজ পান</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={() => handleNotificationChange('sms')}
                    />
                  </div>
                </div>

                <Separator />

                {/* Notification Types */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">নোটিফিকেশন ধরন</h3>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">কোর্স আপডেট</Label>
                        <p className="text-sm text-muted-foreground">নতুন লেসন এবং কন্টেন্ট</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.courseUpdates}
                      onCheckedChange={() => handleNotificationChange('courseUpdates')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">নতুন অর্জন</Label>
                        <p className="text-sm text-muted-foreground">ব্যাজ এবং পুরস্কার</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.newAchievements}
                      onCheckedChange={() => handleNotificationChange('newAchievements')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">লাইভ ক্লাস রিমাইন্ডার</Label>
                        <p className="text-sm text-muted-foreground">ক্লাস শুরুর আগে মনে করিয়ে দিন</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.liveClassReminders}
                      onCheckedChange={() => handleNotificationChange('liveClassReminders')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">গ্রুপ মেসেজ</Label>
                        <p className="text-sm text-muted-foreground">গ্রুপ প্রজেক্ট এবং আলোচনা</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.groupMessages}
                      onCheckedChange={() => handleNotificationChange('groupMessages')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Tab */}
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  ভাষা সেটিংস
                </CardTitle>
                <CardDescription>
                  আপনার পছন্দের ভাষা নির্বাচন করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">প্রাথমিক ভাষা</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="ভাষা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bn">
                        <div className="flex items-center gap-2">
                          <span>🇧🇩</span>
                          <span>বাংলা</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="en">
                        <div className="flex items-center gap-2">
                          <span>🇬🇧</span>
                          <span>English</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    ভাষা পরিবর্তন করলে সম্পূর্ণ অ্যাপ্লিকেশনের টেক্সট পরিবর্তন হবে। কিছু কন্টেন্ট শুধুমাত্র নির্বাচিত ভাষায় উপলব্ধ হতে পারে।
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  প্রাইভেসি সেটিংস
                </CardTitle>
                <CardDescription>
                  আপনার প্রোফাইল এবং ডেটার প্রাইভেসি নিয়ন্ত্রণ করুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <Label className="font-medium">প্রোফাইল দৃশ্যমানতা</Label>
                      <p className="text-sm text-muted-foreground">অন্যরা আপনার প্রোফাইল দেখতে পারবে</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={() => handlePrivacyChange('profileVisible')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <Label className="font-medium">অগ্রগতি দেখান</Label>
                      <p className="text-sm text-muted-foreground">আপনার শেখার অগ্রগতি শেয়ার করুন</p>
                    </div>
                    <Switch
                      checked={privacy.showProgress}
                      onCheckedChange={() => handlePrivacyChange('showProgress')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <Label className="font-medium">অর্জন দেখান</Label>
                      <p className="text-sm text-muted-foreground">আপনার ব্যাজ এবং অর্জন প্রদর্শন করুন</p>
                    </div>
                    <Switch
                      checked={privacy.showAchievements}
                      onCheckedChange={() => handlePrivacyChange('showAchievements')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <Label className="font-medium">মেসেজ অনুমতি</Label>
                      <p className="text-sm text-muted-foreground">অন্যদের আপনাকে মেসেজ করতে দিন</p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={() => handlePrivacyChange('allowMessages')}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">ডেটা ম্যানেজমেন্ট</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">
                      ডেটা ডাউনলোড করুন
                    </Button>
                    <Button variant="destructive">
                      অ্যাকাউন্ট মুছে ফেলুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
