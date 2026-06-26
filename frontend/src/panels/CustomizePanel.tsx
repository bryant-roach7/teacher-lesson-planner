import { useApp } from '../context/AppContext';
import { themes, subjectOrder, palette } from '../data';
import type { ThemeKey, SubjectKey } from '../types';

export function CustomizePanel() {
  const { theme, themeKey, customizeOpen, closeCustomize, setTheme, colorFor, nameFor, setSubjectColor, setSubjectName, resetSubjectColors } = useApp();
  const t = theme;

  if (!customizeOpen) return null;

  return (
    <>
      <div onClick={closeCustomize} style={{ position: 'fixed', inset: 0, background: 'rgba(40,30,20,.20)', zIndex: 40, animation: 'fadeIn .2s ease' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: 386, maxWidth: '90vw', background: t.panel, boxShadow: '-14px 0 44px rgba(0,0,0,.18)', zIndex: 50, display: 'flex', flexDirection: 'column', animation: 'slideIn .26s ease' }}>
        {/* Header */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 11, padding: '18px 20px', borderBottom: `1px solid ${t.line}` }}>
          <span style={{ fontSize: 21 }}>🎨</span>
          <div style={{ flex: 1, fontFamily: t.fHead, fontSize: 21, color: t.ink }}>Make it yours</div>
          <button onClick={closeCustomize} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20, color: t.inkSoft, lineHeight: 1 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {/* VIBE */}
          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1, color: t.inkSoft, marginBottom: 10 }}>VIBE</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {(['doodle', 'cozy'] as ThemeKey[]).map(k => {
              const th = themes[k];
              const sel = themeKey === k;
              return (
                <button
                  key={k}
                  onClick={() => setTheme(k)}
                  style={{ flex: 1, cursor: 'pointer', textAlign: 'left', background: sel ? t.accentSoft : t.page, border: sel ? `2.5px solid ${t.accent}` : `1.5px solid ${t.line}`, borderRadius: 15, padding: 14 }}
                >
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{th.emoji}</div>
                  <div style={{ fontFamily: t.fBody, fontWeight: 800, fontSize: 14, color: t.ink }}>{th.name}</div>
                  <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>{th.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Subjects & Colors */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1, color: t.inkSoft }}>SUBJECTS &amp; COLORS</div>
            <button onClick={resetSubjectColors} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 11.5, fontWeight: 800, color: t.accent }}>Reset</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {subjectOrder.map(k => {
              const cur = colorFor(k as SubjectKey);
              return (
                <div key={k}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
                    <span style={{ width: 14, height: 14, borderRadius: '50%', background: cur.bg, flexShrink: 0 }} />
                    <input
                      value={nameFor(k as SubjectKey)}
                      onChange={e => setSubjectName(k as SubjectKey, e.target.value)}
                      style={{ flex: 1, border: `1px solid ${t.line}`, borderRadius: 9, padding: '7px 10px', fontFamily: t.fBody, fontWeight: 800, fontSize: 13, color: t.ink, background: t.page, outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 23 }}>
                    {palette.map((p, i) => {
                      const selected = p.bg.toLowerCase() === cur.bg.toLowerCase();
                      return (
                        <button
                          key={i}
                          onClick={() => setSubjectColor(k as SubjectKey, { bg: p.bg, ink: p.ink })}
                          style={{ width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', background: p.bg, border: selected ? `3px solid ${t.ink}` : '2px solid #ffffff', boxShadow: '0 1px 3px rgba(0,0,0,.15)' }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
