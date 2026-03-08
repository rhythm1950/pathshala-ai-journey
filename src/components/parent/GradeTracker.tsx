import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Calendar, Award, Download } from 'lucide-react';
import { exportGradeReportPDF } from '@/lib/pdfExport';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const gradesData = {
  exams: [
    { id: 1, name: 'প্রথম সাময়িক পরীক্ষা', nameEn: 'First Term Exam', date: 'মার্চ ২০২৪', dateEn: 'March 2024', subjects: [
      { name: 'গণিত', nameEn: 'Mathematics', marks: 85, total: 100, grade: 'A' },
      { name: 'বাংলা', nameEn: 'Bengali', marks: 78, total: 100, grade: 'B+' },
      { name: 'ইংরেজি', nameEn: 'English', marks: 82, total: 100, grade: 'A-' },
      { name: 'বিজ্ঞান', nameEn: 'Science', marks: 75, total: 100, grade: 'B+' },
      { name: 'সমাজ বিজ্ঞান', nameEn: 'Social Science', marks: 88, total: 100, grade: 'A' },
    ]},
    { id: 2, name: 'দ্বিতীয় সাময়িক পরীক্ষা', nameEn: 'Second Term Exam', date: 'জুন ২০২৪', dateEn: 'June 2024', subjects: [
      { name: 'গণিত', nameEn: 'Mathematics', marks: 90, total: 100, grade: 'A+' },
      { name: 'বাংলা', nameEn: 'Bengali', marks: 80, total: 100, grade: 'A-' },
      { name: 'ইংরেজি', nameEn: 'English', marks: 85, total: 100, grade: 'A' },
      { name: 'বিজ্ঞান', nameEn: 'Science', marks: 72, total: 100, grade: 'B' },
      { name: 'সমাজ বিজ্ঞান', nameEn: 'Social Science', marks: 85, total: 100, grade: 'A' },
    ]},
  ],
  assignments: [
    { id: 1, subject: 'গণিত', subjectEn: 'Mathematics', title: 'বীজগণিত অনুশীলন', titleEn: 'Algebra Practice', submittedDate: '১৫ ডিসেম্বর', submittedDateEn: 'Dec 15', marks: 18, total: 20, status: 'graded' },
    { id: 2, subject: 'বাংলা', subjectEn: 'Bengali', title: 'রচনা লেখা', titleEn: 'Essay Writing', submittedDate: '১৪ ডিসেম্বর', submittedDateEn: 'Dec 14', marks: 22, total: 25, status: 'graded' },
    { id: 3, subject: 'ইংরেজি', subjectEn: 'English', title: 'Essay Writing', titleEn: 'Essay Writing', submittedDate: '১৬ ডিসেম্বর', submittedDateEn: 'Dec 16', marks: null, total: 20, status: 'pending' },
    { id: 4, subject: 'বিজ্ঞান', subjectEn: 'Science', title: 'ল্যাব রিপোর্ট', titleEn: 'Lab Report', submittedDate: '১৩ ডিসেম্বর', submittedDateEn: 'Dec 13', marks: 28, total: 30, status: 'graded' },
  ],
  quizzes: [
    { id: 1, subject: 'গণিত', subjectEn: 'Mathematics', title: 'সাপ্তাহিক কুইজ ১২', titleEn: 'Weekly Quiz 12', date: '২০ ডিসেম্বর', dateEn: 'Dec 20', score: 9, total: 10 },
    { id: 2, subject: 'বিজ্ঞান', subjectEn: 'Science', title: 'অধ্যায় ৫ কুইজ', titleEn: 'Chapter 5 Quiz', date: '১৯ ডিসেম্বর', dateEn: 'Dec 19', score: 8, total: 10 },
    { id: 3, subject: 'ইংরেজি', subjectEn: 'English', title: 'Vocabulary Test', titleEn: 'Vocabulary Test', date: '১৮ ডিসেম্বর', dateEn: 'Dec 18', score: 7, total: 10 },
    { id: 4, subject: 'বাংলা', subjectEn: 'Bengali', title: 'ব্যাকরণ কুইজ', titleEn: 'Grammar Quiz', date: '১৭ ডিসেম্বর', dateEn: 'Dec 17', score: 10, total: 10 },
  ],
};

