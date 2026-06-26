import type { Theme, SubjectKey, SubjectDef, Week, CurriculumUnit, CalendarEvent } from './types';

export const themes: Record<string, Theme> = {
  doodle: { key: 'doodle', name: 'Doodle', sub: 'Stickers & marker', emoji: '🖍', fHead: "'Patrick Hand', cursive", fBody: "'Nunito', sans-serif", page: '#FFFDF6', panel: '#FFFFFF', sidebar: '#FFF8E8', banner: '#2BB3C9', bannerInk: '#FFFFFF', ink: '#594F45', inkSoft: '#9a8f81', line: '#EFE7D6', accent: '#2BB3C9', accentSoft: '#E6F8FB', cellRadius: '12px', cellBorder: '2px solid rgba(0,0,0,.12)', cellShadow: '2px 3px 0 rgba(0,0,0,.10)', panelRadius: '16px' },
  cozy: { key: 'cozy', name: 'Cozy', sub: 'Soft & cream', emoji: '☁️', fHead: "'Quicksand', sans-serif", fBody: "'Quicksand', sans-serif", page: '#FBF7F0', panel: '#FFFFFF', sidebar: '#F4EEE3', banner: '#EAF6F2', bannerInk: '#3F4A45', ink: '#5B524D', inkSoft: '#a99f93', line: '#ECE4D6', accent: '#5B8E7D', accentSoft: '#EAF6F2', cellRadius: '14px', cellBorder: '1px solid #EFE7D6', cellShadow: '0 2px 7px rgba(0,0,0,.05)', panelRadius: '20px' }
};

export const subjectDefs: Record<SubjectKey, SubjectDef> = {
  literacy: { name: 'Literacy', doodle: { bg: '#F58A8A', ink: '#4a2a2a' }, cozy: { bg: '#F4B6B6', ink: '#7a4a4a' } },
  math: { name: 'Math', doodle: { bg: '#F6C453', ink: '#4a3a1a' }, cozy: { bg: '#F4D58C', ink: '#7a5e2a' } },
  science: { name: 'Science', doodle: { bg: '#7FC8A9', ink: '#234034' }, cozy: { bg: '#AEDCC6', ink: '#2f5a47' } },
  social: { name: 'Social Studies', doodle: { bg: '#8FB8E8', ink: '#1f3450' }, cozy: { bg: '#BBD4F2', ink: '#2e4a6b' } },
  sel: { name: 'SEL', doodle: { bg: '#C3A9E8', ink: '#352450' }, cozy: { bg: '#DAC8F0', ink: '#4a3868' } }
};

export const subjectOrder: SubjectKey[] = ['literacy', 'math', 'science', 'social', 'sel'];

export const palette = [
  { bg: '#F58A8A', ink: '#4a2a2a' }, { bg: '#F6C453', ink: '#4a3a1a' }, { bg: '#F4A259', ink: '#4a2e12' },
  { bg: '#7FC8A9', ink: '#234034' }, { bg: '#9BD1C9', ink: '#1f4742' }, { bg: '#8FB8E8', ink: '#1f3450' },
  { bg: '#C3A9E8', ink: '#352450' }, { bg: '#EFA9C4', ink: '#4d2438' }
];

