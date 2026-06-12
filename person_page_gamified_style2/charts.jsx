// ---- Sprint Trend combo chart: story-point bars + task-count line ----
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function SprintTrendChart({ data }) {
  const W = 1000, H = 360;
  const padL = 44, padR = 40, padT = 22, padB = 40;
  const iW = W - padL - padR, iH = H - padT - padB;
  const n = data.length;
  const band = iW / n;
  const ptsMax = 180, taskMax = 60;

  const x = (i) => padL + band * (i + 0.5);
  const yP = (v) => padT + iH * (1 - v / ptsMax);
  const yT = (v) => padT + iH * (1 - v / taskMax);

  const linePts = data.map((d, i) => ({ x: x(i), y: yT(d.tasks) }));
  const path = smoothPath(linePts);
  const ptsGrid = [0, 40, 80, 120, 160, 180];
  const taskGrid = [0, 20, 40, 60];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--indigo)" />
          <stop offset="100%" stopColor="var(--indigo-deep)" />
        </linearGradient>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(42,212,229,.25)" />
          <stop offset="100%" stopColor="rgba(42,212,229,0)" />
        </linearGradient>
      </defs>

      {/* gridlines + left axis labels */}
      {ptsGrid.map((v) => (
        <g key={v}>
          <line x1={padL} y1={yP(v)} x2={W - padR} y2={yP(v)} stroke="rgba(255,255,255,.06)" />
          <text x={padL - 10} y={yP(v) + 4} textAnchor="end" fontSize="12" fill="var(--faint)">{v}</text>
        </g>
      ))}
      {/* right axis labels (tasks) */}
      {taskGrid.map((v) => (
        <text key={v} x={W - padR + 10} y={yT(v) + 4} textAnchor="start" fontSize="12" fill="var(--faint)">{v}</text>
      ))}

      {/* bars */}
      {data.map((d, i) => {
        const bw = band * 0.5;
        const h = iH * (d.pts / ptsMax);
        return (
          <g key={i}>
            <rect x={x(i) - bw / 2} y={yP(d.pts)} width={bw} height={Math.max(h, 0)} rx="5" fill="url(#barFill)" opacity={d.pts ? 0.95 : 0.2} />
            <text x={x(i)} y={H - 14} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--muted)">Sprint {d.sprint}</text>
          </g>
        );
      })}

      {/* line area + line */}
      <path d={`${path} L ${x(n - 1)} ${padT + iH} L ${x(0)} ${padT + iH} Z`} fill="url(#lineGlow)" opacity="0.6" />
      <path d={path} fill="none" stroke="#2ad4e5" strokeWidth="3" strokeLinecap="round" />
      {linePts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="var(--bg)" stroke="#2ad4e5" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

function ChartLegend() {
  const item = (color, label, hollow) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>
      <span style={{
        width: 12, height: 12, borderRadius: 3,
        background: hollow ? "transparent" : color,
        border: hollow ? `2px solid ${color}` : "none",
      }} />
      {label}
    </span>
  );
  return (
    <div style={{ display: "flex", gap: 22, justifyContent: "center", marginBottom: 4 }}>
      {item("#7c7ff5", "Story Points")}
      {item("#2ad4e5", "Tasks (count)", true)}
    </div>
  );
}

Object.assign(window, { SprintTrendChart, ChartLegend });
