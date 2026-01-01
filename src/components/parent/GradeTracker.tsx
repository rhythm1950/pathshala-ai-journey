import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Calendar, Award, Download } from 'lucide-react';
import { exportGradeReportPDF } from '@/lib/pdfExport';
import { toast } from '@/hooks/use-toast';

const gradesData = {
  exams: [
    { id: 1, name: 'প্রথম সাময়িক পরীক্ষা', date: 'মার্চ ২০২৪', subjects: [
      { name: 'গণিত', marks: 85, total: 100, grade: 'A' },
      { name: 'বাংলা', marks: 78, total: 100, grade: 'B+' },
      { name: 'ইংরেজি', marks: 82, total: 100, grade: 'A-' },
      { name: 'বিজ্ঞান', marks: 75, total: 100, grade: 'B+' },
      { name: 'সমাজ বিজ্ঞান', marks: 88, total: 100, grade: 'A' },
    ]},
    { id: 2, name: 'দ্বিতীয় সাময়িক পরীক্ষা', date: 'জুন ২০২৪', subjects: [
      { name: 'গণিত', marks: 90, total: 100, grade: 'A+' },
      { name: 'বাংলা', marks: 80, total: 100, grade: 'A-' },
      { name: 'ইংরেজি', marks: 85, total: 100, grade: 'A' },
      { name: 'বিজ্ঞান', marks: 72, total: 100, grade: 'B' },
      { name: 'সমাজ বিজ্ঞান', marks: 85, total: 100, grade: 'A' },
    ]},
  ],
  assignments: [
    { id: 1, subject: 'গণিত', title: 'বীজগণিত অনুশীলন', submittedDate: '১৫ ডিসেম্বর', marks: 18, total: 20, status: 'graded' },
    { id: 2, subject: 'বাংলা', title: 'রচনা লেখা', submittedDate: '১৪ ডিসেম্বর', marks: 22, total: 25, status: 'graded' },
    { id: 3, subject: 'ইংরেজি', title: 'Essay Writing', submittedDate: '১৬ ডিসেম্বর', marks: null, total: 20, status: 'pending' },
    { id: 4, subject: 'বিজ্ঞান', title: 'ল্যাব রিপোর্ট', submittedDate: '১৩ ডিসেম্বর', marks: 28, total: 30, status: 'graded' },
  ],
  quizzes: [
    { id: 1, subject: 'গণিত', title: 'সাপ্তাহিক কুইজ ১২', date: '২০ ডিসেম্বর', score: 9, total: 10 },
    { id: 2, subject: 'বিজ্ঞান', title: 'অধ্যায় ৫ কুইজ', date: '১৯ ডিসেম্বর', score: 8, total: 10 },
    { id: 3, subject: 'ইংরেজি', title: 'Vocabulary Test', date: '১৮ ডিসেম্বর', score: 7, total: 10 },
    { id: 4, subject: 'বাংলা', title: 'ব্যাকরণ কুইজ', date: '১৭ ডিসেম্বর', score: 10, total: 10 },
  ],
};

export function GradeTracker() {
  const [selectedExam, setSelectedExam] = useState(gradesData.exams[1].id.toString());

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (grade.startsWith('B')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    if (grade.startsWith('C')) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-red-500/10 text-red-600 border-red-500/20';
  };

  const getScorePercentage = (marks: number, total: number) => {
    return Math.round((marks / total) * 100);
  };

  const selectedExamData = gradesData.exams.find(e => e.id.toString() === selectedExam);
  const totalMarks = selectedExamData?.subjects.reduce((acc, s) => acc + s.marks, 0) || 0;
  const totalPossible = selectedExamData?.subjects.reduce((acc, s) => acc + s.total, 0) || 0;

  const handleExportGrades = () => {
    if (!selectedExamData) return;
    
    const grades = selectedExamData.subjects.map(s => ({
      subject: s.name,
      grade: s.grade,
      percentage: Math.round((s.marks / s.total) * 100),
      trend: s.marks >= 80 ? '↑ Improving' : s.marks >= 60 ? '→ Stable' : '↓ Needs Attention'
    }));
    
    exportGradeReportPDF('সারা', grades);
    toast({
      title: "গ্রেড রিপোর্ট ডাউনলোড হচ্ছে",
      description: "গ্রেড রিপোর্ট PDF হিসেবে ডাউনলোড হচ্ছে।",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          গ্রেড ট্র্যাকার
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleExportGrades}>
          <Download className="w-4 h-4 mr-2" />
          রিপোর্ট ডাউনলোড
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exams" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="exams">পরীক্ষা</TabsTrigger>
            <TabsTrigger value="assignments">অ্যাসাইনমেন্ট</TabsTrigger>
            <TabsTrigger value="quizzes">কুইজ</TabsTrigger>
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
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {totalMarks}/{totalPossible}
                </div>
                <p className="text-sm text-muted-foreground">
                  {getScorePercentage(totalMarks, totalPossible)}% গড়
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedExamData?.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {subject.marks}/{subject.total} নম্বর
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getGradeColor(subject.grade)}>
                    {subject.grade}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-3">
            {gradesData.assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-4 rounded-xl border bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {assignment.subject} • {assignment.submittedDate}
                    </div>
                  </div>
                </div>
                {assignment.status === 'graded' ? (
                  <div className="text-right">
                    <div className="font-semibold text-primary">
                      {assignment.marks}/{assignment.total}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getScorePercentage(assignment.marks!, assignment.total)}%
                    </div>
                  </div>
                ) : (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                    মূল্যায়ন চলছে
                  </Badge>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-3">
            {gradesData.quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 rounded-xl border bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">{quiz.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {quiz.subject} • {quiz.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">
                    {quiz.score}/{quiz.total}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getScorePercentage(quiz.score, quiz.total)}%
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
