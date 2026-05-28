import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { products } from "@/lib/mock";
import {
  Bell,
  ChevronRight,
  Heart,
  History,
  Moon,
  Settings,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <AppShell>
      <section className="mt-2 rounded-3xl glass-strong p-6 flex items-center gap-4">
        <div className="size-16 rounded-2xl bg-gradient-trust grid place-items-center text-2xl font-semibold text-primary-foreground">
          AR
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold tracking-tight">Aarav Reddy</div>
          <div className="text-xs text-muted-foreground">aarav@trustcart.app</div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-[10px] px-2 py-0.5">
            <ShieldCheck className="size-3" /> Pro saver · 8 mo streak
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        <Stat label="Tracked" value="42" />
        <Stat label="Saved" value="₹42k" />
        <Stat label="Blocked" value="37" />
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold tracking-tight">Wishlist</h2>
          <Link to="/home" className="text-xs text-muted-foreground">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {products.slice(0, 2).map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              className="rounded-3xl glass p-4 flex gap-3"
            >
              <div className="size-16 rounded-2xl bg-gradient-to-br from-secondary to-muted grid place-items-center text-3xl shrink-0">
                {p.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-2">{p.name}</div>
                <div className="text-xs text-trust mt-1">
                  predicted drop in 11 days
                </div>
              </div>
              <Heart className="size-4 text-scam fill-scam shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl glass divide-y divide-border/60">
        <Row icon={Bell} label="Notification preferences" sub="Price drops, fake sales, seller risk" />
        <Row icon={History} label="Shopping history" sub="42 tracked products" />
        <Row icon={Moon} label="Appearance" sub="Dark · Auto-switch enabled" />
        <Row icon={Settings} label="Account settings" sub="Profile, security, data" />
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl glass p-4 text-center">
      <div className="text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
}) {
  return (
    <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-card/60 transition-colors first:rounded-t-3xl last:rounded-b-3xl">
      <div className="size-10 rounded-2xl bg-muted grid place-items-center">
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}
