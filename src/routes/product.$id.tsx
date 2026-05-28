import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PriceChart } from "@/components/price-chart";
import { TrustRing } from "@/components/trust-ring";
import { VerdictBadge } from "@/components/verdict-badge";
import { formatINR, getProduct } from "@/lib/mock";
import { motion } from "motion/react";
import {
  Heart,
  Share2,
  Sparkles,
  Star,
  Crown,
  Truck,
  ShieldCheck,
  Wallet,
  Brain,
  Clock,
  Calendar,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: `${p.name} — TrustCart` },
        {
          name: "description",
          content: `${p.name}: real price history, AI verdict and trusted sellers — all in one place.`,
        },
      ],
    };
  },
  component: ProductPage,
});

const platformHref: Record<string, string> = {
  Amazon: "https://www.amazon.com",
  Flipkart: "https://www.flipkart.com",
  Myntra: "https://www.myntra.com",
  Croma: "https://www.croma.com",
  Reliance: "https://www.reliancedigital.in",
};

function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const p = getProduct(id);
  const sellerScore = p.offers[0].sellerScore;
  const best = [...p.offers].sort((a, b) => a.price - b.price)[0];
  const events = p.priceHistory.filter((e) => e.event);

  return (
    <AppShell>
      <Link to="/home" className="text-xs text-muted-foreground mt-2 inline-block">
        ← Back
      </Link>

      <div className="mt-3 grid lg:grid-cols-5 gap-5">
        {/* Gallery */}
        <div className="lg:col-span-2">
          <div className="aspect-square rounded-3xl glass-strong grid place-items-center text-[140px] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <span className="relative">{p.image}</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl glass grid place-items-center text-3xl ${
                  i === 0 ? "ring-2 ring-primary" : ""
                }`}
              >
                {p.image}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {p.brand} · {p.category}
          </div>
          <h1 className="mt-2 text-2xl lg:text-3xl font-semibold tracking-tight">
            {p.name}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-warn text-warn" />
              {p.rating}
            </span>
            <span>{p.reviews.toLocaleString()} reviews</span>
            <span>·</span>
            <VerdictBadge verdict={p.verdict} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <div className="text-4xl font-semibold tabular-nums">
              {formatINR(p.currentPrice)}
            </div>
            <div className="text-sm text-muted-foreground line-through tabular-nums">
              {formatINR(p.listedOriginal)}
            </div>
            <div className="text-sm text-trust font-medium">
              save {formatINR(p.listedOriginal - p.currentPrice)}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={platformHref[best.platform] ?? "https://www.amazon.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-trust px-5 h-11 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              Buy now — best price <ExternalLink className="size-4" />
            </a>
            <a
              href="#compare"
              className="inline-flex items-center gap-2 rounded-2xl glass px-5 h-11 text-sm font-medium"
            >
              Compare platforms
            </a>
            <button className="size-11 rounded-2xl glass grid place-items-center">
              <Heart className="size-4" />
            </button>
            <button className="size-11 rounded-2xl glass grid place-items-center">
              <Share2 className="size-4" />
            </button>
          </div>

          {/* AI prediction */}
          <div className="mt-5 rounded-3xl p-5 border border-accent/30 bg-accent/5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-accent">
              <Sparkles className="size-3.5" /> Wait for better price
            </div>
            {p.prediction.wait ? (
              <div className="mt-2 text-sm">
                Our model predicts this will drop to{" "}
                <span className="font-semibold text-foreground">
                  {formatINR(p.prediction.expected)}
                </span>{" "}
                in about{" "}
                <span className="font-semibold text-foreground">
                  {p.prediction.days} days
                </span>
                . Set a price-drop alert.
              </div>
            ) : (
              <div className="mt-2 text-sm">
                This is the lowest price in 90 days. Good time to buy.
              </div>
            )}
          </div>

          {/* Trust widget */}
          <Link
            to="/seller"
            className="mt-4 rounded-3xl glass p-4 flex items-center gap-4 hover:bg-card/60 transition-colors"
          >
            <TrustRing score={sellerScore} size={86} thickness={7} label="Seller" />
            <div className="flex-1">
              <div className="text-sm font-semibold">
                Sold by Appario Retail
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Verified seller · 98% return reliability · 95% refund speed
              </div>
              <div className="mt-2 text-[11px] text-primary">
                See full breakdown →
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* === FAKE SALE VERDICT === */}
      <section id="verdict" className="mt-10 scroll-mt-24">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Brain className="size-3.5 text-accent" /> Fake-sale detection
        </div>
        <h2 className="mt-2 text-xl lg:text-2xl font-semibold tracking-tight leading-tight">
          We tracked this price for{" "}
          <span className="text-gradient-aurora">180 days</span>.{" "}
          {p.verdict === "fake"
            ? 'The "sale" is not real.'
            : p.verdict === "inflated"
              ? "The original was inflated before the sale."
              : "This is a genuine discount."}
        </h2>

        <div className="mt-5 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-3xl glass-strong p-5 lg:p-6">
            <div className="grid grid-cols-3 gap-3">
              <Metric label="Sale price" value={formatINR(p.currentPrice)} />
              <Metric
                label="Listed original"
                value={formatINR(p.listedOriginal)}
                note={p.verdict !== "real" ? "↑ inflated" : "as advertised"}
                tone={p.verdict !== "real" ? "scam" : "trust"}
              />
              <Metric
                label="True 90-day low"
                value={formatINR(p.historicalLow)}
                note="real reference"
                tone="trust"
              />
            </div>
            <div className="mt-6">
              <PriceChart data={p.priceHistory} height={260} />
            </div>
          </div>

          <div className="rounded-3xl glass-strong p-6 flex flex-col">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              AI confidence
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-6xl font-semibold tabular-nums text-gradient-aurora"
              >
                {p.aiConfidence}
              </motion.span>
              <span className="text-muted-foreground">/100</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.aiConfidence}%` }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-trust to-accent"
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Trained on{" "}
              <span className="text-foreground">2.4M Indian e-com listings</span>.
              Pattern certainty for this product is{" "}
              <span className="text-foreground">{p.aiConfidence}%</span>.
            </p>

            {events.length > 0 && (
              <ol className="mt-5 relative border-l border-border/70 ml-2 space-y-3">
                {events.slice(0, 4).map((e, i) => (
                  <li key={i} className="pl-4 relative">
                    <span
                      className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background ${
                        e.event?.toLowerCase().includes("low")
                          ? "bg-trust"
                          : e.event?.toLowerCase().includes("fake")
                            ? "bg-scam"
                            : "bg-warn"
                      }`}
                    />
                    <div className="text-[11px] font-medium">{e.event}</div>
                    <div className="text-[10px] text-muted-foreground tabular-nums">
                      {e.date} · {formatINR(e.price)}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      {/* === COMPARE PLATFORMS === */}
      <section id="compare" className="mt-10 scroll-mt-24">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Compare platforms
            </div>
            <h2 className="text-xl lg:text-2xl font-semibold tracking-tight mt-1">
              Best combined value:{" "}
              <span className="text-gradient-trust">{best.platform}</span>
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {p.offers.map((o) => {
            const isBest = o.platform === best.platform;
            const off = Math.round(
              ((o.originalPrice - o.price) / o.originalPrice) * 100,
            );
            return (
              <div
                key={o.platform}
                className={`relative rounded-3xl p-5 flex flex-col ${
                  isBest
                    ? "border border-primary/40 bg-gradient-to-b from-primary/10 to-transparent"
                    : "glass"
                }`}
              >
                {isBest && (
                  <div className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-gradient-trust px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    <Crown className="size-3" /> Best deal
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{o.platform}</div>
                  <div className="text-[11px] text-muted-foreground">
                    seller {o.sellerScore}/100
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-semibold tabular-nums">
                    {formatINR(o.price)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground line-through">
                      {formatINR(o.originalPrice)}
                    </span>
                    <span className="text-[11px] text-trust">{off}% off</span>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Truck className="size-3.5 text-foreground/70" /> Delivery {o.delivery}
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="size-3.5 text-foreground/70" /> Warranty {o.warranty}
                  </li>
                  <li className="flex items-center gap-2">
                    <Wallet className="size-3.5 text-foreground/70" />
                    {o.cashback ? `${formatINR(o.cashback)} cashback` : "No cashback"}
                  </li>
                </ul>
                <a
                  href={platformHref[o.platform] ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 w-full h-10 rounded-2xl text-sm font-medium transition-opacity inline-flex items-center justify-center gap-1.5 ${
                    isBest
                      ? "bg-gradient-trust text-primary-foreground hover:opacity-90"
                      : "glass hover:bg-card/60"
                  }`}
                >
                  {isBest ? "Buy on " + o.platform : "Open " + o.platform}
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Specs + reviews summary */}
      <section className="mt-8 grid lg:grid-cols-2 gap-4">
        <div className="rounded-3xl glass p-5">
          <h3 className="text-sm font-semibold tracking-tight">Specifications</h3>
          <dl className="mt-3 divide-y divide-border/60 text-sm">
            {[
              ["Brand", p.brand],
              ["Category", p.category],
              ["Warranty", p.offers[0].warranty],
              ["Color", "Midnight Black"],
              ["In box", "Device, charger, manual"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl glass p-5">
          <h3 className="text-sm font-semibold tracking-tight">Reviews summary</h3>
          <div className="mt-3 flex items-end gap-3">
            <div className="text-4xl font-semibold tabular-nums">{p.rating}</div>
            <div className="text-xs text-muted-foreground pb-1">
              from {p.reviews.toLocaleString()} verified reviews
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              ["Sound quality", 92],
              ["Comfort", 88],
              ["Battery", 86],
              ["Value for money", 71],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{k}</span>
                  <span>{v}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-trust"
                    style={{ width: `${v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <InfoCard icon={Clock} title={`Wait ${p.prediction.days} days`} body={`Predicted to drop to ${formatINR(p.prediction.expected)}.`} />
        <InfoCard icon={Calendar} title="Best buy: Wed" body="Lowest prices statistically on midweek." />
        <InfoCard icon={TrendingUp} title="Track this product" body="Get alerted on real drops only." />
      </div>
    </AppShell>
  );
}

function Metric({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "trust" | "scam";
}) {
  return (
    <div className="rounded-2xl bg-card/40 border border-border/60 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="text-base lg:text-lg font-semibold tabular-nums mt-0.5">
        {value}
      </div>
      {note && (
        <div
          className={`text-[10px] mt-0.5 ${
            tone === "scam"
              ? "text-scam"
              : tone === "trust"
                ? "text-trust"
                : "text-muted-foreground"
          }`}
        >
          {note}
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl glass p-5">
      <Icon className="size-5 text-primary" />
      <div className="mt-3 text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground">{body}</div>
    </div>
  );
}
