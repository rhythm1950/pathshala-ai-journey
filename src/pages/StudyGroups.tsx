import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, BookOpen, UserPlus, UserMinus, ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SUBJECTS = ['Mathematics', 'Physics', 'English', 'Chemistry', 'Biology', 'Computer Science', 'History'];

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Physics: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  English: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Chemistry: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  Biology: 'bg-green-500/10 text-green-600 border-green-500/20',
  'Computer Science': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  History: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
};

export default function StudyGroups() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', subject: '', description: '', max_members: 10 });

  // Fetch groups with member counts
  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['study-groups'],
    queryFn: async () => {
      const { data: groupsData, error } = await supabase
        .from('study_groups')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;

      // Get member counts and user memberships
      const groupIds = groupsData.map(g => g.id);
      const { data: members } = await supabase
        .from('study_group_members')
        .select('group_id, user_id')
        .in('group_id', groupIds);

      return groupsData.map(g => ({
        ...g,
        member_count: members?.filter(m => m.group_id === g.id).length || 0,
        is_member: members?.some(m => m.group_id === g.id && m.user_id === user?.id) || false,
      }));
    },
    enabled: !!user,
  });

  const joinMutation = useMutation({
    mutationFn: async (groupId: string) => {
      const { error } = await supabase.from('study_group_members').insert({ group_id: groupId, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
      toast({ title: language === 'bn' ? 'গ্রুপে যোগদান সফল!' : 'Joined group successfully!' });
    },
    onError: () => toast({ title: language === 'bn' ? 'যোগদান ব্যর্থ' : 'Failed to join', variant: 'destructive' }),
  });

  const leaveMutation = useMutation({
    mutationFn: async (groupId: string) => {
      const { error } = await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
      toast({ title: language === 'bn' ? 'গ্রুপ ছেড়ে দিয়েছেন' : 'Left group successfully' });
    },
    onError: () => toast({ title: language === 'bn' ? 'ত্রুটি হয়েছে' : 'Something went wrong', variant: 'destructive' }),
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from('study_groups').insert({
        name: newGroup.name,
        subject: newGroup.subject,
        description: newGroup.description,
        max_members: newGroup.max_members,
        created_by: user!.id,
      }).select().single();
      if (error) throw error;
      // Auto-join as member
      await supabase.from('study_group_members').insert({ group_id: data.id, user_id: user!.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-groups'] });
      setCreateOpen(false);
      setNewGroup({ name: '', subject: '', description: '', max_members: 10 });
      toast({ title: language === 'bn' ? 'গ্রুপ তৈরি হয়েছে!' : 'Group created!' });
    },
    onError: () => toast({ title: language === 'bn' ? 'তৈরি ব্যর্থ' : 'Failed to create', variant: 'destructive' }),
  });

  const filtered = groups.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.description?.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === 'all' || g.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  const myGroups = filtered.filter(g => g.is_member);
  const otherGroups = filtered.filter(g => !g.is_member);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/student" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Back to Dashboard'}
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-secondary-foreground flex items-center gap-2.5">
                  <Users className="h-7 w-7 text-primary" />
                  {language === 'bn' ? 'মাইক্রো স্টাডি গ্রুপ' : 'Micro Study Groups'}
                </h1>
                <p className="text-secondary-foreground/50 mt-1 text-sm">
                  {language === 'bn' ? 'আপনার পছন্দের বিষয়ের উপর ভিত্তি করে স্টাডি গ্রুপে যোগ দিন বা তৈরি করুন' : 'Join or create study groups based on your preferred subjects'}
                </p>
              </div>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-1.5 shrink-0">
                    <Plus className="h-4 w-4" />
                    {language === 'bn' ? 'গ্রুপ তৈরি করুন' : 'Create Group'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{language === 'bn' ? 'নতুন স্টাডি গ্রুপ' : 'New Study Group'}</DialogTitle>
                    <DialogDescription>{language === 'bn' ? 'একটি নতুন গ্রুপ তৈরি করুন এবং সহপাঠীদের আমন্ত্রণ জানান' : 'Create a group and invite classmates to join'}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <Input
                      placeholder={language === 'bn' ? 'গ্রুপের নাম' : 'Group name'}
                      value={newGroup.name}
                      onChange={e => setNewGroup(p => ({ ...p, name: e.target.value }))}
                    />
                    <Select value={newGroup.subject} onValueChange={v => setNewGroup(p => ({ ...p, subject: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'bn' ? 'বিষয় নির্বাচন করুন' : 'Select subject'} />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder={language === 'bn' ? 'বর্ণনা (ঐচ্ছিক)' : 'Description (optional)'}
                      value={newGroup.description}
                      onChange={e => setNewGroup(p => ({ ...p, description: e.target.value }))}
                      rows={3}
                    />
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        {language === 'bn' ? 'সর্বোচ্চ সদস্য' : 'Max members'}
                      </label>
                      <Input
                        type="number" min={2} max={20}
                        value={newGroup.max_members}
                        onChange={e => setNewGroup(p => ({ ...p, max_members: parseInt(e.target.value) || 10 }))}
                      />
                    </div>
                    <Button
                      className="w-full"
                      disabled={!newGroup.name || !newGroup.subject || createMutation.isPending}
                      onClick={() => createMutation.mutate()}
                    >
                      {createMutation.isPending
                        ? (language === 'bn' ? 'তৈরি হচ্ছে...' : 'Creating...')
                        : (language === 'bn' ? 'গ্রুপ তৈরি করুন' : 'Create Group')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'bn' ? 'গ্রুপ খুঁজুন...' : 'Search groups...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'bn' ? 'সব বিষয়' : 'All Subjects'}</SelectItem>
              {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-5 h-40" />
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* My Groups */}
            {myGroups.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {language === 'bn' ? 'আমার গ্রুপ' : 'My Groups'}
                  <Badge variant="secondary" className="text-[10px]">{myGroups.length}</Badge>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {myGroups.map((group, i) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        index={i}
                        language={language}
                        onLeave={() => leaveMutation.mutate(group.id)}
                        isLoading={leaveMutation.isPending}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Other Groups */}
            <div>
              <h2 className="text-sm font-bold flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                {language === 'bn' ? 'উপলব্ধ গ্রুপ' : 'Available Groups'}
                <Badge variant="secondary" className="text-[10px]">{otherGroups.length}</Badge>
              </h2>
              {otherGroups.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-10 text-center text-muted-foreground text-sm">
                    {language === 'bn' ? 'কোন গ্রুপ পাওয়া যায়নি। একটি নতুন তৈরি করুন!' : 'No groups found. Create one!'}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {otherGroups.map((group, i) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        index={i}
                        language={language}
                        onJoin={() => joinMutation.mutate(group.id)}
                        isLoading={joinMutation.isPending}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GroupCard({
  group,
  index,
  language,
  onJoin,
  onLeave,
  isLoading,
}: {
  group: any;
  index: number;
  language: string;
  onJoin?: () => void;
  onLeave?: () => void;
  isLoading: boolean;
}) {
  const isFull = group.member_count >= group.max_members;
  const colorClass = subjectColors[group.subject] || 'bg-muted text-muted-foreground border-border';
  const fillPercent = (group.member_count / group.max_members) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <Badge variant="outline" className={`text-[10px] font-semibold border ${colorClass}`}>
              {group.subject}
            </Badge>
            <span className="text-[10px] text-muted-foreground">
              {group.member_count}/{group.max_members}
            </span>
          </div>
          <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{group.name}</h3>
          {group.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{group.description}</p>
          )}
          <div className="mt-auto space-y-3">
            <div>
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>{language === 'bn' ? 'সদস্য' : 'Members'}</span>
                <span>{fillPercent.toFixed(0)}%</span>
              </div>
              <Progress value={fillPercent} className="h-1.5" />
            </div>
            {group.is_member ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={onLeave}
                disabled={isLoading}
              >
                <UserMinus className="h-3.5 w-3.5" />
                {language === 'bn' ? 'গ্রুপ ছাড়ুন' : 'Leave Group'}
              </Button>
            ) : (
              <Button
                size="sm"
                className="w-full text-xs gap-1.5"
                onClick={onJoin}
                disabled={isFull || isLoading}
              >
                <UserPlus className="h-3.5 w-3.5" />
                {isFull
                  ? (language === 'bn' ? 'পূর্ণ' : 'Full')
                  : (language === 'bn' ? 'যোগ দিন' : 'Join Group')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
