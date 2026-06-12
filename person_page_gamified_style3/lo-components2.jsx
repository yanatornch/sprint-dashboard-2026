// ===========================================================================
//  Profile (Playful) — part 2: work-style spectrum, dials, dev score.
// ===========================================================================

/* ----------------------------------------------- work-style spectrum card */
function WorkStyleCard({ type, pct, leftEmoji, rightEmoji, leftLabel, rightLabel, caption, mascots, delay = 0 }) {
  return (
    <div className="card pad rise span-2" style={{ position: "relative", animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="klabel">Work Style</div>
        <span style={{ color: "var(--label)", display: "grid", placeItems: "center" }} title="Based on velocity & delivery patterns"><Glyph name="info" size={18} /></span>
      </div>
      {mascots && <span aria-hidden="true" style={{ position: "absolute", right: 22, top: 54, fontSize: 30, lineHeight: 1 }}>🎯</span>}
      <div className="figure" style={{ fontSize: 40, color: "var(--ink)", margin: "14px 0 7px", lineHeight: 1 }}>{type}</div>
      <div style={{ font: "600 13px/1.45 var(--font)", color: "var(--ink-soft)", marginBottom: 20, maxWidth: 460 }}>{caption}</div>

      {/* spectrum slider */}
      <div style={{ position: "relative", height: 52 }}>
        <div style={{ position: "absolute", top: 10, left: 0, right: 0, height: 30, borderRadius: 999, background: "var(--purple-soft)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, width: pct + "%", borderRadius: 999,
            background: "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 40%, #fff))" }} />
        </div>
        {mascots && <>
          <div aria-hidden="true" style={{ position: "absolute", top: 6, left: 9, fontSize: 26, lineHeight: 1, zIndex: 2 }}>{leftEmoji}</div>
          <div aria-hidden="true" style={{ position: "absolute", top: 6, right: 9, fontSize: 26, lineHeight: 1, zIndex: 2 }}>{rightEmoji}</div>
        </>}
        {/* knob */}
        <div style={{ position: "absolute", top: 1, left: `calc(${pct}% - 24px)`, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "4px solid var(--accent)", boxShadow: "0 6px 14px rgba(96,67,170,.3)", display: "grid", placeItems: "center", zIndex: 3 }}>
          <span style={{ font: "600 13px/1 var(--display)", color: "var(--purple-deep)" }}>{pct}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, font: "600 11px/1 var(--display)", letterSpacing: 1, textTransform: "uppercase", color: "var(--label)" }}>
        <span>{leftLabel}</span><span>{rightLabel}</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- circular dial */
function Dial({ value, label, color, delay = 0 }) {
  const R = 22, C = 2 * Math.PI * R;
  return (
    <div className="card rise" style={{ padding: "15px 16px", display: "flex", alignItems: "center", gap: 13,
      boxShadow: "none", border: "2px solid var(--purple-soft)", animationDelay: delay + "ms" }}>
      <div style={{ position: "relative", width: 52, height: 52, flex: "none" }}>
        <svg viewBox="0 0 54 54" style={{ width: 52, height: 52, transform: "rotate(-90deg)" }}>
          <circle cx="27" cy="27" r={R} fill="none" stroke="var(--purple-soft)" strokeWidth="6.5" />
          <circle cx="27" cy="27" r={R} fill="none" stroke={color} strokeWidth="6.5" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C - (C * value) / 100}
            style={{ transition: "stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)" }} />
        </svg>
        <span className="figure" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 15, color: "var(--ink)" }}>{value}</span>
      </div>
      <span className="figure" style={{ fontSize: 17, color: "var(--ink)" }}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------ dev score + competency */
function DevScoreCard({ levelIndex, levels, levelLabel, tierColor, dials, mascots, delay = 0 }) {
  const n = levels.length;
  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="klabel">Dev Score</div>
        <button className="cta" style={{ padding: "10px 16px" }}>Improve</button>
      </div>

      {/* competency track on a soft tinted panel */}
      <div style={{ background: "linear-gradient(150deg, #f3eefe, #ece4fc)", borderRadius: 20, padding: "24px 22px 18px", position: "relative", overflow: "hidden" }}>
        {mascots && <div aria-hidden="true" style={{ position: "absolute", right: 14, top: 10, fontSize: 26, lineHeight: 1 }}>🏆</div>}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <span className="dpill" style={{ background: tierColor, color: "#fff", fontSize: 13, padding: "9px 17px", boxShadow: `0 8px 18px color-mix(in srgb, ${tierColor} 45%, transparent)` }}>{levelLabel}</span>
        </div>
        <div style={{ position: "relative", height: 26, margin: "0 6px" }}>
          <div style={{ position: "absolute", top: 11, left: 0, right: 0, height: 5, background: "rgba(124,92,242,.16)", borderRadius: 999 }} />
          <div style={{ position: "absolute", top: 11, left: 0, height: 5, width: `${(levelIndex / (n - 1)) * 100}%`, background: "var(--purple)", borderRadius: 999 }} />
          {levels.map((_, i) => {
            const left = `${(i / (n - 1)) * 100}%`;
            const done = i < levelIndex;
            const cur = i === levelIndex;
            return (
              <div key={i} style={{ position: "absolute", top: cur ? 1 : 5, left, transform: "translateX(-50%)",
                width: cur ? 24 : 16, height: cur ? 24 : 16, borderRadius: "50%",
                background: cur ? "#fff" : done ? "var(--purple)" : "rgba(124,92,242,.22)",
                border: cur ? "5px solid var(--purple)" : "none",
                boxShadow: cur ? "0 4px 10px rgba(96,67,170,.3)" : "none", zIndex: 2 }} />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, font: "600 11px/1 var(--display)", letterSpacing: 1, textTransform: "uppercase", color: "var(--label)" }}>
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
