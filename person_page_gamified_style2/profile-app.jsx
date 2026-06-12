// ===========================================================================
//  Profile UI — app. Assembles the gamified profile from window.DATA,
//  with a Sun/Night theme toggle and a few playful tweaks.
// ===========================================================================
const D = window.DATA;
const CLAIM_KEY = "ohm_profile_claimed_v1";

function loadClaimed() {
  try { const raw = localStorage.getItem(CLAIM_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
  return [50, 100, 150, 200];
}

// competency track from real reward tiers
function tierIndex(points, tiers) {
  let idx = 0;
  tiers.forEach((t, i) => { if (points >= t.min) idx = i; });
  return idx;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "sun",
  "accent": "#f0467e",
  "mascots": true,
  "name": "Ohm",
  "tribe": "NCSWT",
  "streak": 128,
  "balance": 78
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [claimed, setClaimed] = useState(loadClaimed);
  useEffect(() => { try { localStorage.setItem(CLAIM_KEY, JSON.stringify(claimed)); } catch (e) {} }, [claimed]);

  const points = D.stats.totalPoints;
  const tIdx = tierIndex(points, D.tiers);
  const levelNames = D.tiers.map(x => x.name);
  const readyCount = D.rewards.filter(r => !claimed.includes(r.pts) && r.pts <= points).length;

  const dials = [
    { label: "Delivery",   value: Math.round(D.stats.doneRatePct), color: "var(--good)" },
    { label: "Velocity",   value: 78, color: "var(--warn)" },
    { label: "Consistency",value: 64, color: "var(--bad)" },
    { label: "Focus",      value: 88, color: "var(--info)" },
  ];

  // accent override — recolors the playful highlight (spectrum + trend line + glow)
  const themeVars = {
    "--line": t.accent,
    "--spectrum": `linear-gradient(90deg, ${t.accent}, color-mix(in srgb, ${t.accent} 42%, #fff))`,
  };

  return (
    <div className="stage" data-theme={t.theme} style={themeVars}>
      <div className="feed">

        <ProfileHeader
          name={t.name}
          sub={["DEV", `${D.person.sprintsActive}/${D.person.sprintsTotal} SPRINTS`, `${D.person.totalTasks} TASKS`]}
          mascots={t.mascots}
        />

        {/* streak (with stacked mini-stats) + tribe — mirrors the reference top row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <StreakCard value={t.streak} mascots={t.mascots} delay={40} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <MiniStat icon="🎯" value={Math.round(D.stats.doneRatePct) + "%"} label="Done rate" />
            <MiniStat icon="⚡" value="08" label="Badges" />
          </div>
        </div>
        <TribeCard name={t.tribe} mascots={t.mascots} delay={80} />

        {/* work-style spectrum */}
        <WorkStyleCard
          type="The Closer"
          pct={t.balance}
          leftEmoji="🧩" rightEmoji="🚀"
          leftLabel="Planner" rightLabel="Shipper"
          caption={`Finishes what the sprint starts — ${Math.round(D.stats.doneRatePct)}% of points land in Done.`}
          mascots={t.mascots}
          delay={120}
        />

        {/* dev score + competency + dials */}
        <DevScoreCard
          levelIndex={tIdx}
          levels={levelNames}
          levelLabel={`${D.tiers[tIdx].name.toUpperCase()} TIER`}
          dials={dials}
          mascots={t.mascots}
          delay={160}
        />

        {/* status breakdown (real data) */}
        <StatusBreakdown hero={D.statusHero} rest={D.statusRest} totalTasks={D.person.totalTasks} delay={200} />

        {/* sprint trend (real data) */}
        <TrendCard data={D.sprintTrend} delay={240} />

        {/* rewards journey */}
        <RewardsJourney rewards={D.rewards} points={points} claimed={claimed} mascots={t.mascots} delay={280} />

      </div>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Look" value={t.theme}
          options={[{ value: "sun", label: "Sun" }, { value: "night", label: "Night" }]}
          onChange={(v) => setTweak('theme', v)} />
        <TweakColor label="Accent" value={t.accent}
          options={["#f0467e", "#7c7ff5", "#2ad4e5", "#f6a623", "#2fce6e"]}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Profile" />
        <TweakText label="Name" value={t.name} onChange={(v) => setTweak('name', v)} />
        <TweakText label="Tribe" value={t.tribe} onChange={(v) => setTweak('tribe', v)} />

        <TweakSection label="Gamification" />
        <TweakToggle label="Mascots & emoji" value={t.mascots} onChange={(v) => setTweak('mascots', v)} />
        <TweakSlider label="Streak" value={t.streak} min={0} max={365} unit="d" onChange={(v) => setTweak('streak', v)} />
        <TweakSlider label="Planner ↔ Shipper" value={t.balance} min={0} max={100} onChange={(v) => setTweak('balance', v)} />
        <TweakButton label="Reset claimed rewards" onClick={() => setClaimed([50, 100, 150, 200])} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
