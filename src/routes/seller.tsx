import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TrustRing } from "@/components/trust-ring";
import { sellers } from "@/lib/mock";
import { BadgeCheck, AlertTriangle, Users } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/seller")({
  component: SellerScreen,
});

function SellerScreen() {
  return (
    <AppShell>
      <header className="mt-2">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Seller trust
        </div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-1">
          Who's actually shipping you the product?
        </h1>
      </header>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {sellers.map((s, idx) => {
          const tone =
            s.score >= 80 ? "trust" : s.score >= 60 ? "warn" : "scam";
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="rounded-3xl glass-strong p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Users className="size-3" /> {s.trustedBy}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    tone === "trust"
                      ? "bg-trust/15 text-trust"
                      : tone === "warn"
                        ? "bg-warn/15 text-warn"
                        : "bg-scam/15 text-scam"
                  }`}
                >
                  {tone === "scam" ? (
                    <AlertTriangle className="size-3" />
                  ) : (
                    <BadgeCheck className="size-3" />
                  )}
                  {s.badge}
                </span>
              </div>

              <div className="mt-5 grid place-items-center">
                <TrustRing score={s.score} />
              </div>

              <div className="mt-6 space-y-3">
                {Object.entries(s.metrics).map(([k, v]) => (
                  <MetricBar key={k} label={labelize(k)} value={v as number} />
                ))}
              </div>

              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Review sentiment
                </div>
                <div className="flex h-2.5 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-trust"
                    style={{ width: `${s.sentiment.positive}%` }}
                  />
                  <div
                    className="bg-warn"
                    style={{ width: `${s.sentiment.neutral}%` }}
                  />
                  <div
                    className="bg-scam"
                    style={{ width: `${s.sentiment.negative}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>👍 {s.sentiment.positive}%</span>
                  <span>😐 {s.sentiment.neutral}%</span>
                  <span>👎 {s.sentiment.negative}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const tone =
    value >= 80 ? "bg-trust" : value >= 60 ? "bg-warn" : "bg-scam";
  return (
    <div>
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full ${tone}`}
        />
      </div>
    </div>
  );
}

function labelize(k: string) {
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace("Fake Complaints", "Fake-product complaints");
}
