// ===========================================================================
//  Profile UI — components part 3: status breakdown, sprint trend chart,
//  rewards journey. Uses real window.DATA.
// ===========================================================================

/* --------------------------------------------------- status breakdown */
function StatusBreakdown({ hero, rest, totalTasks, delay = 0 }) {
  const all = [...hero, ...rest].filter(s => s.tasks > 0);
  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="klabel">Task Status</div>
        <span className="figure" style={{ fontSize: 18, color: "var(--ink)" }}>{totalTasks} <span style={{ fontSize: 12, fontWeight: 600, color: "var(--label)" }}>tasks</span></span>
      </div>

      {/* stacked bar */}
      <div style={{ display: "flex", height: 16, borderRadius: 999, overflow: "hidden", border: "2px solid var(--card-edge)", background: "var(--ring-bg)" }}>
        {all.map((s, i) => (
          <div key={i} title={`${s.label}: ${s.tasks}`} style={{ width: `${(s.tasks / totalTasks) * 100}%`, background: s.color, borderRight: i < all.length - 1 ? "1.5px solid var(--card)" : "none" }} />
        ))}
      </div>

      {/* chips */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 9, marginTop: 16 }}>
        {all.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
            border: "var(--strokeW) solid var(--card-edge)", borderRadius: 13, padding: "9px 12px", background: "color-mix(in srgb, var(--card) 88%, #000 0%)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: s.color, flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 var(--font)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</span>
            </span>
            <span className="figure" style={{ fontSize: 16, color: "var(--ink)" }}>{s.tasks}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- trend chart */
function TrendCard({ data, delay = 0 }) {
  const W = 720, H = 300, padL = 12, padR = 12, padT = 18, padB = 34;
  const iW = W - padL - padR, iH = H - padT - padB;
  const n = data.length, band = iW / n;
  const ptsMax = 180, taskMax = 60;
  const x = (i) => padL + band * (i + 0.5);
  const yP = (v) => padT + iH * (1 - v / ptsMax);
  const yT = (v) => padT + iH * (1 - v / taskMax);

  // smooth catmull-rom line for tasks
  const lp = data.map((d, i) => ({ x: x(i), y: yT(d.tasks) }));
  let path = `M ${lp[0].x} ${lp[0].y}`;
  for (let i = 0; i < lp.length - 1; i++) {
    const p0 = lp[i - 1] || lp[i], p1 = lp[i], p2 = lp[i + 1], p3 = lp[i + 2] || p2;
    path += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }

  return (
    <div className="card pad rise span-2" style={{ animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
        <div className="klabel">Sprint Trend</div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "700 12px/1 var(--font)", color: "var(--label)" }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--bar)" }} /> Story points
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "700 12px/1 var(--font)", color: "var(--label)" }}>
            <span style={{ width: 14, height: 3, borderRadius: 2, background: "var(--line)" }} /> Tasks
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {[0, 60, 120, 180].map(v => (
          <line key={v} x1={padL} y1={yP(v)} x2={W - padR} y2={yP(v)} stroke="var(--ring-bg)" strokeWidth="1" />
        ))}
        {data.map((d, i) => {
          const bw = band * 0.46, h = iH * (d.pts / ptsMax);
          return (
            <g key={i}>
              <rect x={x(i) - bw / 2} y={yP(d.pts)} width={bw} height={Math.max(h, 0)} rx="4" fill="var(--bar)" opacity={d.pts ? 0.95 : 0.25} />
              <text x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--label)" fontFamily="var(--font)">{d.sprint}</text>
            </g>
          );
        })}
        <path d={path} fill="none" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
        {lp.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--card)" stroke="var(--line)" strokeWidth="2.5" />)}
      </svg>
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
        <span className="dpill">{readyCount} ready to redeem</span>
      </div>
      <div style={{ font: "700 12.5px/1.4 var(--font)", color: "var(--label)", marginBottom: 16 }}>
        every +50 pts unlocks a perk · <b style={{ color: "var(--ink)" }}>{points} pts</b> earned
      </div>
      <div ref={railRef} style={{ display: "flex", overflowX: "auto", paddingBottom: 6 }}>
        {rewards.map((r, i) => {
          const st = stateOf(r);
          const tint = st === "ready" ? "var(--warn)" : st === "claimed" ? "var(--good)" : "var(--label)";
          return (
            <div key={r.pts} style={{ minWidth: 84, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              {i > 0 && (
                <div style={{ position: "absolute", top: 27, left: "-50%", width: "100%", height: 3,
                  background: r.pts <= points ? "var(--good)" : "var(--ring-bg)" }} />
              )}
              <div style={{ width: 54, height: 54, borderRadius: "50%", display: "grid", placeItems: "center", position: "relative", zIndex: 1, fontSize: 24,
                background: st === "locked" ? "var(--ring-bg)" : `color-mix(in srgb, ${tint} 20%, var(--card))`,
                border: `2.5px solid ${st === "locked" ? "var(--card-edge)" : tint}`,
                filter: st === "locked" ? "grayscale(1) opacity(.55)" : "none",
                boxShadow: st === "ready" ? `0 0 16px color-mix(in srgb, var(--warn) 60%, transparent)` : "none" }}>
                {st === "locked" ? "🔒" : r.emoji}
                {st === "claimed" && (
                  <span style={{ position: "absolute", bottom: -3, right: -3, width: 19, height: 19, borderRadius: "50%", background: "var(--good)", color: "#06250f", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 900 }}>✓</span>
                )}
              </div>
              <div className="figure" style={{ fontSize: 14, marginTop: 7, color: st === "locked" ? "var(--label)" : "var(--ink)" }}>{r.pts}</div>
              <div style={{ font: "800 9.5px/1 var(--display)", letterSpacing: .6, textTransform: "uppercase", color: tint, marginTop: 2 }}>
                {st === "ready" ? "Ready" : st === "claimed" ? "Got it" : "Locked"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { StatusBreakdown, TrendCard, RewardsJourney });
