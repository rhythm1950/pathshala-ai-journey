import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, Users, BookOpen, Mail, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const { user, signIn, signUp, signInWithGoogle, loading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<AppRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    en: {
      title: 'Welcome to Pathshala AI',
      subtitle: 'Sign in to continue your learning journey',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      selectRole: 'Select your role',
      student: 'Student',
      teacher: 'Teacher',
      parent: 'Parent',
      studentDesc: 'Access courses and track progress',
      teacherDesc: 'Create and manage classes',
      parentDesc: 'Monitor your child\'s learning',
      orContinueWith: 'Or continue with',
      google: 'Continue with Google',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      signInSuccess: 'Signed in successfully!',
      signUpSuccess: 'Account created successfully!',
      error: 'An error occurred',
    },
    bn: {
      title: 'পাঠশালা AI তে স্বাগতম',
      subtitle: 'আপনার শেখার যাত্রা চালিয়ে যেতে সাইন ইন করুন',
      signIn: 'সাইন ইন',
      signUp: 'সাইন আপ',
      email: 'ইমেইল',
      password: 'পাসওয়ার্ড',
      fullName: 'পুরো নাম',
      selectRole: 'আপনার ভূমিকা নির্বাচন করুন',
      student: 'শিক্ষার্থী',
      teacher: 'শিক্ষক',
      parent: 'অভিভাবক',
      studentDesc: 'কোর্সে অ্যাক্সেস করুন এবং অগ্রগতি ট্র্যাক করুন',
      teacherDesc: 'ক্লাস তৈরি এবং পরিচালনা করুন',
      parentDesc: 'আপনার সন্তানের শেখা পর্যবেক্ষণ করুন',
      orContinueWith: 'অথবা এর সাথে চালিয়ে যান',
      google: 'Google দিয়ে চালিয়ে যান',
      alreadyHaveAccount: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?',
      dontHaveAccount: 'অ্যাকাউন্ট নেই?',
      signInSuccess: 'সফলভাবে সাইন ইন হয়েছে!',
      signUpSuccess: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!',
      error: 'একটি ত্রুটি হয়েছে',
    },
  };

  const text = t[language];

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message || text.error);
    } else {
      toast.success(text.signInSuccess);
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await signUp(email, password, fullName, role);
    
    if (error) {
      toast.error(error.message || text.error);
    } else {
      toast.success(text.signUpSuccess);
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message || text.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const roleOptions = [
    { value: 'student' as AppRole, label: text.student, desc: text.studentDesc, icon: GraduationCap },
    { value: 'teacher' as AppRole, label: text.teacher, desc: text.teacherDesc, icon: BookOpen },
    { value: 'parent' as AppRole, label: text.parent, desc: text.parentDesc, icon: Users },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{text.title}</CardTitle>
          <CardDescription>{text.subtitle}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">{text.signIn}</TabsTrigger>
              <TabsTrigger value="signup">{text.signUp}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{text.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">{text.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {text.signIn}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{text.fullName}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{text.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{text.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>{text.selectRole}</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(value) => setRole(value as AppRole)}
                    className="grid grid-cols-1 gap-2"
                  >
                    {roleOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          role === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setRole(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <option.icon className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <Label htmlFor={option.value} className="cursor-pointer font-medium">
                            {option.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">{option.desc}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {text.signUp}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">{text.orContinueWith}</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            type="button"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {text.google}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
