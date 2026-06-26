import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ThemeKey, ViewKey, SubjectKey, AiMessage, SubjectColors } from '../types';
import { themes, subjectDefs, subjectOrder, curriculum, cannedReplies } from '../data';

interface AppState {
  themeKey: ThemeKey;
  view: ViewKey;
  weekIndex: number;
  subjectOverrides: Partial<Record<SubjectKey, SubjectColors>>;
  subjectNames: Partial<Record<SubjectKey, string>>;
  aiOpen: boolean;
  customizeOpen: boolean;
  aiMessages: AiMessage[];
  aiThinking: boolean;
  aiInput: string;
}

interface AppContextValue extends AppState {
  theme: typeof themes['doodle'];
  setTheme: (key: ThemeKey) => void;
  setView: (view: ViewKey) => void;
  setWeekIndex: (i: number) => void;
  setSubjectColor: (key: SubjectKey, colors: SubjectColors) => void;
  resetSubjectColors: () => void;
  setSubjectName: (key: SubjectKey, name: string) => void;
  openAI: () => void;
  closeAI: () => void;
  toggleCustomize: () => void;
  closeCustomize: () => void;
  setAiInput: (v: string) => void;
  sendPrompt: (text: string, key?: string | null) => void;
  colorFor: (key: SubjectKey) => SubjectColors;
  nameFor: (key: SubjectKey) => string;
  weekUnits: string;
}

const AppContext = createContext<AppContextValue | null>(null);

function loadState(): Partial<AppState> {
  try {
    const raw = localStorage.getItem('teacherPlanner');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const saved = loadState();
  const [themeKey, setThemeKey] = useState<ThemeKey>(saved.themeKey ?? 'doodle');
  const [view, setView] = useState<ViewKey>('week');
  const [weekIndex, setWeekIndex] = useState(0);
  const [subjectOverrides, setSubjectOverrides] = useState<Partial<Record<SubjectKey, SubjectColors>>>(saved.subjectOverrides ?? {});
  const [subjectNames, setSubjectNames] = useState<Partial<Record<SubjectKey, string>>>(saved.subjectNames ?? {});
  const [aiOpen, setAiOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([]);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiInput, setAiInput] = useState('');

  useEffect(() => {
    localStorage.setItem('teacherPlanner', JSON.stringify({ themeKey, subjectOverrides, subjectNames }));
  }, [themeKey, subjectOverrides, subjectNames]);

  const theme = themes[themeKey];

  const colorFor = (key: SubjectKey): SubjectColors =>
    subjectOverrides[key] ?? subjectDefs[key][themeKey];

  const nameFor = (key: SubjectKey): string =>
    subjectNames[key] ?? subjectDefs[key].name;

  const weekUnits = subjectOrder
    .map(k => { const u = curriculum[k].find(x => x.status === 'Active'); return u ? u.name! : null; })
    .filter(Boolean)
    .slice(0, 3)
    .join('  ·  ');

  let aiTimer: ReturnType<typeof setTimeout>;
  const sendPrompt = (text: string, key?: string | null) => {
    setAiMessages(prev => [...prev, { role: 'user', text }]);
    setAiThinking(true);
    setAiInput('');
    clearTimeout(aiTimer);
    aiTimer = setTimeout(() => {
      const reply = (key && cannedReplies[key]) ? cannedReplies[key] : "Happy to help! I'll pull from your Kindergarten units and linked Drive docs. Could you tell me a little more about what you'd like to plan?";
      setAiMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setAiThinking(false);
    }, 850);
  };

  const value: AppContextValue = {
    themeKey, view, weekIndex, subjectOverrides, subjectNames,
    aiOpen, customizeOpen, aiMessages, aiThinking, aiInput,
    theme, weekUnits,
    setTheme: (k) => setThemeKey(k),
    setView,
    setWeekIndex,
    setSubjectColor: (k, c) => setSubjectOverrides(prev => ({ ...prev, [k]: c })),
    resetSubjectColors: () => setSubjectOverrides({}),
    setSubjectName: (k, n) => setSubjectNames(prev => ({ ...prev, [k]: n })),
    openAI: () => { setAiOpen(true); setCustomizeOpen(false); },
    closeAI: () => setAiOpen(false),
    toggleCustomize: () => { setCustomizeOpen(prev => !prev); setAiOpen(false); },
    closeCustomize: () => setCustomizeOpen(false),
    setAiInput,
    sendPrompt,
    colorFor, nameFor,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