export function GradeTracker() {
  const { language } = useLanguage();
  const [selectedExam, setSelectedExam] = useState(gradesData.exams[1].id.toString());

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (grade.startsWith('B')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    if (grade.startsWith('C')) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-red-500/10 text-red-600 border-red-500/20';
  };

  const getScorePercentage = (marks: number, total: number) => Math.round((marks / total) * 100);

  const selectedExamData = gradesData.exams.find(e => e.id.toString() === selectedExam);
  const totalMarks = selectedExamData?.subjects.reduce((acc, s) => acc + s.marks, 0) || 0;
  const totalPossible = selectedExamData?.subjects.reduce((acc, s) => acc + s.total, 0) || 0;

  const handleExportGrades = () => {
    if (!selectedExamData) return;
    const grades = selectedExamData.subjects.map(s => ({
      subject: language === 'bn' ? s.name : s.nameEn,
      grade: s.grade,
      percentage: Math.round((s.marks / s.total) * 100),
      trend: s.marks >= 80 ? '↑ Improving' : s.marks >= 60 ? '→ Stable' : '↓ Needs Attention'
    }));
    exportGradeReportPDF('সারা', grades);
    toast({
      title: language === 'bn' ? 'গ্রেড রিপোর্ট ডাউনলোড হচ্ছে' : 'Downloading Grade Report',
      description: language === 'bn' ? 'গ্রেড রিপোর্ট PDF হিসেবে ডাউনলোড হচ্ছে।' : 'Grade report is being downloaded as PDF.',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          {language === 'bn' ? 'গ্রেড ট্র্যাকার' : 'Grade Tracker'}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleExportGrades}>
          <Download className="w-4 h-4 mr-2" />
          {language === 'bn' ? 'রিপোর্ট ডাউনলোড' : 'Download Report'}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exams" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="exams">{language === 'bn' ? 'পরীক্ষা' : 'Exams'}</TabsTrigger>
            <TabsTrigger value="assignments">{language === 'bn' ? 'অ্যাসাইনমেন্ট' : 'Assignments'}</TabsTrigger>
            <TabsTrigger value="quizzes">{language === 'bn' ? 'কুইজ' : 'Quizzes'}</TabsTrigger>
          </TabsList>

          <TabsContent value="exams" className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradesData.exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                      {language === 'bn' ? exam.name : exam.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{totalMarks}/{totalPossible}</div>
                <p className="text-sm text-muted-foreground">
                  {getScorePercentage(totalMarks, totalPossible)}% {language === 'bn' ? 'গড়' : 'Average'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedExamData?.subjects.map((subject, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{language === 'bn' ? subject.name : subject.nameEn}</div>
                      <div className="text-sm text-muted-foreground">
                        {subject.marks}/{subject.total} {language === 'bn' ? 'নম্বর' : 'marks'}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getGradeColor(subject.grade)}>{subject.grade}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-3">
            {gradesData.assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 rounded-xl border bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">{language === 'bn' ? assignment.title : assignment.titleEn}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'bn' ? assignment.subject : assignment.subjectEn} • {language === 'bn' ? assignment.submittedDate : assignment.submittedDateEn}
                    </div>
                  </div>
                </div>
                {assignment.status === 'graded' ? (
                  <div className="text-right">
                    <div className="font-semibold text-primary">{assignment.marks}/{assignment.total}</div>
                    <div className="text-xs text-muted-foreground">{getScorePercentage(assignment.marks!, assignment.total)}%</div>
                  </div>
                ) : (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                    {language === 'bn' ? 'মূল্যায়ন চলছে' : 'Grading'}
                  </Badge>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-3">
            {gradesData.quizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-4 rounded-xl border bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">{language === 'bn' ? quiz.title : quiz.titleEn}</div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'bn' ? quiz.subject : quiz.subjectEn} • {language === 'bn' ? quiz.date : quiz.dateEn}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{quiz.score}/{quiz.total}</div>
                  <div className="text-xs text-muted-foreground">{getScorePercentage(quiz.score, quiz.total)}%</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
