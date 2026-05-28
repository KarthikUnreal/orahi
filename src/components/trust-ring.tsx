import { motion } from "motion/react";

export function TrustRing({
  score,
  size = 140,
  thickness = 10,
  label = "Trust Score",
}: {
  score: number;
  size?: number;
  thickness?: number;
  label?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const tone =
    score >= 80
      ? "var(--color-trust)"
      : score >= 60
        ? "var(--color-warn)"
        : "var(--color-scam)";

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-border)"
          strokeWidth={thickness}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={tone}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-3xl font-semibold tracking-tight tabular-nums">
            {score}
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
