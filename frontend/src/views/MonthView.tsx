import { useApp } from '../context/AppContext';
import { monthEvents } from '../data';

export function MonthView() {
  const { theme, themeKey, setView, setWeekIndex } = useApp();
  const t = theme;

  const evColor = (type: string) =>
    type === 'holiday' ? { bg: '#F58A8A', fg: '#4a2a2a' } :
    type === 'season' ? { bg: '#F6C453', fg: '#4a3a1a' } :
    { bg: t.accent, fg: '#ffffff' };

  const weekHighlight = themeKey === 'doodle' ? '#FFF3D6' : '#F3EEE3';

  // Sep 2025: Sep 1 = Monday → 1 leading muted day (Sun Aug 31)
  const cells: { day: number; muted?: boolean; today?: boolean; inWeek?: boolean }[] = [];
  cells.push({ day: 31, muted: true }); // Aug 31 (Sun)
  for (let d = 1; d <= 30; d++) cells.push({ day: d, today: d === 10, inWeek: d >= 8 && d <= 12 });
  // fill to 35: trailing Oct days 1-4
  [1, 2, 3, 4].forEach(d => cells.push({ day: d, muted: true }));

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8, marginBottom: 8 }}>
        {weekdays.map(w => (
          <div key={w} style={{ textAlign: 'center', fontFamily: t.fBody, fontWeight: 800, fontSize: 12, color: t.inkSoft }}>{w}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
        {cells.map((c, i) => {
          if (c.muted) {
            return (
              <div key={i} style={{ minHeight: 96, borderRadius: t.cellRadius, background: 'transparent', border: `1.5px solid transparent`, padding: '7px 9px', opacity: 0.4, cursor: 'default' }}>
                <div style={{ fontFamily: t.fBody, fontWeight: 800, fontSize: 13, color: t.inkSoft }}>{c.day}</div>
              </div>
            );
          }
          const bg = c.today ? t.accentSoft : (c.inWeek ? weekHighlight : t.panel);
          const ring = c.today ? t.accent : t.line;
          const evs = (monthEvents[c.day] || []).map(e => ({ label: e.label, ...evColor(e.type) }));
          return (
            <div
              key={i}
              onClick={() => { setView('week'); setWeekIndex(c.day! >= 15 ? 1 : 0); }}
              style={{ minHeight: 96, borderRadius: t.cellRadius, background: bg, border: `1.5px solid ${ring}`, padding: '7px 9px', display: 'flex', flexDirection: 'column', gap: 5, cursor: 'pointer' }}
            >
              <div style={{ fontFamily: t.fBody, fontWeight: 800, fontSize: 13, color: t.ink, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{c.day}</span>
                {c.today && <span style={{ fontSize: 9, fontWeight: 800, background: t.accent, color: '#fff', borderRadius: 6, padding: '1px 6px' }}>TODAY</span>}
              </div>
              {evs.map((ev, j) => (
                <div key={j} style={{ background: ev.bg, color: ev.fg, borderRadius: 7, padding: '2px 7px', fontSize: 10, fontWeight: 800, lineHeight: 1.25 }}>{ev.label}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
