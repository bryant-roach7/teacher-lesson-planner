import { useApp } from '../context/AppContext';
import { weeks } from '../data';

const viewTitles: Record<string, { t: string; s: string }> = {
  week: { t: 'Weekly Plans', s: '' },
  month: { t: 'Month at a Glance', s: 'September 2025' },
  year: { t: 'Year Pacing Map', s: 'August 2025 – June 2026' },
  units: { t: 'Units & Subjects', s: '20 units across 5 subjects' }
};

export function Topbar() {
  const { theme, view, weekIndex, setWeekIndex, weekUnits, openAI, toggleCustomize } = useApp();
  const t = theme;
  const isWeek = view === 'week';
  const info = viewTitles[view];
  const sub = isWeek ? weekUnits : info.s;

  return (
    <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px', borderBottom: `1px solid ${t.line}`, background: t.page }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: t.fHead, fontSize: 23, lineHeight: 1.05, color: t.ink }}>{info.t}</div>
        <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>
      </div>

      {isWeek && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 6 }}>
          <button
            onClick={() => setWeekIndex(Math.max(0, weekIndex - 1))}
            style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${t.line}`, background: t.panel, color: t.ink, cursor: 'pointer', fontSize: 16, opacity: weekIndex === 0 ? 0.4 : 1 }}
          >‹</button>
          <div style={{ fontFamily: t.fBody, fontWeight: 800, fontSize: 13, color: t.ink, minWidth: 96, textAlign: 'center' }}>{weeks[weekIndex].label}</div>
          <button
            onClick={() => setWeekIndex(Math.min(weeks.length - 1, weekIndex + 1))}
            style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${t.line}`, background: t.panel, color: t.ink, cursor: 'pointer', fontSize: 16, opacity: weekIndex === weeks.length - 1 ? 0.4 : 1 }}
          >›</button>
        </div>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={toggleCustomize}
          style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', background: t.panel, border: `1px solid ${t.line}`, color: t.ink, fontFamily: t.fBody, fontWeight: 800, fontSize: 13, borderRadius: 22, padding: '9px 15px' }}
        >🎨 Customize</button>
        <button
          onClick={openAI}
          style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', background: t.accent, border: 'none', color: '#fff', fontFamily: t.fBody, fontWeight: 800, fontSize: 13, borderRadius: 22, padding: '9px 16px', boxShadow: '0 4px 14px rgba(43,179,201,.30)' }}
        >✨ Ask Planning Buddy</button>
      </div>
    </header>
  );
}
