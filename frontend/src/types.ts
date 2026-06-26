export type SubjectKey = 'literacy' | 'math' | 'science' | 'social' | 'sel';
export type ThemeKey = 'doodle' | 'cozy';
export type ViewKey = 'week' | 'month' | 'year' | 'units';

export interface Theme {
  key: ThemeKey;
  name: string;
  sub: string;
  emoji: string;
  fHead: string;
  fBody: string;
  page: string;
  panel: string;
  sidebar: string;
  banner: string;
  bannerInk: string;
  ink: string;
  inkSoft: string;
  line: string;
  accent: string;
  accentSoft: string;
  cellRadius: string;
  cellBorder: string;
  cellShadow: string;
  panelRadius: string;
}

export interface SubjectColors { bg: string; ink: string; }

export interface SubjectDef {
  name: string;
  doodle: SubjectColors;
  cozy: SubjectColors;
}

export interface LessonCell {
  t: string;
  doc?: string;
}

export interface WeekRow {
  label: string;
  subject: SubjectKey;
  cells: LessonCell[];
}

export interface Week {
  label: string;
  days: { n: string; d: string }[];
  notes: string;
  rows: WeekRow[];
}

export interface CurriculumUnit {
  name?: string;
  col: string;
  range?: string;
  lessons?: number;
  docs?: number;
  status?: 'Active' | 'Upcoming' | 'Done';
  gap?: boolean;
}

export interface CalendarEvent {
  label: string;
  type: 'holiday' | 'event' | 'season';
}

export interface AiMessage {
  role: 'user' | 'bot';
  text: string;
}
