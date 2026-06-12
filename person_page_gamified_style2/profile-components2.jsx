// ===========================================================================
//  Profile UI — components part 2: spectrum, dials, dev score, status,
//  trend chart, rewards journey.
// ===========================================================================

/* ----------------------------------------------- work-style spectrum card */
// reference's "Personality Type" → a dev work-style on a Planner↔Shipper axis
function WorkStyleCard({ type, pct, leftEmoji, rightEmoji, leftLabel, rightLabel, caption, mascots, delay = 0 }) {
  return (
    <div className="card dark pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="klabel on-dark">Work Style</div>
        <span style={{ color: "var(--on-dark-label)", display: "grid", placeItems: "center" }} title="Based on velocity & delivery patterns"><Glyph name="info" size={20} /></span>
      </div>
      <div className="figure" style={{ fontSize: 40, color: "var(--on-dark)", margin: "8px 0 4px" }}>{type}</div>
      <div style={{ font: "700 13px/1.4 var(--font)", color: "var(--on-dark-label)", marginBottom: 18, maxWidth: 460 }}>{caption}</div>

      {/* spectrum slider */}
      <div style={{ position: "relative", height: 56 }}>
        <div style={{ position: "absolute", top: 12, left: 0, right: 0, height: 32, borderRadius: 999, background: "var(--spectrum-track)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, width: pct + "%", background: "var(--spectrum)", borderRadius: 999 }} />
        </div>
        {mascots && (
          <>
            <div aria-hidden="true" style={{ position: "absolute", top: 6, left: 8, fontSize: 30, lineHeight: 1, zIndex: 2 }}>{leftEmoji}</div>
            <div aria-hidden="true" style={{ position: "absolute", top: 6, right: 8, fontSize: 30, lineHeight: 1, zIndex: 2 }}>{rightEmoji}</div>
          </>
        )}
        {/* knob */}
        <div style={{ position: "absolute", top: 4, left: `calc(${pct}% - 24px)`, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "3px solid var(--card-dark)", boxShadow: "0 4px 12px rgba(0,0,0,.35)", display: "grid", placeItems: "center", zIndex: 3 }}>
          <span style={{ font: "800 13px/1 var(--display)", color: "#15110a" }}>{pct}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, font: "800 11px/1 var(--display)", letterSpacing: 1, textTransform: "uppercase", color: "var(--on-dark-label)" }}>
        <span>{leftLabel}</span><span>{rightLabel}</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- circular dial */
function Dial({ value, label, color, delay = 0 }) {
  const R = 22, C = 2 * Math.PI * R;
  return (
    <div className="card" style={{ padding: "14px 15px", display: "flex", alignItems: "center", gap: 13 }}>
      <div style={{ position: "relative", width: 54, height: 54, flex: "none" }}>
        <svg viewBox="0 0 54 54" style={{ width: 54, height: 54, transform: "rotate(-90deg)" }}>
          <circle cx="27" cy="27" r={R} fill="none" stroke="var(--ring-bg)" strokeWidth="6" />
          <circle cx="27" cy="27" r={R} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C - (C * value) / 100}
            style={{ transition: "stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)" }} />
        </svg>
        <span className="figure" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 16, color: "var(--ink)" }}>{value}</span>
      </div>
      <span className="figure" style={{ fontSize: 18, color: "var(--ink)" }}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------ dev score + competency */
function DevScoreCard({ levelIndex, levels, levelLabel, dials, mascots, delay = 0 }) {
  const n = levels.length;
  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div className="klabel">Dev Score</div>
        <button className="obtn pill" style={{ padding: "9px 14px" }}><Glyph name="lock" size={14} /> IMPROVE</button>
      </div>

      {/* competency track */}
      <div style={{ background: "var(--track)", borderRadius: 20, padding: "26px 22px 18px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <span className="dpill" style={{ background: "var(--track-ink)", color: "#15110a", fontSize: 13, padding: "8px 16px" }}>{levelLabel}</span>
        </div>
        <div style={{ position: "relative", height: 26, margin: "0 6px" }}>
          {/* base line */}
          <div style={{ position: "absolute", top: 11, left: 0, right: 0, height: 4, background: "rgba(255,255,255,.14)", borderRadius: 999 }} />
          {/* filled line */}
          <div style={{ position: "absolute", top: 11, left: 0, height: 4, width: `${(levelIndex / (n - 1)) * 100}%`, background: "var(--track-ink)", borderRadius: 999 }} />
          {/* nodes */}
          {levels.map((_, i) => {
            const left = `${(i / (n - 1)) * 100}%`;
            const done = i < levelIndex;
            const cur = i === levelIndex;
            return (
              <div key={i} style={{ position: "absolute", top: cur ? 3 : 5, left, transform: "translateX(-50%)",
                width: cur ? 20 : 16, height: cur ? 20 : 16, borderRadius: "50%",
                background: cur ? "var(--track)" : done ? "var(--track-ink)" : "#3a3220",
                border: cur ? "3px solid var(--track-ink)" : "none", zIndex: 2 }} />
            );
          })}
          {mascots && (
            <div aria-hidden="true" style={{ position: "absolute", top: -8, right: -10, fontSize: 26, lineHeight: 1, zIndex: 3 }}>🏆</div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, font: "800 11px/1 var(--display)", letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
          <span>{levels[0]}</span><span>{levels[n - 1]}</span>
        </div>
      </div>

      {/* dials 2×2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        {dials.map((d, i) => <Dial key={d.label} {...d} delay={i * 90} />)}
      </div>
    </div>
  );
}

Object.assign(window, { WorkStyleCard, Dial, DevScoreCard });
