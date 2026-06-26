import { useApp } from '../context/AppContext';
import { curriculum, subjectOrder } from '../data';

export function UnitsView() {
  const { theme, colorFor, nameFor } = useApp();
  const t = theme;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {subjectOrder.map(k => {
        const c = colorFor(k);
        const cards = curriculum[k].filter(u => !u.gap);
        return (
          <div key={k}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c.bg, color: c.ink, borderRadius: t.cellRadius, border: t.cellBorder, padding: '7px 15px', fontFamily: t.fBody, fontWeight: 800, fontSize: 14, marginBottom: 12 }}>
              {nameFor(k)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(216px, 1fr))', gap: 12 }}>
              {cards.map(card => {
                const isActive = card.status === 'Active';
                const stBg = isActive ? t.accent : t.accentSoft;
                const stFg = isActive ? '#ffffff' : t.accent;
                return (
                  <div key={card.name} style={{ background: t.panel, border: t.cellBorder, boxShadow: t.cellShadow, borderRadius: t.cellRadius, padding: 15 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 7 }}>
                      <div style={{ fontFamily: t.fBody, fontWeight: 800, fontSize: 14, color: t.ink, lineHeight: 1.2 }}>{card.name}</div>
                      <span style={{ flexShrink: 0, background: stBg, color: stFg, borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 800 }}>{card.status}</span>
                    </div>
                    <div style={{ fontSize: 12, color: t.inkSoft, marginBottom: 11 }}>{card.range}</div>
                    <div style={{ display: 'flex', gap: 13, fontSize: 12, color: t.ink, fontWeight: 700 }}>
                      <span>📘 {card.lessons} lessons</span>
                      <span>📄 {card.docs} docs</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
