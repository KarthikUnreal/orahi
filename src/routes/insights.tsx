import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { bestDaysToBuy, formatINR, spendingByMonth } from "@/lib/mock";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Brain, CalendarCheck, TrendingUp, Wallet } from "lucide-react";

export const Route = createFileRoute("/insights")({
  component: Insights,
});

function Insights() {
  const max = Math.max(...bestDaysToBuy.map((d) => d.score));

  return (
    <AppShell>
      <header className="mt-2">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
          <Brain className="size-3.5 text-accent" /> AI insights
        </div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-1">
          Smarter shopping, in one glance.
        </h1>
      </header>

      <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI icon={Wallet} label="Saved this year" value="₹42,180" delta="+18%" />
        <KPI icon={TrendingUp} label="Avg discount captured" value="22%" delta="+4%" />
        <KPI icon={CalendarCheck} label="Best buying day" value="Wednesday" delta="88 score" />
        <KPI icon={Brain} label="Fake sales blocked" value="37" delta="this year" />
      </section>

      <section className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl glass-strong p-5 lg:p-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Spending vs Saved
              </div>
              <h2 className="text-lg font-semibold tracking-tight mt-1">
                Last 6 months
              </h2>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <Legend color="var(--color-accent)" label="Spent" />
              <Legend color="var(--color-trust)" label="Saved" />
            </div>
          </div>

          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingByMonth} margin={{ left: -12, right: 8 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => "₹" + (v / 1000).toFixed(0) + "k"} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => formatINR(v)}
                />
                <Line type="monotone" dataKey="spent" stroke="var(--color-accent)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="saved" stroke="var(--color-trust)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl glass-strong p-5 lg:p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Best day to buy
          </div>
          <h2 className="text-lg font-semibold tracking-tight mt-1">
            Midweek wins
          </h2>
          <div className="mt-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestDaysToBuy} margin={{ left: -16, right: 4 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 4, 4]}>
                  {bestDaysToBuy.map((d) => (
                    <Cell
                      key={d.day}
                      fill={
                        d.score === max
                          ? "var(--color-trust)"
                          : "var(--color-muted)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Based on 12 months of tracked prices across electronics.
          </p>
        </div>
      </section>

      <section className="mt-6 grid lg:grid-cols-2 gap-4">
        <Recommendation
          title="Hold off on Sony WH-1000XM5"
          body="Predicted drop to ₹22,999 in 11 days. You'd save ₹1,991 vs today."
          tone="trust"
        />
        <Recommendation
          title="iPhone 15 Pro is a real low"
          body="At ₹124,900 it's the cheapest in 90 days. Safe to buy."
          tone="accent"
        />
      </section>
    </AppShell>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-3xl glass p-5">
      <div className="flex items-center justify-between">
        <Icon className="size-5 text-primary" />
        <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {delta}
        </span>
      </div>
      <div className="mt-4 text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}

function Recommendation({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "trust" | "accent";
}) {
  return (
    <div
      className={`rounded-3xl p-5 border ${
        tone === "trust"
          ? "border-trust/30 bg-trust/5"
          : "border-accent/30 bg-accent/5"
      }`}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{body}</div>
    </div>
  );
}