export const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const weeks: Week[] = [
  {
    label: 'Sep 8 – 12',
    days: [{ n: 'Mon', d: '8' }, { n: 'Tue', d: '9' }, { n: 'Wed', d: '10' }, { n: 'Thu', d: '11' }, { n: 'Fri', d: '12' }],
    notes: '📸 Picture Day Wednesday — send reminders home Monday.\n\n🔔 Fire drill Thursday 10:00.\n\n🎒 New student starts Friday.',
    rows: [
      { label: 'Morning Meeting', subject: 'sel', cells: [{ t: 'Calendar & Weather', doc: 'Morning Slides' }, { t: 'Name Game' }, { t: 'Feelings Check-in', doc: 'Feelings Chart' }, { t: 'Days of the Week' }, { t: 'Show & Share' }] },
      { label: 'Read Aloud', subject: 'literacy', cells: [{ t: 'Chicka Chicka Boom' }, { t: 'The Kissing Hand', doc: 'Discussion Qs' }, { t: 'Pete the Cat' }, { t: 'The Day You Begin' }, { t: 'Library Visit' }] },
      { label: 'Literacy', subject: 'literacy', cells: [{ t: 'Letter Mm', doc: 'Mm Worksheet' }, { t: 'Letter Ss' }, { t: 'Mm review' }, { t: 'Letter Tt', doc: 'Tt Tracing' }, { t: 'Sound Sort' }] },
      { label: 'Math', subject: 'math', cells: [{ t: 'Count to 10', doc: 'Counting Mat' }, { t: 'Count to 10' }, { t: 'Write 1–5' }, { t: 'Count objects', doc: 'Center Cards' }, { t: 'Math Games' }] },
      { label: 'Centers', subject: 'social', cells: [{ t: 'All About Me poster', doc: 'Template' }, { t: 'Family collage' }, { t: 'Block center' }, { t: 'Sensory bin' }, { t: 'Free choice' }] }
    ]
  },
  {
    label: 'Sep 15 – 19',
    days: [{ n: 'Mon', d: '15' }, { n: 'Tue', d: '16' }, { n: 'Wed', d: '17' }, { n: 'Thu', d: '18' }, { n: 'Fri', d: '19' }],
    notes: '🏫 Open House Friday 5:00 — set up the student-work display Thursday.\n\n🍎 Snack helper sign-up due.',
    rows: [
      { label: 'Morning Meeting', subject: 'sel', cells: [{ t: 'Calendar & Weather' }, { t: 'Counting Friends' }, { t: 'Feelings Check-in' }, { t: 'Pattern of the Day' }, { t: 'Show & Share' }] },
      { label: 'Read Aloud', subject: 'literacy', cells: [{ t: 'The Gruffalo' }, { t: 'Rainbow Fish', doc: 'Sharing Talk' }, { t: 'Brown Bear' }, { t: "Don't Eat Classmates" }, { t: 'Library Visit' }] },
      { label: 'Literacy', subject: 'literacy', cells: [{ t: 'Letter Aa', doc: 'Aa Worksheet' }, { t: 'Letter Pp' }, { t: 'Aa review' }, { t: 'Letter Nn', doc: 'Nn Tracing' }, { t: 'Word Building' }] },
      { label: 'Math', subject: 'math', cells: [{ t: 'Count to 15' }, { t: 'Compare Sets', doc: 'Compare Mat' }, { t: 'Write 6–10' }, { t: 'Count objects' }, { t: 'Math Games' }] },
      { label: 'Centers', subject: 'social', cells: [{ t: 'Self-portrait', doc: 'Guide' }, { t: 'Family tree' }, { t: 'Build a home' }, { t: 'Sand & water' }, { t: 'Free choice' }] }
    ]
  }
];

