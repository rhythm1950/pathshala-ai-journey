import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { FolderOpen, FileText, Video, Image, Upload, Search, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialResources = [
  { id: 1, name: 'Geometry_Chapter5.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-15' },
  { id: 2, name: 'Math_Lecture_Week3.mp4', type: 'video', size: '156 MB', date: '2024-01-14' },
  { id: 3, name: 'Triangle_Diagram.png', type: 'image', size: '850 KB', date: '2024-01-13' },
  { id: 4, name: 'Quiz_Solutions.pdf', type: 'pdf', size: '1.2 MB', date: '2024-01-12' },
  { id: 5, name: 'Practice_Problems.pdf', type: 'pdf', size: '3.1 MB', date: '2024-01-10' },
];

export function ResourceLibrary() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [resources, setResources] = useState(initialResources);
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleUpload = () => {
    const newResource = {
      id: resources.length + 1,
      name: 'New_Upload.pdf',
      type: 'pdf',
      size: '1.5 MB',
      date: new Date().toISOString().split('T')[0]
    };
    setResources([newResource, ...resources]);
    toast({
      title: language === 'bn' ? 'আপলোড সফল!' : 'Upload Successful!',
      description: language === 'bn' ? 'ফাইল আপলোড হয়েছে' : 'File uploaded successfully'
    });
  };

  const handleDelete = (id: number) => {
    setResources(resources.filter(r => r.id !== id));
    toast({
      title: language === 'bn' ? 'মুছে ফেলা হয়েছে' : 'Deleted',
      description: language === 'bn' ? 'ফাইল মুছে ফেলা হয়েছে' : 'File deleted successfully'
    });
  };

  const handleDownload = (name: string) => {
    toast({
      title: language === 'bn' ? 'ডাউনলোড শুরু' : 'Download Started',
      description: name
    });
  };

  const filteredResources = resources.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-secondary" />
          {language === 'bn' ? 'রিসোর্স লাইব্রেরি' : 'Resource Library'}
        </CardTitle>
        <Button size="sm" onClick={handleUpload}>
          <Upload className="h-4 w-4 mr-1" />
          {language === 'bn' ? 'আপলোড' : 'Upload'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'bn' ? 'ফাইল খুঁজুন...' : 'Search files...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {getIcon(resource.type)}
                <div>
                  <p className="font-medium text-sm">{resource.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{resource.size}</span>
                    <span>•</span>
                    <span>{resource.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleDownload(resource.name)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(resource.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-sm text-muted-foreground">
          <span>{filteredResources.length} {language === 'bn' ? 'টি ফাইল' : 'files'}</span>
          <span>{language === 'bn' ? 'মোট: 164 MB' : 'Total: 164 MB'}</span>
        </div>
      </CardContent>
    </Card>
  );
}
