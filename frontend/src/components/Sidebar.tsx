import { useApp } from '../context/AppContext';
import type { ViewKey, ThemeKey } from '../types';

const navDefs: { key: ViewKey; label: string; icon: string }[] = [
  { key: 'week', label: 'Calendar', icon: '📅' },
  { key: 'month', label: 'Month', icon: '🗓️' },
  { key: 'year', label: 'Year Map', icon: '🧭' },
  { key: 'units', label: 'Units & Subjects', icon: '🧩' }
];

export function Sidebar() {
  const { theme, view, setView, themeKey, setTheme } = useApp();
  const t = theme;

  return (
    <aside style={{ width: 238, flexShrink: 0, background: t.sidebar, borderRight: `1px solid ${t.line}`, display: 'flex', flexDirection: 'column', padding: '22px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 26, padding: '0 4px' }}>
        <span style={{ width: 40, height: 40, borderRadius: 13, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21 }}>🍎</span>
        <div>
          <div style={{ fontFamily: t.fHead, fontSize: 20, lineHeight: 1, color: t.ink }}>Teacher Planner</div>
          <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4, letterSpacing: '.3px' }}>2025 – 2026</div>
        </div>
      </div>

      {navDefs.map(it => {
        const active = view === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setView(it.key)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', background: active ? t.accent : 'transparent', color: active ? '#ffffff' : t.ink, fontWeight: active ? 800 : 600, fontFamily: t.fBody, fontSize: 14, borderRadius: 12, padding: '11px 13px', marginBottom: 4 }}
          >
            <span style={{ fontSize: 17 }}>{it.icon}</span>{it.label}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: t.inkSoft, letterSpacing: 1, margin: '0 4px 8px' }}>VIBE</div>
        <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
          {([{ key: 'doodle', label: '🖍 Doodle' }, { key: 'cozy', label: '☁️ Cozy' }] as { key: ThemeKey; label: string }[]).map(b => {
            const sel = themeKey === b.key;
            return (
              <button
                key={b.key}
                onClick={() => setTheme(b.key)}
                style={{ flex: 1, cursor: 'pointer', background: sel ? t.accentSoft : 'transparent', border: sel ? `2px solid ${t.accent}` : `1px solid ${t.line}`, color: t.ink, fontFamily: t.fBody, fontWeight: 800, fontSize: 12, borderRadius: 11, padding: '9px 4px' }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: t.panel, borderRadius: 13, padding: '10px 11px', border: `1px solid ${t.line}` }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: t.accentSoft, color: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>MR</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mrs. Richard</div>
            <div style={{ fontSize: 11, color: t.inkSoft }}>Kindergarten</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
