import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, MessageCircle, FileText, Calendar, ChevronRight } from 'lucide-react';

const projects = [
  { 
    id: 1, 
    titleBn: 'বিজ্ঞান মেলা প্রকল্প', 
    titleEn: 'Science Fair Project', 
    progress: 65,
    members: [
      { name: 'Rahim', avatar: 'R' },
      { name: 'Karim', avatar: 'K' },
      { name: 'Fatima', avatar: 'F' },
    ],
    deadline: '2024-02-28',
    messages: 12
  },
  { 
    id: 2, 
    titleBn: 'গণিত অলিম্পিয়াড প্রস্তুতি', 
    titleEn: 'Math Olympiad Prep', 
    progress: 40,
    members: [
      { name: 'Ahmed', avatar: 'A' },
      { name: 'Sara', avatar: 'S' },
    ],
    deadline: '2024-03-15',
    messages: 5
  },
];

export function GroupProjects() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {language === 'bn' ? 'গ্রুপ প্রজেক্ট' : 'Group Projects'}
        </h3>
        <Button size="sm" variant="outline">
          {language === 'bn' ? '+ নতুন' : '+ New'}
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              selectedProject === project.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border/50 hover:border-primary/50'
            }`}
            onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium text-foreground">
                {language === 'bn' ? project.titleBn : project.titleEn}
              </p>
              <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
                selectedProject === project.id ? 'rotate-90' : ''
              }`} />
            </div>

            <div className="flex items-center gap-4 mb-3">
              {/* Team avatars */}
              <div className="flex -space-x-2">
                {project.members.map((member, idx) => (
                  <div 
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-medium border-2 border-background"
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              
              <div className="flex-1">
                <Progress value={project.progress} className="h-2" />
              </div>
              <span className="text-sm font-medium text-foreground">{project.progress}%</span>
            </div>

            {selectedProject === project.id && (
              <div className="pt-3 border-t border-border/50 animate-fade-in">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {language === 'bn' ? 'শেষ তারিখ:' : 'Deadline:'} {project.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {project.messages} {language === 'bn' ? 'বার্তা' : 'messages'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {language === 'bn' ? 'চ্যাট' : 'Chat'}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-1" />
                    {language === 'bn' ? 'ফাইল' : 'Files'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
