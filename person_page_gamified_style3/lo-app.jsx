// ===========================================================================
//  Profile (Playful) — app. Assembles Ohm's real sprint data into the
//  lavender reference look, with a live Tweaks panel.
// ===========================================================================
const D = window.DATA;
const CLAIM_KEY = "ohm_profile_playful_claimed_v1";

function loadClaimed() {
  try { const raw = localStorage.getItem(CLAIM_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
  return [50, 100, 150, 200];
}

function tierIndex(points, tiers) {
  let idx = 0;
  tiers.forEach((t, i) => { if (points >= t.min) idx = i; });
  return idx;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7c5cf2",
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
  const tierColor = D.tiers[tIdx].color;

  const dials = [
    { label: "Delivery",    value: Math.round(D.stats.doneRatePct), color: "var(--green)" },
    { label: "Velocity",    value: 78, color: "var(--gold)" },
    { label: "Consistency", value: 64, color: "var(--coral)" },
    { label: "Focus",       value: 88, color: "var(--cyan)" },
  ];

  // accent override — recolors primary highlights
  const themeVars = {
    "--accent": t.accent,
    "--accent-soft": `color-mix(in srgb, ${t.accent} 14%, #fff)`,
  };

  return (
    <div className="stage" style={themeVars}>
      <div className="feed">

        <ProfileHeader name={t.name} mascots={t.mascots} />

        <HeroCard
          name={t.name} role={D.person.role}
          sprintsActive={D.person.sprintsActive} sprintsTotal={D.person.sprintsTotal}
          tierName={D.tiers[tIdx].name} tierColor={tierColor}
          mascots={t.mascots} delay={40}
        />

        {/* stat tile pair — mirrors the reference Lessons / Study Hours row */}
        <div className="span-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          <StatTile label="Total Points" value={D.stats.totalPoints} sub="Across 7 projects" emoji="📦" tone="purple" delay={80} />
          <StatTile label="Tasks" value={D.stats.totalTasks} sub="Done + in flight" emoji="✅" tone="gold" delay={110} />
        </div>

        {/* streak column + tribe */}
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <StreakCard value={t.streak} mascots={t.mascots} delay={140} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
            <MiniStat icon="🎯" value={Math.round(D.stats.doneRatePct) + "%"} label="Done rate" delay={170} />
            <MiniStat icon="⚡" value="08" label="Badges" delay={190} />
          </div>
        </div>
        <TribeCard name={t.tribe} mascots={t.mascots} delay={150} />

        <WorkStyleCard
          type="The Closer" pct={t.balance}
          leftEmoji="🧩" rightEmoji="🚀" leftLabel="Planner" rightLabel="Shipper"
          caption={`Finishes what the sprint starts — ${Math.round(D.stats.doneRatePct)}% of points land in Done.`}
          mascots={t.mascots} delay={210}
        />

        <DevScoreCard
          levelIndex={tIdx} levels={levelNames}
          levelLabel={`${D.tiers[tIdx].name.toUpperCase()} TIER`} tierColor={tierColor}
          dials={dials} mascots={t.mascots} delay={250}
        />

        <StatusBreakdown hero={D.statusHero} rest={D.statusRest} totalTasks={D.person.totalTasks} delay={290} />

        <TrendCard data={D.sprintTrend} delay={330} />

        <TrophyCard
          title="Amazing work!"
          sub={`You're in the top 15% of shippers — ${Math.round(D.stats.doneRatePct)}% done rate this cycle.`}
          mascots={t.mascots} delay={370}
        />

        <RewardsJourney rewards={D.rewards} points={points} claimed={claimed} mascots={t.mascots} delay={410} />

      </div>

      <BottomNav mascots={t.mascots} />

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent}
          options={["#7c5cf2", "#f06aa0", "#34c4dd", "#f4be3f", "#4fc187"]}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Profile" />
        <TweakText label="Name" value={t.name} onChange={(v) => setTweak('name', v)} />
        <TweakText label="Tribe" value={t.tribe} onChange={(v) => setTweak('tribe', v)} />

        <TweakSection label="Playfulness" />
        <TweakToggle label="Mascots & emoji" value={t.mascots} onChange={(v) => setTweak('mascots', v)} />
        <TweakSlider label="Streak" value={t.streak} min={0} max={365} unit="d" onChange={(v) => setTweak('streak', v)} />
        <TweakSlider label="Planner ↔ Shipper" value={t.balance} min={0} max={100} onChange={(v) => setTweak('balance', v)} />
        <TweakButton label="Reset claimed rewards" onClick={() => setClaimed([50, 100, 150, 200])} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
