import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Certificate {
  id: number;
  name: string;
  issueDate: string;
  grade: string;
}

interface ProfileStats {
  coursesCompleted: number;
  certificatesEarned: number;
  hoursLearned: number;
  currentStreak: number;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
}

export const exportCertificatePDF = (certificate: Certificate, studentName: string) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Background gradient effect
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 297, 210, 'F');

  // Border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);
  doc.setLineWidth(1);
  doc.rect(15, 15, 267, 180);

  // Header
  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);
  doc.text('CERTIFICATE OF ACHIEVEMENT', 148.5, 40, { align: 'center' });

  // Certificate Title
  doc.setFontSize(32);
  doc.setTextColor(30, 64, 175);
  doc.text(certificate.name, 148.5, 65, { align: 'center' });

  // Presented to
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text('This certificate is proudly presented to', 148.5, 85, { align: 'center' });

  // Student Name
  doc.setFontSize(28);
  doc.setTextColor(30, 41, 59);
  doc.text(studentName, 148.5, 105, { align: 'center' });

  // Decorative line
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.line(80, 112, 217, 112);

  // Description
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('For successfully completing the course with excellence and dedication', 148.5, 130, { align: 'center' });

  // Grade Badge
  doc.setFillColor(59, 130, 246);
  doc.roundedRect(135, 140, 27, 15, 3, 3, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`Grade: ${certificate.grade}`, 148.5, 150, { align: 'center' });

  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Issue Date: ${certificate.issueDate}`, 148.5, 170, { align: 'center' });

  // Certificate ID
  doc.setFontSize(8);
  doc.text(`Certificate ID: CERT-${certificate.id}-${Date.now()}`, 148.5, 180, { align: 'center' });

  // Save
  doc.save(`certificate-${certificate.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};

export const exportProgressReportPDF = (
  profile: ProfileData,
  stats: ProfileStats,
  achievements: Achievement[],
  certificates: Certificate[]
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('Progress Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(profile.name, 105, 30, { align: 'center' });

  // Student Info Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.text('Student Information', 14, 55);
  
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${profile.email}`, 14, 65);
  doc.text(`Phone: ${profile.phone}`, 14, 72);
  doc.text(`Location: ${profile.location}`, 14, 79);
  doc.text(`Join Date: ${profile.joinDate}`, 14, 86);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 93);

  // Statistics Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.text('Learning Statistics', 14, 110);

  autoTable(doc, {
    startY: 115,
    head: [['Metric', 'Value']],
    body: [
      ['Courses Completed', stats.coursesCompleted.toString()],
      ['Certificates Earned', stats.certificatesEarned.toString()],
      ['Hours Learned', `${stats.hoursLearned} hours`],
      ['Current Streak', `${stats.currentStreak} days`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 14, right: 14 },
  });

  // Achievements Section
  const afterStatsY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('Achievements', 14, afterStatsY);

  autoTable(doc, {
    startY: afterStatsY + 5,
    head: [['Achievement', 'Description']],
    body: achievements.map(a => [a.name, a.description]),
    theme: 'striped',
    headStyles: { fillColor: [34, 197, 94] },
    margin: { left: 14, right: 14 },
  });

  // Certificates Section
  const afterAchievementsY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text('Certificates Earned', 14, afterAchievementsY);

  autoTable(doc, {
    startY: afterAchievementsY + 5,
    head: [['Certificate', 'Issue Date', 'Grade']],
    body: certificates.map(c => [c.name, c.issueDate, c.grade]),
    theme: 'striped',
    headStyles: { fillColor: [168, 85, 247] },
    margin: { left: 14, right: 14 },
  });

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('This report was automatically generated. For verification, please contact the administration.', 105, pageHeight - 10, { align: 'center' });

  // Save
  doc.save(`progress-report-${profile.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};

export const exportGradeReportPDF = (
  childName: string,
  grades: Array<{ subject: string; grade: string; percentage: number; trend: string }>
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(168, 85, 247);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('Grade Report', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(childName, 105, 30, { align: 'center' });

  // Report Date
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 55);

  // Grades Table
  autoTable(doc, {
    startY: 65,
    head: [['Subject', 'Grade', 'Percentage', 'Trend']],
    body: grades.map(g => [g.subject, g.grade, `${g.percentage}%`, g.trend]),
    theme: 'striped',
    headStyles: { fillColor: [168, 85, 247] },
    margin: { left: 14, right: 14 },
  });

  // Calculate average
  const avgPercentage = grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length;
  const afterTableY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(`Overall Average: ${avgPercentage.toFixed(1)}%`, 14, afterTableY);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('This grade report was automatically generated from the student management system.', 105, pageHeight - 10, { align: 'center' });

  // Save
  doc.save(`grade-report-${childName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};
