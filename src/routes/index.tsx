import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Eye,
  Target,
  Zap,
  Brain,
  Users,
  TrendingDown,
  Lock,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const sections = [
  { id: "about", label: "About" },
  { id: "mission", label: "Mission" },
  { id: "vision", label: "Vision" },
  { id: "how", label: "How it works" },
  { id: "values", label: "Values" },
  { id: "team", label: "Team" },
] as const;

function Landing() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-background/60 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="size-9 rounded-xl bg-gradient-trust grid place-items-center shadow-[var(--shadow-glow)]">
              <ShieldCheck className="size-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[15px] font-semibold tracking-tight">
                TrustCart
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">
                Honest prices
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 mx-auto overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative px-3 py-2 text-sm transition-colors rounded-full ${
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="navpill"
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </nav>

          <div className="ml-auto md:ml-0 flex items-center gap-2 shrink-0">
            <Link
              to="/profile"
              className="h-10 px-4 rounded-xl glass text-sm font-medium grid place-items-center hover:bg-card/60 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/home"
              className="h-10 px-4 rounded-xl bg-gradient-trust text-sm font-medium text-primary-foreground inline-flex items-center gap-1.5 shadow-[var(--shadow-glow)]"
            >
              Get started <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero / About */}
      <section
        id="about"
        className="scroll-mt-20 relative overflow-hidden px-4 lg:px-8 pt-16 lg:pt-24 pb-20"
      >
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-primary" /> About TrustCart
          </motion.div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl">
            Shopping online,{" "}
            <span className="text-gradient-aurora">without the lies.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
            TrustCart is a price intelligence platform built for Indian
            shoppers. We compare every major e-commerce site in real time, then
            use AI to expose inflated MRPs, fake discounts and unreliable
            sellers — so the "60% off" you see is actually 60% off.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-trust px-6 h-12 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              Start saving today <ArrowUpRight className="size-4" />
            </Link>
            <a
              href="#mission"
              className="inline-flex items-center gap-2 rounded-2xl glass px-6 h-12 text-sm font-medium"
            >
              Read our mission
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["2.4M", "Listings tracked"],
              ["₹4.2Cr", "Saved by users"],
              ["14k", "Fake sales exposed"],
              ["98%", "Detection accuracy"],
            ].map(([v, k]) => (
              <div key={k} className="rounded-3xl glass p-5">
                <div className="text-3xl font-semibold tabular-nums text-gradient-trust">
                  {v}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="scroll-mt-20 px-4 lg:px-8 py-20 border-t border-border/40"
      >
        <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary">
              <Target className="size-3.5" /> Mission
            </div>
            <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight leading-tight">
              Make every rupee you spend an{" "}
              <span className="text-gradient-aurora">informed</span> one.
            </h2>
          </div>
          <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Indian shoppers lose an estimated{" "}
              <span className="text-foreground font-medium">₹12,000 crore</span>{" "}
              a year to deceptive pricing — inflated MRPs, "limited time" sales
              that never end, and sellers who quietly raise prices before a
              festival to fake a discount.
            </p>
            <p>
              Our mission is to put a trustworthy second opinion in every
              shopper's pocket. Paste a link, scan a product, or compare across
              platforms — TrustCart tells you the real lowest price, the real
              seller score, and whether you should wait.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              <Pillar
                icon={Lock}
                title="Independent"
                body="No affiliate bias. We rank by value, not commission."
              />
              <Pillar
                icon={Eye}
                title="Transparent"
                body="Every verdict shows the data and reasoning behind it."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section
        id="vision"
        className="scroll-mt-20 px-4 lg:px-8 py-20 border-t border-border/40 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 size-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent">
            <Eye className="size-3.5" /> Vision
          </div>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight leading-tight">
            A world where{" "}
            <span className="text-gradient-aurora">the listed price</span>{" "}
            is the honest price.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We're building the trust layer for online commerce — one product,
            one seller, one verdict at a time. If sellers know a billion
            shoppers can spot a fake sale, fake sales stop existing.
          </p>
          <figure className="mt-10 rounded-3xl glass-strong p-6 lg:p-8 text-left">
            <Quote className="size-6 text-primary" />
            <blockquote className="mt-3 text-lg lg:text-xl font-medium tracking-tight leading-snug">
              "We don't sell anything. We just make sure no one sells you a
              lie."
            </blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              — TrustCart founding team
            </figcaption>
          </figure>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="scroll-mt-20 px-4 lg:px-8 py-20 border-t border-border/40"
      >
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary">
            <Zap className="size-3.5" /> How it works
          </div>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            Three steps between you and a smarter purchase.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                t: "Search or paste",
                b: "Drop a product link, search by name, or scan a barcode. We pull live data from Amazon, Flipkart, Croma, Myntra and Reliance.",
              },
              {
                n: "02",
                t: "AI cross-checks",
                b: "Our model walks back 180 days of price history, flags inflation events and rates seller reliability against 2.4M complaints.",
              },
              {
                n: "03",
                t: "Verdict in seconds",
                b: "You get a Real Deal, Inflated or Fake verdict with the real 90-day low and a wait-or-buy prediction.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl glass-strong p-6 flex flex-col">
                <div className="text-5xl font-semibold tabular-nums text-gradient-aurora">
                  {s.n}
                </div>
                <div className="mt-5 text-lg font-semibold tracking-tight">
                  {s.t}
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        id="values"
        className="scroll-mt-20 px-4 lg:px-8 py-20 border-t border-border/40"
      >
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent">
            <Brain className="size-3.5" /> Values
          </div>
          <h2 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight">
            What we won't compromise on.
          </h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Pillar
              icon={ShieldCheck}
              title="Integrity"
              body="We never accept payment to hide a fake-sale verdict."
            />
            <Pillar
              icon={Brain}
              title="Intelligence"
              body="Models are retrained weekly on fresh complaint data."
            />
            <Pillar
              icon={TrendingDown}
              title="Saving first"
              body="If waiting saves you money, we tell you to wait."
            />
            <Pillar
              icon={Users}
              title="Community"
              body="Verdicts improve with every user who reports a bad seller."
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        id="team"
        className="scroll-mt-20 px-4 lg:px-8 py-20 border-t border-border/40"
      >
      
          {/* Final CTA */}
          <div className="mt-20 rounded-3xl glass-strong p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl lg:text-4xl font-semibold tracking-tight leading-tight">
                  Stop guessing.{" "}
                  <span className="text-gradient-aurora">Start TrustCarting.</span>
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Free forever for shoppers. No credit card. No spam.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/profile"
                  className="h-12 px-5 rounded-2xl glass text-sm font-medium grid place-items-center"
                >
                  Login
                </Link>
                <Link
                  to="/home"
                  className="h-12 px-6 rounded-2xl bg-gradient-trust text-sm font-medium text-primary-foreground inline-flex items-center gap-2 shadow-[var(--shadow-glow)]"
                >
                  Get started free <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 lg:px-8 py-10 border-t border-border/40 text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} TrustCart. Honest prices for India.
      </footer>
    </div>
  );
}

function Pillar({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="size-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
        <Icon className="size-5" />
      </div>
      <div className="mt-4 text-sm font-semibold">{title}</div>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
