export function TemporalCompareVisual() {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden grid grid-cols-2 aspect-[4/3]">
      <div
        className="relative flex items-end p-4"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #14532d 0 8px, #052e16 8px 16px)",
        }}
      >
        <span className="text-[10px] uppercase tracking-wide bg-black/50 text-slate-200 px-2 py-1 rounded">
          Before
        </span>
      </div>
      <div className="relative flex items-end p-4 bg-space-300">
        <span className="text-[10px] uppercase tracking-wide bg-black/50 text-slate-200 px-2 py-1 rounded">
          After
        </span>
      </div>
    </div>
  );
}

export function HeatmapVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-space-600 p-5 aspect-[4/3] relative overflow-hidden">
      <span className="text-[10px] uppercase tracking-wide text-slate-300 font-semibold">
        Heatmap
      </span>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(239,68,68,0.9) 0%, rgba(249,115,22,0.6) 18%, rgba(234,179,8,0.45) 32%, rgba(34,197,94,0.3) 48%, rgba(59,130,246,0.35) 68%, transparent 85%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

export function LandCoverVisual() {
  const colors = [
    "#3b82f6",
    "#22c55e",
    "#3b82f6",
    "#64748b",
    "#22c55e",
    "#3b82f6",
    "#64748b",
    "#3b82f6",
    "#64748b",
    "#22c55e",
    "#3b82f6",
    "#22c55e",
    "#3b82f6",
    "#22c55e",
    "#64748b",
    "#22c55e",
    "#64748b",
    "#3b82f6",
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-space-600 p-3 aspect-[4/3] flex flex-col gap-3">
      <div className="grid grid-cols-6 gap-1 flex-1">
        {colors.map((c, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{ backgroundColor: c, opacity: 0.75 }}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 text-[10px] text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Water
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-green-500" /> Forest
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-500" /> Urban
        </span>
      </div>
    </div>
  );
}

export function DashboardVisual() {
  const bars = [30, 45, 38, 60, 70, 55, 48];
  return (
    <div className="rounded-2xl border border-white/10 bg-space-600 p-5 aspect-[4/3] flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="rounded-lg bg-space-500 border border-white/5 p-4 flex items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-sky-500/80 rounded-t-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="rounded-lg bg-space-500 border border-white/5 p-4 flex flex-col items-center justify-center gap-2">
          <div
            className="w-16 h-16 rounded-full"
            style={{
              background:
                "conic-gradient(#0ea5e9 0% 62%, rgba(148,163,184,0.2) 62% 100%)",
            }}
          />
          <span className="text-xs text-white font-semibold">62%</span>
        </div>
      </div>
      <div className="rounded-lg bg-space-500 border border-white/5 p-4 flex items-center justify-around">
        {[
          ["99cm", "Resolution"],
          ["117m", "Revisit"],
          ["8%", "Cloud Cover"],
        ].map(([v, l]) => (
          <div key={l} className="text-center">
            <p className="text-white font-bold text-sm">{v}</p>
            <p className="text-[9px] uppercase tracking-wide text-slate-500">
              {l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const DETECTIONS = [
  { label: "Aircraft", top: "12%", left: "10%", w: "20%", h: "12%" },
  { label: "Vehicle", top: "38%", left: "55%", w: "16%", h: "10%" },
  { label: "Truck", top: "55%", left: "32%", w: "14%", h: "10%" },
  { label: "Aircraft", top: "68%", left: "60%", w: "22%", h: "13%" },
];

export function ObjectDetectionVisual() {
  return (
    <div
      className="rounded-2xl border border-white/10 aspect-[4/3] relative overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(60deg, #3f2a14 0 10px, #2b1c0d 10px 20px)",
      }}
    >
      {DETECTIONS.map((d, i) => (
        <div
          key={i}
          className="absolute border-2 border-red-500/80"
          style={{ top: d.top, left: d.left, width: d.w, height: d.h }}
        >
          <span className="absolute -top-5 left-0 text-[9px] bg-red-500/90 text-white px-1.5 py-0.5 rounded">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ChangeDetectionVisual() {
  return (
    <div
      className="rounded-2xl border border-white/10 aspect-[4/3] relative overflow-hidden bg-space-300"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(148,163,184,0.08) 0 8px, transparent 8px 16px)",
      }}
    >
      <div className="absolute top-[18%] left-[14%] w-16 h-16 border-2 border-red-500/80 bg-red-500/20 rounded-sm" />
      <div className="absolute bottom-[16%] right-[16%] w-14 h-14 border-2 border-sky-500/80 bg-sky-500/20 rounded-sm" />
    </div>
  );
}
