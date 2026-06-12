// ---- Gamification: levels, milestone track, redeemable rewards ----

function tierFor(points, tiers) {
  let cur = tiers[0];
  for (const t of tiers) if (points >= t.min) cur = t;
  const idx = tiers.indexOf(cur);
  const next = tiers[idx + 1] || null;
  return { cur, next };
}

// next +50 milestone strictly above current points
function nextMilestone(points) { return Math.floor(points / 50) * 50 + 50; }

// ---------- Hero ----------
function RewardHero({ points, rewards, claimed, tiers, onScrollToRewards }) {
  const { cur, next } = tierFor(points, tiers);
  const reached = rewards.filter(r => r.pts <= points);
  const claimable = reached.filter(r => !claimed.includes(r.pts)).length;
  const level = reached.length; // one level per 50-pt milestone reached
  const nm = nextMilestone(points);
  const bandStart = nm - 50;
  const pct = Math.min(100, Math.round(((points - bandStart) / 50) * 100));
  const toNext = nm - points;

  return (
    <div className="panel rise" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(700px 300px at 12% -20%, ${cur.color}33, transparent 60%),
                     radial-gradient(600px 300px at 90% 120%, rgba(124,127,245,.18), transparent 60%)`,
      }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center", padding: "26px 30px" }}>
        {/* tier medallion */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 96, height: 96, borderRadius: "50%", display: "grid", placeItems: "center",
            background: `conic-gradient(${cur.color} ${pct}%, rgba(255,255,255,.08) ${pct}%)`,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 7, borderRadius: "50%",
              background: "var(--panel)", display: "grid", placeItems: "center",
              border: `1px solid ${cur.color}55`,
            }}>
              <div style={{ textAlign: "center", lineHeight: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--faint)", letterSpacing: 1 }}>LVL</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: cur.color }}>{level}</div>
              </div>
            </div>
          </div>
          <span style={{
            font: "800 12px/1 var(--font)", letterSpacing: 1.5, textTransform: "uppercase",
            color: cur.color, padding: "6px 12px", borderRadius: 999,
            background: `${cur.color}1f`, border: `1px solid ${cur.color}55`,
          }}>{cur.name}</span>
        </div>

        {/* points + progress */}
        <div>
          <div style={{ font: "700 12px/1 var(--font)", letterSpacing: 2, textTransform: "uppercase", color: "var(--faint)" }}>Reward Points</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: 54, fontWeight: 800, letterSpacing: "-2px", lineHeight: 1,
              background: "linear-gradient(120deg, #fff, var(--indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {points.toLocaleString()}
            </span>
            <span style={{ color: "var(--muted)", fontWeight: 700, fontSize: 16 }}>pts</span>
          </div>

          <div style={{ marginTop: 16, maxWidth: 520 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 600, color: "var(--muted)", marginBottom: 7 }}>
              <span>Next reward at <b style={{ color: "var(--text)" }}>{nm} pts</b></span>
              <span>{toNext} pts to go</span>
            </div>
            <div style={{ height: 12, borderRadius: 999, background: "rgba(255,255,255,.07)", overflow: "hidden", border: "1px solid var(--border)" }}>
              <div style={{ height: "100%", width: pct + "%", borderRadius: 999,
                background: `linear-gradient(90deg, ${cur.color}, var(--indigo))`,
                boxShadow: `0 0 16px ${cur.color}aa`, transition: "width .8s cubic-bezier(.2,.8,.2,1)" }} />
            </div>
            {next && (
              <div style={{ fontSize: 12, color: "var(--faint)", fontWeight: 600, marginTop: 8 }}>
                {next.min - points} pts to reach <b style={{ color: next.color }}>{next.name}</b> tier
              </div>
            )}
          </div>
        </div>

        {/* claimable CTA */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 150, padding: "18px 14px", borderRadius: 18,
            background: claimable ? "linear-gradient(160deg, rgba(245,197,24,.18), rgba(245,165,36,.06))" : "var(--panel-2)",
            border: `1px solid ${claimable ? "rgba(245,197,24,.4)" : "var(--border)"}`,
          }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: claimable ? "var(--gold)" : "var(--faint)", lineHeight: 1 }}>{claimable}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--muted)", marginTop: 4 }}>rewards ready</div>
            <button onClick={onScrollToRewards} disabled={!claimable} style={{
              marginTop: 14, width: "100%", padding: "10px 0", borderRadius: 999, cursor: claimable ? "pointer" : "default",
              border: "none", font: "700 13px/1 var(--font)",
              background: claimable ? "linear-gradient(120deg, var(--gold), var(--orange))" : "rgba(255,255,255,.06)",
              color: claimable ? "#1a1206" : "var(--faint)",
            }}>{claimable ? "Claim now →" : "All claimed"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Milestone track (horizontal rail) ----------
function MilestoneTrack({ points, rewards, claimed }) {
  const railRef = useRef(null);
  useEffect(() => {
    // scroll so the "current" milestone is in view
    const el = railRef.current;
    if (!el) return;
    const idx = rewards.findIndex(r => r.pts > points);
    const node = el.children[Math.max(0, idx - 1)];
    if (node) el.scrollLeft = node.offsetLeft - 40;
  }, []);

  return (
    <div className="panel panel-pad rise">
      <div className="panel-head">
        <h2>🏁 Reward Journey</h2>
        <span className="pill">+50 pts = 1 reward</span>
      </div>
      <div ref={railRef} style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
        {rewards.map((r, i) => {
          const reached = r.pts <= points;
          const isClaimed = claimed.includes(r.pts);
          const state = isClaimed ? "claimed" : reached ? "ready" : "locked";
          const color = state === "ready" ? "var(--gold)" : state === "claimed" ? "var(--green)" : "var(--faint)";
          const lineActive = r.pts <= points;
          return (
            <div key={r.pts} style={{ minWidth: 96, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              {/* connector */}
              {i > 0 && (
                <div style={{ position: "absolute", top: 28, left: "-50%", width: "100%", height: 3,
                  background: lineActive ? "linear-gradient(90deg, var(--green), var(--gold))" : "rgba(255,255,255,.08)" }} />
              )}
              <div style={{
                width: 56, height: 56, borderRadius: "50%", display: "grid", placeItems: "center", position: "relative", zIndex: 1,
                background: state === "locked" ? "var(--panel-2)" : `${color}1f`,
                border: `2px solid ${state === "ready" ? "var(--gold)" : state === "claimed" ? "var(--green)" : "var(--border)"}`,
                fontSize: 24, filter: state === "locked" ? "grayscale(1) opacity(.55)" : "none",
                boxShadow: state === "ready" ? "0 0 18px rgba(245,197,24,.5)" : "none",
                animation: state === "ready" ? "rise .5s both" : "none",
              }}>
                {state === "locked" ? "🔒" : r.emoji}
                {state === "claimed" && (
                  <span style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: "50%",
                    background: "var(--green)", color: "#08130d", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 900 }}>✓</span>
                )}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 800, marginTop: 8, color: state === "locked" ? "var(--faint)" : "var(--text)" }}>{r.pts}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--faint)", textTransform: "uppercase", letterSpacing: .5 }}>
                {state === "ready" ? "Ready" : state === "claimed" ? "Claimed" : "Locked"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Reward card with claim + confetti ----------
function RewardCard({ r, state, onClaim, confetti = true }) {
  const [burst, setBurst] = useState(false);
  const colors = ["#f5c518", "#2fd39b", "#7c7ff5", "#2ad4e5", "#f0556a"];

  function claim() {
    if (confetti) { setBurst(true); setTimeout(() => setBurst(false), 800); }
    onClaim(r.pts);
  }

  const ready = state === "ready";
  const claimed = state === "claimed";

  return (
    <div className="panel" style={{
      padding: "18px 18px", position: "relative", overflow: "hidden",
      opacity: state === "locked" ? .55 : 1,
      borderColor: ready ? "rgba(245,197,24,.4)" : "var(--border)",
    }}>
      {ready && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(245,197,24,.12), transparent 55%)", pointerEvents: "none" }} />}
      <div style={{ position: "relative", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 50, height: 50, borderRadius: 14, display: "grid", placeItems: "center", fontSize: 26, flex: "none",
          background: "var(--panel-2)", border: "1px solid var(--border)", filter: state === "locked" ? "grayscale(1)" : "none" }}>
          {state === "locked" ? "🔒" : r.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>{r.name}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--muted)", background: "var(--panel-hi)", border: "1px solid var(--border)", padding: "3px 7px", borderRadius: 999 }}>{r.tag}</span>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 12.5, fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>{r.desc}</div>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--gold)" }}>★ {r.pts} pts</span>
        {ready && (
          <button onClick={claim} style={{
            padding: "9px 18px", borderRadius: 999, border: "none", cursor: "pointer", font: "700 13px/1 var(--font)",
            background: "linear-gradient(120deg, var(--gold), var(--orange))", color: "#1a1206",
          }}>Redeem</button>
        )}
        {claimed && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--green)" }}>✓ Claimed</span>
        )}
        {state === "locked" && (
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--faint)" }}>Locked</span>
        )}
      </div>

      {/* confetti */}
      {burst && (
        <div style={{ position: "absolute", top: "55%", right: 50, pointerEvents: "none" }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{
              position: "absolute", width: 8, height: 8, borderRadius: 2,
              background: colors[i % colors.length],
              "--dx": (Math.cos((i / 14) * 6.28) * (40 + Math.random() * 40)) + "px",
              "--dy": (Math.sin((i / 14) * 6.28) * (40 + Math.random() * 40)) + "px",
              animation: "burst .8s ease-out forwards",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { RewardHero, MilestoneTrack, RewardCard, tierFor, nextMilestone });
