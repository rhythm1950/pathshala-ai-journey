import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Edit2, Save, X, Download, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { exportCertificatePDF, exportProgressReportPDF } from '@/lib/pdfExport';
import rahulAvatar from '@/assets/avatars/rahul.jpg';

export default function Profile() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'রাহুল শর্মা',
    email: 'rahul.sharma@example.com',
    phone: '+880 1712-345678',
    location: 'ঢাকা, বাংলাদেশ',
    joinDate: 'জানুয়ারি ২০২৪',
    bio: 'একজন উৎসাহী শিক্ষার্থী যে প্রযুক্তি এবং বিজ্ঞান ভালোবাসে।',
    role: 'student'
  });

  const stats = {
    coursesCompleted: 12,
    certificatesEarned: 5,
    hoursLearned: 156,
    currentStreak: 7
  };

  const achievements = [
    { id: 1, name: 'প্রথম পদক্ষেপ', description: 'প্রথম কোর্স সম্পন্ন', icon: '🎯' },
    { id: 2, name: 'সপ্তাহের তারকা', description: '৭ দিন ধারাবাহিক শেখা', icon: '⭐' },
    { id: 3, name: 'গণিত বিশেষজ্ঞ', description: 'গণিতে ৯০% স্কোর', icon: '🧮' },
    { id: 4, name: 'দ্রুত শিক্ষার্থী', description: '১০০ ঘন্টা শেখা সম্পন্ন', icon: '🚀' },
  ];

  const recentCertificates = [
    { id: 1, name: 'বীজগণিত মাস্টারি', issueDate: 'ডিসেম্বর ২০২৪', grade: 'A+' },
    { id: 2, name: 'বাংলা সাহিত্য', issueDate: 'নভেম্বর ২০২৪', grade: 'A' },
    { id: 3, name: 'ইংরেজি ভিত্তি', issueDate: 'অক্টোবর ২০২৪', grade: 'A+' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "প্রোফাইল আপডেট হয়েছে",
      description: "আপনার প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে।",
    });
  };

  const handleExportProgressReport = () => {
    exportProgressReportPDF(profile, stats, achievements, recentCertificates);
    toast({
      title: "রিপোর্ট ডাউনলোড হচ্ছে",
      description: "আপনার অগ্রগতি রিপোর্ট PDF হিসেবে ডাউনলোড হচ্ছে।",
    });
  };

  const handleExportCertificate = (certificate: typeof recentCertificates[0]) => {
    exportCertificatePDF(certificate, profile.name);
    toast({
      title: "সার্টিফিকেট ডাউনলোড হচ্ছে",
      description: `${certificate.name} সার্টিফিকেট ডাউনলোড হচ্ছে।`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarImage src={rahulAvatar} alt={profile.name} />
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                    {profile.role === 'student' ? 'শিক্ষার্থী' : 'শিক্ষক'}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  onClick={handleExportProgressReport}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </Button>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      বাতিল
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      সম্পাদনা
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-primary">{stats.coursesCompleted}</div>
            <div className="text-sm text-muted-foreground">কোর্স সম্পন্ন</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-secondary">{stats.certificatesEarned}</div>
            <div className="text-sm text-muted-foreground">সার্টিফিকেট</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-accent">{stats.hoursLearned}</div>
            <div className="text-sm text-muted-foreground">ঘন্টা শেখা</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-3xl font-bold text-primary">{stats.currentStreak}🔥</div>
            <div className="text-sm text-muted-foreground">দিনের ধারা</div>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="info">তথ্য</TabsTrigger>
            <TabsTrigger value="achievements">অর্জন</TabsTrigger>
            <TabsTrigger value="certificates">সার্টিফিকেট</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  ব্যক্তিগত তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">নাম</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">ইমেইল</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">ফোন</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">অবস্থান</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">বায়ো</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleSave} className="w-fit">
                      <Save className="w-4 h-4 mr-2" />
                      সংরক্ষণ করুন
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">ইমেইল</div>
                        <div className="font-medium">{profile.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">ফোন</div>
                        <div className="font-medium">{profile.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">অবস্থান</div>
                        <div className="font-medium">{profile.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">যোগদানের তারিখ</div>
                        <div className="font-medium">{profile.joinDate}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  অর্জনসমূহ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <div className="font-semibold">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  সার্টিফিকেটসমূহ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{cert.name}</div>
                          <div className="text-sm text-muted-foreground">{cert.issueDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-primary border-primary">
                          {cert.grade}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExportCertificate(cert)}
                          title="ডাউনলোড সার্টিফিকেট"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
