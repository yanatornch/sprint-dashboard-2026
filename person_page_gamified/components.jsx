// ---- Reusable presentational components ----
const { useState, useEffect, useRef } = React;

// small generic stat tile used in the metric strip
function StatCard({ label, value, sub, accent, delay = 0 }) {
  return (
    <div className="panel rise" style={{ padding: "18px 20px", animationDelay: delay + "ms" }}>
      <div style={{ font: "700 11px/1 var(--font)", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--faint)" }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 800, marginTop: 10, color: accent || "var(--text)", letterSpacing: "-1px" }}>{value}</div>
      <div style={{ color: "var(--muted)", fontSize: 13, fontWeight: 500, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

// the three big status cards the manager asked for
function StatusHeroCard({ s, delay = 0 }) {
  return (
    <div className="panel rise" style={{
      padding: "20px 22px", position: "relative", overflow: "hidden",
      animationDelay: delay + "ms",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${s.color}22, transparent 60%)`, pointerEvents: "none",
      }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
          <span style={{ fontSize: 14.5, fontWeight: 700 }}>{s.emoji} {s.label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontSize: 42, fontWeight: 800, lineHeight: 1, color: s.color, letterSpacing: "-1.5px" }}>{s.tasks}</span>
          <span style={{ color: "var(--muted)", fontSize: 14, fontWeight: 600 }}>tasks</span>
        </div>
        <div style={{ color: "var(--muted)", fontSize: 12.5, fontWeight: 600, marginTop: 8 }}>{s.pts} pts</div>
      </div>
    </div>
  );
}

// small status chips for the remaining statuses
function StatusChip({ s }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
      background: "var(--panel-2)", border: "1px solid var(--border)", borderRadius: 12,
      padding: "11px 14px",
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
        {s.label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 800, color: s.tasks ? "var(--text)" : "var(--faint)" }}>{s.tasks}</span>
    </div>
  );
}

function InsightCard({ it, delay = 0 }) {
  return (
    <div className="panel rise" style={{ padding: "16px 18px", animationDelay: delay + "ms" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: it.dot }} />
        <span style={{ fontSize: 13.5, fontWeight: 700 }}>{it.emoji} {it.title}</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.3px" }}>{it.value}</div>
      <div style={{ color: "var(--muted)", fontSize: 12.5, fontWeight: 500, marginTop: 6, lineHeight: 1.4 }}>{it.sub}</div>
    </div>
  );
}

Object.assign(window, { StatCard, StatusHeroCard, StatusChip, InsightCard });
