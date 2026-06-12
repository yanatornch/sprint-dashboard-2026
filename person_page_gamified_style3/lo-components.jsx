// ===========================================================================
//  Profile (Playful) — part 1: icons, header, hero illustration, stat tiles,
//  streak, mini-stats, tribe. Light lavender theme inspired by the reference.
// ===========================================================================
const { useState, useEffect, useRef } = React;

/* ---------------------------------------------------------------- icons */
function Glyph({ name, size = 20 }) {
  const s = { width: size, height: size, display: "block" };
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 2.1, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "gear": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 13a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 6.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 2.6h.05A1.7 1.7 0 0 0 10 1.05V1a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 21.4 9v.05A1.7 1.7 0 0 0 22.95 10H23a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></g></svg>
    );
    case "bell": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></g></svg>
    );
    case "share": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.7 7.4-4.3M8.3 13.3l7.4 4.3"/></g></svg>
    );
    case "edit": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></g></svg>
    );
    case "info": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></g></svg>
    );
    case "arrow": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="M5 12h14M13 6l6 6-6 6"/></g></svg>
    );
    case "chevron": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="m9 6 6 6-6 6"/></g></svg>
    );
    case "home": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="M3 11l9-8 9 8M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></g></svg>
    );
    case "compass": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></g></svg>
    );
    case "gift": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8M2 8h20v4H2zM12 8v13M12 8S10.5 3 8 3a2 2 0 0 0 0 5M12 8s1.5-5 4-5a2 2 0 0 1 0 5"/></g></svg>
    );
    case "user": return (
      <svg viewBox="0 0 24 24" style={s}><g {...c}><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></g></svg>
    );
    default: return null;
  }
}

/* tiny CSS sparkle (4-point star) */
function Spark({ top, left, right, bottom, size = 16, color = "#fff", delay = 0, op = .9 }) {
  return (
    <span className="spark" style={{ top, left, right, bottom, width: size, height: size, animationDelay: delay + "ms" }}>
      <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", display: "block", opacity: op }}>
        <path d="M12 0c.7 6 5.3 10.6 12 12-6.7 1.4-11.3 6-12 12-.7-6-5.3-10.6-12-12C6.7 10.6 11.3 6 12 0Z" fill={color} />
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------------- header */
function ProfileHeader({ name, mascots }) {
  return (
    <div className="span-2 rise" style={{ display: "flex", flexDirection: "column", gap: 18, padding: "2px 4px 2px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
          {/* avatar */}
          <div style={{ width: 52, height: 52, borderRadius: "50%", flex: "none", display: "grid", placeItems: "center",
            background: "linear-gradient(145deg, var(--purple), var(--purple-deep))",
            boxShadow: "0 8px 18px color-mix(in srgb, var(--purple) 45%, transparent)", fontSize: 27, position: "relative", overflow: "hidden" }}>
            <span aria-hidden="true" style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.2))" }}>{mascots ? "🦉" : "🙂"}</span>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ font: "600 19px/1.05 var(--display)", color: "var(--ink)", whiteSpace: "nowrap" }}>
              {`Hey ${name}!`}{mascots && <span aria-hidden="true"> 👋</span>}
            </div>
            <div style={{ font: "600 12.5px/1.2 var(--font)", color: "var(--ink-soft)", marginTop: 3 }}>Keep shipping — you're doing great</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flex: "none" }}>
          <button className="obtn round" aria-label="Notifications"><Glyph name="bell" /></button>
          <button className="obtn round" aria-label="Settings"><Glyph name="gear" /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- hero illustration */
// The signature reference banner: soft purple scene with a mascot, plant,
// sparkles + the headline figure. Carries name / role / tier.
function HeroCard({ name, role, sprintsActive, sprintsTotal, tierName, tierColor, mascots, delay = 0 }) {
  return (
    <div className="card rise span-2" style={{ position: "relative", overflow: "hidden", animationDelay: delay + "ms",
      background: "linear-gradient(150deg, #b9a6f4 0%, #9f86ee 46%, #8c70ea 100%)", color: "#fff", padding: "24px 24px 22px", minHeight: 196 }}>

      {/* soft decorative blobs */}
      <div aria-hidden="true" style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", right: -70, top: -90, background: "rgba(255,255,255,.16)" }} />
      <div aria-hidden="true" style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", left: -50, bottom: -60, background: "rgba(255,255,255,.10)" }} />
      {mascots && <>
        <Spark top={22} left={24} size={15} delay={0} />
        <Spark top={64} left={150} size={11} delay={500} op={.8} />
        <Spark top={36} right={120} size={13} delay={900} />
        <Spark bottom={30} right={180} size={10} delay={300} op={.7} />
      </>}

      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.22)", borderRadius: 999, padding: "6px 12px", font: "600 12px/1 var(--display)", letterSpacing: ".4px", backdropFilter: "blur(4px)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: tierColor, boxShadow: "0 0 0 3px rgba(255,255,255,.3)" }} />
            {tierName} Tier
          </div>
          <h1 className="figure" style={{ margin: "14px 0 0", fontSize: "clamp(36px,7vw,54px)", color: "#fff", textShadow: "0 3px 10px rgba(60,40,120,.25)" }}>{name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 9, flexWrap: "wrap", font: "600 12.5px/1 var(--display)", letterSpacing: ".5px", color: "rgba(255,255,255,.92)" }}>
            <span>{role.toUpperCase()}</span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(255,255,255,.6)" }} />
            <span>{sprintsActive}/{sprintsTotal} SPRINTS</span>
          </div>
        </div>

        {/* mascot scene */}
        {mascots && (
          <div aria-hidden="true" style={{ position: "relative", flex: "none", width: 124, alignSelf: "flex-end" }}>
            <div style={{ fontSize: 78, lineHeight: 1, filter: "drop-shadow(0 8px 12px rgba(50,30,110,.28))", transform: "rotate(-4deg)" }}>🦉</div>
            <div style={{ position: "absolute", left: -18, bottom: -6, fontSize: 34, filter: "drop-shadow(0 4px 6px rgba(50,30,110,.22))" }}>🪴</div>
          </div>
        )}
      </div>

      <button className="obtn pill" style={{ position: "absolute", right: 22, top: 22, padding: "9px 14px", background: "#fff", color: "var(--purple-deep)", font: "600 12.5px/1 var(--display)" }}>
        <Glyph name="edit" size={14} /> Edit
      </button>
    </div>
  );
}

