import { useApp } from '../context/AppContext';
import { curriculum, months, subjectOrder } from '../data';

export function YearView() {
  const { theme, colorFor, nameFor, openAI } = useApp();
  const t = theme;

  return (
    <div>
      {/* Gap alert */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.panel, border: t.cellBorder, boxShadow: t.cellShadow, borderRadius: t.cellRadius, padding: '13px 18px', marginBottom: 20 }}>
        <span style={{ fontSize: 19 }}>⚠️</span>
        <div style={{ fontSize: 13, color: t.ink, fontWeight: 700 }}>
          2 pacing gaps this year — <strong>Math</strong> (June) and <strong>Social Studies</strong> (May–June).
        </div>
        <button
          onClick={openAI}
          style={{ marginLeft: 'auto', cursor: 'pointer', background: t.accent, border: 'none', color: '#fff', fontFamily: t.fBody, fontWeight: 800, fontSize: 12.5, borderRadius: 20, padding: '8px 15px', whiteSpace: 'nowrap' }}
        >✨ Ask Buddy to fix →</button>
      </div>

      {/* Month headers */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 120, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(11,1fr)', gap: 5 }}>
          {months.map(m => (
            <div key={m} style={{ textAlign: 'center', fontFamily: t.fHead, fontSize: 14, color: t.inkSoft }}>{m}</div>
          ))}
        </div>
      </div>

      {/* Pacing rows */}
      {subjectOrder.map(k => {
        const c = colorFor(k);
        const units = curriculum[k];
        return (
          <div key={k} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ width: 120, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, fontFamily: t.fBody, fontWeight: 800, fontSize: 13, color: t.ink }}>
              <span style={{ width: 13, height: 13, borderRadius: '50%', background: c.bg, flexShrink: 0 }} />
              {nameFor(k)}
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(11,1fr)', gap: 5 }}>
              {units.map((u, i) => u.gap ? (
                <div key={i} style={{ gridColumn: u.col, gridRow: 1, border: '2px dashed #E2675F', borderRadius: 11, textAlign: 'center', fontWeight: 800, fontSize: 10, color: '#C8453C', padding: '9px 2px', lineHeight: 1 }}>⚠ gap</div>
              ) : (
                <div key={i} style={{ gridColumn: u.col, gridRow: 1, background: c.bg, color: c.ink, borderRadius: t.cellRadius, border: t.cellBorder, boxShadow: t.cellShadow, padding: '9px 11px', fontFamily: t.fBody, fontWeight: 700, fontSize: 11.5, lineHeight: 1.12 }}>{u.name}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