export const curriculum: Record<SubjectKey, CurriculumUnit[]> = {
  literacy: [{ name: 'Letters & Sounds', col: '1 / 4', range: 'Aug – Oct', lessons: 18, docs: 5, status: 'Active' }, { name: 'Decoding', col: '4 / 7', range: 'Nov – Jan', lessons: 15, docs: 3, status: 'Upcoming' }, { name: 'Sight Words', col: '7 / 9', range: 'Feb – Mar', lessons: 10, docs: 2, status: 'Upcoming' }, { name: 'Storytelling', col: '9 / 12', range: 'Apr – Jun', lessons: 12, docs: 4, status: 'Upcoming' }],
  math: [{ name: 'Counting 1–20', col: '1 / 4', range: 'Aug – Oct', lessons: 16, docs: 4, status: 'Active' }, { name: 'Shapes & Patterns', col: '4 / 6', range: 'Nov – Dec', lessons: 8, docs: 2, status: 'Upcoming' }, { name: 'Addition to 10', col: '6 / 9', range: 'Jan – Mar', lessons: 14, docs: 3, status: 'Upcoming' }, { name: 'Measurement', col: '9 / 11', range: 'Apr – May', lessons: 9, docs: 2, status: 'Upcoming' }, { gap: true, col: '11 / 12' }],
  science: [{ name: 'Five Senses', col: '1 / 3', range: 'Aug – Sep', lessons: 9, docs: 3, status: 'Active' }, { name: 'Weather & Seasons', col: '3 / 6', range: 'Oct – Dec', lessons: 12, docs: 4, status: 'Upcoming' }, { name: 'Plants & Animals', col: '6 / 9', range: 'Jan – Mar', lessons: 13, docs: 5, status: 'Upcoming' }, { name: 'My Body', col: '9 / 12', range: 'Apr – Jun', lessons: 11, docs: 3, status: 'Upcoming' }],
  social: [{ name: 'All About Me', col: '1 / 3', range: 'Aug – Sep', lessons: 8, docs: 4, status: 'Active' }, { name: 'My Family', col: '3 / 5', range: 'Oct – Nov', lessons: 9, docs: 3, status: 'Upcoming' }, { name: 'Community Helpers', col: '5 / 8', range: 'Dec – Feb', lessons: 14, docs: 6, status: 'Upcoming' }, { name: 'Maps & Globes', col: '8 / 10', range: 'Mar – Apr', lessons: 8, docs: 2, status: 'Upcoming' }, { gap: true, col: '10 / 12' }],
  sel: [{ name: 'Friendship', col: '1 / 4', range: 'Aug – Oct', lessons: 12, docs: 3, status: 'Active' }, { name: 'Big Feelings', col: '4 / 7', range: 'Nov – Jan', lessons: 12, docs: 4, status: 'Upcoming' }, { name: 'Kindness', col: '7 / 10', range: 'Feb – Apr', lessons: 11, docs: 3, status: 'Upcoming' }, { name: 'Growing Up', col: '10 / 12', range: 'May – Jun', lessons: 8, docs: 2, status: 'Upcoming' }]
};

export const monthEvents: Record<number, CalendarEvent[]> = {
  1: [{ label: 'Labor Day — No School', type: 'holiday' }],
  10: [{ label: '📸 Picture Day', type: 'event' }],
  19: [{ label: '🏫 Open House', type: 'event' }],
  22: [{ label: 'Fall begins 🍂', type: 'season' }]
};

export const cannedReplies: Record<string, string> = {
  gaps: 'I checked your year map and spotted 2 pacing gaps:\n\n• Math — June is open after "Measurement." A short "Math Review & Games" unit would round out the year nicely.\n\n• Social Studies — May & June have no unit. "Our Community Celebration" could fit beautifully.\n\nWant me to draft either one and drop it on the calendar?',
  lesson: 'Here is a 20-minute lesson for Letter Aa 🍎\n\n1. Warm-up (3m): Sing "A is for Apple."\n2. Model (5m): Trace Aa in the air, then on whiteboards.\n3. Practice (8m): Apple-stamp /a/ words — ant, apple, alligator.\n4. Center link: "Aa Worksheet" (already in your Drive).\n5. Wrap-up (4m): Friends share one /a/ word.\n\nWant me to add this to Monday\'s Literacy block?',
  folder: 'Your "All About Me" Drive folder has 6 files:\n\n• All About Me poster (template)\n• Family collage instructions\n• Self-portrait guide\n• Parent welcome letter\n• Photo checklist\n• Week 1 plans\n\nThe poster template is already linked to Monday & Tuesday centers. Want me to link the rest?',
  readaloud: 'For your Friendship unit, three favorites:\n\n• "The Kissing Hand" — comfort & belonging\n• "Stick and Stone" — helping a friend\n• "Should I Share My Ice Cream?" — sharing\n\nI can add one to Monday\'s Read Aloud and link discussion questions. Which one?'
};

export const promptItems = [
  { label: 'Find pacing gaps in my year', key: 'gaps' },
  { label: 'Make a lesson plan for Letter Aa', key: 'lesson' },
  { label: "What's in my All About Me folder?", key: 'folder' },
  { label: 'Suggest a Friendship read-aloud', key: 'readaloud' }
];
