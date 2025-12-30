import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Copy, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const generatedContent = {
  quiz: {
    bn: `**গণিত কুইজ - অধ্যায় ৫**

১। ত্রিভুজের তিন কোণের সমষ্টি কত?
   ক) ৯০° খ) ১৮০° গ) ২৭০° ঘ) ৩৬০°

২। একটি সমবাহু ত্রিভুজের প্রতিটি কোণ কত ডিগ্রি?
   ক) ৩০° খ) ৪৫° গ) ৬০° ঘ) ৯০°

৩। পিথাগোরাসের উপপাদ্য কোন ত্রিভুজে প্রযোজ্য?
   ক) সমবাহু খ) সমদ্বিবাহু গ) সমকোণী ঘ) বিষমবাহু`,
    en: `**Math Quiz - Chapter 5**

1. What is the sum of all angles in a triangle?
   a) 90° b) 180° c) 270° d) 360°

2. What is each angle of an equilateral triangle?
   a) 30° b) 45° c) 60° d) 90°

3. Pythagorean theorem applies to which triangle?
   a) Equilateral b) Isosceles c) Right-angled d) Scalene`
  },
  lesson: {
    bn: `**পাঠ পরিকল্পনা: জ্যামিতির মৌলিক ধারণা**

**উদ্দেশ্য:** শিক্ষার্থীরা ত্রিভুজের বৈশিষ্ট্য বুঝতে পারবে

**পাঠের ধাপসমূহ:**
১। পূর্ব জ্ঞান যাচাই (৫ মিনিট)
২। নতুন ধারণা উপস্থাপন (১৫ মিনিট)
৩। উদাহরণ সহ ব্যাখ্যা (১০ মিনিট)
৪। অনুশীলন (১৫ মিনিট)
৫। মূল্যায়ন (৫ মিনিট)`,
    en: `**Lesson Plan: Basic Geometry Concepts**

**Objective:** Students will understand triangle properties

**Lesson Steps:**
1. Prior knowledge check (5 minutes)
2. New concept presentation (15 minutes)
3. Explanation with examples (10 minutes)
4. Practice (15 minutes)
5. Assessment (5 minutes)`
  },
  assignment: {
    bn: `**হোমওয়ার্ক: জ্যামিতি অনুশীলন**

**জমা দেওয়ার তারিখ:** আগামী সোমবার

**নির্দেশনা:**
১। পাঠ্যবই থেকে অনুশীলনী ৫.১ এর ১-১০ নং সমস্যা সমাধান করো
২। তিনটি ভিন্ন ধরনের ত্রিভুজ আঁকো এবং তাদের বৈশিষ্ট্য লেখো
৩। পিথাগোরাসের উপপাদ্য ব্যবহার করে ২টি বাস্তব সমস্যা সমাধান করো`,
    en: `**Homework: Geometry Practice**

**Due Date:** Next Monday

**Instructions:**
1. Solve problems 1-10 from Exercise 5.1 in textbook
2. Draw three different types of triangles and write their properties
3. Solve 2 real-world problems using Pythagorean theorem`
  }
};

export function AIContentGenerator() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [contentType, setContentType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!contentType || !subject) {
      toast({
        title: language === 'bn' ? 'সতর্কতা' : 'Warning',
        description: language === 'bn' ? 'অনুগ্রহ করে সব অপশন নির্বাচন করুন' : 'Please select all options',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const content = generatedContent[contentType as keyof typeof generatedContent];
      setGeneratedText(content[language as keyof typeof content]);
      setIsGenerating(false);
      toast({
        title: language === 'bn' ? 'সফল!' : 'Success!',
        description: language === 'bn' ? 'কন্টেন্ট তৈরি হয়েছে' : 'Content generated successfully'
      });
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: language === 'bn' ? 'কপি হয়েছে!' : 'Copied!',
      description: language === 'bn' ? 'ক্লিপবোর্ডে কপি করা হয়েছে' : 'Copied to clipboard'
    });
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          {language === 'bn' ? 'AI কন্টেন্ট জেনারেটর' : 'AI Content Generator'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? 'কন্টেন্ট টাইপ' : 'Content Type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiz">{language === 'bn' ? 'কুইজ' : 'Quiz'}</SelectItem>
              <SelectItem value="lesson">{language === 'bn' ? 'পাঠ পরিকল্পনা' : 'Lesson Plan'}</SelectItem>
              <SelectItem value="assignment">{language === 'bn' ? 'অ্যাসাইনমেন্ট' : 'Assignment'}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'bn' ? 'বিষয়' : 'Subject'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">{language === 'bn' ? 'গণিত' : 'Mathematics'}</SelectItem>
              <SelectItem value="science">{language === 'bn' ? 'বিজ্ঞান' : 'Science'}</SelectItem>
              <SelectItem value="english">{language === 'bn' ? 'ইংরেজি' : 'English'}</SelectItem>
              <SelectItem value="bengali">{language === 'bn' ? 'বাংলা' : 'Bengali'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleGenerate} 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          {language === 'bn' ? 'AI দিয়ে তৈরি করুন' : 'Generate with AI'}
        </Button>

        {generatedText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {language === 'bn' ? 'জেনারেটেড কন্টেন্ট' : 'Generated Content'}
              </span>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Textarea 
              value={generatedText} 
              onChange={(e) => setGeneratedText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
