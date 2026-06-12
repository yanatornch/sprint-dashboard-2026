// ===========================================================================
//  Profile UI — components (gamified, dual-theme)
//  Real sprint data (window.DATA) mapped into the reference's card slots,
//  with a few gamified extras. All visuals driven by CSS theme vars.
// ===========================================================================
const { useState, useEffect, useRef } = React;

/* ---------------------------------------------------------------- icons */
// minimal stroked glyphs so the chrome buttons read on both themes
function Glyph({ name, size = 20 }) {
  const s = { width: size, height: size, display: "block" };
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 2.1, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "gear": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 13a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 6.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 2.6h.05A1.7 1.7 0 0 0 10 1.05V1a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 21.4 9v.05A1.7 1.7 0 0 0 22.95 10H23a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></g></svg>
    );
    case "share": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.7 7.4-4.3M8.3 13.3l7.4 4.3"/></g></svg>
    );
    case "logout": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"/></g></svg>
    );
    case "edit": return (
      <svg viewBox="0 0 24 24" style={{ width: size, height: size }}><g {...c}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></g></svg>
    );
    case "info": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></g></svg>
    );
    case "lock": return (
      <svg viewBox="0 0 24 24" style={{ width: size, height: size }}><g {...c}><rect x="4.5" y="10.5" width="15" height="10" rx="2.4"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></g></svg>
    );
    default: return null;
  }
}

/* ---------------------------------------------------------------- header */
function ProfileHeader({ name, sub, mascots }) {
  return (
    <div className="span-2 rise" style={{ display: "flex", flexDirection: "column", gap: 18, padding: "2px 4px 4px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button className="obtn round" aria-label="Settings"><Glyph name="gear" /></button>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="obtn round" aria-label="Share"><Glyph name="share" /></button>
          <button className="obtn round" aria-label="Sign out"><Glyph name="logout" /></button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
        <div style={{ minWidth: 0 }}>
          <h1 className="figure" style={{ margin: 0, fontSize: "clamp(34px,7vw,52px)", color: "var(--ink)" }}>
            {mascots && <span style={{ marginRight: 8 }}>👋</span>}{name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
            {sub.map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ width: 2, height: 15, background: "var(--ink)", opacity: .35, borderRadius: 2 }} />}
                <span style={{ font: "800 13.5px/1 var(--display)", letterSpacing: ".6px", color: "var(--ink)" }}>{s}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <button className="obtn pill" style={{ flex: "none", marginTop: 6 }}><Glyph name="edit" size={15} /> EDIT</button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- streak */
function StreakCard({ value, mascots, delay = 0 }) {
  return (
    <div className="card pad rise" style={{ position: "relative", overflow: "hidden", animationDelay: delay + "ms" }}>
      <div className="klabel">Streak</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 6 }}>
        <div className="figure" style={{ fontSize: 52, color: "var(--ink)" }}>{value}</div>
        {mascots && (
          <div aria-hidden="true" style={{ fontSize: 46, lineHeight: 1, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.18))", transform: "rotate(6deg)" }}>📅</div>
        )}
      </div>
      <div style={{ marginTop: 8, font: "800 12.5px/1 var(--display)", letterSpacing: ".4px", color: "var(--ink-soft)" }}>
        {mascots ? "🔥 " : ""}days shipping in a row
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- mini stat */
function MiniStat({ icon, value, label }) {
  return (
    <div className="card" style={{ padding: "13px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
        <span className="figure" style={{ fontSize: 24, color: "var(--ink)" }}>{value}</span>
      </div>
      <div className="klabel" style={{ fontSize: 10.5, letterSpacing: 1.2 }}>{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- tribe */
function TribeCard({ name, mascots, delay = 0 }) {
  return (
    <div className="card dark pad rise" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 150, animationDelay: delay + "ms" }}>
      {mascots && (
        <div aria-hidden="true" style={{ position: "absolute", right: -10, bottom: -22, fontSize: 130, lineHeight: 1, color: "var(--watermark)", filter: "saturate(0)", opacity: .9, pointerEvents: "none" }}>👻</div>
      )}
      <div className="klabel on-dark" style={{ position: "relative" }}>Tribe</div>
      <div className="figure" style={{ position: "relative", fontSize: 38, color: "var(--on-dark)", marginTop: 8 }}>{name}</div>
      <div style={{ position: "relative", marginTop: 8, font: "700 12.5px/1.3 var(--font)", color: "var(--on-dark-label)" }}>
        most points shipped this cycle
      </div>
    </div>
  );
}

Object.assign(window, { Glyph, ProfileHeader, StreakCard, MiniStat, TribeCard });
