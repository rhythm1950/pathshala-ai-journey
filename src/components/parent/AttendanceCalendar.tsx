import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckCircle, XCircle, Clock } from 'lucide-react';

const attendanceData: Record<string, 'present' | 'absent' | 'late'> = {
  '2024-12-02': 'present',
  '2024-12-03': 'present',
  '2024-12-04': 'present',
  '2024-12-05': 'late',
  '2024-12-06': 'present',
  '2024-12-09': 'present',
  '2024-12-10': 'absent',
  '2024-12-11': 'present',
  '2024-12-12': 'present',
  '2024-12-13': 'present',
  '2024-12-16': 'present',
  '2024-12-17': 'present',
  '2024-12-18': 'late',
  '2024-12-19': 'present',
  '2024-12-20': 'present',
  '2024-12-23': 'present',
  '2024-12-24': 'present',
  '2024-12-25': 'present',
  '2024-12-26': 'present',
  '2024-12-27': 'present',
  '2024-12-30': 'present',
  '2024-12-31': 'present',
};

export function AttendanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = {
    present: Object.values(attendanceData).filter(v => v === 'present').length,
    absent: Object.values(attendanceData).filter(v => v === 'absent').length,
    late: Object.values(attendanceData).filter(v => v === 'late').length,
  };

  const totalDays = stats.present + stats.absent + stats.late;
  const attendanceRate = totalDays > 0 ? Math.round((stats.present / totalDays) * 100) : 0;

  const modifiers = {
    present: Object.entries(attendanceData)
      .filter(([_, status]) => status === 'present')
      .map(([date]) => new Date(date)),
    absent: Object.entries(attendanceData)
      .filter(([_, status]) => status === 'absent')
      .map(([date]) => new Date(date)),
    late: Object.entries(attendanceData)
      .filter(([_, status]) => status === 'late')
      .map(([date]) => new Date(date)),
  };

  const modifiersStyles = {
    present: {
      backgroundColor: 'hsl(var(--primary) / 0.15)',
      color: 'hsl(var(--primary))',
      fontWeight: '600',
    },
    absent: {
      backgroundColor: 'hsl(0 84% 60% / 0.15)',
      color: 'hsl(0 84% 60%)',
      fontWeight: '600',
    },
    late: {
      backgroundColor: 'hsl(45 93% 47% / 0.15)',
      color: 'hsl(45 93% 47%)',
      fontWeight: '600',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          উপস্থিতি ক্যালেন্ডার
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-xl bg-primary/10">
            <div className="text-2xl font-bold text-primary">{attendanceRate}%</div>
            <div className="text-xs text-muted-foreground">উপস্থিতি হার</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-green-500/10">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-xs text-muted-foreground">উপস্থিত</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-red-500/10">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-xs text-muted-foreground">অনুপস্থিত</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-yellow-500/10">
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <div className="text-xs text-muted-foreground">বিলম্বে</div>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-xl border"
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>উপস্থিত</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>অনুপস্থিত</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span>বিলম্বে</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
