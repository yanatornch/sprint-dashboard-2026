// ---- App: assembles the gamified person dashboard ----
const D = window.DATA;
const CLAIM_KEY = "ohm_claimed_v1";

function loadClaimed() {
  try {
    const raw = localStorage.getItem(CLAIM_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [50, 100, 150, 200]; // a few already claimed by default
}

function RewardsSection({ points, claimed, onClaim, anchorRef, confetti }) {
  const [tab, setTab] = useState("ready");
  const stateOf = (r) => claimed.includes(r.pts) ? "claimed" : (r.pts <= points ? "ready" : "locked");
  const groups = {
    ready: D.rewards.filter(r => stateOf(r) === "ready"),
    claimed: D.rewards.filter(r => stateOf(r) === "claimed"),
    locked: D.rewards.filter(r => stateOf(r) === "locked"),
  };
  const tabs = [
    { k: "ready", label: `Ready to redeem (${groups.ready.length})` },
    { k: "claimed", label: `Claimed (${groups.claimed.length})` },
    { k: "locked", label: `Locked (${groups.locked.length})` },
  ];
  return (
    <div ref={anchorRef} className="panel panel-pad rise">
      <div className="panel-head" style={{ flexWrap: "wrap", gap: 12 }}>
        <h2>🎁 Rewards Store</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {tabs.map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              padding: "8px 14px", borderRadius: 999, cursor: "pointer", font: "600 12.5px/1 var(--font)",
              border: `1px solid ${tab === t.k ? "var(--border-hi)" : "var(--border)"}`,
              background: tab === t.k ? "var(--panel-hi)" : "transparent",
              color: tab === t.k ? "var(--text)" : "var(--muted)",
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      {groups[tab].length === 0 ? (
        <div style={{ color: "var(--faint)", fontSize: 14, fontWeight: 600, padding: "26px 0", textAlign: "center" }}>
          {tab === "ready" ? "🎉 All caught up — keep earning points!" : "Nothing here yet."}
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}>
          {groups[tab].map(r => (
            <RewardCard key={r.pts} r={r} state={stateOf(r)} onClaim={onClaim} confetti={confetti} />
          ))}
        </div>
      )}
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#7c7ff5", "#6366f1"],
  "rewardColor": "#f5c518",
  "confetti": true,
  "showJourney": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [claimed, setClaimed] = useState(loadClaimed);
  const rewardsRef = useRef(null);
  const points = D.stats.totalPoints;

  useEffect(() => {
    try { localStorage.setItem(CLAIM_KEY, JSON.stringify(claimed)); } catch (e) {}
  }, [claimed]);

  function claim(pts) {
    setClaimed(c => c.includes(pts) ? c : [...c, pts]);
  }
  function scrollToRewards() {
    const el = rewardsRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
  }

  const accentVars = {
    "--indigo": t.accent[0],
    "--indigo-deep": t.accent[1],
    "--gold": t.rewardColor,
  };

  return (
    <div className="wrap" style={accentVars}>
      {/* header */}
      <div className="topbar">
        <button className="btn-back">← Back</button>
        <div className="avatar">{D.person.initials}</div>
        <div className="who">
          <div className="who-top">
            <h1>{D.person.name}</h1>
            <span className="role-badge">{D.person.role}</span>
          </div>
          <div className="who-sub">
            {D.person.sprintsActive}/{D.person.sprintsTotal} sprints active · <b>{D.person.totalPoints} pts</b> · {D.person.totalTasks} tasks
          </div>
        </div>
        <div className="spacer" />
        <button className="toggle">🌙 Dark</button>
      </div>

      {/* gamification hero */}
      <RewardHero points={points} rewards={D.rewards} claimed={claimed} tiers={D.tiers} onScrollToRewards={scrollToRewards} />

      {/* status — the three the manager wants up front */}
      <div className="section-label">Task Status</div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {D.statusHero.map((s, i) => <StatusHeroCard key={s.key} s={s} delay={i * 60} />)}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", marginTop: 14 }}>
        {D.statusRest.map((s, i) => <StatusChip key={i} s={s} />)}
      </div>

      {/* milestone journey */}
      {t.showJourney && (
        <div style={{ marginTop: 26 }}>
          <MilestoneTrack points={points} rewards={D.rewards} claimed={claimed} />
        </div>
      )}

      {/* rewards store */}
      <div style={{ marginTop: 16 }}>
        <RewardsSection points={points} claimed={claimed} onClaim={claim} anchorRef={rewardsRef} confetti={t.confetti} />
      </div>

      {/* metric strip */}
      <div className="section-label">Overview</div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
        <StatCard label="Total Points" value={D.stats.totalPoints} sub="all sprints" delay={0} />
        <StatCard label="Total Tasks" value={D.stats.totalTasks} sub="done tasks" delay={40} />
        <StatCard label="Done Rate" value={D.stats.doneRatePct + "%"} sub={`${D.stats.donePts} / ${D.stats.targetPts} pts`} accent="var(--green)" delay={80} />
        <StatCard label="Avg Pts / Task" value={D.stats.avgPtsPerTask} sub="done tasks" delay={120} />
        <StatCard label="Active Sprints" value={D.stats.activeSprints} sub={`of ${D.stats.sprintsTotal} total`} delay={160} />
        <StatCard label="Projects" value={D.stats.projects} sub="contributed to" delay={200} />
      </div>

      {/* insights */}
      <div className="section-label">Insights</div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {D.insights.map((it, i) => <InsightCard key={i} it={it} delay={i * 50} />)}
      </div>

      {/* sprint trend */}
      <div style={{ marginTop: 26 }}>
        <div className="panel panel-pad rise">
          <div className="panel-head">
            <h2>Sprint Trend</h2>
            <span className="pill">Story Points + Tasks</span>
          </div>
          <ChartLegend />
          <SprintTrendChart data={D.sprintTrend} />
        </div>
      </div>

      {/* leave */}
      <div className="section-label">Leave History</div>
      <div className="panel" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 18 }}>📋</span>
        <span style={{ fontWeight: 700 }}>Leave &amp; Holidays</span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8, background: "var(--panel-2)", border: "1px solid var(--border)",
          borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "var(--muted)",
        }}>
          🏖️ Sprint {D.leave.sprint} · {D.leave.kind} {D.leave.days}d · {D.leave.range}
        </span>
      </div>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent}
          options={[["#7c7ff5","#6366f1"],["#34e3a8","#10b981"],["#b06cff","#8b5cf6"],["#3ad8e8","#06b6d4"],["#fb9e5a","#f5733a"]]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakColor label="Reward color" value={t.rewardColor}
          options={["#f5c518","#f43f6e","#2ad4e5","#2fd39b"]}
          onChange={(v) => setTweak('rewardColor', v)} />
        <TweakSection label="Gamification" />
        <TweakToggle label="Show reward journey" value={t.showJourney}
          onChange={(v) => setTweak('showJourney', v)} />
        <TweakToggle label="Confetti on redeem" value={t.confetti}
          onChange={(v) => setTweak('confetti', v)} />
        <TweakButton label="Reset claimed rewards"
          onClick={() => setClaimed([50, 100, 150, 200])} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
