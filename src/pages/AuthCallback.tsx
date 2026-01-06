import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { AppRole } from '@/contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [needsRole, setNeedsRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AppRole>('student');
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user already has a role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (roleData?.role) {
          // User has a role, redirect based on role
          navigate(getRoleRedirect(roleData.role));
        } else {
          // User needs to select a role
          setUserId(session.user.id);
          setNeedsRole(true);
        }
      } else {
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate]);

  const getRoleRedirect = (role: string) => {
    switch (role) {
      case 'teacher':
        return '/teacher';
      case 'parent':
        return '/parent';
      default:
        return '/student';
    }
  };

  const handleRoleSubmit = async () => {
    if (!userId) return;
    
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role: selectedRole });
    
    if (error) {
      toast.error('Failed to set role. Please try again.');
      console.error('Error setting role:', error);
    } else {
      toast.success('Welcome to Pathshala AI!');
      navigate(getRoleRedirect(selectedRole));
    }
    
    setIsSubmitting(false);
  };

  const roleOptions = [
    { value: 'student' as AppRole, label: 'Student', desc: 'Access courses and track progress', icon: GraduationCap },
    { value: 'teacher' as AppRole, label: 'Teacher', desc: 'Create and manage classes', icon: BookOpen },
    { value: 'parent' as AppRole, label: 'Parent', desc: "Monitor your child's learning", icon: Users },
  ];

  if (needsRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Complete Your Profile</CardTitle>
            <p className="text-muted-foreground">Select your role to continue</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as AppRole)}
              className="grid grid-cols-1 gap-2"
            >
              {roleOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedRole === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole(option.value)}
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
            
            <Button
              onClick={handleRoleSubmit}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
