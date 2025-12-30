import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { teacherClasses } from "@/data/demoData";
import { Calendar, Clock, Video, Users, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ClassScheduler() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState(teacherClasses);
  const [newClass, setNewClass] = useState({
    name: '',
    date: '',
    time: '',
    duration: '45'
  });

  const handleCreateClass = () => {
    if (!newClass.name || !newClass.date || !newClass.time) {
      toast({
        title: language === 'bn' ? 'সতর্কতা' : 'Warning',
        description: language === 'bn' ? 'সব তথ্য পূরণ করুন' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    const createdClass = {
      id: classes.length + 1,
      name: newClass.name,
      nameEn: newClass.name,
      students: 0,
      progress: 0,
      schedule: `${newClass.date} ${newClass.time}`,
      scheduleEn: `${newClass.date} ${newClass.time}`
    };

    setClasses([...classes, createdClass]);
    setShowForm(false);
    setNewClass({ name: '', date: '', time: '', duration: '45' });
    toast({
      title: language === 'bn' ? 'সফল!' : 'Success!',
      description: language === 'bn' ? 'ক্লাস তৈরি হয়েছে' : 'Class created successfully'
    });
  };

  const handleStartClass = (className: string) => {
    toast({
      title: language === 'bn' ? 'লাইভ ক্লাস শুরু' : 'Starting Live Class',
      description: language === 'bn' ? `${className} শুরু হচ্ছে...` : `Starting ${className}...`
    });
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          {language === 'bn' ? 'লাইভ ক্লাস শিডিউলার' : 'Live Class Scheduler'}
        </CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4 mr-1" />}
          {!showForm && (language === 'bn' ? 'নতুন ক্লাস' : 'New Class')}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="p-4 rounded-lg border border-border/50 bg-muted/30 space-y-4">
            <Input
              placeholder={language === 'bn' ? 'ক্লাসের নাম' : 'Class Name'}
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={newClass.date}
                onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
              />
              <Input
                type="time"
                value={newClass.time}
                onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
              />
            </div>
            <Select value={newClass.duration} onValueChange={(v) => setNewClass({ ...newClass, duration: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 {language === 'bn' ? 'মিনিট' : 'minutes'}</SelectItem>
                <SelectItem value="45">45 {language === 'bn' ? 'মিনিট' : 'minutes'}</SelectItem>
                <SelectItem value="60">60 {language === 'bn' ? 'মিনিট' : 'minutes'}</SelectItem>
                <SelectItem value="90">90 {language === 'bn' ? 'মিনিট' : 'minutes'}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleCreateClass} className="w-full">
              {language === 'bn' ? 'ক্লাস তৈরি করুন' : 'Create Class'}
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cls.schedule}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {cls.students}
                    </span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleStartClass(cls.name)}
              >
                <Video className="h-4 w-4 mr-1" />
                {language === 'bn' ? 'শুরু করুন' : 'Start'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
