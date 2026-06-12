// ===========================================================================
//  Profile (Playful) — part 3: status breakdown, signature bar chart,
//  trophy card, rewards journey, bottom nav.
// ===========================================================================

/* --------------------------------------------------- status breakdown */
function StatusBreakdown({ hero, rest, totalTasks, delay = 0 }) {
  const all = [...hero, ...rest].filter(s => s.tasks > 0);
  // map the data's css-var colors to playful palette
  const cmap = {
    "var(--green)": "var(--green)", "var(--cyan)": "var(--cyan)", "var(--indigo)": "var(--purple)",
    "var(--teal)": "#3fb6c4", "var(--orange)": "var(--gold)", "var(--faint)": "#c8c1e0", "var(--red)": "var(--coral)",
  };
  const col = (c) => cmap[c] || c;
  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="klabel">Task Status</div>
        <span className="figure" style={{ fontSize: 18, color: "var(--ink)" }}>{totalTasks} <span style={{ fontSize: 12, fontWeight: 600, color: "var(--label)", fontFamily: "var(--font)" }}>tasks</span></span>
      </div>

      {/* stacked bar */}
      <div style={{ display: "flex", height: 16, borderRadius: 999, overflow: "hidden", background: "var(--purple-soft)" }}>
        {all.map((s, i) => (
          <div key={i} title={`${s.label}: ${s.tasks}`} style={{ width: `${(s.tasks / totalTasks) * 100}%`, background: col(s.color), borderRight: i < all.length - 1 ? "2px solid #fff" : "none" }} />
        ))}
      </div>

      {/* chips */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 9, marginTop: 16 }}>
        {all.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
            background: "var(--purple-soft)", borderRadius: 14, padding: "10px 13px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: col(s.color), flex: "none" }} />
              <span style={{ font: "600 12.5px/1.2 var(--font)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</span>
            </span>
            <span className="figure" style={{ fontSize: 16, color: "var(--ink)" }}>{s.tasks}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------- signature bar chart */
// Reference's colorful rounded bars + value pills, with peak highlighted.
// Toggle between Story points and Tasks (mirrors the reference's dropdown).
const BAR_COLORS = ["#9d8cf0", "#f4be3f", "#4fc187", "#c4b6f4", "#f4be3f", "#9d8cf0", "#34c4dd", "#f06aa0", "#4fc187", "#9d8cf0", "#f4be3f", "#c4b6f4"];

function TrendCard({ data, delay = 0 }) {
  const [metric, setMetric] = useState("pts");
  const [open, setOpen] = useState(false);
  const vals = data.map(d => metric === "pts" ? d.pts : d.tasks);
  const max = Math.max(...vals, 1);
  const peak = vals.indexOf(max);

  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, gap: 10 }}>
        <div>
          <div className="figure" style={{ fontSize: 22, color: "var(--ink)" }}>Sprint Progress</div>
          <div style={{ font: "600 12px/1.2 var(--font)", color: "var(--label)", marginTop: 4 }}>{metric === "pts" ? "Story points" : "Tasks closed"} per sprint</div>
        </div>
        {/* dropdown-style metric toggle */}
        <div style={{ position: "relative", flex: "none" }}>
          <button className="obtn pill" onClick={() => setOpen(o => !o)} style={{ padding: "10px 14px", background: "var(--purple-soft)", boxShadow: "none", color: "var(--purple-deep)", font: "600 12.5px/1 var(--display)" }}>
            {metric === "pts" ? "Story points" : "Tasks"} <Glyph name="chevron" size={13} />
          </button>
          {open && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: "#fff", borderRadius: 14, boxShadow: "var(--shadow)", padding: 6, zIndex: 5, minWidth: 140 }}>
              {[["pts", "Story points"], ["tasks", "Tasks"]].map(([k, lbl]) => (
                <button key={k} onClick={() => { setMetric(k); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", border: "none", cursor: "pointer", borderRadius: 10, padding: "9px 11px", font: "600 12.5px/1 var(--font)",
                  background: metric === k ? "var(--purple-soft)" : "transparent", color: metric === k ? "var(--purple-deep)" : "var(--ink-soft)" }}>{lbl}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(4px,1.2vw,10px)", height: 188, marginTop: 14, paddingTop: 26 }}>
        {data.map((d, i) => {
          const v = vals[i];
          const h = max ? (v / max) * 100 : 0;
          const isPeak = i === peak && v > 0;
          const c = BAR_COLORS[i % BAR_COLORS.length];
          return (
            <div key={i} style={{ flex: 1, minWidth: 0, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
              {/* value pill */}
              <div style={{ marginBottom: 7, font: "600 11px/1 var(--display)",
                ...(isPeak
                  ? { background: "var(--purple)", color: "#fff", padding: "5px 9px", borderRadius: 999, boxShadow: "0 6px 14px color-mix(in srgb, var(--purple) 50%, transparent)" }
                  : { color: v ? "var(--ink-soft)" : "var(--label)", padding: "0 2px" }) }}>{v}</div>
              <div style={{ width: "100%", maxWidth: 30, height: `${Math.max(h, 2)}%`, minHeight: 6, borderRadius: 999,
                background: v ? (isPeak ? "var(--purple)" : c) : "rgba(124,92,242,.14)",
                boxShadow: isPeak ? "0 8px 18px color-mix(in srgb, var(--purple) 40%, transparent)" : "none",
                transition: "height .7s cubic-bezier(.2,.8,.2,1)" }} />
            </div>
          );
        })}
      </div>
      {/* x labels */}
      <div style={{ display: "flex", gap: "clamp(4px,1.2vw,10px)", marginTop: 9 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", font: "600 10.5px/1 var(--font)", color: "var(--label)" }}>{d.sprint}</div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- trophy card */
function TrophyCard({ title, sub, mascots, delay = 0 }) {
  return (
    <div className="card rise span-2" style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", cursor: "pointer", animationDelay: delay + "ms" }}>
      <div style={{ width: 56, height: 56, borderRadius: 18, flex: "none", display: "grid", placeItems: "center", fontSize: 30, background: "var(--gold-soft)" }}>{mascots ? "🏆" : "★"}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div className="figure" style={{ fontSize: 21, color: "var(--ink)" }}>{title}</div>
        <div style={{ font: "600 12.5px/1.35 var(--font)", color: "var(--ink-soft)", marginTop: 3 }}>{sub}</div>
      </div>
      <span style={{ flex: "none", width: 38, height: 38, borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--purple-soft)", color: "var(--purple-deep)" }}><Glyph name="chevron" size={18} /></span>
    </div>
  );
}

/* ------------------------------------------------------ rewards journey */
function RewardsJourney({ rewards, points, claimed, mascots, delay = 0 }) {
  const railRef = useRef(null);
  const stateOf = (r) => claimed.includes(r.pts) ? "claimed" : (r.pts <= points ? "ready" : "locked");
  const readyCount = rewards.filter(r => stateOf(r) === "ready").length;
  useEffect(() => {
    const el = railRef.current; if (!el) return;
    const idx = rewards.findIndex(r => r.pts > points);
    const node = el.children[Math.max(0, idx - 1)];
    if (node) el.scrollLeft = node.offsetLeft - 30;
  }, []);

  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, flexWrap: "wrap", gap: 10 }}>
        <div className="klabel">{mascots ? "🎁 " : ""}Rewards Journey</div>
        <span className="dpill" style={{ background: "var(--gold-soft)", color: "var(--gold-deep)" }}>{readyCount} ready to redeem</span>
      </div>
      <div style={{ font: "600 12.5px/1.4 var(--font)", color: "var(--ink-soft)", marginBottom: 16 }}>
        every +50 pts unlocks a perk · <b style={{ color: "var(--purple-deep)" }}>{points} pts</b> earned
      </div>
      <div ref={railRef} className="norail" style={{ display: "flex", overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" }}>
        {rewards.map((r, i) => {
          const st = stateOf(r);
          const tint = st === "ready" ? "var(--gold)" : st === "claimed" ? "var(--green)" : "var(--label)";
          return (
            <div key={r.pts} style={{ minWidth: 84, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              {i > 0 && (
                <div style={{ position: "absolute", top: 27, left: "-50%", width: "100%", height: 3, borderRadius: 999,
                  background: r.pts <= points ? "var(--green)" : "rgba(124,92,242,.16)" }} />
              )}
              <div style={{ width: 54, height: 54, borderRadius: "50%", display: "grid", placeItems: "center", position: "relative", zIndex: 1, fontSize: 24,
                background: st === "locked" ? "var(--purple-soft)" : `color-mix(in srgb, ${tint} 18%, #fff)`,
                border: `2.5px solid ${st === "locked" ? "rgba(124,92,242,.18)" : tint}`,
                filter: st === "locked" ? "grayscale(.6) opacity(.75)" : "none",
                boxShadow: st === "ready" ? `0 0 16px color-mix(in srgb, var(--gold) 55%, transparent)` : "none" }}>
                {st === "locked" ? "🔒" : r.emoji}
                {st === "claimed" && (
                  <span style={{ position: "absolute", bottom: -3, right: -3, width: 19, height: 19, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 900 }}>✓</span>
                )}
              </div>
              <div className="figure" style={{ fontSize: 14, marginTop: 7, color: st === "locked" ? "var(--label)" : "var(--ink)" }}>{r.pts}</div>
              <div style={{ font: "600 9.5px/1 var(--display)", letterSpacing: .6, textTransform: "uppercase", color: tint, marginTop: 3, whiteSpace: "nowrap" }}>
                {st === "ready" ? "Ready" : st === "claimed" ? "Got it" : "Locked"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- bottom nav */
function BottomNav({ mascots }) {
  const items = [["home", "Home"], ["compass", "Explore"], ["gift", "Rewards"], ["user", "Profile"]];
  return (
    <nav style={{ position: "fixed", left: "50%", bottom: 18, transform: "translateX(-50%)", zIndex: 40,
      width: "min(440px, calc(100% - 32px))", background: "#fff", borderRadius: 28, boxShadow: "0 18px 40px rgba(96,67,170,.22)",
      padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <NavItem icon="home" label="Home" />
      <NavItem icon="compass" label="Explore" />
      {/* center mascot button */}
      <button aria-label="Create" style={{ flex: "none", width: 58, height: 58, marginTop: -28, borderRadius: "50%", border: "5px solid #fff", cursor: "pointer",
        background: "linear-gradient(150deg, var(--purple), var(--purple-deep))", color: "#fff", display: "grid", placeItems: "center", fontSize: 26,
        boxShadow: "0 12px 24px color-mix(in srgb, var(--purple) 50%, transparent)" }}>{mascots ? "🦉" : "+"}</button>
      <NavItem icon="gift" label="Rewards" />
      <NavItem icon="user" label="Profile" active />
    </nav>
  );
}
function NavItem({ icon, label, active }) {
  return (
    <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, border: "none", background: "transparent", cursor: "pointer",
      color: active ? "var(--purple)" : "var(--label)", padding: "4px 2px" }}>
      <Glyph name={icon} size={21} />
      <span style={{ font: `${active ? 700 : 600} 10px/1 var(--display)`, letterSpacing: .3 }}>{label}</span>
    </button>
  );
}

Object.assign(window, { StatusBreakdown, TrendCard, TrophyCard, RewardsJourney, BottomNav, NavItem });
