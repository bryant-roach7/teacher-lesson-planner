import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { promptItems } from '../data';

export function PlanningBuddy() {
  const { theme, aiOpen, closeAI, aiMessages, aiThinking, aiInput, setAiInput, sendPrompt } = useApp();
  const t = theme;
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [aiMessages, aiThinking]);

  if (!aiOpen) return null;

  const isEmpty = aiMessages.length === 0;

  return (
    <>
      <div onClick={closeAI} style={{ position: 'fixed', inset: 0, background: 'rgba(40,30,20,.20)', zIndex: 40, animation: 'fadeIn .2s ease' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: 386, maxWidth: '90vw', background: t.panel, boxShadow: '-14px 0 44px rgba(0,0,0,.18)', zIndex: 50, display: 'flex', flexDirection: 'column', animation: 'slideIn .26s ease' }}>
        {/* Header */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 11, padding: '18px 20px', borderBottom: `1px solid ${t.line}` }}>
          <span style={{ width: 38, height: 38, borderRadius: '50%', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>✨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: t.fBody, fontWeight: 800, fontSize: 15, color: t.ink }}>Planning Buddy</div>
            <div style={{ fontSize: 11.5, color: t.inkSoft }}>Knows your units &amp; Drive docs</div>
          </div>
          <button onClick={closeAI} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20, color: t.inkSoft, lineHeight: 1 }}>✕</button>
        </div>

        {/* Messages */}
        <div ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 8px' }}>
          {isEmpty && (
            <>
              <div style={{ background: t.accentSoft, borderRadius: 14, padding: '14px 15px', fontSize: 13, lineHeight: 1.5, color: t.ink, marginBottom: 16 }}>
                Hi Mrs. Richard! 👋 I can draft lesson plans, find pacing gaps, and pull from your linked Google Drive docs. What would you like to start with?
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1, color: t.inkSoft, margin: '0 2px 8px' }}>TRY ASKING</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {promptItems.map(p => (
                  <button
                    key={p.key}
                    onClick={() => sendPrompt(p.label, p.key)}
                    style={{ textAlign: 'left', cursor: 'pointer', background: t.page, border: `1px solid ${t.line}`, borderRadius: 12, padding: '11px 13px', fontFamily: t.fBody, fontWeight: 700, fontSize: 12.5, color: t.ink }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {aiMessages.map((m, i) => {
            const isUser = m.role === 'user';
            return (
              <div key={i} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 11 }}>
                <div style={{ maxWidth: '82%', whiteSpace: 'pre-line', fontSize: 13, lineHeight: 1.5, padding: '11px 14px', borderRadius: 15, background: isUser ? t.accent : t.accentSoft, color: isUser ? '#ffffff' : t.ink, fontWeight: isUser ? 700 : 600 }}>
                  {m.text}
                </div>
              </div>
            );
          })}

          {aiThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 4px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.accent, display: 'inline-block', animation: 'dotpulse 1.1s infinite' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.accent, display: 'inline-block', animation: 'dotpulse 1.1s .18s infinite' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.accent, display: 'inline-block', animation: 'dotpulse 1.1s .36s infinite' }} />
            </div>
          )}
        </div>

        {/* Composer */}
        <div style={{ flexShrink: 0, padding: 14, borderTop: `1px solid ${t.line}`, display: 'flex', gap: 8 }}>
          <input
            value={aiInput}
            onChange={e => setAiInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const v = aiInput.trim(); if (v) sendPrompt(v, null); } }}
            placeholder="Ask anything…"
            style={{ flex: 1, border: `1px solid ${t.line}`, borderRadius: 22, padding: '10px 15px', fontFamily: t.fBody, fontSize: 13, outline: 'none', color: t.ink, background: t.page }}
          />
          <button
            onClick={() => { const v = aiInput.trim(); if (v) sendPrompt(v, null); }}
            style={{ background: t.accent, color: '#fff', border: 'none', borderRadius: 22, padding: '0 17px', fontFamily: t.fBody, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}
          >Send</button>
        </div>
      </div>
    </>
  );
}
