import { useApp } from '../context/AppContext';
import { weeks } from '../data';

export function WeekView() {
  const { theme, themeKey, weekIndex, colorFor } = useApp();
  const t = theme;
  const wk = weeks[weekIndex];

  return (
    <div>
      <div style={{ position: 'relative', background: t.banner, color: t.bannerInk, borderRadius: t.panelRadius, padding: '20px 26px', marginBottom: 22, overflow: 'visible', boxShadow: t.cellShadow }}>
        <div style={{ fontFamily: t.fHead, fontSize: 31, lineHeight: 1 }}>My Kindergarten Year</div>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 8, opacity: .92 }}>
          This week → <span>Letters &amp; Sounds  ·  Counting 1–20  ·  Friendship</span>
        </div>
        {themeKey === 'doodle' && (
          <>
            <span style={{ position: 'absolute', top: -14, right: 26, fontSize: 32, transform: 'rotate(13deg)' }}>🍎</span>
            <span style={{ position: 'absolute', bottom: -12, right: 120, fontSize: 23, transform: 'rotate(-12deg)' }}>✏️</span>
            <span style={{ position: 'absolute', top: 16, right: 84, fontSize: 18 }}>⭐</span>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Day headers */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 128, flexShrink: 0 }} />
            {wk.days.map(d => (
              <div key={d.d} style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                <div style={{ fontFamily: t.fHead, fontSize: 17, color: t.ink, lineHeight: 1 }}>{d.n}</div>
                <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 3 }}>Sep {d.d}</div>
              </div>
            ))}
          </div>

          {/* Lesson rows */}
          {wk.rows.map(row => {
            const c = colorFor(row.subject);
            return (
              <div key={row.label} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'stretch' }}>
                <div style={{ width: 128, flexShrink: 0, display: 'flex', alignItems: 'center', fontFamily: t.fBody, fontWeight: 800, fontSize: 13, color: t.ink }}>{row.label}</div>
                {row.cells.map((cell, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, minWidth: 0, background: c.bg, color: c.ink, borderRadius: t.cellRadius, border: t.cellBorder, boxShadow: t.cellShadow, padding: '8px 9px', display: 'flex', flexDirection: 'column', gap: 5, minHeight: 56 }}
                  >
                    <div style={{ fontFamily: t.fBody, fontWeight: 700, fontSize: 12, lineHeight: 1.18 }}>{cell.t}</div>
                    {cell.doc && (
                      <span style={{ alignSelf: 'flex-start', maxWidth: '100%', fontSize: 10, fontWeight: 800, background: 'rgba(255,255,255,.55)', borderRadius: 7, padding: '2px 6px', display: 'inline-flex', alignItems: 'center', gap: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        📄 {cell.doc}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Notes panel */}
        <div style={{ width: 212, flexShrink: 0, background: t.panel, border: t.cellBorder, boxShadow: t.cellShadow, borderRadius: t.cellRadius, padding: 16 }}>
          <div style={{ fontFamily: t.fHead, fontSize: 19, color: t.accent, marginBottom: 9 }}>Notes ✎</div>
          <div style={{ whiteSpace: 'pre-line', fontSize: 12.5, lineHeight: 1.55, color: t.ink }}>{wk.notes}</div>
        </div>
      </div>
    </div>
  );
}
