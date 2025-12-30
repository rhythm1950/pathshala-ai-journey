import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Clock, FileText, Sparkles, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockSubmissions = [
  { id: 1, student: 'রাফি আহমেদ', studentEn: 'Rafi Ahmed', title: 'বাইনারি সার্চ', titleEn: 'Binary Search', status: 'submitted' },
  { id: 2, student: 'সারা খান', studentEn: 'Sara Khan', title: 'লিংকড লিস্ট', titleEn: 'Linked List', status: 'submitted' },
  { id: 3, student: 'আরিফ হোসেন', studentEn: 'Arif Hossain', title: 'রিকার্শন কুইজ', titleEn: 'Recursion Quiz', status: 'graded' },
];

export function AssignmentGrader() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const handleAISuggestion = () => {
    const suggestions = {
      bn: "শিক্ষার্থী ভালো প্রচেষ্টা দেখিয়েছে। ধাপগুলো সঠিক, তবে চূড়ান্ত উত্তরে ছোট গণনা ভুল আছে। সামগ্রিক বোঝাপড়া ভালো। গ্রেড সুপারিশ: ৮৫/১০০",
      en: "Student showed good effort. Steps are correct but there's a minor calculation error in the final answer. Overall understanding is good. Grade recommendation: 85/100"
    };
    setAiSuggestion(suggestions[language as keyof typeof suggestions]);
    setGrade("85");
  };

  const handleSubmitGrade = () => {
    if (!grade) {
      toast({
        title: language === 'bn' ? 'সতর্কতা' : 'Warning',
        description: language === 'bn' ? 'গ্রেড দিন' : 'Please enter a grade',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: language === 'bn' ? 'সফল!' : 'Success!',
      description: language === 'bn' ? 'গ্রেড জমা হয়েছে' : 'Grade submitted successfully'
    });
    setSelectedAssignment(null);
    setGrade("");
    setFeedback("");
    setAiSuggestion("");
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-secondary" />
          {language === 'bn' ? 'অ্যাসাইনমেন্ট গ্রেডার' : 'Assignment Grader'}
        </CardTitle>
      </CardHeader>
      <CardContent>
      {selectedAssignment === null ? (
          <div className="space-y-3">
            {mockSubmissions.map((submission, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedAssignment(index)}
              >
                <div className="flex items-center gap-3">
                  {submission.status === 'submitted' ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <p className="font-medium">{language === 'bn' ? submission.student : submission.studentEn}</p>
                    <p className="text-sm text-muted-foreground">{language === 'bn' ? submission.title : submission.titleEn}</p>
                  </div>
                </div>
                <Badge variant={submission.status === 'submitted' ? 'secondary' : 'default'}>
                  {submission.status === 'submitted' 
                    ? (language === 'bn' ? 'জমা দেওয়া' : 'Submitted')
                    : (language === 'bn' ? 'গ্রেড করা' : 'Graded')
                  }
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{language === 'bn' ? mockSubmissions[selectedAssignment].student : mockSubmissions[selectedAssignment].studentEn}</h3>
                <p className="text-sm text-muted-foreground">{language === 'bn' ? mockSubmissions[selectedAssignment].title : mockSubmissions[selectedAssignment].titleEn}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedAssignment(null)}>
                {language === 'bn' ? 'ফিরে যান' : 'Back'}
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-sm">
                {language === 'bn' 
                  ? 'শিক্ষার্থীর জমা দেওয়া উত্তর এখানে দেখানো হবে। এটি একটি ডেমো ভিউ।'
                  : 'Student\'s submitted answer would be displayed here. This is a demo view.'
                }
              </p>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAISuggestion}
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              {language === 'bn' ? 'AI সাজেশন নিন' : 'Get AI Suggestion'}
            </Button>

            {aiSuggestion && (
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {aiSuggestion}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === 'bn' ? 'গ্রেড (১০০ এর মধ্যে)' : 'Grade (out of 100)'}
                </label>
                <Input 
                  type="number" 
                  value={grade} 
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="85"
                  max={100}
                  min={0}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                {language === 'bn' ? 'ফিডব্যাক' : 'Feedback'}
              </label>
              <Textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={language === 'bn' ? 'শিক্ষার্থীর জন্য মন্তব্য...' : 'Comments for student...'}
                className="min-h-[100px]"
              />
            </div>

            <Button onClick={handleSubmitGrade} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              {language === 'bn' ? 'গ্রেড জমা দিন' : 'Submit Grade'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
