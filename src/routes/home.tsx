import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { VerdictBadge } from "@/components/verdict-badge";
import {
  alerts,
  categories,
  formatINR,
  products,
  trendingDeals,
} from "@/lib/mock";
import {
  ArrowUpRight,
  Flame,
  ShieldAlert,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  return (
    <AppShell>
      {/* Hero / verdict of the day */}
      <section className="grid lg:grid-cols-3 gap-4 mt-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 relative overflow-hidden rounded-3xl glass-strong p-6 lg:p-8"
        >
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> Verdict of the day
            </div>
            <h1 className="mt-3 text-3xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              That <span className="text-gradient-aurora">60% off</span> isn't 60% off.
            </h1>
            <p className="mt-3 text-sm lg:text-base text-muted-foreground max-w-xl">
              Sellers raised this product's price 14 days before the "sale". Our model is
              97% confident it's a fake discount.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/product/$id"
                params={{ id: "ng-blender" }}
                hash="verdict"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-trust px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity"
              >
                See the proof <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/product/$id"
                params={{ id: "ng-blender" }}
                className="inline-flex items-center gap-2 rounded-2xl glass px-5 py-3 text-sm font-medium"
              >
                Open product
              </Link>
            </div>

          </div>
          <div className="absolute -right-10 -bottom-10 text-[180px] opacity-20 select-none">
            🥤
          </div>
        </motion.div>

        <div className="rounded-3xl glass p-5 flex flex-col gap-4">
          <Stat
            icon={TrendingDown}
            label="You saved this month"
            value="₹8,420"
            sub="from 6 tracked items"
            tone="trust"
          />
          <Stat
            icon={ShieldAlert}
            label="Fake sales blocked"
            value="14"
            sub="across your wishlist"
            tone="scam"
          />
          <Stat
            icon={Flame}
            label="Deals trending now"
            value="124"
            sub="updated 2m ago"
            tone="warn"
          />
        </div>
      </section>

      {/* Trending */}
      <Section title="Trending deals" action={<span className="text-xs text-muted-foreground">Updated 2m ago</span>}>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
          {trendingDeals.map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              className="min-w-[240px] lg:min-w-0 lg:flex-1 group"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-3xl glass p-4 h-full flex flex-col"
              >
                <div className="aspect-[5/4] rounded-2xl bg-gradient-to-br from-secondary to-muted grid place-items-center text-6xl">
                  {p.image}
                </div>
                <div className="mt-3">
                  <VerdictBadge verdict={p.verdict} />
                </div>
                <div className="mt-2 text-sm font-medium line-clamp-2">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-semibold tabular-nums">
                    {formatINR(p.currentPrice)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatINR(p.listedOriginal)}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  90-day low {formatINR(p.historicalLow)}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Fake sale strip */}
      <Section
        title="Fake Sale Alerts"
        subtitle="Our AI caught these in the last 24 hours"
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {alerts.slice(0, 2).map((a) => (
            <div
              key={a.id}
              className="rounded-3xl p-5 border border-scam/30 bg-scam/5 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 size-32 rounded-full bg-scam/20 blur-2xl" />
              <div className="relative flex items-start gap-3">
                <div className="size-10 rounded-2xl bg-scam/20 text-scam grid place-items-center">
                  <ShieldAlert className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{a.body}</div>
                </div>
                <div className="text-[10px] text-muted-foreground">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section title="Browse by category">
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-3">
          {categories.map((c) => (
            <button
              key={c.name}
              className="rounded-2xl glass p-3 lg:p-4 flex flex-col items-center gap-1 hover:bg-card/60 transition-colors"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-[11px] font-medium">{c.name}</span>
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {c.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* AI picks */}
      <Section
        title="AI picks for you"
        subtitle="Based on what you tracked and skipped"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              className="rounded-3xl glass p-4 flex gap-4 hover:bg-card/60 transition-colors"
            >
              <div className="size-20 rounded-2xl bg-gradient-to-br from-secondary to-muted grid place-items-center text-3xl shrink-0">
                {p.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-2">{p.name}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  ⭐ {p.rating} · {p.reviews.toLocaleString()} reviews
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-semibold tabular-nums">{formatINR(p.currentPrice)}</span>
                  <span className="text-[11px] text-trust">
                    save {formatINR(p.listedOriginal - p.currentPrice)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  tone: "trust" | "scam" | "warn";
}) {
  const toneCls = {
    trust: "bg-trust/15 text-trust",
    scam: "bg-scam/15 text-scam",
    warn: "bg-warn/15 text-warn",
  }[tone];
  return (
    <div className="flex items-center gap-3">
      <div className={`size-10 rounded-2xl grid place-items-center ${toneCls}`}>
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </div>
        <div className="text-xl font-semibold tabular-nums">{value}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