/* ------------------------------------------------------------- stat tile */
// mirrors the reference "Lessons 68 / Study Hours 27" pair
function StatTile({ label, value, sub, emoji, tone = "purple", delay = 0 }) {
  const tones = {
    purple: { bg: "var(--purple-soft)", ink: "var(--purple-deep)", chip: "#fff" },
    gold:   { bg: "var(--gold-soft)",   ink: "var(--gold-deep)",   chip: "#fff" },
    green:  { bg: "var(--green-soft)",  ink: "#1f8a5b",            chip: "#fff" },
    cyan:   { bg: "var(--cyan-soft)",   ink: "#1597ad",            chip: "#fff" },
  }[tone];
  return (
    <div className="card rise" style={{ background: tones.bg, padding: "18px 18px", animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div className="klabel" style={{ color: tones.ink, opacity: .8 }}>{label}</div>
        <span style={{ width: 34, height: 34, borderRadius: 12, background: tones.chip, display: "grid", placeItems: "center", fontSize: 17, boxShadow: "var(--shadow-sm)" }}>{emoji}</span>
      </div>
      <div className="figure" style={{ fontSize: 42, color: tones.ink, marginTop: 12 }}>{value}</div>
      <div style={{ font: "600 12px/1.2 var(--font)", color: tones.ink, opacity: .7, marginTop: 5 }}>{sub}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- streak */
function StreakCard({ value, mascots, delay = 0 }) {
  return (
    <div className="card pad rise" style={{ position: "relative", overflow: "hidden", animationDelay: delay + "ms" }}>
      <div className="klabel">Streak</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 8 }}>
        <div className="figure" style={{ fontSize: 50, color: "var(--ink)" }}>{value}</div>
        {mascots && <div aria-hidden="true" style={{ fontSize: 40, lineHeight: 1, transform: "rotate(6deg)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,.12))" }}>🔥</div>}
      </div>
      <div style={{ marginTop: 8, font: "600 12px/1.2 var(--font)", color: "var(--ink-soft)" }}>days shipping in a row</div>
    </div>
  );
}

/* ------------------------------------------------------------- mini stat */
function MiniStat({ icon, value, label, delay = 0 }) {
  return (
    <div className="card rise" style={{ padding: "14px 15px", display: "flex", flexDirection: "column", gap: 9, animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span aria-hidden="true" style={{ fontSize: 17, lineHeight: 1 }}>{icon}</span>
        <span className="figure" style={{ fontSize: 25, color: "var(--ink)" }}>{value}</span>
      </div>
      <div className="klabel" style={{ fontSize: 10.5, letterSpacing: 1.1 }}>{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- tribe */
function TribeCard({ name, mascots, delay = 0 }) {
  return (
    <div className="card pad rise" style={{ position: "relative", overflow: "hidden", minHeight: 150,
      display: "flex", flexDirection: "column", justifyContent: "center",
      background: "linear-gradient(150deg, #4b3aa6, #6442d6)", color: "#fff", animationDelay: delay + "ms" }}>
      <div aria-hidden="true" style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", right: -56, bottom: -64, background: "rgba(255,255,255,.10)" }} />
      {mascots && <div aria-hidden="true" style={{ position: "absolute", right: 12, bottom: 6, fontSize: 56, lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,.25))" }}>🚀</div>}
      <div className="klabel" style={{ position: "relative", color: "rgba(255,255,255,.7)" }}>Tribe</div>
      <div className="figure" style={{ position: "relative", fontSize: 36, color: "#fff", marginTop: 8 }}>{name}</div>
      <div style={{ position: "relative", marginTop: 8, font: "600 12px/1.3 var(--font)", color: "rgba(255,255,255,.75)", maxWidth: 200 }}>most points shipped this cycle</div>
    </div>
  );
}

Object.assign(window, { Glyph, Spark, ProfileHeader, HeroCard, StatTile, StreakCard, MiniStat, TribeCard });
